import test from 'node:test';
import assert from 'node:assert/strict';
import { lookup, DICT, SETS, SET_INFO } from '../public/js/data/dictionary.js';
import { TEXTS } from '../public/js/data/texts.js';
import { PHRASES } from '../public/js/data/phrases.js';
import { COURSES, ALL_LESSONS } from '../public/js/data/grammar.js';
import { ADV_RAW } from '../public/js/data/en/advanced-sets.js';
import { shelfOf } from '../public/js/materials.js';

const advIds = Object.keys(ADV_RAW);

test('Английский B2–C1: продвинутые наборы — несколько сотен новых слов с переводом', () => {
  assert.ok(advIds.length >= 10);
  const words = new Set();
  for (const id of advIds) {
    assert.ok(SET_INFO[id]?.title.startsWith('B2–C1'), id);
    assert.ok(SETS[id].length >= 40, id);
    for (const w of SETS[id]) { assert.ok(DICT.get(w), `${id}: ${w}`); assert.equal(w, w.toLowerCase(), w); words.add(w); }
  }
  assert.ok(words.size >= 650, `всего ${words.size}`);
  // формы продвинутых глаголов находят словарную форму
  for (const [form, base] of Object.entries({ undermines: 'undermine', prioritised: 'prioritise', jeopardising: 'jeopardise', underwent: 'undergo', withstood: 'withstand' })) {
    assert.equal(lookup(form).word, base, form);
  }
});

test('Английский B2–C1: тексты продвинутого уровня, все слова переводятся по клику', () => {
  const adv = TEXTS.filter(t => t.id.startsWith('en-l-adv-'));
  assert.ok(adv.length >= 12);
  for (const lv of ['B2', 'C1']) assert.ok(adv.filter(t => t.level === lv).length >= 6, lv);
  assert.ok(new Set(adv.map(shelfOf)).size >= 4); // чтение, диалоги, культура, рассказ
  for (const t of adv) {
    const miss = t.body.match(/[A-Za-z’'-]+/g).filter(w => !lookup(w).translation && w.split('-').some(p => p && !lookup(p).translation));
    assert.deepEqual(miss, [], t.id);
  }
});

test('Английский B2–C1: грамматика от B1 до C1, ответ есть среди вариантов', () => {
  for (const lv of ['A1', 'A2', 'B1', 'B2', 'C1']) assert.ok(COURSES.some(c => c.level === lv), lv);
  assert.ok(ALL_LESSONS.length >= 30);
  assert.equal(new Set(ALL_LESSONS.map(l => l.id)).size, ALL_LESSONS.length);
  for (const l of ALL_LESSONS) {
    assert.ok(l.theory && l.exercises.length >= 5, l.id);
    for (const ex of l.exercises) if (ex.type === 'choice') assert.ok(ex.options.includes(ex.a), `${l.id}: ${ex.q}`);
  }
});

test('Английский B2–C1: фразы для конструктора и диктанта, слова переводятся', () => {
  assert.ok(PHRASES.length >= 65);
  for (const p of PHRASES) {
    assert.ok(p.en && p.ru, p.en);
    for (const w of p.en.match(/[A-Za-z’'-]+/g)) assert.ok(lookup(w).translation, `${p.en}: ${w}`);
  }
});
