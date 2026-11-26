// Перевод слова: сначала встроенный словарь текущего языка, затем (если запущен сервер) онлайн-перевод через /api/translate.
import { L } from './lang.js';
import { store } from './store.js';

// Перевод целого предложения (только через сервер). Пустая строка — если перевести не удалось.
const sentCache = new Map();
export async function translateSentence(text) {
  const q = String(text).replace(/\s+/g, ' ').trim().slice(0, 450);
  if (!q || !store.serverAvailable || L().online === false) return '';
  const key = L().id + ':' + q;
  if (sentCache.has(key)) return sentCache.get(key);
  try {
    const j = await (await fetch(`api/translate-sentence?lang=${L().id}&q=` + encodeURIComponent(q))).json();
    if (j.translation) sentCache.set(key, j.translation);
    return j.translation || '';
  } catch { return ''; }
}

export async function translateWord(raw) {
  const r = L().lookup(raw);
  if (r.translation) return { ...r, source: 'dict' };
  if (store.serverAvailable && r.word && L().online !== false) {
    try {
      const j = await (await fetch(`api/translate?lang=${L().id}&q=` + encodeURIComponent(r.word))).json();
      if (j.translation) return { word: r.word, translation: j.translation, source: 'online' };
    } catch {}
  }
  return { ...r, source: 'none' };
}
