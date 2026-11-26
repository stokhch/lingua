import test from 'node:test';
import assert from 'node:assert/strict';
import { satiety, fedStreak, fedDays } from '../public/js/pim.js';
import { dayKey } from '../public/js/stats.js';

const now = new Date('2026-11-26T15:00:00');
const key = o => dayKey(new Date(now.getTime() + o * 86400000));

test('Новый ученик: Пим просто голоден, а не «очень голоден»', () => {
  const s = satiety({}, 50, now);
  assert.equal(s.state, 'hungry');
  assert.equal(s.apples, 0);
  assert.equal(s.left, 50);
});

test('Сытость растёт с опытом: яблоки и состояния', () => {
  assert.equal(satiety({ [key(0)]: 10 }, 50, now).apples, 1);
  assert.equal(satiety({ [key(0)]: 10 }, 50, now).state, 'snack');
  assert.equal(satiety({ [key(0)]: 30 }, 50, now).state, 'almost');
  const full = satiety({ [key(0)]: 50 }, 50, now);
  assert.deepEqual([full.state, full.apples, full.left, full.part], ['full', 5, 0, 0]);
  assert.equal(satiety({ [key(0)]: 100 }, 50, now).state, 'feast');
  assert.equal(satiety({ [key(0)]: 15 }, 50, now).part.toFixed(1), '0.5');
});

test('Несколько дней без занятий — Пим очень голоден', () => {
  const s = satiety({ [key(-4)]: 60 }, 50, now);
  assert.equal(s.state, 'starving');
  assert.equal(s.missed, 3);
  assert.equal(satiety({ [key(-1)]: 60 }, 50, now).state, 'hungry');
});

test('Сытые дни подряд: сегодняшний голодный день серию не обрывает', () => {
  const log = { [key(-3)]: 50, [key(-2)]: 70, [key(-1)]: 55, [key(0)]: 10 };
  assert.equal(fedStreak(log, 50, now), 3);
  assert.equal(fedStreak({ ...log, [key(0)]: 50 }, 50, now), 4);
  assert.equal(fedStreak({ ...log, [key(-2)]: 10 }, 50, now), 1);
  assert.equal(fedDays(log, 50), 3);
});
