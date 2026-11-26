// Точка входа: маршрутизация по #хэшу, шапка, главная, вход и профиль.
import { lianas, fernBush, fernRow } from './jungle.js';
import { sideScenery, postcard } from './scenery.js';
import { store } from './store.js';
import { esc, $, $$, icon, mascot, toast, modal, plural } from './ui.js';
import * as G from './game.js';
import { renderDictionary, renderSets, renderSet } from './views/dictionary.js';
import { renderMySet } from './views/mysets.js';
import { renderVerbs } from './views/verbs.js';
import { renderFriends } from './views/friends.js';
import { renderClasses, renderClass, renderJoin, resumeJoin } from './views/teacher.js';
import { renderStudents } from './views/students.js';
import { renderMessages, renderReports, watchUnread } from './views/messages.js';
import { renderExtension } from './views/extension.js';
import { renderExam } from './views/exam.js';
import { pullInbox } from './inbox.js';
import { captureInvite, pendingInvite, inviter, acceptInvite } from './invite.js';
import { rankFor, RANKS } from './ranks.js';
import { renderTrainings, renderTraining } from './views/train.js';
import { renderShelf } from './views/library.js';
import { renderTexts, renderReader, renderGrammar, renderLesson } from './views/learn.js';
import { renderProgress } from './views/progress.js';
import { renderPath } from './views/path.js';
import { renderGrammarTraining, grammarState } from './views/grammar-train.js';
import { grammarPlan } from './grammar-drill.js';
import { satiety, appleRow, APPLES, plea } from './pim.js';
import { initPim, onRoute, feedHref } from './pimfx.js';
import { L, LANGS, switchLang, wordCount, toggleAccent } from './lang.js';
import { flagsFor } from './flags.js';
import { dayPlanHtml } from './views/dayplan.js';
import { renderPlacement, placementBanner, myLevel, hasPlacement } from './views/placement.js';
import { BOARDS, standing, nudgeText, reminderFor } from './rating.js';
import { initInstall, installCard, fillInstallCard, installSettings, bindInstallSettings } from './install.js';

const NAV = [
  ['home', 'Главная', 'home'], ['dictionary', 'Словарь', 'dict'], ['sets', 'Наборы', 'sets'],
  ['train', 'Тренировки', 'train'], ['texts', 'Тексты', 'read'], ['grammar', 'Грамматика', 'grammar'],
  ['progress', 'Прогресс', 'chart']
];

const app = $('#app');
let cleanup = null;

function shell() {
  app.innerHTML = `
  <div class="scenery" id="scenery"></div>
  <header class="top">
    <a class="logo" href="#home" aria-label="Лингва — на главную">${mascot('happy', 40)}<span>Лингва</span></a>
    <nav class="nav" aria-label="Разделы">${NAV.map(([id, t, ic]) => `<a href="#${id}" data-nav="${id}">${icon(ic)}<span>${t}</span></a>`).join('')}</nav>
    <div class="hud">
      <button class="pill lang" id="hud-lang" title="Изучаемый язык — сменить" aria-label="Сменить изучаемый язык">${icon('globe')}<b></b></button>
      <a class="pill streak" href="#progress" title="Дней подряд — открыть прогресс">${icon('fire')}<b id="hud-streak">0</b></a>
      <a class="pill xp" href="#progress" title="Опыт за сегодня / цель — открыть прогресс">${icon('star')}<b id="hud-xp">0</b></a>
      <a class="pill msg" href="#messages" title="Сообщения" id="hud-msg" aria-label="Сообщения" hidden>${icon('mail')}<b hidden>0</b></a>
      <a class="avatar" href="#profile" title="Профиль" id="hud-avatar"></a>
      <span class="who" id="hud-who"></span>
      <button class="pill auth-btn" id="hud-auth" hidden></button>
    </div>
  </header>
  <main id="view" tabindex="-1"></main>
  <footer class="foot"><div id="postcard"></div>${fernRow()}<p>Лингва — учебный open-source проект. Озвучка — синтез речи вашего браузера. <span id="sync"></span></p></footer>`;
  sceneLang = null;
  store.on(updateHud);
  $('#hud-lang').onclick = pickLang;
  $('#hud-auth').onclick = authAction;
  updateHud();
  watchUnread();
}

