// Личные сообщения: переписки с друзьями и одноклассниками, поздравления с достижениями и подарки-картинки.
//   #messages        — список переписок, кому можно написать, свежие достижения, полученные подарки, настройки
//   #messages-КОД    — переписка с учеником (КОД — его код для друзей)
//   #reports         — жалобы (только модераторам из LINGVA_ADMINS)
// Правила безопасности — в messages.js на сервере.
import { store } from '../store.js';
import { esc, $, $$, icon, toast, modal, plural } from '../ui.js';
import { GIFTS, giftById, BADGE_TITLES, CHEERS } from '../kudos.js';

const POLL_MS = 6000;
const DM_FROM = [['contacts', 'Друзья и одноклассники'], ['friends', 'Только друзья'], ['nobody', 'Никто']];
const SAFETY = 'Не сообщайте в переписке адрес, телефон, школу и пароль, не отправляйте фото и не договаривайтесь о встрече. Если пишут что-то неприятное — заблокируйте и пожалуйтесь, а детям стоит рассказать взрослым.';
const KIND = { friend: 'друг', class: 'из класса' };

const time = at => {
  const d = new Date(at), now = new Date();
  const hm = d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  if (d.toDateString() === now.toDateString()) return hm;
  const y = new Date(now); y.setDate(now.getDate() - 1);
  if (d.toDateString() === y.toDateString()) return `вчера, ${hm}`;
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }) + ', ' + hm;
};
const giftImg = (id, cls = '') => { const g = giftById(id); return g ? `<span class="gift-pic ${cls}" title="${esc(g.title)}">${g.svg}</span>` : ''; };
const head = (title, back = '') => `${back}<h1>${title}</h1>`;

function needAccount(main) {
  main.innerHTML = `<section class="band narrow">${head('Сообщения')}<div class="empty"><p>Переписка работает только с аккаунтом: писать можно друзьям и одноклассникам.</p>${store.serverAvailable ? '<a class="btn" href="#profile">Войти или создать аккаунт</a>' : ''}</div></section>`;
}

// ---------- Счётчик непрочитанных в шапке ----------
let unreadTimer = null, unreadTick = null, listening = false;
export function watchUnread() {
  const tick = async () => {
    const el = $('#hud-msg');
    if (!el) return;
    el.hidden = store.mode !== 'server';
    if (store.mode !== 'server' || document.hidden) return;
    try {
      const { n } = await store.api('GET', 'api/messages/unread');
      const b = $('b', el); b.textContent = n > 99 ? '99+' : n; b.hidden = !n;
      el.title = n ? `Сообщения: ${n} ${plural(n, 'непрочитанное', 'непрочитанных', 'непрочитанных')}` : 'Сообщения';
    } catch {}
  };
  clearInterval(unreadTimer);
  unreadTimer = setInterval(tick, 45000);
  unreadTick = tick;
  if (!listening) { listening = true; for (const [t, ev] of [[document, 'visibilitychange'], [window, 'lingva:unread'], [window, 'hashchange']]) t.addEventListener(ev, () => unreadTick?.()); }
  tick();
}
const refreshUnread = () => window.dispatchEvent(new Event('lingva:unread'));

