// Друзья и дуэли (серверная часть). Подключается в server.js: social.handle(route, req, res, session).
//   GET  /api/social                          -> { code, friends, duels }
//   POST /api/friends         { code }        -> добавить друга по коду (дружба взаимная)
//   POST /api/friends/remove  { code }        -> удалить из друзей
//   POST /api/duels           { to, lang, words, answers, ms }  -> вызвать друга: вы уже сыграли, он отвечает на те же слова
//   POST /api/duels/answer    { id, answers, ms }               -> ответ на вызов
//   GET  /api/invite?code=XXXX                 -> { name } — кто приглашает в друзья по ссылке (без входа)
//   POST /api/friends/request { pid | code }  -> запрос в друзья прямо в приложении (из «Всех учеников», рейтинга, переписки).
//                                                Если этот человек уже прислал вам запрос, дружба сразу взаимная.
//   POST /api/friends/respond { pid, accept } -> принять или отклонить входящий запрос
//   POST /api/friends/cancel  { pid }         -> отозвать свой запрос
//   POST /api/friends/settings { reqFrom: 'all' | 'class' | 'nobody' } -> кто может присылать запросы
// Код и ссылка-приглашение добавляют в друзья сразу: их человек дал сам. Незнакомцу из общего списка
// виден только pid (не код), поэтому стать другом без согласия второго нельзя.
// Счёт считает сервер по выбранным вариантам, а не по словам клиента.
import crypto from 'node:crypto';

const CODE_ABC = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const MAX_FRIENDS = 100;
const MAX_OPEN_DUELS = 20;
const DUEL_TTL = 14 * 86400000;
const LANGS = ['en', 'tr', 'el', 'de', 'krc'];
export const REQ_FROM = ['all', 'class', 'nobody'];
export const REQ_PER_DAY = 20, MAX_OUT_REQS = 30;
const DAY = 86400000;
export const REQ_TTL = 60 * DAY;      // неотвеченный запрос живёт два месяца
export const DECLINE_PAUSE = 30 * DAY; // после отказа повторить запрос можно через месяц

// Общий класс (одноклассники или ученик и учитель)
export function sameClass(db, a, b) {
  const inClass = (k, id) => k.owner === id || (k.students || []).includes(id);
  return Object.values(db.classes || {}).some(k => inClass(k, a.id) && inClass(k, b.id));
}

// Убрать запросы в обе стороны между двумя учениками (дружба, блокировка)
export function dropRequests(db, a, b) {
  if (db.friendReqs) db.friendReqs = db.friendReqs.filter(r => !((r.from === a && r.to === b) || (r.from === b && r.to === a)));
}

// Почему from не может отправить запрос to (null — можно)
export function requestDeny(db, from, to, now = Date.now()) {
  if (!to) return 'Ученик не найден';
  if (to.id === from.id) return 'Это вы';
  if ((from.friends || []).includes(to.id)) return `${to.name} уже у вас в друзьях`;
  if ((from.blocked || []).includes(to.id)) return `Вы заблокировали ${to.name}. Разблокировать можно на странице «Сообщения»`;
  if ((to.blocked || []).includes(from.id)) return 'Этот ученик ограничил общение с вами';
  const pref = to.friendReqFrom || 'all';
  if (pref === 'nobody') return 'Этот ученик сейчас не принимает запросы в друзья';
  if (pref === 'class' && !sameClass(db, from, to)) return 'Этот ученик принимает запросы только от одноклассников';
  const reqs = db.friendReqs || [];
  const mine = reqs.find(r => r.from === from.id && r.to === to.id);
  if (mine) return mine.declined ? 'Повторить запрос пока нельзя — попробуйте позже' : 'Запрос уже отправлен';
  const out = reqs.filter(r => r.from === from.id);
  if (out.filter(r => !r.declined).length >= MAX_OUT_REQS) return 'Слишком много запросов ждут ответа — отзовите старые или подождите';
  if (out.filter(r => now - r.at < DAY).length >= REQ_PER_DAY) return 'На сегодня запросов достаточно — продолжите завтра';
  if ((from.friends || []).length >= MAX_FRIENDS || (to.friends || []).length >= MAX_FRIENDS) return `Не больше ${MAX_FRIENDS} друзей`;
  return null;
}

