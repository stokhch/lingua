import test from 'node:test';
import assert from 'node:assert/strict';
import { buildTrail, chunkWords, CHUNK, CHEST_EVERY } from '../public/js/trail.js';
import * as en from '../public/js/data/dictionary.js';
import { TEXTS } from '../public/js/data/texts.js';
import { ALL_LESSONS } from '../public/js/data/grammar.js';

const words = n => Array.from({ length: n }, (_, i) => `w${i}`);
const lang = {
  id: 'xx',
  SETS: { a: words(30), b: words(5).map(w => 'b' + w), empty: [] },
  SET_INFO: { a: { title: 'Альфа' }, b: { title: 'Бета' }, empty: { title: 'Пусто' } },
  TEXTS: [{ id: 't1', title: 'Т1' }, { id: 't2', title: 'Т2' }, { id: 't3', title: 'Т3' }],
  ALL_LESSONS: [{ id: 'l1', title: 'У1' }]
};
const learned = { srs: { due: 0 }, trained: {} };

test('Главы идут по наборам, слова режутся на порции, в конце главы сундук', () => {
  const t = buildTrail(lang, {});
  assert.deepEqual(t.chapters.map(c => c.title), ['Альфа', 'Бета', 'Дальние тропы']);
  const a = t.chapters[0].items;
  assert.deepEqual(a.map(i => i.type), ['words', 'words', 'words', 'text', 'lesson', 'chest']);
  assert.equal(a[2].size, 30 - 2 * CHUNK);
  assert.deepEqual(t.chapters[1].items.map(i => i.type), ['words', 'text', 'chest']);
  assert.deepEqual(t.chapters[2].items.map(i => i.type), ['text', 'chest']);
  assert.equal(t.current.id, 'w:a.0');
  assert.equal(t.chests, 3);
  assert.equal(t.chestsReady, 0);
});

test('Шаг пройден при 80% изученных слов; сундук готов, когда пройдено всё до него', () => {
  const ws = {};
  for (const w of lang.SETS.a) ws[w] = learned;
  const t0 = buildTrail(lang, { words: ws });
  assert.ok(t0.chapters[0].items.slice(0, 3).every(i => i.done));
  assert.equal(t0.current.type, 'text');
  assert.equal(t0.chapters[0].items[5].ready, false);
  assert.equal(t0.chapters[0].items[5].need, 2);

  const t = buildTrail(lang, { words: ws, readTexts: { t1: 1 }, grammar: { l1: { passed: true } } }, { 'xx:0': 123 });
  const chest = t.chapters[0].items[5];
  assert.equal(chest.ready, true);
  assert.equal(chest.opened, true);
  assert.equal(t.chestsOpened, 1);
  assert.equal(t.current.id, 'w:b.0');

  // 9 из 12 — мало, 10 из 12 — достаточно
  const part = {};
  lang.SETS.a.slice(0, 9).forEach(w => (part[w] = learned));
  assert.equal(buildTrail(lang, { words: part }).chapters[0].items[0].done, false);
  part.w9 = learned;
  assert.equal(buildTrail(lang, { words: part }).chapters[0].items[0].done, true);
});

test('Длинная глава получает промежуточные сундуки', () => {
  const big = { id: 'yy', SETS: { s: words(CHUNK * (CHEST_EVERY * 2 + 1)) }, SET_INFO: { s: { title: 'S' } } };
  const items = buildTrail(big, {}).chapters[0].items;
  assert.equal(items.filter(i => i.type === 'chest').length, 3);
  assert.equal(items[CHEST_EVERY].type, 'chest');
});

test('chunkWords возвращает слова шага, в том числе для набора с точкой в имени', () => {
  assert.deepEqual(chunkWords(lang, 'a.1'), lang.SETS.a.slice(CHUNK, 2 * CHUNK));
  assert.deepEqual(chunkWords({ SETS: { 'x.y': ['p', 'q'] } }, 'x.y.0'), ['p', 'q']);
  assert.deepEqual(chunkWords(lang, 'nope.0'), []);
});

test('Настоящий английский курс собирается в тропу', () => {
  const t = buildTrail({ id: 'en', SETS: en.SETS, SET_INFO: en.SET_INFO, TEXTS, ALL_LESSONS }, {});
  assert.ok(t.chapters.length >= 5);
  assert.ok(t.total > 20);
  const ids = t.chapters.flatMap(c => c.items.map(i => i.id));
  assert.equal(new Set(ids).size, ids.length, 'id шагов уникальны');
});