// ---------- выбор изучаемого языка ----------
function pickLang() {
  modal(`<h2>Какой язык учим?</h2><p class="muted">У каждого языка свой словарь, тексты и уроки. Опыт, стрик и достижения общие.</p>
    <div class="lang-pick">${Object.values(LANGS).map(l => {
      const n = wordCount(l.id);
      return `<button class="lang-opt ${l.id === L().id ? 'on' : ''}" data-l="${l.id}"><span class="lang-top">${flagsFor(l.id)}<span class="code">${l.code}</span></span><b>${l.name}</b><span class="muted">${n ? `${n} ${plural(n, 'слово', 'слова', 'слов')} в словаре` : 'словарь пуст'}</span>${l.beta ? `<span class="beta">${l.beta}</span>` : ''}</button>`;
    }).join('')}</div>`,
  (el, close) => { el.querySelector('.lang-pick').onclick = e => {
    const b = e.target.closest('[data-l]'); if (!b) return;
    close();
    if (switchLang(b.dataset.l)) { updateHud(); toast(`Учим: ${L().acc}`); route(); }
  }; });
}

// Кнопки с особыми буквами (.xkeys: турецкие, греческие) вставляют символ в последнее активное поле ввода
let lastInput = null;
document.addEventListener('focusin', e => { if (e.target.matches?.('input:not([type=checkbox]):not([type=radio]), textarea')) lastInput = e.target; });
document.addEventListener('pointerdown', e => { if (e.target.closest('.xkeys button')) e.preventDefault(); });
document.addEventListener('click', e => {
  const b = e.target.closest('.xkeys button'); if (!b) return;
  const inp = lastInput?.isConnected && !lastInput.disabled ? lastInput : b.closest('form, .stage, .exercise, .clues, .band')?.querySelector('input:not([disabled])');
  if (!inp) return;
  if (b.dataset.ch === '´') { // ударение: меняем гласную перед курсором (в клетке кроссворда — саму букву)
    const at = inp.maxLength === 1 ? inp.value.length : (inp.selectionStart ?? inp.value.length);
    const ch = toggleAccent(inp.value[at - 1]);
    if (ch) { inp.setRangeText(ch, at - 1, at, 'end'); }
  } else if (inp.maxLength === 1) inp.value = b.dataset.ch;
  else { const a = inp.selectionStart ?? inp.value.length, z = inp.selectionEnd ?? a; inp.setRangeText(b.dataset.ch, a, z, 'end'); }
  inp.focus();
  inp.dispatchEvent(new Event('input', { bubbles: true }));
});

let sceneLang = null; // язык, для которого нарисованы пейзажи

async function logoutNow() {
  await store.logout();
  location.hash = '';
  if (store.serverAvailable) renderAuth(); else boot();
}
function authAction() {
  if (store.mode === 'server') logoutNow();
  else { location.hash = ''; renderAuth(); }
}
function updateHud() {
  if (!store.state || !$('#hud-xp')) return;
  $('#hud-lang b').textContent = L().code;
  if (sceneLang !== L().id) { sceneLang = L().id; $('#scenery').innerHTML = sideScenery(sceneLang); $('#postcard').innerHTML = postcard(sceneLang); }
  document.body.classList.toggle('no-tts', !L().tts);
  $('#hud-streak').textContent = G.currentStreak();
  $('#hud-xp').textContent = `${G.todayXp()}/${store.state.goal}`;
  $('#hud-avatar').textContent = (store.state.name || '?').slice(0, 1).toUpperCase();
  $('#hud-avatar').title = `Профиль · ${rankFor(G.levelInfo().level).title}`;
  // Вход / выход всегда на виду в шапке
  const authed = store.mode === 'server', btn = $('#hud-auth');
  btn.hidden = !authed && !store.serverAvailable;
  btn.className = `pill auth-btn ${authed ? 'out' : 'in'}`;
  btn.innerHTML = authed ? `${icon('logout')}<span>Выйти</span>` : `${icon('login')}<span>Войти</span>`;
  btn.title = authed ? `Вы вошли как ${store.user?.email || store.state.name} — выйти` : 'Войти или создать аккаунт: прогресс сохранится на сервере';
  btn.setAttribute('aria-label', authed ? 'Выйти из аккаунта' : 'Войти или зарегистрироваться');
  $('#hud-who').textContent = authed ? store.state.name || store.user?.email || '' : 'Гость';
  const sync = $('#sync');
  sync.textContent = store.mode === 'server'
    ? ({ saved: 'Прогресс сохранён в аккаунте.', saving: 'Сохраняем…', error: 'Нет связи с сервером — изменения не сохранены.' })[store.syncState]
    : 'Режим без регистрации: прогресс хранится в этом браузере.';
}

