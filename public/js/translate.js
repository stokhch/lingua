// Перевод слова: сначала встроенный словарь текущего языка, затем (если запущен сервер) онлайн-перевод через /api/translate.
import { L } from './lang.js';
import { store } from './store.js';

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
