// Лингва — сервер без внешних зависимостей (Node.js 18+).
// Раздаёт статику из ./public и предоставляет JSON API:
//   POST /api/register {email, name, password}   -> {token, user}
//   POST /api/login    {email, password}         -> {token, user}
//   POST /api/logout
//   GET  /api/me                                  -> {user}
//   GET  /api/state  / PUT /api/state {state}     -> прогресс пользователя
//   GET  /api/leaderboard                         -> топ по XP за неделю и всего
//   GET  /api/students                            -> все ученики: имя, уровень, XP, стрик, языки (кроме скрывшихся; students.js)
//   GET  /api/translate?q=word&lang=en|tr         -> перевод слова, которого нет во встроенном словаре
//   GET  /api/translate-sentence?q=…&lang=en|tr   -> машинный перевод предложения (для чтения)
//   GET  /api/lookup, /api/inbox, POST /api/inbox(/clear), GET /lingva-extension.zip -> расширение браузера (extension-api.js)
//   GET  /api/invite (без входа), GET /api/social, POST /api/friends, /api/friends/remove, /api/duels, /api/duels/answer -> друзья и дуэли (social.js)
//   GET/POST /api/classes…, /api/join, /api/teacher/enable -> учитель, классы и соревнования (teacher.js)
// Данные хранятся в PostgreSQL, если задан DATABASE_URL, иначе в ./data/db.json (см. storage.js).

import http from 'node:http';
import fsp from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { openStore } from './storage.js';
import { createSocial } from './social.js';
import { createTeacher } from './teacher.js';
import { studentsList } from './students.js';
import { createExtensionApi } from './extension-api.js';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(ROOT, 'public');
const DATA_DIR = process.env.LINGVA_DATA || path.join(ROOT, 'data');
const PORT = Number(process.env.PORT || 3000);
const MAX_BODY = 2 * 1024 * 1024;
const SESSION_TTL = 1000 * 60 * 60 * 24 * 30; // 30 дней

// ---------- хранилище ----------
const store = await openStore({ databaseUrl: process.env.DATABASE_URL, dataDir: DATA_DIR });
let db = await store.load();
for (const [t, s] of Object.entries(db.sessions)) if (s.expires < Date.now()) delete db.sessions[t];
console.log(`Хранилище: ${store.kind === 'postgres' ? 'PostgreSQL (DATABASE_URL)' : DATA_DIR + '/db.json'}`);

// Изменения копятся в памяти и сохраняются не чаще раза в 200 мс; записи идут строго по очереди.
let saveTimer = null, dirty = false, saving = Promise.resolve();
function flush() {
  clearTimeout(saveTimer); saveTimer = null;
  if (!dirty) return saving;
  dirty = false;
  const snapshot = JSON.stringify(db);
  saving = saving.then(() => store.save(snapshot)).catch(e => {
    console.error('Не удалось сохранить базу:', e.message);
    dirty = true; saveTimer = setTimeout(flush, 5000);
  });
  return saving;
}
function persist() {
  dirty = true;
  if (!saveTimer) saveTimer = setTimeout(flush, 200);
}

// ---------- пароли и сессии ----------
function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}
function checkPassword(password, stored) {
  const [salt, hash] = stored.split(':');
  const probe = crypto.scryptSync(password, salt, 64);
  return crypto.timingSafeEqual(probe, Buffer.from(hash, 'hex'));
}
function newSession(userId) {
  const token = crypto.randomBytes(32).toString('base64url');
  db.sessions[token] = { userId, expires: Date.now() + SESSION_TTL };
  persist();
  return token;
}
function auth(req) {
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : '';
  const s = token && db.sessions[token];
  if (!s || s.expires < Date.now()) return null;
  return { token, user: db.users[s.userId] };
}
const publicUser = u => ({ id: u.id, email: u.email, name: u.name, createdAt: u.createdAt });

// ---------- простейший лимит запросов на вход ----------
const attempts = new Map();
function limited(ip) {
  const now = Date.now();
  const list = (attempts.get(ip) || []).filter(t => now - t < 60_000);
  list.push(now);
  attempts.set(ip, list);
  return list.length > 20;
}
// лимит на перевод предложений: не больше 30 в минуту с одного адреса
const trHits = new Map();
function limitedTr(ip) {
  const now = Date.now();
  const list = (trHits.get(ip) || []).filter(t => now - t < 60_000);
  list.push(now);
  trHits.set(ip, list);
  if (trHits.size > 10000) trHits.clear();
  return list.length > 30;
}

