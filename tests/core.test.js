import test from 'node:test';
import assert from 'node:assert/strict';
import { review, newCard } from '../public/js/srs.js';
import { lookup } from '../public/js/data/dictionary.js';
import { TEXTS } from '../public/js/data/texts.js';

test('SRS: интервалы растут при ответах «Помню»', () => {
  let c = newCard(0), prev = 0;
  for (let i = 0; i < 5; i++) { c = review(c, 2, c.due); assert.ok(c.ivl >= prev); prev = c.ivl; }
  assert.ok(prev > 10);
});

test('SRS: «Не помню» сбрасывает интервал', () => {
  const c = review(review(newCard(0), 2, 0), 0, 1);
  assert.equal(c.reps, 0);
  assert.equal(c.lapses, 1);
});

test('Лемматизация находит формы слов', () => {
  assert.equal(lookup('travelled').word, 'travel');
  assert.equal(lookup('studies').word, 'study');
  assert.equal(lookup('went').word, 'go');
  assert.ok(lookup('Castles').translation);
});

test('Все слова в текстах (кроме имён собственных) есть в словаре', () => {
  const missing = new Set();
  for (const t of TEXTS) for (const tok of t.body.match(/[A-Za-z’'-]+/g)) {
    if (!lookup(tok).translation && !/^[A-Z][a-z]+$/.test(tok)) missing.add(tok);
  }
  assert.deepEqual([...missing], []);
});
