// Иллюстрации к тематическим материалам — оригинальные SVG-рисунки в стиле пейзажей Лингвы (scenery.js).
// У материала поле art: 'ключ' → рисунок шапкой над текстом и полоской на карточке в библиотеке.
const W = 640, H = 280;

// ---------- общие детали ----------
const sky = (id, stops) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
const sun = (x, y, r, c = '#ffd76a', glow = .35) => `<circle cx="${x}" cy="${y}" r="${r * 2.4}" fill="${c}" opacity="${glow * .4}"/><circle cx="${x}" cy="${y}" r="${r * 1.5}" fill="${c}" opacity="${glow}"/><circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
const cloud = (x, y, s = 1, c = '#fff', o = .85) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}" opacity="${o}"><ellipse cx="0" cy="0" rx="34" ry="14"/><ellipse cx="-22" cy="4" rx="22" ry="11"/><ellipse cx="24" cy="5" rx="24" ry="10"/><ellipse cx="4" cy="-10" rx="20" ry="13"/></g>`;
const sea = (y, c1, c2) => `<rect x="0" y="${y}" width="${W}" height="${H - y}" fill="${c1}"/>` +
  Array.from({ length: 10 }, (_, i) => `<path d="M${(i * 97) % 600} ${y + 10 + (i % 5) * 12}h${30 + (i % 3) * 16}" stroke="${c2}" stroke-width="2.5" stroke-linecap="round" opacity=".55"/>`).join('');
const stars = (n, seed = 1) => Array.from({ length: n }, (_, i) => { const x = (i * 131 + seed * 37) % W, y = (i * 53 + seed * 11) % 150; return `<circle cx="${x}" cy="${y}" r="${1 + (i % 3) * .5}" fill="#fff" opacity="${.5 + (i % 4) * .12}"/>`; }).join('');
// Вершина Афона: тёмный склон и светлая мраморная макушка
const peak = (cx, base, h, hw, c = '#5d7186', cap = '#e9ecef') =>
  `<path d="M${cx - hw} ${base}L${cx - hw * .35} ${base - h * .62}L${cx} ${base - h}L${cx + hw * .28} ${base - h * .66}L${cx + hw} ${base}Z" fill="${c}"/>` +
  `<path d="M${cx - hw * .14} ${base - h * .82}L${cx} ${base - h}L${cx + hw * .1} ${base - h * .86}L${cx + hw * .04} ${base - h * .8}L${cx - hw * .05} ${base - h * .84}Z" fill="${cap}"/>` +
  `<path d="M${cx} ${base - h}L${cx + hw * .28} ${base - h * .66}L${cx + hw} ${base}H${cx + hw * .2}Z" fill="#000" opacity=".12"/>`;
const hills = (y, c, amp = 30) => `<path d="M0 ${y}q80 ${-amp} 160 -6t160 4t160 -8t160 6V${H}H0z" fill="${c}"/>`;
const cypress = (x, y, h, c = '#2f5a3a') => `<path d="M${x} ${y - h}q${h * .16} ${h * .45} ${h * .1} ${h}h${-h * .2}q${-h * .06} ${-h * .55} ${h * .1} ${-h}z" fill="${c}"/>`;
// Византийский храм: кирпично-красные стены, свинцово-серые купола
const church = (x, y, s = 1, wall = '#b0513a', dome = '#7d8b97') => `<g transform="translate(${x} ${y}) scale(${s})">
  <rect x="-40" y="-36" width="80" height="36" fill="${wall}"/><rect x="-14" y="-62" width="28" height="28" fill="${wall}"/>
  <path d="M-16 -62a16 16 0 0 1 32 0z" fill="${dome}"/><path d="M0 -78v-10M-4 -84h8" stroke="#d9a521" stroke-width="2"/>
  <path d="M-38 -36a10 10 0 0 1 20 0zM18 -36a10 10 0 0 1 20 0z" fill="${dome}"/>
  ${[-30, -8, 14].map(k => `<rect x="${k}" y="-28" width="7" height="14" rx="3.5" fill="#3b2a22"/>`).join('')}
  <path d="M-40 -18h80" stroke="#e8c9a0" stroke-width="1.5" opacity=".7"/></g>`;
