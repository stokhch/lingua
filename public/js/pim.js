// Сытость ёжика Пима. Каждый день Пим просыпается голодным, а ученик кормит его яблоками:
// весь опыт за день — это еда, дневная цель — полная миска из пяти яблок.
// Чистые функции: только журнал опыта и цель, без DOM и хранилища.
import { dayKey, lastDays } from './stats.js';

export const APPLES = 5;
const ONE_DAY = 86400000;

export function satiety(xpLog, goal, now = new Date()) {
  const xp = xpLog?.[dayKey(now)] || 0;
  const pct = Math.round((xp / goal) * 100);
  const apples = Math.min(APPLES, Math.floor((xp / goal) * APPLES + 1e-9));
  const part = Math.min(1, (xp / goal) * APPLES - apples); // доля следующего, недоеденного яблока
  const perApple = Math.ceil(goal / APPLES);
  // сколько дней подряд до сегодняшнего Пим оставался без еды
  let missed = 0;
  const ever = Object.values(xpLog || {}).some(x => x > 0);
  if (!xp && ever) for (let i = 1; i <= 60 && !(xpLog?.[dayKey(new Date(now.getTime() - i * ONE_DAY))] > 0); i++) missed = i;
  const state = xp >= goal * 2 ? 'feast' : xp >= goal ? 'full' : pct >= 50 ? 'almost' : xp > 0 ? 'snack' : missed >= 2 ? 'starving' : 'hungry';
  return { xp, goal, pct: Math.min(100, pct), apples, part: xp >= goal ? 0 : part, perApple, left: Math.max(0, goal - xp), missed, state, ...TEXT[state] };
}

const TEXT = {
  starving: { title: 'Пим очень голоден', mood: 'sleepy', hint: 'Пим давно вас не видел и совсем загрустил. Пройдите одну тренировку — и у него появятся силы.' },
  hungry: { title: 'Пим проголодался', mood: 'sleepy', hint: 'Новый день — пустая миска. Каждые несколько очков опыта — яблоко для Пима.' },
  snack: { title: 'Пим перекусил', mood: 'calm', hint: 'Первое яблоко съедено. Ещё немного — и Пим наестся.' },
  almost: { title: 'Пим почти сыт', mood: 'calm', hint: 'Больше половины миски. Осталось чуть-чуть до полной сытости.' },
  full: { title: 'Пим сыт и доволен', mood: 'happy', hint: 'Миска полная — дневная цель выполнена. Завтра Пим снова проголодается.' },
  feast: { title: 'У Пима праздник', mood: 'happy', hint: 'Двойная порция! Пим объелся яблок и сворачивается клубком.' }
};

// Сытые дни: сколько дней подряд Пим наедался (сегодняшний голодный день серию ещё не прерывает)
export function fedStreak(xpLog, goal, now = new Date()) {
  const fed = d => (xpLog?.[dayKey(d)] || 0) >= goal;
  let n = 0, i = fed(now) ? 0 : 1;
  for (; i < 3660 && fed(new Date(now.getTime() - i * ONE_DAY)); i++) n++;
  return n;
}
export const fedDays = (xpLog, goal) => Object.values(xpLog || {}).filter(x => x >= goal).length;
// Миски за последние n дней: сытость каждого дня от 0 до 1
export const bowls = (xpLog, goal, n, now = new Date()) => lastDays(n, now).map(d => ({ ...d, xp: xpLog?.[d.key] || 0, fill: Math.min(1, (xpLog?.[d.key] || 0) / goal) }));

// Рисунок яблока (оригинальный). fill — сколько яблока «на месте»: 1 целое, 0 — пустой контур
export function apple(fill = 1, size = 30) {
  const id = 'ap' + Math.random().toString(36).slice(2, 8);
  const y = (1 - fill) * 30 + 6;
  return `<svg class="apple ${fill >= 1 ? "ap-full" : fill > 0 ? "ap-part" : "ap-none"}" width="${size}" height="${size}" viewBox="0 0 36 36" aria-hidden="true">
  <defs><clipPath id="${id}"><rect x="0" y="${y.toFixed(1)}" width="36" height="36"/></clipPath></defs>
  <path class="ap-shape" d="M18 11c-3-3-11-3-12 5-1 8 5 16 9 16 1.5 0 2-1 3-1s1.5 1 3 1c4 0 10-8 9-16-1-8-9-8-12-5z"/>
  <path class="ap-fill" clip-path="url(#${id})" d="M18 11c-3-3-11-3-12 5-1 8 5 16 9 16 1.5 0 2-1 3-1s1.5 1 3 1c4 0 10-8 9-16-1-8-9-8-12-5z"/>
  <path class="ap-stem" d="M18 11c0-3 1-5 3-7"/><path class="ap-leaf" d="M20 7c2-3 6-3 8-2-2 3-5 4-8 2z"/>
  ${fill > 0 ? '<path class="ap-shine" d="M11 15c-1.5 1.5-2 4-1.5 6"/>' : ''}
</svg>`;
}

export const appleRow = s => Array.from({ length: APPLES }, (_, i) => apple(i < s.apples ? 1 : i === s.apples ? s.part : 0)).join('');
