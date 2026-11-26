// Точка входа: маршрутизация по #хэшу, шапка, главная, вход и профиль.
import { lianas, fernBush, fernRow } from './jungle.js';
import { store } from './store.js';
import { esc, $, $$, icon, mascot, toast, modal, plural } from './ui.js';
import * as G from './game.js';
import { renderDictionary, renderSets, renderSet } from './views/dictionary.js';
import { renderTrainings, renderTraining } from './views/train.js';
import { renderTexts, renderReader, renderGrammar, renderLesson } from './views/learn.js';
import { L, LANGS, switchLang, wordCount } from './lang.js';

const NAV = [
  ['home', 'Главная', 'home'], ['dictionary', 'Словарь', 'dict'], ['sets', 'Наборы', 'sets'],
  ['train', 'Тренировки', 'train'], ['texts', 'Тексты', 'read'], ['grammar', 'Грамматика', 'grammar']
];

const app = $('#app');
let cleanup = null;

function shell() {
  app.innerHTML = `
  <header class="top">
    <a class="logo" href="#home" aria-label="Лингва — на главную">${mascot('happy', 40)}<span>Лингва</span></a>
    <nav class="nav" aria-label="Разделы">${NAV.map(([id, t, ic]) => `<a href="#${id}" data-nav="${id}">${icon(ic)}<span>${t}</span></a>`).join('')}</nav>
    <div class="hud">
      <button class="pill lang" id="hud-lang" title="Изучаемый язык — сменить" aria-label="Сменить изучаемый язык">${icon('globe')}<b></b></button>
      <span class="pill streak" title="Дней подряд">${icon('fire')}<b id="hud-streak">0</b></span>
      <span class="pill xp" title="Опыт за сегодня / цель">${icon('star')}<b id="hud-xp">0</b></span>
      <a class="avatar" href="#profile" title="Профиль" id="hud-avatar"></a>
    </div>
  </header>
  <main id="view" tabindex="-1"></main>
  <footer class="foot">${fernRow()}<p>Лингва — учебный open-source проект. Озвучка — синтез речи вашего браузера. <span id="sync"></span></p></footer>`;
  store.on(updateHud);
  $('#hud-lang').onclick = pickLang;
  updateHud();
}

// ---------- выбор изучаемого языка ----------
function pickLang() {
  modal(`<h2>Какой язык учим?</h2><p class="muted">У каждого языка свой словарь, тексты и уроки. Опыт, стрик и достижения общие.</p>
    <div class="lang-pick">${Object.values(LANGS).map(l => {
      const n = wordCount(l.id);
      return `<button class="lang-opt ${l.id === L().id ? 'on' : ''}" data-l="${l.id}"><span class="code">${l.code}</span><b>${l.name}</b><span class="muted">${n ? `${n} ${plural(n, 'слово', 'слова', 'слов')} в словаре` : 'словарь пуст'}</span></button>`;
    }).join('')}</div>`,
  (el, close) => { el.querySelector('.lang-pick').onclick = e => {
    const b = e.target.closest('[data-l]'); if (!b) return;
    close();
    if (switchLang(b.dataset.l)) { updateHud(); toast(`Учим: ${L().acc}`); route(); }
  }; });
}

// Кнопки с турецкими буквами (.xkeys) вставляют символ в последнее активное поле ввода
let lastInput = null;
document.addEventListener('focusin', e => { if (e.target.matches?.('input:not([type=checkbox]):not([type=radio]), textarea')) lastInput = e.target; });
document.addEventListener('pointerdown', e => { if (e.target.closest('.xkeys button')) e.preventDefault(); });
document.addEventListener('click', e => {
  const b = e.target.closest('.xkeys button'); if (!b) return;
  const inp = lastInput?.isConnected && !lastInput.disabled ? lastInput : b.closest('form, .stage, .exercise, .clues, .band')?.querySelector('input:not([disabled])');
  if (!inp) return;
  if (inp.maxLength === 1) inp.value = b.dataset.ch;
  else { const a = inp.selectionStart ?? inp.value.length, z = inp.selectionEnd ?? a; inp.setRangeText(b.dataset.ch, a, z, 'end'); }
  inp.focus();
  inp.dispatchEvent(new Event('input', { bubbles: true }));
});

function updateHud() {
  if (!store.state || !$('#hud-xp')) return;
  $('#hud-lang b').textContent = L().code;
  $('#hud-streak').textContent = G.currentStreak();
  $('#hud-xp').textContent = `${G.todayXp()}/${store.state.goal}`;
  $('#hud-avatar').textContent = (store.state.name || '?').slice(0, 1).toUpperCase();
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
  $$('[data-nav]').forEach(a => a.classList.toggle('on', a.dataset.nav === view || (view === 'set' && a.dataset.nav === 'sets') || (view === 'read' && a.dataset.nav === 'texts') || (view === 'lesson' && a.dataset.nav === 'grammar')));
  const views = {
    home: () => renderHome(main),
    dictionary: () => renderDictionary(main),
    sets: () => renderSets(main),
    set: () => renderSet(main, param),
    train: () => (param ? renderTraining(main, param) : renderTrainings(main)),
    texts: () => renderTexts(main),
    read: () => renderReader(main, param),
    grammar: () => renderGrammar(main),
    lesson: () => renderLesson(main, param),
    profile: () => renderProfile(main)
  };
  cleanup = (views[view] || views.home)() || null;
  main.focus({ preventScroll: true });
  window.scrollTo(0, 0);
}