// Луковичный купол русского храма
const onion = (x, y, s = 1, c = '#3f9a5e') => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-8" y="-6" width="16" height="16" fill="#f1ead8"/><path d="M0 -40q-14 12 -12 24q2 10 12 10q10 0 12 -10q2 -12 -12 -24z" fill="${c}"/><path d="M0 -40v-12M-5 -47h10" stroke="#e0b43a" stroke-width="2"/></g>`;
// Монастырь-крепость: стены с деревянными балконами и башня
const monastery = (x, y, s = 1, wall = '#d9cdb2') => `<g transform="translate(${x} ${y}) scale(${s})">
  <rect x="-90" y="-46" width="180" height="46" fill="${wall}"/><rect x="-90" y="-54" width="180" height="8" fill="#9a4a35"/>
  ${Array.from({ length: 9 }, (_, i) => `<rect x="${-82 + i * 19}" y="-38" width="7" height="10" fill="#4a3a2e"/>`).join('')}
  <rect x="-70" y="-74" width="60" height="20" fill="#8a5a3a"/><rect x="-70" y="-80" width="60" height="6" fill="#9a4a35"/>
  ${Array.from({ length: 5 }, (_, i) => `<rect x="${-66 + i * 12}" y="-70" width="6" height="10" fill="#f0d79a"/>`).join('')}
  <rect x="50" y="-100" width="30" height="100" fill="#cbbd9e"/><path d="M48 -100h34l-17 -16z" fill="#9a4a35"/>
  ${[0, 1, 2].map(r => `<rect x="61" y="${-90 + r * 26}" width="8" height="12" fill="#4a3a2e"/>`).join('')}</g>`;