function route() {
  const raw = location.hash.slice(1) || 'home';
  const [view, ...rest] = raw.split('-');
  const param = rest.join('-');
  cleanup?.(); cleanup = null;
  const main = $('#view');
  $$('[data-nav]').forEach(a => a.classList.toggle('on', a.dataset.nav === view || (['set', 'myset', 'verbs'].includes(view) && a.dataset.nav === 'sets') || (['read', 'shelf'].includes(view) && a.dataset.nav === 'texts') || (['lesson', 'exam', 'gtrain'].includes(view) && a.dataset.nav === 'grammar') || (view === 'path' && a.dataset.nav === 'progress')));
  const views = {
    home: () => renderHome(main),
    dictionary: () => renderDictionary(main),
    sets: () => renderSets(main),
    set: () => renderSet(main, param),
    myset: () => renderMySet(main, param),
    verbs: () => renderVerbs(main),
    friends: () => renderFriends(main),
    classes: () => renderClasses(main),
    class: () => renderClass(main, param),
    join: () => renderJoin(main, param),
    students: () => renderStudents(main),
    messages: () => renderMessages(main, param),
    reports: () => renderReports(main),
    extension: () => renderExtension(main),
    exam: () => renderExam(main, param),
    train: () => (param ? renderTraining(main, param) : renderTrainings(main)),
    texts: () => renderTexts(main),
    shelf: () => renderShelf(main, param),
    read: () => renderReader(main, param),
    grammar: () => renderGrammar(main),
    lesson: () => renderLesson(main, param),
    gtrain: () => renderGrammarTraining(main, param),
    profile: () => renderProfile(main, param),
    progress: () => renderProgress(main),
    path: () => renderPath(main),
    test: () => renderPlacement(main)
  };
  cleanup = (views[view] || views.home)() || null;
  onRoute(views[view] ? view : 'home', param);
  main.focus({ preventScroll: true });
  window.scrollTo(0, 0);
}

