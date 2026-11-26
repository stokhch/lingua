import test from 'node:test';
import assert from 'node:assert/strict';

import { buildCrossword } from '../public/js/crossword.js';

test('Кроссворд: слова пересекаются без конфликтов букв', () => {
  const words = ['travel', 'ticket', 'castle', 'beach', 'hotel', 'market', 'street', 'museum'].map(w => ({ w, t: w }));
  for (let n = 0; n < 20; n++) {
    const cw = buildCrossword(words);
    assert.ok(cw.words.length >= 3);
    const grid = {};
    for (const p of cw.words) for (let i = 0; i < p.w.length; i++) {
      const k = `${p.r + (p.dir === 'down' ? i : 0)}:${p.c + (p.dir === 'across' ? i : 0)}`;
      if (grid[k]) assert.equal(grid[k], p.w[i]);
      grid[k] = p.w[i];
      assert.ok(p.r >= 0 && p.c >= 0);
    }
  }
});
