// Режим учителя (серверная часть). Подключается в server.js: teacher.handle(route, req, res, session, url).
// Учитель создаёт классы, ученик вступает сам — по коду или ссылке #join-КОД, после явного согласия.
// Учителю виден прогресс только тех, кто вступил в его класс; ученик может выйти в любой момент.
// Одноклассники видят друг у друга только имя, опыт за неделю, серию дней и очки в соревнованиях.
//
//   GET  /api/classes                       -> { teacher, teaching: [класс кратко], joined: [класс глазами ученика] }
//   POST /api/teacher/enable                -> стать учителем
//   POST /api/classes          { name }     -> создать класс
//   POST /api/classes/rename   { id, name }
//   POST /api/classes/delete   { id }
//   POST /api/classes/code     { id }       -> новый код приглашения (старый перестаёт работать)
//   GET  /api/classes/one?id=               -> панель учителя: ученики, рейтинг недели, соревнования
//   GET  /api/classes/student?id=&uid=      -> подробно об ученике: языки, активность за 14 дней, последние слова
//   POST /api/classes/remove   { id, uid }  -> исключить ученика
//   POST /api/classes/contest  { id, title, metric, lang, start, end, goal }
//   POST /api/classes/contest/delete { id, cid }
//   GET  /api/join?code=                    -> что за класс (перед согласием)
//   POST /api/join             { code, consent: true }
//   POST /api/classes/leave    { id }
import crypto from 'node:crypto';
import { levelOf } from './social.js';
import { wordCounts, langData, sumDays, lastDays, dayKey } from './public/js/stats.js';

const CODE_ABC = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const LANGS = ['en', 'tr', 'el', 'krc'];
const MAX_CLASSES = 20, MAX_STUDENTS = 100, MAX_CONTESTS = 30, MAX_DAYS = 92;
export const METRICS = {
  xp: 'Опыт (XP)',
  words: 'Изученные слова',
  days: 'Дни с занятиями',
  answers: 'Верные ответы'
};
const DAY = 86400000;

const isDate = s => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s + 'T12:00:00'));
const noonOf = key => new Date(key + 'T12:00:00');

// Текущая серия: если последний день занятий был раньше вчера, серия уже прервалась
export function liveStreak(s, now = new Date()) {
  const t = dayKey(now), y = dayKey(new Date(now.getTime() - DAY));
  return s?.lastActive === t || s?.lastActive === y ? s.streak || 0 : 0;
}

// Ключи дней соревнования с начала по сегодняшний день (не дальше конца)
export function contestDays(c, now = new Date()) {
  const today = dayKey(now), last = c.end < today ? c.end : today;
  const out = [];
  for (let d = noonOf(c.start); dayKey(d) <= last && out.length <= MAX_DAYS; d = new Date(d.getTime() + DAY)) out.push(dayKey(d));
  return out;
}

export function contestStatus(c, now = new Date()) {
  const t = dayKey(now);
  return t < c.start ? 'soon' : t > c.end ? 'done' : 'live';
}

// Очки ученика в соревновании. Язык 'all' — по всем языкам.
export function contestScore(s, c, now = new Date()) {
  if (!s) return 0;
  const keys = contestDays(c, now);
  if (!keys.length) return 0;
  const all = c.lang === 'all';
  if (c.metric === 'xp') return keys.reduce((n, k) => n + (all ? s.xpLog?.[k] || 0 : s.days?.[k]?.x?.[c.lang] || 0), 0);
  if (c.metric === 'days') return keys.filter(k => (all ? s.xpLog?.[k] : s.days?.[k]?.x?.[c.lang]) > 0).length;
  if (c.metric === 'answers') return keys.reduce((n, k) => n + (s.days?.[k]?.c || 0), 0);
  if (c.metric === 'words') {
    const from = noonOf(c.start).getTime() - DAY, to = noonOf(c.end).getTime() + DAY;
    const set = new Set(keys);
    let n = 0;
    for (const id of all ? LANGS : [c.lang]) for (const w of Object.values(langData(s, id).words)) {
      if (w.srs && w.learnedAt > from && w.learnedAt < to && set.has(dayKey(new Date(w.learnedAt)))) n++;
    }
    return n;
  }
  return 0;
}