// Состояние между двумя учениками для кнопки: 'friend' | 'out' (запрос отправлен) | 'in' (ждёт вашего ответа) | null
export function relOf(db, me, u) {
  if (!me || !u || me.id === u.id) return null;
  if ((me.friends || []).includes(u.id)) return 'friend';
  const reqs = db.friendReqs || [];
  if (reqs.some(r => r.from === u.id && r.to === me.id && !r.declined) && !(me.blocked || []).includes(u.id)) return 'in';
  if (reqs.some(r => r.from === me.id && r.to === u.id && !r.gone)) return 'out';
  return null;
}

export function levelOf(xp = 0) {
  let level = 1, need = 100, start = 0;
  while (xp >= start + need) { start += need; level++; need = 100 + (level - 1) * 50; }
  return level;
}

// Проверка слов дуэли: 5–10 вопросов, у каждого 4 варианта, среди них правильный
export function cleanWords(words) {
  if (!Array.isArray(words) || words.length < 5 || words.length > 10) return null;
  const str = v => typeof v === 'string' && v.trim() && v.length <= 80;
  const out = [];
  for (const x of words) {
    if (!x || !str(x.w) || !str(x.t) || !Array.isArray(x.opts) || x.opts.length !== 4 || !x.opts.every(str) || !x.opts.includes(x.t)) return null;
    if (new Set(x.opts).size !== 4) return null;
    out.push({ w: x.w.trim(), t: x.t, opts: x.opts.slice() });
  }
  return out;
}

export function scoreOf(words, answers) {
  if (!Array.isArray(answers)) return 0;
  return words.reduce((n, x, i) => n + (Number.isInteger(answers[i]) && x.opts[answers[i]] === x.t ? 1 : 0), 0);
}

const cleanMs = ms => Math.max(1000, Math.min(30 * 60000, Math.round(Number(ms) || 0)));

// Победитель: больше верных ответов, при равенстве — быстрее
export function winner(d) {
  if (!d.a || !d.b) return null;
  if (d.a.score !== d.b.score) return d.a.score > d.b.score ? 'a' : 'b';
  if (d.a.ms !== d.b.ms) return d.a.ms < d.b.ms ? 'a' : 'b';
  return 'draw';
}

