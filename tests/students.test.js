import test from 'node:test';
import assert from 'node:assert/strict';
import { studentsList, languagesOf, currentStreak } from '../students.js';

const now = Date.parse('2026-03-10T12:00:00Z');
const weekXp = s => s?.week || 0;
const users = {
  a: { id: 'a', name: 'Аня', email: 'a@x.ru', createdAt: 1, state: { xp: 300, week: 40, streak: 3, lastActive: '2026-03-10', lang: 'en', words: { cat: { srs: {} }, dog: {} }, readTexts: { t1: 1 }, placement: { en: { level: 'B1' } },
    byLang: { tr: { words: { ev: {} }, readTexts: {} }, el: { words: {}, readTexts: {} } } } },
  b: { id: 'b', name: 'Боря', email: 'b@x.ru', state: { xp: 50, week: 90, streak: 7, lastActive: '2026-03-01' } },
  c: { id: 'c', name: 'Вера', email: 'c@x.ru', state: { xp: 999, week: 500, hideFromAll: true } },
  d: { id: 'd', name: 'Гоша', email: 'd@x.ru', state: null }
};

test('список: без e-mail и id, скрывшиеся не видны другим, сортировка по неделе', () => {
  const r = studentsList(users, 'a', weekXp, now);
  assert.deepEqual(r.students.map(s => s.name), ['Боря', 'Аня', 'Гоша']);
  assert.equal(r.total, 3);
  for (const s of r.students) { assert.ok(!('email' in s) && !('id' in s)); }
  assert.equal(r.students.find(s => s.name === 'Аня').me, true);
  assert.equal(JSON.stringify(r).includes('@'), false);
});

test('скрывшийся видит себя в списке', () => {
  const r = studentsList(users, 'c', weekXp, now);
  const me = r.students.find(s => s.me);
  assert.equal(me.name, 'Вера'); assert.equal(me.hidden, true);
});

test('стрик обнуляется, если давно не занимался', () => {
  assert.equal(currentStreak(users.a.state, now), 3);
  assert.equal(currentStreak(users.b.state, now), 0);
});

test('языки: текущий первым, пустые без занятий не показываются', () => {
  const l = languagesOf(users.a.state);
  assert.deepEqual(l.map(x => x.id), ['en', 'tr']);
  assert.deepEqual(l[0], { id: 'en', words: 2, known: 1, texts: 1, level: 'B1' });
  assert.deepEqual(languagesOf(null), []);
});
