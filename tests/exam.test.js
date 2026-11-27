import test from 'node:test';
import assert from 'node:assert/strict';
import { COURSES as EN } from '../public/js/data/grammar.js';
import { COURSES as TR } from '../public/js/data/tr/grammar.js';
import { COURSES as KRC } from '../public/js/data/krc/grammar.js';
import { COURSES as DE } from '../public/js/data/de/grammar.js';

// exam.js зависит от DOM, поэтому шкалу оценок проверяем копией правила
const gradeOf = pct => pct >= 90 ? 5 : pct >= 75 ? 4 : pct >= 60 ? 3 : 2;

test('Итоговый тест: в каждом курсе хватает заданий', () => {
  for (const c of [...EN, ...TR, ...KRC, ...DE]) {
    const n = c.lessons.reduce((s, l) => s + l.exercises.length, 0);
    assert.ok(n >= 5, c.id);
    assert.ok(!/-cert$/.test(c.id), c.id);
    for (const l of c.lessons) for (const ex of l.exercises) {
      assert.ok(ex.q && ex.a, `${c.id}/${l.id}`);
      if (ex.type === 'choice') assert.ok(ex.options.some(o => ex.a.split('/').includes(o)), `${l.id}: ${ex.q}`);
    }
  }
});

test('Итоговый тест: шкала оценок', () => {
  assert.equal(gradeOf(100), 5); assert.equal(gradeOf(90), 5); assert.equal(gradeOf(80), 4); assert.equal(gradeOf(60), 3); assert.equal(gradeOf(59), 2);
});
