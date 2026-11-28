import test from 'node:test';
import assert from 'node:assert/strict';
import { createSocial, requestDeny, relOf, REQ_PER_DAY, DECLINE_PAUSE } from '../social.js';
import { createMessages } from '../messages.js';
import { studentsList } from '../students.js';

function world() {
  const db = { users: {}, sessions: {}, classes: {} };
  for (const id of ['ann', 'bob', 'cat', 'dan']) db.users[id] = { id, name: id.toUpperCase(), email: id + '@x.ru', friends: [], state: {} };
  let out, body = {};
  const send = (res, status, data) => (out = { status, data });
  const social = createSocial({ getDb: () => db, persist() {}, send, readJson: async () => body, weekXp: () => 0 });
  const messages = createMessages({ getDb: () => db, persist() {}, send, readJson: async () => body, codeOf: social.codeOf, byCode: social.byCode,
    friendReqs: social.incomingCount, relOf: social.relOf, pidOf: social.pidOf });
  const soc = async (who, route, b = {}) => { body = b; out = null; await social.handle(route, {}, {}, { user: db.users[who] }); return out; };
  const msg = async (who, route, b = {}, q = '') => { body = b; out = null; await messages.handle(route, {}, {}, { user: db.users[who] }, new URL('http://x' + route.split(' ')[1] + q)); return out; };
  const pid = id => social.pidOf(db.users[id]);
  return { db, soc, msg, pid, social };
}

test('Запрос в друзья: дружба только после согласия', async () => {
  const { db, soc, pid, social } = world(), u = db.users;
  const r = await soc('ann', 'POST /api/friends/request', { pid: pid('bob') });
  assert.equal(r.status, 201); assert.equal(r.data.status, 'out');
  assert.deepEqual(u.ann.friends, []); // ещё не друзья
  assert.equal(relOf(db, u.ann, u.bob), 'out');
  assert.equal(relOf(db, u.bob, u.ann), 'in');
  assert.equal(social.incomingCount(u.bob), 1);
  assert.match((await soc('ann', 'POST /api/friends/request', { pid: pid('bob') })).data.error, /уже отправлен/);

  const view = (await soc('bob', 'GET /api/social')).data;
  assert.equal(view.requests.in.length, 1);
  assert.equal(view.requests.in[0].name, 'ANN');
  assert.equal(view.requests.in[0].code, undefined); // кода в запросе нет
  assert.equal((await soc('ann', 'GET /api/social')).data.requests.out[0].name, 'BOB');

  const ok = await soc('bob', 'POST /api/friends/respond', { pid: pid('ann'), accept: true });
  assert.equal(ok.data.status, 'friend');
  assert.deepEqual(u.ann.friends, ['bob']); assert.deepEqual(u.bob.friends, ['ann']);
  assert.equal(db.friendReqs.length, 0);
  assert.equal(social.incomingCount(u.bob), 0);
  assert.match((await soc('ann', 'POST /api/friends/request', { pid: pid('bob') })).data.error, /уже у вас в друзьях/);
});

test('Встречный запрос сразу делает друзьями', async () => {
  const { db, soc, pid } = world();
  await soc('ann', 'POST /api/friends/request', { pid: pid('cat') });
  const r = await soc('cat', 'POST /api/friends/request', { pid: pid('ann') });
  assert.equal(r.data.status, 'friend');
  assert.deepEqual(db.users.cat.friends, ['ann']);
});

test('Отказ: отправитель не видит его и не может сразу повторить', async () => {
  const { db, soc, pid } = world(), u = db.users;
  await soc('ann', 'POST /api/friends/request', { pid: pid('bob') });
  await soc('bob', 'POST /api/friends/respond', { pid: pid('ann'), accept: false });
  assert.equal((await soc('bob', 'GET /api/social')).data.requests.in.length, 0);
  assert.equal(relOf(db, u.ann, u.bob), 'out'); // для отправителя запрос по-прежнему «отправлен»
  await soc('ann', 'POST /api/friends/cancel', { pid: pid('bob') });
  assert.equal(relOf(db, u.ann, u.bob), null);
  assert.match((await soc('ann', 'POST /api/friends/request', { pid: pid('bob') })).data.error, /пока нельзя/);
  db.friendReqs[0].at -= DECLINE_PAUSE + 1000; // прошёл месяц
  assert.equal((await soc('ann', 'POST /api/friends/request', { pid: pid('bob') })).status, 201);
});

