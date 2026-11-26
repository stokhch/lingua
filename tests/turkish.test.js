import test from 'node:test';
import assert from 'node:assert/strict';
import { lookup, lower, DICT, SETS, SET_INFO } from '../public/js/data/tr/dictionary.js';
import { TEXTS } from '../public/js/data/tr/texts.js';
import { PHRASES } from '../public/js/data/tr/phrases.js';
import { ALL_LESSONS } from '../public/js/data/tr/grammar.js';

const TOKEN = /[\p{L}’'-]+/gu;

test('Турецкий: строчные буквы по правилам турецкого (I → ı, İ → i)', () => {
  assert.equal(lower('IRMAK'), 'ırmak');
  assert.equal(lower('İstanbul'), 'istanbul');
});

test('Турецкий: аффиксы отрезаются до словарной формы', () => {
  const cases = {
    evlerimizde: 'ev', kitabı: 'kitap', çocuğu: 'çocuk', okula: 'okul', sokakta: 'sokak',
    geliyorum: 'gelmek', gidiyoruz: 'gitmek', başlıyor: 'başlamak', okuyacağım: 'okumak',
    aldık: 'almak', mutluydu: 'mutlu', "İstanbul'da": 'istanbul', anlamıyorum: 'anlamak'
  };
  for (const [form, base] of Object.entries(cases)) assert.equal(lookup(form).word, base, form);
});

test('Турецкий: все слова в текстах и фразах (кроме имён) переводятся по клику', () => {
  const missing = new Set();
  for (const body of [...TEXTS.map(t => t.body), ...PHRASES.map(p => p.en)]) for (const tok of body.match(TOKEN)) {
    if (/^\p{Lu}/u.test(tok)) continue; // имена собственные
    if (!lookup(tok).translation) missing.add(tok);
  }
  assert.deepEqual([...missing], []);
});

test('Турецкий: наборы непустые, у каждого слова есть перевод', () => {
  assert.deepEqual(Object.keys(SETS).sort(), Object.keys(SET_INFO).sort());
  for (const [id, words] of Object.entries(SETS)) {
    assert.ok(words.length >= 20, id);
    for (const w of words) assert.ok(DICT.get(w), w);
  }
  assert.ok(DICT.size >= 400);
});

test('Турецкий: в упражнениях с выбором правильный ответ есть среди вариантов', () => {
  assert.ok(ALL_LESSONS.length >= 8);
  const ids = new Set();
  for (const l of ALL_LESSONS) {
    assert.ok(!ids.has(l.id)); ids.add(l.id);
    for (const ex of l.exercises) if (ex.type === 'choice') assert.ok(ex.options.includes(ex.a), `${l.id}: ${ex.q}`);
  }
});
