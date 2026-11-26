import test from 'node:test';
import assert from 'node:assert/strict';
import * as St from '../public/js/stats.js';

const now = new Date('2026-11-26T15:00:00');
const key = (offset) => St.dayKey(new Date(now.getTime() + offset * 86400000));

test('Итоги периода и сравнение с прошлой неделей', () => {
  const log = { [key(0)]: 60, [key(-1)]: 20, [key(-8)]: 40 };
  const s = St.periodSummary(log, 7, 50, now);
  assert.equal(s.xp, 80);
  assert.equal(s.before, 40);
  assert.equal(s.change, 100);
  assert.equal(s.goalDays, 1);
  assert.equal(s.active, 2);
  assert.equal(s.best.key, key(0));
});

test('Календарь начинается с понедельника и заканчивается текущей неделей', () => {
  const g = St.heatmap({ [key(0)]: 120 }, 4, 50, now);
  assert.equal(g.length, 4);
  assert.ok(g.every(w => w.length === 7 && w[0].date.getDay() === 1));
  const cell = g.flat().find(c => c.today);
  assert.equal(cell.key, key(0));
  assert.equal(cell.lvl, 4);
  assert.ok(g[3].some(c => c.future)); // 26.11.2026 — четверг, пятница–воскресенье впереди
});

test('Самая длинная серия по журналу опыта', () => {
  const log = { '2026-01-01': 5, '2026-01-02': 5, '2026-01-03': 5, '2026-01-05': 5, '2026-02-28': 0 };
  assert.deepEqual(St.activityTotals(log), { activeDays: 4, longestRun: 3, first: '2026-01-01' });
});

test('Статусы слов, прочность памяти и история', () => {
  const t = now.getTime();
  const words = {
    a: { w: 'a', trained: {}, srs: null, added: t },
    b: { w: 'b', trained: { wt: true }, srs: null, added: t - 86400000 },
    c: { w: 'c', srs: { due: t + 86400000 * 5, ivl: 5 }, learnedAt: t, added: t - 5 * 86400000 },
    d: { w: 'd', srs: { due: t - 1000, ivl: 90 }, learnedAt: t - 40 * 86400000, added: t - 50 * 86400000 }
  };
  const c = St.wordCounts(words, t);
  assert.deepEqual([c.new, c.learning, c.learned, c.due, c.known], [1, 1, 1, 1, 2]);
  assert.deepEqual(St.strength(words), { fresh: 0, growing: 1, strong: 0, solid: 1 });
  const tl = St.wordTimeline([words], 30, now);
  assert.equal(tl.at(-1).added, 1);
  assert.equal(tl.at(-1).learned, 1);
  assert.equal(tl.reduce((a, d) => a + d.added, 0), 3);
});

test('Сводка по языку берёт данные из byLang для неактивного языка', () => {
  const state = {
    lang: 'en', words: { x: { w: 'x', trained: {}, srs: null } }, readTexts: {}, grammar: {},
    byLang: { tr: { words: { y: { w: 'y', srs: { due: Infinity, ivl: 2 } } }, readTexts: { t1: 1 }, grammar: { g1: { passed: true }, g2: { passed: false } } } },
    days: { [key(0)]: { x: { tr: 12, en: 3 }, t: 1, a: 4, c: 3, r: 0 } }
  };
  const tr = St.langSummary(state, { id: 'tr', TEXTS: [1, 2], ALL_LESSONS: [1, 2, 3] }, now);
  assert.equal(tr.current, false);
  assert.equal(tr.counts.known, 1);
  assert.equal(tr.textsRead, 1);
  assert.equal(tr.lessonsPassed, 1);
  assert.equal(tr.xp30, 12);
  assert.equal(St.sumDays(state.days, 7, now).a, 4);
});

test('Старые записи дневника удаляются', () => {
  const d = { '2020-01-01': St.emptyDay(), [key(0)]: St.emptyDay() };
  St.pruneDays(d, now);
  assert.deepEqual(Object.keys(d), [key(0)]);
});
