import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createSocial } from '../social.js';
import { createMessages, cleanText, rateCheck, relation, denyReason, convId, preview, PER_MINUTE, MAX_LEN, AUTO_MUTE_REPORTS } from '../messages.js';
import { GIFTS, BADGE_TITLES } from '../public/js/kudos.js';

function world() {
  const db = { users: {}, sessions: {}, classes: {} };
  const add = (id, extra = {}) => (db.users[id] = { id, name: id.toUpperCase(), email: id + '@x.ru', code: 'C' + id.toUpperCase(), friends: [], state: { badges: {} }, ...extra });
  ['ann', 'bob', 'cat', 'dan', 'eve', 'fox'].forEach(id => add(id));
  db.users.ann.friends = ['bob']; db.users.bob.friends = ['ann'];
  db.classes.k1 = { id: 'k1', owner: 'eve', students: ['ann', 'cat'], contests: [] };
  db.users.admin = { id: 'admin', name: 'Модер', email: 'mod@x.ru', friends: [], code: 'CMOD' };
  let out, body = {};
  const send = (res, status, data) => (out = { status, data });
  const social = createSocial({ getDb: () => db, persist() {}, send, readJson: async () => body, weekXp: () => 0 });
  const m = createMessages({ getDb: () => db, persist() {}, send, readJson: async () => body, codeOf: social.codeOf, byCode: social.byCode, admins: ['mod@x.ru'] });
  const call = async (who, route, b = {}, q = '') => { body = b; out = null; await m.handle(route, {}, {}, { user: db.users[who] }, new URL('http://x' + route.split(' ')[1] + q)); return out; };
  const soc = async (who, route, b = {}) => { body = b; out = null; await social.handle(route, {}, {}, { user: db.users[who] }); return out; };
  return { db, call, soc };
}

test('Сообщения: текст чистится и обрезается', () => {
  assert.equal(cleanText('  привет\r\n\n\n\nкак дела‮ '), 'привет\n\nкак дела');
  assert.equal(cleanText(42), '');
  assert.equal(cleanText('я'.repeat(MAX_LEN + 50)).length, MAX_LEN);
});

test('Сообщения: лимит в минуту и в день', () => {
  const now = 1e12;
  assert.equal(rateCheck(Array(PER_MINUTE - 1).fill(now - 1000), now), null);
  assert.match(rateCheck(Array(PER_MINUTE).fill(now - 1000), now), /подождите/);
  assert.equal(rateCheck(Array(PER_MINUTE).fill(now - 120000), now), null);
  assert.match(rateCheck(Array(300).fill(now - 3600000), now), /завтра/);
});

test('Сообщения: писать можно только друзьям и людям из общего класса', () => {
  const { db } = world(), u = db.users;
  assert.equal(relation(db, u.ann, u.bob), 'friend');
  assert.equal(relation(db, u.ann, u.cat), 'class');
  assert.equal(relation(db, u.cat, u.eve), 'class'); // учитель
  assert.equal(relation(db, u.ann, u.dan), null);
  assert.equal(denyReason(db, u.ann, u.dan), 'Писать можно только друзьям и одноклассникам');
  assert.equal(denyReason(db, u.ann, u.cat), null);
  u.cat.dmFrom = 'friends';
  assert.match(denyReason(db, u.ann, u.cat), /только от друзей/);
  u.bob.dmFrom = 'nobody';
  assert.match(denyReason(db, u.ann, u.bob), /не принимает/);
});

test('Сообщения: переписка, непрочитанные и отметка прочитанного', async () => {
  const { db, call } = world();
  assert.equal((await call('ann', 'POST /api/messages/send', { to: 'CDAN', text: 'привет' })).status, 403);
  assert.equal((await call('ann', 'POST /api/messages/send', { to: 'CBOB', text: '   ' })).status, 400);
  const r = await call('ann', 'POST /api/messages/send', { to: 'cbob', text: 'Merhaba!' });
  assert.equal(r.status, 201); assert.equal(r.data.msg.mine, true);
  assert.equal((await call('bob', 'GET /api/messages/unread')).data.n, 1);
  const list = await call('bob', 'GET /api/messages');
  assert.equal(list.data.convs[0].with.name, 'ANN'); assert.equal(list.data.convs[0].unread, 1);
  assert.ok(!JSON.stringify(list.data).includes('@x.ru'), 'e-mail наружу не уходит');
  const th = await call('bob', 'GET /api/messages/thread', {}, '?with=CANN');
  assert.equal(th.data.msgs[0].text, 'Merhaba!'); assert.equal(th.data.msgs[0].mine, false); assert.equal(th.data.canSend, true);
  assert.equal((await call('bob', 'GET /api/messages/unread')).data.n, 0);
  assert.ok(db.dms[convId('ann', 'bob')]);
  // посторонний не может открыть переписку с незнакомцем
  assert.equal((await call('dan', 'GET /api/messages/thread', {}, '?with=CANN')).status, 403);
});

test('Сообщения: лимит частоты на сервере', async () => {
  const { call } = world();
  for (let i = 0; i < PER_MINUTE; i++) assert.equal((await call('ann', 'POST /api/messages/send', { to: 'CBOB', text: 'x' + i })).status, 201);
  assert.equal((await call('ann', 'POST /api/messages/send', { to: 'CBOB', text: 'ещё' })).status, 429);
});

