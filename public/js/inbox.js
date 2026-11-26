// Слова, сохранённые расширением браузера, ждут на сервере во «входящих».
// Сайт забирает их при запуске и при возвращении на вкладку и добавляет в словарь нужного языка.
import { store } from './store.js';
import * as G from './game.js';
import { L, LANGS } from './lang.js';
import { toast, plural } from './ui.js';

let busy = false;
export async function pullInbox() {
  if (store.mode !== 'server' || busy) return 0;
  busy = true;
  try {
    const { items } = await store.api('GET', 'api/inbox');
    if (!items?.length) return 0;
    let n = 0;
    for (const x of items) {
      if (x.lang === L().id) { if (G.addWord(x.word, x.translation, x.ctx, x.src || 'расширение')) n++; continue; }
      const lang = LANGS[x.lang]; if (!lang) continue;
      const s = store.state; s.byLang ||= {}; const bucket = (s.byLang[x.lang] ||= {}); bucket.words ||= {};
      const key = lang.lower(x.word.trim());
      if (!bucket.words[key]) { bucket.words[key] = { w: key, t: x.translation, ctx: x.ctx || '', src: x.src || 'расширение', added: x.at || Date.now(), trained: {}, srs: null }; n++; }
    }
    await store.saveNow();
    await store.api('POST', 'api/inbox/clear', { upto: Math.max(...items.map(x => x.at)) });
    if (n) toast(`Из расширения: +${n} ${plural(n, 'слово', 'слова', 'слов')} в словаре`);
    return n;
  } catch { return 0; } finally { busy = false; }
}

document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') pullInbox(); });
