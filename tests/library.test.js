import test from 'node:test';
import assert from 'node:assert/strict';
import { SHELVES, shelfOf, formatOf } from '../public/js/materials.js';
import { TEXTS as EN } from '../public/js/data/texts.js';
import { TEXTS as TR } from '../public/js/data/tr/texts.js';
import { TEXTS as EL } from '../public/js/data/el/texts.js';
import { TEXTS as KRC } from '../public/js/data/krc/texts.js';

const ids = new Set(SHELVES.map(s => s.id));

test('Полки: каждый текст попадает на существующую полку', () => {
  for (const t of [...EN, ...TR, ...EL, ...KRC]) {
    assert.ok(ids.has(shelfOf(t)), t.id);
    if (t.shelf) assert.ok(ids.has(t.shelf), `неизвестная полка ${t.shelf} у ${t.id}`);
  }
});

test('Полки: правила по теме, формату и явной полке', () => {
  assert.equal(shelfOf({ topic: 'Диалоги' }), 'dialogs');
  assert.equal(shelfOf({ topic: 'Разговорник' }), 'phrasebook');
  assert.equal(shelfOf({ topic: 'Сказки' }), 'tales');
  assert.equal(shelfOf({ topic: 'История' }), 'culture');
  assert.equal(shelfOf({ topic: 'Еда' }), 'reading');
  assert.equal(shelfOf({ topic: 'Еда', shelf: 'culture' }), 'culture');
  assert.equal(shelfOf({ topic: 'Песни', kind: 'song' }), 'songs');
  assert.equal(shelfOf({ topic: 'Что угодно', own: true }), 'own');
  assert.equal(formatOf({ topic: 'Разговорник' }), 'dialog');
  assert.equal(formatOf({ topic: 'Семья' }), 'text');
  assert.equal(formatOf({ kind: 'song' }), 'song');
});

test('Полки: у карачаево-балкарского материалы разложены по нескольким полкам', () => {
  const used = new Set(KRC.map(shelfOf));
  for (const sh of ['reading', 'dialogs', 'phrasebook', 'tales', 'wisdom', 'culture', 'songs']) assert.ok(used.has(sh), sh);
  // базовые английские тексты — на полке «Тексты для чтения»
  assert.ok(EN.filter(t => !t.id.startsWith('en-l-')).every(t => shelfOf(t) === 'reading'));
});

test('Полки: английская библиотека заполняет все полки, id уникальны', () => {
  const lib = EN.filter(t => t.id.startsWith('en-l-'));
  assert.equal(new Set(EN.map(t => t.id)).size, EN.length);
  const used = new Set(lib.map(shelfOf));
  for (const sh of ['reading', 'dialogs', 'phrasebook', 'tales', 'wisdom', 'culture', 'songs']) assert.ok(used.has(sh), sh);
  for (const t of lib) assert.ok(t.title && t.body && ['A1', 'A2', 'B1', 'B2', 'C1'].includes(t.level), t.id);
});

test('Английская библиотека: популярные сказки и текст о городах, все слова переводятся', async () => {
  const en = await import('../public/js/data/dictionary.js');
  const ids = ['en-l-tale-pigs', 'en-l-tale-hen', 'en-l-tale-goldilocks', 'en-l-tale-beanstalk', 'en-l-tale-whittington', 'en-l-cities'];
  for (const id of ids) {
    const t = EN.find(x => x.id === id);
    assert.ok(t && t.art, id);
    const miss = t.body.match(/[A-Za-z’'-]+/g).filter(w => !en.lookup(w).translation && w.split('-').some(p => p && !en.lookup(p).translation));
    assert.deepEqual(miss, [], id);
  }
  assert.equal(EN.filter(t => ids.slice(0, 5).includes(t.id)).every(t => shelfOf(t) === 'tales'), true);
});

test('Иллюстрации к материалам: у каждого art есть рисунок, SVG собирается', async () => {
  const { textArt, hasArt, ART_KEYS } = await import('../public/js/text-art.js');
  const used = [...EL, ...EN, ...KRC].filter(t => t.art);
  assert.ok(used.length >= 18);
  for (const t of used) {
    assert.ok(hasArt(t), `нет рисунка ${t.art} у ${t.id}`);
    const svg = textArt(t);
    assert.match(svg, /^<figure class="text-art banner"><svg [^>]*>[\s\S]*<\/svg><\/figure>$/);
    assert.ok(!/NaN|undefined/.test(svg), t.art);
    assert.ok(!/id="(\w+)"/.test(textArt(t, 'thumb').replace(/id="\w+t"/g, '')), 'id в полоске с суффиксом');
  }
  for (const k of ART_KEYS) assert.ok(used.some(t => t.art === k), `рисунок ${k} не используется`);
  assert.equal(textArt({ art: 'нет-такого' }), '');
});

test('Английские песни: карточки с короткой цитатой, пересказом, переводом, ссылками, набором и рисунком', async () => {
  const en = await import('../public/js/data/dictionary.js');
  const songs = EN.filter(t => t.id.startsWith('en-l-song-'));
  assert.ok(songs.length >= 10);
  assert.ok(new Set(songs.map(t => t.level)).size >= 3, 'песни разных уровней');
  for (const t of songs) {
    assert.equal(t.kind, 'song', t.id);
    assert.equal(shelfOf(t), 'songs', t.id);
    assert.ok(t.summary?.length > 80 && t.translation && t.note, t.id);
    assert.ok(t.links?.length >= 1 && t.links.every(l => /^https:\/\//.test(l.href)), t.id);
    assert.ok(t.art, t.id);
    // цитата из песни — не больше двух строк в начале (полный текст не приводим)
    assert.ok(t.body.split('\n\n')[0].split('\n').length <= 2, t.id);
    assert.ok(en.SETS[t.set]?.length >= 10 && en.SET_INFO[t.set]?.title, t.id);
    for (const w of en.SETS[t.set]) assert.ok(en.DICT.get(w), `${t.set}: ${w}`);
    const miss = t.body.match(/[A-Za-z’'-]+/g).filter(w => !en.lookup(w).translation && w.split('-').some(p => p && !en.lookup(p).translation));
    assert.deepEqual(miss, [], t.id);
  }
});

test('Греческие песни и стихи: карточки с цитатой, пересказом, переводом, ссылками, набором и рисунком', async () => {
  const el = await import('../public/js/data/el/dictionary.js');
  const items = EL.filter(t => t.set?.startsWith('song_el_'));
  assert.ok(items.length >= 10);
  assert.ok(new Set(items.map(t => t.level)).size >= 3, 'разных уровней');
  for (const t of items) {
    assert.ok(['song', 'poem'].includes(t.kind), t.id);
    assert.equal(shelfOf(t), 'songs', t.id);
    assert.ok(t.summary?.length > 80 && t.translation && t.note, t.id);
    assert.ok(t.links?.length >= 1 && t.links.every(l => /^https:\/\//.test(l.href)), t.id);
    assert.ok(t.art, t.id);
    // у песен — не больше двух строк цитаты; у старинных стихов (общественное достояние) — до двух строф
    const quote = t.body.split('\n\n')[0].split('\n').length;
    assert.ok(t.kind === 'song' ? quote <= 2 : quote <= 8, t.id);
    assert.ok(el.SETS[t.set]?.length >= 20 && el.SET_INFO[t.set]?.title, t.id);
  }
});