// ---------- Главная ----------
function renderHome(main) {
  const plan = dayPlanHtml(); // первым: награды за выполненные задания должны попасть в счётчики ниже
  const s = store.state, c = G.counts(), lv = G.levelInfo(), tx = G.todayXp();
  const { TEXTS, SET_INFO, firstSet } = L();
  const goalPct = Math.min(100, Math.round((tx / s.goal) * 100));
  const pim = satiety(s.xpLog, s.goal), mood = pim.mood;
  const nextText = TEXTS.find(t => !s.readTexts[t.id]) || TEXTS[0];
  const ready = c.new + c.learning;
  const { lessons, g } = grammarState(), gp = grammarPlan(lessons, g);
  const R = 70, CIRC = 2 * Math.PI * R;
  main.innerHTML = `
  <section class="hero">
    ${lianas(11)}${fernBush(170, 2)}${fernBush(150, 9, 'right')}
    <div class="hero-pic pim-${pim.state}">
      <svg class="ring" viewBox="0 0 180 180" aria-hidden="true"><circle cx="90" cy="90" r="${R}" class="ring-bg"/><circle cx="90" cy="90" r="${R}" class="ring-fg" stroke-dasharray="${CIRC}" stroke-dashoffset="${CIRC * (1 - goalPct / 100)}"/></svg>
      ${mascot(mood, 150)}${pim.state === 'hungry' || pim.state === 'starving' ? '<span class="rumble" aria-hidden="true">урр…</span>' : ''}
    </div>
    <div class="hero-text">
      <h1>${tx > 0 || pim.state === 'starving' ? pim.title : 'Привет, ' + esc(s.name) + '!'}</h1>
      <p class="lang-line">Учим ${L().acc} · ${myLevel() ? `<a href="#test" title="Тест на уровень">уровень ${myLevel()}</a> · ` : ''}<button class="link" id="home-lang">сменить язык</button></p>${L().beta ? `<p class="beta-note">${L().beta}. Озвучки для этого языка в браузерах нет.</p>` : ''}
      <a class="feed" href="#progress" title="Сытость Пима — подробнее на странице «Прогресс»"><span class="apples">${appleRow(pim)}</span><span>${pim.apples} из ${APPLES} яблок</span></a>
      <div class="hero-bubble st-${pim.state}"><p>${esc(plea(pim, new Date(), 'home'))}</p>${tx < s.goal ? `<div class="row gap"><a class="btn feed-btn" href="${feedHref()}">${icon('heart')} Покормить Пима</a><span>до полной миски — <b>${pim.left} XP</b></span></div>` : ''}</div>
      <div class="stat-row">
        <div class="stat"><b>${G.currentStreak()}</b><span>${plural(G.currentStreak(), 'день', 'дня', 'дней')} подряд</span></div>
        <div class="stat"><b>${lv.level}</b><span>уровень</span><i class="bar"><i style="width:${lv.pct}%"></i></i></div>
        <div class="stat"><b>${s.xp}</b><span>XP всего</span></div>
      </div>
    </div>
  </section>
  ${plan}
  <section class="band" id="home-rating" hidden></section>
  ${placementBanner()}
  ${installCard()}
  <section class="band">
    <div class="grid-3 grid-4">
      <a class="action primary" href="${c.due ? '#train-cards' : '#train'}">
        ${icon('cards')}<div><b>${c.due ? `Повторить ${c.due} ${plural(c.due, 'слово', 'слова', 'слов')}` : 'Тренировки'}</b><span>${c.due ? 'Слова, которые пора освежить в памяти' : ready ? `${ready} ${plural(ready, 'слово ждёт', 'слова ждут', 'слов ждут')} тренировки` : 'Добавьте слова, чтобы начать'}</span></div>
      </a>
      <a class="action" href="#read-${nextText.id}">${icon('read')}<div><b>${esc(nextText.title)}</b><span>${nextText.level} · ${esc(nextText.topic)}</span></div></a>
      <a class="action" href="${gp.href}">${icon('grammar')}<div><b>${gp.kind === 'review' ? `Повторить ${gp.count} ${plural(gp.count, 'правило', 'правила', 'правил')}` : gp.kind === 'lesson' ? esc(gp.lesson.title) : 'Грамматика вперемешку'}</b><span>${gp.kind === 'review' ? `Грамматика · ${esc(gp.lesson.title)}${gp.count > 1 ? ' и др.' : ''}` : gp.kind === 'lesson' ? `Грамматика · ${g[gp.lesson.id] ? 'урок не сдан — попробуйте ещё раз' : 'следующий урок'}` : `Подтянуть: ${esc(gp.lesson.title)}`}</span></div></a>
      <a class="action" href="#sets">${icon('sets')}<div><b>Наборы слов</b><span>${Object.keys(SET_INFO).length} тем — добавьте в словарь одним кликом</span></div></a>
    </div>
  </section>
  <section class="band">
    <h2>Мой словарь</h2>
    <div class="dict-meter">
      ${[['new', 'Новые'], ['learning', 'Изучаются'], ['learned', 'Изучены'], ['due', 'На повторение']].map(([k, t]) => `<a href="#dictionary" class="m ${k}"><b>${c[k]}</b><span>${t}</span></a>`).join('')}
    </div>
    ${c.total === 0 ? `<div class="empty"><p>В словаре пока пусто. Начните с набора «${SET_INFO[firstSet].title}» или откройте текст и нажимайте на незнакомые слова.</p><a class="btn" href="#set-${firstSet}">Открыть набор</a></div>` : ''}
  </section>`;
  $('#home-lang').onclick = pickLang;
  fillHomeRating();
  return fillInstallCard();
}

