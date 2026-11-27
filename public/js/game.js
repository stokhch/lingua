// Игровая логика: личный словарь, статусы слов, опыт (XP), уровни, ударный режим (стрик), достижения.
import { store } from './store.js';
import { newCard, review, isDue } from './srs.js';
import { toast } from './ui.js';
import { lower, L } from './lang.js';
import { TRAININGS, wordStatus, dayKey, emptyDay, pruneDays } from './stats.js';
import { chunkWords } from './trail.js';
import { bump } from './dayplan.js';
import { fanfare } from './sfx.js';

export { TRAININGS, wordStatus };
const S = () => store.state;

export const today = dayKey;
const yesterday = () => today(new Date(Date.now() - 86400000));

// ---------- слова ----------
export const STATUS_LABEL = { new: 'Новое', learning: 'Изучается', learned: 'Изучено', due: 'Пора повторить' };

export function hasWord(w) { return !!S().words[lower(w)]; }

export function addWord(word, translation, ctx = '', src = '') {
  const key = lower(word.trim());
  if (!key || !translation.trim()) return false;
  if (S().words[key]) return false;
  S().words[key] = { w: key, t: translation.trim(), ctx: ctx.slice(0, 240), src, added: Date.now(), trained: {}, srs: null };
  store.save();
  checkBadges();
  return true;
}
export function removeWord(word) { delete S().words[word]; store.save(); }
export function updateWord(word, patch) { Object.assign(S().words[word], patch); store.save(); }
export const allWords = () => Object.values(S().words);

// Фокус тренировок: все слова словаря или только один набор (встроенный «set:id» или свой «my:id»).
export function focusInfo() {
  const s = S(), f = s.focus?.[s.lang || 'en'];
  if (!f) return null;
  const [kind, id] = [f.slice(0, f.indexOf(':')), f.slice(f.indexOf(':') + 1)];
  if (kind === 'set' && L().SETS[id]) return { id: f, title: L().SET_INFO[id]?.title || id, keys: new Set(L().SETS[id]) };
  if (kind === 'my' && s.mySets?.[id]) return { id: f, title: s.mySets[id].title, keys: new Set(s.mySets[id].words) };
  if (kind === 'trail') { const ws = chunkWords(L(), id); const set = id.slice(0, id.lastIndexOf('.')); if (ws.length) return { id: f, title: `${L().SET_INFO[set]?.title || set} · шаг тропы`, keys: new Set(ws) }; }
  return null;
}
export function setFocus(f) {
  const s = S(); s.focus = { ...(s.focus || {}), [s.lang || 'en']: f || null }; store.save();
}
export const trainWords = () => { const f = focusInfo(); return f ? allWords().filter(w => f.keys.has(w.w)) : allWords(); };

export function wordsFor(training) {
  return trainWords().filter(w => !w.srs && !w.trained?.[training]).sort((a, b) => a.added - b.added);
}
export const dueWords = () => trainWords().filter(w => w.srs && isDue(w.srs)).sort((a, b) => a.srs.due - b.srs.due);

// Отметить, что слово прошло тренировку. Когда пройдены все 4 — слово «изучено» и уходит на интервальные повторения.
export function markTrained(word, training) {
  const w = S().words[word]; if (!w || w.srs) return;
  w.trained = { ...w.trained, [training]: true };
  if (TRAININGS.every(k => w.trained[k])) { w.srs = newCard(); w.learnedAt = Date.now(); toast(`«${w.w}» — изучено! Повторим завтра`, 'learned'); }
  store.save();
}

export function gradeCard(word, grade) {
  const w = S().words[word]; if (!w) return;
  if (!w.srs) { // карточки для ещё не изученного слова засчитываем как тренировку
    if (grade >= 2) { TRAININGS.forEach(k => (w.trained = { ...w.trained, [k]: true })); w.learnedAt = Date.now(); }
    w.srs = review(newCard(), grade);
  } else {
    w.srs = review(w.srs, grade);
  }
  if (grade === 0) { w.trained = {}; w.srs = null; } // забытое слово возвращается на изучение
  day().r++;
  store.save();
}

export function counts() {
  const c = { total: 0, new: 0, learning: 0, learned: 0, due: 0 };
  for (const w of allWords()) { c.total++; c[wordStatus(w)]++; }
  return c;
}

// ---------- опыт и уровни ----------
export function levelInfo(xp = S().xp) {
  let level = 1, need = 100, start = 0;
  while (xp >= start + need) { start += need; level++; need = 100 + (level - 1) * 50; }
  return { level, start, need, into: xp - start, pct: Math.round(((xp - start) / need) * 100) };
}
export const todayXp = () => S().xpLog[today()] || 0;
export function currentStreak() {
  const s = S();
  return s.lastActive === today() || s.lastActive === yesterday() ? s.streak : 0;
}

