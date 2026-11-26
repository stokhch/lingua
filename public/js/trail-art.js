// Рисунки для «Тропы»: сундуки и пейзаж (деревья, пальмы, ели, цветы, грибы, горы, ручьи, мостики, бабочки).
// Всё оригинальное SVG. Повторяющиеся рисунки — <symbol>, на тропе они ставятся через <use>, чтобы страница
// оставалась лёгкой и на телефоне.

// Градиенты и символы. Вставляются в документ один раз (нужны и тропе, и окну с открытым сундуком).
const DEFS = `
<linearGradient id="ta-wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c47a3a"/><stop offset="1" stop-color="#8a4a1c"/></linearGradient>
<linearGradient id="ta-wood2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d98d48"/><stop offset="1" stop-color="#a65a24"/></linearGradient>
<linearGradient id="ta-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff1a8"/><stop offset=".45" stop-color="#ffc93a"/><stop offset="1" stop-color="#c98a00"/></linearGradient>
<radialGradient id="ta-glow"><stop offset="0" stop-color="#fff6c2"/><stop offset=".5" stop-color="#ffd34d" stop-opacity=".8"/><stop offset="1" stop-color="#ffb300" stop-opacity="0"/></radialGradient>
<linearGradient id="ta-ruby" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff8aa0"/><stop offset="1" stop-color="#c2123a"/></linearGradient>
<linearGradient id="ta-sapph" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9fe0ff"/><stop offset="1" stop-color="#1f6fd1"/></linearGradient>
<linearGradient id="ta-emer" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a8f5bd"/><stop offset="1" stop-color="#159447"/></linearGradient>
<linearGradient id="ta-leaf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fd36b"/><stop offset="1" stop-color="#25913f"/></linearGradient>
<linearGradient id="ta-leaf2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4cbf5a"/><stop offset="1" stop-color="#1b6f35"/></linearGradient>
<linearGradient id="ta-fir" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3fa86a"/><stop offset="1" stop-color="#155c3a"/></linearGradient>
<linearGradient id="ta-mtn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9aa7e8"/><stop offset=".7" stop-color="#c9d3f5"/><stop offset="1" stop-color="#c9d3f5" stop-opacity="0"/></linearGradient>
<linearGradient id="ta-mtn2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5fae7e"/><stop offset=".55" stop-color="#9fd49a"/><stop offset="1" stop-color="#b8e2a8" stop-opacity="0"/></linearGradient>
<linearGradient id="ta-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fd4f5"/><stop offset="1" stop-color="#3aa3d8"/></linearGradient>

<symbol id="ta-tree" viewBox="0 0 100 110"><ellipse cx="50" cy="106" rx="30" ry="4" fill="rgba(0,0,0,.15)"/>
  <path d="M45 106c2-18 1-30-3-42h16c-4 12-5 24-3 42z" fill="#8a5a2b"/><path d="M50 72l-12-10M52 78l12-12" stroke="#8a5a2b" stroke-width="4" stroke-linecap="round"/>
  <circle cx="30" cy="52" r="22" fill="url(#ta-leaf2)"/><circle cx="70" cy="52" r="22" fill="url(#ta-leaf2)"/><circle cx="50" cy="34" r="28" fill="url(#ta-leaf)"/>
  <circle cx="40" cy="26" r="8" fill="#fff" opacity=".18"/>
  <g fill="#ef4136"><circle cx="34" cy="48" r="4.5"/><circle cx="58" cy="30" r="4.5"/><circle cx="68" cy="56" r="4.5"/><circle cx="46" cy="58" r="4"/></g>
  <g fill="#fff" opacity=".7"><circle cx="33" cy="46.5" r="1.2"/><circle cx="57" cy="28.5" r="1.2"/><circle cx="67" cy="54.5" r="1.2"/></g></symbol>

<symbol id="ta-palm" viewBox="0 0 100 120"><ellipse cx="54" cy="116" rx="24" ry="4" fill="rgba(0,0,0,.15)"/>
  <path d="M50 116c4-30 6-56 0-80" fill="none" stroke="#a8743c" stroke-width="9" stroke-linecap="round"/>
  <path d="M50 116c4-30 6-56 0-80" fill="none" stroke="#7a4f24" stroke-width="9" stroke-dasharray="2 7" stroke-linecap="butt"/>
  <g fill="url(#ta-leaf)"><path d="M50 36C36 22 16 22 4 34c16-4 30 0 46 4z"/><path d="M50 36C60 20 82 18 96 30c-16-2-30 2-46 8z"/>
  <path d="M50 36C40 30 24 40 18 56c10-10 22-14 32-18z"/><path d="M50 36c12-2 26 8 30 22-8-8-18-14-30-20z"/><path d="M50 36C46 24 52 10 64 4c-6 10-10 20-12 32z"/></g>
  <g fill="#7a4a1e"><circle cx="46" cy="40" r="5"/><circle cx="55" cy="41" r="5"/><circle cx="50" cy="45" r="5"/></g></symbol>

<symbol id="ta-fir" viewBox="0 0 80 120"><ellipse cx="40" cy="116" rx="22" ry="4" fill="rgba(0,0,0,.15)"/>
  <rect x="35" y="96" width="10" height="20" rx="2" fill="#7a4f24"/>
  <path d="M40 6L14 48h12L8 76h14L2 100h76L58 76h14L54 48h12z" fill="url(#ta-fir)"/>
  <path d="M40 6L26 30h8L22 52" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="3" stroke-linecap="round"/>
  <g fill="#ffd34d"><circle cx="30" cy="66" r="3"/><circle cx="52" cy="84" r="3"/><circle cx="44" cy="44" r="2.5"/></g></symbol>

<symbol id="ta-bush" viewBox="0 0 100 60"><ellipse cx="50" cy="57" rx="40" ry="3.5" fill="rgba(0,0,0,.13)"/>
  <circle cx="26" cy="38" r="18" fill="url(#ta-leaf2)"/><circle cx="74" cy="38" r="18" fill="url(#ta-leaf2)"/><circle cx="50" cy="30" r="24" fill="url(#ta-leaf)"/><rect x="10" y="38" width="80" height="18" rx="9" fill="#2a8a43"/>
  <g fill="#ff6fa8"><circle cx="34" cy="26" r="4"/><circle cx="60" cy="20" r="4"/><circle cx="72" cy="36" r="4"/><circle cx="46" cy="42" r="4"/></g>
  <g fill="#ffe35a"><circle cx="34" cy="26" r="1.5"/><circle cx="60" cy="20" r="1.5"/><circle cx="72" cy="36" r="1.5"/><circle cx="46" cy="42" r="1.5"/></g></symbol>

<symbol id="ta-tulips" viewBox="0 0 60 60"><g stroke="#2f9a4c" stroke-width="3" stroke-linecap="round" fill="none"><path d="M16 58V30"/><path d="M30 58V22"/><path d="M44 58V32"/></g>
  <path d="M30 58c-10-6-14-14-12-20 6 2 10 8 12 20z" fill="#3aa055"/><path d="M30 58c10-6 14-14 12-20-6 2-10 8-12 20z" fill="#3aa055"/>
  <path d="M9 30c0-9 3-14 7-16 4 2 7 7 7 16-2 4-12 4-14 0z" fill="#ff4f6d"/><path d="M23 22c0-9 3-14 7-16 4 2 7 7 7 16-2 4-12 4-14 0z" fill="#ffb02e"/><path d="M37 32c0-9 3-14 7-16 4 2 7 7 7 16-2 4-12 4-14 0z" fill="#b65cff"/></symbol>

<symbol id="ta-daisy" viewBox="0 0 60 60"><g stroke="#2f9a4c" stroke-width="3" stroke-linecap="round"><path d="M18 58V32"/><path d="M40 58V26"/></g>
  <g fill="#fff" stroke="#e6e0c8" stroke-width="1"><g transform="translate(18 28)"><ellipse rx="4" ry="9" transform="rotate(0)"/><ellipse rx="4" ry="9" transform="rotate(45)"/><ellipse rx="4" ry="9" transform="rotate(90)"/><ellipse rx="4" ry="9" transform="rotate(135)"/></g>
  <g transform="translate(40 20)"><ellipse rx="4" ry="10" transform="rotate(20)"/><ellipse rx="4" ry="10" transform="rotate(65)"/><ellipse rx="4" ry="10" transform="rotate(110)"/><ellipse rx="4" ry="10" transform="rotate(155)"/></g></g>
  <circle cx="18" cy="28" r="4.5" fill="#ffc21a"/><circle cx="40" cy="20" r="5" fill="#ffc21a"/></symbol>

<symbol id="ta-sunflower" viewBox="0 0 60 80"><path d="M30 78V34" stroke="#2f9a4c" stroke-width="4" stroke-linecap="round"/><path d="M30 60c-12-2-18-10-18-16 8 0 16 6 18 16z" fill="#3aa055"/>
  <g transform="translate(30 26)" fill="#ffcc1a" stroke="#e59b00" stroke-width="1">${Array.from({ length: 12 }, (_, i) => `<ellipse cx="0" cy="-15" rx="5" ry="10" transform="rotate(${i * 30})"/>`).join('')}</g>
  <circle cx="30" cy="26" r="10" fill="#7a4a1e"/><g fill="#5a3412"><circle cx="27" cy="23" r="1.6"/><circle cx="33" cy="24" r="1.6"/><circle cx="30" cy="29" r="1.6"/></g></symbol>

<symbol id="ta-mushroom" viewBox="0 0 60 50"><ellipse cx="30" cy="47" rx="22" ry="3" fill="rgba(0,0,0,.13)"/>
  <rect x="16" y="28" width="12" height="18" rx="5" fill="#fff3dc"/><path d="M4 30c0-16 10-24 18-24s18 8 18 24z" fill="#ec3b2f"/>
  <g fill="#fff"><circle cx="14" cy="20" r="3.5"/><circle cx="26" cy="14" r="3"/><circle cx="32" cy="24" r="3"/></g>
  <rect x="38" y="34" width="8" height="12" rx="3" fill="#fff3dc"/><path d="M32 36c0-9 6-13 10-13s10 4 10 13z" fill="#ff8a1f"/><circle cx="40" cy="30" r="2" fill="#fff"/></symbol>

<symbol id="ta-rock" viewBox="0 0 70 40"><ellipse cx="35" cy="37" rx="30" ry="3" fill="rgba(0,0,0,.13)"/>
  <path d="M6 36c0-14 8-26 22-28 12-2 22 4 28 12 6 8 8 16 6 16z" fill="#a3aab5"/><path d="M14 22c4-8 12-12 20-12" stroke="#d3d8df" stroke-width="4" stroke-linecap="round" fill="none"/>
  <path d="M8 36c4-8 12-10 18-8 6-6 14-6 18 0 6-2 12 0 16 8z" fill="#5fae4f"/></symbol>

<symbol id="ta-grass" viewBox="0 0 40 24"><g fill="#43b05a"><path d="M4 24C6 14 4 8 2 4c6 4 8 12 8 20z"/><path d="M12 24c0-10 2-18 8-22-2 8-2 14 0 22z"/><path d="M22 24c2-8 6-14 12-16-4 6-6 10-6 16z"/><path d="M30 24c0-6 4-10 8-12-2 4-2 8-2 12z"/></g></symbol>

<symbol id="ta-mountains" viewBox="0 0 400 130" preserveAspectRatio="none">
  <path d="M0 130L40 60 70 84 120 20 170 80 200 56 250 6 300 74 330 48 370 80 400 52V130z" fill="url(#ta-mtn)"/>
  <g fill="#fff"><path d="M120 20l-14 20 8-2 6 6 6-6 8 2z"/><path d="M250 6l-17 24 9-3 8 7 8-7 9 3z"/><path d="M40 60l-9 14 5-1 4 4 4-4 5 1z"/></g>
  <path d="M0 130L30 96 70 110 110 72 160 108 210 70 260 104 300 82 350 110 400 86V130z" fill="url(#ta-mtn2)"/></symbol>

<symbol id="ta-bridge" viewBox="0 0 60 56"><rect x="6" y="4" width="48" height="48" rx="4" fill="#9a5f2c"/>
  <g fill="#c98a4b" stroke="#7a4a1e" stroke-width="1.5">${Array.from({ length: 6 }, (_, i) => `<rect x="6" y="${5 + i * 8}" width="48" height="6.5" rx="2"/>`).join('')}</g>
  <g stroke="#6b3f1a" stroke-width="4" stroke-linecap="round"><path d="M4 2v52M56 2v52"/></g><g fill="#6b3f1a"><circle cx="4" cy="2" r="3.5"/><circle cx="56" cy="2" r="3.5"/><circle cx="4" cy="54" r="3.5"/><circle cx="56" cy="54" r="3.5"/></g></symbol>

<symbol id="ta-fly" viewBox="0 0 30 24"><g class="wing"><path d="M15 12C10 2 2 2 2 8s8 6 13 4z" fill="#ff7ab8"/><path d="M15 12c-4 4-10 10-6 10s6-4 6-10z" fill="#ffb3d6"/></g>
  <g class="wing r"><path d="M15 12C20 2 28 2 28 8s-8 6-13 4z" fill="#ff7ab8"/><path d="M15 12c4 4 10 10 6 10s-6-4-6-10z" fill="#ffb3d6"/></g><rect x="14" y="7" width="2" height="12" rx="1" fill="#4a2a10"/></symbol>

<symbol id="ta-fly2" viewBox="0 0 30 24"><g class="wing"><path d="M15 12C10 2 2 2 2 8s8 6 13 4z" fill="#4fc3ff"/><path d="M15 12c-4 4-10 10-6 10s6-4 6-10z" fill="#ffe35a"/></g>
  <g class="wing r"><path d="M15 12C20 2 28 2 28 8s-8 6-13 4z" fill="#4fc3ff"/><path d="M15 12c4 4 10 10 6 10s-6-4-6-10z" fill="#ffe35a"/></g><rect x="14" y="7" width="2" height="12" rx="1" fill="#4a2a10"/></symbol>
`;

