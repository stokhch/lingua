// Все ученики: открытый список прогресса зарегистрированных пользователей.
//   GET /api/students -> { students: [...], me: id-строки или null, total }
// Показываем только имя и учебные цифры (никаких e-mail). Кто включил в профиле «скрыть меня»
// (state.hideFromAll), в списке не виден другим; себя ученик видит всегда, с пометкой.
import { levelOf } from './social.js';

const DAY = 86400000;
const LIMIT = 500;

// Стрик считается текущим, если ученик занимался сегодня или вчера (с запасом на часовые пояса)
export function currentStreak(state, now = Date.now()) {
  const d = state?.lastActive;
  if (!d || !state.streak) return 0;
  const diff = (now - Date.parse(d + 'T00:00:00Z')) / DAY;
  return diff < 2.5 ? state.streak : 0;
}

// Языки ученика: текущий хранится в корне состояния, остальные — в byLang
export function languagesOf(state) {
  if (!state) return [];
  const cur = state.lang || 'en';
  const parts = { [cur]: state, ...Object.fromEntries(Object.entries(state.byLang || {}).filter(([id]) => id !== cur)) };
  return Object.entries(parts).map(([id, s]) => {
    const words = Object.values(s?.words || {});
    return { id, words: words.length, known: words.filter(w => w?.srs).length, texts: Object.keys(s?.readTexts || {}).length, level: state.placement?.[id]?.level || null };
  }).filter(l => l.id === cur || l.words || l.texts || l.level)
    .sort((a, b) => (b.id === cur) - (a.id === cur) || b.words - a.words);
}

export function studentRow(u, weekXp, now = Date.now()) {
  const s = u.state || {};
  const xp = s.xp || 0;
  return {
    id: u.id, name: u.name, xp, level: levelOf(xp), week: weekXp(s), streak: currentStreak(s, now), best: s.bestStreak || 0,
    active: s.lastActive || null, since: u.createdAt || s.createdAt || null, hidden: !!s.hideFromAll, langs: languagesOf(s)
  };
}

// extra(u) — дополнительные поля для чужих строк (pid и состояние дружбы, если смотрит ученик с аккаунтом)
export function studentsList(users, meId, weekXp, now = Date.now(), extra = null) {
  const rows = Object.values(users || {})
    .filter(u => u.id === meId || !u.state?.hideFromAll)
    .map(u => ({ ...studentRow(u, weekXp, now), ...(extra && u.id !== meId ? extra(u) : {}) }))
    .sort((a, b) => b.week - a.week || b.xp - a.xp);
  // id наружу не отдаём: вместо него — пометка «это вы»
  return { total: rows.length, students: rows.slice(0, LIMIT).map(({ id, ...r }) => ({ ...r, me: id === meId })) };
}