// sound: 'done' (по умолчанию, когда есть why), 'chime' — маленький шаг, 'none' — без фанфар
export function addXp(n, why = '', sound = why ? 'done' : 'none') {
  if (n <= 0) return;
  const s = S(); const d = today();
  const before = todayXp();
  const lvl = levelInfo().level;
  if (s.lastActive !== d) {
    s.streak = s.lastActive === yesterday() ? s.streak + 1 : 1;
    s.bestStreak = Math.max(s.bestStreak, s.streak);
    s.lastActive = d;
  }
  s.xp += n;
  s.xpLog[d] = before + n;
  const x = day().x, lang = s.lang || 'en';
  x[lang] = (x[lang] || 0) + n;
  if (why) toast(`+${n} XP · ${why}`, 'xp');
  if (goal) toast('Дневная цель выполнена — Пим сыт и доволен!', 'goal');
  const goal = before < s.goal && s.xpLog[d] >= s.goal, up = levelInfo().level > lvl;
  if (up) toast(`Новый уровень: ${levelInfo().level}!`, 'level');
  fanfare(goal || up ? 'big' : sound);
  store.save();
  checkBadges();
}

// Запись дневника за сегодня (для страницы «Прогресс»)
export function day() {
  const s = S(), d = today();
  s.days ||= {};
  if (!s.days[d]) { s.days[d] = emptyDay(); pruneDays(s.days); }
  return s.days[d];
}

export function recordAnswer(ok) {
  const st = S().stats; st.answers++; if (ok) st.correct++;
  const d = day(); d.a++; if (ok) d.c++;
}
// Учёт завершённой тренировки: всего, по видам и за день
export function countTraining(kind) {
  const st = S().stats; st.trainings++;
  if (kind) { st.byType ||= {}; st.byType[kind] = (st.byType[kind] || 0) + 1; }
  day().t++;
  planTick(String(kind || '').startsWith('g-') ? 'grammar' : 'train');
  store.save();
}
// Счётчик для плана на день по текущему языку: train — тренировки, grammar — уроки и тренировки правил
export function planTick(kind) {
  const s = S(), lang = s.lang || 'en';
  s.plans = { ...(s.plans || {}), [lang]: bump(s.plans?.[lang], today(), kind) };
}
export function finishTraining(correct, total, kind) {
  const st = S().stats; countTraining(kind);
  if (total >= 5 && correct === total) st.perfect++;
  addXp(5 + (total >= 5 && correct === total ? 5 : 0), 'тренировка завершена');
}

// ---------- достижения ----------
export const BADGES = [
  { id: 'first-word', title: 'Первое слово', desc: 'Добавьте слово в словарь', test: s => Object.keys(s.words).length >= 1 },
  { id: 'words-50', title: 'Коллекционер', desc: '50 слов в словаре', test: s => Object.keys(s.words).length >= 50 },
  { id: 'words-200', title: 'Ходячий словарь', desc: '200 слов в словаре', test: s => Object.keys(s.words).length >= 200 },
  { id: 'learned-10', title: 'Десятка', desc: 'Изучите 10 слов', test: s => Object.values(s.words).filter(w => w.srs).length >= 10 },
  { id: 'streak-3', title: 'Разгон', desc: '3 дня подряд', test: s => s.bestStreak >= 3 },
  { id: 'streak-7', title: 'Неделя без пропусков', desc: '7 дней подряд', test: s => s.bestStreak >= 7 },
  { id: 'streak-30', title: 'Железная воля', desc: '30 дней подряд', test: s => s.bestStreak >= 30 },
  { id: 'perfect', title: 'Без ошибок', desc: 'Тренировка из 5+ слов без единой ошибки', test: s => s.stats.perfect >= 1 },
  { id: 'reader', title: 'Читатель', desc: 'Прочитайте первый текст', test: s => Object.keys(s.readTexts).length >= 1 },
  { id: 'bookworm', title: 'Книжный червь', desc: 'Прочитайте 5 текстов', test: s => Object.keys(s.readTexts).length >= 5 },
  { id: 'grammar', title: 'Грамотей', desc: 'Пройдите урок грамматики', test: s => Object.keys(s.grammar).length >= 1 },
  { id: 'xp-1000', title: 'Тысячник', desc: 'Наберите 1000 XP', test: s => s.xp >= 1000 }
];

export function checkBadges() {
  const s = S();
  for (const b of BADGES) {
    if (!s.badges[b.id] && b.test(s)) { s.badges[b.id] = Date.now(); toast(`Достижение: ${b.title}`, 'badge'); store.save(); }
  }
}