export function ensureDefs() {
  if (document.getElementById('ta-defs')) return;
  const box = document.createElement('div');
  box.innerHTML = `<svg id="ta-defs" width="0" height="0" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true"><defs>${DEFS}</defs></svg>`;
  document.body.prepend(box.firstElementChild);
}

// ---------- сундук ----------
// state: locked | ready | open. Оригинальный рисунок: деревянный сундук с золотыми оковками и самоцветами.
export function chestSvg(state, size = 88) {
  const gem = state === 'locked' ? '#8d96a3' : 'url(#ta-ruby)';
  const body = `
    <rect x="10" y="46" width="80" height="38" rx="6" fill="url(#ta-wood)" stroke="#4a2a10" stroke-width="3"/>
    <path d="M12 58h76M12 71h76" stroke="#6b3a14" stroke-width="2" opacity=".55"/>
    <rect x="20" y="46" width="9" height="38" fill="url(#ta-gold)" stroke="#8a5d00" stroke-width="1.5"/><rect x="71" y="46" width="9" height="38" fill="url(#ta-gold)" stroke="#8a5d00" stroke-width="1.5"/>
    <rect x="8" y="78" width="84" height="8" rx="3" fill="url(#ta-gold)" stroke="#8a5d00" stroke-width="1.5"/>
    <g fill="#fff4b8"><circle cx="24.5" cy="52" r="1.8"/><circle cx="24.5" cy="72" r="1.8"/><circle cx="75.5" cy="52" r="1.8"/><circle cx="75.5" cy="72" r="1.8"/></g>`;
  const lock = `<path d="M41 48h18v16l-9 7-9-7z" fill="url(#ta-gold)" stroke="#8a5d00" stroke-width="2" stroke-linejoin="round"/>
    <path d="M50 54a3 3 0 0 1 2 5l1 5h-6l1-5a3 3 0 0 1 2-5z" fill="#5a3a00"/>`;
  if (state === 'open') {
    return `<svg class="chest-svg open" width="${size}" height="${size}" viewBox="0 0 100 100" aria-hidden="true">
      <ellipse cx="50" cy="92" rx="40" ry="5" fill="rgba(0,0,0,.18)"/>
      <circle cx="50" cy="40" r="38" fill="url(#ta-glow)" class="glow"/>
      <path d="M14 44Q14 8 50 6Q86 8 86 44L80 30Q50 0 20 30Z" fill="url(#ta-wood2)" stroke="#4a2a10" stroke-width="3" stroke-linejoin="round" class="lid"/>
      <path d="M24 26Q50 4 76 26" fill="none" stroke="url(#ta-gold)" stroke-width="6"/>
      <rect x="12" y="40" width="76" height="10" rx="3" fill="#3a1e08"/>
      <g class="loot">
        <g fill="url(#ta-gold)" stroke="#8a5d00" stroke-width="1.2"><ellipse cx="24" cy="44" rx="7" ry="3"/><ellipse cx="76" cy="44" rx="7" ry="3"/><ellipse cx="66" cy="40" rx="7" ry="3"/><ellipse cx="32" cy="39" rx="6" ry="2.6"/></g>
        <circle cx="38" cy="36" r="9" fill="#e8372c"/><circle cx="52" cy="31" r="10" fill="#f2492f"/><circle cx="64" cy="37" r="8.5" fill="#e8372c"/>
        <g fill="#fff" opacity=".75"><circle cx="35" cy="33" r="2.2"/><circle cx="49" cy="27" r="2.5"/><circle cx="61" cy="34" r="2"/></g>
        <path d="M52 22v-5" stroke="#6b3f22" stroke-width="2.4" stroke-linecap="round"/><path d="M53 19c3-3 7-3 9-1-3 3-6 3-9 1z" fill="#3aa055"/>
        <path d="M44 42l4-6 4 6-4 4z" fill="url(#ta-sapph)"/><path d="M58 44l3-5 3 5-3 3z" fill="url(#ta-emer)"/>
      </g>
      ${body}${lock}
      <g class="spark" fill="#fff"><path d="M18 14l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z"/><path d="M84 18l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2z"/><path d="M70 4l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z"/></g>
    </svg>`;
  }
  return `<svg class="chest-svg ${state}" width="${size}" height="${size}" viewBox="0 0 100 100" aria-hidden="true">
    <ellipse cx="50" cy="92" rx="40" ry="5" fill="rgba(0,0,0,.18)"/>
    ${body}
    <path d="M8 48Q8 14 50 14Q92 14 92 48Z" fill="url(#ta-wood2)" stroke="#4a2a10" stroke-width="3" stroke-linejoin="round"/>
    <path d="M18 32Q50 10 82 32" fill="none" stroke="#fff" stroke-opacity=".2" stroke-width="3" stroke-linecap="round"/>
    <path d="M20 46Q20 20 25 18M80 46Q80 20 75 18" fill="none" stroke="url(#ta-gold)" stroke-width="8"/>
    <rect x="6" y="42" width="88" height="8" rx="3" fill="url(#ta-gold)" stroke="#8a5d00" stroke-width="1.5"/>
    <path d="M50 16l6 8-6 8-6-8z" fill="${gem}" stroke="#7a0a20" stroke-width="1.2"/><circle cx="48" cy="21" r="1.5" fill="#fff" opacity=".8"/>
    <path d="M32 26l3 4-3 4-3-4z" fill="${state === 'locked' ? '#8d96a3' : 'url(#ta-sapph)'}"/><path d="M68 26l3 4-3 4-3-4z" fill="${state === 'locked' ? '#8d96a3' : 'url(#ta-emer)'}"/>
    ${lock}
    ${state === 'locked' ? '<g transform="translate(66 56)"><rect x="0" y="8" width="20" height="16" rx="3" fill="#6d7580" stroke="#3f454d" stroke-width="2"/><path d="M4 9V5a6 6 0 0 1 12 0v4" fill="none" stroke="#3f454d" stroke-width="3"/><circle cx="10" cy="15" r="2.4" fill="#2b3036"/></g>'
      : '<g class="spark" fill="#fff"><path d="M14 10l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z"/><path d="M88 22l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2z"/></g>'}
  </svg>`;
}

