// Service worker Лингвы: установка на экран телефона и офлайн-режим.
//  • При установке и после каждого деплоя заранее скачивает ВСЕ файлы сайта по списку /precache.json:
//    оболочку, словари, наборы слов, тексты и уроки всех языков, — чтобы учиться можно было без интернета.
//  • Обычные запросы — «сначала сеть»: свежий деплой виден сразу, а кэш выручает, когда сети нет
//    (или она так плоха, что ответа нет дольше нескольких секунд).
//  • API (/api/…) не кэшируется: рейтинг, сообщения и синхронизация прогресса работают только онлайн,
//    а прогресс, сделанный без сети, копится на устройстве и отправляется позже (см. js/store.js).
//  • Шрифты Google кэшируются при первом показе, чтобы без сети буквы выглядели так же.
const CACHE = 'lingva-v2';
const FONTS = 'lingva-fonts';
const VERSION_KEY = '/__lingva-precache-version';
const SLOW_MS = 4000;

let syncing = null;
// Докачать всё по списку. Повторно файлы качаются только если после деплоя сменилась версия.
function precache(force = false) {
  return syncing ||= (async () => {
    const cache = await caches.open(CACHE);
    const list = await (await fetch('precache.json', { cache: 'no-store' })).json();
    const have = await cache.match(VERSION_KEY);
    if (!force && have && (await have.text()) === list.version) return;
    // По 6 файлов за раз, чтобы не забить слабый канал; ошибка одного файла не мешает остальным
    const queue = [...list.files];
    await Promise.all(Array.from({ length: 6 }, async () => {
      for (let f; (f = queue.shift()) !== undefined;) {
        try { const r = await fetch(f, { cache: 'no-cache' }); if (r.ok) await cache.put(f, r); } catch {}
      }
    }));
    await cache.put(VERSION_KEY, new Response(list.version));
  })().catch(() => {}).finally(() => { syncing = null; });
}

self.addEventListener('install', e => {
  e.waitUntil(precache(true));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE && k !== FONTS).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// Страница при каждом запуске с интернетом просит проверить, не вышла ли новая версия
self.addEventListener('message', e => { if (e.data === 'precache') e.waitUntil(precache()); });

function fromNetwork(req, cacheKey) {
  return fetch(req).then(res => {
    if (res.ok && res.type === 'basic') { const copy = res.clone(); caches.open(CACHE).then(c => c.put(cacheKey, copy)); }
    return res;
  });
}

async function networkFirst(req) {
  const url = new URL(req.url);
  // Адрес страницы (с любым ?параметром) — это index.html
  const key = req.mode === 'navigate' ? 'index.html' : url.pathname === '/' ? './' : req;
  const cached = () => caches.match(key, { ignoreSearch: req.mode === 'navigate' });
  const net = fromNetwork(req, key);
  // Ждём сеть, но если она «висит» дольше SLOW_MS, а копия есть — отдаём копию
  const slow = new Promise(r => setTimeout(r, SLOW_MS)).then(cached);
  try {
    const res = await Promise.race([net, slow.then(c => c || net)]);
    return res;
  } catch {
    return (await cached()) || (req.mode === 'navigate' ? (await caches.match('./')) : undefined) || Response.error();
  }
}

async function fonts(req) {
  const cache = await caches.open(FONTS);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok || res.type === 'opaque') cache.put(req, res.clone());
  return res;
}

self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET') return;
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') return e.respondWith(fonts(req));
  // API, озвучку, архив расширения и чужие сайты не трогаем
  if (url.origin !== location.origin || url.pathname.startsWith('/api/') || url.pathname === '/precache.json' || url.pathname.endsWith('.zip')) return;
  e.respondWith(networkFirst(req));
});