test('Отозвать запрос', async () => {
  const { db, soc, pid, social } = world();
  await soc('ann', 'POST /api/friends/request', { pid: pid('bob') });
  assert.equal((await soc('ann', 'POST /api/friends/cancel', { pid: pid('bob') })).status, 200);
  assert.equal(social.incomingCount(db.users.bob), 0);
  assert.equal((await soc('bob', 'POST /api/friends/respond', { pid: pid('ann'), accept: true })).status, 404);
});

test('Настройка «кто может присылать запросы» и блокировка', async () => {
  const { db, soc, msg, pid } = world(), u = db.users;
  assert.equal((await soc('bob', 'POST /api/friends/settings', { reqFrom: 'wrong' })).status, 400);
  await soc('bob', 'POST /api/friends/settings', { reqFrom: 'nobody' });
  assert.match(requestDeny(db, u.ann, u.bob), /не принимает/);
  await soc('bob', 'POST /api/friends/settings', { reqFrom: 'class' });
  assert.match(requestDeny(db, u.ann, u.bob), /только от одноклассников/);
  db.classes.k = { id: 'k', owner: 'dan', students: ['ann', 'bob'] };
  assert.equal(requestDeny(db, u.ann, u.bob), null);

  // блокировка убирает запрос и не даёт прислать новый
  await soc('ann', 'POST /api/friends/request', { pid: pid('bob') });
  await msg('bob', 'POST /api/messages/block', { code: db.users.ann.code || (await soc('ann', 'GET /api/social')).data.code, block: true });
  assert.equal(db.friendReqs.length, 0);
  assert.match((await soc('ann', 'POST /api/friends/request', { pid: pid('bob') })).data.error, /ограничил/);
});

test('Лимит запросов в день', async () => {
  const { db, soc, pid } = world();
  for (let i = 0; i < REQ_PER_DAY; i++) db.users['x' + i] = { id: 'x' + i, name: 'X' + i, friends: [], state: {} };
  for (let i = 0; i < REQ_PER_DAY; i++) assert.equal((await soc('ann', 'POST /api/friends/request', { pid: pid('x' + i) })).status, 201);
  assert.match((await soc('ann', 'POST /api/friends/request', { pid: pid('bob') })).data.error, /завтра|ждут ответа/);
});

test('Счётчик запросов в уведомлениях и кнопка в переписке', async () => {
  const { db, soc, msg, pid } = world();
  db.classes.k = { id: 'k', owner: 'dan', students: ['ann', 'cat'] };
  await soc('cat', 'POST /api/friends/request', { pid: pid('ann') });
  assert.deepEqual((await msg('ann', 'GET /api/messages/unread')).data, { n: 0, reqs: 1 });
  const code = (await soc('cat', 'GET /api/social')).data.code;
  const t = (await msg('ann', 'GET /api/messages/thread', {}, '?with=' + code)).data;
  assert.equal(t.with.kind, 'class'); assert.equal(t.with.req, 'in'); assert.equal(t.with.pid, pid('cat'));
});

test('«Все ученики»: pid и состояние дружбы только в чужих строках', () => {
  const { db, social, pid } = world();
  pid('bob');
  const r = studentsList(db.users, 'ann', () => 0, Date.now(), u => ({ pid: social.pidOf(u), rel: social.relOf(db.users.ann, u) }));
  const me = r.students.find(s => s.me), bob = r.students.find(s => s.name === 'BOB');
  assert.equal(me.pid, undefined);
  assert.equal(bob.pid, db.users.bob.pid); assert.equal(bob.rel, null);
  assert.equal(studentsList(db.users, null, () => 0).students[0].pid, undefined);
});
