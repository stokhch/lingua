import test from 'node:test';
import assert from 'node:assert/strict';
import { IRREGULAR, COMMON, formOk } from '../public/js/data/irregular.js';

test('Неправильные глаголы: полный список без повторов', () => {
  assert.ok(IRREGULAR.length >= 100);
  assert.ok(COMMON < IRREGULAR.length);
  assert.equal(new Set(IRREGULAR.map(v => v.base)).size, IRREGULAR.length);
  for (const v of IRREGULAR) for (const k of ['base', 'past', 'pp', 'tr']) assert.ok(v[k] && v[k] === v[k].trim(), `${v.base}.${k}`);
});

test('Неправильные глаголы: проверка форм с вариантами', () => {
  const learn = IRREGULAR.find(v => v.base === 'learn');
  assert.ok(formOk('learnt', learn.past) && formOk('Learned ', learn.past));
  assert.ok(!formOk('learn', learn.past));
  const be = IRREGULAR.find(v => v.base === 'be');
  assert.ok(formOk('was', be.past) && formOk('were', be.past) && formOk('been', be.pp));
});
