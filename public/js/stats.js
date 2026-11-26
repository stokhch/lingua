// Статистика прогресса: чистые функции без DOM и хранилища — их можно проверять в Node.
// Источники данных в состоянии ученика:
//  • xpLog   — опыт по дням { 'YYYY-MM-DD': xp } (ведётся с самого начала);
//  • days    — подробный дневник { 'YYYY-MM-DD': { x: { en: xp }, t, a, c, r } }:
//              опыт по языкам, тренировки, ответы, верные ответы, повторения карточек;
//  • words   — у каждого слова есть added и learnedAt, из них строим историю слов.
import { isDue } from './srs.js';

export const TRAININGS = ['wt', 'tw', 'au', 'co']; // слово-перевод, перевод-слово, аудирование, конструктор
const DAY = 86400000;

export const dayKey = (d = new Date()) => {
  const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return z.toISOString().slice(0, 10);
};
// Полдень нужного дня: так переход на летнее время не сдвигает даты
const noon = d => { const x = new Date(d); x.setHours(12, 0, 0, 0); return x; };
const addDays = (d, n) => { const x = noon(d); x.setDate(x.getDate() + n); return x; };

// ---------- слова ----------
export function wordStatus(w, now = Date.now()) {
  if (w.srs) return isDue(w.srs, now) ? 'due' : 'learned';
  const n = TRAININGS.filter(k => w.trained?.[k]).length;
  return n === 0 ? 'new' : 'learning';
}

export function wordCounts(words, now = Date.now()) {
  const c = { total: 0, new: 0, learning: 0, learned: 0, due: 0 };
  for (const w of Object.values(words || {})) { c.total++; c[wordStatus(w, now)]++; }
  c.known = c.learned + c.due; // изучено — включая те, что пора повторить
  return c;
}

// Прочность памяти — по текущему интервалу повторения изученных слов
export const STRENGTH = [
  { id: 'fresh', title: 'Только что выучены', hint: 'интервал до 3 дней', max: 3 },
  { id: 'growing', title: 'Закрепляются', hint: 'от 3 дней до 2 недель', max: 14 },
  { id: 'strong', title: 'Прочные', hint: 'от 2 недель до 2 месяцев', max: 60 },
  { id: 'solid', title: 'В долгой памяти', hint: 'больше 2 месяцев', max: Infinity }
];
export function strength(words) {
  const out = Object.fromEntries(STRENGTH.map(s => [s.id, 0]));
  for (const w of Object.values(words || {})) {
    if (!w.srs) continue;
    out[STRENGTH.find(s => (w.srs.ivl || 0) < s.max).id]++;
  }
  return out;
}

// Сколько слов добавлено и изучено в каждый из последних n дней (по всем переданным словарям)
export function wordTimeline(wordLists, n, now = new Date()) {
  const days = lastDays(n, now).map(d => ({ ...d, added: 0, learned: 0 }));
  const idx = Object.fromEntries(days.map((d, i) => [d.key, i]));
  for (const words of wordLists) for (const w of Object.values(words || {})) {
    if (w.added) { const i = idx[dayKey(new Date(w.added))]; if (i !== undefined) days[i].added++; }
    if (w.srs && w.learnedAt) { const i = idx[dayKey(new Date(w.learnedAt))]; if (i !== undefined) days[i].learned++; }
  }
  return days;
}

// ---------- опыт и активность ----------
export function lastDays(n, now = new Date()) {
  return Array.from({ length: n }, (_, i) => { const date = addDays(now, i - n + 1); return { key: dayKey(date), date }; });
}
export const xpSeries = (xpLog, n, now = new Date()) => lastDays(n, now).map(d => ({ ...d, xp: xpLog?.[d.key] || 0 }));
const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);

// Итоги периода и сравнение с предыдущим таким же периодом
export function periodSummary(xpLog, n, goal, now = new Date()) {
  const cur = xpSeries(xpLog, n, now), prev = xpSeries(xpLog, n, addDays(now, -n));
  const xp = sum(cur, d => d.xp), before = sum(prev, d => d.xp);
  return {
    xp, before,
    change: before ? Math.round(((xp - before) / before) * 100) : null,
    active: cur.filter(d => d.xp > 0).length,
    goalDays: cur.filter(d => d.xp >= goal).length,
    avg: Math.round(xp / n),
    best: cur.reduce((b, d) => (d.xp > b.xp ? d : b), { xp: 0 })
  };
}

// Календарь активности: недели (столбцы) с понедельника по воскресенье, уровень цвета 0–4 относительно цели
export function heatmap(xpLog, weeks, goal, now = new Date()) {
  const end = noon(now);
  const monday = addDays(end, -((end.getDay() + 6) % 7));
  const start = addDays(monday, -(weeks - 1) * 7);
  const todayKey = dayKey(end);
  return Array.from({ length: weeks }, (_, w) => Array.from({ length: 7 }, (_, d) => {
    const date = addDays(start, w * 7 + d), key = dayKey(date), xp = xpLog?.[key] || 0;
    const future = key > todayKey;
    const lvl = future || !xp ? 0 : xp >= goal * 2 ? 4 : xp >= goal ? 3 : xp >= goal / 2 ? 2 : 1;
    return { key, date, xp, lvl, future, today: key === todayKey };
  }));
}

// Все дни с занятиями и самая длинная серия по журналу опыта
export function activityTotals(xpLog) {
  const keys = Object.keys(xpLog || {}).filter(k => xpLog[k] > 0).sort();
  let best = 0, run = 0, prev = null;
  for (const k of keys) {
    run = prev && dayKey(addDays(new Date(prev + 'T12:00:00'), 1)) === k ? run + 1 : 1;
    best = Math.max(best, run); prev = k;
  }
  return { activeDays: keys.length, longestRun: best, first: keys[0] || null };
}

// ---------- дневник ----------
// Пустая запись дня; поля короткие, чтобы состояние в аккаунте оставалось маленьким
export const emptyDay = () => ({ x: {}, t: 0, a: 0, c: 0, r: 0 });

export function sumDays(days, n, now = new Date()) {
  const out = { ...emptyDay(), x: {} };
  for (const { key } of lastDays(n, now)) {
    const d = days?.[key]; if (!d) continue;
    for (const f of ['t', 'a', 'c', 'r']) out[f] += d[f] || 0;
    for (const [l, v] of Object.entries(d.x || {})) out.x[l] = (out.x[l] || 0) + v;
  }
  return out;
}

// Убираем записи старше года, чтобы дневник не рос бесконечно
export function pruneDays(days, now = new Date(), keep = 400) {
  const cut = dayKey(addDays(now, -keep));
  for (const k of Object.keys(days)) if (k < cut) delete days[k];
  return days;
}

// ---------- языки ----------
// Слова, тексты и уроки языка: у текущего языка они лежат в корне состояния, у остальных — в byLang
export function langData(state, id) {
  const cur = (state.lang || 'en') === id;
  const src = cur ? state : state.byLang?.[id] || {};
  return { current: cur, words: src.words || {}, readTexts: src.readTexts || {}, grammar: src.grammar || {} };
}

export function langSummary(state, lang, now = new Date()) {
  const d = langData(state, lang.id);
  const c = wordCounts(d.words, now.getTime());
  const texts = lang.TEXTS?.length || 0, lessons = lang.ALL_LESSONS?.length || 0;
  return {
    id: lang.id, current: d.current, counts: c,
    textsRead: Object.keys(d.readTexts).length, texts,
    lessonsPassed: Object.values(d.grammar).filter(g => g?.passed).length, lessons,
    xp30: sumDays(state.days, 30, now).x[lang.id] || 0
  };
}
