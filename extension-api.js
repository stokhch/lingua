// API для расширения браузера и выдача самого расширения архивом.
//   GET  /api/lookup?lang=en|tr|krc&q=word      -> перевод по встроенному словарю (с учётом форм слова), иначе онлайн
//   POST /api/inbox  { lang, word, translation, ctx, src }  -> слово из расширения ждёт, пока сайт заберёт его в словарь
//   GET  /api/inbox                              -> { items }
//   POST /api/inbox/clear { upto }               -> удалить забранные слова
//   GET  /lingva-extension.zip                   -> папка extension/ архивом; в config.js подставлен адрес этого сервера
// Слова идут через «входящие», а не прямо в state: иначе открытая вкладка сайта перезаписала бы их своим состоянием.
import fsp from 'node:fs/promises';
import path from 'node:path';
import * as en from './public/js/data/dictionary.js';
import * as tr from './public/js/data/tr/dictionary.js';
import * as krc from './public/js/data/krc/dictionary.js';

const DICTS = { en, tr, krc };
const LETTERS = { en: /^[a-z' -]+$/i, tr: /^[a-zçğıöşüâîû' -]+$/i, krc: /^[а-яёў' -]+$/i };
const MAX_INBOX = 300;
const str = (v, n) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, n);

export function lookupWord(lang, q) {
  const d = DICTS[lang] || en;
  const r = d.lookup(q);
  return { word: r.word || q.toLowerCase(), translation: r.translation || '' };
}

// ---------- ZIP без сжатия (метод store), чтобы не тянуть зависимости ----------
const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
export function crc32(buf) { let c = 0xffffffff; for (const b of buf) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }

export function zip(files) { // files: [{ name, data: Buffer }]
  const local = [], central = []; let offset = 0;
  for (const f of files) {
    const name = Buffer.from(f.name, 'utf8'), crc = crc32(f.data), size = f.data.length;
    const h = Buffer.alloc(30);
    h.writeUInt32LE(0x04034b50, 0); h.writeUInt16LE(20, 4); h.writeUInt16LE(0x0800, 6); h.writeUInt16LE(0, 8);
    h.writeUInt32LE(0x00210000, 10); h.writeUInt32LE(crc, 14); h.writeUInt32LE(size, 18); h.writeUInt32LE(size, 22);
    h.writeUInt16LE(name.length, 26); h.writeUInt16LE(0, 28);
    local.push(h, name, f.data);
    const c = Buffer.alloc(46);
    c.writeUInt32LE(0x02014b50, 0); c.writeUInt16LE(20, 4); c.writeUInt16LE(20, 6); c.writeUInt16LE(0x0800, 8); c.writeUInt16LE(0, 10);
    c.writeUInt32LE(0x00210000, 12); c.writeUInt32LE(crc, 16); c.writeUInt32LE(size, 20); c.writeUInt32LE(size, 24);
    c.writeUInt16LE(name.length, 28); c.writeUInt32LE(offset, 42);
    central.push(c, name);
    offset += 30 + name.length + size;
  }
  const cd = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(files.length, 8); end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(cd.length, 12); end.writeUInt32LE(offset, 16);
  return Buffer.concat([...local, cd, end]);
}

async function listFiles(dir, base = dir) {
  const out = [];
  for (const e of await fsp.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...await listFiles(p, base));
    else out.push({ name: path.relative(base, p).split(path.sep).join('/'), file: p });
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
}

export function createExtensionApi({ root, send, readJson, translate, persist }) {
  const extDir = path.join(root, 'extension');

  async function handlePublic(route, req, res, url) {
    if (route === 'GET /api/lookup') {
      const lang = DICTS[url.searchParams.get('lang')] ? url.searchParams.get('lang') : 'en';
      const q = str(url.searchParams.get('q'), 60);
      if (!q || !LETTERS[lang].test(q)) return send(res, 400, { error: 'bad word' });
      const r = lookupWord(lang, q);
      if (!r.translation && lang !== 'krc') {
        try { r.translation = await translate(r.word.toLocaleLowerCase(lang), lang); r.source = r.translation ? 'online' : 'none'; }
        catch { r.source = 'none'; }
      } else r.source = r.translation ? 'dict' : 'none';
      return send(res, 200, r);
    }
    if (route === 'GET /lingva-extension.zip') {
      const proto = String(req.headers['x-forwarded-proto'] || '').split(',')[0] || (req.socket.encrypted ? 'https' : 'http');
      const host = String(req.headers['x-forwarded-host'] || req.headers.host || 'localhost:3000').split(',')[0].trim();
      const origin = /^[\w.-]+(:\d+)?$/.test(host) ? `${proto}://${host}` : 'http://localhost:3000';
      const files = await Promise.all((await listFiles(extDir)).map(async f => ({
        name: 'lingva-extension/' + f.name,
        data: f.name === 'config.js' ? Buffer.from(`// Адрес сервера Лингвы по умолчанию (подставлен при скачивании)\nexport const DEFAULT_SERVER = ${JSON.stringify(origin)};\n`) : await fsp.readFile(f.file)
      })));
      const body = zip(files);
      res.writeHead(200, { 'Content-Type': 'application/zip', 'Content-Disposition': 'attachment; filename="lingva-extension.zip"', 'Content-Length': body.length, 'Cache-Control': 'no-store' });
      return res.end(body);
    }
    return false;
  }

  async function handleAuthed(route, req, res, session) {
    const u = session.user;
    if (route === 'POST /api/inbox') {
      const b = await readJson(req);
      const lang = DICTS[b.lang] ? b.lang : 'en';
      const word = str(b.word, 60), translation = str(b.translation, 120);
      if (!word || !translation) return send(res, 400, { error: 'Нужны слово и перевод' });
      u.inbox ||= [];
      if (u.inbox.length >= MAX_INBOX) return send(res, 429, { error: 'Откройте Лингву, чтобы забрать уже добавленные слова' });
      const item = { lang, word, translation, ctx: str(b.ctx, 240), src: str(b.src, 120), at: Date.now() };
      u.inbox.push(item); persist();
      return send(res, 201, { ok: true, pending: u.inbox.length });
    }
    if (route === 'GET /api/inbox') return send(res, 200, { items: u.inbox || [] });
    if (route === 'POST /api/inbox/clear') {
      const { upto } = await readJson(req);
      u.inbox = (u.inbox || []).filter(x => x.at > Number(upto || 0)); persist();
      return send(res, 200, { ok: true });
    }
    return false;
  }

  return { handlePublic, handleAuthed };
}