export function createSocial({ getDb, persist, send, readJson, weekXp }) {
  const db = () => { const d = getDb(); d.duels ||= {}; d.friendReqs ||= []; return d; };

  // Публичный id для запросов в друзья: в отличие от кода, по нему нельзя добавить сразу
  function pidOf(user) {
    if (user.pid) return user.pid;
    let pid;
    do pid = crypto.randomBytes(6).toString('base64url'); while (byPid(pid));
    user.pid = pid; persist();
    return pid;
  }
  const byPid = pid => {
    const p = String(pid || '');
    return p ? Object.values(db().users).find(u => u.pid === p) : null;
  };
  const target = b => (b?.pid ? byPid(b.pid) : b?.code ? byCode(b.code) : null);

  function pruneReqs(now = Date.now()) {
    const users = db().users;
    db().friendReqs = db().friendReqs.filter(r => users[r.from] && users[r.to] && now - r.at < (r.declined ? DECLINE_PAUSE : REQ_TTL));
  }
  const incoming = me => db().friendReqs.filter(r => r.to === me.id && !r.declined && !(me.blocked || []).includes(r.from));
  const incomingCount = me => { pruneReqs(); return incoming(me).filter(r => db().users[r.from]).length; };

  function befriend(a, b) {
    a.friends ||= []; b.friends ||= [];
    if (!a.friends.includes(b.id)) a.friends.push(b.id);
    if (!b.friends.includes(a.id)) b.friends.push(a.id);
    dropRequests(db(), a.id, b.id);
  }

  function codeOf(user) {
    if (user.code) return user.code;
    const taken = new Set(Object.values(db().users).map(u => u.code).filter(Boolean));
    let code;
    do code = Array.from(crypto.randomBytes(6), b => CODE_ABC[b % CODE_ABC.length]).join(''); while (taken.has(code));
    user.code = code; persist();
    return code;
  }
  const byCode = code => {
    const c = String(code || '').trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    return c ? Object.values(db().users).find(u => u.code === c) : null;
  };
  const card = u => ({
    code: codeOf(u), name: u.name, xp: u.state?.xp || 0, level: levelOf(u.state?.xp || 0), week: weekXp(u.state),
    streak: u.state?.streak || 0, active: u.state?.lastActive || null, lang: u.state?.lang || 'en'
  });
  // Карточка для запроса: без кода — по нему добавляли бы без согласия
  const reqCard = (u, r, me) => ({ pid: pidOf(u), name: u.name, xp: u.state?.xp || 0, level: levelOf(u.state?.xp || 0), week: weekXp(u.state),
    streak: u.state?.streak || 0, lang: u.state?.lang || 'en', at: r.at, classmate: sameClass(db(), u, me) });

  function pruneDuels() {
    const now = Date.now();
    for (const [id, d] of Object.entries(db().duels)) if (now - d.created > DUEL_TTL) delete db().duels[id];
  }

  function duelView(d, me) {
    const role = d.from === me.id ? 'a' : 'b';
    const other = db().users[role === 'a' ? d.to : d.from];
    const mine = d[role], theirs = d[role === 'a' ? 'b' : 'a'];
    const w = winner(d);
    return {
      id: d.id, lang: d.lang, role, created: d.created, n: d.words.length,
      opponent: other ? { name: other.name, code: codeOf(other) } : { name: 'Удалённый пользователь', code: '' },
      mine, theirs: mine ? theirs : theirs ? { played: true } : null, // чужой счёт виден только после своей игры
      result: w ? (w === 'draw' ? 'draw' : w === role ? 'win' : 'lose') : null,
      words: role === 'b' && !d.b ? d.words.map(x => ({ w: x.w, opts: x.opts })) : mine ? d.words.map(x => ({ w: x.w, t: x.t })) : undefined
    };
  }

  async function handle(route, req, res, session) {
    const me = session.user;
    me.friends ||= [];

    if (route === 'GET /api/social') {
      pruneDuels();
      const friends = me.friends.map(id => db().users[id]).filter(Boolean).map(card)
        .sort((a, b) => b.week - a.week || b.xp - a.xp);
      const duels = Object.values(db().duels).filter(d => d.from === me.id || d.to === me.id)
        .sort((a, b) => b.created - a.created).slice(0, 30).map(d => duelView(d, me));
      pruneReqs();
      const users = db().users;
      const reqsIn = incoming(me).sort((a, b) => b.at - a.at).map(r => reqCard(users[r.from], r, me));
      const reqsOut = db().friendReqs.filter(r => r.from === me.id && !r.gone).sort((a, b) => b.at - a.at).map(r => reqCard(users[r.to], r, me));
      return send(res, 200, { code: codeOf(me), me: card(me), friends, duels, requests: { in: reqsIn, out: reqsOut }, reqFrom: me.friendReqFrom || 'all' });
    }

    if (route === 'POST /api/friends/request') {
      const u = target(await readJson(req));
      pruneReqs();
      if (u && db().friendReqs.some(r => r.from === u.id && r.to === me.id && !r.declined)) {
        // встречный запрос: оба хотят дружить
        if (me.friends.length >= MAX_FRIENDS || (u.friends || []).length >= MAX_FRIENDS) return send(res, 400, { error: `Не больше ${MAX_FRIENDS} друзей` });
        befriend(me, u); persist();
        return send(res, 201, { status: 'friend', friend: card(u) });
      }
      const why = requestDeny(db(), me, u);
      if (why) return send(res, u ? 400 : 404, { error: why });
      db().friendReqs.push({ from: me.id, to: u.id, at: Date.now() });
      persist();
      return send(res, 201, { status: 'out', name: u.name });
    }

    if (route === 'POST /api/friends/respond') {
      const body = await readJson(req);
      const u = target(body);
      const r = u && db().friendReqs.find(x => x.from === u.id && x.to === me.id && !x.declined);
      if (!r) return send(res, 404, { error: 'Запрос не найден — возможно, его уже отозвали' });
      if (body.accept) {
        if ((me.blocked || []).includes(u.id) || (u.blocked || []).includes(me.id)) { dropRequests(db(), me.id, u.id); persist(); return send(res, 403, { error: 'Общение с этим учеником ограничено' }); }
        if (me.friends.length >= MAX_FRIENDS || (u.friends || []).length >= MAX_FRIENDS) return send(res, 400, { error: `Не больше ${MAX_FRIENDS} друзей` });
        befriend(me, u); persist();
        return send(res, 200, { status: 'friend', friend: card(u) });
      }
      // отказ не показываем отправителю: у него запрос просто остаётся «отправлен», повторить можно не скоро
      r.declined = true; r.at = Date.now();
      persist();
      return send(res, 200, { status: null });
    }

    if (route === 'POST /api/friends/cancel') {
      const u = target(await readJson(req));
      if (!u) return send(res, 404, { error: 'Не найден' });
      const r = db().friendReqs.find(x => x.from === me.id && x.to === u.id);
      if (!r) return send(res, 404, { error: 'Запрос не найден' });
      // неотвеченный запрос удаляем; отклонённый только прячем у отправителя — пауза перед повтором остаётся
      if (r.declined) r.gone = true;
      else db().friendReqs = db().friendReqs.filter(x => x !== r);
      persist();
      return send(res, 200, { status: null });
    }

    if (route === 'POST /api/friends/settings') {
      const { reqFrom } = await readJson(req);
      if (!REQ_FROM.includes(reqFrom)) return send(res, 400, { error: 'Неизвестная настройка' });
      me.friendReqFrom = reqFrom; persist();
      return send(res, 200, { reqFrom });
    }

    if (route === 'POST /api/friends') {
      const { code } = await readJson(req);
      const u = byCode(code);
      if (!u) return send(res, 404, { error: 'Пользователь с таким кодом не найден' });
      if (u.id === me.id) return send(res, 400, { error: 'Это ваш собственный код' });
      if ((me.blocked || []).includes(u.id)) return send(res, 400, { error: `Вы заблокировали ${u.name}. Разблокировать можно на странице «Сообщения»` });
      if ((u.blocked || []).includes(me.id)) return send(res, 403, { error: 'Этот ученик ограничил общение с вами' });
      u.friends ||= [];
      if (me.friends.includes(u.id)) return send(res, 409, { error: `${u.name} уже у вас в друзьях` });
      if (me.friends.length >= MAX_FRIENDS || u.friends.length >= MAX_FRIENDS) return send(res, 400, { error: `Не больше ${MAX_FRIENDS} друзей` });
      befriend(me, u);
      persist();
      return send(res, 201, { friend: card(u) });
    }

    if (route === 'POST /api/friends/remove') {
      const { code } = await readJson(req);
      const u = byCode(code);
      if (!u) return send(res, 404, { error: 'Не найден' });
      me.friends = me.friends.filter(id => id !== u.id);
      u.friends = (u.friends || []).filter(id => id !== me.id);
      persist();
      return send(res, 200, { ok: true });
    }

    if (route === 'POST /api/duels') {
      const { to, lang, words, answers, ms } = await readJson(req);
      const u = byCode(to);
      if (!u || !me.friends.includes(u.id)) return send(res, 400, { error: 'Вызвать можно только друга' });
      const clean = cleanWords(words);
      if (!clean) return send(res, 400, { error: 'Некорректные слова дуэли' });
      pruneDuels();
      const open = Object.values(db().duels).filter(d => d.from === me.id && !d.b).length;
      if (open >= MAX_OPEN_DUELS) return send(res, 429, { error: 'Слишком много незавершённых вызовов — дождитесь ответов' });
      const id = crypto.randomBytes(8).toString('base64url');
      const d = { id, from: me.id, to: u.id, lang: LANGS.includes(lang) ? lang : 'en', words: clean, created: Date.now(),
        a: { score: scoreOf(clean, answers), ms: cleanMs(ms), at: Date.now() }, b: null };
      db().duels[id] = d; persist();
      return send(res, 201, { duel: duelView(d, me) });
    }

    if (route === 'POST /api/duels/answer') {
      const { id, answers, ms } = await readJson(req);
      const d = db().duels[String(id || '')];
      if (!d || d.to !== me.id) return send(res, 404, { error: 'Вызов не найден' });
      if (d.b) return send(res, 409, { error: 'Вы уже ответили на этот вызов' });
      d.b = { score: scoreOf(d.words, answers), ms: cleanMs(ms), at: Date.now() };
      persist();
      return send(res, 200, { duel: duelView(d, me) });
    }
    return false;
  }

  // Ссылка-приглашение ?friend=КОД: до входа показываем, кто зовёт в друзья (только имя)
  function handlePublic(route, req, res, url) {
    if (route !== 'GET /api/invite') return false;
    const u = byCode(url.searchParams.get('code'));
    return u ? send(res, 200, { name: u.name }) : send(res, 404, { error: 'Приглашение не найдено' });
  }

  return { handle, handlePublic, codeOf, byCode, pidOf, byPid, incomingCount, relOf: (me, u) => relOf(db(), me, u) };
}
