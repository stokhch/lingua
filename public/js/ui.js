// Общие помощники интерфейса: экранирование, иконки, уведомления, маскот.
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
export const shuffle = a => { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
export const plural = (n, one, few, many) => { const m10 = n % 10, m100 = n % 100; return m10 === 1 && m100 !== 11 ? one : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? few : many; };

const P = {
  home: '<path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
  dict: '<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/>',
  sets: '<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/>',
  train: '<path d="M4 9v6M8 6v12M16 6v12M20 9v6M8 12h8"/>',
  read: '<path d="M2 5c3-1 7-1 10 1 3-2 7-2 10-1v14c-3-1-7-1-10 1-3-2-7-2-10-1z"/><path d="M12 6v14"/>',
  grammar: '<path d="M4 20 10 4h1l6 16M6.5 14h8"/><path d="M18 4v6"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
  fire: '<path d="M12 3c1 4 6 6 6 11a6 6 0 0 1-12 0c0-3 2-4 2-7 2 1 3 3 3 5 1-2 1-6 1-9z"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  sound: '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  back: '<path d="M15 5 8 12l7 7"/>',
  cards: '<rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  puzzle: '<path d="M4 8h4a2 2 0 1 1 4 0h4v4a2 2 0 1 1 0 4v4H4z"/>',
  ear: '<path d="M7 10a5 5 0 0 1 10 0c0 3-3 4-3 7a3 3 0 0 1-6 0"/><path d="M10 10a2 2 0 0 1 4 0"/>',
  swap: '<path d="M4 8h14l-3-3M20 16H6l3 3"/>',
  trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 21h8M9 17h6"/>',
  logout: '<path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10"/>'
};
export const icon = (name, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[name] || ''}</svg>`;

// Маскот проекта — ёжик Пим (оригинальный рисунок). mood: happy | calm | sleepy
export function mascot(mood = 'calm', size = 160) {
  const eyes = mood === 'sleepy'
    ? '<path d="M70 92q6 4 12 0M98 92q6 4 12 0" stroke="#2a1d14" stroke-width="3" fill="none" stroke-linecap="round"/>'
    : '<circle cx="76" cy="90" r="5" fill="#2a1d14"/><circle cx="104" cy="90" r="5" fill="#2a1d14"/><circle cx="78" cy="88" r="1.6" fill="#fff"/><circle cx="106" cy="88" r="1.6" fill="#fff"/>';
  const mouth = mood === 'happy' ? '<path d="M82 108q8 9 16 0" stroke="#2a1d14" stroke-width="3" fill="#ff8a7a" stroke-linecap="round"/>'
    : mood === 'sleepy' ? '<ellipse cx="90" cy="110" rx="4" ry="3" fill="#2a1d14"/>' : '<path d="M84 108q6 4 12 0" stroke="#2a1d14" stroke-width="3" fill="none" stroke-linecap="round"/>';
  const spikes = Array.from({ length: 11 }, (_, i) => {
    const a = Math.PI * (0.95 + i * 0.11); const x = 90 + Math.cos(a) * 62, y = 100 + Math.sin(a) * 62;
    const x2 = 90 + Math.cos(a) * 88, y2 = 100 + Math.sin(a) * 88;
    const ax = 90 + Math.cos(a - 0.12) * 60, ay = 100 + Math.sin(a - 0.12) * 60, bx = 90 + Math.cos(a + 0.12) * 60, by = 100 + Math.sin(a + 0.12) * 60;
    return `<path d="M${ax.toFixed(1)} ${ay.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}L${bx.toFixed(1)} ${by.toFixed(1)}Z" fill="${i % 2 ? '#7a4a2a' : '#8f5a35'}"/>`;
  }).join('') + Array.from({ length: 7 }, (_, i) => {
    const a = Math.PI * (1.4 + i * 0.1); const x2 = 90 + Math.cos(a) * 95, y2 = 100 + Math.sin(a) * 95;
    const ax = 90 + Math.cos(a - 0.1) * 55, ay = 100 + Math.sin(a - 0.1) * 55, bx = 90 + Math.cos(a + 0.1) * 55, by = 100 + Math.sin(a + 0.1) * 55;
    return `<path d="M${ax.toFixed(1)} ${ay.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}L${bx.toFixed(1)} ${by.toFixed(1)}Z" fill="#6b3f22"/>`;
  }).join('');
  return `<svg class="mascot ${mood}" width="${size}" height="${size}" viewBox="0 0 180 180" role="img" aria-label="Ёжик Пим">
  <ellipse cx="90" cy="168" rx="58" ry="8" fill="rgba(0,0,0,.12)"/>
  ${spikes}
  <ellipse cx="90" cy="112" rx="56" ry="50" fill="#8f5a35"/>
  <ellipse cx="90" cy="108" rx="40" ry="42" fill="#f6d7a9"/>
  <ellipse cx="90" cy="96" rx="34" ry="32" fill="#fbe4c0"/>
  ${eyes}
  <ellipse cx="66" cy="104" rx="7" ry="4" fill="#ffb3a1" opacity=".7"/><ellipse cx="114" cy="104" rx="7" ry="4" fill="#ffb3a1" opacity=".7"/>
  <ellipse cx="90" cy="100" rx="6" ry="4.5" fill="#2a1d14"/>
  ${mouth}
  <ellipse cx="66" cy="152" rx="12" ry="7" fill="#6b3f22"/><ellipse cx="114" cy="152" rx="12" ry="7" fill="#6b3f22"/>
  <rect x="118" y="112" width="34" height="26" rx="3" fill="#ffcf3f" transform="rotate(12 135 125)"/>
  <path d="M135 113v24" stroke="#c99a12" stroke-width="2" transform="rotate(12 135 125)"/>
</svg>`;
}

let toastBox;
export function toast(text, kind = 'info') {
  if (!toastBox) { toastBox = document.createElement('div'); toastBox.className = 'toasts'; toastBox.setAttribute('role', 'status'); document.body.append(toastBox); }
  const el = document.createElement('div');
  el.className = `toast ${kind}`;
  el.innerHTML = (kind === 'xp' ? icon('star') : kind === 'badge' ? icon('trophy') : kind === 'goal' || kind === 'learned' ? icon('check') : '') + `<span>${esc(text)}</span>`;
  toastBox.append(el);
  setTimeout(() => el.classList.add('out'), 2600);
  setTimeout(() => el.remove(), 3100);
}

export function modal(html, onMount) {
  const wrap = document.createElement('div');
  wrap.className = 'modal-wrap';
  wrap.innerHTML = `<div class="modal" role="dialog" aria-modal="true">${html}</div>`;
  const close = () => { wrap.remove(); document.removeEventListener('keydown', onKey); };
  const onKey = e => { if (e.key === 'Escape') close(); };
  wrap.addEventListener('click', e => { if (e.target === wrap || e.target.closest('[data-close]')) close(); });
  document.addEventListener('keydown', onKey);
  document.body.append(wrap);
  onMount?.(wrap.firstElementChild, close);
  return close;
}
