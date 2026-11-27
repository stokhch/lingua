import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { crc32, zip, lookupWord } from '../extension-api.js';

test('Расширение: CRC32 и ZIP', () => {
  assert.equal(crc32(Buffer.from('123456789')), 0xcbf43926);
  const z = zip([{ name: 'a/b.txt', data: Buffer.from('привет') }]);
  assert.equal(z.readUInt32LE(0), 0x04034b50);
  assert.equal(z.readUInt32LE(z.length - 22), 0x06054b50);
  assert.equal(z.readUInt16LE(z.length - 12), 1);
});

test('Расширение: перевод по словарю с формами слова', () => {
  assert.equal(lookupWord('en', 'went').word, 'go');
  assert.ok(lookupWord('en', 'Travelled').translation);
  assert.equal(lookupWord('tr', 'evlerimizde').word, 'ev');
  assert.equal(lookupWord('el', 'σπιτιού').word, 'σπίτι');
  assert.equal(lookupWord('de', 'Häuser').word, 'haus');
});

test('Расширение: манифест ссылается на существующие файлы', () => {
  const dir = new URL('../extension/', import.meta.url);
  const m = JSON.parse(fs.readFileSync(new URL('manifest.json', dir)));
  assert.equal(m.manifest_version, 3);
  const files = [m.background.service_worker, m.action.default_popup, ...m.content_scripts.flatMap(c => c.js), ...Object.values(m.icons)];
  for (const f of files) assert.ok(fs.existsSync(new URL(f, dir)), f);
});