// ---------- помощники HTTP ----------
function send(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(body);
}
function readJson(req) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', c => { size += c.length; if (size > MAX_BODY) { reject(new Error('too large')); req.destroy(); } else chunks.push(c); });
    req.on('end', () => { try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')); } catch (e) { reject(e); } });
    req.on('error', reject);
  });
}

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml', '.json': 'application/json', '.png': 'image/png', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json' };

// Статика: браузер каждый раз сверяет ETag, поэтому после деплоя сразу видна новая версия CSS и JS
// (без этого браузер мог часами показывать старый дизайн из кэша).
function sendFile(req, res, data, type) {
  const etag = '"' + crypto.createHash('sha1').update(data).digest('base64url') + '"';
  const headers = { 'Content-Type': type, 'Cache-Control': 'no-cache', ETag: etag };
  if (req.headers['if-none-match'] === etag) { res.writeHead(304, headers); return res.end(); }
  res.writeHead(200, headers);
  res.end(req.method === 'HEAD' ? undefined : data);
}

async function serveStatic(req, res, pathname) {
  let file = path.normalize(path.join(PUBLIC, decodeURIComponent(pathname)));
  if (!file.startsWith(PUBLIC)) { res.writeHead(403); return res.end(); }
  try {
    const st = await fsp.stat(file);
    if (st.isDirectory()) file = path.join(file, 'index.html');
    sendFile(req, res, await fsp.readFile(file), MIME[path.extname(file)] || 'application/octet-stream');
  } catch {
    sendFile(req, res, await fsp.readFile(path.join(PUBLIC, 'index.html')), MIME['.html']);
  }
}

// ---------- статистика для рейтинга ----------
function weekXp(state) {
  const log = state?.xpLog || {};
  const now = new Date();
  let sum = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(now); d.setDate(now.getDate() - i);
    sum += log[d.toISOString().slice(0, 10)] || 0;
  }
  return sum;
}

