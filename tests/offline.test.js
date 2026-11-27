import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// Мини-браузер: localStorage, события окна и fetch, который можно «выключить»
const ls = new Map();
globalThis.localStorage = { getItem: k => ls.get(k) ?? null, setItem: (k, v) => ls.set(k, String(v)), removeItem: k => ls.delete(k) };
const handlers = {};
globalThis.window = { addEventListener: (t, f) => (handlers[t] ||= []).push(f), dispatchEvent: e => (handlers[e.type] || []).forEach(f => f(e)) };
globalThis.Event ??= class { constructor(t) { this.type = t; } };
Object.defineProperty(globalThis, 'navigator', { value: { onLine: true }, configurable: true, writable: true });

let online = true, server = { state: { v: 1, name: 'Аня', xp: 10, words: {} } }, puts = 0;
globalThis.fetch = async (url, opt = {}) => {
  if (!online) throw new TypeError('Failed to fetch');
  const json = d => ({ ok: true, status: 200, json: async () => d });
  if (url === 'api/health') return json({ ok: true });
  if (url === 'api/me') return json({ user: { id: 'u1', name: 'Аня' } });
  if (url === 'api/state' && opt.method === 'GET') return json({ state: server.state });
  if (url === 'api/state' && opt.method === 'PUT') { puts++; server.state = JSON.parse(opt.body).state; return json({ ok: true }); }
  return json({});
};
const { store } = await import('../public/js/store.js');

beforeEach(() => { online = true; navigator.onLine = true; clearInterval(store._retry); store.offline = false; store.mode = 'local'; });

test('аккаунт без сети открывается из копии, прогресс копится и уходит на сервер при появлении связи', async () => {
  ls.clear(); ls.set('lingva.token', 't');
  assert.equal(await store.init(), true);
  assert.equal(store.mode, 'server'); assert.equal(store.state.xp, 10);

  online = false; navigator.onLine = false;
  assert.equal(await store.init(), true, 'без сети приложение открывается');
  assert.equal(store.mode, 'server'); assert.equal(store.offline, true); assert.equal(store.state.xp, 10);
  store.state.xp = 25; await store.saveNow();
  assert.equal(store.syncState, 'offline'); assert.equal(store.unsynced, true);
  assert.equal(server.state.xp, 10);

  online = true; navigator.onLine = true;
  await store.reconnect();
  await new Promise(r => setTimeout(r, 10));
  assert.equal(store.offline, false);
  assert.equal(server.state.xp, 25, 'накопленный прогресс отправлен');
  assert.equal(store.unsynced, false);
});

test('закрыли приложение без сети — при следующем запуске с интернетом копия отправляется, а не затирается', async () => {
  ls.clear(); ls.set('lingva.token', 't'); server.state = { v: 1, name: 'Аня', xp: 10, words: {} };
  await store.init();
  online = false; navigator.onLine = false;
  await store.init(); store.state.xp = 40; await store.saveNow();
  online = true; navigator.onLine = true; clearInterval(store._retry); store.offline = false;
  await store.init();
  assert.equal(store.state.xp, 40); assert.equal(server.state.xp, 40); assert.equal(store.unsynced, false);
});

test('без сети и без копии гость открывает локальный режим, как раньше; выход стирает копию', async () => {
  ls.clear(); online = false;
  assert.equal(await store.init(), true); assert.equal(store.mode, 'local');
  online = true; ls.set('lingva.token', 't');
  await store.init(); assert.ok(ls.get('lingva.account'));
  await store.logout(); assert.equal(localStorage.getItem('lingva.account'), null);
});
