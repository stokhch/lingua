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
  starving: { title: 'Пим очень голоден', mood: 'sad', hint: 'Пим давно вас не видел и совсем загрустил. Пройдите одну тренировку — и у него появятся силы.' },
  hungry: { title: 'Пим проголодался', mood: 'hungry', hint: 'Новый день — пустая миска. Каждые несколько очков опыта — яблоко для Пима.' },
  snack: { title: 'Пим перекусил', mood: 'hungry', hint: 'Первое яблоко съедено. Ещё немного — и Пим наестся.' },
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

// ---------- реплики Пима ----------
// Реплика выбирается по дню и состоянию: в течение дня Пим говорит одно и то же и не мельтешит,
// а salt позволяет разным местам сайта выбрать разные фразы.
const hash = str => { let h = 2166136261; for (const ch of str) h = Math.imul(h ^ ch.codePointAt(0), 16777619); return h >>> 0; };
export const pick = (list, seed) => list[hash(seed) % list.length];
const applesWord = n => { const m10 = n % 10, m100 = n % 100; return m10 === 1 && m100 !== 11 ? 'яблоко' : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? 'яблока' : 'яблок'; };
const fill = (t, v) => t.replace(/\{(\w+)\}/g, (_, k) => v[k] ?? '');

const PLEAS = {
  starving: [
    'Ты вернулся! Я {missed} дн. сидел у пустой миски… Одно яблочко, пожалуйста?',
    'У меня урчит в животе так громко, что слышно на всю чащу. Покормишь?',
    'Я совсем ослаб без яблок. Всего одна тренировка — и я снова бодрый!',
    'Я скучал. И очень проголодался. Можно хотя бы кусочек яблока?'
  ],
  hungry: [
    'Доброе утро! Моя миска пуста. Угостишь яблочком?',
    'Ур-р-р… это мой живот. Одна тренировка — и он замолчит.',
    'Я нашёл пустую миску. Догадываешься, кто может её наполнить?',
    'Всего {perApple} XP — и у меня будет первое яблоко!',
    'Пожалуйста-пожалуйста… хотя бы одно яблочко!',
    'Я так старался не думать о яблоках. Не получилось. Покормишь?'
  ],
  snack: [
    'Ням! Спасибо за яблоко. А можно ещё одно?',
    'Одно яблоко — это только начало. Ещё {left} XP, и я сыт!',
    'Вкусно! Но в миске ещё так много места…',
    'Я только раздразнил аппетит. Ещё парочку яблок?'
  ],
  almost: [
    'Почти наелся! Осталось {left} XP — совсем чуть-чуть.',
    'Ещё одно яблоко, и я буду совсем-совсем сыт!',
    'Ты лучший! Ещё пару слов — и миска полная.'
  ],
  full: [
    'Я сыт и счастлив! Спасибо, что не забыл про меня.',
    'Фыр-фыр! Объелся. Завтра снова буду ждать.',
    'Полная миска! Можно повторить пару слов на завтра — я посижу рядом.'
  ],
  feast: [
    'Двойная порция! Я теперь круглый, как яблоко.',
    'Вот это пир! Сворачиваюсь клубочком…'
  ]
};
const EVENING = [
  'Уже вечер, а я всё ещё голодный… Успеешь до сна?',
  'Скоро ночь. Не оставляй меня с пустой миской, пожалуйста!',
  'Звёзды зажигаются, а в миске ещё есть место. Пару минут для меня?'
];

// Что Пим говорит сейчас. Вечером, пока он не сыт, просит настойчивее.
export function plea(sat, now = new Date(), salt = '') {
  const v = { left: sat.left, perApple: sat.perApple, missed: sat.missed, apples: sat.apples };
  const hungry = sat.state !== 'full' && sat.state !== 'feast';
  const list = hungry && now.getHours() >= 19 ? EVENING : PLEAS[sat.state];
  return fill(pick(list, dayKey(now) + sat.state + salt), v);
}

// Реакция после тренировки: сколько яблок съедено и сколько осталось
export function reaction(before, after, goal) {
  const b = Math.min(APPLES, Math.floor((before / goal) * APPLES + 1e-9));
  const a = Math.min(APPLES, Math.floor((after / goal) * APPLES + 1e-9));
  const got = a - b, left = Math.max(0, goal - after);
  const nextApple = Math.max(0, Math.ceil(((a + 1) * goal) / APPLES) - after);
  if (before >= goal) return { mood: 'happy', text: 'Я уже сыт, но от добавки не откажусь! Спасибо за заботу.' };
  if (after >= goal) return { mood: 'eating', text: `Ням-ням! Миска полная — ${got > 1 ? `сразу ${got} ${applesWord(got)}` : 'последнее яблоко'}! Спасибо, я сыт.`, full: true };
  if (got > 0) return { mood: 'eating', text: `Ням-ням! +${got} ${applesWord(got)}. Ещё ${left} XP — и я наемся.` };
  return { mood: 'hungry', text: `Яблоко уже почти моё — ещё ${nextApple} XP! Может, ещё одну тренировку?` };
}
