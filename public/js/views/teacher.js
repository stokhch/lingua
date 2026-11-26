// Классы: страница учителя (прогресс учеников и соревнования) и страница ученика (вступить в класс, рейтинг класса).
//   #classes        — мои классы: как ученик и как учитель
//   #class-<id>     — панель учителя по классу
//   #join-<КОД>     — приглашение в класс: ученик видит, что увидит учитель, и сам даёт согласие
import { store } from '../store.js';
import { esc, $, $$, icon, toast, modal, plural } from '../ui.js';
import * as G from '../game.js';
import { LANGS } from '../lang.js';
import { rankFor } from '../ranks.js';

const PENDING = 'lingva.join';
const METRICS = { xp: 'Опыт (XP)', words: 'Изученные слова', days: 'Дни с занятиями', answers: 'Верные ответы' };
const UNIT = { xp: n => `${n} XP`, words: n => `${n} ${plural(n, 'слово', 'слова', 'слов')}`, days: n => `${n} ${plural(n, 'день', 'дня', 'дней')}`, answers: n => `${n} ${plural(n, 'ответ', 'ответа', 'ответов')}` };
const n0 = n => Number(n || 0).toLocaleString('ru-RU');
const fmtDate = k => new Date(k + 'T12:00:00').toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
const ago = d => { if (!d) return 'ещё не занимался(-ась)'; const days = Math.round((Date.parse(G.today()) - Date.parse(d)) / 86400000); return days <= 0 ? 'сегодня' : days === 1 ? 'вчера' : `${days} ${plural(days, 'день', 'дня', 'дней')} назад`; };
const langName = id => (id === 'all' ? 'все языки' : LANGS[id]?.name || id);
const langCode = id => LANGS[id]?.code || id;
const joinLink = code => `${location.origin}${location.pathname}#join-${code}`;
const lessonTitle = (lang, id) => LANGS[lang]?.ALL_LESSONS?.find(l => l.id === id)?.title || id;
const statusLabel = { soon: 'Скоро', live: 'Идёт', done: 'Завершено' };
const pending = { get() { try { return sessionStorage.getItem(PENDING); } catch { return null; } }, set(v) { try { v ? sessionStorage.setItem(PENDING, v) : sessionStorage.removeItem(PENDING); } catch {} } };

function needAccount(main, title, text) {
  main.innerHTML = `<section class="band narrow"><h1>${esc(title)}</h1><div class="empty"><p>${text}${store.serverAvailable ? ' Прогресс, накопленный без регистрации, перенесётся в новый аккаунт.' : ''}</p>${store.serverAvailable ? '<button class="btn" id="to-auth">Войти или создать аккаунт</button>' : '<p>Сейчас сайт работает без сервера, классы недоступны.</p>'}</div></section>`;
  $('#to-auth') && ($('#to-auth').onclick = () => $('#hud-auth')?.click());
}

// Загрузка с повтором при ошибке; draw вызывается, только пока страница открыта
function loader(main, title, fetcher, draw) {
  let alive = true;
  const load = async () => {
    try { const d = await fetcher(); if (alive) draw(d, load); }
    catch (e) { if (alive) { main.innerHTML = `<section class="band"><h1>${esc(title)}</h1><div class="empty"><p>${esc(e.message)}</p><button class="btn" id="retry">Повторить</button></div></section>`; $('#retry').onclick = load; } }
  };
  main.innerHTML = `<section class="band"><h1>${esc(title)}</h1><p class="muted">Загрузка…</p></section>`;
  load();
  return () => { alive = false; };
}

// Таблица рейтинга (недели или соревнования)
function board(rows, fmt, { goal = 0, empty = 'В классе пока нет учеников.' } = {}) {
  if (!rows.length) return `<p class="muted">${empty}</p>`;
  const top = Math.max(1, ...rows.map(r => r.score), goal);
  return `<ol class="leaders class-board">${rows.map(r => `<li class="${r.me ? 'me' : ''}${goal && r.score >= goal ? ' goal-hit' : ''}">
    <span class="pos">${r.pos <= 3 && r.score > 0 ? ['🥇', '🥈', '🥉'][r.pos - 1] : r.pos}</span>
    <div class="fr-name"><b>${esc(r.name)}${r.me ? ' (вы)' : ''}</b><i class="bar"><i style="width:${Math.round((r.score / top) * 100)}%"></i></i></div>
    ${r.streak !== undefined ? `<span title="Дней подряд">${icon('fire')}${r.streak}</span>` : '<span></span>'}
    <span class="num">${fmt(r.score)}${goal && r.score >= goal ? ' ✓' : ''}</span></li>`).join('')}</ol>`;
}

