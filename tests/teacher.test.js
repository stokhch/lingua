import test from 'node:test';
import assert from 'node:assert/strict';
import { contestScore, contestStatus, cleanContest, studentSummary, studentDetail, liveStreak, rank, createTeacher } from '../teacher.js';
import { dayKey } from '../public/js/stats.js';

const now = new Date('2026-11-26T15:00:00');
const key = off => dayKey(new Date(now.getTime() + off * 86400000));
const at = off => new Date(now.getTime() + off * 86400000).getTime();

const state = () => ({
  xp: 300, lang: 'en', streak: 4, bestStreak: 9, lastActive: key(-1), goal: 50,
  xpLog: { [key(0)]: 40, [key(-1)]: 30, [key(-3)]: 20, [key(-10)]: 100 },
  days: { [key(0)]: { x: { en: 30, tr: 10 }, t: 2, a: 20, c: 15, r: 3 }, [key(-1)]: { x: { tr: 30 }, t: 1, a: 10, c: 9, r: 0 } },
  words: {
    cat: { w: 'cat', t: 'кошка', added: at(-5), learnedAt: at(-1), srs: { ivl: 3, due: at(3) }, trained: {} },
    dog: { w: 'dog', t: 'собака', added: at(-2), trained: { wt: true } }
  },
  grammar: { l1: { passed: true, best: 90, at: at(-2) } }, readTexts: { t1: 1 },
  byLang: { tr: { words: { ev: { w: 'ev', t: 'дом', added: at(-8), learnedAt: at(0), srs: { ivl: 1, due: at(1) } } }, grammar: {}, readTexts: {} } },
  stats: { answers: 40, correct: 30 }
});

test('Учитель: сводка по ученику по всем языкам', () => {
  const s = studentSummary(state(), now);
  assert.equal(s.week, 90);
  assert.equal(s.streak, 4);
  assert.equal(s.known, 2);
  assert.equal(s.words, 3);
  assert.equal(s.lessons, 1);
  assert.equal(s.accuracy, 75);
  assert.deepEqual(s.langs.map(l => l.id), ['en', 'tr']);
  assert.equal(s.langs.find(l => l.id === 'tr').xp7, 40);
});

test('Учитель: прерванная серия показывается нулём', () => {
  assert.equal(liveStreak({ streak: 5, lastActive: key(-2) }, now), 0);
  assert.equal(liveStreak({ streak: 5, lastActive: key(0) }, now), 5);
  assert.equal(studentSummary(null, now).xp, 0);
});

test('Учитель: подробности — 14 дней и последние слова', () => {
  const d = studentDetail(state(), now);
  assert.equal(d.days.length, 14);
  assert.equal(d.days.at(-1).xp, 40);
  assert.equal(d.recentWords[0].w, 'ev');
  assert.equal(d.recentWords[0].kind, 'learned');
  assert.equal(d.recentLessons[0].id, 'l1');
});

test('Соревнование: очки по показателю и языку', () => {
  const c = { start: key(-2), end: key(4), lang: 'all', metric: 'xp' };
  assert.equal(contestScore(state(), c, now), 70);
  assert.equal(contestScore(state(), { ...c, lang: 'tr' }, now), 40);
  assert.equal(contestScore(state(), { ...c, metric: 'days' }, now), 2);
  assert.equal(contestScore(state(), { ...c, metric: 'answers' }, now), 24);
  assert.equal(contestScore(state(), { ...c, metric: 'words' }, now), 2);
  assert.equal(contestScore(state(), { ...c, metric: 'words', lang: 'en' }, now), 1);
  assert.equal(contestScore(state(), { ...c, start: key(1) }, now), 0);
  assert.equal(contestStatus({ start: key(1), end: key(3) }, now), 'soon');
  assert.equal(contestStatus({ start: key(-1), end: key(0) }, now), 'live');
  assert.equal(contestStatus({ start: key(-5), end: key(-1) }, now), 'done');
});

