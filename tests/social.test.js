import test from 'node:test';
import assert from 'node:assert/strict';
import { cleanWords, scoreOf, winner, levelOf } from '../social.js';

const w = (n, t = 'т') => Array.from({ length: n }, (_, i) => ({ w: 'w' + i, t: t + i, opts: [t + i, 'a' + i, 'b' + i, 'c' + i] }));

test('Дуэль: проверка слов', () => {
  assert.equal(cleanWords(w(4)), null);
  assert.equal(cleanWords(w(11)), null);
  assert.equal(cleanWords(w(10)).length, 10);
  assert.equal(cleanWords([...w(4), { w: 'x', t: 'y', opts: ['a', 'b', 'c', 'd'] }]), null); // нет правильного варианта
  assert.equal(cleanWords([...w(4), { w: 'x', t: 'y', opts: ['y', 'y', 'c', 'd'] }]), null); // повтор варианта
  assert.equal(cleanWords('nope'), null);
});

test('Дуэль: счёт считает сервер по выбранным вариантам', () => {
  const words = cleanWords(w(5));
  assert.equal(scoreOf(words, [0, 0, 1, 0, 'x']), 3);
  assert.equal(scoreOf(words, null), 0);
});

test('Дуэль: победитель по очкам, затем по времени', () => {
  assert.equal(winner({ a: { score: 5, ms: 9000 }, b: { score: 4, ms: 1000 } }), 'a');
  assert.equal(winner({ a: { score: 5, ms: 9000 }, b: { score: 5, ms: 8000 } }), 'b');
  assert.equal(winner({ a: { score: 5, ms: 9000 }, b: { score: 5, ms: 9000 } }), 'draw');
  assert.equal(winner({ a: { score: 5, ms: 9000 }, b: null }), null);
});

test('Уровень на сервере считается как в клиенте', () => {
  assert.equal(levelOf(0), 1); assert.equal(levelOf(99), 1); assert.equal(levelOf(100), 2); assert.equal(levelOf(250), 3);
});

test('приглашение по ссылке: по коду видно только имя пригласившего', async () => {
  const { createSocial } = await import('../social.js');
  const db = { users: { u1: { id: 'u1', name: 'Аня', email: 'a@x.ru', code: 'ABC234' } } };
  let out;
  const social = createSocial({ getDb: () => db, persist() {}, send: (res, status, body) => (out = { status, body }), readJson: async () => ({}), weekXp: () => 0 });
  social.handlePublic('GET /api/invite', {}, {}, new URL('http://x/api/invite?code=abc-234'));
  assert.deepEqual(out, { status: 200, body: { name: 'Аня' } });
  social.handlePublic('GET /api/invite', {}, {}, new URL('http://x/api/invite?code=ZZZZZZ'));
  assert.equal(out.status, 404);
  assert.equal(social.handlePublic('GET /api/other', {}, {}, new URL('http://x/')), false);
});