// ---------- Вход и регистрация ----------
function renderAuth() {
  app.innerHTML = `
  <div class="auth">
    <div class="auth-pic">${lianas(7, 13)}${fernBush(160, 4)}${fernBush(140, 17, 'right')}${mascot('happy', 220)}<h1>Лингва</h1><p>Личный словарь, тренировки, тексты и грамматика — английский и турецкий каждый день по 15 минут.</p></div>
    <form class="auth-form" id="auth-form" novalidate>
      <p class="invite-note" id="invite-note" hidden></p>
      <div class="tabs" role="tablist"><button type="button" class="on" data-k="login">Вход</button><button type="button" data-k="register">Регистрация</button></div>
      <label class="reg-only" hidden>Имя<input name="name" autocomplete="nickname" maxlength="40"></label>
      <label>E-mail<input name="email" type="email" autocomplete="email" required></label>
      <label>Пароль<input name="password" type="password" autocomplete="current-password" minlength="6" required></label>
      <p class="err" id="auth-err" role="alert"></p>
      <button class="btn big" type="submit" id="auth-submit">Войти</button>
      <button class="btn ghost" type="button" id="guest">Попробовать без регистрации</button>
    </form>
  </div>`;
  let kind = 'login';
  $$('.tabs button').forEach(b => b.onclick = () => {
    kind = b.dataset.k; $$('.tabs button').forEach(x => x.classList.toggle('on', x === b));
    $('.reg-only').hidden = kind !== 'register';
    $('#auth-submit').textContent = kind === 'login' ? 'Войти' : 'Создать аккаунт';
  });
  // Открыли ссылку-приглашение: показываем, кто зовёт, и сразу предлагаем регистрацию
  if (pendingInvite()) inviter().then(name => {
    const note = $('#invite-note'); if (!name || !note) return;
    note.innerHTML = `${icon('heart')}<span><b>${esc(name)}</b> приглашает вас в Лингву. Войдите или создайте аккаунт — и вы сразу станете друзьями.</span>`;
    note.hidden = false;
    $('.tabs [data-k="register"]').click();
  });
  $('#auth-form').onsubmit = async e => {
    e.preventDefault();
    const f = new FormData(e.target);
    $('#auth-err').textContent = '';
    try { await store.auth(kind, Object.fromEntries(f)); start(); }
    catch (err) { $('#auth-err').textContent = err.message; }
  };
  $('#guest').onclick = () => { store.startLocal(); start(); };
}

