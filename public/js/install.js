// Установка Лингвы на экран телефона (PWA).
// Android/Chrome: ловим событие beforeinstallprompt и показываем свою кнопку «Установить».
// iPhone/iPad: системного окна нет, поэтому объясняем путь «Поделиться → На экран „Домой“».
import { $, icon, modal, toast } from './ui.js';

const LS_HIDE = 'lingva-install-hidden';
let deferred = null; // отложенное системное окно установки (Android, Chrome, Edge)
const listeners = new Set();

export const isStandalone = () =>
  window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true;
export const isIOS = (ua = navigator.userAgent, touch = navigator.maxTouchPoints) =>
  /iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && touch > 1); // iPadOS притворяется Mac
const isMobile = () => isIOS() || /android|mobile/i.test(navigator.userAgent);
const hidden = () => { try { return Number(localStorage.getItem(LS_HIDE)) > Date.now(); } catch { return false; } };

/** Можно ли сейчас предложить установку: не установлено и есть способ (системное окно или инструкция для iOS). */
export const canInstall = () => !isStandalone() && (!!deferred || isIOS());

export function initInstall() {
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferred = e; listeners.forEach(f => f()); });
  window.addEventListener('appinstalled', () => { deferred = null; listeners.forEach(f => f()); toast('Лингва на экране телефона — открывайте её одним касанием'); });
}

/** Подписка на «стало можно / нельзя установить» (кнопку перерисовывают, когда браузер разрешил установку). */
export function onInstallChange(f) { listeners.add(f); return () => listeners.delete(f); }

export async function install() {
  if (deferred) {
    const e = deferred; deferred = null;
    e.prompt();
    const { outcome } = await e.userChoice.catch(() => ({}));
    listeners.forEach(f => f());
    return outcome === 'accepted';
  }
  showHowTo();
  return false;
}

export function showHowTo() {
  const share = `<svg class="ios-share" viewBox="0 0 24 24" aria-label="значок «Поделиться»"><path d="M12 3v12M8 7l4-4 4 4"/><path d="M6 11H5v10h14V11h-1"/></svg>`;
  const steps = isIOS()
    ? `<ol class="install-steps"><li>Откройте Лингву в <b>Safari</b> (в Chrome на iPhone тоже работает).</li><li>Нажмите ${share} <b>Поделиться</b> внизу экрана (на iPad — вверху).</li><li>Прокрутите список и выберите <b>«На экран „Домой“»</b>.</li><li>Нажмите <b>«Добавить»</b> — на экране появится ёжик Пим.</li></ol>`
    : `<ol class="install-steps"><li>Откройте меню браузера <b>⋮</b> (в Chrome — справа вверху).</li><li>Выберите <b>«Установить приложение»</b> или <b>«Добавить на главный экран»</b>.</li><li>Подтвердите — иконка с ёжиком Пимом появится на экране.</li></ol>`;
  modal(`<h2>Лингва на экране телефона</h2><p class="muted">Иконка откроет Лингву на весь экран, как обычное приложение, — без адресной строки и поиска вкладки.</p>${steps}<button class="btn" data-close>Понятно</button>`);
}

/** Карточка на главной: только на телефоне, если ещё не установлено и не скрыто на 30 дней. */
export function installCard() {
  return `<section class="band" id="install-card" hidden></section>`;
}
export function fillInstallCard() {
  const el = $('#install-card'); if (!el) return () => {};
  const draw = () => {
    if (!el.isConnected) return;
    const show = canInstall() && isMobile() && !hidden();
    el.hidden = !show; if (!show) { el.innerHTML = ''; return; }
    el.innerHTML = `<div class="action install-cta"><img src="icons/icon-192.png" alt="" width="48" height="48"><div><b>Лингва на экране телефона</b><span>Добавьте иконку — и занимайтесь в одно касание, как в приложении</span></div><div class="row gap"><button class="btn" id="install-go">${icon('plus')} ${deferred ? 'Установить' : 'Как добавить'}</button><button class="btn ghost" id="install-no" aria-label="Скрыть подсказку">${icon('x')}</button></div></div>`;
    $('#install-go', el).onclick = install;
    $('#install-no', el).onclick = () => { try { localStorage.setItem(LS_HIDE, String(Date.now() + 30 * 86400000)); } catch {} draw(); toast('Подсказка скрыта. Установить можно в профиле'); };
  };
  draw();
  return onInstallChange(draw);
}

/** Блок в профиле: виден всегда, пока Лингва не установлена. */
export function installSettings() {
  if (isStandalone()) return '';
  return `<section class="band"><div class="action install-cta"><img src="icons/icon-192.png" alt="" width="48" height="48"><div><b>Иконка на экране телефона</b><span>Лингва откроется на весь экран, как приложение. Работает на Android и iPhone</span></div><button class="btn" id="install-prof">${icon('plus')} Добавить</button></div></section>`;
}
export function bindInstallSettings() { const b = $('#install-prof'); if (b) b.onclick = install; }