// ---------- перевод неизвестных слов (MyMemory, бесплатный публичный API) ----------
const translateCache = new Map();
const ONLINE_LANGS = new Set(['en', 'tr', 'el']);
async function translate(q, lang = 'en', sentence = false) {
  const key = lang + ':' + (sentence ? 's:' : '') + q;
  if (translateCache.has(key)) return translateCache.get(key);
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(q)}&langpair=${lang}|ru`;
  const r = await fetch(url, { signal: AbortSignal.timeout(6000) });
  const j = await r.json();
  const t = (j?.responseData?.translatedText || '').trim();
  const same = !t || t.toLocaleLowerCase(lang) === q.toLocaleLowerCase(lang);
  const out = same ? '' : sentence ? t : t.toLowerCase();
  if (translateCache.size > 5000) translateCache.clear();
  translateCache.set(key, out);
  return out;
}

const social = createSocial({ getDb: () => db, persist, send, readJson, weekXp });
const teacher = createTeacher({ getDb: () => db, persist, send, readJson });
const ext = createExtensionApi({ root: ROOT, send, readJson, translate, persist });

// ---------- маршруты API ----------
async function api(req, res, url) {
  const route = `${req.method} ${url.pathname}`;
  const ip = req.socket.remoteAddress;

  if (route === 'GET /api/health') return send(res, 200, { ok: true, mode: 'server', storage: store.kind });

  if (route === 'POST /api/register') {
    if (limited(ip)) return send(res, 429, { error: 'Слишком много попыток, подождите минуту' });
    const { email = '', name = '', password = '' } = await readJson(req);
    const em = String(email).trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) return send(res, 400, { error: 'Введите корректный e-mail' });
    if (String(password).length < 6) return send(res, 400, { error: 'Пароль должен быть не короче 6 символов' });
    if (Object.values(db.users).some(u => u.email === em)) return send(res, 409, { error: 'Такой e-mail уже зарегистрирован' });
    const id = crypto.randomUUID();
    const user = { id, email: em, name: String(name).trim().slice(0, 40) || em.split('@')[0], password: hashPassword(String(password)), createdAt: Date.now(), state: null };
    db.users[id] = user; persist();
    return send(res, 201, { token: newSession(id), user: publicUser(user) });
  }

  if (route === 'POST /api/login') {
    if (limited(ip)) return send(res, 429, { error: 'Слишком много попыток, подождите минуту' });
    const { email = '', password = '' } = await readJson(req);
    const user = Object.values(db.users).find(u => u.email === String(email).trim().toLowerCase());
    if (!user || !checkPassword(String(password), user.password)) return send(res, 401, { error: 'Неверный e-mail или пароль' });
    return send(res, 200, { token: newSession(user.id), user: publicUser(user) });
  }

  if (route === 'GET /api/leaderboard') {
    const me = auth(req)?.user?.id;
    const rows = Object.values(db.users).filter(u => u.id === me || !u.state?.hideFromAll).map(u => ({ me: u.id === me, name: u.name, xp: u.state?.xp || 0, week: weekXp(u.state), streak: u.state?.streak || 0 }));
    return send(res, 200, { week: [...rows].sort((a, b) => b.week - a.week).slice(0, 20), total: [...rows].sort((a, b) => b.xp - a.xp).slice(0, 20) });
  }

  if (route === 'GET /api/students') return send(res, 200, studentsList(db.users, auth(req)?.user?.id, weekXp));

  if (route === 'GET /api/translate') {
    const lang = ONLINE_LANGS.has(url.searchParams.get('lang')) ? url.searchParams.get('lang') : 'en';
    const q = (url.searchParams.get('q') || '').trim().toLocaleLowerCase(lang).slice(0, 60);
    const ok = { tr: /^[a-zçğıöşüâîû' -]+$/, el: /^[α-ωάέήίόύώϊϋΐΰ' -]+$/ }[lang] || /^[a-z' -]+$/;
    if (!ok.test(q)) return send(res, 400, { error: 'bad word' });
    try { return send(res, 200, { word: q, translation: await translate(q, lang) }); }
    catch { return send(res, 200, { word: q, translation: '' }); }
  }

  if (await ext.handlePublic(route, req, res, url) !== false) return;
  if (social.handlePublic(route, req, res, url) !== false) return;

  if (route === 'GET /api/translate-sentence') {
    const lang = ONLINE_LANGS.has(url.searchParams.get('lang')) ? url.searchParams.get('lang') : 'en';
    const q = (url.searchParams.get('q') || '').replace(/\s+/g, ' ').trim().slice(0, 450);
    if (!q || limitedTr(ip)) return send(res, q ? 429 : 400, { error: q ? 'Слишком много запросов' : 'empty' });
    try { return send(res, 200, { translation: await translate(q, lang, true) }); }
    catch { return send(res, 200, { translation: '' }); }
  }

  const session = auth(req);
  if (!session) return send(res, 401, { error: 'Нужно войти' });

  if (route === 'POST /api/logout') { delete db.sessions[session.token]; persist(); return send(res, 200, { ok: true }); }
  if (route === 'GET /api/me') return send(res, 200, { user: publicUser(session.user) });
  if (route === 'GET /api/state') return send(res, 200, { state: session.user.state });
  if (route === 'PUT /api/state') {
    const { state } = await readJson(req);
    if (!state || typeof state !== 'object') return send(res, 400, { error: 'state required' });
    session.user.state = state; persist();
    return send(res, 200, { ok: true });
  }
  if (await social.handle(route, req, res, session) !== false) return;
  if (await teacher.handle(route, req, res, session, url) !== false) return;
  if (await ext.handleAuthed(route, req, res, session) !== false) return;
  return send(res, 404, { error: 'Not found' });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  try {
    if (url.pathname.startsWith('/api/')) return await api(req, res, url);
    if (url.pathname === '/lingva-extension.zip') return await ext.handlePublic('GET /lingva-extension.zip', req, res, url);
    if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); return res.end(); }
    return await serveStatic(req, res, url.pathname);
  } catch (e) {
    console.error(e);
    if (!res.headersSent) send(res, 500, { error: 'Ошибка сервера' });
  }
});

server.listen(PORT, () => console.log(`Лингва запущена: http://localhost:${PORT}`));

// При остановке (деплой, засыпание на хостинге) дописываем несохранённые изменения.
for (const sig of ['SIGTERM', 'SIGINT']) process.on(sig, async () => {
  server.close();
  await flush();
  await store.close().catch(() => {});
  process.exit(0);
});
