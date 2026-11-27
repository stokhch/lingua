// Список файлов сайта для офлайн-режима: service worker (public/sw.js) скачивает их все заранее,
// чтобы словари, наборы слов, тексты и уроки открывались без интернета.
// version — отпечаток содержимого: меняется после каждого деплоя, и телефон докачивает новую версию.
import fsp from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

// Служебное, что не нужно для работы без сети
const SKIP = new Set(['sw.js']);

async function walk(dir, base = dir) {
  const out = [];
  for (const e of await fsp.readdir(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...await walk(full, base));
    else out.push(path.relative(base, full).split(path.sep).join('/'));
  }
  return out;
}

export async function buildPrecache(publicDir) {
  const files = (await walk(publicDir)).filter(f => !SKIP.has(f)).sort();
  const hash = crypto.createHash('sha1');
  for (const f of files) hash.update(f).update('\0').update(await fsp.readFile(path.join(publicDir, f)));
  return { version: hash.digest('base64url').slice(0, 16), files: ['./', ...files] };
}
