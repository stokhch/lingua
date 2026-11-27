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

test('офлайн: список для service worker содержит оболочку и данные всех языков, но не sw.js', async () => {
  const { buildPrecache } = await import('../precache.js');
  const { version, files } = await buildPrecache(new URL('../public', import.meta.url).pathname);
  assert.ok(version.length >= 8);
  for (const f of ['./', 'index.html', 'css/app.css', 'js/app.js', 'js/store.js', 'js/data/texts.js', 'js/data/grammar.js', 'manifest.webmanifest']) assert.ok(files.includes(f), f);
  for (const l of ['de', 'el', 'tr', 'krc']) assert.ok(files.some(f => f.startsWith(`js/data/${l}/`)), l);
  assert.ok(!files.includes('sw.js'));
  for (const f of files.slice(1)) assert.ok(fs.existsSync(new URL(f, pub)), f);
  // Каждый импорт в JS ведёт на файл из списка — иначе без сети модуль не загрузится
  const re = /(?:import|from)\s*['"](\.{1,2}\/[^'"]+)['"]/g;
  for (const f of files.filter(f => f.endsWith('.js'))) {
    const src = fs.readFileSync(new URL(f, pub), 'utf8');
    for (const [, rel] of src.matchAll(re)) {
      const target = new URL(rel, new URL(f, 'http://x/')).pathname.slice(1);
      assert.ok(files.includes(target), `${f} → ${target}`);
    }
  }
});