test('Сообщения: блокировка снимает дружбу и запрещает писать и добавляться', async () => {
  const { db, call, soc } = world();
  await call('ann', 'POST /api/messages/send', { to: 'CBOB', text: 'hi' });
  assert.equal((await call('bob', 'POST /api/messages/block', { code: 'CANN' })).data.blocked, true);
  assert.deepEqual(db.users.ann.friends, []); assert.deepEqual(db.users.bob.friends, []);
  assert.equal((await call('ann', 'POST /api/messages/send', { to: 'CBOB', text: 'hi' })).status, 403);
  assert.equal((await soc('ann', 'POST /api/friends', { code: 'CBOB' })).status, 403);
  assert.equal((await soc('bob', 'POST /api/friends', { code: 'CANN' })).status, 400);
  // у заблокировавшего непрочитанные от заблокированного не считаются
  assert.equal((await call('bob', 'GET /api/messages/unread')).data.n, 0);
  await call('bob', 'POST /api/messages/block', { code: 'CANN', block: false });
  assert.equal((await soc('ann', 'POST /api/friends', { code: 'CBOB' })).status, 201);
});

test('Сообщения: жалоба блокирует, сохраняет переписку, после трёх жалоб отправка отключается', async () => {
  const { db, call } = world();
  // fox — в классе с ann, cat и bob
  db.classes.k2 = { id: 'k2', owner: 'eve', students: ['fox', 'ann', 'cat', 'bob'], contests: [] };
  await call('fox', 'POST /api/messages/send', { to: 'CANN', text: 'гадость' });
  assert.equal((await call('ann', 'POST /api/messages/report', { code: 'CFOX', reason: 'обижает' })).status, 201);
  assert.ok(db.users.ann.blocked.includes('fox'));
  assert.equal(db.reports[0].msgs[0].text, 'гадость');
  assert.equal((await call('ann', 'POST /api/messages/report', { code: 'CFOX' })).status, 409);
  assert.equal((await call('ann', 'GET /api/reports')).status, 403);
  for (const who of ['cat', 'bob'].slice(0, AUTO_MUTE_REPORTS - 1)) await call(who, 'POST /api/messages/report', { code: 'CFOX' });
  assert.equal(db.users.fox.dmMuted, true);
  assert.match((await call('fox', 'POST /api/messages/send', { to: 'CCAT', text: 'x' })).data.error, /отключена/);
  const rep = await call('admin', 'GET /api/reports');
  assert.equal(rep.data.reports.length, 3); assert.equal(rep.data.reports[0].againstName, 'FOX');
  await call('admin', 'POST /api/reports/resolve', { id: rep.data.reports[0].id, action: 'unmute' });
  assert.equal(db.users.fox.dmMuted, undefined);
  assert.ok(db.reports.every(r => r.status !== 'open'));
});

test('Сообщения: настройка «кто может писать»', async () => {
  const { db, call } = world();
  assert.equal((await call('bob', 'POST /api/messages/settings', { dmFrom: 'всем' })).status, 400);
  await call('cat', 'POST /api/messages/settings', { dmFrom: 'friends' });
  assert.equal(db.users.cat.dmFrom, 'friends');
  assert.equal((await call('ann', 'POST /api/messages/send', { to: 'CCAT', text: 'hi' })).status, 403);
});

test('Подарки и поздравления', async () => {
  const { db, call } = world();
  assert.equal((await call('ann', 'POST /api/messages/send', { to: 'CBOB', gift: 'bomb' })).status, 400);
  const g = await call('ann', 'POST /api/messages/send', { to: 'CBOB', gift: 'cake' });
  assert.equal(g.status, 201); assert.equal(g.data.msg.gift, 'cake'); assert.equal(g.data.msg.text, '');
  assert.deepEqual((await call('bob', 'GET /api/messages')).data.gifts, { cake: 1 });
  assert.match((await call('bob', 'GET /api/messages')).data.convs[0].last.text, /Подарок: Торт/);
  // поздравить можно только с достижением, которое есть, и только один раз
  assert.equal((await call('ann', 'POST /api/messages/send', { to: 'CBOB', badge: 'streak-7' })).status, 400);
  db.users.bob.state.badges['streak-7'] = Date.now() - 3600000;
  db.users.bob.state.badges.reader = Date.now() - 30 * 86400000; // давно — не в новостях
  const news = (await call('ann', 'GET /api/messages')).data.news;
  assert.deepEqual(news.map(n => [n.name, n.badge, n.done]), [['BOB', 'streak-7', false]]);
  assert.equal((await call('ann', 'POST /api/messages/send', { to: 'CBOB', badge: 'streak-7', gift: 'medal', text: 'Молодец!' })).status, 201);
  assert.equal((await call('ann', 'POST /api/messages/send', { to: 'CBOB', badge: 'streak-7' })).status, 409);
  assert.equal((await call('ann', 'GET /api/messages')).data.news[0].done, true);
  const th = await call('ann', 'GET /api/messages/thread', {}, '?with=CBOB');
  assert.deepEqual(th.data.congratulated, ['streak-7']);
  assert.match(preview({ badge: 'streak-7', text: 'ура' }), /Неделя без пропусков.*ура/);
});

test('Подарки: у каждого есть id, название и картинка; названия достижений совпадают с game.js', () => {
  assert.equal(new Set(GIFTS.map(g => g.id)).size, GIFTS.length);
  for (const g of GIFTS) { assert.ok(g.title); assert.match(g.svg, /^<svg viewBox="0 0 64 64"/); assert.ok(!/script|on\w+=|href/i.test(g.svg)); }
  const game = fs.readFileSync(new URL('../public/js/game.js', import.meta.url), 'utf8');
  const badges = [...game.matchAll(/\{ id: '([^']+)', title: '([^']+)'/g)].map(m => [m[1], m[2]]);
  assert.ok(badges.length >= 12);
  assert.deepEqual(Object.fromEntries(badges), BADGE_TITLES);
});
