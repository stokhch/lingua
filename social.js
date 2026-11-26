// Друзья и дуэли (серверная часть). Подключается в server.js: social.handle(route, req, res, session).
//   GET  /api/social                          -> { code, friends, duels }
//   POST /api/friends         { code }        -> добавить друга по коду (дружба взаимная)
//   POST /api/friends/remove  { code }        -> удалить из друзей
//   POST /api/duels           { to, lang, words, answers, ms }  -> вызвать друга: вы уже сыграли, он отвечает на те же слова
//   POST /api/duels/answer    { id, answers, ms }               -> ответ на вызов
// Счёт считает сервер по выбранным вариантам, а не по словам клиента.
import crypto from 'node:crypto';

const CODE_ABC = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const MAX_FRIENDS = 100;
const MAX_OPEN_DUELS = 20;
const DUEL_TTL = 14 * 86400000;
const LANGS = ['en', 'tr', 'el', 'krc'];

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
  const db = () => { const d = getDb(); d.duels ||= {}; return d; };

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
      return send(res, 200, { code: codeOf(me), me: card(me), friends, duels });
    }

    if (route === 'POST /api/friends') {
      const { code } = await readJson(req);
      const u = byCode(code);
      if (!u) return send(res, 404, { error: 'Пользователь с таким кодом не найден' });
      if (u.id === me.id) return send(res, 400, { error: 'Это ваш собственный код' });
      u.friends ||= [];
      if (me.friends.includes(u.id)) return send(res, 409, { error: `${u.name} уже у вас в друзьях` });
      if (me.friends.length >= MAX_FRIENDS || u.friends.length >= MAX_FRIENDS) return send(res, 400, { error: `Не больше ${MAX_FRIENDS} друзей` });
      me.friends.push(u.id);
      if (!u.friends.includes(me.id)) u.friends.push(me.id);
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

  return { handle };
}
