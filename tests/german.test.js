import test from 'node:test';
import assert from 'node:assert/strict';
import { lookup, DICT, SETS, SET_INFO } from '../public/js/data/de/dictionary.js';
import { TEXTS } from '../public/js/data/de/texts.js';
import { PHRASES } from '../public/js/data/de/phrases.js';
import { ALL_LESSONS, COURSES } from '../public/js/data/de/grammar.js';

const TOKEN = /[\p{L}’'-]+/gu;
// Имена людей и клички в текстах — их в словаре нет
const NAMES = new Set(['Paul', 'Anna', 'Thomas', 'Maria', 'Bello', 'Weber', 'Lena', 'Jonas', 'Sara', 'Schulz', 'Mila', 'Tim', 'Julia', 'Novak', 'Anja',
  'Striezelmarkt', 'Hänsel', 'Gretel', 'Jacob', 'Wilhelm', 'Grimm', 'B']); // «B» — из «Niveau B eins»

test('Немецкий: окончания и формы сводятся к словарной форме', () => {
  const cases = {
    Kinder: 'kind', Kindern: 'kind', Häuser: 'haus', Städte: 'stadt', Frauen: 'frau', Mütter: 'mutter',
    arbeitet: 'arbeiten', wohnst: 'wohnen', spielte: 'spielen', gespielt: 'spielen', gegessen: 'essen',
    fährt: 'fahren', ging: 'gehen', bin: 'sein', hatte: 'haben', kann: 'können', möchte: 'mögen',
    aufgestanden: 'aufstehen', eingekauft: 'einkaufen', anzurufen: 'anrufen', verstanden: 'verstehen',
    größten: 'groß', älter: 'alt', besser: 'gut', großen: 'groß', meine: 'mein', keinen: 'kein', dem: 'der', mir: 'ich', "geht's": "wie geht's"
  };
  Object.assign(cases, { zurückbringt: 'zurückbringen', griff: 'greifen', gewöhnen: 'gewöhnen', wurden: 'werden', dachte: 'denken' });
  for (const [form, base] of Object.entries(cases)) assert.equal(lookup(form).word, base, form);
});

test('Немецкий: у существительных в переводе указан род', () => {
  assert.equal(DICT.get('haus'), 'дом (das)');
  assert.equal(DICT.get('stadt'), 'город (die)');
  assert.equal(DICT.get('hund'), 'собака (der)');
  assert.equal(DICT.get('eltern'), 'родители (мн. ч.)');
});

test('Немецкий: все слова в текстах и фразах (кроме имён) переводятся по клику', () => {
  const missing = new Set();
  for (const body of [...TEXTS.map(t => t.body), ...PHRASES.map(p => p.en)]) for (const tok of body.match(TOKEN)) {
    if (NAMES.has(tok)) continue;
    if (!lookup(tok).translation) missing.add(tok);
  }
  assert.deepEqual([...missing], []);
});

test('Немецкий: наборы непустые, у каждого слова есть перевод', () => {
  assert.deepEqual(Object.keys(SETS).sort(), Object.keys(SET_INFO).sort());
  for (const [id, words] of Object.entries(SETS)) {
    assert.ok(words.length >= 20, id);
    for (const w of words) { assert.ok(DICT.get(w), w); assert.equal(w, w.toLowerCase(), w); }
  }
  assert.ok(DICT.size >= 600);
  for (const id of ['start', 'travel', 'verbs', 'work', 'emotions']) assert.ok(SETS[id], id); // наборы, которые советует тест на уровень
});

test('Немецкий: в упражнениях с выбором правильный ответ есть среди вариантов', () => {
  assert.ok(ALL_LESSONS.length >= 30);
  for (const lv of ['A0', 'A1', 'A2', 'B1']) assert.ok(COURSES.some(c => c.level === lv), lv);
  const ids = new Set();
  for (const l of ALL_LESSONS) {
    assert.ok(!ids.has(l.id)); ids.add(l.id);
    for (const ex of l.exercises) if (ex.type === 'choice') assert.ok(ex.options.includes(ex.a), `${l.id}: ${ex.q}`);
  }
});

test('Немецкий: тексты разных уровней с уникальными id', () => {
  assert.equal(new Set(TEXTS.map(t => t.id)).size, TEXTS.length);
  // до B1 включительно на каждом уровне есть что почитать
  for (const lv of ['A0', 'A1', 'A2', 'B1']) assert.ok(TEXTS.filter(t => t.level === lv).length >= 4, lv);
  assert.ok(PHRASES.length >= 60);
});
