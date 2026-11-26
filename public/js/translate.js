// Перевод слова: сначала встроенный словарь, затем (если запущен сервер) онлайн-перевод через /api/translate.
import { lookup } from './data/dictionary.js';
import { store } from './store.js';

export async function translateWord(raw) {
  const r = lookup(raw);
  if (r.translation) return { ...r, source: 'dict' };
  if (store.serverAvailable && r.word) {
    try {
      const j = await (await fetch('api/translate?q=' + encodeURIComponent(r.word))).json();
      if (j.translation) return { word: r.word, translation: j.translation, source: 'online' };
    } catch {}
  }
  return { ...r, source: 'none' };
}
