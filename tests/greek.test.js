import test from 'node:test';
import assert from 'node:assert/strict';
import { lookup, lower, plain, DICT, SETS, SET_INFO } from '../public/js/data/el/dictionary.js';
import { TEXTS } from '../public/js/data/el/texts.js';
import { PHRASES } from '../public/js/data/el/phrases.js';
import { ALL_LESSONS } from '../public/js/data/el/grammar.js';
import { BANKS } from '../public/js/data/leveltest.js';

const TOKEN = /[\p{L}’'-]+/gu;
const NAMES = new Set(['Νίκο', 'Άννα', 'Μαρία', 'Ελένη', 'Γιώργος', 'Σοφία']);

test('Греческий: строчные буквы, конечная сигма и сравнение без ударений', () => {
  assert.equal(lower('ΚΑΛΗΜΕΡΑ'), 'καλημερα');
  assert.equal(plain('Καλημέρα'), 'καλημερα');
  assert.equal(plain('δρόμος'), 'δρομοσ');
  assert.equal(plain('λαϊκή'), 'λαικη');
});

test('Греческий: формы слов приводятся к словарной', () => {
  const cases = {
    σπιτιού: 'σπίτι', σπίτια: 'σπίτι', δρόμου: 'δρόμος', δρόμους: 'δρόμος', θάλασσας: 'θάλασσα', ονόματα: 'όνομα',
    παιδιών: 'παιδί', πόλεις: 'πόλη', μεγάλες: 'μεγάλος', μέτριο: 'μέτριος', παλιό: 'παλιός', φόβο: 'φόβος', λέξεις: 'λέξη',
    γράφεις: 'γράφω', έγραψα: 'γράφω', γράψουμε: 'γράφω', διάβασα: 'διαβάζω', αγόρασα: 'αγοράζω', έπαιξα: 'παίζω',
    ταξιδέψαμε: 'ταξιδεύω', ρώτησα: 'ρωτάω', μιλούσαμε: 'μιλάω', αγαπάει: 'αγαπάω', τηλεφώνησα: 'τηλεφωνώ',
    έρχεσαι: 'έρχομαι', κάθεται: 'κάθομαι', κοιμόταν: 'κοιμάμαι', ανοίξτε: 'ανοίγω', πλήρωσα: 'πληρώνω', μένεις: 'μένω',
    είναι: 'είμαι', ήταν: 'είμαι', πήγαμε: 'πηγαίνω', φάγαμε: 'τρώω', ήρθα: 'έρχομαι', είδα: 'βλέπω',
    ΚΑΛΗΜΕΡΑ: 'καλημέρα', καλημερα: 'καλημέρα', χτισμένο: 'χτίζω'
  };
  for (const [form, base] of Object.entries(cases)) assert.equal(lookup(form).word, base, form);
});

test('Греческий: все слова в текстах и фразах (кроме имён) переводятся по клику', () => {
  const missing = new Set();
  for (const body of [...TEXTS.map(t => t.body), ...PHRASES.map(p => p.en)]) for (const tok of body.match(TOKEN)) {
    if (NAMES.has(tok)) continue;
    if (!lookup(tok).translation) missing.add(tok);
  }
  assert.deepEqual([...missing], []);
});

test('Греческий: наборы непустые, у каждого слова есть перевод', () => {
  assert.deepEqual(Object.keys(SETS).sort(), Object.keys(SET_INFO).sort());
  for (const [id, words] of Object.entries(SETS)) {
    assert.ok(words.length >= 20, id);
    for (const w of words) {
      assert.ok(DICT.get(w), w);
      assert.ok(!/[a-zа-яё]/i.test(w), `латиница или кириллица в слове: ${w}`);
      // в многосложных словах ударение обязательно
      for (const part of w.split(' ')) if ((plain(part).match(/[αεηιουω]+/g) || []).length > 1 && part === lower(part)) assert.ok(/[άέήίόύώΐΰ]/.test(part), `нет ударения: ${w}`);
    }
  }
  assert.ok(DICT.size >= 500);
  assert.ok(TEXTS.length >= 10 && PHRASES.length >= 50);
  for (const lv of ['A0', 'A1', 'A2', 'B1']) assert.ok(TEXTS.some(t => t.level === lv), lv);
});

test('Греческий: уроки грамматики и тест на уровень', () => {
  assert.ok(ALL_LESSONS.length >= 15);
  const ids = new Set();
  for (const l of ALL_LESSONS) {
    assert.ok(!ids.has(l.id), l.id); ids.add(l.id);
    for (const ex of l.exercises) if (ex.type === 'choice') assert.ok(ex.options.includes(ex.a), `${l.id}: ${ex.q}`);
  }
  for (const id of ['el-alphabet', 'el-digraphs', 'el-stress']) assert.ok(ids.has(id), id);
  assert.ok(BANKS.el);
  for (const lv of BANKS.el.levels) for (const [w] of BANKS.el.items[lv]) assert.ok(/[α-ω]/.test(w), w);
});