const boat = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-60 0h120l-14 16h-92z" fill="#f4f1ea"/><path d="M-60 0h120l-2 4h-116z" fill="#2f6fb5"/>
  <rect x="-40" y="-18" width="70" height="18" fill="#fbfaf6"/>${[0, 1, 2, 3, 4].map(i => `<rect x="${-34 + i * 13}" y="-13" width="8" height="7" fill="#5b8bb5"/>`).join('')}
  <rect x="-10" y="-30" width="26" height="12" fill="#fbfaf6"/><rect x="2" y="-40" width="6" height="10" fill="#d84b3a"/></g>`;

// ---------- Афон ----------
// Полуостров с вершиной, монастырь у моря
function athosPeninsula() {
  return `<defs>${sky('aP', [[0, '#7fb6e0'], [.6, '#cfe8f5'], [1, '#f5e6c8']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#aP)"/>${sun(560, 60, 18, '#ffe08a', .4)}${cloud(120, 50, .9)}${cloud(380, 36, .6)}
  ${peak(330, 200, 170, 170)}
  <path d="M60 210q120 -40 260 -36q160 2 300 30V${H}H40z" fill="#6f8f4e"/><path d="M100 214q160 -26 520 4V${H}H90z" fill="#5c7c42"/>
  ${sea(222, '#2a7fc2', '#a9dcf3')}
  <path d="M150 226q70 -26 190 -20q80 4 120 18z" fill="#6a8a49"/>
  ${monastery(250, 226, .55)}${cypress(190, 228, 34)}${cypress(206, 226, 26)}${cypress(330, 224, 30)}
  ${boat(520, 252, .5)}`;
}

// Предрассветная служба: звёзды, храм, монах ударяет в било
function athosMorning() {
  return `<defs>${sky('aM', [[0, '#141a3a'], [.65, '#3b3f6e'], [1, '#c98a6a']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#aM)"/>${stars(44, 3)}
  <path d="M552 46a20 20 0 1 0 14 34a16 16 0 1 1 -14 -34z" fill="#f3e6b0"/>
  ${peak(500, 230, 130, 150, '#2b3352', '#cfd3e0')}
  <rect x="0" y="230" width="${W}" height="50" fill="#2a2a3a"/><path d="M0 236h${W}" stroke="#4a4458" stroke-width="3"/>
  ${church(250, 232, 1.25, '#7a3a2e', '#4e5866')}
  <g fill="#f6c34a">${[-30, -8, 14].map(k => `<rect x="${250 + k * 1.25}" y="${232 - 28 * 1.25}" width="${7 * 1.25}" height="${14 * 1.25}" rx="4" opacity=".9"/>`).join('')}</g>
  <!-- монах с билом -->
  <g transform="translate(430 232)">
    <path d="M-12 0q2 -40 12 -52q10 12 12 52z" fill="#111"/><circle cx="0" cy="-58" r="8" fill="#e0b896"/><path d="M-9 -60q9 -14 18 0z" fill="#111"/><path d="M-2 -52q2 10 0 16" stroke="#555" stroke-width="5" stroke-linecap="round"/>
    <path d="M-60 -44h52" stroke="#9a6a3a" stroke-width="9" stroke-linecap="round"/><path d="M-6 -42l-16 -8" stroke="#111" stroke-width="5" stroke-linecap="round"/>
    <path d="M-22 -50l-10 -10" stroke="#7a4a2a" stroke-width="3" stroke-linecap="round"/>
    <path d="M-70 -64q-8 6 0 12M-80 -70q-12 10 0 22" stroke="#f6c34a" stroke-width="2" fill="none" opacity=".7"/>
  </g>
  ${cypress(120, 236, 70, '#1c2a24')}${cypress(150, 236, 54, '#1c2a24')}${cypress(600, 236, 60, '#1c2a24')}`;
}

// Паром у Уранополиса: византийская башня, вдали Афон
function athosFerry() {
  return `<defs>${sky('aF', [[0, '#5fa8e0'], [.6, '#bfe4f7'], [1, '#f7e2c0']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#aF)"/>${sun(90, 60, 20, '#ffe08a', .4)}${cloud(260, 46, .8)}${cloud(470, 70, .6)}
  ${peak(520, 170, 120, 120, '#7d90a6', '#eef1f4')}
  <path d="M380 172q140 -14 260 -4V180H380z" fill="#8aa07a"/>
  ${sea(170, '#2a7fc2', '#a9dcf3')}
  <!-- башня Уранополиса -->
  <path d="M0 180h170v100H0z" fill="#c9b48a"/><path d="M0 176h180v8H0z" fill="#b89f72"/>
  <rect x="40" y="70" width="70" height="110" fill="#d8c49a"/><path d="M36 70h78v-10H36z" fill="#b89f72"/>
  ${[44, 58, 72, 86, 100].map(x => `<rect x="${x}" y="52" width="8" height="10" fill="#b89f72"/>`).join('')}
  ${[[56, 90], [84, 90], [56, 130], [84, 130]].map(([x, y]) => `<rect x="${x}" y="${y}" width="10" height="16" rx="5" fill="#4a3a2e"/>`).join('')}
  <rect x="150" y="196" width="140" height="10" fill="#8a7a62"/>
  ${boat(300, 214, 1)}
  <path d="M250 232q50 6 110 0" stroke="#fff" stroke-width="3" fill="none" opacity=".6"/>`;
}

// Натюрморт паломника: лампада, свеча, чётки, книга
function athosPilgrim() {
  return `<defs>${sky('aR', [[0, '#3a2a22'], [1, '#6a4a34']])}<radialGradient id="aRg" cx=".5" cy=".45" r=".5"><stop offset="0" stop-color="#ffcf6a" stop-opacity=".55"/><stop offset="1" stop-color="#ffcf6a" stop-opacity="0"/></radialGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#aR)"/><circle cx="320" cy="120" r="200" fill="url(#aRg)"/>
  <rect x="0" y="210" width="${W}" height="70" fill="#4a3022"/><path d="M0 210h${W}" stroke="#7a5236" stroke-width="4"/>
  <!-- икона -->
  <rect x="250" y="40" width="140" height="160" rx="6" fill="#8a5a2a"/><rect x="262" y="52" width="116" height="136" fill="#d9a521"/>
  <circle cx="320" cy="100" r="30" fill="#f0cf6a"/><circle cx="320" cy="100" r="30" fill="none" stroke="#b8861a" stroke-width="2"/>
  <path d="M276 188q0 -66 22 -92q8 -26 22 -26q14 0 22 26q22 26 22 92z" fill="#7a2a2a"/><path d="M300 188q2 -46 20 -60q18 14 20 60z" fill="#2a3a6a"/>
  <ellipse cx="320" cy="102" rx="12" ry="15" fill="#d9a878"/><path d="M308 98q12 -18 24 0" stroke="#7a2a2a" stroke-width="5" fill="none"/>
  <g fill="#f0cf6a">${[[300, 120], [340, 120], [320, 74]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.5"/>`).join('')}</g>
  <!-- лампада -->
  <path d="M150 20v40" stroke="#c8a040" stroke-width="2"/><path d="M130 60h40l-8 30h-24z" fill="#b8302a"/><path d="M134 60h32" stroke="#e0b43a" stroke-width="3"/><path d="M150 56q-4 -8 0 -14q4 6 0 14z" fill="#ffd76a"/>
  <!-- свечи -->
  <rect x="460" y="130" width="10" height="80" fill="#e8d28a"/><path d="M465 120q-6 -10 0 -18q6 8 0 18z" fill="#ffcf4a"/>
  <rect x="482" y="150" width="9" height="60" fill="#e8d28a"/><path d="M486 140q-5 -9 0 -16q5 7 0 16z" fill="#ffcf4a"/>
  <!-- чётки -->
  <g fill="#222">${Array.from({ length: 22 }, (_, i) => { const a = i / 22 * Math.PI * 2; return `<circle cx="${(160 + Math.cos(a) * 50).toFixed(1)}" cy="${(238 + Math.sin(a) * 18).toFixed(1)}" r="5"/>`; }).join('')}</g>
  <path d="M210 240l22 6l-4 6z" fill="#222"/><path d="M228 246l8 14" stroke="#222" stroke-width="3"/>
  <!-- книга -->
  <path d="M380 226l70 -6l70 6v26l-70 -6l-70 6z" fill="#efe6cf"/><path d="M450 220v26" stroke="#b8a882" stroke-width="2"/><path d="M380 252l70 -6l70 6v4l-70 -5l-70 5z" fill="#7a2a2a"/>`;
}

// Предание: корабль в бурю у берегов Афона, луч света над вершиной
function athosLegend() {
  return `<defs>${sky('aL', [[0, '#2b3550'], [.5, '#5a6a8a'], [1, '#9fb4c8']])}<linearGradient id="aLr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a8" stop-opacity=".75"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#aL)"/>
  <path d="M400 0L330 150H470L440 0z" fill="url(#aLr)"/>
  ${cloud(140, 40, 1.4, '#3a4560', .95)}${cloud(300, 26, 1.1, '#46526e', .9)}${cloud(560, 44, 1.3, '#3a4560', .95)}
  ${peak(400, 210, 160, 150, '#4d5d70', '#f4efd8')}
  <path d="M250 214q80 -30 160 -26q100 4 230 26V230H250z" fill="#4a6a46"/>
  <rect x="0" y="206" width="${W}" height="74" fill="#2a5a80"/>
  ${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 72 - 20} ${226 + (i % 3) * 14}q18 -16 36 0t36 0" stroke="#cfe6f5" stroke-width="3" fill="none" opacity=".7"/>`).join('')}
  <!-- древний корабль -->
  <g transform="translate(160 236) rotate(-8)"><path d="M-60 0q60 22 120 0l-10 -10h-100z" fill="#6a4a2a"/><path d="M0 -10v-76" stroke="#4a3a2a" stroke-width="4"/><path d="M0 -84q38 22 0 64z" fill="#e8dcc0"/><path d="M0 -84q-30 22 0 64z" fill="#d8ccb0"/><path d="M60 0q14 -16 10 -26" stroke="#6a4a2a" stroke-width="5" fill="none"/></g>
  <path d="M70 20l-14 34h14l-10 30" stroke="#ffe9a8" stroke-width="3" fill="none" opacity=".8"/>`;
}

// Пантелеимонов монастырь: зелёные луковичные купола у моря
function athosRossikon() {
  return `<defs>${sky('aRk', [[0, '#7fb6e0'], [.65, '#d6ecf7'], [1, '#f5e6c8']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#aRk)"/>${sun(90, 54, 18, '#ffe08a', .4)}${cloud(500, 50, .8)}
  ${hills(170, '#7a9a5a', 40)}${cypress(40, 200, 50)}${cypress(600, 196, 46)}
  ${sea(226, '#2a7fc2', '#a9dcf3')}
  <rect x="120" y="150" width="400" height="76" fill="#f1ead8"/><rect x="120" y="144" width="400" height="8" fill="#3f9a5e"/>
  ${Array.from({ length: 3 }, (_, r) => Array.from({ length: 16 }, (_, k) => `<rect x="${130 + k * 24}" y="${158 + r * 22}" width="10" height="13" rx="5" fill="#6a7a8a"/>`).join('')).join('')}
  <rect x="270" y="96" width="100" height="54" fill="#f6f0e0"/><rect x="300" y="70" width="40" height="30" fill="#f6f0e0"/>
  ${onion(320, 70, 1.4)}${onion(280, 96, .9)}${onion(360, 96, .9)}
  <!-- колокольня -->
  <rect x="430" y="70" width="34" height="80" fill="#f6f0e0"/><rect x="438" y="84" width="18" height="22" rx="9" fill="#5a4a3a"/><path d="M441 100a6 6 0 0 1 12 0z" fill="#d9a521"/>${onion(447, 70, .9)}
  ${onion(170, 144, .7)}${onion(220, 144, .7)}`;
}

// Великая Лавра на закате: стены, башня, храм, кипарисы
function athosLavra() {
  return `<defs>${sky('aV', [[0, '#e88a5a'], [.55, '#f6c98a'], [1, '#fbe6c0']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#aV)"/>${sun(120, 150, 26, '#ffe08a', .45)}
  ${peak(500, 200, 180, 140, '#7a6a7a', '#f2e6dc')}
  ${hills(196, '#8a7a5a', 20)}
  <rect x="170" y="150" width="300" height="70" fill="#d9c49a"/>${Array.from({ length: 15 }, (_, i) => `<rect x="${170 + i * 20}" y="142" width="10" height="10" fill="#d9c49a"/>`).join('')}
  <rect x="200" y="96" width="44" height="124" fill="#cbb487"/>${Array.from({ length: 4 }, (_, i) => `<rect x="${200 + i * 12}" y="88" width="8" height="10" fill="#cbb487"/>`).join('')}
  ${[110, 150, 186].map(y => `<rect x="216" y="${y}" width="10" height="14" fill="#4a3a2e"/>`).join('')}
  ${church(360, 152, 1, '#b0513a', '#6d7a86')}
  <rect x="170" y="200" width="300" height="20" fill="#c4ae80"/><path d="M300 220v-26a12 12 0 0 1 24 0v26z" fill="#4a3a2e"/>
  ${cypress(140, 230, 60, '#3a4a2a')}${cypress(500, 228, 56, '#3a4a2a')}${cypress(524, 230, 44, '#3a4a2a')}
  <path d="M0 226q160 -10 320 0t320 -4V${H}H0z" fill="#6a5a3a"/>`;
}

const ART = {
  'athos-peninsula': { draw: athosPeninsula, label: 'Полуостров Афон: вершина и монастырь у моря' },
  'athos-morning': { draw: athosMorning, label: 'Ночная служба: храм и монах с билом' },
  'athos-ferry': { draw: athosFerry, label: 'Паром у башни Уранополиса' },
  'athos-pilgrim': { draw: athosPilgrim, label: 'Икона, лампада, свечи и чётки' },
  'athos-legend': { draw: athosLegend, label: 'Корабль в бурю у берегов Афона' },
  'athos-rossikon': { draw: athosRossikon, label: 'Пантелеимонов монастырь с зелёными куполами' },
  'athos-lavra': { draw: athosLavra, label: 'Великая Лавра на закате' }
};

export const hasArt = t => !!(t && ART[t.art]);
// Рисунок материала: 'banner' — шапка в читалке, 'thumb' — полоска на карточке
export function textArt(t, mode = 'banner') {
  const a = t && ART[t.art]; if (!a) return '';
  // у каждого рисунка свои id градиентов: в thumb добавляем суффикс, чтобы карточки не конфликтовали с шапкой
  const svg = mode === 'thumb' ? a.draw().replace(/id="(\w+)"/g, 'id="$1t"').replace(/url\(#(\w+)\)/g, 'url(#$1t)') : a.draw();
  return `<figure class="text-art ${mode}"><svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${a.label}">${svg}</svg></figure>`;
}
export const ART_KEYS = Object.keys(ART);