// ---------- Профиль ----------
function renderProfile(main, param = '') {
  const s = store.state, lv = G.levelInfo();
  const days = Array.from({ length: 14 }, (_, i) => { const d = new Date(Date.now() - (13 - i) * 86400000); return { d, xp: s.xpLog[G.today(d)] || 0 }; });
  const max = Math.max(s.goal, ...days.map(x => x.xp));
  const acc = s.stats.answers ? Math.round((s.stats.correct / s.stats.answers) * 100) : 0;
  main.innerHTML = `
  <section class="band">
    <div class="profile-head">
      <div class="avatar big">${esc((s.name || '?').slice(0, 1).toUpperCase())}</div>
      <div><h1>${esc(s.name)}</h1>${(() => { const r = rankFor(lv.level); return `<button class="rank" id="rank" title="Все звания">${icon('trophy')}<b>${r.title}</b></button>${r.next ? `<p class="muted small">До звания «${r.next.title}» — ${r.next.from - lv.level} ${plural(r.next.from - lv.level, 'уровень', 'уровня', 'уровней')}</p>` : ''}`; })()}<p class="muted">${store.mode === 'server' ? esc(store.user?.email) : 'Режим без регистрации'}</p>
      ${hasPlacement() ? `<p class="muted">${L().name}: ${myLevel() ? `уровень <b>${myLevel()}</b> · ` : ''}<a href="#test">${myLevel() ? 'пройти тест заново' : 'определить уровень'}</a></p>` : ''}
      <div class="level"><b>Уровень ${lv.level}</b><i class="bar"><i style="width:${lv.pct}%"></i></i><span>${lv.into} / ${lv.need} XP</span></div></div>
    </div>
    <div class="stat-row wide">
      <div class="stat"><b>${s.xp}</b><span>XP всего</span></div>
      <div class="stat"><b>${G.currentStreak()}</b><span>стрик (рекорд ${s.bestStreak})</span></div>
      <div class="stat"><b>${G.counts().learned + G.counts().due}</b><span>слов изучено</span></div>
      <div class="stat"><b>${acc}%</b><span>верных ответов</span></div>
    </div>
  </section>
  <section class="band" id="leaders"></section>
  <section class="band">
    <div class="sec-head"><h2>Опыт за две недели</h2><a class="link" href="#progress">Вся статистика</a></div>
    <div class="xp-chart" role="img" aria-label="XP по дням">
      ${days.map(x => `<div class="col ${x.xp >= s.goal ? 'hit' : ''}" title="${x.d.toLocaleDateString('ru-RU')}: ${x.xp} XP"><i style="height:${Math.round((x.xp / max) * 100)}%"></i><span>${x.d.getDate()}</span></div>`).join('')}
      <div class="goal-line" style="bottom:calc(${(s.goal / max).toFixed(3)} * (100% - 22px) + 22px)"><span>цель ${s.goal}</span></div>
    </div>
  </section>
  <section class="band">
    <h2>Достижения</h2>
    <div class="badges">${G.BADGES.map(b => `<div class="badge ${s.badges[b.id] ? 'got' : ''}">${icon('trophy')}<b>${b.title}</b><span>${b.desc}</span></div>`).join('')}</div>
  </section>
  ${installSettings()}
  <section class="band"><a class="action friends-link" href="#friends">${icon('heart')}<div><b>Друзья и дуэли</b><span>Добавляйте друзей по коду, сравнивайте опыт за неделю и вызывайте на дуэль по словам</span></div></a><a class="action friends-link" href="#messages">${icon('mail')}<div><b>Сообщения</b><span>Переписка с друзьями и одноклассниками, поздравления с достижениями и подарки-картинки</span></div></a><a class="action friends-link" href="#students">${icon('chart')}<div><b>Все ученики</b><span>Уровни, опыт, стрики и языки всех учеников Лингвы${s.hideFromAll ? ' · вы сейчас скрыты' : ''}</span></div></a><a class="action friends-link" href="#classes">${icon('user')}<div><b>Классы</b><span>Вступайте в класс по коду учителя и соревнуйтесь с одноклассниками. Учителю — панель с прогрессом учеников</span></div></a><a class="action friends-link" href="#extension">${icon('globe')}<div><b>Расширение для браузера</b><span>Перевод по двойному клику на любом сайте и сохранение слов в словарь</span></div></a></section>
  <section class="band">
    <h2>Настройки</h2>
    <form class="settings" id="settings">
      <label>Имя<input name="name" value="${esc(s.name)}" maxlength="40"></label>
      <label>Дневная цель<select name="goal">${[20, 50, 100, 150, 250].map(g => `<option value="${g}" ${g === s.goal ? 'selected' : ''}>${g} XP — ${g <= 20 ? 'спокойно' : g <= 50 ? 'обычно' : g <= 100 ? 'серьёзно' : 'интенсив'}</option>`).join('')}</select></label>
      <label>Изучаемый язык<select name="lang">${Object.values(LANGS).map(l => `<option value="${l.id}" ${l.id === L().id ? 'selected' : ''}>${l.name}</option>`).join('')}</select></label>
      <label>Скорость озвучки<select name="rate">${[[0.7, 'медленно'], [0.9, 'обычно'], [1.1, 'быстро']].map(([v, t]) => `<option value="${v}" ${v === s.rate ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
      ${store.mode === 'server' ? `<label class="check"><input type="checkbox" name="shown" ${s.hideFromAll ? '' : 'checked'}> Показывать мой прогресс в списке «Все ученики» и рейтинге недели (видны только имя и учебные цифры)</label>` : ''}
      <button class="btn" type="submit">Сохранить</button>
    </form>
    <div class="row gap">
      <button class="btn ghost" id="export">Экспорт словаря</button>
      <button class="btn ghost" id="import">Импорт слов</button>
      <button class="btn ghost danger" id="reset">Сбросить прогресс</button>
      ${store.mode === 'server' ? `<button class="btn ghost" id="logout">${icon('logout')} Выйти</button>` : store.serverAvailable ? `<button class="btn ghost" id="login">Войти или создать аккаунт</button>` : ''}
    </div>
  </section>`;

  $('#rank').onclick = () => {
    const cur = rankFor(lv.level).index;
    modal(`<h2>Звания</h2><p class="muted">Звание растёт вместе с уровнем: опыт дают тренировки, тексты, уроки и тест на уровень.</p>
      <ol class="ranks">${RANKS.map((r, i) => `<li class="${i < cur ? 'got' : i === cur ? 'now' : ''}"><span>${r.from}+</span><b>${r.title}</b>${i === cur ? '<em>вы здесь</em>' : i < cur ? icon('check') : ''}</li>`).join('')}</ol>
      <button class="btn ghost" data-close>Закрыть</button>`);
  };
  $('#settings').onsubmit = e => {
    e.preventDefault(); const f = new FormData(e.target);
    s.name = String(f.get('name')).trim() || s.name; s.goal = Number(f.get('goal')); s.rate = Number(f.get('rate'));
    if (store.mode === 'server') { if (f.get('shown')) delete s.hideFromAll; else s.hideFromAll = true; }
    switchLang(String(f.get('lang')));
    store.save(); updateHud(); toast('Настройки сохранены'); renderProfile(main);
  };
  $('#export').onclick = () => {
    const csv = G.allWords().map(w => `${w.w};${w.t.replace(/;/g, ',')}`).join('\n');
    modal(`<h2>Экспорт словаря</h2><p class="muted">Формат «слово;перевод». Скопируйте текст — его можно импортировать обратно или в другую программу с карточками.</p><textarea readonly rows="10">${esc(csv)}</textarea><div class="row gap"><button class="btn" id="copy">Скопировать</button><button class="btn ghost" data-close>Закрыть</button></div>`,
      (el) => { $('#copy', el).onclick = async () => { try { await navigator.clipboard.writeText(csv); toast('Скопировано'); } catch { $('textarea', el).select(); } }; });
  };
  $('#import').onclick = () => modal(`<h2>Импорт слов</h2><p class="muted">Слова попадут в словарь языка «${L().name}». По одному слову в строке: <code>word;перевод</code> (разделитель — точка с запятой или табуляция).</p><textarea rows="10" id="imp" placeholder="${L().sampleTr}"></textarea><div class="row gap"><button class="btn" id="do-imp">Импортировать</button><button class="btn ghost" data-close>Отмена</button></div>`,
    (el, close) => { $('#do-imp', el).onclick = () => {
      let n = 0;
      for (const line of $('#imp', el).value.split('\n')) { const [w, t] = line.split(/[;\t]/); if (w && t && G.addWord(w, t, '', 'импорт')) n++; }
      toast(`Добавлено ${n} ${plural(n, 'слово', 'слова', 'слов')}`); close();
    }; });
  $('#reset').onclick = () => modal(`<h2>Сбросить прогресс?</h2><p>Словарь, опыт, стрик и достижения будут удалены. Отменить это нельзя.</p><div class="row gap"><button class="btn danger" id="yes">Да, сбросить</button><button class="btn ghost" data-close>Отмена</button></div>`,
    (el, close) => { $('#yes', el).onclick = async () => { await store.resetProgress(); close(); toast('Прогресс сброшен'); renderProfile(main); }; });
  bindInstallSettings();
  $('#logout') && ($('#logout').onclick = logoutNow);
  $('#login') && ($('#login').onclick = () => { location.hash = ''; renderAuth(); });

  // Рейтинг дня и недели (только с сервером) — сразу под статистикой
  const lb = $('#leaders');
  if (store.mode === 'server') {
    let tab = lsGet(LS_BOARD) === 'day' ? 'day' : 'week', data = null;
    const draw = () => {
      const b = BOARDS[tab], rows = data[tab] || [];
      lb.innerHTML = `<div class="sec-head"><h2>${b.title}</h2><div class="seg" role="tablist" aria-label="Рейтинг">${Object.entries(BOARDS).map(([k, x]) => `<button role="tab" data-board="${k}" aria-selected="${k === tab}">${x.short}</button>`).join('')}</div></div>
        <p class="rating-me">${icon('trophy')}<span>${esc(nudgeText(standing(rows, b.key), b.key))}</span></p>
        ${rows.length ? `<ol class="leaders">${rows.map((r, i) => `<li class="${r.me ? 'me' : ''}"><span class="pos">${i + 1}</span><b>${esc(r.name)}</b><span>${icon('fire')}${r.streak}</span><span class="num">${r[b.key]} XP</span></li>`).join('')}</ol>` : ''}`;
      $$('[data-board]', lb).forEach(x => x.onclick = () => { tab = x.dataset.board; lsSet(LS_BOARD, tab); draw(); });
    };
    lb.innerHTML = '<h2>Рейтинг дня и недели</h2><p class="muted">Загрузка…</p>';
    loadBoards(true).then(d => { data = d; draw(); if (param === 'leaders') lb.scrollIntoView({ block: 'start' }); }).catch(() => { lb.innerHTML = ''; });
  } else lb.remove();
}

// ---------- Рейтинг: загрузка и напоминания ----------
const lsGet = k => { try { return localStorage.getItem(k); } catch { return null; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch {} };
const LS_BOARD = 'lingva-board', LS_RANK = 'lingva-rank-seen';
let boardsCache = null;
function loadBoards(fresh = false) {
  if (!fresh && boardsCache && Date.now() - boardsCache.at < 30000) return boardsCache.p;
  const p = store.saveNow().then(() => store.api('GET', `api/leaderboard?day=${G.today()}`));
  boardsCache = { at: Date.now(), p };
  p.catch(() => { boardsCache = null; });
  return p;
}

// Карточка на главной: место в рейтинге дня и недели, ссылка на таблицу
function fillHomeRating() {
  const el = $('#home-rating');
  if (!el || store.mode !== 'server') return;
  loadBoards().then(d => {
    if (!el.isConnected) return;
    const line = k => { const b = BOARDS[k]; return `<span><b>${b.short}:</b> ${esc(nudgeText(standing(d[k], b.key), b.key))}</span>`; };
    el.innerHTML = `<a class="action rating-card" href="#profile-leaders">${icon('trophy')}<div><b>Рейтинг дня и недели</b>${line('day')}${line('week')}</div></a>`;
    el.hidden = false;
  }).catch(() => {});
}

// Тост-напоминание при входе: раз в день, а если обогнали за неделю — сразу
function remindRating() {
  if (store.mode !== 'server') return;
  setTimeout(() => loadBoards().then(d => {
    let prev = {}; try { prev = JSON.parse(lsGet(LS_RANK) || '{}'); } catch {}
    const r = reminderFor(d, prev, G.today());
    lsSet(LS_RANK, JSON.stringify(r.save));
    if (r.text) toast(r.text, 'level');
  }).catch(() => {}), 4000);
}

// ---------- запуск ----------
function start() {
  shell();
  G.checkBadges();
  initPim();
  window.onhashchange = route;
  resumeJoin(); // приглашение в класс, открытое до входа
  route();
  pullInbox();
  remindRating();
  acceptInvite().then(name => { if (name && location.hash === '#friends') route(); });
}

async function boot() {
  captureInvite();
  app.innerHTML = `<div class="loading">${mascot('calm', 120)}<p>Загрузка…</p></div>`;
  const ok = await store.init();
  if (ok) start(); else renderAuth();
}

initInstall();
window.addEventListener('keydown', e => { if (e.key === 'Escape' && document.activeElement?.blur) document.activeElement.blur(); });
boot();