// ---------- пейзаж ----------
// Простой детерминированный «случай», чтобы пейзаж не прыгал при каждой перерисовке
export const rnd = n => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

const BIG = [['ta-tree', 100, 110], ['ta-palm', 100, 120], ['ta-fir', 80, 120], ['ta-tree', 100, 110], ['ta-palm', 100, 120]];
const SMALL = [['ta-tulips', 60, 60], ['ta-mushroom', 60, 50], ['ta-daisy', 60, 60], ['ta-sunflower', 60, 80], ['ta-rock', 70, 40], ['ta-bush', 100, 60]];

// Рисунок символа: (cx, низ) — точка опоры, w — желаемая ширина
export function use(id, vw, vh, cx, bottom, w, cls = '') {
  const h = (w * vh) / vw;
  return `<use href="#${id}" x="${(cx - w / 2).toFixed(1)}" y="${(bottom - h).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}"${cls ? ` class="${cls}"` : ''}/>`;
}
export const bigItem = (i, cx, bottom, w) => { const [id, vw, vh] = BIG[Math.floor(rnd(i) * BIG.length)]; return use(id, vw, vh, cx, bottom, w * (vw / 100)); };
export const smallItem = (i, cx, bottom, w) => { const [id, vw, vh] = SMALL[Math.floor(rnd(i + 0.5) * SMALL.length)]; return use(id, vw, vh, cx, bottom, w * (vw / 60) * (id === 'ta-bush' ? 0.8 : 1)); };

// Волнистый ручей поперёк тропы на высоте y
export function stream(W, y, k) {
  const amp = 10, n = 4, step = W / n;
  let d = `M-10 ${y}`;
  for (let j = 0; j < n; j++) { const x0 = j * step, s = (j + k) % 2 ? 1 : -1; d += ` Q${(x0 + step / 2).toFixed(1)} ${y + s * amp} ${(x0 + step).toFixed(1)} ${y}`; }
  d += ` L${W + 10} ${y}`;
  return `<g class="stream"><path d="${d}" stroke="#2b86b8" stroke-width="30" opacity=".35"/><path d="${d}" stroke="url(#ta-water)" stroke-width="24"/><path d="${d}" class="ripple" stroke="#fff" stroke-width="3" stroke-dasharray="10 26" opacity=".8"/>
    <path d="${d}" class="ripple r2" stroke="#e8fbff" stroke-width="2" stroke-dasharray="4 40" opacity=".9" transform="translate(0 6)"/></g>`;
}