// ---------- Окно поздравления и подарка ----------
// badge — id достижения (поздравление) или null (просто подарок)
export function kudosModal({ code, name, badge = null, onSent }) {
  let gift = badge ? null : GIFTS[0].id;
  modal(`<h2>${badge ? 'Поздравление' : 'Подарок'}</h2><p class="muted">Кому: <b>${esc(name)}</b></p>
    ${badge ? `<p class="kudos-badge">${icon('trophy')} Достижение «${esc(BADGE_TITLES[badge] || badge)}»</p>` : ''}
    <p class="muted small">${badge ? 'Можно приложить картинку-подарок:' : 'Выберите картинку:'}</p>
    <div class="gift-grid" role="radiogroup" aria-label="Подарок">
      ${badge ? `<button type="button" class="gift-opt none on" data-g="" role="radio" aria-checked="true"><span>Без подарка</span></button>` : ''}
      ${GIFTS.map((g, i) => `<button type="button" class="gift-opt ${!badge && i === 0 ? 'on' : ''}" data-g="${g.id}" role="radio" aria-checked="${!badge && i === 0}" title="${esc(g.title)}">${g.svg}<span>${esc(g.title)}</span></button>`).join('')}
    </div>
    <div class="cheers">${CHEERS.map(c => `<button type="button" class="chip" data-c="${esc(c)}">${esc(c)}</button>`).join('')}</div>
    <textarea id="k-text" rows="2" maxlength="1000" placeholder="Пара слов от себя (необязательно)">${badge ? esc(CHEERS[0]) : ''}</textarea>
    <div class="row gap"><button class="btn" id="k-send">${icon(badge ? 'trophy' : 'gift')} Отправить</button><button class="btn ghost" data-close>Отмена</button></div>`,
  (el, close) => {
    $$('.gift-opt', el).forEach(b => b.onclick = () => {
      gift = b.dataset.g || null;
      $$('.gift-opt', el).forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-checked', x === b); });
    });
    $$('[data-c]', el).forEach(b => b.onclick = () => { $('#k-text', el).value = b.dataset.c; });
    $('#k-send', el).onclick = async () => {
      const btn = $('#k-send', el); btn.disabled = true;
      try {
        const r = await store.api('POST', 'api/messages/send', { to: code, text: $('#k-text', el).value, gift, badge });
        close(); toast(badge ? 'Поздравление отправлено' : 'Подарок отправлен'); onSent?.(r.msg);
      } catch (e) { btn.disabled = false; toast(e.message); }
    };
  });
}

