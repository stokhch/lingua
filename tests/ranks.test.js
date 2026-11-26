import test from 'node:test';
import assert from 'node:assert/strict';
import { RANKS, rankFor } from '../public/js/ranks.js';

test('Звания: по возрастанию и без пропусков', () => {
  assert.equal(RANKS[0].from, 1);
  for (let i = 1; i < RANKS.length; i++) assert.ok(RANKS[i].from > RANKS[i - 1].from);
  assert.equal(new Set(RANKS.map(r => r.title)).size, RANKS.length);
});

test('Звания: выбор по уровню', () => {
  assert.equal(rankFor(1).title, 'Новичок на опушке');
  assert.equal(rankFor(2).next.from, 3);
  assert.equal(rankFor(5).title, 'Шустрый собиратель слов');
  assert.equal(rankFor(6).title, 'Шустрый собиратель слов');
  assert.equal(rankFor(99).next, null);
});
