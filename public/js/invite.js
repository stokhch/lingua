// Приглашение в друзья по ссылке: https://сайт/?friend=КОД.
// Код запоминается при открытии ссылки, переживает вход или регистрацию и после входа
// добавляет пригласившего в друзья (дружба взаимная). Приглашения в класс учителя — отдельный механизм.
import { store } from './store.js';
import { toast } from './ui.js';

const KEY = 'lingva.invite';
const get = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
const set = v => { try { v ? localStorage.setItem(KEY, v) : localStorage.removeItem(KEY); } catch {} };
export const cleanCode = c => String(c || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 12);

export const inviteLink = code => `${location.origin}${location.pathname}?friend=${encodeURIComponent(code)}`;

// Забрать код из адресной строки и убрать его оттуда, чтобы не мешал ссылкам и закладкам
export function captureInvite() {
  const url = new URL(location.href);
  const code = cleanCode(url.searchParams.get('friend'));
  if (!url.searchParams.has('friend')) return;
  url.searchParams.delete('friend');
  history.replaceState(null, '', url.pathname + url.search + url.hash);
  if (code) set(code);
}

export const pendingInvite = () => get();

// Кто приглашает (без входа). null — приглашение недействительно или сервер недоступен.
export async function inviter(code = get()) {
  if (!code) return null;
  try {
    const r = await fetch('api/invite?code=' + encodeURIComponent(code), { cache: 'no-store' });
    if (r.status === 404) { set(null); return null; }
    return r.ok ? (await r.json()).name : null;
  } catch { return null; }
}

// Принять приглашение после входа. Возвращает имя нового друга или null.
export async function acceptInvite() {
  const code = get();
  if (!code || store.mode !== 'server') return null;
  try {
    const r = await store.api('POST', 'api/friends', { code });
    set(null);
    toast(`${r.friend.name} теперь у вас в друзьях`);
    return r.friend.name;
  } catch (e) {
    if (!e.status || e.status >= 500) return null; // нет связи — попробуем при следующем входе
    set(null);
    // свой код (открыли собственную ссылку) — молча; «уже в друзьях», «не найден» и лимит — сообщаем
    if (!/собственный/.test(e.message)) toast(e.message);
    return null;
  }
}
