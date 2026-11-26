import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const pub = new URL('../public/', import.meta.url);

test('manifest: имя, standalone и иконки, которые реально лежат в public', () => {
  const m = JSON.parse(fs.readFileSync(new URL('manifest.webmanifest', pub), 'utf8'));
  assert.equal(m.short_name, 'Лингва');
  assert.equal(m.display, 'standalone');
  assert.ok(m.icons.some(i => i.sizes === '192x192'));
  assert.ok(m.icons.some(i => i.sizes === '512x512' && i.purpose === 'maskable'));
  for (const i of m.icons) assert.ok(fs.existsSync(new URL(i.src, pub)), i.src);
});

test('index.html подключает manifest, apple-touch-icon и theme-color', () => {
  const html = fs.readFileSync(new URL('index.html', pub), 'utf8');
  assert.match(html, /rel="manifest" href="manifest.webmanifest"/);
  assert.match(html, /rel="apple-touch-icon" href="icons\/apple-touch-icon.png"/);
  assert.match(html, /name="theme-color"/);
  assert.ok(fs.existsSync(new URL('icons/apple-touch-icon.png', pub)));
  assert.ok(fs.existsSync(new URL('sw.js', pub)));
});

test('isIOS узнаёт iPhone, iPad (в том числе «под Mac») и не путает с Android', async () => {
  globalThis.navigator ??= { userAgent: '', maxTouchPoints: 0 };
  const { isIOS } = await import('../public/js/install.js');
  assert.equal(isIOS('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)', 5), true);
  assert.equal(isIOS('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 5), true);
  assert.equal(isIOS('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 0), false);
  assert.equal(isIOS('Mozilla/5.0 (Linux; Android 14; Pixel 8)', 5), false);
});
