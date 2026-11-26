// Сказочная тропа: весь курс языка как дорожка из шагов с сундуками.
// Чистые функции без DOM — их проверяют тесты.
//  • Главы — тематические наборы слов в порядке SET_INFO.
//  • Шаг «слова» — порция из CHUNK слов набора. Пройден, когда изучено 80% порции.
//  • После слов главы — текст для чтения и урок грамматики (по порядку), пока они не кончатся.
//  • Сундук — в конце каждой главы и через каждые CHEST_EVERY шагов длинной главы.
//    Открывается, когда пройдены все шаги после предыдущего сундука, и даёт яблоки для Пима (XP).
export const CHUNK = 12;
export const CHEST_EVERY = 6;
export const CHEST_XP = 15;
const DONE_SHARE = 0.8;

const wordScore = w => !w ? 0 : w.srs ? 1 : Object.keys(w.trained || {}).length ? 0.5 : 0.25;

export function chunkKey(setId, part) { return `${setId}.${part}`; }
export function chunkWords(lang, key) {
  const dot = key.lastIndexOf('.');
  const set = lang.SETS[key.slice(0, dot)], part = Number(key.slice(dot + 1));
  return set ? set.slice(part * CHUNK, (part + 1) * CHUNK) : [];
}

// data: { words, readTexts, grammar } текущего языка; opened: { [chestId]: время открытия }
export function buildTrail(lang, data, opened = {}) {
  const words = data.words || {}, read = data.readTexts || {}, grammar = data.grammar || {};
  const texts = [...(lang.TEXTS || [])], lessons = [...(lang.ALL_LESSONS || [])];
  const chapters = [];
  let since = []; // шаги после последнего сундука
  let chestN = 0;

  const chest = (chapter) => {
    const id = `${lang.id}:${chestN++}`;
    const ready = since.every(n => n.done);
    chapter.items.push({ type: 'chest', id, ready, opened: !!opened[id], need: since.filter(n => !n.done).length });
    since = [];
  };
  const add = (chapter, node) => { chapter.items.push(node); since.push(node); };

  const setIds = Object.keys(lang.SET_INFO || lang.SETS).filter(id => lang.SETS[id]?.length);
  for (const [ci, setId] of setIds.entries()) {
    const title = lang.SET_INFO?.[setId]?.title || setId;
    const chapter = { key: setId, n: ci + 1, title, items: [] };
    const list = lang.SETS[setId], parts = Math.ceil(list.length / CHUNK);
    for (let p = 0; p < parts; p++) {
      const ws = list.slice(p * CHUNK, (p + 1) * CHUNK);
      const learned = ws.filter(w => words[w]?.srs).length, have = ws.filter(w => words[w]).length;
      const progress = ws.reduce((a, w) => a + wordScore(words[w]), 0) / ws.length;
      add(chapter, {
        type: 'words', id: `w:${chunkKey(setId, p)}`, key: chunkKey(setId, p), set: setId,
        title: parts > 1 ? `${title} · ${p + 1}` : title, size: ws.length, learned, have,
        progress, done: learned >= Math.ceil(ws.length * DONE_SHARE)
      });
      if ((p + 1) % CHEST_EVERY === 0 && p + 1 < parts) chest(chapter);
    }
    const t = texts.shift();
    if (t) add(chapter, { type: 'text', id: `t:${t.id}`, ref: t.id, title: t.title, level: t.level, progress: read[t.id] ? 1 : 0, done: !!read[t.id] });
    const l = lessons.shift();
    if (l) add(chapter, { type: 'lesson', id: `l:${l.id}`, ref: l.id, title: l.title, progress: grammar[l.id]?.passed ? 1 : grammar[l.id] ? 0.5 : 0, done: !!grammar[l.id]?.passed });
    chest(chapter);
    chapters.push(chapter);
  }
  // оставшиеся тексты и уроки — последняя глава «Дальние тропы»
  if (texts.length || lessons.length) {
    const chapter = { key: 'far', n: chapters.length + 1, title: 'Дальние тропы', items: [] };
    while (texts.length || lessons.length) {
      const t = texts.shift();
      if (t) add(chapter, { type: 'text', id: `t:${t.id}`, ref: t.id, title: t.title, level: t.level, progress: read[t.id] ? 1 : 0, done: !!read[t.id] });
      const l = lessons.shift();
      if (l) add(chapter, { type: 'lesson', id: `l:${l.id}`, ref: l.id, title: l.title, progress: grammar[l.id]?.passed ? 1 : grammar[l.id] ? 0.5 : 0, done: !!grammar[l.id]?.passed });
      if (since.length >= CHEST_EVERY) chest(chapter);
    }
    if (since.length) chest(chapter);
    chapters.push(chapter);
  }

  // текущий шаг — первый непройденный
  const nodes = chapters.flatMap(c => c.items.filter(i => i.type !== 'chest'));
  const current = nodes.find(n => !n.done) || null;
  if (current) current.current = true;
  const chests = chapters.flatMap(c => c.items.filter(i => i.type === 'chest'));
  return {
    chapters, current,
    total: nodes.length, done: nodes.filter(n => n.done).length,
    chests: chests.length, chestsOpened: chests.filter(c => c.opened).length,
    chestsReady: chests.filter(c => c.ready && !c.opened).length
  };
}
