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
  // основное чтение у английского остаётся на полке «Тексты для чтения»
  assert.ok(EN.every(t => shelfOf(t) === 'reading'));
});
