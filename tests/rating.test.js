import test from 'node:test';
import assert from 'node:assert/strict';
import { standing, nudgeText, reminderFor } from '../public/js/rating.js';

const rows = (...xs) => xs.map(([name, week, today, me]) => ({ name, week, today, me: !!me }));

test('Рейтинг: место и сколько XP до следующего', () => {
  const r = rows(['Аня', 120, 30], ['Я', 100, 10, 1], ['Боря', 40, 50]);
  const st = standing(r, 'week');
  assert.equal(st.pos, 2);
  assert.equal(st.gap, 21);
  assert.equal(st.target.name, 'Аня');
  assert.equal(nudgeText(st, 'week'), '2-е место · ещё 21 XP до 1-го');
});

test('Рейтинг: лидер видит отрыв, вне двадцатки — сколько добрать', () => {
  const lead = standing(rows(['Я', 90, 0, 1], ['Аня', 60, 0]), 'week');
  assert.equal(lead.pos, 1); assert.equal(lead.lead, 30);
  assert.match(nudgeText(lead, 'week'), /отрыв 30 XP/);
  const out = standing(rows(['Аня', 60, 5], ['Боря', 20, 3]), 'today');
  assert.equal(out.pos, 0); assert.equal(out.gap, 4);
  assert.match(nudgeText(out, 'today'), /4 XP сегодня/);
});

test('Напоминание: раз в день, а обгон — сразу', () => {
  const b = { week: rows(['Аня', 120, 30], ['Я', 100, 10, 1]), day: rows(['Аня', 120, 30], ['Я', 100, 10, 1]) };
  const first = reminderFor(b, {}, '2026-11-26');
  assert.match(first.text, /Рейтинг дня: ещё 21 XP — и вы обгоните Аня/);
  assert.equal(reminderFor(b, first.save, '2026-11-26').text, '');
  const dropped = reminderFor(b, { date: '2026-11-26', week: 1 }, '2026-11-26');
  assert.match(dropped.text, /обогнали в рейтинге недели: теперь вы на 2-м/);
  assert.match(reminderFor(b, {}, '2026-11-29').text, /Неделя заканчивается/); // воскресенье
});
