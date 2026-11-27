// Пейзажи и достопримечательности страны изучаемого языка — оригинальные SVG-иллюстрации.
// На широком экране стоят по бокам страницы, на узком — открыткой-панорамой над подвалом.
import { lianas } from './jungle.js';

const W = 320, H = 1000;
const n = v => +v.toFixed(1);

// ---------- общие детали ----------
const sky = (id, stops) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
const sun = (x, y, r, c = '#ffd76a', glow = .35) => `<circle cx="${x}" cy="${y}" r="${r * 2.4}" fill="${c}" opacity="${glow * .4}"/><circle cx="${x}" cy="${y}" r="${r * 1.5}" fill="${c}" opacity="${glow}"/><circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
const cloud = (x, y, s = 1, c = '#fff', o = .85) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}" opacity="${o}"><ellipse cx="0" cy="0" rx="34" ry="14"/><ellipse cx="-22" cy="4" rx="22" ry="11"/><ellipse cx="24" cy="5" rx="24" ry="10"/><ellipse cx="4" cy="-10" rx="20" ry="13"/></g>`;
const birds = (x, y, c = '#2b3a2a') => [[0, 0, 1], [26, 10, .8], [-18, 16, .7]].map(([dx, dy, s]) => `<path d="M${x + dx - 9 * s} ${y + dy}q${5 * s} ${-6 * s} ${9 * s} 0q${4 * s} ${-6 * s} ${9 * s} 0" stroke="${c}" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('');
const water = (y, c1, c2) => `<rect x="0" y="${y}" width="${W}" height="${H - y}" fill="${c1}"/>` +
  Array.from({ length: 9 }, (_, i) => `<path d="M${(i * 53) % 300 - 10} ${y + 18 + i * 26}h${40 + (i % 3) * 18}" stroke="${c2}" stroke-width="3" stroke-linecap="round" opacity=".55"/>`).join('');
const pine = (x, y, h, c = '#1f5a34') => `<path d="M${x} ${y - h}L${x + h * .32} ${y - h * .35}H${x + h * .18}L${x + h * .4} ${y}H${x - h * .4}L${x - h * .18} ${y - h * .35}H${x - h * .32}Z" fill="${c}"/>`;
const olive = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-3 0q2-20-4-34M3 0q-1-18 6-30" stroke="#6b5a3a" stroke-width="5" fill="none"/><ellipse cx="-12" cy="-40" rx="22" ry="14" fill="#7c9a52"/><ellipse cx="12" cy="-44" rx="20" ry="13" fill="#8fae62"/><ellipse cx="0" cy="-54" rx="16" ry="11" fill="#9cbb6e"/></g>`;
const flowers = (y, seed, colors) => Array.from({ length: 22 }, (_, i) => { const x = (i * 71 + seed * 13) % W, yy = y + ((i * 37) % 60); return `<circle cx="${x}" cy="${yy}" r="${2.5 + (i % 3)}" fill="${colors[i % colors.length]}"/>`; }).join('');

// ---------- Англия: Лондон ----------
function london() {
  const win = (x, y, w, h, rows, cols, c) => { let s = ''; for (let r = 0; r < rows; r++) for (let k = 0; k < cols; k++) s += `<rect x="${n(x + k * w / cols + 2)}" y="${n(y + r * h / rows + 3)}" width="${n(w / cols - 4)}" height="${n(h / rows - 7)}" rx="2" fill="${c}"/>`; return s; };
  return `<defs>${sky('skL', [[0, '#7fb2d9'], [.55, '#f3d79b'], [1, '#f6b878']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#skL)"/>${sun(250, 560, 34, '#ffe08a')}${cloud(80, 160, 1.1)}${cloud(250, 260, .8)}${birds(90, 330)}
  <!-- здание парламента -->
  <path d="M0 700V610h20v-30l8-14 8 14v30h24v-20l6-10 6 10v20h30v90z" fill="#9c7a4e"/>
  ${win(0, 620, 96, 70, 2, 6, '#e8c98a')}
  <!-- башня с часами -->
  <rect x="120" y="420" width="64" height="300" fill="#a8834f"/>
  <rect x="114" y="400" width="76" height="40" fill="#b8925a"/>
  <rect x="110" y="380" width="84" height="24" fill="#8d6c40"/>
  <circle cx="152" cy="342" r="34" fill="#b8925a"/><rect x="118" y="312" width="68" height="70" fill="#b8925a"/>
  <circle cx="152" cy="346" r="27" fill="#fff4d8" stroke="#6d5330" stroke-width="4"/>
  <path d="M152 346V328M152 346l12 7" stroke="#2b2015" stroke-width="3.5" stroke-linecap="round"/>
  <rect x="122" y="268" width="60" height="44" fill="#8d6c40"/>${win(124, 270, 56, 40, 1, 3, '#f0d79a')}
  <path d="M116 270L152 170L188 270Z" fill="#6d5330"/><path d="M152 170V120" stroke="#6d5330" stroke-width="4"/><circle cx="152" cy="118" r="5" fill="#d9a521"/>
  ${win(124, 450, 56, 250, 8, 3, '#d8b878')}
  <path d="M184 720V560h40v-24l10-16 10 16v24h76v160z" fill="#9c7a4e"/>${win(186, 570, 134, 140, 3, 6, '#e8c98a')}
  <!-- мост и Темза -->
  ${water(760, '#4f86a8', '#a9d2e8')}
  <rect x="0" y="720" width="${W}" height="22" fill="#5e6e5a"/><rect x="0" y="742" width="${W}" height="18" fill="#3e4a3c"/>
  ${[30, 130, 230].map(x => `<path d="M${x - 40} 760q40-46 80 0z" fill="#3e4a3c"/>`).join('')}
  <!-- красный двухэтажный автобус -->
  <g transform="translate(40 664)"><rect width="110" height="58" rx="8" fill="#d63a2a"/><rect x="0" y="28" width="110" height="4" fill="#9c2414"/>
  ${[8, 34, 60, 86].map(x => `<rect x="${x}" y="7" width="18" height="15" rx="2" fill="#cfe6f2"/><rect x="${x}" y="36" width="18" height="13" rx="2" fill="#cfe6f2"/>`).join('')}
  <circle cx="24" cy="58" r="9" fill="#222"/><circle cx="88" cy="58" r="9" fill="#222"/><circle cx="24" cy="58" r="4" fill="#999"/><circle cx="88" cy="58" r="4" fill="#999"/></g>`;
}

// ---------- США: Нью-Йорк ----------
function newYork() {
  const tower = (x, w, h, c) => `<rect x="${x}" y="${720 - h}" width="${w}" height="${h}" fill="${c}"/>` + Array.from({ length: Math.floor(h / 22) }, (_, r) => Array.from({ length: Math.floor(w / 12) }, (_, k) => (r * 7 + k * 3 + x) % 5 ? `<rect x="${x + 4 + k * 12}" y="${728 - h + r * 22}" width="6" height="10" fill="#ffe7a3" opacity=".8"/>` : '').join('')).join('');
  return `<defs>${sky('skN', [[0, '#2c4a7a'], [.5, '#e98f6a'], [1, '#f7c77d']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#skN)"/>${sun(70, 610, 30, '#ffcf6a', .3)}${cloud(220, 180, 1, '#ffd9c2', .7)}${cloud(70, 300, .7, '#ffd9c2', .6)}
  ${tower(0, 46, 220, '#3b3f5c')}${tower(220, 52, 260, '#3b3f5c')}${tower(276, 44, 190, '#454a6a')}${tower(46, 38, 150, '#454a6a')}
  <!-- небоскрёб со шпилем -->
  <path d="M150 720V380h14v-40h10v-50h6V200h4v90h6v50h10v40h14v340z" fill="#2e3350"/>
  ${Array.from({ length: 14 }, (_, r) => `<rect x="${154}" y="${392 + r * 23}" width="56" height="3" fill="#ffe7a3" opacity=".35"/>`).join('')}
  ${tower(92, 50, 300, '#353a58')}
  ${water(720, '#365e86', '#8fb7d6')}
  <!-- статуя с факелом на острове -->
  <g transform="translate(250 0)">
    <path d="M-50 1000V860h100v140z" fill="#5a6b5a"/><path d="M-30 860l8-60h44l8 60z" fill="#8a8f84"/><rect x="-26" y="790" width="52" height="12" fill="#9aa094"/>
    <path d="M-20 790q-4-90 6-150l14-10 14 10q10 60 6 150z" fill="#5fae96"/>
    <path d="M-8 640q-4-26 8-34q14 8 8 34z" fill="#6cbca3"/>
    <path d="M-12 612l-6-14M-4 606l-4-16M4 606l4-16M12 612l6-14M0 604v-17" stroke="#6cbca3" stroke-width="4" stroke-linecap="round"/>
    <path d="M10 650l22-90" stroke="#5fae96" stroke-width="11" stroke-linecap="round"/>
    <path d="M26 560h14l-3 12h-8z" fill="#d9a521"/><path d="M33 558q-10-14 0-28q10 14 0 28z" fill="#ffb020"/>
    <rect x="-24" y="680" width="10" height="26" rx="2" fill="#4f9c85" transform="rotate(-12 -19 693)"/>
  </g>`;
}

// ---------- Турция: Стамбул ----------
function istanbul() {
  const minaret = (x, h) => `<rect x="${x - 5}" y="${700 - h}" width="10" height="${h}" fill="#e8ddc7"/><rect x="${x - 8}" y="${700 - h * .62}" width="16" height="5" fill="#cbbd9f"/><rect x="${x - 8}" y="${700 - h * .85}" width="16" height="5" fill="#cbbd9f"/><path d="M${x - 6} ${700 - h}L${x} ${700 - h - 46}L${x + 6} ${700 - h}Z" fill="#5d7d96"/>`;
  return `<defs>${sky('skI', [[0, '#5a7fc0'], [.45, '#f0a868'], [.8, '#f7d08a'], [1, '#f2b97a']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#skI)"/>${sun(70, 520, 38, '#ffd26a')}${cloud(230, 150, 1, '#fff2df', .75)}${birds(220, 300, '#4b3a2a')}${birds(60, 260, '#4b3a2a')}
  ${minaret(26, 380)}${minaret(294, 380)}${minaret(70, 300)}${minaret(250, 300)}
  <path d="M40 700V600h240v100z" fill="#e3d6bc"/>
  <path d="M70 600q0-60 40-70h100q40 10 40 70z" fill="#d8c9aa"/>
  <path d="M90 560a70 70 0 0 1 140 0z" fill="#b9c7cf"/><path d="M95 560a65 65 0 0 1 130 0" fill="none" stroke="#8ea4b0" stroke-width="3"/>
  <path d="M106 520a54 54 0 0 1 108 0z" fill="#a9bcc7"/><path d="M160 466v-22" stroke="#d9a521" stroke-width="4"/><circle cx="160" cy="440" r="5" fill="#d9a521"/>
  ${[60, 230].map(x => `<path d="M${x} 600a30 30 0 0 1 60 0z" fill="#b9c7cf"/>`).join('')}
  ${Array.from({ length: 9 }, (_, i) => `<path d="M${54 + i * 25} 690v-40a8 8 0 0 1 16 0v40z" fill="#9a8a6a"/>`).join('')}
  <path d="M0 700h${W}v14H0z" fill="#b9a780"/>
  ${water(714, '#2f6e96', '#9ccbe3')}
  <!-- паром на Босфоре -->
  <g transform="translate(150 800)"><path d="M-70 0h140l-16 26h-108z" fill="#f4f1ea"/><rect x="-46" y="-22" width="92" height="22" rx="3" fill="#f4f1ea"/><rect x="-40" y="-16" width="80" height="8" fill="#2f4d6e"/><rect x="-6" y="-42" width="12" height="20" fill="#d63a2a"/><path d="M-70 0h140" stroke="#2f4d6e" stroke-width="4"/></g>`;
}

// ---------- Турция: Каппадокия ----------
function cappadocia() {
  const balloon = (x, y, s, c1, c2) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0c-34 0-40 34-30 54l22 30h16l22-30c10-20 4-54-30-54z" fill="${c1}"/><path d="M0 0c-12 0-14 40-8 84h16c6-44 4-84-8-84z" fill="${c2}"/><path d="M-8 84l2 14M8 84l-2 14" stroke="#5b4a33" stroke-width="2"/><rect x="-7" y="98" width="14" height="11" rx="2" fill="#8a6a3e"/></g>`;
  const chimney = (x, w, h, c) => `<path d="M${x - w / 2} 800q${w * .15} ${-h * .6} ${w * .35} ${-h}h${w * .3}q${w * .2} ${h * .4} ${w * .35} ${h}z" fill="${c}"/><ellipse cx="${x}" cy="${800 - h}" rx="${w * .26}" ry="${w * .12}" fill="#8a5d3c"/>
    <rect x="${x - 5}" y="${800 - h * .55}" width="10" height="14" rx="5" fill="#5e3f28" opacity=".7"/>`;
  return `<defs>${sky('skC', [[0, '#8ec2e8'], [.6, '#f8d9a8'], [1, '#f2c08a']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#skC)"/>${sun(260, 430, 26, '#ffe08a', .3)}
  ${balloon(90, 130, 1, '#e0533c', '#f6c34a')}${balloon(230, 240, .75, '#3c8fd0', '#f4f1ea')}${balloon(60, 380, .55, '#7a4fb0', '#f6c34a')}${balloon(200, 470, .45, '#2e9a5c', '#f4e3a8')}${balloon(280, 120, .4, '#f08a24', '#e0533c')}
  <path d="M0 640q80-50 160-20t160-30V${H}H0z" fill="#d9b48a"/>
  ${chimney(40, 70, 190, '#e7c9a0')}${chimney(120, 60, 150, '#dcbb90')}${chimney(200, 80, 220, '#e9cfa8')}${chimney(285, 64, 170, '#dcbb90')}
  <path d="M0 790q90-20 170 0t150-6V${H}H0z" fill="#c99d6e"/><path d="M0 860q120-30 320 0V${H}H0z" fill="#b8875a"/>
  ${flowers(880, 3, ['#e0533c', '#f6c34a', '#fff'])}`;
}

// ---------- Кавказ: Эльбрус ----------
function elbrus() {
  return `<defs>${sky('skE', [[0, '#5d94cf'], [.55, '#bfe0f4'], [1, '#e9f4f8']])}<linearGradient id="snE" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#cfe2ee"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#skE)"/>${sun(60, 150, 26, '#fff3c2', .4)}${cloud(250, 120, .9)}${cloud(60, 300, .7, '#fff', .7)}${birds(200, 220, '#334')}
  <!-- двуглавый Эльбрус -->
  <path d="M-40 640L70 380l40 30 40-70 60 60 50-60 120 300z" fill="#7d93a8"/>
  <path d="M40 450l30-70 40 30 40-70 60 60 50-60 40 90-30-10-30 30-26-40-40 30-30-40-36 30-20-40-30 40z" fill="url(#snE)"/>
  <path d="M150 340l-14 40 18-12 10 26 14-22 32 18z" fill="#fff" opacity=".7"/>
  <path d="M0 600l90-80 60 50 70-70 100 90V${H}H0z" fill="#5f7d6c"/>
  <path d="M0 680q80-60 160-30t160-20V${H}H0z" fill="#4f9a5a"/>
  ${pine(30, 700, 70)}${pine(62, 712, 54, '#28703f')}${pine(270, 690, 80)}${pine(300, 705, 60, '#28703f')}
  <path d="M0 760q100-40 320 0V${H}H0z" fill="#6fb85e"/>
  ${flowers(790, 1, ['#f6c34a', '#e8eef2', '#b85cc6', '#e0533c'])}
  <!-- пастушья тропа и камни -->
  <path d="M150 1000q-20-80 30-140t-10-110" stroke="#c9b27e" stroke-width="10" fill="none" stroke-linecap="round" opacity=".8"/>
  <ellipse cx="240" cy="880" rx="26" ry="12" fill="#8d9a9a"/><ellipse cx="80" cy="930" rx="20" ry="9" fill="#8d9a9a"/>`;
}

// ---------- Кавказ: ущелье с родовой башней ----------
function gorge() {
  return `<defs>${sky('skG', [[0, '#6f9fd6'], [.6, '#d8ecf2'], [1, '#eef6f2']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#skG)"/>${cloud(170, 170, 1)}${cloud(60, 90, .6, '#fff', .7)}
  <path d="M60 520l60-160 40 60 50-110 60 120 50-60V700H60z" fill="#a9bccd"/><path d="M160 420l50-110 30 60-18-6-14 24-16-18z" fill="#fff"/>
  <path d="M0 260l40 60 30 200 40 120 10 400H0z" fill="#6c665c"/><path d="M0 300l30 40 20 180 30 100" stroke="#57524a" stroke-width="6" fill="none"/>
  <path d="M320 220l-40 90-20 210-50 140-20 340h130z" fill="#756e63"/><path d="M320 300l-30 40-14 200-40 110" stroke="#5f594f" stroke-width="6" fill="none"/>
  <!-- каменная башня -->
  <g transform="translate(250 560)">
    <path d="M-26 0l4-170h44l4 170z" fill="#c9b99a"/><path d="M-26 170L-22 0" stroke="none"/>
    <path d="M-24 -170l24-40 24 40z" fill="#8a7a62"/>
    ${[-140, -100, -60, -20].map(y => `<rect x="-6" y="${y}" width="12" height="18" rx="2" fill="#4a4034"/>`).join('')}
    ${Array.from({ length: 8 }, (_, i) => `<path d="M-24 ${-150 + i * 20}h48" stroke="#b5a586" stroke-width="2"/>`).join('')}
  </g>
  <path d="M110 1000q30-120 40-230t20-90q10 30 20 100t30 220z" fill="#4aa0c8"/>
  <path d="M140 960q10-80 18-160M176 980q-4-90 -6-170" stroke="#bfe6f5" stroke-width="3" opacity=".8"/>
  ${pine(20, 760, 90)}${pine(55, 800, 70, '#28703f')}${pine(290, 820, 80)}${pine(96, 900, 60)}
  <path d="M0 900q60-30 110-10V${H}H0zM320 900q-60-30 -110 0V${H}h110z" fill="#4f9a5a"/>
  ${flowers(930, 7, ['#f6c34a', '#fff', '#b85cc6'])}`;
}

// ---------- Греция: Акрополь ----------
function acropolis() {
  return `<defs>${sky('skA', [[0, '#3f8ed6'], [.6, '#a9d6f2'], [1, '#f3e6c4']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#skA)"/>${sun(250, 170, 34, '#fff1b0', .45)}${cloud(80, 220, .9)}
  <path d="M-20 700q40-150 170-170t190 120V${H}H-20z" fill="#c9a77a"/>
  <path d="M-20 720q60-120 180-140t180 90V${H}H-20z" fill="#b48d5e"/>
  <!-- храм с колоннадой -->
  <g transform="translate(160 560)">
    <path d="M-120 -8h240v14h-240z" fill="#e9dfc8"/><path d="M-126 6h252v10h-252z" fill="#d9cdb2"/>
    ${Array.from({ length: 9 }, (_, i) => `<rect x="${-110 + i * 27}" y="-118" width="14" height="110" fill="#f2ead6"/><rect x="${-110 + i * 27}" y="-118" width="3" height="110" fill="#d9cdb2"/>`).join('')}
    <path d="M-122 -118h244v-14h-244z" fill="#e9dfc8"/><path d="M-126 -132h252l-126-40z" fill="#efe6cf"/><path d="M-100 -136h200l-100-30z" fill="#ddd0b2"/>
  </g>
  ${olive(40, 820, 1.1)}${olive(280, 800, .9)}${olive(120, 880, .8)}
  <path d="M0 900q160-30 320 0V${H}H0z" fill="#8fae62"/>${flowers(920, 5, ['#fff', '#f6c34a', '#e0533c'])}`;
}

// ---------- Греция: Санторини ----------
// Кальдера: слоистый обрыв, по нему уступами — белые домики с плоскими и сводчатыми крышами,
// церковь с синим куполом и звонницей, ветряная мельница наверху, внизу море и вулканический островок.
function santorini() {
  const edge = y => n(158 - (y - 470) * .26);           // левый край обрыва на высоте y
  const W8 = [38, 30, 44, 34, 40, 28, 46, 36];
  const house = (x, base, w, h, i) => {
    const vault = i % 4 === 1;
    return `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="#fbfaf6"/>` +
      `<rect x="${n(x + w - 5)}" y="${base - h}" width="5" height="${h}" fill="#e3e6ea"/>` +
      (vault ? `<path d="M${x} ${base - h}a${w / 2} ${h * .3} 0 0 1 ${w} 0z" fill="#fbfaf6"/>` : `<rect x="${x - 1}" y="${base - h - 3}" width="${w + 2}" height="3" fill="#eef0f2"/>`) +
      `<rect x="${n(x + w * .22)}" y="${base - 15}" width="8" height="15" fill="${i % 3 ? '#2f6fb5' : '#1f4f8a'}"/>` +
      (w > 32 ? `<rect x="${n(x + w * .6)}" y="${base - h + 9}" width="7" height="7" fill="#2f6fb5"/>` : '');
  };
  const rows = [480, 526, 572, 618, 664, 710];
  let houses = '';
  rows.forEach((base, r) => {
    let x = edge(base) + 10, i = r * 3;
    while (x < W - 10) {
      const w = W8[i % W8.length], h = 30 + (i * 7) % 12;
      if (!(r === 0 && x > 196 && x < 262) && (i * 5 + r) % 4 !== 2) houses += house(n(x), base, Math.min(w, W - x), h, i);
      x += w + 5 + (i % 3) * 3; i++;
    }
    // подпорная стена террасы
    houses += `<rect x="${edge(base) + 6}" y="${base}" width="${W}" height="5" fill="#e8dcc6"/>`;
  });
  const church = `<g transform="translate(228 480)">
    <rect x="-26" y="-36" width="52" height="36" fill="#fbfaf6"/><rect x="-28" y="-40" width="56" height="5" fill="#eef0f2"/>
    <rect x="-16" y="-50" width="32" height="12" fill="#fbfaf6"/><path d="M-18 -50a18 18 0 0 1 36 0z" fill="#2f6fb5"/>
    <path d="M0 -68v-12M-5 -75h10" stroke="#fbfaf6" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M-6 0v-14a6 6 0 0 1 12 0v14z" fill="#1f4f8a"/></g>
  <g transform="translate(266 480)">
    <path d="M-10 0v-58h20v58z" fill="#fbfaf6"/><path d="M-13 -58h26l-13 -10z" fill="#fbfaf6"/>
    <path d="M-5 -46v-8a5 5 0 0 1 10 0v8z" fill="#2f6fb5"/><path d="M-5 -30v-8a5 5 0 0 1 10 0v8z" fill="#2f6fb5"/>
    <circle cx="0" cy="-44" r="2.5" fill="#d9a521"/><path d="M0 -68v-10M-4 -74h8" stroke="#2f6fb5" stroke-width="2" stroke-linecap="round"/></g>`;
  const mill = `<g transform="translate(176 444)"><path d="M-12 0l3 -40h18l3 40z" fill="#fbfaf6"/><path d="M-10 -40a10 8 0 0 1 20 0z" fill="#8a6a4a"/>
    ${[0, 60, 120, 180, 240, 300].map(a => `<g transform="rotate(${a} 0 -42)"><path d="M0 -42v-26" stroke="#6a5a4a" stroke-width="1.5"/><path d="M0 -50l8 -16l-2 -2l-6 6z" fill="#fff" opacity=".9"/></g>`).join('')}
    <rect x="-3" y="-12" width="6" height="12" fill="#2f6fb5"/></g>`;
  return `<defs>${sky('skS', [[0, '#4aa0e0'], [.55, '#bfe4f7'], [1, '#f7e2c0']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#skS)"/>${sun(70, 290, 30, '#ffe08a', .4)}${cloud(230, 140, .8)}${birds(110, 360, '#335')}
  ${water(620, '#2a7fc2', '#a9dcf3')}
  <!-- вулканический островок в кальдере -->
  <path d="M-10 700q30 -26 70 -22q30 4 46 22z" fill="#4a3f3a"/><path d="M10 694q24 -14 50 -12" stroke="#6a5a50" stroke-width="3" fill="none"/>
  <!-- слоистый обрыв -->
  <path d="M${edge(1000)} ${H}L${edge(740)} 740Q${edge(600) - 6} 560 ${edge(470) - 4} 470Q170 444 200 446L${W} 438V${H}z" fill="#9a5a40"/>
  <path d="M${edge(1000) + 6} ${H}L${edge(760) + 6} 760L${W} 750V${H}z" fill="#5a4038"/>
  <path d="M${edge(820)} 820L${W} 806M${edge(900)} 900L${W} 890" stroke="#7a5a4a" stroke-width="6" opacity=".6"/>
  <path d="M${edge(740)} 740L${W} 728" stroke="#c98a5a" stroke-width="8" opacity=".7"/>
  ${houses}${church}${mill}
  <!-- парусник -->
  <g transform="translate(56 770)"><path d="M-30 0h60l-10 12h-40z" fill="#fbfaf6"/><path d="M0 -60v60M0 -56l26 50H0z" fill="#fff" stroke="#c9c9c9" stroke-width="1"/><path d="M0 -50l-20 44H0z" fill="#e8eef2"/></g>`;
}

// ---------- Германия: Берлин ----------
function berlin() {
  // ворота с шестью колоннами и квадригой, за ними телебашня
  const cols = [0, 1, 2, 3, 4, 5].map(i => `<rect x="${44 + i * 44}" y="560" width="14" height="150" fill="#e4d6b4"/><rect x="${40 + i * 44}" y="552" width="22" height="10" fill="#d4c39c"/>`).join('');
  const win = (x, y, cols, rows) => Array.from({ length: rows * cols }, (_, k) => `<rect x="${x + (k % cols) * 14}" y="${y + Math.floor(k / cols) * 20}" width="8" height="11" fill="#fbe7a8" opacity=".8"/>`).join('');
  return `<defs>${sky('skB', [[0, '#6f9fd0'], [.55, '#d9e4ee'], [1, '#f2d7a8']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#skB)"/>${sun(250, 300, 26, '#ffe8a0', .35)}${cloud(80, 170, 1)}${cloud(240, 230, .7)}${birds(110, 380, '#334')}
  <!-- телебашня -->
  <path d="M86 720L92 330h8l6 390z" fill="#b9c2cc"/>
  <circle cx="96" cy="300" r="26" fill="#9aa6b2"/><circle cx="96" cy="300" r="26" fill="none" stroke="#7d8996" stroke-width="2"/>
  <path d="M74 300h44" stroke="#c9d1d9" stroke-width="3"/><rect x="88" y="262" width="16" height="16" fill="#b9c2cc"/>
  <path d="M96 262V160" stroke="#c9302c" stroke-width="4"/><path d="M96 200v-20M96 230v-14" stroke="#fff" stroke-width="4"/>
  <!-- дома позади -->
  <rect x="0" y="600" width="40" height="120" fill="#c9b89a"/>${win(4, 612, 3, 5)}
  <rect x="274" y="590" width="46" height="130" fill="#bfae90"/>${win(278, 602, 3, 6)}
  <!-- ворота -->
  <rect x="34" y="520" width="262" height="34" fill="#e8dbbb"/><rect x="30" y="512" width="270" height="10" fill="#d4c39c"/>
  <path d="M130 512h70l-8 -26h-54z" fill="#e8dbbb"/>
  ${cols}
  <rect x="30" y="706" width="270" height="14" fill="#cdbb93"/>
  <!-- квадрига -->
  <g transform="translate(165 486)" fill="#4f7a64">
    ${[-24, -8, 8, 24].map(x => `<path d="M${x - 9} 0v-12q2-8 9-10l5-6 2 4-3 4q4 2 4 8v12h-3v-9h-11v9z"/>`).join('')}
    <path d="M-6 -22h12v-10h-12z"/><path d="M0 -32v-18M-6 -46h12" stroke="#4f7a64" stroke-width="2.5"/><circle cx="0" cy="-52" r="4"/>
  </g>
  <!-- площадь и деревья -->
  <rect x="0" y="720" width="${W}" height="${H - 720}" fill="#cfc3aa"/>
  <path d="M0 760H${W}M0 820H${W}M0 900H${W}" stroke="#bcae92" stroke-width="3"/>
  ${[18, 302].map(x => `<rect x="${x - 3}" y="690" width="6" height="40" fill="#6b4f33"/><circle cx="${x}" cy="680" r="22" fill="#5f8f4a"/>`).join('')}
  <!-- жёлтый двухэтажный автобус -->
  <g transform="translate(150 770)"><rect width="120" height="56" rx="8" fill="#f2c230"/><rect x="0" y="27" width="120" height="4" fill="#c99a12"/>
  ${[8, 36, 64, 92].map(x => `<rect x="${x}" y="7" width="20" height="14" rx="2" fill="#d8ecf5"/><rect x="${x}" y="35" width="20" height="12" rx="2" fill="#d8ecf5"/>`).join('')}
  <circle cx="26" cy="56" r="9" fill="#222"/><circle cx="96" cy="56" r="9" fill="#222"/><circle cx="26" cy="56" r="4" fill="#999"/><circle cx="96" cy="56" r="4" fill="#999"/></g>`;
}

// ---------- Германия: Бавария (замок в Альпах) ----------
function bavaria() {
  const tower = (x, y, w, h, roof = '#3f5f8a') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f4f1ea"/><path d="M${x - 3} ${y}L${x + w / 2} ${y - w * 1.6}L${x + w + 3} ${y}z" fill="${roof}"/>` +
    `<rect x="${x + w / 2 - 3}" y="${y + 14}" width="6" height="10" rx="3" fill="#6d7e96"/>`;
  return `<defs>${sky('skA', [[0, '#5d97d6'], [.6, '#cfe6f6'], [1, '#eef6f8']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#skA)"/>${sun(70, 200, 26, '#fff1b0', .4)}${cloud(220, 150, .9)}${cloud(60, 290, .6)}
  <!-- Альпы -->
  <path d="M-20 560L60 380L110 450L170 300L240 430L280 360L340 470V620H-20z" fill="#8a9bb0"/>
  <path d="M60 380L78 420L62 412L48 430zM170 300L194 350L176 338L160 362L150 340zM280 360L296 392L282 386L270 400z" fill="#fff"/>
  <path d="M-20 620L40 520L120 580L200 500L280 560L340 520V730H-20z" fill="#5d7f5a"/>
  ${[20, 70, 250, 300].map((x, i) => pine(x, 640 + (i % 2) * 18, 54, '#2f5a36')).join('')}
  <!-- скала и замок -->
  <path d="M60 720Q90 620 150 610Q230 600 270 720z" fill="#7a7466"/>
  <g>
    <rect x="110" y="520" width="120" height="92" fill="#f4f1ea"/>
    <path d="M106 520h128l-10 -26h-108z" fill="#3f5f8a"/>
    ${[0, 1, 2, 3].map(i => `<rect x="${122 + i * 28}" y="540" width="10" height="16" rx="5" fill="#6d7e96"/><rect x="${122 + i * 28}" y="576" width="10" height="16" rx="5" fill="#6d7e96"/>`).join('')}
    ${tower(92, 500, 24, 112)}${tower(222, 486, 26, 126)}${tower(160, 430, 20, 90)}${tower(196, 470, 16, 50, '#4f6f9a')}
    <rect x="160" y="590" width="20" height="22" rx="10" fill="#5a4a3a"/>
  </g>
  <!-- луг с цветами, озеро -->
  <rect x="0" y="720" width="${W}" height="${H - 720}" fill="#7fb05a"/>
  ${water(860, '#4f8fc0', '#bfe0f2')}
  ${flowers(740, 3, ['#fff', '#f2c230', '#e06a8a'])}
  <!-- корова -->
  <g transform="translate(70 800)"><ellipse cx="0" cy="0" rx="26" ry="15" fill="#fff"/><ellipse cx="-6" cy="-4" rx="8" ry="6" fill="#6b4a32"/><ellipse cx="10" cy="4" rx="6" ry="5" fill="#6b4a32"/>
  <rect x="-20" y="10" width="5" height="14" fill="#fff"/><rect x="14" y="10" width="5" height="14" fill="#fff"/><ellipse cx="30" cy="-8" rx="9" ry="8" fill="#fff"/><circle cx="33" cy="-9" r="1.6" fill="#222"/>
  <circle cx="26" cy="4" r="3" fill="#d9a521"/></g>`;
}

const SCENES = {
  // focus — какую полосу по высоте [y, высота] показывать на открытке
  en: { left: london, right: newYork, title: ['Лондон', 'Нью-Йорк'], focus: [[150, 640], [300, 600]] },
  tr: { left: istanbul, right: cappadocia, title: ['Стамбул', 'Каппадокия'], focus: [[260, 560], [360, 520]] },
  krc: { left: elbrus, right: gorge, title: ['Эльбрус', 'Горное ущелье'], focus: [[320, 470], [360, 520]] },
  el: { left: acropolis, right: santorini, title: ['Акрополь', 'Санторини'], focus: [[360, 480], [420, 380]] },
  de: { left: berlin, right: bavaria, title: ['Берлин', 'Бавария'], focus: [[400, 320], [330, 330]] }
};
SCENES.gr = SCENES.el;

const svg = (draw, label, mode, box = [0, H]) => `<svg viewBox="0 ${box[0]} ${W} ${box[1]}" preserveAspectRatio="${mode}" role="img" aria-label="${label}">${draw()}</svg>`;

// Боковые панели (широкий экран) для языка id
export function sideScenery(id) {
  const s = SCENES[id] || SCENES.en;
  return `<div class="scene left">${svg(s.left, s.title[0], 'xMidYMax slice')}${lianas(3, 5)}</div>
  <div class="scene right">${svg(s.right, s.title[1], 'xMidYMax slice')}${lianas(3, 9)}</div>`;
}

// Открытка-панорама (узкий экран): обе картинки рядом
export function postcard(id) {
  const s = SCENES[id] || SCENES.en;
  return `<div class="postcard">${[0, 1].map(i => `<figure>${svg(i ? s.right : s.left, s.title[i], 'xMidYMid slice', s.focus[i])}<figcaption>${s.title[i]}</figcaption></figure>`).join('')}</div>`;
}

export const hasScenery = id => !!SCENES[id];
