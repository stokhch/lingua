// Интервальные повторения: вариант алгоритма SM-2 (SuperMemo 2) с четырьмя оценками,
// как в карточках Anki: 0 — «Не помню», 1 — «Трудно», 2 — «Помню», 3 — «Легко».
const DAY = 86400000;
export const GRADES = [
  { id: 0, label: 'Не помню', key: '1' },
  { id: 1, label: 'Трудно', key: '2' },
  { id: 2, label: 'Помню', key: '3' },
  { id: 3, label: 'Легко', key: '4' }
];

export function newCard(now = Date.now()) {
  return { due: now + DAY, ivl: 1, ef: 2.5, reps: 0, lapses: 0, last: now };
}

// Возвращает новую карточку после ответа. Интервал в днях.
export function review(card, grade, now = Date.now()) {
  const c = { ...(card || newCard(now)) };
  if (grade === 0) {
    c.lapses += 1; c.reps = 0; c.ivl = 0; c.ef = Math.max(1.3, c.ef - 0.2);
    c.due = now + 10 * 60 * 1000; // через 10 минут
  } else {
    let ivl;
    if (grade === 1) { ivl = Math.max(1, c.ivl * 1.2); c.ef = Math.max(1.3, c.ef - 0.15); }
    else if (grade === 2) { ivl = c.reps === 0 ? 1 : c.reps === 1 ? 3 : c.ivl * c.ef; }
    else { ivl = c.reps === 0 ? 4 : c.ivl * c.ef * 1.3; c.ef += 0.15; }
    c.ivl = Math.min(3650, Math.round(ivl * 10) / 10);
    c.reps += 1;
    c.due = now + c.ivl * DAY;
  }
  c.last = now;
  return c;
}

export function isDue(card, now = Date.now()) { return !!card && card.due <= now; }

export function intervalLabel(card, grade, now = Date.now()) {
  const n = review(card, grade, now);
  const d = (n.due - now) / DAY;
  if (d < 1 / 24) return '10 мин';
  if (d < 1) return Math.round(d * 24) + ' ч';
  if (d < 31) return Math.round(d) + ' дн';
  if (d < 365) return Math.round(d / 30) + ' мес';
  return (d / 365).toFixed(1) + ' г';
}
