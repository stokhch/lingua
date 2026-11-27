// Запрос в друзья прямо в приложении: кнопка для строки «Всех учеников», рейтинга и переписки.
// rel — состояние с сервера: 'friend' | 'out' (запрос отправлен) | 'in' (ждёт вашего ответа) | null.
import { store } from './store.js';
import { esc, $$, icon, toast } from './ui.js';

export function reqButton(rel, pid, name, small = true) {
  if (!pid || store.mode !== 'server') return '';
  const cls = `btn ${small ? 'small ' : ''}`;
  const n = esc(name);
  if (rel === 'friend') return `<span class="fr-state" title="${n} у вас в друзьях">${icon('heart')} Друг</span>`;
  if (rel === 'out') return `<button class="${cls}ghost" data-req-cancel="${esc(pid)}" data-name="${n}" title="Запрос отправлен — нажмите, чтобы отозвать">${icon('check')} Запрос отправлен</button>`;
  if (rel === 'in') return `<button class="${cls}" data-req-accept="${esc(pid)}" data-name="${n}">${icon('heart')} Принять в друзья</button>`;
  return `<button class="${cls}ghost" data-req="${esc(pid)}" data-name="${n}" aria-label="Отправить ${n} запрос в друзья">${icon('plus')} В друзья</button>`;
}

// Отправить запрос. Возвращает новое состояние ('out' | 'friend') или null при ошибке.
export async function sendRequest(pid, name) {
  try {
    const r = await store.api('POST', 'api/friends/request', { pid });
    toast(r.status === 'friend' ? `${name} теперь у вас в друзьях` : `Запрос отправлен. ${name} увидит его на странице «Друзья»`);
    window.dispatchEvent(new Event('lingva:unread'));
    return r.status;
  } catch (e) { toast(e.message); return null; }
}

export async function respondRequest(pid, name, accept) {
  try {
    const r = await store.api('POST', 'api/friends/respond', { pid, accept });
    toast(accept ? `${name} теперь у вас в друзьях` : 'Запрос отклонён');
    window.dispatchEvent(new Event('lingva:unread'));
    return r.status ?? null;
  } catch (e) { toast(e.message); return undefined; }
}

export async function cancelRequest(pid) {
  try { await store.api('POST', 'api/friends/cancel', { pid }); toast('Запрос отозван'); return null; }
  catch (e) { toast(e.message); return undefined; }
}

// Повесить обработчики на все кнопки внутри root. onChange(pid, rel) — обновить строку или перерисовать.
export function bindReqButtons(root, onChange) {
  const run = (b, fn) => async () => {
    b.disabled = true;
    const rel = await fn();
    b.disabled = false;
    if (rel !== undefined) onChange(b.dataset.req || b.dataset.reqCancel || b.dataset.reqAccept, rel);
  };
  $$('[data-req]', root).forEach(b => b.onclick = run(b, async () => (await sendRequest(b.dataset.req, b.dataset.name)) ?? undefined));
  $$('[data-req-cancel]', root).forEach(b => b.onclick = run(b, () => cancelRequest(b.dataset.reqCancel)));
  $$('[data-req-accept]', root).forEach(b => b.onclick = run(b, () => respondRequest(b.dataset.reqAccept, b.dataset.name, true)));
}