test('Соревнование: проверка того, что задаёт учитель', () => {
  const ok = { title: ' Марафон ', metric: 'words', lang: 'tr', start: key(0), end: key(6), goal: '30' };
  assert.deepEqual(cleanContest(ok, now), { title: 'Марафон', metric: 'words', lang: 'tr', start: key(0), end: key(6), goal: 30 });
  assert.equal(cleanContest({ ...ok, metric: 'hack' }, now), null);
  assert.equal(cleanContest({ ...ok, lang: 'de' }, now), null);
  assert.equal(cleanContest({ ...ok, end: key(-1), start: key(-3) }, now), null); // уже закончилось
  assert.equal(cleanContest({ ...ok, end: key(200) }, now), null); // слишком долго
  assert.equal(cleanContest({ ...ok, title: '' }, now), null);
});

test('Рейтинг: равные очки делят место', () => {
  const r = rank([{ name: 'Б', score: 5 }, { name: 'А', score: 5 }, { name: 'В', score: 9 }]);
  assert.deepEqual(r.map(x => [x.name, x.pos]), [['В', 1], ['А', 2], ['Б', 2]]);
});

// Мини-сервер в памяти: проверяем согласие и приватность
function harness() {
  const db = { users: {}, sessions: {} };
  const out = {};
  const t = createTeacher({ getDb: () => db, persist() {}, send: (res, status, data) => { out.status = status; out.data = data; }, readJson: async req => req.body });
  const call = async (user, route, body = {}, query = '') => {
    await t.handle(route, { body }, {}, { user }, new URL('http://x/' + query));
    return { ...out };
  };
  const mk = (id, name) => (db.users[id] = { id, name, state: state() });
  return { db, call, mk };
}

test('Классы: вступление только с согласием, учитель видит только своих учеников', async () => {
  const { call, mk } = harness();
  const teach = mk('t', 'Учитель'), ann = mk('a', 'Аня'), bob = mk('b', 'Боря'), eve = mk('e', 'Ева');
  assert.equal((await call(teach, 'POST /api/classes', { name: '7Б' })).status, 403);
  await call(teach, 'POST /api/teacher/enable');
  const k = (await call(teach, 'POST /api/classes', { name: '7Б' })).data.class;
  assert.equal((await call(ann, 'POST /api/join', { code: k.code })).status, 400); // без согласия
  assert.equal((await call(ann, 'POST /api/join', { code: k.code.toLowerCase(), consent: true })).status, 201);
  assert.equal((await call(bob, 'POST /api/join', { code: k.code, consent: true })).status, 201);
  assert.equal((await call(teach, 'POST /api/join', { code: k.code, consent: true })).status, 400);

  const one = (await call(teach, 'GET /api/classes/one', {}, '?id=' + k.id)).data;
  assert.deepEqual(one.students.map(s => s.name).sort(), ['Аня', 'Боря']);
  assert.equal((await call(teach, 'GET /api/classes/student', {}, `?id=${k.id}&uid=e`)).status, 404); // Ева не в классе
  assert.equal((await call(eve, 'GET /api/classes/one', {}, '?id=' + k.id)).status, 404); // чужой класс
  assert.equal((await call(ann, 'GET /api/classes/student', {}, `?id=${k.id}&uid=b`)).status, 404); // ученик не видит одноклассника

  // ученик видит рейтинг класса без подробностей
  const mine = (await call(ann, 'GET /api/classes')).data.joined[0];
  assert.equal(mine.week.length, 2);
  assert.equal(mine.week[0].uid, undefined);
  assert.equal(mine.week[0].known, undefined);

  // соревнование
  const today = dayKey(new Date());
  const c = await call(teach, 'POST /api/classes/contest', { id: k.id, title: 'Неделя слов', metric: 'xp', lang: 'all', start: today, end: today, goal: 10 });
  assert.equal(c.status, 201);
  const sv = (await call(ann, 'GET /api/classes')).data.joined[0].contests[0];
  assert.equal(sv.rows.length, 2);
  assert.ok(sv.rows.every(r => r.uid === undefined));

  // выход из класса: учитель больше не видит прогресс
  await call(ann, 'POST /api/classes/leave', { id: k.id });
  assert.equal((await call(teach, 'GET /api/classes/student', {}, `?id=${k.id}&uid=a`)).status, 404);
  // новый код: старый больше не работает
  await call(teach, 'POST /api/classes/code', { id: k.id });
  assert.equal((await call(eve, 'POST /api/join', { code: k.code, consent: true })).status, 404);
});
