// Фоновый скрипт: все запросы к серверу Лингвы идут отсюда (у расширения есть доступ к сайту, CORS не мешает).
import { DEFAULT_SERVER } from './config.js';

const DEFAULTS = { server: DEFAULT_SERVER, lang: 'en', token: '', user: null, dblclick: true };
const get = async () => ({ ...DEFAULTS, ...(await chrome.storage.local.get(Object.keys(DEFAULTS))) });
const base = s => s.replace(/\/+$/, '') + '/';

async function api(method, url, body, auth = false) {
  const st = await get();
  const headers = { 'Content-Type': 'application/json' };
  if (auth) headers.Authorization = 'Bearer ' + st.token;
  const r = await fetch(base(st.server) + url, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const data = await r.json().catch(() => ({}));
  if (r.status === 401 && auth) { await chrome.storage.local.set({ token: '', user: null }); throw new Error('Войдите в аккаунт Лингвы в окне расширения'); }
  if (!r.ok) throw new Error(data.error || 'Сервер Лингвы недоступен');
  return data;
}

const handlers = {
  async settings() { const st = await get(); return { server: st.server, lang: st.lang, user: st.user, dblclick: st.dblclick }; },
  async save({ patch }) {
    const allowed = {};
    for (const k of ['server', 'lang', 'dblclick']) if (k in patch) allowed[k] = patch[k];
    if (allowed.server && !/^https?:\/\/[^\s/]+/.test(allowed.server)) throw new Error('Адрес должен начинаться с http:// или https://');
    if (allowed.server) { allowed.token = ''; allowed.user = null; }
    await chrome.storage.local.set(allowed); return handlers.settings();
  },
  async login({ email, password }) {
    const r = await api('POST', 'api/login', { email, password });
    await chrome.storage.local.set({ token: r.token, user: { name: r.user.name, email: r.user.email } });
    return handlers.settings();
  },
  async logout() { try { await api('POST', 'api/logout', null, true); } catch {} await chrome.storage.local.set({ token: '', user: null }); return handlers.settings(); },
  async lookup({ q, lang }) { const st = await get(); return api('GET', `api/lookup?lang=${encodeURIComponent(lang || st.lang)}&q=${encodeURIComponent(q)}`); },
  async sentence({ q, lang }) { const st = await get(); return api('GET', `api/translate-sentence?lang=${encodeURIComponent(lang || st.lang)}&q=${encodeURIComponent(q)}`); },
  async add(item) { const st = await get(); if (!st.token) throw new Error('Чтобы сохранять слова, войдите в аккаунт в окне расширения'); return api('POST', 'api/inbox', { ...item, lang: item.lang || st.lang }, true); }
};

chrome.runtime.onMessage.addListener((msg, _sender, reply) => {
  const h = handlers[msg?.type];
  if (!h) return false;
  h(msg).then(data => reply({ ok: true, data }), e => reply({ ok: false, error: e.message }));
  return true; // ответ придёт асинхронно
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({ id: 'lingva', title: 'Перевести «%s» в Лингве', contexts: ['selection'] });
});
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'lingva' && tab?.id) chrome.tabs.sendMessage(tab.id, { type: 'show', text: info.selectionText }).catch(() => {});
});