// ---------- Список переписок ----------
export function renderMessages(main, code) {
  if (store.mode !== 'server') return needAccount(main);
  if (code) return renderThread(main, code);
  main.innerHTML = `<section class="band narrow">${head('Сообщения')}<p class="muted">Загрузка…</p></section>`;
  let alive = true;
  const load = async () => {
    try { const d = await store.api('GET', 'api/messages'); if (alive) draw(d); }
    catch (e) { if (alive) { main.innerHTML = `<section class="band narrow">${head('Сообщения')}<div class="empty"><p>${esc(e.message)}</p><button class="btn" id="retry">Повторить</button></div></section>`; $('#retry').onclick = load; } }
  };
  const draw = d => {
    const talked = new Set(d.convs.map(c => c.with.code));
    const fresh = d.contacts.filter(c => !talked.has(c.code));
    const news = d.news.filter(n => !n.done);
    const gifts = Object.entries(d.gifts || {}).filter(([id]) => giftById(id));
    main.innerHTML = `
    <section class="band narrow">
      <div class="toolbar"><h1>Сообщения</h1><span class="row gap"><a class="btn ghost small" href="#friends">${icon('heart')} Друзья</a>${d.admin ? `<a class="btn ghost small" href="#reports">Жалобы</a>` : ''}</span></div>
      <p class="lead">Пишите друзьям и одноклассникам, поздравляйте с достижениями и дарите картинки.</p>
      ${d.muted ? `<p class="note bad">Отправка сообщений у вас временно отключена после жалоб других учеников. Читать переписки можно, а отправку вернёт модератор.</p>` : ''}
      ${news.length ? `<h2 class="sets-h">${icon('trophy')} Поздравьте</h2><ul class="kudos-news">${news.map(n => `<li><div><b>${esc(n.name)}</b><span>получил(а) достижение «${esc(n.title)}» · ${time(n.at)}</span></div><button class="btn small" data-cong="${esc(n.code)}" data-badge="${esc(n.badge)}" data-name="${esc(n.name)}">Поздравить</button></li>`).join('')}</ul>` : ''}
      <h2 class="sets-h">Переписки</h2>
      ${d.convs.length ? `<ul class="convs">${d.convs.map(c => `<li><a href="#messages-${esc(c.with.code)}" class="${c.unread ? 'unread' : ''}${c.blocked ? ' blocked' : ''}">
          <span class="ava">${esc(c.with.name.slice(0, 1).toUpperCase())}</span>
          <div><b>${esc(c.with.name)}${c.blocked ? ' · заблокирован(а)' : ''}</b><span>${c.last.mine ? 'Вы: ' : ''}${esc(c.last.text)}</span></div>
          <span class="when">${time(c.last.at)}${c.unread ? `<i class="dot">${c.unread}</i>` : ''}</span></a></li>`).join('')}</ul>`
        : `<div class="empty"><p>${d.contacts.length ? 'Переписок пока нет — напишите кому-нибудь из списка ниже.' : 'Писать можно друзьям и одноклассникам. Добавьте друга на странице «Друзья» или вступите в класс.'}</p>${d.contacts.length ? '' : '<a class="btn" href="#friends">К друзьям</a>'}</div>`}
      ${fresh.length ? `<h2 class="sets-h">Написать</h2><ul class="contacts">${fresh.map(c => `<li><span class="ava">${esc(c.name.slice(0, 1).toUpperCase())}</span><div><b>${esc(c.name)}</b><span>${KIND[c.kind] || ''}${c.can ? '' : ' · не принимает сообщения'}</span></div>
          ${c.can ? `<span class="row gap"><button class="icon-btn" data-gift="${esc(c.code)}" data-name="${esc(c.name)}" title="Подарить картинку" aria-label="Подарить картинку ${esc(c.name)}">${icon('gift')}</button><a class="btn small" href="#messages-${esc(c.code)}">Написать</a></span>` : ''}</li>`).join('')}</ul>` : ''}
    </section>
    <section class="band narrow">
      <h2>Мои подарки</h2>
      ${gifts.length ? `<div class="gift-shelf">${gifts.map(([id, n]) => `<div>${giftImg(id)}<span>${esc(giftById(id).title)}${n > 1 ? ` ×${n}` : ''}</span></div>`).join('')}</div>` : '<p class="muted">Пока подарков нет. Подарите что-нибудь другу — вдруг ответит тем же.</p>'}
    </section>
    <section class="band narrow">
      <h2>Безопасность</h2>
      <p class="muted">${SAFETY}</p>
      <label class="field">Кто может мне писать
        <select id="dm-from">${DM_FROM.map(([v, t]) => `<option value="${v}" ${d.dmFrom === v ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
      <p class="muted small">Незнакомые ученики из общего списка написать вам не могут. Друзья и одноклассники — только если вы это разрешили.</p>
      ${d.blocked.length ? `<h3>Заблокированы</h3><ul class="contacts">${d.blocked.map(b => `<li><span class="ava">${esc(b.name.slice(0, 1).toUpperCase())}</span><div><b>${esc(b.name)}</b></div><button class="btn ghost small" data-unblock="${esc(b.code)}">Разблокировать</button></li>`).join('')}</ul>` : ''}
    </section>`;
    $('#dm-from').onchange = async e => {
      try { await store.api('POST', 'api/messages/settings', { dmFrom: e.target.value }); toast('Сохранено'); } catch (err) { toast(err.message); }
    };
    $$('[data-unblock]').forEach(b => b.onclick = async () => { try { await store.api('POST', 'api/messages/block', { code: b.dataset.unblock, block: false }); toast('Разблокировано'); load(); } catch (e) { toast(e.message); } });
    $$('[data-cong]').forEach(b => b.onclick = () => kudosModal({ code: b.dataset.cong, name: b.dataset.name, badge: b.dataset.badge, onSent: load }));
    $$('[data-gift]').forEach(b => b.onclick = () => kudosModal({ code: b.dataset.gift, name: b.dataset.name, onSent: load }));
  };
  load();
  return () => { alive = false; };
}

// ---------- Переписка ----------
function renderThread(main, code) {
  const back = `<a class="back" href="#messages">${icon('back')} Сообщения</a>`;
  main.innerHTML = `<section class="band narrow">${back}<p class="muted">Загрузка…</p></section>`;
  let alive = true, data = null, timer = null, draft = '';

  const load = async (quiet = false) => {
    try {
      const d = await store.api('GET', 'api/messages/thread?with=' + encodeURIComponent(code));
      if (!alive) return;
      const changed = !data || d.msgs.length !== data.msgs.length || d.msgs.at(-1)?.id !== data.msgs.at(-1)?.id || d.canSend !== data.canSend;
      data = d;
      if (!quiet || changed) draw();
      refreshUnread();
    } catch (e) {
      if (alive && !quiet) { main.innerHTML = `<section class="band narrow">${back}<div class="empty"><p>${esc(e.message)}</p></div></section>`; }
    }
  };

  const bubble = m => `<li class="msg ${m.mine ? 'mine' : ''}${m.gift || m.badge ? ' kudos' : ''}">
    ${m.badge ? `<p class="kudos-badge">${icon('trophy')} ${m.mine ? 'Вы поздравили' : 'Поздравляет'} с достижением «${esc(BADGE_TITLES[m.badge] || m.badge)}»</p>` : ''}
    ${m.gift ? giftImg(m.gift, 'big') : ''}
    ${m.text ? `<p>${esc(m.text)}</p>` : ''}
    <time>${time(m.at)}</time></li>`;

  const draw = () => {
    const d = data, w = d.with;
    const toCongrats = d.canSend ? d.badges.filter(b => !d.congratulated.includes(b)) : [];
    main.innerHTML = `
    <section class="band narrow chat">
      ${back}
      <div class="chat-head">
        <span class="ava">${esc(w.name.slice(0, 1).toUpperCase())}</span>
        <div><h1>${esc(w.name)}</h1><span class="muted small">${KIND[w.kind] || 'больше не в друзьях и не в одном классе'}</span></div>
        <span class="row gap">
          <button class="btn ghost small" id="block">${d.blocked ? 'Разблокировать' : 'Заблокировать'}</button>
          <button class="btn ghost danger small" id="report">Пожаловаться</button>
        </span>
      </div>
      ${toCongrats.length ? `<div class="cong-row">${icon('trophy')}<span>Есть с чем поздравить:</span>${toCongrats.map(b => `<button class="chip" data-badge="${esc(b)}">Поздравить: «${esc(BADGE_TITLES[b])}»</button>`).join('')}</div>` : ''}
      <ol class="msgs" id="msgs">${d.msgs.length ? d.msgs.map(bubble).join('') : `<li class="muted center small">Сообщений пока нет. Напишите первым — например, на изучаемом языке!</li>`}</ol>
      ${d.canSend ? `<form class="composer" id="send">
          <button type="button" class="icon-btn" id="gift" title="Подарить картинку" aria-label="Подарить картинку">${icon('gift')}</button>
          <textarea name="text" rows="1" maxlength="1000" placeholder="Сообщение" aria-label="Сообщение" required>${esc(draft)}</textarea>
          <button class="btn" aria-label="Отправить">Отправить</button>
        </form>` : `<p class="note">${esc(d.reason || 'Сюда сейчас нельзя написать')}</p>`}
      <p class="muted small">${SAFETY}</p>
    </section>`;
    const list = $('#msgs'); list.scrollTop = list.scrollHeight;
    $('#block').onclick = async () => {
      try { await store.api('POST', 'api/messages/block', { code, block: !d.blocked }); toast(d.blocked ? 'Разблокировано' : 'Заблокировано: писать вам и добавлять вас в друзья этот ученик больше не сможет'); load(); } catch (e) { toast(e.message); }
    };
    $('#report').onclick = () => modal(`<h2>Пожаловаться?</h2>
      <p class="muted">Собеседник: <b>${esc(w.name)}</b>. Модератор увидит последние сообщения этой переписки, а собеседник будет заблокирован для вас: писать вам и добавлять в друзья он больше не сможет.</p>
      <textarea id="why" rows="3" maxlength="500" placeholder="Что случилось? (необязательно)"></textarea>
      <div class="row gap"><button class="btn danger" id="yes">Пожаловаться</button><button class="btn ghost" data-close>Отмена</button></div>`,
      (el, close) => { $('#yes', el).onclick = async () => {
        try { await store.api('POST', 'api/messages/report', { code, reason: $('#why', el).value }); close(); toast('Жалоба отправлена. Спасибо, что сообщили'); load(); }
        catch (e) { toast(e.message); }
      }; });
    $$('[data-badge]').forEach(b => b.onclick = () => kudosModal({ code, name: w.name, badge: b.dataset.badge, onSent: () => load() }));
    const form = $('#send');
    if (!form) return;
    const ta = form.text;
    const grow = () => { ta.style.height = 'auto'; ta.style.height = Math.min(160, ta.scrollHeight) + 'px'; };
    ta.oninput = () => { draft = ta.value; grow(); };
    ta.onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); form.requestSubmit(); } };
    grow();
    $('#gift').onclick = () => kudosModal({ code, name: w.name, onSent: () => load() });
    form.onsubmit = async e => {
      e.preventDefault();
      const text = ta.value.trim(); if (!text) return;
      const btn = $('button.btn', form); btn.disabled = true;
      try { await store.api('POST', 'api/messages/send', { to: code, text }); draft = ''; await load(); $('#send textarea')?.focus(); }
      catch (err) { btn.disabled = false; toast(err.message); }
    };
  };

  load();
  timer = setInterval(() => { if (!document.hidden && !$('.modal-wrap')) load(true); }, POLL_MS);
  return () => { alive = false; clearInterval(timer); };
}

// ---------- Жалобы (модератор) ----------
export function renderReports(main) {
  const back = `<a class="back" href="#messages">${icon('back')} Сообщения</a>`;
  if (store.mode !== 'server') return needAccount(main);
  main.innerHTML = `<section class="band narrow">${back}<h1>Жалобы</h1><p class="muted">Загрузка…</p></section>`;
  let alive = true;
  const load = async () => {
    try {
      const { reports } = await store.api('GET', 'api/reports');
      if (!alive) return;
      main.innerHTML = `<section class="band narrow">${back}<h1>Жалобы</h1>
        ${reports.length ? reports.map(r => `<div class="report ${r.status}">
          <p><b>${esc(r.byName)}</b> жалуется на <b>${esc(r.againstName)}</b> · ${time(r.at)} · ${r.status === 'open' ? 'открыта' : r.status === 'resolved' ? 'приняты меры' : 'отклонена'}${r.againstMuted ? ' · отправка отключена' : ''}</p>
          ${r.reason ? `<p class="muted">«${esc(r.reason)}»</p>` : ''}
          <details><summary>Сообщения (${r.msgs.length})</summary><ol class="msgs plain">${r.msgs.map(m => `<li><b>${esc(m.fromName)}</b> <time>${time(m.at)}</time>${m.badge ? ` · поздравление «${esc(BADGE_TITLES[m.badge] || m.badge)}»` : ''}${m.gift ? ` · подарок «${esc(giftById(m.gift)?.title || m.gift)}»` : ''}<p>${esc(m.text)}</p></li>`).join('')}</ol></details>
          <div class="row gap">${r.status === 'open' ? `<button class="btn danger small" data-act="mute" data-id="${r.id}">Отключить отправку</button><button class="btn ghost small" data-act="dismiss" data-id="${r.id}">Отклонить</button>` : ''}${r.againstMuted ? `<button class="btn ghost small" data-act="unmute" data-id="${r.id}">Вернуть отправку</button>` : ''}</div>
        </div>`).join('') : '<div class="empty"><p>Жалоб нет.</p></div>'}</section>`;
      $$('[data-act]').forEach(b => b.onclick = async () => { try { await store.api('POST', 'api/reports/resolve', { id: b.dataset.id, action: b.dataset.act }); load(); } catch (e) { toast(e.message); } });
    } catch (e) { if (alive) main.innerHTML = `<section class="band narrow">${back}<h1>Жалобы</h1><div class="empty"><p>${esc(e.message)}</p></div></section>`; }
  };
  load();
  return () => { alive = false; };
}
