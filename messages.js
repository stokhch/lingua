// Личные сообщения между учениками (серверная часть). Подключается в server.js: messages.handle(route, req, res, session, url).
// Правила безопасности (среди учеников могут быть дети и подростки):
//  • писать можно только с аккаунтом и только своим: друзьям (дружба взаимная) и людям из общего класса (одноклассники и учитель);
//    незнакомому человеку из «Всех учеников» написать нельзя;
//  • каждый сам решает, кто может ему писать: «друзья и класс» (по умолчанию), «только друзья» или «никто»;
//  • блокировка: заблокированный не может писать и добавить в друзья, дружба при блокировке снимается;
//  • жалоба сохраняет последние сообщения переписки для модератора (e-mail из LINGVA_ADMINS);
//    после жалоб от трёх разных людей отправка сообщений у автора отключается до проверки;
//  • лимиты: 15 сообщений в минуту, 300 в день, 20 новых собеседников в день, до 1000 символов в сообщении.
//
//   GET  /api/messages                     -> { convs, contacts, news, gifts, blocked, dmFrom, muted, admin }
//                                             news — свежие (14 дней) достижения друзей и одноклассников, gifts — полученные подарки
//   GET  /api/messages/unread              -> { n, reqs } — непрочитанные и входящие запросы в друзья
//   GET  /api/messages/thread?with=КОД     -> { with, msgs, canSend, reason, blocked } (отмечает прочитанным)
//   POST /api/messages/send     { to, text, gift?, badge? }  -> gift — id встроенной картинки-подарка (kudos.js),
//                                badge — поздравление с достижением, которое у получателя действительно есть (один раз за достижение)
//   POST /api/messages/block    { code, block }
//   POST /api/messages/report   { code, reason }
//   POST /api/messages/settings { dmFrom: 'contacts' | 'friends' | 'nobody' }
//   GET  /api/reports                       -> жалобы (только модераторам)
//   POST /api/reports/resolve   { id, action: 'dismiss' | 'mute' | 'unmute' }
import crypto from 'node:crypto';
import { GIFTS, BADGE_TITLES } from './public/js/kudos.js';
import { dropRequests } from './social.js';

export const MAX_LEN = 1000;
export const KEEP = 300;            // сообщений в одной переписке (старые удаляются)
export const PER_MINUTE = 15, PER_DAY = 300, NEW_PER_DAY = 20;
export const AUTO_MUTE_REPORTS = 3;
export const DM_FROM = ['contacts', 'friends', 'nobody'];
const MINUTE = 60_000, DAY = 86_400_000, NEWS_DAYS = 14;
const GIFT_IDS = new Set(GIFTS.map(g => g.id));

// Короткая подпись сообщения для списка переписок
export function preview(m) {
  const gift = m.gift && GIFTS.find(g => g.id === m.gift);
  const head = m.badge ? `🏆 Поздравление: «${BADGE_TITLES[m.badge] || 'достижение'}»` : gift ? `🎁 Подарок: ${gift.title}` : '';
  return [head, m.text].filter(Boolean).join(' · ').slice(0, 120);
}

export const convId = (a, b) => (a < b ? `${a}:${b}` : `${b}:${a}`);

// Текст сообщения: строка, без управляющих символов, не пустая, не длиннее MAX_LEN
export function cleanText(t) {
  if (typeof t !== 'string') return '';
  return t.replace(/\r\n?/g, '\n').replace(/[\u0000-\u0009\u000B-\u001F\u007F​-‏‪-‮⁦-⁩]/g, '')
    .replace(/\n{3,}/g, '\n\n').trim().slice(0, MAX_LEN);
}

// Лимиты по времени отправки сообщений одного ученика (список меток времени)
export function rateCheck(times, now = Date.now()) {
  const day = times.filter(t => now - t < DAY);
  if (day.filter(t => now - t < MINUTE).length >= PER_MINUTE) return 'Слишком быстро — подождите минуту';
  if (day.length >= PER_DAY) return 'На сегодня сообщений достаточно — продолжите завтра';
  return null;
}

// Связь двух учеников: 'friend', 'class' или null
export function relation(db, a, b) {
  if ((a.friends || []).includes(b.id) && (b.friends || []).includes(a.id)) return 'friend';
  const inClass = (k, id) => k.owner === id || (k.students || []).includes(id);
  return Object.values(db.classes || {}).some(k => inClass(k, a.id) && inClass(k, b.id)) ? 'class' : null;
}