function contestCard(c, { teacher = false } = {}) {
  const fmt = UNIT[c.metric] || (n => n);
  return `<div class="contest ${c.status}">
    <div class="contest-head"><b>${esc(c.title)}</b><span class="tag ${c.status}">${statusLabel[c.status]}</span>${teacher ? `<button class="icon-btn" data-del-contest="${esc(c.id)}" title="Удалить соревнование" aria-label="Удалить соревнование «${esc(c.title)}»">${icon('trash')}</button>` : ''}</div>
    <p class="muted small">${esc(c.metricName || METRICS[c.metric])} · ${esc(langName(c.lang))} · ${fmtDate(c.start)} — ${fmtDate(c.end)}${c.goal ? ` · цель ${fmt(c.goal)}` : ''}${c.goal && c.reached !== null ? ` · достигли ${c.reached} из ${c.rows.length}` : ''}</p>
    ${c.status === 'soon' ? `<p class="muted">Начнётся ${fmtDate(c.start)}.</p>` : board(c.rows, fmt, { goal: c.goal })}
  </div>`;
}

// После входа возвращаем к приглашению в класс, открытому без аккаунта
export function resumeJoin() {
  const code = store.mode === 'server' && pending.get();
  if (code) { pending.set(null); location.hash = `join-${code}`; }
}

// ---------- #classes ----------
export function renderClasses(main) {
  if (store.mode !== 'server') return needAccount(main, 'Классы', 'Классы работают с аккаунтом: учитель видит прогресс учеников, а ученики соревнуются внутри класса.');
  return loader(main, 'Классы', async () => { await store.saveNow(); return store.api('GET', 'api/classes'); }, (data, load) => {
    const { teacher, teaching, joined } = data;
    main.innerHTML = `
    <section class="band">
      <div class="toolbar"><h1>Классы</h1></div>
      <p class="lead">Учитесь в классе: учитель видит ваш прогресс и устраивает соревнования, а вы — рейтинг класса за неделю.</p>
      <div class="friend-code"><div><span class="muted">Вступить в класс</span><span class="small muted">Код или ссылку даёт учитель</span></div>
        <form id="join-f" class="add-f"><input name="code" placeholder="Код класса" maxlength="12" autocomplete="off" autocapitalize="characters" required aria-label="Код класса"><button class="btn">${icon('plus')} Вступить</button></form></div>
    </section>
    ${joined.map(k => `<section class="band">
      <div class="sec-head"><h2>${esc(k.name)} <span class="muted small-h">· учитель ${esc(k.teacher)} · ${k.students} ${plural(k.students, 'ученик', 'ученика', 'учеников')}</span></h2><button class="btn ghost small" data-leave="${esc(k.id)}" data-name="${esc(k.name)}">Выйти из класса</button></div>
      ${k.contests.length ? `<div class="contests">${k.contests.map(c => contestCard(c)).join('')}</div>` : ''}
      <h3 class="sub">Рейтинг класса за неделю</h3>
      ${board(k.week, n => `${n} XP`)}
    </section>`).join('')}
    <section class="band">
      <h2>${icon('user')} Для учителя</h2>
      ${teacher ? `
        ${teaching.length ? `<div class="class-list">${teaching.map(k => `<a class="action class-link" href="#class-${esc(k.id)}">${icon('chart')}<div><b>${esc(k.name)}</b><span>${k.students} ${plural(k.students, 'ученик', 'ученика', 'учеников')} · код ${esc(k.code)}${k.contests ? ` · ${k.contests} ${plural(k.contests, 'соревнование', 'соревнования', 'соревнований')}` : ''}</span></div></a>`).join('')}</div>` : '<p class="muted">Классов пока нет. Создайте первый и отправьте ученикам ссылку.</p>'}
        <form id="new-class" class="add-f inline-form"><input name="name" placeholder="Название класса, например «7Б английский»" maxlength="60" required aria-label="Название класса"><button class="btn">${icon('plus')} Создать класс</button></form>`
      : `<p class="muted">Преподаёте? Создайте класс, пригласите учеников по коду или ссылке и следите за их прогрессом: опыт, серии дней, изученные слова, грамматика и последние занятия по каждому языку. Ученики вступают сами и сами решают, показывать ли вам прогресс.</p>
        <button class="btn" id="be-teacher">${icon('user')} Я учитель</button>`}
    </section>`;

    $('#join-f').onsubmit = e => { e.preventDefault(); const c = e.target.code.value.trim().toUpperCase().replace(/[^A-Z0-9]/g, ''); if (c) location.hash = `join-${c}`; };
    $('#be-teacher') && ($('#be-teacher').onclick = async () => { try { await store.api('POST', 'api/teacher/enable'); toast('Режим учителя включён'); load(); } catch (e) { toast(e.message); } });
    $('#new-class') && ($('#new-class').onsubmit = async e => {
      e.preventDefault();
      try { const r = await store.api('POST', 'api/classes', { name: e.target.name.value }); location.hash = `class-${r.class.id}`; }
      catch (err) { toast(err.message); }
    });
    $$('[data-leave]').forEach(b => b.onclick = () => modal(`<h2>Выйти из класса «${esc(b.dataset.name)}»?</h2><p class="muted">Учитель перестанет видеть ваш прогресс, а вы пропадёте из рейтинга класса. Вернуться можно по коду.</p><div class="row gap"><button class="btn danger" id="yes">Выйти</button><button class="btn ghost" data-close>Отмена</button></div>`,
      (el, close) => { $('#yes', el).onclick = async () => { close(); try { await store.api('POST', 'api/classes/leave', { id: b.dataset.leave }); toast('Вы вышли из класса'); load(); } catch (err) { toast(err.message); } }; }));
  });
}

