import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ttsChunks } from '../public/js/tts-chunks.js';

test('ttsChunks: короткий текст — один кусок', () => {
  assert.deepEqual(ttsChunks('  καλημέρα  '), ['καλημέρα']);
  assert.deepEqual(ttsChunks(''), []);
});

test('ttsChunks: длинный текст режется по предложениям и словам, ничего не теряя', () => {
  const sent = 'Η Αθήνα είναι η πρωτεύουσα της Ελλάδας και μια από τις αρχαιότερες πόλεις του κόσμου. ';
  const text = sent.repeat(6) + 'λέξη '.repeat(80);
  const parts = ttsChunks(text, 180);
  assert.ok(parts.length > 3);
  for (const p of parts) assert.ok(p.length <= 180 && p.length > 0, p);
  assert.equal(parts.join(' ').replace(/\s+/g, ' '), text.replace(/\s+/g, ' ').trim());
});