// Сводка по одному языку ученика
function langOf(s, id, now) {
  const d = langData(s, id);
  const c = wordCounts(d.words, now.getTime());
  const g = Object.values(d.grammar);
  return {
    id, current: d.current, words: c,
    lessonsPassed: g.filter(x => x?.passed).length,
    textsRead: Object.keys(d.readTexts).length,
    xp7: sumDays(s.days, 7, now).x[id] || 0,
    xp30: sumDays(s.days, 30, now).x[id] || 0
  };
}

// Сводка по ученику для таблицы учителя
export function studentSummary(s, now = new Date()) {
  s ||= {};
  const langs = LANGS.map(id => langOf(s, id, now)).filter(l => l.current || l.words.total || l.lessonsPassed || l.textsRead || l.xp30);
  const week = lastDays(7, now).reduce((n, d) => n + (s.xpLog?.[d.key] || 0), 0);
  const prevWeek = lastDays(7, new Date(now.getTime() - 7 * DAY)).reduce((n, d) => n + (s.xpLog?.[d.key] || 0), 0);
  const st = s.stats || {};
  return {
    xp: s.xp || 0, level: levelOf(s.xp || 0), week, prevWeek, streak: liveStreak(s, now), bestStreak: s.bestStreak || 0,
    active: s.lastActive || null, lang: s.lang || 'en', goal: s.goal || 50,
    known: langs.reduce((n, l) => n + l.words.known, 0),
    words: langs.reduce((n, l) => n + l.words.total, 0),
    due: langs.reduce((n, l) => n + l.words.due, 0),
    lessons: langs.reduce((n, l) => n + l.lessonsPassed, 0),
    accuracy: st.answers ? Math.round((st.correct / st.answers) * 100) : null,
    langs
  };
}

// Подробно: активность по дням и последние слова и уроки
export function studentDetail(s, now = new Date()) {
  s ||= {};
  const days = lastDays(14, now).map(({ key }) => {
    const d = s.days?.[key] || {};
    return { key, xp: s.xpLog?.[key] || 0, x: d.x || {}, t: d.t || 0, a: d.a || 0, c: d.c || 0, r: d.r || 0 };
  });
  const words = [], lessons = [];
  for (const id of LANGS) {
    const d = langData(s, id);
    for (const w of Object.values(d.words)) {
      if (w.added) words.push({ lang: id, w: w.w, t: w.t, at: w.added, kind: 'added' });
      if (w.srs && w.learnedAt) words.push({ lang: id, w: w.w, t: w.t, at: w.learnedAt, kind: 'learned' });
    }
    for (const [lid, g] of Object.entries(d.grammar)) if (g?.at) lessons.push({ lang: id, id: lid, best: g.best || 0, passed: !!g.passed, at: g.at });
  }
  const byAt = (a, b) => b.at - a.at;
  return { days, recentWords: words.sort(byAt).slice(0, 30), recentLessons: lessons.sort(byAt).slice(0, 15) };
}

// Проверка соревнования, которое задаёт учитель
export function cleanContest(x, now = new Date()) {
  if (!x || typeof x !== 'object') return null;
  const title = String(x.title || '').trim().slice(0, 60);
  if (!title || !METRICS[x.metric] || !(x.lang === 'all' || LANGS.includes(x.lang))) return null;
  if (!isDate(x.start) || !isDate(x.end) || x.end < x.start) return null;
  const len = Math.round((noonOf(x.end) - noonOf(x.start)) / DAY) + 1;
  if (len > MAX_DAYS || x.end < dayKey(now)) return null;
  const goal = Math.max(0, Math.min(100000, Math.round(Number(x.goal) || 0)));
  return { title, metric: x.metric, lang: x.lang, start: x.start, end: x.end, goal };
}

// Рейтинг: больше очков — выше, при равенстве — по алфавиту
export function rank(rows) {
  rows.sort((a, b) => b.score - a.score || String(a.name).localeCompare(String(b.name), 'ru'));
  let pos = 0, prev = null;
  rows.forEach((r, i) => { if (r.score !== prev) { pos = i + 1; prev = r.score; } r.pos = pos; });
  return rows;
}

