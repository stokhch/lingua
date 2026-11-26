// Пим на сайте: реплики в пузырях, реакции на кормление, напоминание, когда миска пуста.
// Правила, чтобы Пим был милым, а не назойливым:
//  • напоминание появляется не сразу, не на главной и не во время тренировки, и его можно отложить на 3 часа;
//  • радуется он коротко (2–3 секунды) и только когда действительно съел яблоко;
//  • в течение дня реплики не меняются от перезагрузки страницы.
import { store } from './store.js';
import { mascot, esc } from './ui.js';
import * as G from './game.js';
import { satiety, plea, reaction, appleRow, apple, APPLES } from './pim.js';

const SNOOZE_KEY = 'lingva.pimSnooze';
const SNOOZE_MS = 3 * 3600 * 1000;
const lsGet = k => { try { return localStorage.getItem(k); } catch { return null; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch {} };
const reduced = () => matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export const sat = () => satiety(store.state.xpLog, store.state.goal);
const hungry = s => s.state !== 'full' && s.state !== 'feast';

// Куда вести, чтобы покормить: сначала карточки на повторение, потом тренировки
export function feedHref() {
  const c = G.counts();
  return c.due ? '#train-cards' : c.total >= 4 ? '#train' : '#sets';
}

// Пим с пузырём-репликой. actions — HTML кнопок под текстом.
export function say(text, { mood = 'calm', size = 92, cls = '', actions = '' } = {}) {
  return `<div class="pim-say ${cls}"><div class="pim-av">${mascot(mood, size)}</div><div class="bubble"><p>${text}</p>${actions}</div></div>`;
}

// Пим просит есть (или благодарит, если сыт). salt — чтобы разные места говорили разное.
export function pleaBlock(salt, opts = {}) {
  const s = sat();
  const btn = hungry(s) ? `<a class="btn small feed-btn" href="${feedHref()}">Покормить Пима</a>` : '';
  return say(esc(plea(s, new Date(), salt)), { mood: s.mood, cls: `st-${s.state} ${opts.cls || ''}`, size: opts.size, actions: opts.noButton ? '' : btn });
}

// ---------- реакция на экране итогов ----------
let mark = null; // опыт за сегодня в начале текущего занятия
export function markStart() { mark = G.todayXp(); }
export function resultBlock() {
  const now = G.todayXp(), before = mark ?? now;
  mark = now; // «Ещё раз» начинает новый отсчёт
  const r = reaction(before, now, store.state.goal);
  const s = sat();
  return say(`${esc(r.text)}<span class="apples">${appleRow(s)}</span>`, { mood: r.mood, cls: 'result' + (r.full ? ' full' : '') });
}

// ---------- кормление: всплывающий Пим ----------
let lastApples = null, lastDay = null, popTimer;
function watchFeeding() {
  if (!store.state) return;
  const s = sat(), day = G.today();
  if (lastDay !== day) { lastDay = day; lastApples = s.apples; return; }
  if (s.apples > lastApples) {
    const full = s.apples >= APPLES && lastApples < APPLES;
    lastApples = s.apples;
    full ? celebrate() : pop(s);
  } else lastApples = s.apples;
}

function pop(s) {
  document.querySelector('.pim-pop')?.remove();
  clearTimeout(popTimer);
  const el = document.createElement('div');
  el.className = 'pim-pop'; el.setAttribute('role', 'status');
  el.innerHTML = `${mascot('eating', 64)}<div><b>Ням! Яблоко ${s.apples} из ${APPLES}</b><span class="apples">${appleRow(s)}</span></div>`;
  document.body.append(el);
  popTimer = setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 400); }, 2600);
}

function celebrate() {
  document.querySelector('.pim-pop')?.remove();
  document.querySelector('.pim-party')?.remove();
  hideNudge();
  const el = document.createElement('div');
  el.className = 'pim-party'; el.setAttribute('role', 'status');
  const rain = reduced() ? '' : Array.from({ length: 14 }, (_, i) => `<i style="--x:${(i * 37) % 100}%;--d:${(i % 5) * 0.18}s;--r:${(i * 53) % 360}deg">${apple(1, 34)}</i>`).join('');
  el.innerHTML = `<div class="rain">${rain}</div><div class="card">${mascot('eating', 130)}<h2>Спасибо! Я сыт!</h2><p>Миска полная — дневная цель выполнена. Пим счастлив и ждёт тебя завтра.</p><button class="btn" type="button">Пожалуйста, Пим!</button></div>`;
  const close = () => { el.classList.add('out'); setTimeout(() => el.remove(), 350); };
  el.addEventListener('click', close);
  document.body.append(el);
  setTimeout(close, 4200);
}

// ---------- напоминание ----------
let nudgeTimer;
function hideNudge() { clearTimeout(nudgeTimer); document.querySelector('.pim-nudge')?.remove(); }

// Вызывается при каждой смене экрана
export function onRoute(view, param) {
  hideNudge();
  if (view === 'train' && param) markStart();
  if (!store.state || ['home', 'progress', 'train', 'test', 'exam', ''].includes(view)) return;
  const s = sat();
  if (!hungry(s) || Date.now() - Number(lsGet(SNOOZE_KEY) || 0) < SNOOZE_MS) return;
  nudgeTimer = setTimeout(() => {
    const el = document.createElement('aside');
    el.className = `pim-nudge st-${s.state}`;
    el.setAttribute('aria-label', 'Ёжик Пим просит есть');
    el.innerHTML = `<button class="x" type="button" aria-label="Скрыть" data-later>×</button>
      <div class="pim-av">${mascot(s.mood, 76)}<span class="rumble" aria-hidden="true">урр…</span></div>
      <div class="bubble"><p>${esc(plea(s, new Date(), 'nudge'))}</p><span class="apples">${appleRow(s)}</span>
      <div class="row gap"><a class="btn small" href="${feedHref()}">Покормить</a><button class="link" type="button" data-later>Позже</button></div></div>`;
    el.addEventListener('click', e => {
      if (e.target.closest('[data-later]')) { lsSet(SNOOZE_KEY, String(Date.now())); el.classList.add('out'); setTimeout(() => el.remove(), 300); }
      if (e.target.closest('a')) el.remove();
    });
    document.body.append(el);
  }, 6000);
}

let inited = false;
export function initPim() {
  lastDay = null; watchFeeding();
  if (!inited) { inited = true; store.on(watchFeeding); }
}