// ---------- #join-КОД ----------
export function renderJoin(main, code) {
  code = String(code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (store.mode !== 'server') {
    pending.set(code);
    return needAccount(main, 'Приглашение в класс', `Чтобы вступить в класс <b>${esc(code)}</b>, войдите или создайте аккаунт — после входа приглашение откроется снова.`);
  }
  return loader(main, 'Приглашение в класс', () => store.api('GET', `api/join?code=${encodeURIComponent(code)}`), data => {
    const k = data.class;
    if (data.own || data.joined) {
      main.innerHTML = `<section class="band narrow"><h1>${esc(k.name)}</h1><div class="empty"><p>${data.own ? 'Это ваш класс — отправьте эту ссылку ученикам.' : 'Вы уже в этом классе.'}</p><a class="btn" href="#classes">К классам</a></div></section>`;
      return;
    }
    main.innerHTML = `<section class="band narrow">
      <h1>Вступить в класс «${esc(k.name)}»</h1>
      <p class="lead">Учитель: <b>${esc(k.teacher)}</b> · сейчас ${k.students} ${plural(k.students, 'ученик', 'ученика', 'учеников')}.</p>
      <div class="panel consent">
        <h2>Что увидит учитель</h2>
        <ul class="ext-list">
          <li>${icon('check')}<span>Ваше имя, опыт, уровень, серию дней и когда вы занимались</span></li>
          <li>${icon('check')}<span>Сколько слов вы изучили, какие слова добавили и выучили недавно — по каждому языку</span></li>
          <li>${icon('check')}<span>Пройденные уроки грамматики, прочитанные тексты, точность ответов и активность за 2 недели</span></li>
        </ul>
        <p class="muted small">Одноклассники видят только ваше имя, опыт за неделю, серию дней и очки в соревнованиях класса. E-mail и пароль не видит никто. Выйти из класса можно в любой момент на странице «Классы» — после этого учитель перестанет видеть ваш прогресс.</p>
        <label class="check"><input type="checkbox" id="agree"> Я согласен(-на) показывать свой прогресс учителю этого класса</label>
        <div class="row gap"><button class="btn" id="join" disabled>${icon('plus')} Вступить</button><a class="btn ghost" href="#classes">Не сейчас</a></div>
      </div></section>`;
    $('#agree').onchange = e => { $('#join').disabled = !e.target.checked; };
    $('#join').onclick = async () => {
      try { await store.saveNow(); await store.api('POST', 'api/join', { code, consent: true }); toast(`Вы в классе «${k.name}»`); location.hash = 'classes'; }
      catch (e) { toast(e.message); }
    };
  });
}

// ---------- #class-<id>: панель учителя ----------
export function renderClass(main, id) {
  if (store.mode !== 'server') return needAccount(main, 'Класс', 'Панель учителя работает с аккаунтом.');
  let tab = 'students';
  return loader(main, 'Класс', () => store.api('GET', `api/classes/one?id=${encodeURIComponent(id)}`), function draw(data, load) {
    const k = data.class, list = data.students;
    const totals = { week: list.reduce((n, s) => n + s.week, 0), known: list.reduce((n, s) => n + s.known, 0), active: list.filter(s => s.active && Date.parse(G.today()) - Date.parse(s.active) <= 7 * 86400000).length };
    const live = data.contests.filter(c => c.status !== 'done'), done = data.contests.filter(c => c.status === 'done');
    main.innerHTML = `
    <section class="band">
      <a class="link" href="#classes">${icon('back')} Все классы</a>
      <div class="toolbar"><h1>${esc(k.name)}</h1><span class="row gap"><button class="btn ghost small" id="rename">${icon('pen')} Переименовать</button><button class="btn ghost small" id="del-class">${icon('trash')} Удалить</button></span></div>
      <div class="friend-code invite">
        <div><span class="muted">Код класса</span><b>${esc(k.code)}</b></div>
        <div class="invite-link"><span class="muted">Ссылка-приглашение</span><input readonly value="${esc(joinLink(k.code))}" aria-label="Ссылка-приглашение" id="link"></div>
        <span class="row gap"><button class="btn small" id="copy">${icon('check')} Скопировать ссылку</button><button class="btn ghost small" id="new-code" title="Старый код перестанет работать">Новый код</button></span>
      </div>
      <p class="muted small">Ученик открывает ссылку (или вводит код на странице «Классы»), видит, что вам будет виден его прогресс, и сам соглашается. Вы видите только тех, кто вступил.</p>
      <div class="kpis small">
        <div class="kpi">${icon('user')}<b>${list.length}</b><span>${plural(list.length, 'ученик', 'ученика', 'учеников')}</span></div>
        <div class="kpi leaf">${icon('home')}<b>${totals.active}</b><span>занимались за неделю</span></div>
        <div class="kpi gold">${icon('star')}<b>${n0(totals.week)}</b><span>XP класса за неделю</span></div>
        <div class="kpi">${icon('check')}<b>${n0(totals.known)}</b><span>слов изучено всего</span></div>
      </div>
    </section>
    <section class="band">
      <div class="seg" role="tablist" aria-label="Раздел">${[['students', 'Ученики'], ['week', 'Рейтинг недели'], ['contests', `Соревнования${live.length ? ` · ${live.length}` : ''}`]].map(([v, t]) => `<button role="tab" data-tab="${v}" aria-selected="${v === tab}">${t}</button>`).join('')}</div>
      <div id="tab-body" class="tab-body"></div>
    </section>`;

    const body = $('#tab-body');
    const tabs = {
      students: () => {
        body.innerHTML = list.length ? `<div class="tbl-wrap"><table class="tbl students">
          <thead><tr><th>Ученик</th><th>Неделя</th><th>Серия</th><th>XP · уровень</th><th>Слова</th><th>Грамматика</th><th>Точность</th><th>Языки</th><th>Занятие</th></tr></thead>
          <tbody>${list.map(s => `<tr data-uid="${esc(s.uid)}" tabindex="0" title="Подробнее о ${esc(s.name)}">
            <td><b>${esc(s.name)}</b></td>
            <td class="num">${n0(s.week)} XP${trend(s.week, s.prevWeek)}</td>
            <td class="num">${icon('fire')}${s.streak}</td>
            <td class="num">${n0(s.xp)} · ур. ${s.level}</td>
            <td class="num">${n0(s.known)}<span class="muted"> / ${n0(s.words)}</span>${s.due ? `<em class="due" title="Пора повторить">↻${s.due}</em>` : ''}</td>
            <td class="num">${s.lessons} ${plural(s.lessons, 'урок', 'урока', 'уроков')}</td>
            <td class="num">${s.accuracy === null ? '—' : s.accuracy + '%'}</td>
            <td>${s.langs.map(l => `<span class="lv${l.current ? ' cur' : ''}" title="${esc(LANGS[l.id]?.name || l.id)}: ${l.words.known} слов изучено${l.current ? ' · учит сейчас' : ''}">${esc(langCode(l.id))}</span>`).join(' ')}</td>
            <td class="${s.active === G.today() ? 'ok' : ''}">${ago(s.active)}</td>
          </tr>`).join('')}</tbody></table></div>
          <p class="muted small">Нажмите на ученика, чтобы увидеть подробности по языкам и последние занятия.</p>`
          : `<div class="empty"><p>В классе пока нет учеников. Отправьте им ссылку или код <b>${esc(k.code)}</b>.</p></div>`;
        $$('tr[data-uid]', body).forEach(tr => { tr.onclick = () => showStudent(main, k, tr.dataset.uid, () => draw(data, load), load); tr.onkeydown = e => { if (e.key === 'Enter') tr.click(); }; });
      },
      week: () => {
        body.innerHTML = `<p class="muted">Опыт за последние 7 дней. Ученики видят этот рейтинг у себя на странице «Классы».</p>${board(data.week, n => `${n} XP`)}`;
      },
      contests: () => {
        const today = G.today();
        const plus = n => { const d = new Date(today + 'T12:00:00'); d.setDate(d.getDate() + n); return G.today(d); };
        body.innerHTML = `
          <form class="panel contest-form" id="contest-f">
            <h2>Новое соревнование</h2>
            <div class="cf-grid">
              <label>Название<input name="title" maxlength="60" required placeholder="Например, «Словарный марафон»"></label>
              <label>Что считаем<select name="metric">${Object.entries(METRICS).map(([v, t]) => `<option value="${v}">${t}</option>`).join('')}</select></label>
              <label>Язык<select name="lang"><option value="all">Все языки</option>${Object.values(LANGS).map(l => `<option value="${l.id}">${l.name}</option>`).join('')}</select></label>
              <label>Начало<input type="date" name="start" value="${today}" required></label>
              <label>Конец<input type="date" name="end" value="${plus(6)}" required></label>
              <label>Цель <span class="muted">(необязательно)</span><input type="number" name="goal" min="0" max="100000" placeholder="например, 30"></label>
            </div>
            <p class="muted small">Очки считаются сами по прогрессу учеников за выбранные дни. С целью соревнование становится общим вызовом: видно, кто её уже достиг.</p>
            <button class="btn">${icon('trophy')} Запустить</button>
          </form>
          ${live.length ? `<h2 class="sets-h">Идут и скоро начнутся</h2><div class="contests">${live.map(c => contestCard(c, { teacher: true })).join('')}</div>` : ''}
          ${done.length ? `<h2 class="sets-h">Завершённые</h2><div class="contests">${done.map(c => contestCard(c, { teacher: true })).join('')}</div>` : ''}`;
        $('#contest-f').onsubmit = async e => {
          e.preventDefault();
          const f = Object.fromEntries(new FormData(e.target));
          try { await store.api('POST', 'api/classes/contest', { id: k.id, ...f, goal: Number(f.goal) || 0 }); toast('Соревнование запущено'); tab = 'contests'; load(); }
          catch (err) { toast(err.message); }
        };
        $$('[data-del-contest]', body).forEach(b => b.onclick = async () => {
          try { await store.api('POST', 'api/classes/contest/delete', { id: k.id, cid: b.dataset.delContest }); load(); } catch (err) { toast(err.message); }
        });
      }
    };
    const show = t => { tab = t; $$('[data-tab]').forEach(b => b.setAttribute('aria-selected', b.dataset.tab === t)); tabs[t](); };
    $$('[data-tab]').forEach(b => b.onclick = () => show(b.dataset.tab));
    show(tab);

    $('#copy').onclick = async () => { try { await navigator.clipboard.writeText(joinLink(k.code)); toast('Ссылка скопирована'); } catch { $('#link').select(); toast('Скопируйте ссылку из поля'); } };
    $('#new-code').onclick = () => modal(`<h2>Выдать новый код?</h2><p class="muted">Старый код и ссылка перестанут работать. Ученики, которые уже вступили, останутся в классе.</p><div class="row gap"><button class="btn" id="yes">Новый код</button><button class="btn ghost" data-close>Отмена</button></div>`,
      (el, close) => { $('#yes', el).onclick = async () => { close(); try { await store.api('POST', 'api/classes/code', { id: k.id }); load(); } catch (err) { toast(err.message); } }; });
    $('#rename').onclick = () => modal(`<h2>Название класса</h2><form id="rn" class="add-f"><input name="name" value="${esc(k.name)}" maxlength="60" required aria-label="Название класса"><button class="btn">Сохранить</button></form>`,
      (el, close) => { $('#rn', el).onsubmit = async e => { e.preventDefault(); close(); try { await store.api('POST', 'api/classes/rename', { id: k.id, name: e.target.name.value }); load(); } catch (err) { toast(err.message); } }; });
    $('#del-class').onclick = () => modal(`<h2>Удалить класс «${esc(k.name)}»?</h2><p class="muted">Соревнования класса пропадут, а ученики выйдут из него. Их собственный прогресс не изменится.</p><div class="row gap"><button class="btn danger" id="yes">Удалить</button><button class="btn ghost" data-close>Отмена</button></div>`,
      (el, close) => { $('#yes', el).onclick = async () => { close(); try { await store.api('POST', 'api/classes/delete', { id: k.id }); location.hash = 'classes'; } catch (err) { toast(err.message); } }; });
  });
}

const trend = (cur, prev) => !prev ? '' : cur >= prev ? ` <em class="up" title="Прошлая неделя: ${prev} XP">▲</em>` : ` <em class="down" title="Прошлая неделя: ${prev} XP">▼</em>`;

// Подробности об ученике
async function showStudent(main, k, uid, back, reload) {
  main.innerHTML = `<section class="band"><p class="muted">Загрузка…</p></section>`;
  let s;
  try { s = (await store.api('GET', `api/classes/student?id=${encodeURIComponent(k.id)}&uid=${encodeURIComponent(uid)}`)).student; }
  catch (e) { toast(e.message); return back(); }
  const top = Math.max(1, ...s.days.map(d => d.xp));
  const wd = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const sumDays = s.days.reduce((a, d) => ({ t: a.t + d.t, a: a.a + d.a, c: a.c + d.c, r: a.r + d.r, on: a.on + (d.xp > 0 ? 1 : 0) }), { t: 0, a: 0, c: 0, r: 0, on: 0 });
  main.innerHTML = `
  <section class="band">
    <button class="link" id="back">${icon('back')} ${esc(k.name)}</button>
    <div class="toolbar"><h1>${esc(s.name)}</h1><button class="btn ghost small" id="kick">Исключить из класса</button></div>
    <p class="lead">${esc(rankFor(s.level).title)} · уровень ${s.level} · сейчас учит ${esc(LANGS[s.lang]?.acc || s.lang)} · последнее занятие ${ago(s.active)}</p>
    <div class="kpis">
      <div class="kpi gold">${icon('star')}<b>${n0(s.xp)}</b><span>XP всего · ${n0(s.week)} за неделю</span></div>
      <div class="kpi fire">${icon('fire')}<b>${s.streak}</b><span>${plural(s.streak, 'день', 'дня', 'дней')} подряд · рекорд ${s.bestStreak}</span></div>
      <div class="kpi leaf">${icon('check')}<b>${n0(s.known)}</b><span>слов изучено из ${n0(s.words)}${s.due ? ` · ${s.due} пора повторить` : ''}</span></div>
      <div class="kpi">${icon('grammar')}<b>${s.lessons}</b><span>${plural(s.lessons, 'урок пройден', 'урока пройдено', 'уроков пройдено')}</span></div>
      <div class="kpi">${icon('brain')}<b>${s.accuracy === null ? '—' : s.accuracy + '%'}</b><span>верных ответов</span></div>
    </div>
  </section>
  <section class="band">
    <h2>По языкам</h2>
    ${s.langs.length ? `<div class="tbl-wrap"><table class="tbl by-lang"><thead><tr><th>Язык</th><th>Изучено слов</th><th>Изучается</th><th>Пора повторить</th><th>Грамматика</th><th>Тексты</th><th>XP за 7 дней</th><th>XP за 30 дней</th></tr></thead>
      <tbody>${s.langs.map(l => `<tr><td><b>${esc(LANGS[l.id]?.name || l.id)}</b>${l.current ? ' <span class="muted small">· сейчас</span>' : ''}</td>
        <td class="num">${l.words.known}</td><td class="num">${l.words.learning + l.words.new}</td><td class="num">${l.words.due}</td>
        <td class="num">${l.lessonsPassed} / ${LANGS[l.id]?.ALL_LESSONS?.length || '—'}</td><td class="num">${l.textsRead} / ${LANGS[l.id]?.TEXTS?.length || '—'}</td>
        <td class="num">${l.xp7}</td><td class="num">${l.xp30}</td></tr>`).join('')}</tbody></table></div>` : '<p class="muted">Пока нет данных.</p>'}
  </section>
  <section class="band">
    <h2>Активность за 2 недели</h2>
    <p class="muted">${sumDays.on} ${plural(sumDays.on, 'день', 'дня', 'дней')} с занятиями · ${sumDays.t} ${plural(sumDays.t, 'тренировка', 'тренировки', 'тренировок')} · ${sumDays.c} из ${sumDays.a} ответов верно · ${sumDays.r} ${plural(sumDays.r, 'повторение', 'повторения', 'повторений')} карточек</p>
    <div class="xp-chart">${s.days.map(d => `<div class="col ${d.xp >= s.goal ? 'hit' : ''}" title="${fmtDate(d.key)}: ${d.xp} XP${Object.keys(d.x).length ? ' (' + Object.entries(d.x).map(([l, v]) => `${langCode(l)} ${v}`).join(', ') + ')' : ''}${d.t ? ` · тренировок: ${d.t}` : ''}"><i style="height:${Math.round((d.xp / top) * 100)}%"></i><span>${wd[new Date(d.key + 'T12:00:00').getDay()]}</span></div>`).join('')}</div>
  </section>
  <section class="band two-col">
    <div class="panel"><h2>Последние слова</h2>
      ${s.recentWords.length ? `<ul class="recent">${s.recentWords.map(w => `<li><span class="lv">${esc(langCode(w.lang))}</span><b>${esc(w.w)}</b><span class="muted">${esc(w.t)}</span><em class="${w.kind}">${w.kind === 'learned' ? 'выучено' : 'добавлено'} · ${ago(G.today(new Date(w.at)))}</em></li>`).join('')}</ul>` : '<p class="muted">Слов пока нет.</p>'}
    </div>
    <div class="panel"><h2>Грамматика</h2>
      ${s.recentLessons.length ? `<ul class="recent">${s.recentLessons.map(l => `<li><span class="lv">${esc(langCode(l.lang))}</span><b>${esc(lessonTitle(l.lang, l.id))}</b><span class="${l.passed ? 'ok' : 'muted'}">${l.best}%${l.passed ? ' ✓' : ''}</span><em>${ago(G.today(new Date(l.at)))}</em></li>`).join('')}</ul>` : '<p class="muted">Уроков пока нет.</p>'}
    </div>
  </section>`;
  $('#back').onclick = back;
  $('#kick').onclick = () => modal(`<h2>Исключить ${esc(s.name)} из класса?</h2><p class="muted">Вы перестанете видеть прогресс ученика. Вернуться он(а) сможет по коду класса.</p><div class="row gap"><button class="btn danger" id="yes">Исключить</button><button class="btn ghost" data-close>Отмена</button></div>`,
    (el, close) => { $('#yes', el).onclick = async () => { close(); try { await store.api('POST', 'api/classes/remove', { id: k.id, uid }); toast('Ученик исключён'); reload(); } catch (err) { toast(err.message); } }; });
}