export function createTeacher({ getDb, persist, send, readJson }) {
  const db = () => { const d = getDb(); d.classes ||= {}; return d; };
  const users = () => db().users;

  function newCode() {
    const taken = new Set(Object.values(db().classes).map(c => c.code));
    let code;
    do code = Array.from(crypto.randomBytes(6), b => CODE_ABC[b % CODE_ABC.length]).join(''); while (taken.has(code));
    return code;
  }
  const byCode = code => {
    const c = String(code || '').trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    return c ? Object.values(db().classes).find(k => k.code === c) : null;
  };
  const students = k => k.students.map(id => users()[id]).filter(Boolean);
  const own = (me, id) => { const k = db().classes[String(id || '')]; return k && k.owner === me.id ? k : null; };
  const member = (me, id) => { const k = db().classes[String(id || '')]; return k && k.students.includes(me.id) ? k : null; };

  // Соревнование с таблицей; full — для учителя (с uid), иначе только имена
  function contestView(k, c, me, now, full) {
    const rows = rank(students(k).map(u => ({ uid: full ? u.id : undefined, me: u.id === me.id, name: u.name, score: contestScore(u.state, c, now) })));
    if (!full) rows.forEach(r => delete r.uid);
    return { ...c, status: contestStatus(c, now), metricName: METRICS[c.metric], rows, reached: c.goal ? rows.filter(r => r.score >= c.goal).length : null };
  }
  const weekBoard = (k, me, now) => rank(students(k).map(u => ({
    me: u.id === me.id, name: u.name, score: studentSummary(u.state, now).week, streak: liveStreak(u.state, now)
  })));

  const brief = k => ({ id: k.id, name: k.name, code: k.code, created: k.created, students: k.students.length,
    contests: k.contests.filter(c => contestStatus(c) !== 'done').length });

  function studentClassView(k, me, now) {
    const t = users()[k.owner];
    return { id: k.id, name: k.name, teacher: t?.name || 'Учитель', students: k.students.length,
      week: weekBoard(k, me, now), contests: k.contests.filter(c => contestStatus(c, now) !== 'done' || dayKey(now) <= addDays(c.end, 14)).map(c => contestView(k, c, me, now, false)) };
  }

  async function handle(route, req, res, session, url) {
    const me = session.user, now = new Date();
    if (!route.startsWith('GET /api/classes') && !route.startsWith('POST /api/classes') && !route.endsWith('/api/join') && route !== 'POST /api/teacher/enable') return false;

    if (route === 'GET /api/classes') {
      const all = Object.values(db().classes);
      return send(res, 200, {
        teacher: !!me.teacher,
        teaching: all.filter(k => k.owner === me.id).sort((a, b) => a.created - b.created).map(brief),
        joined: all.filter(k => k.students.includes(me.id)).map(k => studentClassView(k, me, now))
      });
    }

    if (route === 'POST /api/teacher/enable') { me.teacher = true; persist(); return send(res, 200, { teacher: true }); }

    if (route === 'POST /api/classes') {
      if (!me.teacher) return send(res, 403, { error: 'Сначала включите режим учителя' });
      const name = String((await readJson(req)).name || '').trim().slice(0, 60);
      if (!name) return send(res, 400, { error: 'Назовите класс' });
      if (Object.values(db().classes).filter(k => k.owner === me.id).length >= MAX_CLASSES) return send(res, 400, { error: `Не больше ${MAX_CLASSES} классов` });
      const id = crypto.randomBytes(8).toString('base64url');
      const k = { id, name, owner: me.id, code: newCode(), created: Date.now(), students: [], contests: [] };
      db().classes[id] = k; persist();
      return send(res, 201, { class: brief(k) });
    }

    if (route === 'GET /api/classes/one') {
      const k = own(me, url.searchParams.get('id'));
      if (!k) return send(res, 404, { error: 'Класс не найден' });
      const list = students(k).map(u => ({ uid: u.id, name: u.name, ...studentSummary(u.state, now) }))
        .sort((a, b) => b.week - a.week || b.xp - a.xp);
      return send(res, 200, {
        class: brief(k), students: list, week: weekBoard(k, me, now),
        contests: [...k.contests].sort((a, b) => b.created - a.created).map(c => contestView(k, c, me, now, true))
      });
    }

    if (route === 'GET /api/classes/student') {
      const k = own(me, url.searchParams.get('id'));
      const uid = url.searchParams.get('uid');
      if (!k || !k.students.includes(uid) || !users()[uid]) return send(res, 404, { error: 'Ученик не найден в этом классе' });
      const u = users()[uid];
      return send(res, 200, { class: brief(k), student: { uid, name: u.name, ...studentSummary(u.state, now), ...studentDetail(u.state, now) } });
    }

    if (route === 'GET /api/join') {
      const k = byCode(url.searchParams.get('code'));
      if (!k) return send(res, 404, { error: 'Класс с таким кодом не найден' });
      return send(res, 200, { class: { name: k.name, teacher: users()[k.owner]?.name || 'Учитель', students: k.students.length },
        joined: k.students.includes(me.id), own: k.owner === me.id });
    }

    const body = await readJson(req);

    if (route === 'POST /api/join') {
      const k = byCode(body.code);
      if (!k) return send(res, 404, { error: 'Класс с таким кодом не найден' });
      if (body.consent !== true) return send(res, 400, { error: 'Нужно согласие показывать прогресс учителю' });
      if (k.owner === me.id) return send(res, 400, { error: 'Это ваш собственный класс' });
      if (k.students.includes(me.id)) return send(res, 409, { error: `Вы уже в классе «${k.name}»` });
      if (k.students.length >= MAX_STUDENTS) return send(res, 400, { error: `В классе уже ${MAX_STUDENTS} учеников` });
      k.students.push(me.id); persist();
      return send(res, 201, { class: studentClassView(k, me, now) });
    }

    if (route === 'POST /api/classes/leave') {
      const k = member(me, body.id);
      if (!k) return send(res, 404, { error: 'Класс не найден' });
      k.students = k.students.filter(id => id !== me.id); persist();
      return send(res, 200, { ok: true });
    }

    const k = own(me, body.id);
    if (!k) return send(res, 404, { error: 'Класс не найден' });

    if (route === 'POST /api/classes/rename') {
      const name = String(body.name || '').trim().slice(0, 60);
      if (!name) return send(res, 400, { error: 'Назовите класс' });
      k.name = name; persist();
      return send(res, 200, { class: brief(k) });
    }
    if (route === 'POST /api/classes/delete') { delete db().classes[k.id]; persist(); return send(res, 200, { ok: true }); }
    if (route === 'POST /api/classes/code') { k.code = newCode(); persist(); return send(res, 200, { class: brief(k) }); }
    if (route === 'POST /api/classes/remove') {
      k.students = k.students.filter(id => id !== body.uid); persist();
      return send(res, 200, { ok: true });
    }
    if (route === 'POST /api/classes/contest') {
      const c = cleanContest(body, now);
      if (!c) return send(res, 400, { error: 'Проверьте название, показатель и даты (не дольше 3 месяцев, конец — не в прошлом)' });
      if (k.contests.length >= MAX_CONTESTS) k.contests = k.contests.filter(x => contestStatus(x, now) !== 'done');
      if (k.contests.length >= MAX_CONTESTS) return send(res, 400, { error: `Не больше ${MAX_CONTESTS} соревнований` });
      const item = { id: crypto.randomBytes(6).toString('base64url'), created: Date.now(), ...c };
      k.contests.push(item); persist();
      return send(res, 201, { contest: contestView(k, item, me, now, true) });
    }
    if (route === 'POST /api/classes/contest/delete') {
      k.contests = k.contests.filter(c => c.id !== body.cid); persist();
      return send(res, 200, { ok: true });
    }
    return send(res, 404, { error: 'Not found' });
  }

  return { handle };
}

function addDays(key, n) { return dayKey(new Date(noonOf(key).getTime() + n * DAY)); }