// Может ли from написать to. Возвращает null или причину отказа.
export function denyReason(db, from, to) {
  if (!to || to.id === from.id) return 'Собеседник не найден';
  if (from.dmMuted) return 'Отправка сообщений у вас временно отключена после жалоб. Её вернёт модератор';
  if ((from.blocked || []).includes(to.id)) return 'Вы заблокировали этого ученика';
  if ((to.blocked || []).includes(from.id)) return 'Этот ученик ограничил сообщения';
  const rel = relation(db, from, to);
  if (!rel) return 'Писать можно только друзьям и одноклассникам';
  const pref = to.dmFrom || 'contacts';
  if (pref === 'nobody') return 'Этот ученик не принимает сообщения';
  if (pref === 'friends' && rel !== 'friend') return 'Этот ученик принимает сообщения только от друзей';
  return null;
}

export function createMessages({ getDb, persist, send, readJson, codeOf, byCode, admins = [], friendReqs = () => 0, relOf = () => null, pidOf = null }) {
  const db = () => { const d = getDb(); d.dms ||= {}; d.reports ||= []; return d; };
  const users = () => db().users;
  const isAdmin = u => admins.includes(String(u.email || '').toLowerCase());
  const sent = new Map(); // id ученика -> метки времени отправки (в памяти)
  const fresh = new Map(); // id ученика -> метки времени начала новых переписок

  const person = u => ({ code: codeOf(u), name: u.name });
  const unreadIn = (c, me) => c.msgs.filter(m => m.from !== me.id && m.at > (c.read?.[me.id] || 0)).length;
  const otherOf = (c, me) => users()[c.a === me.id ? c.b : c.a];

  function contacts(me) {
    const ids = new Set(me.friends || []);
    for (const k of Object.values(db().classes || {})) {
      const members = [k.owner, ...(k.students || [])];
      if (members.includes(me.id)) members.forEach(id => ids.add(id));
    }
    ids.delete(me.id);
    return [...ids].map(id => users()[id]).filter(u => u && !(me.blocked || []).includes(u.id))
      .map(u => ({ ...person(u), kind: relation(db(), me, u), can: !denyReason(db(), me, u) }))
      .filter(c => c.kind)
      .sort((a, b) => (a.kind === 'friend' ? 0 : 1) - (b.kind === 'friend' ? 0 : 1) || a.name.localeCompare(b.name, 'ru'));
  }

  const view = (m, me) => ({ id: m.id, text: m.text, at: m.at, mine: m.from === me.id, ...(m.gift && { gift: m.gift }), ...(m.badge && { badge: m.badge }) });

  // Свежие достижения тех, кому можно написать, и отметка, поздравили ли уже
  function news(me, now = Date.now()) {
    const out = [];
    for (const ct of contacts(me)) {
      if (!ct.can) continue;
      const u = byCode(ct.code);
      const c = db().dms[convId(me.id, u.id)];
      const done = new Set((c?.msgs || []).filter(m => m.from === me.id && m.badge).map(m => m.badge));
      for (const [id, at] of Object.entries(u.state?.badges || {})) {
        if (BADGE_TITLES[id] && typeof at === 'number' && now - at < NEWS_DAYS * DAY) out.push({ ...person(u), badge: id, title: BADGE_TITLES[id], at, done: done.has(id) });
      }
    }
    return out.sort((a, b) => a.done - b.done || b.at - a.at).slice(0, 30);
  }

  // Полученные подарки: { id картинки: сколько }
  function giftsOf(me) {
    const n = {};
    for (const c of Object.values(db().dms)) {
      if (c.a !== me.id && c.b !== me.id) continue;
      for (const m of c.msgs) if (m.gift && m.from !== me.id) n[m.gift] = (n[m.gift] || 0) + 1;
    }
    return n;
  }

  function totalUnread(me) {
    let n = 0;
    for (const c of Object.values(db().dms)) {
      if (c.a !== me.id && c.b !== me.id) continue;
      const o = otherOf(c, me);
      if (o && !(me.blocked || []).includes(o.id)) n += unreadIn(c, me);
    }
    return n;
  }

  async function handle(route, req, res, session, url) {
    if (!route.includes(' /api/messages') && !route.includes(' /api/reports')) return false;
    const me = session.user;

    if (route === 'GET /api/messages/unread') return send(res, 200, { n: totalUnread(me), reqs: friendReqs(me) });

    if (route === 'GET /api/messages') {
      const convs = Object.values(db().dms).filter(c => (c.a === me.id || c.b === me.id) && c.msgs.length)
        .map(c => ({ c, o: otherOf(c, me) })).filter(x => x.o)
        .sort((x, y) => y.c.last - x.c.last).slice(0, 100)
        .map(({ c, o }) => {
          const m = c.msgs[c.msgs.length - 1];
          return { with: person(o), last: { text: preview(m), at: m.at, mine: m.from === me.id },
            unread: unreadIn(c, me), blocked: (me.blocked || []).includes(o.id) };
        });
      return send(res, 200, {
        convs, contacts: contacts(me), news: news(me), gifts: giftsOf(me), dmFrom: me.dmFrom || 'contacts', muted: !!me.dmMuted, admin: isAdmin(me),
        blocked: (me.blocked || []).map(id => users()[id]).filter(Boolean).map(person)
      });
    }

    if (route === 'GET /api/messages/thread') {
      const o = byCode(url.searchParams.get('with'));
      if (!o || o.id === me.id) return send(res, 404, { error: 'Собеседник не найден' });
      const c = db().dms[convId(me.id, o.id)];
      const reason = denyReason(db(), me, o);
      if (!c && reason) return send(res, 403, { error: reason });
      if (c?.msgs.length && unreadIn(c, me)) { (c.read ||= {})[me.id] = Date.now(); persist(); }
      return send(res, 200, {
        with: { ...person(o), kind: relation(db(), me, o), req: relOf(me, o), ...(pidOf && { pid: pidOf(o) }) },
        msgs: (c?.msgs || []).map(m => view(m, me)),
        badges: Object.keys(o.state?.badges || {}).filter(id => BADGE_TITLES[id]),
        congratulated: [...new Set((c?.msgs || []).filter(m => m.badge && m.from === me.id).map(m => m.badge))],
        canSend: !reason, reason, blocked: (me.blocked || []).includes(o.id)
      });
    }

    if (route === 'GET /api/reports') {
      if (!isAdmin(me)) return send(res, 403, { error: 'Только для модераторов' });
      const name = id => users()[id]?.name || 'Удалённый пользователь';
      return send(res, 200, { reports: [...db().reports].sort((a, b) => (a.status === 'open' ? 0 : 1) - (b.status === 'open' ? 0 : 1) || b.at - a.at).slice(0, 200)
        .map(r => ({ ...r, byName: name(r.by), againstName: name(r.against), againstMuted: !!users()[r.against]?.dmMuted,
          msgs: r.msgs.map(m => ({ ...m, fromName: name(m.from) })) })) });
    }

    const body = await readJson(req);

    if (route === 'POST /api/messages/send') {
      const o = byCode(body.to);
      const reason = denyReason(db(), me, o);
      if (reason) return send(res, 403, { error: reason });
      const text = cleanText(body.text);
      const gift = body.gift == null || body.gift === '' ? null : String(body.gift);
      const badge = body.badge == null || body.badge === '' ? null : String(body.badge);
      if (gift && !GIFT_IDS.has(gift)) return send(res, 400, { error: 'Такого подарка нет' });
      if (badge && !(BADGE_TITLES[badge] && o.state?.badges?.[badge])) return send(res, 400, { error: 'У ученика нет такого достижения' });
      if (!text && !gift && !badge) return send(res, 400, { error: 'Пустое сообщение' });
      const now = Date.now();
      const times = (sent.get(me.id) || []).filter(t => now - t < DAY);
      const limit = rateCheck(times, now);
      if (limit) return send(res, 429, { error: limit });
      const id = convId(me.id, o.id);
      let c = db().dms[id];
      if (!c || !c.msgs.length) {
        const starts = (fresh.get(me.id) || []).filter(t => now - t < DAY);
        if (starts.length >= NEW_PER_DAY) return send(res, 429, { error: 'Сегодня вы начали много новых переписок — продолжите завтра' });
        fresh.set(me.id, [...starts, now]);
      }
      if (badge && c?.msgs.some(m => m.from === me.id && m.badge === badge)) return send(res, 409, { error: 'Вы уже поздравили с этим достижением' });
      c ||= db().dms[id] = { id, a: me.id < o.id ? me.id : o.id, b: me.id < o.id ? o.id : me.id, created: now, last: now, msgs: [], read: {} };
      const m = { id: crypto.randomBytes(6).toString('base64url'), from: me.id, text, at: now };
      if (gift) m.gift = gift;
      if (badge) m.badge = badge;
      c.msgs.push(m); c.last = now; (c.read ||= {})[me.id] = now;
      if (c.msgs.length > KEEP) c.msgs.splice(0, c.msgs.length - KEEP);
      times.push(now); sent.set(me.id, times);
      if (sent.size > 20000) sent.clear();
      persist();
      return send(res, 201, { msg: view(m, me) });
    }

    if (route === 'POST /api/messages/block') {
      const o = byCode(body.code);
      if (!o || o.id === me.id) return send(res, 404, { error: 'Не найден' });
      me.blocked = (me.blocked || []).filter(id => id !== o.id);
      if (body.block !== false) {
        me.blocked.push(o.id);
        // блокировка снимает дружбу, иначе заблокированный оставался бы в друзьях и мог вызывать на дуэли
        me.friends = (me.friends || []).filter(id => id !== o.id);
        o.friends = (o.friends || []).filter(id => id !== me.id);
        dropRequests(db(), me.id, o.id);
      }
      persist();
      return send(res, 200, { blocked: body.block !== false });
    }

    if (route === 'POST /api/messages/report') {
      const o = byCode(body.code);
      if (!o || o.id === me.id) return send(res, 404, { error: 'Не найден' });
      const reason = String(body.reason || '').trim().slice(0, 500);
      const c = db().dms[convId(me.id, o.id)];
      if (db().reports.some(r => r.by === me.id && r.against === o.id && r.status === 'open')) return send(res, 409, { error: 'Вы уже пожаловались — модератор посмотрит' });
      db().reports.push({ id: crypto.randomBytes(6).toString('base64url'), by: me.id, against: o.id, reason, at: Date.now(), status: 'open',
        msgs: (c?.msgs || []).slice(-30).map(m => ({ from: m.from, text: m.text, at: m.at, ...(m.gift && { gift: m.gift }), ...(m.badge && { badge: m.badge }) })) });
      if (db().reports.length > 2000) db().reports = db().reports.filter(r => r.status === 'open').slice(-2000);
      const by = new Set(db().reports.filter(r => r.against === o.id && r.status === 'open').map(r => r.by));
      if (by.size >= AUTO_MUTE_REPORTS) o.dmMuted = true;
      // жалоба сразу и блокирует: человеку не нужно делать два шага
      if (body.block !== false && !(me.blocked || []).includes(o.id)) {
        (me.blocked ||= []).push(o.id);
        me.friends = (me.friends || []).filter(id => id !== o.id);
        o.friends = (o.friends || []).filter(id => id !== me.id);
        dropRequests(db(), me.id, o.id);
      }
      persist();
      return send(res, 201, { ok: true });
    }

    if (route === 'POST /api/messages/settings') {
      if (!DM_FROM.includes(body.dmFrom)) return send(res, 400, { error: 'Неизвестная настройка' });
      me.dmFrom = body.dmFrom; persist();
      return send(res, 200, { dmFrom: me.dmFrom });
    }

    if (route === 'POST /api/reports/resolve') {
      if (!isAdmin(me)) return send(res, 403, { error: 'Только для модераторов' });
      const r = db().reports.find(x => x.id === body.id);
      if (!r) return send(res, 404, { error: 'Жалоба не найдена' });
      const o = users()[r.against];
      if (body.action === 'mute' && o) o.dmMuted = true;
      if (body.action === 'unmute' && o) delete o.dmMuted;
      if (!['dismiss', 'mute', 'unmute'].includes(body.action)) return send(res, 400, { error: 'Неизвестное действие' });
      // закрываем все открытые жалобы на этого человека: решение принято
      for (const x of db().reports) if (x.against === r.against && x.status === 'open') { x.status = body.action === 'dismiss' ? 'dismissed' : 'resolved'; x.closed = Date.now(); }
      if (body.action === 'unmute' || body.action === 'dismiss') r.status = 'dismissed';
      persist();
      return send(res, 200, { ok: true });
    }

    return send(res, 404, { error: 'Not found' });
  }

  return { handle, totalUnread };
}
