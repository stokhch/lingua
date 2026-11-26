import test from 'node:test';
import assert from 'node:assert/strict';
import { planSize, buildPlan, progressOf, ensurePlan, settle, bump, dayStart, TASK_XP, PLAN_XP } from '../public/js/dayplan.js';

const date = '2026-03-10';
const now = new Date(date + 'T15:00:00').getTime();
const DAY = 86400000;
const words = {
  a: { w: 'a', added: now - 9 * DAY },
  b: { w: 'b', added: now - 9 * DAY },
  c: { w: 'c', srs: { due: now - DAY, last: now - 3 * DAY } },
  d: { w: 'd', srs: { due: now - 2 * DAY, last: now - 5 * DAY } },
  e: { w: 'e', srs: { due: now + 5 * DAY, last: now - DAY } }
};
const gp = { kind: 'lesson', lesson: { id: 'l1', title: 'Present Simple' }, href: '#lesson-l1' };
const text = { id: 't1', title: 'Утро', level: 'A1', topic: 'Быт' };

test('объём плана растёт с дневной целью', () => {
  assert.ok(planSize(20).learn < planSize(50).learn && planSize(50).learn < planSize(100).learn);
  assert.equal(planSize(50).train, 0);
  assert.ok(planSize(150).train > 0);
});

test('план: слова, повторение, грамматика, чтение', () => {
  const p = buildPlan({ date, goal: 50, words, gp, text, now });
  assert.deepEqual(p.tasks.map(t => t.id), ['learn', 'review', 'grammar', 'read']);
  const rev = p.tasks.find(t => t.id === 'review');
  assert.deepEqual(rev.keys, ['d', 'c']); // сначала давно просроченные
  assert.equal(p.tasks.find(t => t.id === 'learn').href, '#train');
});

test('без новых слов план ведёт к наборам, без повторений — без задания на повторение', () => {
  const p = buildPlan({ date, goal: 50, words: { e: words.e }, gp, text, now });
  assert.equal(p.tasks[0].href, '#sets');
  assert.ok(!p.tasks.some(t => t.id === 'review'));
});

test('при цели 5 минут грамматика и чтение чередуются по дням', () => {
  const a = buildPlan({ date: '2026-03-10', goal: 20, words, gp, text, now }).tasks.map(t => t.id);
  const b = buildPlan({ date: '2026-03-11', goal: 20, words, gp, text, now }).tasks.map(t => t.id);
  assert.equal(a.filter(x => x === 'grammar' || x === 'read').length, 1);
  assert.equal(b.filter(x => x === 'grammar' || x === 'read').length, 1);
  assert.notDeepEqual(a, b);
  assert.ok(buildPlan({ date, goal: 150, words, gp, text, now }).tasks.some(t => t.id === 'train'));
});

test('прогресс считается по словарю, текстам и счётчикам дня', () => {
  const p = buildPlan({ date, goal: 50, words, gp, text, now });
  const w2 = { ...words, a: { ...words.a, srs: { due: now + DAY, last: now }, learnedAt: now }, c: { ...words.c, srs: { due: now + 3 * DAY, last: now } } };
  const ctx = { words: w2, readTexts: { old: now - 2 * DAY }, log: { grammar: 1 }, date };
  const by = id => progressOf(p.tasks.find(t => t.id === id), ctx);
  assert.equal(by('learn'), 1);
  assert.equal(by('review'), 1);
  assert.equal(by('grammar'), 1);
  assert.equal(by('read'), 0); // текст прочитан вчера
  assert.equal(progressOf(p.tasks.find(t => t.id === 'read'), { ...ctx, readTexts: { x: dayStart(date) + 1000 } }), 1);
});

test('награды начисляются один раз, бонус — за весь план', () => {
  let plan = ensurePlan(null, { date, goal: 20, words: { e: words.e }, gp: null, text: null, now });
  assert.deepEqual(plan.tasks.map(t => t.id), ['learn']);
  const learned = Object.fromEntries(['x', 'y', 'z'].map(k => [k, { w: k, srs: {}, learnedAt: now }]));
  let r = settle(plan, { words: learned, readTexts: {}, log: {}, date });
  assert.deepEqual(r.newly, ['learn']);
  assert.equal(r.xp, TASK_XP + PLAN_XP);
  r = settle(r.plan, { words: learned, readTexts: {}, log: {}, date });
  assert.equal(r.xp, 0);
});

test('счётчики дня сохраняются при сборке плана, а новый день начинает заново', () => {
  let saved = bump(null, date, 'train');
  saved = bump(saved, date, 'train');
  const plan = ensurePlan(saved, { date, goal: 150, words, gp, text, now });
  assert.equal(plan.log.train, 2);
  assert.equal(ensurePlan(plan, { date, goal: 150, words, gp, text, now }), plan);
  const changed = ensurePlan({ ...plan, done: { learn: true } }, { date, goal: 50, words, gp, text, now });
  assert.equal(changed.done.learn, true);
  const tomorrow = ensurePlan(plan, { date: '2026-03-11', goal: 150, words, gp, text, now: now + DAY });
  assert.deepEqual(tomorrow.log, {});
  assert.equal(bump(plan, '2026-03-11', 'grammar').log.train, undefined);
});
