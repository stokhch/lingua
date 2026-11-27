import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as en from '../public/js/data/dictionary.js';
import * as de from '../public/js/data/de/dictionary.js';
import * as el from '../public/js/data/el/dictionary.js';
import * as tr from '../public/js/data/tr/dictionary.js';
import * as krc from '../public/js/data/krc/dictionary.js';

test('В наборах слов каждого языка не меньше 2000 разных слов', () => {
  for (const [id, m] of Object.entries({ en, de, el, tr, krc })) {
    const words = new Set(Object.values(m.SETS).flat());
    assert.ok(words.size >= 2000, `${id}: ${words.size}`);
    for (const [set, list] of Object.entries(m.SETS)) {
      assert.ok(m.SET_INFO[set]?.title, `${id}: нет описания набора ${set}`);
      for (const w of list) assert.ok(m.DICT.get(w), `${id}/${set}: ${w}`);
    }
  }
});
