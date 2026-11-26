// Игровая логика: личный словарь, статусы слов, опыт (XP), уровни, ударный режим (стрик), достижения.
import { store } from './store.js';
import { newCard, review, isDue } from './srs.js';
import { toast } from './ui.js';
import { lower } from './lang.js';

export const TRAININGS = ['wt', 'tw', 'au', 'co']; // слово-перевод, перевод-слово, аудирование, конструктор
const S = () => store.state;

export const today = (d = new Date()) => {
  const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return z.toISOString().slice(0, 10);
};
const yesterday = () => today(new Date(Date.now() - 86400000));

// ---------- слова ----------
export function wordStatus(w) {
  if (w.srs) return isDue(w.srs) ? 'due' : 'learned';
  const n = TRAININGS.filter(k => w.trained?.[k]).length;
  return n === 0 ? 'new' : 'learning';
}
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

export function wordsFor(training) {
  return allWords().filter(w => !w.srs && !w.trained?.[training]).sort((a, b) => a.added - b.added);
}
export const dueWords = () => allWords().filter(w => w.srs && isDue(w.srs)).sort((a, b) => a.srs.due - b.srs.due);

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
    if (grade >= 2) TRAININGS.forEach(k => (w.trained = { ...w.trained, [k]: true }));
    w.srs = review(newCard(), grade);
  } else {
    w.srs = review(w.srs, grade);
  }
  if (grade === 0) { w.trained = {}; w.srs = null; } // забытое слово возвращается на изучение
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

export function addXp(n, why = '') {
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
  if (why) toast(`+${n} XP · ${why}`, 'xp');
  if (before < s.goal && s.xpLog[d] >= s.goal) toast('Дневная цель выполнена! Ёжик Пим доволен', 'goal');
  if (levelInfo().level > lvl) toast(`Новый уровень: ${levelInfo().level}!`, 'level');
  store.save();
  checkBadges();
}

export function recordAnswer(ok) {
  const st = S().stats; st.answers++; if (ok) st.correct++;
}
export function finishTraining(correct, total) {
  const st = S().stats; st.trainings++;
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