// ---------- Главная ----------
function renderHome(main) {
  const s = store.state, c = G.counts(), lv = G.levelInfo(), tx = G.todayXp();
  const { TEXTS, SET_INFO, firstSet } = L();
  const goalPct = Math.min(100, Math.round((tx / s.goal) * 100));
  const mood = tx >= s.goal ? 'happy' : tx > 0 ? 'calm' : 'sleepy';
  const nextText = TEXTS.find(t => !s.readTexts[t.id]) || TEXTS[0];
  const ready = c.new + c.learning;
  const R = 70, CIRC = 2 * Math.PI * R;
  main.innerHTML = `
  <section class="hero">
    ${lianas(11)}${fernBush(170, 2)}${fernBush(150, 9, 'right')}
    <div class="hero-pic">
      <svg class="ring" viewBox="0 0 180 180" aria-hidden="true"><circle cx="90" cy="90" r="${R}" class="ring-bg"/><circle cx="90" cy="90" r="${R}" class="ring-fg" stroke-dasharray="${CIRC}" stroke-dashoffset="${CIRC * (1 - goalPct / 100)}"/></svg>
      ${mascot(mood, 150)}
    </div>
    <div class="hero-text">
      <h1>${tx >= s.goal ? 'Цель на сегодня выполнена' : tx > 0 ? 'Хороший темп, ' + esc(s.name) : 'Привет, ' + esc(s.name) + '!'}</h1>
      <p class="lang-line">Учим ${L().acc} · <button class="link" id="home-lang">сменить язык</button></p>
      <p class="lead">${tx >= s.goal ? 'Пим сыт и доволен. Можно повторить пару слов на завтра или почитать.' : `До дневной цели осталось <b>${s.goal - tx} XP</b>. Пим ждёт новых слов.`}</p>
      <div class="stat-row">
        <div class="stat"><b>${G.currentStreak()}</b><span>${plural(G.currentStreak(), 'день', 'дня', 'дней')} подряд</span></div>
        <div class="stat"><b>${lv.level}</b><span>уровень</span><i class="bar"><i style="width:${lv.pct}%"></i></i></div>
        <div class="stat"><b>${s.xp}</b><span>XP всего</span></div>
      </div>
    </div>
  </section>
  <section class="band">
    <div class="grid-3">
      <a class="action primary" href="${c.due ? '#train-cards' : '#train'}">
        ${icon('cards')}<div><b>${c.due ? `Повторить ${c.due} ${plural(c.due, 'слово', 'слова', 'слов')}` : 'Тренировки'}</b><span>${c.due ? 'Слова, которые пора освежить в памяти' : ready ? `${ready} ${plural(ready, 'слово ждёт', 'слова ждут', 'слов ждут')} тренировки` : 'Добавьте слова, чтобы начать'}</span></div>
      </a>
      <a class="action" href="#read-${nextText.id}">${icon('read')}<div><b>${esc(nextText.title)}</b><span>${nextText.level} · ${esc(nextText.topic)}</span></div></a>
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
}

// ---------- Вход и регистрация ----------
function renderAuth() {
  app.innerHTML = `
  <div class="auth">
    <div class="auth-pic">${lianas(7, 13)}${fernBush(160, 4)}${fernBush(140, 17, 'right')}${mascot('happy', 220)}<h1>Лингва</h1><p>Личный словарь, тренировки, тексты и грамматика — английский и турецкий каждый день по 15 минут.</p></div>
    <form class="auth-form" id="auth-form" novalidate>
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
function renderProfile(main) {
  const s = store.state, lv = G.levelInfo();
  const days = Array.from({ length: 14 }, (_, i) => { const d = new Date(Date.now() - (13 - i) * 86400000); return { d, xp: s.xpLog[G.today(d)] || 0 }; });
  const max = Math.max(s.goal, ...days.map(x => x.xp));
  const acc = s.stats.answers ? Math.round((s.stats.correct / s.stats.answers) * 100) : 0;
  main.innerHTML = `
  <section class="band">
    <div class="profile-head">
      <div class="avatar big">${esc((s.name || '?').slice(0, 1).toUpperCase())}</div>
      <div><h1>${esc(s.name)}</h1><p class="muted">${store.mode === 'server' ? esc(store.user?.email) : 'Режим без регистрации'}</p>
      <div class="level"><b>Уровень ${lv.level}</b><i class="bar"><i style="width:${lv.pct}%"></i></i><span>${lv.into} / ${lv.need} XP</span></div></div>
    </div>
    <div class="stat-row wide">
      <div class="stat"><b>${s.xp}</b><span>XP всего</span></div>
      <div class="stat"><b>${G.currentStreak()}</b><span>стрик (рекорд ${s.bestStreak})</span></div>
      <div class="stat"><b>${G.counts().learned + G.counts().due}</b><span>слов изучено</span></div>
      <div class="stat"><b>${acc}%</b><span>верных ответов</span></div>
    </div>
  </section>
  <section class="band">
    <h2>Опыт за две недели</h2>
    <div class="xp-chart" role="img" aria-label="XP по дням">
      ${days.map(x => `<div class="col ${x.xp >= s.goal ? 'hit' : ''}" title="${x.d.toLocaleDateString('ru-RU')}: ${x.xp} XP"><i style="height:${Math.round((x.xp / max) * 100)}%"></i><span>${x.d.getDate()}</span></div>`).join('')}
      <div class="goal-line" style="bottom:calc(${(s.goal / max).toFixed(3)} * (100% - 22px) + 22px)"><span>цель ${s.goal}</span></div>
    </div>
  </section>
  <section class="band">
    <h2>Достижения</h2>
    <div class="badges">${G.BADGES.map(b => `<div class="badge ${s.badges[b.id] ? 'got' : ''}">${icon('trophy')}<b>${b.title}</b><span>${b.desc}</span></div>`).join('')}</div>
  </section>
  <section class="band" id="leaders"></section>
  <section class="band">
    <h2>Настройки</h2>
    <form class="settings" id="settings">
      <label>Имя<input name="name" value="${esc(s.name)}" maxlength="40"></label>
      <label>Дневная цель<select name="goal">${[20, 50, 100, 150, 250].map(g => `<option value="${g}" ${g === s.goal ? 'selected' : ''}>${g} XP — ${g <= 20 ? 'спокойно' : g <= 50 ? 'обычно' : g <= 100 ? 'серьёзно' : 'интенсив'}</option>`).join('')}</select></label>
      <label>Изучаемый язык<select name="lang">${Object.values(LANGS).map(l => `<option value="${l.id}" ${l.id === L().id ? 'selected' : ''}>${l.name}</option>`).join('')}</select></label>
      <label>Скорость озвучки<select name="rate">${[[0.7, 'медленно'], [0.9, 'обычно'], [1.1, 'быстро']].map(([v, t]) => `<option value="${v}" ${v === s.rate ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
      <button class="btn" type="submit">Сохранить</button>
    </form>
    <div class="row gap">
      <button class="btn ghost" id="export">Экспорт словаря</button>
      <button class="btn ghost" id="import">Импорт слов</button>
      <button class="btn ghost danger" id="reset">Сбросить прогресс</button>
      ${store.mode === 'server' ? `<button class="btn ghost" id="logout">${icon('logout')} Выйти</button>` : store.serverAvailable ? `<button class="btn ghost" id="login">Войти или создать аккаунт</button>` : ''}
    </div>
  </section>`;

  $('#settings').onsubmit = e => {
    e.preventDefault(); const f = new FormData(e.target);
    s.name = String(f.get('name')).trim() || s.name; s.goal = Number(f.get('goal')); s.rate = Number(f.get('rate'));
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
  $('#logout') && ($('#logout').onclick = async () => { await store.logout(); location.hash = ''; boot(); });
  $('#login') && ($('#login').onclick = () => { location.hash = ''; renderAuth(); });

  // Рейтинг (только с сервером)
  const lb = $('#leaders');
  if (store.mode === 'server') {
    lb.innerHTML = '<h2>Рейтинг недели</h2><p class="muted">Загрузка…</p>';
    store.saveNow().then(() => store.api('GET', 'api/leaderboard')).then(d => {
      lb.innerHTML = `<h2>Рейтинг недели</h2><ol class="leaders">${d.week.map((r, i) => `<li class="${r.me ? 'me' : ''}"><span class="pos">${i + 1}</span><b>${esc(r.name)}</b><span>${icon('fire')}${r.streak}</span><span class="num">${r.week} XP</span></li>`).join('')}</ol>`;
    }).catch(() => { lb.innerHTML = ''; });
  } else lb.remove();
}

// ---------- запуск ----------
function start() {
  shell();
  G.checkBadges();
  window.onhashchange = route;
  route();
}

async function boot() {
  app.innerHTML = `<div class="loading">${mascot('calm', 120)}<p>Загрузка…</p></div>`;
  const ok = await store.init();
  if (ok) start(); else renderAuth();
}

window.addEventListener('keydown', e => { if (e.key === 'Escape' && document.activeElement?.blur) document.activeElement.blur(); });
boot();
