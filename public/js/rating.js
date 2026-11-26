// Рейтинг дня и недели: где я стою, сколько XP до следующего места, и напоминания об этом.
// Чистые функции (standing, nudgeText, reminderFor) не трогают DOM — их проверяют тесты.

export const BOARDS = { day: { key: 'today', title: 'Рейтинг дня', short: 'Сегодня' }, week: { key: 'week', title: 'Рейтинг недели', short: 'Неделя' } };

// Моё место в таблице rows (уже отсортирована по field): позиция, отрыв, кого догонять
export function standing(rows = [], field = 'week') {
  const i = rows.findIndex(r => r.me);
  if (i < 0) {
    const last = rows[rows.length - 1];
    return { pos: 0, size: rows.length, gap: last ? (last[field] || 0) + 1 : 0, target: last || null };
  }
  const me = rows[i], above = rows[i - 1], below = rows[i + 1];
  return {
    pos: i + 1, size: rows.length, mine: me[field] || 0,
    gap: above ? (above[field] || 0) - (me[field] || 0) + 1 : 0,
    target: above || null,
    lead: !above && below ? (me[field] || 0) - (below[field] || 0) : 0
  };
}

const ord = n => `${n}-е`;

// Короткая строка «где я» для карточки на главной и тоста
export function nudgeText(st, field) {
  const when = field === 'today' ? 'сегодня' : 'за неделю';
  if (!st.size) return 'Пока пусто — станьте первым';
  if (st.pos && !st.mine) return field === 'today' ? 'Сегодня пока 0 XP — потренируйтесь, чтобы подняться' : 'За неделю пока 0 XP — самое время начать';
  if (!st.pos) return `Вы пока не в двадцатке. Наберите ${st.gap} XP ${when}, чтобы попасть в рейтинг`;
  if (st.pos === 1) return st.size === 1 ? 'Вы первый. Позовите друзей посоревноваться' : st.lead > 0 ? `Вы на 1-м месте, отрыв ${st.lead} XP` : 'Вы на 1-м месте, но соперник вплотную';
  return `${ord(st.pos)} место · ещё ${st.gap} XP до ${st.pos - 1}-го`;
}

// Решаем, о чём напомнить при входе. prev — что запомнили в прошлый раз ({date, day, week}).
// Напоминаем не чаще раза в день, а если обогнали в недельном рейтинге — сразу.
export function reminderFor(boards, prev = {}, date) {
  const week = standing(boards.week, 'week'), day = standing(boards.day, 'today');
  const save = { date, week: week.pos, day: day.pos };
  if (week.pos && prev.week && week.pos > prev.week) return { save, text: `Вас обогнали в рейтинге недели: теперь вы на ${week.pos}-м месте` };
  if (prev.date === date) return { save: { ...prev, week: week.pos }, text: '' };
  const wd = new Date(date + 'T12:00:00').getDay();
  if (wd === 0 && week.pos) return { save, text: `Неделя заканчивается: вы на ${week.pos}-м месте в рейтинге недели` };
  if (day.pos > 1 && day.target) return { save, text: `Рейтинг дня: ещё ${day.gap} XP — и вы обгоните ${day.target.name}` };
  if (week.pos > 1 && week.target) return { save, text: `Рейтинг недели: ещё ${week.gap} XP — и вы обгоните ${week.target.name}` };
  if (!week.pos && week.size) return { save, text: 'Загляните в рейтинг недели — до двадцатки рукой подать' };
  return { save, text: '' };
}
