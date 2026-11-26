import test from 'node:test';
import assert from 'node:assert/strict';
import { nextStep, pickByLevel } from '../public/js/placement.js';
import { BANKS } from '../public/js/data/leveltest.js';

const LV = ['A1', 'A2', 'B1', 'B2', 'C1'];
// прогон теста для ученика, который «знает» всё до уровня known включительно
function run(known) {
  const blocks = []; let step;
  while (!(step = nextStep(LV, blocks)).done) blocks.push({ i: step.next, passed: step.next <= known });
  return { level: step.level, blocks: blocks.length };
}

test('Тест на уровень: начинаем с A2 и находим границу', () => {
  assert.deepEqual(nextStep(LV, []), { next: 1 });
  assert.equal(run(-1).level, 'A0');
  assert.equal(run(0).level, 'A1');
  assert.equal(run(1).level, 'A2');
  assert.equal(run(2).level, 'B1');
  assert.equal(run(3).level, 'B2');
  assert.equal(run(4).level, 'C1');
  for (let k = -1; k < 5; k++) assert.ok(run(k).blocks <= LV.length);
});

test('Тест на уровень: в каждом блоке хватает слов и вариантов', () => {
  for (const b of Object.values(BANKS)) for (const lv of b.levels) {
    const items = b.items[lv];
    assert.ok(items.length >= 8, lv);
    assert.equal(new Set(items.map(x => x[1])).size, items.length, `переводы не повторяются: ${lv}`);
    for (const [w, t] of items) assert.ok(w && t);
  }
});

test('Подбор материалов по уровню: свой уровень, затем ниже', () => {
  const items = [{ level: 'A1' }, { level: 'B2' }, { level: 'A2' }, { level: 'B1' }];
  assert.deepEqual(pickByLevel(items, 'B1', 3).map(x => x.level), ['B1', 'A2', 'B2']);
  assert.equal(pickByLevel([{ level: 'A2–B1' }, { level: 'A1' }], 'A2', 1)[0].level, 'A2–B1');
});
