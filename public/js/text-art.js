// Иллюстрации к тематическим материалам — оригинальные SVG-рисунки в стиле пейзажей Лингвы (scenery.js).
// У материала поле art: 'ключ' → рисунок шапкой над текстом и полоской на карточке в библиотеке.
import { TR_TALES_ART } from './tr-tales-art.js';
import { EL_MYTHS_ART } from './el-myths-art.js';
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
// Православный крест: верхняя табличка, перекладина и косая подножка
const cross = (x, y, k = 1, c = '#d9a521') => `<path d="M${x} ${y}v${-26 * k}M${x - 4 * k} ${y - 21 * k}h${8 * k}M${x - 8 * k} ${y - 15 * k}h${16 * k}M${x - 5 * k} ${y - 5 * k}l${10 * k} ${-4 * k}" stroke="${c}" stroke-width="${2.2 * k}" stroke-linecap="round"/>`;
// Византийский храм (крестово-купольный): кирпичные пояса, двускатная черепичная кровля,
// высокий барабан с окнами, небольшой купол с православным крестом, апсида и звонница
const church = (x, y, s = 1, wall = '#b0513a', dome = '#7d8b97', win = '#3b2a22') => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M44 0v-30a14 14 0 0 1 0 0h4a14 14 0 0 1 0 30z" fill="${wall}"/><path d="M44 -30q16 0 16 15v15h-16z" fill="${wall}"/><path d="M42 -32q20 0 20 17" stroke="#c2603e" stroke-width="5" fill="none"/>
  <rect x="-44" y="-40" width="88" height="40" fill="${wall}"/>
  ${[-30, -20, -10].map(yy => `<path d="M-44 ${yy}h88" stroke="#e8c9a0" stroke-width="2" opacity=".55"/>`).join('')}
  <path d="M-50 -38L0 -60L50 -38z" fill="#c2603e"/><path d="M-50 -38h100" stroke="#8a3a26" stroke-width="2"/>
  <rect x="-13" y="-86" width="26" height="32" fill="${wall}"/><path d="M-15 -86h30" stroke="#c2603e" stroke-width="3"/>
  ${[-8, 2].map(k => `<rect x="${k}" y="-80" width="6" height="16" rx="3" fill="${win}"/>`).join('')}
  <path d="M-14 -86a14 12 0 0 1 28 0z" fill="${dome}"/>${cross(0, -97, 1)}
  ${[-34, -18, 10, 26].map(k => `<rect x="${k}" y="-30" width="8" height="18" rx="4" fill="${win}"/>`).join('')}
  <path d="M-6 0v-16a6 6 0 0 1 12 0v16z" fill="#4a2a1e"/>
  <g transform="translate(-58 0)"><rect x="-10" y="-58" width="20" height="58" fill="${wall}"/><path d="M-12 -58h24l-12 -10z" fill="#c2603e"/><rect x="-5" y="-50" width="10" height="14" rx="5" fill="#2a1d18"/><path d="M-3 -40a3 4 0 0 1 6 0z" fill="#d9a521"/>${cross(0, -68, .6)}</g></g>`;
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
  ${peak(500, 230, 130, 150, '#2b3352', '#cfd3e0')}
  <rect x="0" y="230" width="${W}" height="50" fill="#2a2a3a"/><path d="M0 236h${W}" stroke="#4a4458" stroke-width="3"/>
  ${church(250, 232, 1.25, '#7a3a2e', '#4e5866', '#f6c34a')}
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

// ---------- Английский: города ----------
// Окна-огоньки в силуэте здания
const lights = (x, y, w, h, step = 10, c = '#ffd98a', seed = 1) => {
  let out = '';
  for (let yy = y + 6; yy < y + h - 6; yy += step) for (let xx = x + 4; xx < x + w - 6; xx += 8)
    if ((xx * 7 + yy * 3 + seed * 13) % 5 < 2) out += `<rect x="${xx}" y="${yy}" width="3" height="4" fill="${c}" opacity=".85"/>`;
  return out;
};
// Вечерняя панорама: Биг-Бен, небоскрёбы Нью-Йорка, статуя Свободы, башня Си-Эн в Торонто, Сиднейская опера
function enCities() {
  const sil = '#2c3350', sil2 = '#3d4670';
  return `<defs>${sky('eC', [[0, '#26306a'], [.45, '#7b5a9a'], [.8, '#f08a6a'], [1, '#ffcf8a']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#eC)"/>${stars(18, 5)}${sun(470, 200, 22, '#ffd27a', .5)}
  <!-- дальний ряд -->
  ${[[150, 120, 30], [186, 150, 26], [300, 140, 34], [420, 130, 28], [560, 150, 40]].map(([x, y, w], i) => `<rect x="${x}" y="${y}" width="${w}" height="${210 - y}" fill="${sil2}"/>${lights(x, y, w, 210 - y, 12, '#ffd98a', i)}`).join('')}
  <!-- Биг-Бен -->
  <g fill="${sil}"><rect x="52" y="96" width="30" height="114"/><rect x="48" y="86" width="38" height="12"/><path d="M50 86L67 40L84 86z"/><rect x="66" y="26" width="2" height="16"/></g>
  <circle cx="67" cy="110" r="10" fill="#ffe7a8"/><path d="M67 110v-7M67 110l5 3" stroke="${sil}" stroke-width="1.6" stroke-linecap="round"/>
  <rect x="82" y="150" width="70" height="60" fill="${sil}"/>${Array.from({ length: 8 }, (_, i) => `<path d="M${84 + i * 9} 150v-8" stroke="${sil}" stroke-width="3"/>`).join('')}${lights(82, 150, 70, 60, 11, '#ffd98a', 2)}
  <!-- небоскрёб со шпилем (Нью-Йорк) -->
  <g fill="${sil}"><rect x="226" y="80" width="48" height="130"/><rect x="234" y="58" width="32" height="24"/><rect x="242" y="38" width="16" height="22"/><path d="M247 38L250 6L253 38z"/></g>${lights(226, 80, 48, 130, 10, '#ffd98a', 3)}
  <rect x="190" y="110" width="34" height="100" fill="${sil}"/>${lights(190, 110, 34, 100, 10, '#ffd98a', 4)}
  <rect x="278" y="100" width="40" height="110" fill="${sil}"/>${lights(278, 100, 40, 110, 10, '#ffd98a', 5)}
  <!-- башня Си-Эн (Торонто) -->
  <g fill="${sil}"><path d="M372 210L380 80h8l8 130z"/><ellipse cx="384" cy="82" rx="14" ry="7"/><rect x="382" y="30" width="4" height="48"/></g><ellipse cx="384" cy="82" rx="10" ry="2" fill="#ffd98a" opacity=".8"/>
  <rect x="400" y="120" width="40" height="90" fill="${sil}"/>${lights(400, 120, 40, 90, 10, '#ffd98a', 6)}
  <rect x="520" y="104" width="36" height="106" fill="${sil}"/>${lights(520, 104, 36, 106, 10, '#ffd98a', 7)}
  <!-- вода -->
  ${sea(210, '#3a4a7a', '#f6b07a')}
  <!-- статуя Свободы на островке -->
  <g transform="translate(150 236)"><path d="M-30 6q30 -10 60 0z" fill="#1f2640"/><rect x="-9" y="-14" width="18" height="16" fill="#2a8a7a"/><path d="M-5 -14l2 -34h6l2 34z" fill="#3aa58f"/><circle cx="0" cy="-52" r="5" fill="#3aa58f"/><path d="M-6 -56l-3 -5M0 -58v-6M6 -56l3 -5" stroke="#3aa58f" stroke-width="2"/><path d="M4 -46l8 -22" stroke="#3aa58f" stroke-width="3.5" stroke-linecap="round"/><path d="M12 -68l-2 -6l5 2z" fill="#ffcf5a"/><circle cx="12" cy="-72" r="5" fill="#ffcf5a" opacity=".45"/></g>
  <!-- Сиднейская опера -->
  <g transform="translate(470 252)"><rect x="-80" y="-6" width="160" height="10" fill="#d9d2c4"/>
    ${[[-64, 34, 30], [-36, 46, 34], [-6, 38, 30], [26, 50, 36], [56, 34, 26]].map(([x, h, w]) => `<path d="M${x} -6Q${x + w * .2} ${-h} ${x + w} ${-h - 4}Q${x + w * .8} ${-h * .4} ${x + w * .9} -6z" fill="#f6f2ea" stroke="#c9c0b0" stroke-width="1.5"/>`).join('')}</g>`;
}

// ---------- Английские сказки ----------
const pig = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="-16" rx="18" ry="14" fill="#f5a8b8"/><circle cx="16" cy="-24" r="10" fill="#f5a8b8"/><ellipse cx="24" cy="-22" rx="5" ry="4" fill="#e98aa0"/><circle cx="22.5" cy="-22" r="1" fill="#8a3a4a"/><circle cx="25.5" cy="-22" r="1" fill="#8a3a4a"/><circle cx="17" cy="-28" r="1.6" fill="#3a2a2a"/><path d="M10 -32l2 -6l4 5z" fill="#e98aa0"/><path d="M-18 -18q-8 -2 -6 -8" stroke="#e98aa0" stroke-width="2" fill="none"/>${[-10, -2, 6, 12].map(k => `<rect x="${k}" y="-5" width="4" height="7" fill="#e98aa0"/>`).join('')}</g>`;
// Три поросёнка: соломенный, деревянный и кирпичный домики, волк дует
function talePigs() {
  return `<defs>${sky('tP', [[0, '#8cc8ec'], [1, '#e4f4fb']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#tP)"/>${sun(70, 54, 20)}${cloud(250, 50, .8)}${cloud(520, 40, .9)}
  ${hills(200, '#8ec66a', 26)}<rect x="0" y="222" width="${W}" height="58" fill="#6aa84f"/>
  <!-- соломенный -->
  <g transform="translate(110 222)"><rect x="-34" y="-40" width="68" height="40" fill="#f0cf6a"/>${Array.from({ length: 9 }, (_, i) => `<path d="M${-32 + i * 8} -40v40" stroke="#c9a23a" stroke-width="1.5"/>`).join('')}<path d="M-44 -38L0 -76L44 -38z" fill="#e2b84a"/>${Array.from({ length: 7 }, (_, i) => `<path d="M${-36 + i * 12} -40l${6 - i} -10" stroke="#b8902a" stroke-width="1.5"/>`).join('')}<rect x="-8" y="-24" width="16" height="24" fill="#8a6a2a"/></g>
  <!-- из палок -->
  <g transform="translate(270 222)"><rect x="-36" y="-44" width="72" height="44" fill="#a0703a"/>${Array.from({ length: 6 }, (_, i) => `<path d="M-36 ${-40 + i * 7}h72" stroke="#6e4a22" stroke-width="2"/>`).join('')}<path d="M-46 -42L0 -80L46 -42z" fill="#7a5228"/><path d="M-30 -54h60M-18 -64h36" stroke="#5a3a1a" stroke-width="2"/><rect x="-9" y="-26" width="18" height="26" fill="#4a3018"/></g>
  <!-- кирпичный -->
  <g transform="translate(440 222)"><rect x="-44" y="-56" width="88" height="56" fill="#c0503a"/>${Array.from({ length: 7 }, (_, r) => `<path d="M-44 ${-48 + r * 8}h88" stroke="#e8b8a0" stroke-width="1" opacity=".7"/>` + Array.from({ length: 6 }, (_, c) => `<path d="M${-40 + c * 16 + (r % 2) * 8} ${-56 + r * 8}v8" stroke="#e8b8a0" stroke-width="1" opacity=".7"/>`).join('')).join('')}<path d="M-54 -54L0 -92L54 -54z" fill="#7a3a2e"/><rect x="22" y="-92" width="14" height="26" fill="#9a4434"/><path d="M28 -96q-6 -10 4 -18q-6 -8 2 -14" stroke="#ddd" stroke-width="4" fill="none" opacity=".7" stroke-linecap="round"/><rect x="-10" y="-30" width="20" height="30" fill="#5a3020"/><rect x="-36" y="-44" width="16" height="14" fill="#ffe7a0"/><rect x="20" y="-44" width="16" height="14" fill="#ffe7a0"/></g>
  ${pig(170, 252, .9)}${pig(330, 256, .9)}${pig(500, 254, .9)}
  <!-- волк дует на соломенный домик -->
  <g transform="translate(52 252)"><path d="M-30 0q-4 -26 14 -34q16 -6 26 4l14 -4l-4 10q8 10 2 22z" fill="#6c7580"/><path d="M8 -30l2 -14l6 12z" fill="#545c66"/><circle cx="14" cy="-24" r="2" fill="#fff"/><path d="M-30 -12q-14 -10 -10 -24" stroke="#6c7580" stroke-width="8" fill="none" stroke-linecap="round"/></g>
  <path d="M76 236q10 -6 18 0M74 244q12 -4 20 2M76 228q10 -8 18 -4" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".85"/>`;
}

// Рыжая курочка: ферма, пшеничное поле, свежий хлеб
function taleHen() {
  return `<defs>${sky('tH', [[0, '#9fd2f0'], [1, '#fdf1d2']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#tH)"/>${sun(560, 56, 22)}${cloud(160, 46, .8)}
  ${hills(180, '#a9cf72', 22)}
  <!-- амбар и мельница -->
  <g transform="translate(140 196)"><rect x="-50" y="-60" width="100" height="60" fill="#c0392b"/><path d="M-58 -58L0 -100L58 -58z" fill="#8e2a20"/><path d="M-20 0v-40h40v40M-20 -40l40 40M20 -40l-40 40" stroke="#f4eee0" stroke-width="4" fill="none"/><rect x="-10" y="-80" width="20" height="14" fill="#f4eee0"/></g>
  <g transform="translate(300 190)"><path d="M-14 0l6 -70h16l6 70z" fill="#e8dcc0"/><circle cx="0" cy="-70" r="5" fill="#6e4a22"/>${[0, 90, 180, 270].map(a => `<rect x="-4" y="-120" width="8" height="50" fill="#b08a5a" transform="rotate(${a + 20} 0 -70)"/>`).join('')}</g>
  <!-- пшеница -->
  <rect x="0" y="200" width="${W}" height="80" fill="#e3b84a"/>${Array.from({ length: 46 }, (_, i) => { const x = 6 + i * 14, h = 26 + (i * 7) % 14; return `<path d="M${x} 214v-${h}" stroke="#c9952a" stroke-width="2"/><ellipse cx="${x}" cy="${214 - h}" rx="3" ry="7" fill="#f3d06a"/>`; }).join('')}
  <!-- курочка -->
  <g transform="translate(400 250)"><ellipse cx="0" cy="-22" rx="30" ry="22" fill="#c8502a"/><path d="M-26 -30q-22 -16 -14 -34q10 8 18 18z" fill="#a83e1e"/><circle cx="24" cy="-44" r="14" fill="#c8502a"/><path d="M18 -58q4 -8 8 -2q4 -8 8 0q2 6 -4 6z" fill="#e02a2a"/><path d="M36 -46l10 4l-10 4z" fill="#f3b02a"/><path d="M34 -36q4 8 -2 10q-4 -4 2 -10z" fill="#e02a2a"/><circle cx="28" cy="-48" r="2.4" fill="#222"/><path d="M-8 -28q12 10 26 0" stroke="#a83e1e" stroke-width="3" fill="none"/><path d="M-6 0v14M8 0v14M-10 14h8M4 14h8" stroke="#f3b02a" stroke-width="3" stroke-linecap="round"/></g>
  <!-- цыплята и хлеб -->
  ${[[470, 262], [500, 268]].map(([x, y]) => `<g transform="translate(${x} ${y})"><circle r="9" fill="#ffd84a"/><circle cx="8" cy="-8" r="6" fill="#ffd84a"/><path d="M13 -8l5 2l-5 2z" fill="#f39a2a"/><circle cx="9" cy="-9" r="1.2" fill="#222"/></g>`).join('')}
  <g transform="translate(560 262)"><ellipse cx="0" cy="0" rx="40" ry="18" fill="#c98a3a"/><path d="M-40 0q0 -26 40 -26q40 0 40 26z" fill="#e0a85a"/>${[-18, 0, 18].map(k => `<path d="M${k - 6} -18q6 -6 12 0" stroke="#b07028" stroke-width="3" fill="none"/>`).join('')}<path d="M-14 -34q-4 -10 2 -16M6 -36q-4 -10 2 -16" stroke="#fff" stroke-width="2.5" fill="none" opacity=".7"/></g>`;
}

// Златовласка: стол с тремя мисками и три стула в лесном домике
function taleGoldilocks() {
  const bowl = (x, y, r, c) => `<g transform="translate(${x} ${y})"><path d="M${-r} 0a${r} ${r * .7} 0 0 0 ${r * 2} 0z" fill="${c}"/><ellipse cx="0" cy="0" rx="${r}" ry="${r * .25}" fill="#f3e2b8"/><path d="M-4 -8q-4 -8 2 -14M5 -8q-4 -8 2 -14" stroke="#fff" stroke-width="2" fill="none" opacity=".6"/></g>`;
  const chair = (x, s, broken) => `<g transform="translate(${x} 262) scale(${s})" fill="#8a5a2e"><rect x="-16" y="-80" width="6" height="80"/><rect x="10" y="-36" width="6" height="${broken ? 20 : 36}"${broken ? ' transform="rotate(25 13 -36)"' : ''}/><rect x="-16" y="-40" width="32" height="6"/><rect x="-16" y="-80" width="32" height="6"/><rect x="-16" y="-64" width="32" height="5"/></g>`;
  return `<defs>${sky('tG', [[0, '#f3d9a8'], [1, '#e6c38a']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#tG)"/>${Array.from({ length: 16 }, (_, i) => `<path d="M${i * 40} 0v230" stroke="#d3ab6e" stroke-width="2" opacity=".5"/>`).join('')}
  <!-- окно в лес -->
  <g transform="translate(320 30)"><rect x="-70" y="0" width="140" height="96" fill="#9fd4ee"/>${cypress(-40, 96, 70, '#3f7a3a')}${cypress(-10, 96, 50, '#4e8c46')}${cypress(36, 96, 76, '#3f7a3a')}<path d="M-70 48h140M0 0v96" stroke="#8a5a2e" stroke-width="5"/><rect x="-70" y="0" width="140" height="96" fill="none" stroke="#8a5a2e" stroke-width="8"/>
  <!-- Златовласка заглядывает в окно -->
  <circle cx="44" cy="66" r="12" fill="#f3c9a8"/><path d="M30 62q2 -20 16 -18q16 2 12 26q-4 -14 -10 -12q-6 -6 -18 4z" fill="#f2c13a"/><circle cx="40" cy="66" r="1.6" fill="#333"/><circle cx="48" cy="66" r="1.6" fill="#333"/></g>
  <rect x="0" y="230" width="${W}" height="50" fill="#a06a36"/>${Array.from({ length: 8 }, (_, i) => `<path d="M${i * 90} 230l-30 50" stroke="#8a5628" stroke-width="2"/>`).join('')}
  <!-- стол -->
  <rect x="150" y="166" width="340" height="12" fill="#7a4a24"/><rect x="164" y="178" width="10" height="70" fill="#6a3e1e"/><rect x="466" y="178" width="10" height="70" fill="#6a3e1e"/><path d="M150 166h340" stroke="#c94a3a" stroke-width="5" stroke-dasharray="14 14"/>
  ${bowl(220, 166, 34, '#3a6aa8')}${bowl(318, 166, 26, '#c0503a')}${bowl(400, 166, 17, '#e0a83a')}
  <path d="M432 164l18 -22" stroke="#bbb" stroke-width="4" stroke-linecap="round"/>
  ${chair(70, 1.3, false)}${chair(540, 1, false)}${chair(600, .7, true)}<rect x="598" y="256" width="20" height="5" fill="#8a5a2e" transform="rotate(-14 608 258)"/>`;
}

// Джек и бобовый стебель: стебель до облаков, замок великана, домик внизу
function taleBeanstalk() {
  const leaves = Array.from({ length: 7 }, (_, i) => { const y = 240 - i * 22, x = 300 + Math.sin(i * 1.3) * 28; return `<path d="M${x} ${y}q${i % 2 ? 26 : -26} -10 ${i % 2 ? 34 : -34} 4q${i % 2 ? -18 : 18} 10 ${i % 2 ? -34 : 34} -4z" fill="#4ea84a"/>`; }).join('');
  return `<defs>${sky('tB', [[0, '#6aaee8'], [.6, '#b8def5'], [1, '#e9f6fb']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#tB)"/>${sun(560, 70, 18)}
  ${cloud(380, 98, 2.4, '#fff', .95)}${cloud(470, 104, 1.6, '#fff', .95)}${cloud(290, 104, 1.6, '#fff', .95)}
  <!-- замок -->
  <g transform="translate(380 84)" fill="#a8a2b8"><rect x="-50" y="-30" width="100" height="40"/><rect x="-62" y="-56" width="22" height="66"/><rect x="40" y="-56" width="22" height="66"/>${[-62, -54, -46, 40, 48, 56].map(x => `<rect x="${x}" y="-62" width="6" height="8"/>`).join('')}<path d="M-64 -62l13 -16l13 16zM38 -62l13 -16l13 16z" fill="#7a6aa8"/><path d="M-8 10v-18a8 8 0 0 1 16 0v18z" fill="#5a4a6a"/></g>
  ${hills(232, '#7cbf5a', 18)}<rect x="0" y="250" width="${W}" height="30" fill="#5fa043"/>
  <!-- стебель -->
  <path d="M300 262C270 220 330 190 300 150S280 110 310 92" stroke="#3a8a3a" stroke-width="12" fill="none" stroke-linecap="round"/>${leaves}
  <!-- Джек карабкается -->
  <g transform="translate(316 132)"><rect x="-6" y="-4" width="12" height="18" rx="3" fill="#3a6ad0"/><circle cx="0" cy="-12" r="7" fill="#f3c9a8"/><path d="M-7 -14q7 -10 14 0z" fill="#8a4a1a"/><path d="M-6 0l-10 -8M6 0l8 -10M-4 14l-6 12M4 14l4 12" stroke="#f3c9a8" stroke-width="3" stroke-linecap="round"/></g>
  <!-- домик и корова -->
  <g transform="translate(110 252)"><rect x="-34" y="-36" width="68" height="36" fill="#efe4cc"/><path d="M-42 -34L0 -64L42 -34z" fill="#c9a24a"/><rect x="-8" y="-22" width="16" height="22" fill="#6a4a2a"/><rect x="16" y="-28" width="12" height="10" fill="#9fd4ee"/></g>
  <g transform="translate(470 258)"><ellipse cx="0" cy="-16" rx="26" ry="14" fill="#fff"/><ellipse cx="-8" cy="-20" rx="8" ry="6" fill="#333"/><ellipse cx="12" cy="-12" rx="6" ry="5" fill="#333"/><ellipse cx="28" cy="-24" rx="10" ry="8" fill="#fff"/><ellipse cx="34" cy="-20" rx="5" ry="4" fill="#f5b8c0"/><path d="M22 -32l-4 -6M32 -32l4 -6" stroke="#ccc" stroke-width="3"/>${[-16, -6, 8, 18].map(k => `<rect x="${k}" y="-4" width="4" height="10" fill="#eee"/>`).join('')}</g>
  ${[[520, 268], [560, 262], [600, 270]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#8a5ac8"/>`).join('')}`;
}

// Дик Уиттингтон: мальчик с котом на холме, вдали Лондон и звон колоколов
function taleWhittington() {
  const bell = (x, y) => `<path d="M${x - 10} ${y}q0 -18 10 -18q10 0 10 18z" fill="#e0b43a"/><circle cx="${x}" cy="${y + 2}" r="3" fill="#b88a1a"/>`;
  return `<defs>${sky('tW', [[0, '#f2a86a'], [.5, '#f7d29a'], [1, '#fbebc8']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#tW)"/>${sun(470, 120, 26, '#fff0b0', .5)}
  <!-- Лондон вдали: собор Святого Павла с куполом и фонарём, квадратные колокольни, Тауэр -->
  <g fill="#9a8aa0" opacity=".9"><rect x="290" y="156" width="320" height="44"/>
    <rect x="404" y="134" width="92" height="24"/><rect x="418" y="110" width="64" height="26"/>${[424, 436, 448, 460, 472].map(x => `<rect x="${x}" y="114" width="4" height="18" fill="#b8a8bc"/>`).join('')}<path d="M416 112q34 -40 68 0z"/><rect x="445" y="80" width="10" height="16"/><path d="M450 80v-16M445 70h10" stroke="#9a8aa0" stroke-width="2.5"/>
    ${[[320, 120], [570, 128]].map(([x, y]) => `<rect x="${x - 12}" y="${y}" width="24" height="${158 - y}"/>${[-12, -4, 4].map(k => `<rect x="${x + k}" y="${y - 6}" width="6" height="7"/>`).join('')}`).join('')}
    <rect x="340" y="140" width="28" height="18"/>${[340, 350, 360].map(x => `<rect x="${x}" y="134" width="6" height="7"/>`).join('')}</g>
  ${bell(340, 70)}${bell(388, 52)}${bell(436, 66)}
  <path d="M300 60q-10 10 0 20M286 54q-16 16 0 32M484 60q10 10 0 20M498 54q16 16 0 32" stroke="#c98a2a" stroke-width="2.5" fill="none" opacity=".8"/>
  <path d="M0 200q160 -70 340 -20q160 40 300 10V${H}H0z" fill="#7aa84a"/><path d="M0 240q200 -40 640 0V${H}H0z" fill="#5e8c3a"/>
  <!-- дорожный камень -->
  <path d="M232 214v-30q14 -10 28 0v30z" fill="#b8b0a0"/><path d="M238 196h16M238 204h12" stroke="#7a7266" stroke-width="2"/>
  <!-- мальчик с узелком -->
  <g transform="translate(170 214)"><path d="M-12 0l4 -40h16l4 40z" fill="#5a6a3a"/><circle cx="0" cy="-50" r="11" fill="#f3c9a8"/><path d="M-12 -54q2 -14 12 -14q12 0 12 12l-6 -4z" fill="#6a4020"/><path d="M-11 -58h24" stroke="#3a3a3a" stroke-width="4"/><circle cx="4" cy="-50" r="1.6" fill="#333"/>
    <path d="M6 -36l30 -30" stroke="#7a5228" stroke-width="3" stroke-linecap="round"/><circle cx="38" cy="-70" r="11" fill="#c0503a"/><path d="M32 -70h12M38 -76v12" stroke="#f3e0c0" stroke-width="1.5"/></g>
  <!-- кот -->
  <g transform="translate(206 214)"><ellipse cx="0" cy="-8" rx="13" ry="9" fill="#3a3a3a"/><circle cx="12" cy="-20" r="7" fill="#3a3a3a"/><path d="M7 -25l1 -7l4 5zM14 -26l3 -6l2 7z" fill="#3a3a3a"/><circle cx="14" cy="-21" r="1.3" fill="#f3d04a"/><path d="M-12 -10q-12 -6 -8 -20" stroke="#3a3a3a" stroke-width="4" fill="none" stroke-linecap="round"/></g>
  <path d="M60 280q60 -40 110 -66" stroke="#d9c49a" stroke-width="16" fill="none" opacity=".7"/>`;
}

// ---------- карачаево-балкарские сказки ----------
// Кавказский хребет со снежными шапками
const range = (base, c = '#6f86a0', snow = '#f4f7fb') => [[90, 150, 120], [250, 190, 150], [430, 165, 140], [590, 140, 110]].map(([x, h, w]) =>
  `<path d="M${x - w} ${base}L${x} ${base - h}L${x + w} ${base}Z" fill="${c}"/><path d="M${x - w * .22} ${base - h * .78}L${x} ${base - h}L${x + w * .22} ${base - h * .78}l${-w * .1} 8l${-w * .12} -6l${-w * .12} 7z" fill="${snow}"/>`).join('');
// Каменная сакля с плоской крышей
const saklya = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-40" y="-42" width="80" height="42" fill="#b9a68a"/>${[-30, -18, -6].map(k => `<path d="M-40 ${k}h80" stroke="#9c8a6e" stroke-width="2" opacity=".6"/>`).join('')}<rect x="-46" y="-48" width="92" height="8" fill="#7a6248"/><rect x="-10" y="-26" width="20" height="26" fill="#5a3e28"/><rect x="18" y="-34" width="14" height="12" fill="#f2d98a"/></g>`;
const person = (x, y, s = 1, coat = '#5a4a3a', hat = '#e8e2d6', beard = false) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-12 0l3 -42h18l3 42z" fill="${coat}"/><circle cx="0" cy="-50" r="9" fill="#e9c4a0"/><path d="M-11 -54q0 -14 11 -14q11 0 11 14z" fill="${hat}"/>${beard ? '<path d="M-7 -46q7 14 14 0z" fill="#f2f2f2"/>' : ''}<circle cx="3" cy="-51" r="1.4" fill="#333"/></g>`;
const bear = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#7a4e2c"><ellipse cx="0" cy="-30" rx="34" ry="26"/><circle cx="28" cy="-56" r="18"/><circle cx="18" cy="-72" r="6"/><circle cx="38" cy="-72" r="6"/><ellipse cx="40" cy="-52" rx="8" ry="6" fill="#a87a52"/><circle cx="44" cy="-54" r="2.2" fill="#222"/><circle cx="32" cy="-60" r="2" fill="#222"/>${[-22, -8, 10, 22].map(k => `<rect x="${k}" y="-10" width="10" height="12" rx="4"/>`).join('')}</g>`;
const wolf = (x, y, s = 1, head = '#6c7580') => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-30 0q-4 -26 14 -34q16 -6 26 4l14 -4l-4 10q8 10 2 22z" fill="#6c7580"/><path d="M4 -30q8 -12 20 -8l12 6l-12 8z" fill="${head}"/><path d="M8 -36l2 -12l6 10z" fill="${head}"/><circle cx="16" cy="-32" r="1.8" fill="#fff"/><path d="M-30 -12q-14 -10 -10 -24" stroke="#6c7580" stroke-width="8" fill="none" stroke-linecap="round"/></g>`;
const fox = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="-14" rx="22" ry="12" fill="#e07a2a"/><path d="M14 -20l14 -10l8 8l-10 8z" fill="#e07a2a"/><path d="M20 -30l2 -10l5 8zM28 -30l4 -8l3 8z" fill="#c25e18"/><circle cx="28" cy="-24" r="1.6" fill="#222"/><path d="M-20 -14q-30 -4 -26 -26q6 18 24 16z" fill="#e07a2a"/><path d="M-44 -38q-4 6 2 8" stroke="#fff" stroke-width="5" stroke-linecap="round"/>${[-14, -4, 6, 14].map(k => `<rect x="${k}" y="-4" width="4" height="8" fill="#c25e18"/>`).join('')}</g>`;
const goat = (x, y, s = 1, c = '#f2efe8') => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="-20" rx="24" ry="13" fill="${c}"/><path d="M18 -26l10 -14l10 4l-4 14z" fill="${c}"/><path d="M28 -40q-6 -14 6 -18M32 -40q2 -12 12 -12" stroke="#8a7a62" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M34 -24q2 10 -2 12" stroke="#d8d0c0" stroke-width="3"/><circle cx="31" cy="-34" r="1.6" fill="#222"/>${[-16, -6, 8, 16].map(k => `<rect x="${k}" y="-9" width="4" height="12" fill="#c9c0ae"/>`).join('')}</g>`;

// Мудрость старика: аул под горами, на старой дороге взошла пшеница
function taleKrcElder() {
  return `<defs>${sky('kE', [[0, '#8cc4ea'], [1, '#eef6fb']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#kE)"/>${sun(560, 50, 18)}${cloud(150, 42, .8)}
  ${range(190)}${hills(196, '#88b060', 22)}<rect x="0" y="214" width="${W}" height="66" fill="#a8c46e"/>
  ${saklya(110, 210, .8)}${saklya(190, 204, .65)}
  <path d="M260 280q60 -40 200 -64q80 -12 180 -14" stroke="#c9a46a" stroke-width="26" fill="none"/>
  ${Array.from({ length: 22 }, (_, i) => { const x = 280 + i * 16, y = 268 - i * 2.8; return `<path d="M${x} ${y}v-10M${x} ${y - 6}l-4 -4M${x} ${y - 8}l4 -4" stroke="#4e9a3a" stroke-width="2" stroke-linecap="round"/>`; }).join('')}
  ${person(300, 250, 1.1, '#3e4a5a', '#e8e2d6', true)}<path d="M314 250l6 -46" stroke="#7a5228" stroke-width="3" stroke-linecap="round"/>
  ${person(350, 252, 1.15, '#6a3e2a', '#2b2b2b')}`;
}

// Дележ добычи: медведь, волк с красной головой и лиса на поляне
function taleKrcShare() {
  return `<defs>${sky('kS', [[0, '#a6d4f0'], [1, '#f2f8ec']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#kS)"/>${cloud(500, 46, .9)}
  ${cypress(40, 240, 140, '#2f5a3a')}${cypress(80, 240, 110, '#3a6a44')}${cypress(600, 240, 150, '#2f5a3a')}${cypress(560, 240, 100, '#3a6a44')}
  ${hills(206, '#7cb85a', 16)}<rect x="0" y="226" width="${W}" height="54" fill="#6aa84f"/>
  ${bear(250, 250, 1.3)}${wolf(440, 248, 1.15, '#d23a2a')}<path d="M470 196l6 -10M484 200l10 -6M478 190l2 -12" stroke="#f3c04a" stroke-width="2.5" stroke-linecap="round"/>
  ${fox(130, 252, 1.2)}
  <g transform="translate(340 262)"><ellipse cx="0" cy="-8" rx="12" ry="8" fill="#c8b8a0"/><ellipse cx="10" cy="-20" rx="3" ry="9" fill="#c8b8a0"/><ellipse cx="4" cy="-20" rx="3" ry="9" fill="#c8b8a0"/></g>`;
}

// Ёлмезбий: всадник едет к сияющей земле, на скале огромная птица
function taleKrcOlmezbiy() {
  return `<defs>${sky('kO', [[0, '#3b3f7a'], [.55, '#d07a6a'], [1, '#f6c98a']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#kO)"/>${stars(18, 5)}${sun(520, 150, 30, '#ffe6a0', .5)}
  ${range(210, '#4e4a70', '#f6dcc8')}
  <path d="M0 230q200 -30 640 -10V${H}H0z" fill="#5a4a5a"/>
  <path d="M60 280q160 -50 460 -64" stroke="#b89a7a" stroke-width="14" fill="none" opacity=".8"/>
  <!-- всадник -->
  <g transform="translate(210 246)"><path d="M-36 -10q0 -22 30 -24l30 -2q16 -2 22 -16l8 4q-4 16 -14 22v16z" fill="#3a2a22"/>${[-30, -18, 10, 22].map(k => `<path d="M${k} -6l-2 22" stroke="#3a2a22" stroke-width="5" stroke-linecap="round"/>`).join('')}<path d="M-36 -26q-14 6 -14 22" stroke="#3a2a22" stroke-width="5" fill="none"/>
    <path d="M-12 -36l2 -30h14l2 30z" fill="#1e1e2e"/><circle cx="-3" cy="-74" r="8" fill="#e0b896"/><path d="M-12 -78q0 -12 9 -12q9 0 9 12z" fill="#2b2b2b"/><path d="M-14 -40l-20 4" stroke="#1e1e2e" stroke-width="4"/></g>
  <!-- огромная птица на скале -->
  <path d="M470 236l20 -60h60l24 60z" fill="#3e3450"/>
  <g transform="translate(520 176)"><path d="M-40 -10q20 -30 40 -26q20 -4 40 26q-20 -10 -40 -6q-20 -4 -40 6z" fill="#2a2030"/><circle cx="0" cy="-30" r="9" fill="#2a2030"/><path d="M8 -30l10 4l-10 3z" fill="#f3b02a"/></g>`;
}

// Коза и волк: сакля в горах, козлята в окне, волк за камнем
function taleKrcGoat() {
  return `<defs>${sky('kG', [[0, '#9ccff0'], [1, '#f0f8fb']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#kG)"/>${sun(80, 50, 18)}${cloud(300, 40, .9)}
  ${range(200)}${hills(206, '#7cb85a', 18)}<rect x="0" y="224" width="${W}" height="56" fill="#6aa84f"/>
  ${saklya(300, 232, 1.4)}
  ${[0, 1, 2].map(i => `<g transform="translate(${331 + i * 6} ${194})"><circle r="4" fill="#f2efe8"/><circle cx="1.5" cy="-1" r="1" fill="#222"/></g>`).join('')}
  ${goat(150, 258, 1.4)}
  <path d="M470 250q-4 -40 40 -46q46 -4 54 40z" fill="#8a8a8a"/><path d="M480 246q10 -30 40 -32" stroke="#a8a8a8" stroke-width="3" fill="none"/>
  <g transform="translate(470 214)"><path d="M0 0q14 -18 34 -10l12 4l-12 10q-14 8 -34 -4z" fill="#6c7580"/><path d="M14 -12l4 -12l6 10z" fill="#545c66"/><circle cx="30" cy="-6" r="1.8" fill="#fff"/></g>`;
}

// Лиса и журавль: плоское блюдо и высокий кувшин
function taleKrcCrane() {
  return `<defs>${sky('kC', [[0, '#f3dcae'], [1, '#e8c48a']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#kC)"/>${Array.from({ length: 16 }, (_, i) => `<path d="M${i * 40} 0v210" stroke="#d7b47a" stroke-width="2" opacity=".5"/>`).join('')}
  <rect x="0" y="210" width="${W}" height="70" fill="#a8743e"/>
  <rect x="200" y="196" width="240" height="10" fill="#7a4a24"/><rect x="214" y="206" width="8" height="40" fill="#6a3e1e"/><rect x="418" y="206" width="8" height="40" fill="#6a3e1e"/>
  <ellipse cx="270" cy="194" rx="42" ry="6" fill="#e8e0d0"/><ellipse cx="270" cy="192" rx="34" ry="3.5" fill="#f0d89a"/>
  <g transform="translate(380 196)"><path d="M-18 0q-8 -30 6 -46q-4 -14 0 -26h24q4 12 0 26q14 16 6 46z" fill="#b8642e"/><rect x="-7" y="-76" width="14" height="6" fill="#8a4a22"/><path d="M-12 -40h24" stroke="#e0a060" stroke-width="3"/></g>
  ${fox(140, 262, 1.6)}
  <!-- журавль -->
  <g transform="translate(520 262)"><path d="M-6 0v-60M6 0v-60" stroke="#2a2a2a" stroke-width="3"/><ellipse cx="0" cy="-74" rx="26" ry="16" fill="#e8ecef"/><path d="M-26 -74q-14 6 -8 18q10 -8 14 -14z" fill="#2a2a2a"/><path d="M14 -84q10 -30 2 -54" stroke="#e8ecef" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="16" cy="-140" r="8" fill="#e8ecef"/><circle cx="16" cy="-146" r="3.5" fill="#d23a2a"/><path d="M22 -140l40 6l-40 2z" fill="#3a3a3a"/><circle cx="18" cy="-142" r="1.4" fill="#222"/></g>`;
}

// ---------- старинные английские песни ----------
const moon = (x, y, r, bg) => `<circle cx="${x}" cy="${y}" r="${r * 1.8}" fill="#fff6c8" opacity=".12"/><circle cx="${x}" cy="${y}" r="${r}" fill="#fff3c0"/><circle cx="${x + r * .45}" cy="${y - r * .25}" r="${r * .85}" fill="${bg}"/>`;
const star5 = (x, y, r, c = '#ffe27a') => `<path d="${Array.from({ length: 10 }, (_, i) => { const a = Math.PI / 5 * i - Math.PI / 2, rr = i % 2 ? r * .45 : r; return `${i ? 'L' : 'M'}${(x + Math.cos(a) * rr).toFixed(1)} ${(y + Math.sin(a) * rr).toFixed(1)}`; }).join('')}Z" fill="${c}"/>`;
const sparkle = (x, y, r, c = '#fff') => `<path d="M${x} ${y - r}Q${x + r * .15} ${y - r * .15} ${x + r} ${y}Q${x + r * .15} ${y + r * .15} ${x} ${y + r}Q${x - r * .15} ${y + r * .15} ${x - r} ${y}Q${x - r * .15} ${y - r * .15} ${x} ${y - r}z" fill="${c}"/>`;
const snowflakes = (n, seed = 1) => Array.from({ length: n }, (_, i) => `<circle cx="${(i * 89 + seed * 31) % W}" cy="${(i * 47 + seed * 13) % 250}" r="${1.4 + (i % 3) * .8}" fill="#fff" opacity=".85"/>`).join('');
const horse = (x, y, s = 1, c = '#8a5a34') => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="-34" rx="30" ry="14" fill="${c}"/><path d="M22 -42l14 -26l12 4l-4 10l-10 2l-6 16z" fill="${c}"/><path d="M34 -68l2 -8l4 7z" fill="${c}"/><path d="M24 -46q4 -20 14 -24" stroke="#3a2414" stroke-width="5" fill="none"/><circle cx="40" cy="-62" r="1.6" fill="#222"/><path d="M-30 -36q-12 4 -10 20" stroke="#3a2414" stroke-width="5" fill="none" stroke-linecap="round"/>${[-22, -12, 12, 22].map((k, i) => `<path d="M${k} -24l${i % 2 ? 4 : -4} 24" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`).join('')}</g>`;
const sailship = (x, y, s = 1, hull = '#5a3a22', sail = '#f4efe2') => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-60 0h120l-18 20h-86z" fill="${hull}"/><path d="M-60 0h120" stroke="#2a1a10" stroke-width="2"/><path d="M-20 0v-92M24 0v-76" stroke="#3a2414" stroke-width="3"/><path d="M-50 -10q30 -30 0 -76h56q-24 40 4 76z" fill="${sail}"/><path d="M0 -8q22 -26 0 -60h44q-18 30 4 60z" fill="${sail}" opacity=".95"/><path d="M-20 -92l14 6l-14 6z" fill="#c0392b"/></g>`;
const lady = (x, y, s = 1, dress = '#3f8a4a', hair = '#8a4a1a') => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-30 0q4 -50 22 -66h16q18 16 22 66z" fill="${dress}"/><path d="M-8 -66q-18 6 -24 30q8 2 14 -8zM8 -66q18 6 24 30q-8 2 -14 -8z" fill="#2f6e38"/><path d="M-10 -66l10 18l10 -18z" fill="#f3e2c0"/><circle cx="0" cy="-78" r="10" fill="#f3c9a8"/><path d="M-11 -78q0 -16 11 -16q11 0 11 16q-3 -8 -11 -9q-8 1 -11 9zM-11 -80q-4 16 -2 24h4zM11 -80q4 16 2 24h-4z" fill="${hair}"/><circle cx="-4" cy="-78" r="1.4" fill="#333"/><circle cx="4" cy="-78" r="1.4" fill="#333"/></g>`;

// Звёздочка: ночное небо, большая мерцающая звезда, дом со светлым окном
function songTwinkle() {
  return `<defs>${sky('sTw', [[0, '#141a46'], [.6, '#2f3f86'], [1, '#5a6fb0']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#sTw)"/>${stars(46, 3)}${moon(90, 60, 22, '#1a2152')}
  <circle cx="400" cy="92" r="70" fill="#ffe27a" opacity=".08"/><circle cx="400" cy="92" r="44" fill="#ffe27a" opacity=".14"/>${star5(400, 92, 30)}${sparkle(400, 92, 52, '#fff8d8')}
  ${sparkle(250, 60, 10)}${sparkle(540, 50, 8)}${sparkle(560, 140, 6)}${sparkle(180, 130, 7)}
  ${hills(214, '#1f2a5a', 24)}<path d="M0 250q200 -30 640 -6V${H}H0z" fill="#161f44"/>
  <g transform="translate(150 240)"><rect x="-44" y="-50" width="88" height="50" fill="#2c3666"/><path d="M-54 -48L0 -86L54 -48z" fill="#22294f"/><rect x="-28" y="-38" width="24" height="20" fill="#ffd87a"/><path d="M-16 -38v20M-28 -28h24" stroke="#2c3666" stroke-width="2"/><rect x="12" y="-30" width="18" height="30" fill="#1a2040"/>
  <circle cx="-16" cy="-24" r="4" fill="#f3c9a8"/></g>
  <!-- путник с фонарём -->
  <g transform="translate(470 256)"><path d="M-8 0l3 -30h10l3 30z" fill="#3a3a5a"/><circle cx="0" cy="-36" r="6" fill="#e9c4a0"/><path d="M-7 -38q7 -10 14 0z" fill="#2a2a40"/><path d="M6 -24l12 -4" stroke="#3a3a5a" stroke-width="3"/><path d="M-6 -24l-6 26" stroke="#7a5228" stroke-width="2.5"/><circle cx="20" cy="-26" r="10" fill="#ffd87a" opacity=".3"/><rect x="17" y="-30" width="6" height="8" fill="#ffd87a"/></g>`;
}

// Ферма Макдональда: красный амбар, корова, свинья, утка, овца, лошадь
function songFarm() {
  const cow = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="-16" rx="26" ry="14" fill="#fff"/><ellipse cx="-8" cy="-20" rx="8" ry="6" fill="#333"/><ellipse cx="12" cy="-12" rx="6" ry="5" fill="#333"/><ellipse cx="28" cy="-24" rx="10" ry="8" fill="#fff"/><ellipse cx="34" cy="-20" rx="5" ry="4" fill="#f5b8c0"/><path d="M22 -32l-4 -6M32 -32l4 -6" stroke="#ccc" stroke-width="3"/>${[-16, -6, 8, 18].map(k => `<rect x="${k}" y="-4" width="4" height="10" fill="#eee"/>`).join('')}</g>`;
  const sheep = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})">${[[-14, -18], [0, -24], [14, -18], [-6, -12], [8, -12]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="11" fill="#f6f3ea"/>`).join('')}<ellipse cx="24" cy="-22" rx="7" ry="9" fill="#3a3a3a"/><circle cx="26" cy="-24" r="1.4" fill="#fff"/>${[-12, -2, 8, 16].map(k => `<rect x="${k}" y="-6" width="3" height="10" fill="#3a3a3a"/>`).join('')}</g>`;
  const duck = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="-10" rx="16" ry="10" fill="#fff"/><circle cx="12" cy="-22" r="8" fill="#3a8a4a"/><path d="M19 -22l9 2l-9 3z" fill="#f3a02a"/><circle cx="13" cy="-24" r="1.3" fill="#222"/><path d="M-16 -12l-6 -6l2 10z" fill="#fff"/></g>`;
  const note = (x, y) => `<path d="M${x} ${y}v-18l12 -4v18" stroke="#5a3a6a" stroke-width="2.5" fill="none"/><ellipse cx="${x - 3}" cy="${y}" rx="4" ry="3" fill="#5a3a6a"/><ellipse cx="${x + 9}" cy="${y - 4}" rx="4" ry="3" fill="#5a3a6a"/>`;
  return `<defs>${sky('sFa', [[0, '#8ccaf0'], [1, '#e8f6fc']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#sFa)"/>${sun(570, 50, 20)}${cloud(150, 44, .8)}${cloud(380, 36, .6)}
  ${hills(170, '#a5d276', 20)}<rect x="0" y="200" width="${W}" height="80" fill="#7cbf5a"/>
  <g transform="translate(120 210)"><rect x="-60" y="-70" width="120" height="70" fill="#c0392b"/><path d="M-70 -68L0 -116L70 -68z" fill="#8e2a20"/><path d="M-22 0v-44h44v44M-22 -44l44 44M22 -44l-44 44" stroke="#f4eee0" stroke-width="4" fill="none"/><rect x="-12" y="-92" width="24" height="16" fill="#f4eee0"/><path d="M-12 -84h24" stroke="#8e2a20" stroke-width="2"/></g>
  <path d="M200 236h440M200 220h440" stroke="#b08a5a" stroke-width="4"/>${Array.from({ length: 12 }, (_, i) => `<rect x="${210 + i * 36}" y="210" width="6" height="34" fill="#9a7444"/>`).join('')}
  ${cow(280, 260, 1.1)}${pig(390, 266, 1.1)}${sheep(480, 266, 1)}${duck(560, 266, 1)}${horse(600, 236, .8)}
  ${note(250, 160)}${note(430, 140)}${note(520, 176)}`;
}

// Лодка на тихой речке, утки и камыш
function songRow() {
  return `<defs>${sky('sRo', [[0, '#9fd4f2'], [1, '#f2f8e4']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#sRo)"/>${sun(90, 56, 22)}${cloud(300, 46, .8)}${cloud(520, 60, .7)}
  ${hills(150, '#98c86a', 18)}<path d="M0 170q160 -20 320 -4t320 0V${H}H0z" fill="#79b056"/>
  ${cypress(70, 172, 60, '#3f7a3a')}${cypress(96, 172, 44, '#4e8c46')}${cypress(560, 168, 70, '#3f7a3a')}${cypress(590, 170, 50, '#4e8c46')}
  <path d="M0 200q160 -24 320 -10t320 -6V${H}H0z" fill="#4a9ac8"/>
  ${Array.from({ length: 12 }, (_, i) => `<path d="M${(i * 113) % 600} ${214 + (i % 5) * 12}q14 -6 28 0" stroke="#bfe4f6" stroke-width="2.5" fill="none" opacity=".7"/>`).join('')}
  <g transform="translate(330 236)"><path d="M-70 -8h140q-10 22 -30 24h-80q-20 -2 -30 -24z" fill="#b5652e"/><path d="M-70 -8h140" stroke="#7a3e18" stroke-width="3"/>
  <path d="M-6 -8l3 -32h14l3 32z" fill="#d24a3a"/><circle cx="4" cy="-48" r="9" fill="#f3c9a8"/><path d="M-6 -52q10 -14 20 0z" fill="#f2d45a"/><circle cx="7" cy="-49" r="1.4" fill="#333"/>
  <path d="M-60 26L40 -36M60 26L-30 -36" stroke="#7a5228" stroke-width="4" stroke-linecap="round"/><ellipse cx="-64" cy="28" rx="10" ry="4" fill="#7a5228"/><ellipse cx="64" cy="28" rx="10" ry="4" fill="#7a5228"/></g>
  ${[[500, 250], [530, 258]].map(([x, y]) => `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="0" rx="12" ry="6" fill="#8a6a3a"/><circle cx="9" cy="-8" r="5" fill="#3a7a4a"/><path d="M14 -8l6 1l-6 2z" fill="#f3a02a"/></g>`).join('')}
  ${Array.from({ length: 7 }, (_, i) => `<path d="M${20 + i * 10} 270q-4 -40 4 -60" stroke="#5a8a3a" stroke-width="3" fill="none"/><ellipse cx="${24 + i * 10}" cy="${214 - (i % 3) * 6}" rx="3" ry="9" fill="#7a5228"/>`).join('')}`;
}

// Старый Лондонский мост с домами на арках, Темза, падающие камни
function songBridge() {
  return `<defs>${sky('sBr', [[0, '#c4d6e4'], [1, '#f4ead6']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#sBr)"/>${sun(540, 70, 20, '#ffe9a8', .3)}${cloud(140, 50, .9, '#fff', .7)}${cloud(400, 40, .7, '#fff', .7)}
  <g fill="#a8a0b0" opacity=".8"><rect x="40" y="130" width="60" height="60"/><path d="M36 130h68l-34 -22z"/><rect x="540" y="120" width="70" height="70"/><rect x="560" y="96" width="20" height="26"/><path d="M556 96h28l-14 -18z"/></g>
  ${sea(186, '#5a7f98', '#b8d4e2')}
  <!-- мост: арки и опоры -->
  <path d="M60 190h520v-36H60z" fill="#b9a68a"/>
  ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${84 + i * 84} 190v-14a28 22 0 0 1 56 0v14z" fill="#5a7f98"/>`).join('')}
  ${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${76 + i * 84} 196h24l-4 -10h-16z" fill="#9c8a6e"/>`).join('')}
  <!-- дома на мосту -->
  ${[[90, 54, '#e8d8b8'], [160, 70, '#d9c49a'], [250, 60, '#efe2c6'], [330, 50, '#d9c49a'], [400, 64, '#e8d8b8'], [480, 56, '#efe2c6']].map(([x, h, c], i) => `<rect x="${x}" y="${154 - h}" width="${i === 3 ? 0 : 60}" height="${h}" fill="${c}"/><path d="M${x - 4} ${154 - h}l${34} -22l${34} 22z" fill="#8a4a35" opacity="${i === 3 ? 0 : 1}"/>${i === 3 ? '' : `<path d="M${x} ${154 - h + 14}h60M${x + 20} ${154 - h}v${h}M${x + 40} ${154 - h}v${h}" stroke="#6a4a30" stroke-width="2.5"/><rect x="${x + 6}" y="${154 - h + 20}" width="10" height="10" fill="#f0d89a"/><rect x="${x + 44}" y="${154 - h + 20}" width="10" height="10" fill="#f0d89a"/>`}`).join('')}
  <!-- провал и падающие камни -->
  <path d="M330 154l10 10l12 -8l14 12l14 -14v-0z" fill="#e4dcc8"/>
  ${[[350, 176, 0], [366, 200, 20], [342, 214, -15], [372, 232, 35]].map(([x, y, r]) => `<rect x="${x}" y="${y}" width="12" height="9" fill="#9c8a6e" transform="rotate(${r} ${x + 6} ${y + 4})"/>`).join('')}
  <path d="M340 252q20 -6 40 0" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/>`;
}

// Шотландский берег: девушка на скале смотрит на корабль за морем, ветер
function songBonnie() {
  return `<defs>${sky('sBo', [[0, '#7a9cc0'], [.6, '#c9d8e6'], [1, '#eef0ea']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#sBo)"/>${cloud(320, 50, 1.1, '#f4f6fa', .8)}${cloud(520, 80, .8, '#f4f6fa', .7)}
  ${sea(150, '#3f6f94', '#a8cbe2')}
  ${sailship(470, 160, .45)}
  ${[0, 1, 2].map(i => `<path d="M${200 + i * 30} ${70 + i * 26}q40 -16 80 0t80 0" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".75"/>`).join('')}
  <path d="M0 150q40 -30 100 -30q80 0 120 40q30 30 40 120H0z" fill="#6a7a5a"/><path d="M0 170q60 -30 140 -20q60 10 90 60l20 70H0z" fill="#566848"/>
  ${Array.from({ length: 10 }, (_, i) => `<circle cx="${30 + i * 18}" cy="${142 - (i % 3) * 4 + (i > 6 ? 12 : 0)}" r="4" fill="#9a6ab8"/>`).join('')}
  ${lady(150, 142, .9, '#4a6a9a', '#c0702a')}
  <path d="M168 76q20 -4 30 6" stroke="#c0702a" stroke-width="3" fill="none"/>`;
}

// Зимние сани с колокольчиками, лошадь, снег
function songJingle() {
  const bellJ = (x, y) => `<path d="M${x - 6} ${y}q0 -12 6 -12q6 0 6 12z" fill="#e0b43a"/><circle cx="${x}" cy="${y + 2}" r="2" fill="#a8801a"/>`;
  return `<defs>${sky('sJi', [[0, '#2a3a6a'], [.7, '#6a7ab0'], [1, '#c8d2ea']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#sJi)"/>${stars(20, 7)}${moon(560, 54, 18, '#2c3c6c')}
  ${cypress(70, 190, 90, '#1f4a3a')}${cypress(110, 190, 70, '#2a5a44')}${cypress(600, 186, 80, '#1f4a3a')}
  <path d="M0 180q160 -30 320 -10t320 -4V${H}H0z" fill="#e8eef8"/><path d="M0 230q200 -30 640 -6V${H}H0z" fill="#f6f9fd"/>
  <path d="M60 252q200 -20 520 -10" stroke="#c8d4e8" stroke-width="3" fill="none"/>
  ${horse(400, 246, 1, '#5a3a24')}
  <path d="M376 212h-60" stroke="#8a2a2a" stroke-width="3"/>${[388, 400, 412].map(x => bellJ(x, 214)).join('')}
  <!-- сани -->
  <g transform="translate(250 244)"><path d="M-70 -6h110q20 0 24 -30h10q-2 40 -34 44h-110z" fill="#b02a2a"/><path d="M-80 10h130q24 0 30 -14" stroke="#e0b43a" stroke-width="4" fill="none" stroke-linecap="round"/><rect x="-64" y="-30" width="80" height="24" fill="#c83a3a"/>
  ${[[-44, '#2a6ab0', '#f2d45a'], [-14, '#2a8a4a', '#6a3a1a']].map(([x, coat, hair]) => `<path d="M${x - 10} -30l3 -26h14l3 26z" fill="${coat}"/><circle cx="${x}" cy="-62" r="8" fill="#f3c9a8"/><path d="M${x - 9} -64q9 -14 18 0z" fill="${hair}"/><path d="M${x - 9} -60h18" stroke="#e8e8e8" stroke-width="3"/>`).join('')}</g>
  ${snowflakes(40, 2)}
  <path d="M470 150q10 -10 20 0M490 140q10 -10 20 0" stroke="#fff" stroke-width="2" fill="none" opacity=".7"/>`;
}

// Каньон золотоискателей: шахта, хижина, река и утята
function songClementine() {
  return `<defs>${sky('sCl', [[0, '#f2b26a'], [.6, '#f8d8a0'], [1, '#fcecc8']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#sCl)"/>${sun(320, 70, 24, '#fff2b0', .4)}
  <path d="M0 60h120l20 30h40l10 40l-30 150H0z" fill="#b8643a"/><path d="M0 120h90l30 30l-20 130H0z" fill="#9a4e2a"/>
  <path d="M640 50h-110l-20 40h-40l-16 50l40 140h146z" fill="#b8643a"/><path d="M640 110h-90l-30 40l30 130h90z" fill="#9a4e2a"/>
  ${[[30, 90], [60, 160], [580, 100], [610, 190]].map(([x, y]) => `<path d="M${x} ${y}h40" stroke="#7a3a1a" stroke-width="3" opacity=".5"/>`).join('')}
  <!-- шахта -->
  <g transform="translate(70 200)"><path d="M-24 0v-40a24 24 0 0 1 48 0v40z" fill="#3a2414"/><path d="M-28 0v-44h56v44" stroke="#8a5a2a" stroke-width="6" fill="none"/><path d="M-28 -44h56" stroke="#8a5a2a" stroke-width="8"/></g>
  <path d="M40 210l140 10" stroke="#6a4a2a" stroke-width="3"/><g transform="translate(150 214)"><rect x="-16" y="-14" width="32" height="14" fill="#6a4a2a"/><circle cx="-10" cy="2" r="4" fill="#3a2a1a"/><circle cx="10" cy="2" r="4" fill="#3a2a1a"/>${[-8, 0, 8].map(k => `<circle cx="${k}" cy="-16" r="4" fill="#e0b43a"/>`).join('')}</g>
  <!-- хижина -->
  <g transform="translate(510 196)"><rect x="-40" y="-40" width="80" height="40" fill="#8a5a34"/>${[-32, -24, -16, -8].map(k => `<path d="M-40 ${k}h80" stroke="#6a4024" stroke-width="2"/>`).join('')}<path d="M-48 -38L0 -66L48 -38z" fill="#5a3a22"/><rect x="-8" y="-24" width="16" height="24" fill="#3a2414"/><rect x="16" y="-32" width="12" height="10" fill="#f2d98a"/></g>
  <!-- река -->
  <path d="M190 280q40 -40 130 -50t130 -30q30 -6 40 0q-10 30 -60 46t-110 34z" fill="#4a9ac8"/>
  ${[[300, 244], [330, 236], [360, 228]].map(([x, y], i) => `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="0" rx="${i ? 7 : 10}" ry="${i ? 4 : 5}" fill="#ffd84a"/><circle cx="${i ? 6 : 8}" cy="-5" r="${i ? 3.5 : 4.5}" fill="#ffd84a"/><path d="M${i ? 9 : 12} -5l4 1l-4 2z" fill="#f39a2a"/></g>`).join('')}
  <!-- Клементина -->
  ${lady(250, 236, .8, '#d24a6a', '#6a3a1a')}<rect x="226" y="230" width="20" height="9" fill="#a87a4a"/><rect x="254" y="230" width="20" height="9" fill="#a87a4a"/>`;
}

// Парусник после бури: тучи расходятся, лучи рассвета над морем
function songGrace() {
  return `<defs>${sky('sGr', [[0, '#4a5a7a'], [.45, '#e8a87a'], [1, '#ffe2a8']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#sGr)"/>
  ${Array.from({ length: 9 }, (_, i) => `<path d="M420 150L${200 + i * 60} 0h22z" fill="#fff4c8" opacity=".18"/>`).join('')}
  ${sun(420, 150, 26, '#fff0b0', .5)}
  ${cloud(120, 40, 1.6, '#5a6480', .9)}${cloud(260, 30, 1.3, '#6a7490', .85)}${cloud(600, 46, 1.4, '#5a6480', .9)}
  <path d="M60 70l-8 22l10 -2l-8 22" stroke="#ffe27a" stroke-width="2.5" fill="none" opacity=".6"/>
  ${sea(160, '#2f5a7f', '#f2c890')}
  <path d="M0 160h${W}" stroke="#f8d8a0" stroke-width="2" opacity=".7"/>
  ${sailship(250, 214, 1, '#4a2e1a', '#efe4cc')}
  ${Array.from({ length: 6 }, (_, i) => `<path d="M${120 + i * 60} ${236 + (i % 2) * 14}q20 -10 40 0" stroke="#d8ecf8" stroke-width="3" fill="none" opacity=".6"/>`).join('')}
  ${[[520, 90], [548, 102], [572, 88]].map(([x, y]) => `<path d="M${x - 8} ${y}q8 -6 8 0q0 -6 8 0" stroke="#3a3a4a" stroke-width="2" fill="none"/>`).join('')}`;
}

// Ярмарка в Скарборо: замок на утёсе, палатки и травы
function songScarborough() {
  const tent = (x, c) => `<g transform="translate(${x} 236)"><rect x="-30" y="-30" width="60" height="30" fill="#f4ead6"/><path d="M-36 -30L0 -58L36 -30z" fill="${c}"/>${[-24, -12, 0, 12, 24].map(k => `<path d="M${k} -30v8" stroke="${c}" stroke-width="5"/>`).join('')}<rect x="-24" y="-14" width="48" height="6" fill="#a87a4a"/><path d="M0 -58v-10" stroke="#6a4a2a" stroke-width="2"/><path d="M0 -68l10 3l-10 3z" fill="${c}"/></g>`;
  const herb = (x, c, h) => `<path d="M${x} 280v-${h}" stroke="#4a7a3a" stroke-width="2"/>${Array.from({ length: 4 }, (_, i) => `<ellipse cx="${x + (i % 2 ? 5 : -5)}" cy="${280 - h + 6 + i * 8}" rx="5" ry="2.5" fill="${c}"/>`).join('')}`;
  return `<defs>${sky('sSc', [[0, '#9ec8e6'], [1, '#eef6f6']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#sSc)"/>${sun(90, 50, 18)}${cloud(260, 44, .7)}
  ${sea(150, '#3f7fa8', '#b8dcef')}
  <path d="M380 160q30 -60 120 -70q90 -6 140 0V${H}H380z" fill="#7a6a52"/><path d="M400 170q60 -40 240 -50V${H}H400z" fill="#5f7a42"/>
  <g transform="translate(540 92)" fill="#9a8e7a"><rect x="-50" y="-30" width="100" height="30"/><rect x="-62" y="-60" width="26" height="60"/><rect x="30" y="-50" width="24" height="50"/>${[-62, -54, -46, 30, 38, 46].map(x => `<rect x="${x}" y="-66" width="6" height="8"/>`).join('')}<rect x="-6" y="-18" width="12" height="18" fill="#5a4e3e"/></g>
  <path d="M0 200q200 -30 420 -6t220 6V${H}H0z" fill="#8cbf5a"/>
  ${tent(90, '#c0392b')}${tent(200, '#2a6ab0')}${tent(310, '#e0a020')}${tent(420, '#3a8a4a')}
  ${person(150, 262, .8, '#6a4a2a', '#3a3a3a')}${person(372, 264, .8, '#2a4a6a', '#8a5a2a')}
  ${herb(500, '#5aa04a', 34)}${herb(530, '#8aa88a', 28)}${herb(560, '#6a9a7a', 40)}${herb(590, '#7ab05a', 26)}`;
}

// Дама в зелёном платье с лютней в саду эпохи Тюдоров
function songGreensleeves() {
  return `<defs>${sky('sGs', [[0, '#e8d8b8'], [1, '#c8b890']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#sGs)"/>
  <!-- фахверковый дом -->
  <g transform="translate(480 220)"><rect x="-110" y="-120" width="220" height="120" fill="#f4ead6"/><path d="M-120 -118L0 -170L120 -118z" fill="#7a3a2a"/>
  ${[-110, -70, -30, 10, 50, 90].map(x => `<path d="M${x} -120v120" stroke="#3a2a1a" stroke-width="6"/>`).join('')}<path d="M-110 -60h220" stroke="#3a2a1a" stroke-width="6"/>${[-90, -10, 70].map(x => `<path d="M${x - 20} -120l40 60M${x + 20} -120l-40 60" stroke="#3a2a1a" stroke-width="4"/>`).join('')}
  ${[-50, 30].map(x => `<rect x="${x}" y="-44" width="24" height="28" fill="#a8c8d8"/><path d="M${x} -30h24M${x + 12} -44v28" stroke="#3a2a1a" stroke-width="2"/>`).join('')}</g>
  <rect x="0" y="220" width="${W}" height="60" fill="#6a9a4a"/>
  ${Array.from({ length: 6 }, (_, i) => `<circle cx="${30 + i * 50}" cy="216" r="16" fill="#4a7a3a"/><circle cx="${26 + i * 50}" cy="210" r="4" fill="#d84a6a"/>`).join('')}
  ${lady(200, 262, 1.6, '#3f8a4a', '#8a4a1a')}
  <!-- лютня -->
  <g transform="translate(250 180) rotate(-30)"><ellipse cx="0" cy="0" rx="20" ry="26" fill="#b8742e"/><circle cx="0" cy="0" r="6" fill="#5a3414"/><rect x="-4" y="-66" width="8" height="42" fill="#7a4a1e"/><path d="M-4 -66l-8 -10h24l-8 10z" fill="#5a3414"/><path d="M-2 -60v66M2 -60v66" stroke="#f4ead6" stroke-width=".8"/></g>`;
}

// Новогодняя ночь в Шотландии: друзья в кругу, салют над холмами
function songAuld() {
  const firework = (x, y, r, c) => Array.from({ length: 12 }, (_, i) => { const a = Math.PI / 6 * i; return `<path d="M${x + Math.cos(a) * r * .3} ${y + Math.sin(a) * r * .3}L${(x + Math.cos(a) * r).toFixed(1)} ${(y + Math.sin(a) * r).toFixed(1)}" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/><circle cx="${(x + Math.cos(a) * r).toFixed(1)}" cy="${(y + Math.sin(a) * r).toFixed(1)}" r="2.5" fill="${c}"/>`; }).join('');
  return `<defs>${sky('sAu', [[0, '#0f1638'], [.7, '#2a2f6a'], [1, '#4a3f7a']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#sAu)"/>${stars(30, 9)}
  ${firework(130, 70, 40, '#ffd84a')}${firework(320, 50, 34, '#ff6a8a')}${firework(510, 80, 44, '#6ad8ff')}
  <path d="M0 190q100 -60 220 -40q120 20 200 -30q120 -40 220 20V${H}H0z" fill="#1f2a4a"/><path d="M0 230q200 -40 640 -10V${H}H0z" fill="#2a3a5a"/>
  <!-- часы с полуночью -->
  <g transform="translate(560 170)"><rect x="-14" y="-60" width="28" height="80" fill="#3a3f6a"/><path d="M-18 -60h36l-18 -22z" fill="#2a2f5a"/><circle cx="0" cy="-40" r="10" fill="#ffe7a8"/><path d="M0 -40v-8" stroke="#3a3f6a" stroke-width="2"/></g>
  <!-- друзья в кругу, скрещённые руки -->
  ${[[200, '#8a2a2a'], [250, '#2a6a4a'], [300, '#c0702a'], [350, '#3a4a9a'], [400, '#8a2a6a']].map(([x, c], i) => `<g transform="translate(${x} 262)"><path d="M-12 0l3 -40h18l3 40z" fill="${c}"/><circle cx="0" cy="-48" r="9" fill="#f3c9a8"/><path d="M-9 -52q9 -14 18 0z" fill="${['#6a3a1a', '#e0b040', '#3a2a1a', '#a0502a', '#2a2a2a'][i]}"/></g>`).join('')}
  <path d="M190 236q35 -12 70 0q35 -12 70 0q35 -12 70 0q35 -12 70 0" stroke="#f3c9a8" stroke-width="4" fill="none"/><path d="M190 228q35 12 70 0q35 12 70 0q35 12 70 0q35 12 70 0" stroke="#f3c9a8" stroke-width="4" fill="none"/>
  <!-- тартан под ногами -->
  <rect x="160" y="262" width="280" height="10" fill="#8a2a2a"/>${Array.from({ length: 14 }, (_, i) => `<path d="M${164 + i * 20} 262v10" stroke="#2a4a2a" stroke-width="4"/>`).join('')}`;
}

// ---------- греческие песни и стихи ----------
// Белый кубический домик с синей дверью и окнами
const cube = (x, y, w, h, door = '#2f6fb5') => `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="#fbfaf6"/><rect x="${x}" y="${y - h}" width="${w}" height="3" fill="#e4e0d6"/><rect x="${x + w * .4}" y="${y - h * .55}" width="${w * .22}" height="${h * .55}" fill="${door}"/><rect x="${x + w * .12}" y="${y - h * .75}" width="${w * .16}" height="${h * .22}" fill="${door}"/>`;
const dancer = (x, y, s = 1, shirt = '#f4f1ea', leg = 0) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-6 -40l-${4 - leg} 40M6 -40l${4 + leg} 40" stroke="#2a2a3a" stroke-width="6" stroke-linecap="round"/><path d="M-12 -40l2 -34h20l2 34z" fill="${shirt}"/><circle cx="0" cy="-84" r="10" fill="#e3b48e"/><path d="M-10 -88q10 -12 20 0" fill="#2a1d14"/><path d="M-11 -70l-22 -2M11 -70l22 -2" stroke="${shirt}" stroke-width="6" stroke-linecap="round"/></g>`;
const kid = (x, y, s = 1, coat = '#c0392b', cap = '#2f4f8a') => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-10 0l2 -30h16l2 30z" fill="${coat}"/><circle cx="0" cy="-37" r="8" fill="#f1c7a0"/><path d="M-9 -40q9 -12 18 0z" fill="${cap}"/><circle cx="3" cy="-37" r="1.2" fill="#333"/></g>`;
const dove = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#fff"><ellipse cx="0" cy="0" rx="16" ry="8"/><circle cx="14" cy="-5" r="6"/><path d="M19 -5l6 2l-6 2z" fill="#e09a4a"/><path d="M-4 -4q-10 -24 10 -26q-2 14 4 22z" opacity=".95"/><path d="M-14 0l-12 -6v10z"/><circle cx="15" cy="-6" r="1" fill="#333"/></g>`;
const column = (x, y, h, c = '#efe8d8') => `<rect x="${x - 9}" y="${y - h}" width="18" height="${h}" fill="${c}"/>${[-4, 0, 4].map(k => `<path d="M${x + k} ${y - h + 6}v${h - 10}" stroke="#d3c8b0" stroke-width="1.5"/>`).join('')}<rect x="${x - 13}" y="${y - h - 6}" width="26" height="6" fill="${c}"/><rect x="${x - 12}" y="${y - 5}" width="24" height="5" fill="${c}"/>`;
const flame = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -46q-18 18 -10 34q4 10 10 12q6 -2 10 -12q8 -16 -10 -34z" fill="#f3842a"/><path d="M0 -30q-9 10 -5 20q2 5 5 6q3 -1 5 -6q4 -10 -5 -20z" fill="#ffd76a"/></g>`;
const branch = (x, y, s = 1, c = '#3f7a46', rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0q40 -10 80 -2" stroke="#6a4a2a" stroke-width="2.5" fill="none"/>${Array.from({ length: 7 }, (_, i) => `<ellipse cx="${10 + i * 10}" cy="${i % 2 ? 6 : -8}" rx="8" ry="3.5" fill="${c}" transform="rotate(${i % 2 ? 25 : -25} ${10 + i * 10} ${i % 2 ? 6 : -8})"/>`).join('')}</g>`;

// Колядки: ночь, дети с треугольником у двери, кораблик с огоньками
function elKalanta() {
  return `<defs>${sky('eKa', [[0, '#1b2350'], [1, '#41508e']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#eKa)"/>${stars(36, 7)}${star5(520, 54, 18)}${sparkle(520, 54, 34, '#fff8d8')}
  <rect x="0" y="236" width="${W}" height="44" fill="#e9eef6"/>${snowflakes(22, 4)}
  <rect x="90" y="120" width="230" height="116" fill="#f2ebdc"/><path d="M80 122L205 70L330 122z" fill="#b5523a"/>
  <rect x="180" y="166" width="44" height="70" fill="#2f5f9a"/><circle cx="216" cy="204" r="3" fill="#e0b43a"/>
  <rect x="112" y="146" width="42" height="34" fill="#ffd87a"/><path d="M133 146v34M112 163h42" stroke="#f2ebdc" stroke-width="3"/>
  <rect x="252" y="146" width="42" height="34" fill="#ffd87a"/><path d="M273 146v34M252 163h42" stroke="#f2ebdc" stroke-width="3"/>
  <path d="M230 186a6 6 0 1 0 0.1 0" fill="#f6d36a"/>
  ${kid(370, 250, 1.3, '#c0392b')}${kid(410, 252, 1.15, '#2f7a4a', '#c0392b')}${kid(446, 250, 1.25, '#3a4a9a', '#e0b040')}
  <path d="M352 196l14 -22l14 22z" stroke="#d9d9e0" stroke-width="3" fill="none"/><path d="M380 200l-12 -16" stroke="#a0a0aa" stroke-width="2"/>
  <!-- кораблик с огоньками -->
  <g transform="translate(560 238)"><path d="M-40 0h80l-12 14h-56z" fill="#f4f1ea"/><path d="M0 0v-70" stroke="#6a4a2a" stroke-width="3"/><path d="M2 -66l30 56h-30zM-2 -60l-26 50h26z" fill="#fbfaf6"/>
  ${Array.from({ length: 9 }, (_, i) => `<circle cx="${-36 + i * 9}" cy="${-4 - Math.abs(4 - i) * 0}" r="2.6" fill="${['#ffd76a', '#ff7a6a', '#7ad0ff'][i % 3]}"/>`).join('')}
  ${Array.from({ length: 6 }, (_, i) => `<circle cx="${2 + i * 5}" cy="${-62 + i * 10}" r="2.4" fill="${['#ffd76a', '#ff7a6a', '#7ad0ff'][i % 3]}"/>`).join('')}</g>`;
}

// Пирей: окно с геранью, гавань, корабли на закате
function elPeiraia() {
  return `<defs>${sky('ePe', [[0, '#f6a05a'], [.55, '#fbd49a'], [1, '#fde9c4']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#ePe)"/>${sun(470, 150, 30, '#ffdd7a', .45)}${cloud(330, 60, .7, '#fff1de')}
  ${sea(170, '#3d7bb0', '#bfe0f4')}
  <path d="M250 196h300v10h-300z" fill="#8a8f96"/>${boat(340, 186, .9)}${sailship(520, 172, .55)}${boat(620, 190, .6)}
  ${[270, 300, 450].map(x => `<path d="M${x} 196v-40" stroke="#c0392b" stroke-width="3"/><path d="M${x} 156l30 0" stroke="#c0392b" stroke-width="2"/>`).join('')}
  <!-- окно героини -->
  <rect x="0" y="0" width="200" height="${H}" fill="#e9d9bf"/><rect x="34" y="40" width="130" height="170" fill="url(#ePe)"/>
  <rect x="34" y="40" width="130" height="170" fill="none" stroke="#3f72a8" stroke-width="10"/><path d="M99 40v170" stroke="#3f72a8" stroke-width="6"/>
  <path d="M10 40h22v170h-22zM166 40h24v170h-24z" fill="#2f6fb5"/>${[52, 80, 108, 136, 164, 192].map(y => `<path d="M12 ${y}h18M168 ${y}h20" stroke="#245a95" stroke-width="3"/>`).join('')}
  <rect x="26" y="210" width="146" height="12" fill="#cbb89a"/><rect x="46" y="222" width="106" height="26" fill="#c2603e"/>
  ${[60, 82, 104, 126, 140].map((x, i) => `<circle cx="${x}" cy="${206 - (i % 2) * 8}" r="9" fill="#d8344a"/><circle cx="${x + 6}" cy="${214}" r="6" fill="#3f8a46"/>`).join('')}
  ${[0, 1, 2, 3].map(i => `<path d="M${120 + i * 26} ${120 - i * 14}c-6 -8 -16 0 -8 8l8 8l8 -8c8 -8 -2 -16 -8 -8z" fill="#e0405a" opacity="${.9 - i * .15}"/>`).join('')}`;
}

// Сиртаки: двое танцуют на берегу Крита под луной
function elZorbas() {
  return `<defs>${sky('eZo', [[0, '#0f2a4a'], [.6, '#2f5f8a'], [1, '#6f9cc0']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#eZo)"/>${stars(30, 9)}${moon(520, 60, 26, '#18365a')}
  <path d="M0 150q120 -40 260 -20t220 -10t160 10V200H0z" fill="#1f3a55"/>${sea(186, '#245a85', '#9cc8e8')}
  <path d="M0 238q220 -24 640 -4V${H}H0z" fill="#d9c79c"/><path d="M0 250q260 -20 640 0" stroke="#efe2c0" stroke-width="3" fill="none"/>
  ${dancer(270, 262, 1, '#f4f1ea', 2)}${dancer(320, 262, 1, '#2a2a3a', -2)}${dancer(370, 262, 1, '#f4f1ea', 4)}
  <path d="M254 192h132" stroke="#e3b48e" stroke-width="5" stroke-linecap="round"/>
  <path d="M110 256q-10 -40 6 -70" stroke="#5a4a3a" stroke-width="4" fill="none"/>${[[-6, -66], [10, -74], [20, -60], [-14, -56]].map(([a, b]) => `<path d="M116 ${256 + b}q${a} -10 ${a * 2.4} 2" stroke="#3f6a46" stroke-width="4" fill="none"/>`).join('')}
  ${[0, 1, 2].map(i => `<path d="M${440 + i * 40} ${150 - i * 20}v-14l9 -3v14" stroke="#fff3c0" stroke-width="2" fill="none" opacity=".75"/><ellipse cx="${438 + i * 40}" cy="${150 - i * 20}" rx="3" ry="2.2" fill="#fff3c0" opacity=".75"/>`).join('')}`;
}

// Пасмурное воскресенье: тучи и дождь над крышами, бузуки у окна
function elKyriaki() {
  const bouzouki = `<g transform="translate(470 210) rotate(-30)"><ellipse cx="0" cy="0" rx="34" ry="26" fill="#a0602a"/><ellipse cx="0" cy="0" rx="24" ry="18" fill="#c47a3a"/><circle cx="-4" cy="0" r="6" fill="#3a2414"/><rect x="28" y="-4" width="120" height="8" fill="#5a3a22"/><rect x="146" y="-7" width="20" height="14" rx="3" fill="#3a2414"/>${[-2, 0, 2].map(k => `<path d="M-20 ${k}h170" stroke="#f0e0c0" stroke-width=".7"/>`).join('')}</g>`;
  return `<defs>${sky('eKy', [[0, '#6c7685'], [1, '#a8b0ba']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#eKy)"/>
  ${cloud(110, 50, 1.6, '#59616e', .95)}${cloud(320, 40, 1.9, '#4e5662', .95)}${cloud(530, 56, 1.5, '#5c6470', .95)}${cloud(230, 80, 1.2, '#666e7a', .9)}
  ${Array.from({ length: 40 }, (_, i) => `<path d="M${(i * 53) % W} ${90 + (i * 37) % 120}l-6 16" stroke="#cfd6de" stroke-width="1.6" opacity=".6"/>`).join('')}
  ${[[0, 160, 90, 120], [86, 180, 70, 100], [150, 150, 110, 130], [255, 175, 80, 105], [330, 140, 100, 140]].map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#8d8f92"/><path d="M${x} ${y}h${w}" stroke="#6c6e72" stroke-width="4"/>${Array.from({ length: Math.floor(w / 24) }, (_, i) => `<rect x="${x + 8 + i * 24}" y="${y + 16}" width="12" height="16" fill="#5a5e66"/><rect x="${x + 8 + i * 24}" y="${y + 50}" width="12" height="16" fill="#5a5e66"/>`).join('')}`).join('')}
  <rect x="430" y="120" width="210" height="160" fill="#5a4636"/><rect x="430" y="120" width="210" height="10" fill="#3e3026"/>
  <rect x="452" y="150" width="70" height="54" fill="#9aa4b0"/><path d="M487 150v54M452 177h70" stroke="#3e3026" stroke-width="4"/>
  ${bouzouki}<rect x="540" y="236" width="80" height="8" fill="#3e3026"/><path d="M560 236v-18h16v18" fill="#e9e2d6"/><path d="M566 216q4 -10 0 -16" stroke="#e9e2d6" stroke-width="2" fill="none" opacity=".6"/>`;
}

// Олимп и Кисавос: две горы спорят, на вершине орёл
function elOlympos() {
  const eagle = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#3a2a1e"><path d="M0 0q-30 -20 -60 -10q24 2 36 14q-18 0 -30 10q30 -4 54 -6z"/><path d="M0 0q30 -20 60 -10q-24 2 -36 14q18 0 30 10q-30 -4 -54 -6z"/><ellipse cx="0" cy="2" rx="8" ry="12"/><circle cx="0" cy="-12" r="6" fill="#f4f1ea"/><path d="M4 -12l6 3l-6 2z" fill="#e0a02a"/></g>`;
  return `<defs>${sky('eOl', [[0, '#79aee0'], [1, '#dcebf6']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#eOl)"/>${sun(90, 50, 18)}${cloud(300, 90, .9)}${cloud(560, 60, .7)}
  ${peak(210, 250, 200, 200, '#5d7186', '#f4f7fb')}${peak(110, 250, 120, 110, '#6d8196', '#f4f7fb')}${peak(300, 250, 150, 120, '#66798e', '#f4f7fb')}
  ${peak(500, 250, 130, 150, '#7a6a58', '#e4dccb')}
  ${eagle(210, 64, .8)}
  ${[[160, 130], [250, 120], [300, 150]].map(([x, y]) => `<path d="M${x} ${y}v-22" stroke="#3a2414" stroke-width="2"/><path d="M${x} ${y - 22}h16v10h-16z" fill="#2f6fb5"/><path d="M${x} ${y - 17}h16" stroke="#fff" stroke-width="2.5"/>`).join('')}
  ${hills(236, '#6f9a54', 18)}<rect x="0" y="252" width="${W}" height="28" fill="#5e8a46"/>
  ${[60, 380, 420, 600].map(x => cypress(x, 260, 60)).join('')}
  <path d="M320 140q30 -16 60 0" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/><path d="M372 132l8 8l-10 2" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/>`;
}

// «Отказ»: тайная белая бухта, голубь, имя на песке, ветер
function elArnisi() {
  return `<defs>${sky('eAr', [[0, '#8fd0f2'], [1, '#e8f7fd']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#eAr)"/>${sun(540, 54, 22, '#fff2b0')}
  ${sea(130, '#2f8fc8', '#c8ecfa')}
  <path d="M0 80q60 -10 110 30q30 30 20 80q-10 50 -60 90H0z" fill="#e7e1d2"/><path d="M640 70q-70 0 -110 40q-30 40 -10 90q20 50 70 80h50z" fill="#ece6d8"/>
  ${cube(20, 120, 44, 34)}${cube(70, 136, 36, 28)}${cube(560, 112, 46, 34)}
  <path d="M90 280q120 -80 230 -76q120 4 230 76z" fill="#f5ecd4"/><path d="M120 280q110 -60 200 -60q100 0 200 60" fill="none" stroke="#e2d4b0" stroke-width="2"/>
  <path d="M250 246q10 -10 20 0t20 0t20 0t20 0" stroke="#b89a6a" stroke-width="2.5" fill="none" opacity=".8"/><path d="M340 244q8 -8 16 0t16 0" stroke="#b89a6a" stroke-width="2.5" fill="none" opacity=".35"/>
  ${[0, 1, 2].map(i => `<path d="M${360 + i * 30} ${226 - i * 6}q20 -8 40 0" stroke="#fff" stroke-width="2.5" fill="none" opacity="${.8 - i * .2}"/>`).join('')}
  ${dove(300, 70, 1.4)}`;
}

// Гимн свободе: сине-белый флаг на холме над Закинфом, лавровая ветвь
function elYmnos() {
  const flag = Array.from({ length: 9 }, (_, i) => `<rect x="0" y="${-120 + i * 10}" width="150" height="10" fill="${i % 2 ? '#fff' : '#1f5fa8'}"/>`).join('');
  return `<defs>${sky('eYm', [[0, '#5aa0de'], [1, '#d8ecfa']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#eYm)"/>${sun(110, 60, 24)}${cloud(470, 50, .8)}${cloud(250, 90, .6)}
  ${sea(190, '#2f7ab8', '#bfe0f4')}${hills(220, '#8aa86a', 30)}<rect x="0" y="246" width="${W}" height="34" fill="#6f9050"/>
  <g transform="translate(300 240)"><path d="M0 0v-140" stroke="#5a3a22" stroke-width="5"/><g transform="translate(2 -18)">${flag}<rect x="0" y="-120" width="50" height="50" fill="#1f5fa8"/><path d="M25 -120v50M0 -95h50" stroke="#fff" stroke-width="10"/></g></g>
  ${branch(120, 250, 1.1, '#4a7a3a', -14)}${branch(560, 254, -1.1, '#4a7a3a', 14)}
  ${[480, 520].map(x => cypress(x, 248, 70)).join('')}`;
}

// «Достойно есть»: солнце справедливости над островами, ветвь мирта
function elAxion() {
  return `<defs>${sky('eAx', [[0, '#2a80c8'], [.6, '#8ccaf0'], [1, '#e6f6fd']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#eAx)"/>
  ${Array.from({ length: 16 }, (_, i) => { const a = Math.PI * 2 * i / 16; return `<path d="M${320 + Math.cos(a) * 54} ${90 + Math.sin(a) * 54}L${320 + Math.cos(a) * 92} ${90 + Math.sin(a) * 92}" stroke="#ffe27a" stroke-width="${i % 2 ? 3 : 6}" stroke-linecap="round" opacity=".8"/>`; }).join('')}
  ${sun(320, 90, 40, '#ffd94a', .4)}
  ${sea(180, '#1f6fb0', '#bfe4f6')}
  <path d="M30 200q60 -70 130 -10z" fill="#b9a27a"/><path d="M420 200q70 -90 160 -8z" fill="#a8916a"/><path d="M520 196q24 -40 50 -60q20 30 40 60z" fill="#8a6a4a"/><path d="M566 136q4 -12 10 -16" stroke="#c0c0c0" stroke-width="4" opacity=".5"/>
  ${cube(60, 196, 26, 20)}${cube(92, 192, 22, 18)}${cube(450, 196, 26, 22)}${cube(480, 190, 22, 18)}
  ${Array.from({ length: 4 }, (_, i) => `<path d="M${430 + i * 14} 200v-10" stroke="#3f7a46" stroke-width="5" stroke-linecap="round"/>`).join('')}
  ${branch(40, 262, 1.6, '#2f6a3a', -8)}<circle cx="100" cy="250" r="4" fill="#fff"/><circle cx="140" cy="244" r="4" fill="#fff"/><circle cx="160" cy="254" r="3" fill="#3a2a5a"/>
  <g transform="translate(560 150)"><path d="M0 0q-30 -16 -50 -4q20 0 28 10z" fill="#3a2a1e"/><path d="M0 0q30 -16 50 -4q-20 0 -28 10z" fill="#3a2a1e"/></g>`;
}

// Итака: парусник плывёт к острову на рассвете
function elIthaki() {
  return `<defs>${sky('eIt', [[0, '#3b4a8a'], [.45, '#e88a6a'], [.8, '#fbd29a'], [1, '#fde9c4']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#eIt)"/>${stars(14, 2)}${sun(470, 168, 26, '#ffe08a', .5)}
  <path d="M340 170q60 -60 120 -50q60 10 110 -30q40 30 70 80z" fill="#5a5a7a"/><path d="M380 172q50 -30 100 -24q50 8 100 -14q30 20 60 38z" fill="#4a4a6a"/>
  ${cube(520, 160, 18, 14, '#3a4a7a')}${cube(542, 156, 16, 12, '#3a4a7a')}
  ${sea(170, '#2d4f84', '#f6c890')}
  <path d="M440 176l60 0" stroke="#ffe08a" stroke-width="3" opacity=".6"/><path d="M430 196l80 0M420 216l100 0" stroke="#ffd08a" stroke-width="2" opacity=".45"/>
  ${sailship(180, 226, 1)}<path d="M100 240q80 10 180 0" stroke="#e6f2fb" stroke-width="3" fill="none" opacity=".6"/>
  ${[[60, 150], [90, 140], [600, 120]].map(([x, y]) => `<path d="M${x} ${y}q6 -6 12 0q6 -6 12 0" stroke="#2a2a3a" stroke-width="2" fill="none"/>`).join('')}`;
}

// Олимпийский гимн: колонны храма, олимпийский огонь и лавровый венок
function elOlympiakos() {
  return `<defs>${sky('eOy', [[0, '#5aa0de'], [1, '#f2e4c4']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#eOy)"/>${sun(560, 54, 22)}${cloud(150, 50, .8)}
  ${hills(206, '#a6b07a', 24)}<rect x="0" y="234" width="${W}" height="46" fill="#cdbb8e"/>
  <path d="M60 250h300v-12h-300z" fill="#e2d8c2"/><path d="M50 262h320v-12h-320z" fill="#d8ccb0"/>
  ${[90, 140, 190, 240, 290, 330].map(x => column(x, 238, 120)).join('')}
  <path d="M68 112h284v-12h-284z" fill="#efe8d8"/><path d="M60 100L210 58L360 100z" fill="#e6dcc6"/><path d="M84 96L210 66L336 96z" fill="#d6c9ac"/>
  <g transform="translate(480 236)"><path d="M-24 0h48l-8 -50h-32z" fill="#8a6a3a"/><path d="M-30 -50h60v-8h-60z" fill="#a07a3a"/>${flame(0, -58, 1.3)}</g>
  <g transform="translate(560 240)"><path d="M-30 0a30 30 0 0 1 60 0" fill="none" stroke="#4a7a3a" stroke-width="3"/>${Array.from({ length: 9 }, (_, i) => { const a = Math.PI + Math.PI * i / 8; const x = Math.cos(a) * 30, y = Math.sin(a) * 30; return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="7" ry="3" fill="#4a7a3a" transform="rotate(${(a * 180 / Math.PI + 90).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`; }).join('')}</g>`;
}

// ---------- немецкие песни и стихи ----------
// Ель ярусами, с огоньками и звездой на макушке
const fir = (x, y, h, c = '#2f6a3a', lights = false) => `<g transform="translate(${x} ${y})">${[0, 1, 2, 3].map(i => { const w = h * (.42 - i * .08), yy = -h * (.18 + i * .2); return `<path d="M${-w} ${yy + h * .2}L0 ${yy - h * .12}L${w} ${yy + h * .2}z" fill="${c}"/>`; }).join('')}<rect x="${-h * .05}" y="0" width="${h * .1}" height="${h * .1}" fill="#6a4a2a"/>${lights ? Array.from({ length: 12 }, (_, i) => `<circle cx="${((i * 37) % 9 - 4) * h * .06}" cy="${-h * (.08 + (i % 6) * .13)}" r="${h * .018 + 1}" fill="${['#ffd76a', '#ff6a5a', '#7ad0ff'][i % 3]}"/>`).join('') + star5(0, -h * .8, h * .07) : ''}</g>`;
const bird = (x, y, s = 1, c = '#3a3a3a', belly = '#e8a040') => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="12" ry="9" fill="${c}"/><ellipse cx="2" cy="3" rx="7" ry="5" fill="${belly}"/><circle cx="9" cy="-6" r="6" fill="${c}"/><path d="M14 -6l6 1.5l-6 1.5z" fill="#e0a02a"/><circle cx="10" cy="-7" r="1.2" fill="#fff"/><path d="M-11 -2l-10 -4l2 8z" fill="${c}"/></g>`;
const note2 = (x, y, c = '#5a3a6a') => `<path d="M${x} ${y}v-16l10 -3v16" stroke="${c}" stroke-width="2.2" fill="none"/><ellipse cx="${x - 3}" cy="${y}" rx="3.6" ry="2.6" fill="${c}"/><ellipse cx="${x + 7}" cy="${y - 3}" rx="3.6" ry="2.6" fill="${c}"/>`;
const balloon = (x, y, r, c) => `<path d="M${x} ${y + r}q-4 20 4 40" stroke="#555" stroke-width="1" fill="none"/><ellipse cx="${x}" cy="${y}" rx="${r * .85}" ry="${r}" fill="${c}"/><ellipse cx="${x - r * .3}" cy="${y - r * .35}" rx="${r * .18}" ry="${r * .28}" fill="#fff" opacity=".45"/><path d="M${x - 3} ${y + r}h6l-3 4z" fill="${c}"/>`;

// O Tannenbaum: заснеженный лес, большая ёлка с огоньками, домик с окнами
function deTannenbaum() {
  return `<defs>${sky('dTa', [[0, '#16244e'], [1, '#3d5590']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#dTa)"/>${stars(30, 5)}${moon(560, 54, 20, '#1c2c5a')}${snowflakes(40, 3)}
  ${hills(206, '#dfe8f4', 18)}<rect x="0" y="236" width="${W}" height="44" fill="#eef3fa"/>
  ${[40, 90, 520, 600].map((x, i) => fir(x, 232 - i % 2 * 6, 80 + (i % 2) * 20, '#2a5a3a')).join('')}
  ${[40, 90, 520, 600].map((x, i) => `<path d="M${x - 24} ${200 - i % 2 * 10}q24 -8 48 0" stroke="#fff" stroke-width="5" opacity=".8"/>`).join('')}
  <g transform="translate(180 236)"><rect x="-50" y="-60" width="100" height="60" fill="#8a4a2a"/><path d="M-60 -58L0 -100L60 -58z" fill="#f4f6fa"/><rect x="-36" y="-44" width="24" height="22" fill="#ffd87a"/><rect x="12" y="-44" width="24" height="22" fill="#ffd87a"/><rect x="-8" y="-30" width="16" height="30" fill="#5a2e1a"/><rect x="26" y="-96" width="12" height="24" fill="#6a3a22"/></g>
  ${fir(380, 250, 200, '#2f6a3a', true)}
  ${[0, 1, 2].map(i => `<rect x="${330 + i * 44}" y="${238 - (i % 2) * 6}" width="28" height="${18 + (i % 2) * 6}" fill="${['#c0392b', '#2f6fb5', '#e0b040'][i]}"/><path d="M${344 + i * 44} ${238 - (i % 2) * 6}v${18 + (i % 2) * 6}" stroke="#fff" stroke-width="3"/>`).join('')}`;
}

// Alle Vögel sind schon da: весенняя ветка, птицы поют, ноты
function deVoegel() {
  return `<defs>${sky('dVo', [[0, '#9fd6f4'], [1, '#effaf0']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#dVo)"/>${sun(560, 56, 22)}${cloud(140, 50, .8)}${cloud(380, 36, .6)}
  ${hills(200, '#a8d878', 20)}<rect x="0" y="228" width="${W}" height="52" fill="#86c25a"/>
  ${Array.from({ length: 26 }, (_, i) => `<circle cx="${(i * 71) % W}" cy="${236 + (i * 17) % 36}" r="3.5" fill="${['#fff', '#ffd94a', '#f59ac0'][i % 3]}"/>`).join('')}
  <path d="M0 110q120 -6 220 20q100 24 200 8q90 -14 160 10" stroke="#6a4a2a" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M160 122q20 -30 50 -40M330 140q10 30 40 40M470 126q20 -26 50 -30" stroke="#6a4a2a" stroke-width="5" fill="none"/>
  ${[[70, 104], [130, 112], [210, 86], [260, 134], [370, 184], [420, 132], [520, 94], [560, 124]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="8" fill="#fbd4e4"/><circle cx="${x}" cy="${y}" r="3" fill="#f2a43a"/>${i % 2 ? `<ellipse cx="${x + 12}" cy="${y + 6}" rx="8" ry="4" fill="#5aa84a"/>` : ''}`).join('')}
  ${bird(110, 96, 1.2, '#2a2a2a', '#3a3a3a')}${bird(240, 120, 1.1, '#8a6a4a', '#e8a070')}${bird(350, 128, 1.2, '#3a3a4a', '#c8c8d0')}${bird(470, 114, 1.1, '#6a5a4a', '#f0c080')}
  ${note2(150, 70)}${note2(280, 80, '#2f6fb5')}${note2(400, 90, '#c0392b')}${note2(500, 70)}`;
}

// Stille Nacht: маленькая церковь в снегу под Зальцбургом, звёздная ночь
function deStillenacht() {
  return `<defs>${sky('dSn', [[0, '#0f1a3e'], [.7, '#2a3a74'], [1, '#4a5a94']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#dSn)"/>${stars(50, 11)}${star5(470, 50, 14)}${sparkle(470, 50, 28, '#fff8d8')}
  ${range(210, '#3a4a78', '#dfe6f2')}
  <path d="M0 236q200 -30 640 -10V${H}H0z" fill="#e8eef8"/>${snowflakes(26, 8)}
  <g transform="translate(300 236)"><rect x="-50" y="-60" width="100" height="60" fill="#f2ebdc"/><path d="M-58 -58L0 -94L58 -58z" fill="#7a3a2a"/><path d="M-58 -58L0 -94L58 -58" stroke="#fff" stroke-width="4" fill="none" opacity=".8"/>
  <rect x="-90" y="-120" width="34" height="120" fill="#f2ebdc"/><path d="M-96 -120L-73 -160L-50 -120z" fill="#7a3a2a"/><path d="M-73 -160v-14M-79 -168h12" stroke="#d9a521" stroke-width="2.5"/><rect x="-80" y="-108" width="14" height="18" rx="7" fill="#ffd87a"/>
  ${[-34, 18].map(k => `<rect x="${k}" y="-46" width="16" height="26" rx="8" fill="#ffd87a"/>`).join('')}<rect x="-8" y="-28" width="16" height="28" fill="#5a3a22"/><circle cx="0" cy="-74" r="7" fill="#ffd87a"/></g>
  ${[110, 160, 470, 520, 580].map((x, i) => fir(x, 240 - (i % 2) * 4, 60 + (i % 3) * 10, '#22405a')).join('')}
  <path d="M260 240q40 10 80 0" stroke="#ffd87a" stroke-width="10" opacity=".18"/>`;
}

// 99 Luftballons: разноцветные шары над городом, в небе следы самолётов
function deLuftballons() {
  const cols = ['#e74c3c', '#f39c12', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6', '#e84393', '#00b894'];
  return `<defs>${sky('dLu', [[0, '#6ab4e8'], [1, '#e8f4fb']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#dLu)"/>${cloud(500, 50, .9)}${cloud(120, 80, .7)}
  <path d="M420 30l200 50" stroke="#fff" stroke-width="3" opacity=".7" stroke-dasharray="10 6"/><path d="M620 80l-6 -6l2 8z" fill="#7a8a9a"/>
  ${Array.from({ length: 24 }, (_, i) => balloon(60 + (i * 97) % 520 + (i % 3) * 14, 50 + (i * 53) % 130, 9 + (i % 4) * 3, cols[i % cols.length])).join('')}
  ${[[0, 60], [50, 90], [110, 70], [170, 110], [240, 80], [300, 100], [370, 70], [430, 120], [500, 84], [560, 100]].map(([x, h], i) => `<rect x="${x}" y="${280 - h}" width="${60 - (i % 3) * 6}" height="${h}" fill="${['#5a6a80', '#4a5a70', '#6a7a90'][i % 3]}"/>${Array.from({ length: 3 }, (_, k) => `<rect x="${x + 8 + k * 14}" y="${290 - h}" width="8" height="10" fill="#cfe0f0" opacity=".7"/>`).join('')}`).join('')}
  <path d="M0 270h${W}" stroke="#3a4a5a" stroke-width="20"/>`;
}

// Atemlos: ночной город, сцена с огнями, пара танцует
function deAtemlos() {
  return `<defs>${sky('dAt', [[0, '#1a0f3a'], [.6, '#4a1f6a'], [1, '#8a3a8a']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#dAt)"/>${stars(30, 13)}
  ${[[0, 90], [60, 130], [120, 100], [470, 120], [530, 150], [590, 100]].map(([x, h]) => `<rect x="${x}" y="${230 - h}" width="54" height="${h}" fill="#2a1a4a"/>${Array.from({ length: 8 }, (_, k) => `<rect x="${x + 8 + (k % 3) * 14}" y="${240 - h + Math.floor(k / 3) * 20}" width="8" height="10" fill="#ffd98a" opacity="${.4 + (k % 3) * .2}"/>`).join('')}`).join('')}
  ${[[200, '#ff4fa0'], [320, '#4fd0ff'], [440, '#ffd94a']].map(([x, c]) => `<path d="M${x} 0L${x - 70} 240h140z" fill="${c}" opacity=".16"/>`).join('')}
  <rect x="160" y="230" width="320" height="50" fill="#2a1840"/><path d="M160 230h320" stroke="#ff4fa0" stroke-width="3"/>
  ${Array.from({ length: 14 }, (_, i) => `<circle cx="${170 + i * 23}" cy="236" r="3" fill="${['#ff4fa0', '#4fd0ff', '#ffd94a'][i % 3]}"/>`).join('')}
  ${lady(300, 228, 1, '#e8eaf2', '#f0d060')}<g transform="translate(346 228)"><path d="M-10 0l3 -50h14l3 50z" fill="#1a1a2a"/><circle cx="0" cy="-60" r="10" fill="#e3b48e"/><path d="M-10 -64q10 -12 20 0z" fill="#3a2a1a"/><path d="M-8 -44l-26 -10" stroke="#1a1a2a" stroke-width="6" stroke-linecap="round"/></g>
  ${sparkle(240, 120, 10, '#fff')}${sparkle(420, 90, 8, '#fff')}${sparkle(560, 40, 7, '#fff')}${note2(390, 150, '#ffd94a')}${note2(230, 170, '#4fd0ff')}`;
}

// Лорелея: скала над Рейном, девушка с золотыми волосами, лодка внизу
function deLorelei() {
  return `<defs>${sky('dLo', [[0, '#e8865a'], [.5, '#f6c48a'], [1, '#fde3b8']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#dLo)"/>${sun(150, 120, 26, '#ffe08a', .5)}
  <path d="M0 150q120 -30 260 -6V200H0z" fill="#9a8a7a" opacity=".6"/>
  ${sea(180, '#3d6a8a', '#f6c890')}
  <path d="M640 280V40q-40 0 -80 30q-40 30 -60 60q-30 30 -40 70q-10 40 -40 80z" fill="#6a5040"/><path d="M640 60q-40 10 -70 40q-30 30 -50 70" stroke="#4a3a2e" stroke-width="5" fill="none"/>
  <path d="M520 102q30 -16 60 -10v10h-60z" fill="#4a7a3a"/>
  <g transform="translate(560 96)"><path d="M-20 0q4 -36 14 -46h12q10 10 14 46z" fill="#e8eef6"/><circle cx="0" cy="-54" r="9" fill="#f3c9a8"/><path d="M-10 -56q-6 30 -24 54q20 -6 26 -30zM10 -56q4 20 10 30" fill="#f0c030"/><path d="M-10 -60q10 -14 20 0" fill="#f0c030"/><path d="M8 -42l14 -10" stroke="#f0c030" stroke-width="3"/></g>
  ${note2(500, 60, '#6a3a5a')}${note2(470, 90, '#6a3a5a')}
  <g transform="translate(330 222)"><path d="M-40 0h80l-10 12h-60z" fill="#6a4a2a"/><path d="M-6 0v-30" stroke="#3a2414" stroke-width="2.5"/><path d="M-4 -28l18 22h-18z" fill="#f4efe2"/><g transform="translate(-22 0)"><path d="M-5 0l2 -20h8l2 20z" fill="#3a4a6a"/><circle cx="0" cy="-25" r="5" fill="#e3b48e"/></g></g>
  ${[[300, 248], [360, 252], [420, 244]].map(([x, y]) => `<path d="M${x} ${y}q10 -8 20 0t20 0" stroke="#e8f2fa" stroke-width="2.5" fill="none" opacity=".7"/>`).join('')}`;
}

// Лесной царь: ночной лес, всадник с ребёнком, туманная фигура царя
function deErlkoenig() {
  return `<defs>${sky('dEr', [[0, '#0e1420'], [1, '#2a3a4a']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#dEr)"/>${moon(540, 50, 22, '#141c2a')}
  ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path d="M${i * 86 + 10} 280V${120 + (i % 3) * 20}" stroke="#1a2430" stroke-width="${10 + (i % 2) * 6}"/>${[0, 1, 2].map(k => `<path d="M${i * 86 + 10} ${150 + k * 30 + (i % 3) * 10}l${k % 2 ? 30 : -30} -24" stroke="#1a2430" stroke-width="4"/>`).join('')}`).join('')}
  <path d="M0 230q160 -20 320 0t320 -6V${H}H0z" fill="#16202a"/>
  <path d="M60 170q120 -20 220 10q120 30 300 -10" stroke="#c8d4e0" stroke-width="22" fill="none" opacity=".12"/>
  <g opacity=".45"><path d="M120 250q-10 -80 20 -130q20 -20 40 0q30 50 20 130z" fill="#c8d4e0"/><path d="M140 108l6 -14l8 10l8 -12l6 14z" fill="#e0c060"/><circle cx="160" cy="124" r="12" fill="#dfe8f0"/><path d="M180 160q40 -10 70 10" stroke="#c8d4e0" stroke-width="8" fill="none"/></g>
  <g transform="translate(400 244)">${horse(0, 0, 1.4, '#2a1c14')}<g transform="translate(6 -78)"><path d="M-12 0l3 -40h18l3 40z" fill="#3a2a2a"/><circle cx="0" cy="-48" r="9" fill="#d9b494"/><path d="M-10 -52q10 -14 20 0z" fill="#1a1414"/><path d="M-26 -32q30 -6 34 10" stroke="#5a4a3a" stroke-width="12" stroke-linecap="round" fill="none"/><circle cx="-22" cy="-36" r="6" fill="#e8c8a8"/></g></g>
  ${[[260, 260], [520, 266]].map(([x, y]) => `<path d="M${x} ${y}q12 -14 24 0" stroke="#3a4a5a" stroke-width="2" fill="none"/>`).join('')}`;
}

// Ода к радости: концертный зал, хор, дирижёр и лучи над сценой
function deFreude() {
  return `<defs>${sky('dFr', [[0, '#2a1a10'], [1, '#5a3a20']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#dFr)"/>
  ${Array.from({ length: 12 }, (_, i) => `<path d="M320 -10L${-60 + i * 66} 200" stroke="#ffe7a0" stroke-width="20" opacity=".05"/>`).join('')}
  <path d="M60 40h520v8h-520z" fill="#c8a060"/>${[80, 200, 320, 440, 560].map(x => `<rect x="${x - 6}" y="48" width="12" height="160" fill="#c8a060" opacity=".7"/>`).join('')}
  ${[0, 1, 2].map(r => Array.from({ length: 12 - r }, (_, i) => { const x = 110 + r * 18 + i * 38, y = 110 + r * 26; return `<path d="M${x - 9} ${y + 22}l2 -18h14l2 18z" fill="${r % 2 ? '#1a1a1a' : '#e8e2d6'}"/><circle cx="${x}" cy="${y - 2}" r="7" fill="#e3b48e"/><ellipse cx="${x}" cy="${y + 4}" rx="4" ry="3" fill="#3a2a1a" opacity=".6"/>`; }).join('')).join('')}
  <rect x="40" y="196" width="560" height="84" fill="#7a4a24"/><path d="M40 196h560" stroke="#a06a34" stroke-width="4"/>
  ${[100, 150, 200, 440, 490, 540].map(x => `<g transform="translate(${x} 240)"><path d="M-8 0l2 -24h12l2 24z" fill="#1a1a1a"/><circle cx="0" cy="-30" r="7" fill="#e3b48e"/><path d="M8 -20l20 -10" stroke="#a06a34" stroke-width="3"/><path d="M26 -34q6 6 0 14" stroke="#a06a34" stroke-width="2" fill="none"/></g>`).join('')}
  <g transform="translate(320 262)"><path d="M-12 0l3 -46h18l3 46z" fill="#1a1a1a"/><circle cx="0" cy="-54" r="9" fill="#e3b48e"/><path d="M-12 -56q4 -14 12 -12q10 -4 12 10q-6 -6 -12 -4q-8 -2 -12 6z" fill="#cfcfcf"/><path d="M10 -36l26 -24" stroke="#1a1a1a" stroke-width="5" stroke-linecap="round"/><path d="M36 -60l14 -14" stroke="#f4f1ea" stroke-width="2"/></g>
  ${note2(80, 30, '#ffe7a0')}${note2(560, 30, '#ffe7a0')}${sparkle(320, 20, 10, '#ffe7a0')}`;
}

// Гимн Германии: чёрно-красно-золотой флаг над Рейном и холмами
function deHymne() {
  const flag = ['#1a1a1a', '#dd2a2a', '#f2c200'].map((c, i) => `<path d="M0 ${i * 26}q40 ${i % 2 ? 8 : -8} 80 0t80 0v26q-40 ${i % 2 ? 8 : -8} -80 0t-80 0z" fill="${c}"/>`).join('');
  return `<defs>${sky('dHy', [[0, '#5aa0de'], [1, '#e8f4fb']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#dHy)"/>${sun(90, 56, 20)}${cloud(480, 50, .8)}
  ${hills(180, '#8ab86a', 30)}<path d="M0 236q160 -30 320 -10t320 0V${H}H0z" fill="#6a9a4a"/>
  <path d="M0 220q200 20 360 0t280 10v14q-140 -10 -280 0t-360 -6z" fill="#4a8ac0"/>
  <g transform="translate(470 200)"><rect x="-40" y="-60" width="80" height="60" fill="#b8a888"/><rect x="-50" y="-90" width="26" height="90" fill="#a89878"/><path d="M-54 -90l17 -24l17 24z" fill="#5a3a2a"/>${[-30, -10, 10, 30].map(k => `<rect x="${k - 4}" y="-70" width="8" height="10" fill="#a89878"/>`).join('')}<rect x="-6" y="-24" width="12" height="24" fill="#4a3a2a"/></g>
  <g transform="translate(240 210)"><path d="M0 0v-150" stroke="#5a4a3a" stroke-width="5"/><g transform="translate(2 -148)">${flag}</g></g>
  ${[120, 150, 600].map(x => cypress(x, 240, 40, '#3a6a3a')).join('')}`;
}

// Лили Марлен: казарма, ворота, фонарь в ночи, солдат и девушка
function deLilimarleen() {
  return `<defs>${sky('dLi', [[0, '#141a2a'], [1, '#34405a']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#dLi)"/>${stars(26, 17)}${moon(90, 50, 18, '#161c2e')}
  <rect x="300" y="80" width="340" height="170" fill="#4a4a50"/>${Array.from({ length: 10 }, (_, i) => `<rect x="${320 + (i % 5) * 62}" y="${100 + Math.floor(i / 5) * 50}" width="26" height="30" fill="${i === 3 ? '#ffd98a' : '#2a2a34'}"/>`).join('')}
  <rect x="300" y="72" width="340" height="10" fill="#3a3a40"/>
  <rect x="380" y="170" width="120" height="80" fill="#2a2a30"/><path d="M380 170h120" stroke="#5a5a62" stroke-width="6"/>${Array.from({ length: 8 }, (_, i) => `<path d="M${388 + i * 15} 176v74" stroke="#5a5a62" stroke-width="3"/>`).join('')}
  <rect x="0" y="250" width="${W}" height="30" fill="#2a2a32"/>
  <circle cx="210" cy="96" r="80" fill="#ffd98a" opacity=".08"/><circle cx="210" cy="96" r="40" fill="#ffd98a" opacity=".14"/>
  <path d="M210 250v-140" stroke="#1a1a20" stroke-width="6"/><path d="M196 110h28l-6 -22h-16z" fill="#2a2a30"/><rect x="200" y="92" width="20" height="16" fill="#ffd98a"/>
  <path d="M150 250l60 -140l60 140z" fill="#ffd98a" opacity=".1"/>
  <g transform="translate(192 250)"><path d="M-10 0l2 -40h16l2 40z" fill="#4a5a3a"/><circle cx="0" cy="-48" r="8" fill="#e3b48e"/><path d="M-10 -50q10 -12 20 0h4v3h-28z" fill="#3a4a2a"/></g>
  ${lady(232, 250, .7, '#8a2a3a', '#6a3a1a')}
  <ellipse cx="212" cy="262" rx="50" ry="5" fill="#000" opacity=".3"/>`;
}

// ---------- турецкие песни и стихи ----------
// Мечеть: купол, полукупола и минареты
const mosque = (x, y, s = 1, c = '#d8d2c4', d = '#8a96a6') => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-60" y="-40" width="120" height="40" fill="${c}"/><path d="M-40 -40a40 34 0 0 1 80 0z" fill="${d}"/><path d="M-62 -40a18 16 0 0 1 36 0zM26 -40a18 16 0 0 1 36 0z" fill="${d}"/><path d="M0 -74v-10" stroke="#d9a521" stroke-width="2"/>${[-82, 82].map(k => `<rect x="${k - 4}" y="-120" width="8" height="120" fill="${c}"/><path d="M${k - 6} -100h12v4h-12z" fill="${d}"/><path d="M${k - 4} -120l4 -22l4 22z" fill="${d}"/>`).join('')}${[-30, -10, 10, 30].map(k => `<rect x="${k - 4}" y="-26" width="8" height="14" rx="4" fill="#3a4a5a" opacity=".6"/>`).join('')}</g>`;
// Саз: грушевидный корпус и длинный гриф
const saz = (x, y, s = 1, rot = -30) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0q-22 -2 -22 -26q0 -22 22 -34q22 12 22 34q0 24 -22 26z" fill="#a0602a"/><path d="M0 -6q-14 -2 -14 -20" stroke="#6a3a1a" stroke-width="2" fill="none"/><rect x="-3" y="-150" width="6" height="92" fill="#6a3a1a"/>${[0, 1, 2, 3, 4, 5].map(i => `<path d="M-3 ${-140 + i * 14}h6" stroke="#e8d0a0" stroke-width="1"/>`).join('')}<path d="M-1 -150v140M1 -150v140" stroke="#f4efe2" stroke-width=".6"/></g>`;
// Бородатый ашык с сазом; dark — тёмные очки (Вейсель)
const asik = (x, y, s = 1, coat = '#5a4a3a', dark = false) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-14 0l3 -48h22l3 48z" fill="${coat}"/><circle cx="0" cy="-57" r="10" fill="#d9b494"/><path d="M-11 -60q0 -13 11 -13q11 0 11 13z" fill="#3a2a22"/><path d="M-8 -52q8 16 16 0z" fill="#8a8a8a"/>${dark ? '<rect x="-8" y="-61" width="7" height="4" fill="#1a1a1a"/><rect x="1" y="-61" width="7" height="4" fill="#1a1a1a"/>' : '<circle cx="3" cy="-58" r="1.4" fill="#333"/>'}</g>${saz(x + 14 * s, y - 24 * s, s * .55, -40)}`;

// Колыбельная: луна над огородом, колыбель у дома, телята среди капусты
function trDandini() {
  const calf = (cx, cy, k = 1) => `<g transform="translate(${cx} ${cy}) scale(${k})"><ellipse cx="0" cy="-18" rx="20" ry="11" fill="#c08a5a"/><ellipse cx="-6" cy="-20" rx="6" ry="4" fill="#f4efe2"/><path d="M14 -24l12 -10l8 6l-6 10z" fill="#c08a5a"/><path d="M24 -32l-4 -5M30 -30l4 -5" stroke="#8a5a3a" stroke-width="2"/><circle cx="28" cy="-26" r="1.4" fill="#222"/>${[-12, -4, 6, 13].map(i => `<rect x="${i}" y="-9" width="4" height="10" fill="#a0704a"/>`).join('')}</g>`;
  return `<defs>${sky('tDa', [[0, '#1c2350'], [1, '#55608e']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#tDa)"/>${stars(36, 3)}${moon(540, 58, 24, '#232a58')}
  ${hills(196, '#3a5a3a', 14)}<rect x="0" y="214" width="${W}" height="66" fill="#4a6a34"/>
  ${Array.from({ length: 4 }, (_, r) => `<path d="M300 ${226 + r * 14}h340" stroke="#5a4028" stroke-width="5" opacity=".6"/>`).join('')}
  ${Array.from({ length: 14 }, (_, i) => { const x = 318 + (i % 7) * 46, y = 226 + Math.floor(i / 7) * 28; return `<circle cx="${x}" cy="${y}" r="11" fill="#7ab85a"/><circle cx="${x}" cy="${y}" r="6" fill="#a8d888"/>`; }).join('')}
  ${calf(420, 262, 1.1)}${calf(560, 250, .9)}
  <path d="M296 214v60M296 222h-30M296 246h-30" stroke="#8a6a4a" stroke-width="4"/>
  <g transform="translate(150 214)"><rect x="-80" y="-70" width="120" height="70" fill="#e8dcc0"/><path d="M-90 -70l50 -36l50 36z" fill="#8a3a2a"/><rect x="-60" y="-52" width="26" height="24" fill="#ffd87a"/><rect x="-14" y="-40" width="20" height="40" fill="#6a4a2a"/></g>
  <g transform="translate(190 250)"><path d="M-36 -14q36 30 72 0" stroke="#8a5a2a" stroke-width="6" fill="#c89a5a"/><path d="M-30 -16h60" stroke="#8a5a2a" stroke-width="4"/><circle cx="-12" cy="-18" r="7" fill="#f1c7a0"/><path d="M-6 -20h26v8h-26z" fill="#f0e0f0"/><path d="M-40 -30l4 16M40 -30l-4 16" stroke="#8a5a2a" stroke-width="4"/></g>
  <g transform="translate(232 250)"><path d="M-12 0q2 -40 12 -50h6q10 10 12 50z" fill="#8a2a4a"/><circle cx="3" cy="-58" r="9" fill="#f3c9a8"/><path d="M-8 -58q0 -14 11 -14q11 0 11 14q-4 4 -11 4q-7 0 -11 -4z" fill="#e8e0d0"/><path d="M-8 -36l-26 6" stroke="#8a2a4a" stroke-width="5" stroke-linecap="round"/></g>
  ${note2(250, 150, '#f4e8b0')}${note2(290, 120, '#f4e8b0')}`;
}

// Yağ satarım: дети сидят в кругу на лужайке, водящий с платком, горшок мёда
function trYag() {
  const cols = ['#e74c3c', '#2f6fb5', '#f39c12', '#2ecc71', '#9b59b6', '#e84393', '#00a8a8', '#c0392b'];
  return `<defs>${sky('tYa', [[0, '#8ccff0'], [1, '#e8f6fb']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#tYa)"/>${sun(80, 56, 22)}${cloud(300, 46, .8)}${cloud(520, 64, .7)}
  ${hills(170, '#a8d878', 18)}<rect x="0" y="190" width="${W}" height="90" fill="#8cc860"/>
  ${[60, 600].map(x => `<path d="M${x} 196v-60" stroke="#6a4a2a" stroke-width="8"/><circle cx="${x}" cy="130" r="30" fill="#4a8a3a"/><circle cx="${x - 16}" cy="146" r="20" fill="#5a9a44"/>`).join('')}
  <ellipse cx="320" cy="238" rx="170" ry="34" fill="#7ab850"/>
  ${Array.from({ length: 8 }, (_, i) => { const a = Math.PI * 2 * i / 8; const x = 320 + Math.cos(a) * 130, y = 236 + Math.sin(a) * 26; return { x, y, i }; }).sort((p, q) => p.y - q.y).map(({ x, y, i }) => kid(x, y + 8, .9, cols[i], ['#3a2a1a', '#6a3a1a', '#e0b040'][i % 3])).join('')}
  <g transform="translate(500 254)"><path d="M-6 0l-4 -26M6 0l6 -26" stroke="#2a2a3a" stroke-width="5" stroke-linecap="round"/><path d="M-10 -26l2 -30h16l4 30z" fill="#f1c40f"/><circle cx="2" cy="-64" r="9" fill="#f1c7a0"/><path d="M-7 -68q9 -10 18 0z" fill="#3a2a1a"/><path d="M10 -50l20 -12" stroke="#f1c40f" stroke-width="5" stroke-linecap="round"/><path d="M28 -66l14 -4l-4 14z" fill="#fff"/></g>
  <g transform="translate(120 250)"><path d="M-16 0q-6 -24 4 -32h24q10 8 4 32z" fill="#d08a2a"/><rect x="-14" y="-38" width="28" height="8" rx="3" fill="#a0602a"/><path d="M-6 -16h12" stroke="#ffe08a" stroke-width="4"/></g>
  <g transform="translate(166 254)"><rect x="-14" y="-28" width="28" height="28" rx="4" fill="#f8e8a8"/><rect x="-14" y="-32" width="28" height="6" fill="#c0392b"/></g>`;
}

// Ускюдар: Босфор под дождём, мечеть на берегу, Девичья башня, девушка с писарем под зонтом
function trUskudar() {
  return `<defs>${sky('tUs', [[0, '#7a8a9c'], [1, '#c8d0d8']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#tUs)"/>${cloud(120, 40, 1.2, '#9aa4b0', .9)}${cloud(400, 30, 1.4, '#a4aeb8', .9)}${cloud(580, 56, 1, '#9aa4b0', .9)}
  <path d="M0 150q160 -20 320 -10t320 -6v40H0z" fill="#8a96a2"/>${mosque(140, 150, .8, '#c8c2b4', '#7a8696')}${mosque(470, 146, .55, '#c8c2b4', '#7a8696')}
  ${sea(156, '#4a6a84', '#a8c0d4')}
  <g transform="translate(330 196)"><rect x="-26" y="-6" width="52" height="10" fill="#9a9286"/><rect x="-14" y="-40" width="28" height="36" fill="#e8e2d6"/><rect x="-6" y="-74" width="12" height="36" fill="#e8e2d6"/><path d="M-9 -74l9 -16l9 16z" fill="#7a8696"/><rect x="-4" y="-30" width="8" height="10" fill="#4a5a6a"/></g>
  <path d="M0 240q200 -14 640 -6V${H}H0z" fill="#8a7a6a"/><path d="M0 252h${W}" stroke="#6a5a4a" stroke-width="2" opacity=".5"/>
  ${Array.from({ length: 60 }, (_, i) => { const x = (i * 53) % W, y = (i * 37) % 230; return `<path d="M${x} ${y}l-4 12" stroke="#e8f0f8" stroke-width="1.4" opacity=".6"/>`; }).join('')}
  <g transform="translate(470 260)"><path d="M-14 0l3 -50h22l3 50z" fill="#2a3a5a"/><path d="M-14 0q0 6 6 8h16q6 -2 6 -8z" fill="#6a5040"/><circle cx="0" cy="-58" r="9" fill="#e3b48e"/><rect x="-9" y="-72" width="18" height="10" fill="#b0302a"/><path d="M12 -40l26 -46" stroke="#3a2a2a" stroke-width="2.5"/></g>
  ${lady(530, 262, .8, '#7a3a5a', '#3a2214')}
  <path d="M462 182q46 -52 92 0q-11 -8 -23 0q-11 -8 -23 0q-11 -8 -23 0q-11 -8 -23 0z" fill="#2a2a3a"/><path d="M508 140v-6" stroke="#2a2a3a" stroke-width="3"/>`;
}

// Чанаккале: пролив, корабли вдали, юный солдат прощается с матерью, маки
function trCanakkale() {
  return `<defs>${sky('tCa', [[0, '#e8a070'], [.6, '#f4cfa0'], [1, '#fbe6c4']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#tCa)"/>${sun(470, 120, 30, '#ffd890', .45)}
  <path d="M0 140q120 -30 260 -10t380 -14v30H0z" fill="#9a8a78"/>
  ${sea(146, '#5a7a94', '#f4d0a0')}
  ${[[380, 166, .35], [520, 172, .3], [600, 160, .25]].map(([x, y, s]) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-70 0h140l-16 18h-108z" fill="#4a5058"/><rect x="-30" y="-24" width="40" height="24" fill="#4a5058"/><rect x="-6" y="-44" width="10" height="20" fill="#4a5058"/><path d="M1 -48q10 -16 30 -20" stroke="#8a8a8a" stroke-width="6" fill="none" opacity=".6"/></g>`).join('')}
  <path d="M0 200q120 -20 300 -4t340 -10V${H}H0z" fill="#b0a070"/><path d="M0 236q200 -16 640 0V${H}H0z" fill="#8a8a4a"/>
  ${Array.from({ length: 30 }, (_, i) => { const x = (i * 83) % W, y = 236 + (i * 29) % 40; return `<path d="M${x} ${y + 10}v-10" stroke="#4a6a2a" stroke-width="1.5"/><circle cx="${x}" cy="${y}" r="4.5" fill="#d0302a"/><circle cx="${x}" cy="${y}" r="1.4" fill="#2a1a1a"/>`; }).join('')}
  <g transform="translate(200 250)"><path d="M-12 0l3 -46h18l3 46z" fill="#6a6a3a"/><circle cx="0" cy="-54" r="9" fill="#e3b48e"/><path d="M-11 -56q0 -12 11 -12q11 0 11 12z" fill="#5a5a2a"/><path d="M10 -40l6 -50" stroke="#3a2a1a" stroke-width="3"/><path d="M-10 -36l-20 6" stroke="#6a6a3a" stroke-width="6" stroke-linecap="round"/></g>
  <g transform="translate(150 252)"><path d="M-16 0q2 -44 12 -54h8q10 10 12 54z" fill="#3a3a4a"/><circle cx="0" cy="-60" r="9" fill="#e3b48e"/><path d="M-12 -58q0 -16 12 -16q12 0 12 16v16q-12 -6 -24 0z" fill="#f4efe2"/><path d="M10 -38l18 4" stroke="#3a3a4a" stroke-width="6" stroke-linecap="round"/></g>`;
}

// Hey Onbeşli: каменистая горная дорога, юноши уходят цепочкой, девушки машут вслед
function trOnbesli() {
  return `<defs>${sky('tOn', [[0, '#a8b8c8'], [1, '#e8e4dc']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#tOn)"/>${cloud(160, 50, .9, '#fff', .7)}${cloud(470, 40, 1.1, '#fff', .7)}
  ${range(190, '#7a8a7a', '#eef0f0')}${hills(200, '#8a9a6a', 20)}
  <path d="M240 280q60 -50 140 -70q80 -20 120 -30q20 -4 40 -12h20q-20 14 -50 22q-50 14 -110 34q-70 24 -90 56z" fill="#c8b898"/>
  ${Array.from({ length: 24 }, (_, i) => { const t = i / 24; const x = 260 + t * 300 + (i % 3) * 8, y = 270 - t * 96 + (i % 2) * 4; return `<ellipse cx="${x}" cy="${y}" rx="${4 - t * 2}" ry="${2.5 - t}" fill="#8a7a6a"/>`; }).join('')}
  ${[[520, 182, .4], [490, 190, .45], [458, 198, .5], [420, 210, .58], [380, 224, .66]].map(([x, y, s]) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-10 0l2 -42h16l2 42z" fill="#5a5a3a"/><circle cx="0" cy="-50" r="8" fill="#e3b48e"/><path d="M-9 -52q0 -10 9 -10q9 0 9 10z" fill="#4a4a2a"/><path d="M8 -34l4 -30" stroke="#3a2a1a" stroke-width="3"/></g>`).join('')}
  ${lady(110, 262, .8, '#b03a3a', '#3a2214')}${lady(170, 266, .74, '#2f6a8a', '#5a3a1a')}
  <path d="M184 206l24 -16" stroke="#f3c9a8" stroke-width="4" stroke-linecap="round"/><path d="M206 188l12 -2l-4 10z" fill="#fff"/>
  ${[[106, 186], [166, 194]].map(([x, y]) => `<path d="M${x} ${y}q-2 6 0 8" stroke="#6ab4e8" stroke-width="2" fill="none"/>`).join('')}`;
}

// Сары гелин: базар Эрзурума у заснеженных гор, светловолосая девушка, юноша смотрит издали
function trSarigelin() {
  return `<defs>${sky('tSa', [[0, '#7ab0de'], [1, '#e4f0f8']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#tSa)"/>${sun(560, 50, 18)}
  ${range(170, '#8a9ab0', '#fbfdff')}
  <path d="M0 170h${W}v110H0z" fill="#c8b8a0"/>
  ${[[0, 150], [120, 130], [250, 150], [380, 140], [510, 150]].map(([x, w]) => `<rect x="${x}" y="150" width="${w - 6}" height="50" fill="#b89a78"/><path d="M${x - 4} 150h${w + 2}l-10 -16h${-w + 20}z" fill="${['#c0392b', '#2f6fb5', '#e0a030', '#2e8a5a', '#8a3a8a'][x / 10 % 5 | 0]}"/>${[0, 1, 2].map(k => `<rect x="${x + 10 + k * (w / 3 - 4)}" y="166" width="${w / 3 - 16}" height="22" fill="#6a4a2a" opacity=".55"/>`).join('')}`).join('')}
  ${Array.from({ length: 12 }, (_, i) => `<circle cx="${30 + i * 52}" cy="${206 + (i % 2) * 4}" r="7" fill="${['#e8a030', '#c0392b', '#f1c40f', '#6aa84a'][i % 4]}"/>`).join('')}
  <rect x="0" y="212" width="${W}" height="68" fill="#d8ccb4"/>
  ${lady(300, 268, 1.05, '#c0392b', '#f0c838')}<path d="M286 192q-10 30 -6 56M314 192q10 30 6 56" stroke="#f0c838" stroke-width="6" fill="none"/>
  <g transform="translate(500 270)"><path d="M-12 0l3 -48h18l3 48z" fill="#2a3a5a"/><circle cx="0" cy="-56" r="9" fill="#e3b48e"/><path d="M-10 -60q10 -12 20 0z" fill="#2a1a14"/><path d="M-10 -40l-16 -10" stroke="#2a3a5a" stroke-width="6" stroke-linecap="round"/></g>
  ${person(140, 268, .9, '#6a5040', '#e8e2d6', true)}${person(80, 262, .8, '#3a4a5a', '#3a2a2a')}`;
}

// Йемен: пустыня и пальмы, далёкая колонна солдат, пыльное облако, анатолийская деревня ждёт
function trYemen() {
  const palm = (x, y, h) => `<path d="M${x} ${y}q4 ${-h / 2} -6 ${-h}" stroke="#7a5a3a" stroke-width="6" fill="none"/>${[-60, -20, 20, 60, 100, 140].map(a => `<path d="M${x - 6} ${y - h}q${Math.cos(a * Math.PI / 180) * 20} ${-12 + Math.sin(a * Math.PI / 180) * 6} ${Math.cos(a * Math.PI / 180) * 38} ${10}" stroke="#4a7a3a" stroke-width="5" fill="none"/>`).join('')}`;
  return `<defs>${sky('tYe', [[0, '#e8b070'], [.5, '#f4d0a0'], [1, '#f8e4c0']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#tYe)"/>${sun(520, 70, 30, '#fff0c0', .5)}
  <ellipse cx="240" cy="70" rx="200" ry="26" fill="#a89890" opacity=".35"/><ellipse cx="300" cy="90" rx="160" ry="18" fill="#8a7a70" opacity=".25"/>
  <path d="M0 170q120 -40 240 -14t240 -10t160 4V${H}H0z" fill="#d8a868"/><path d="M0 214q160 -30 320 -6t320 -10V${H}H0z" fill="#c89050"/>
  ${palm(80, 200, 70)}${palm(120, 210, 56)}${palm(590, 190, 64)}
  ${Array.from({ length: 9 }, (_, i) => `<g transform="translate(${250 + i * 22} ${168 - i * 2}) scale(.38)"><path d="M-10 0l2 -42h16l2 42z" fill="#5a4a3a"/><circle cx="0" cy="-50" r="8" fill="#8a6a4a"/><path d="M8 -34l4 -30" stroke="#3a2a1a" stroke-width="3"/></g>`).join('')}
  <ellipse cx="350" cy="166" rx="120" ry="12" fill="#e8c890" opacity=".7"/>
  <g transform="translate(470 262)"><path d="M-16 0q2 -44 12 -54h8q10 10 12 54z" fill="#2a2a3a"/><circle cx="0" cy="-60" r="9" fill="#d9b494"/><path d="M-12 -58q0 -16 12 -16q12 0 12 16v20q-12 -6 -24 0z" fill="#f4efe2"/></g>
  ${lady(420, 266, .72, '#6a2a3a', '#2a1a10')}
  ${[[300, 250], [360, 256]].map(([x, y]) => `<path d="M${x} ${y}q8 -8 16 0" stroke="#a07040" stroke-width="2" fill="none"/>`).join('')}`;
}

// Длинная узкая дорога: степь, дорога уходит к горизонту, половина неба — день, половина — ночь, ашык с сазом
function trVeysel() {
  return `<defs>${sky('tVd', [[0, '#7ac0ea'], [1, '#e8f4fb']])}${sky('tVn', [[0, '#141c40'], [1, '#3a4a7a']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#tVd)"/><rect x="320" width="320" height="${H}" fill="url(#tVn)"/>
  ${sun(120, 60, 22)}${moon(540, 60, 20, '#1a2248')}${stars(24, 7).replace(/cx="(\d+)/g, (m, x) => `cx="${320 + (+x % 320)}`)}
  <path d="M0 180q160 -16 320 -4t320 -6V${H}H0z" fill="#b8a868"/><path d="M320 180q160 -12 320 -10V${H}H320z" fill="#4a4a3a" opacity=".55"/>
  <path d="M300 180h40l140 100h-320z" fill="#d8c8a0"/><path d="M318 180h4l40 100h-48z" fill="#f4ead0" opacity=".5"/>
  ${[[60, 230], [200, 196], [460, 200], [580, 240]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="10" fill="#8a9a5a"/>`).join('')}
  ${asik(300, 262, 1.1, '#4a3a2e', true)}
  <path d="M280 262q-8 0 -10 -24" stroke="#6a4a2a" stroke-width="3" fill="none"/>`;
}

// Юнус Эмре: анатолийская деревня, люди сидят в кругу под деревом, розы и голуби
function trYunus() {
  return `<defs>${sky('tYu', [[0, '#f0c890'], [1, '#fbecd4']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#tYu)"/>${sun(320, 70, 26, '#ffe3a0', .5)}
  ${hills(170, '#c8b078', 20)}<rect x="0" y="196" width="${W}" height="84" fill="#a8a060"/>
  ${[[40, 184, 60, 40], [100, 190, 50, 34], [520, 186, 70, 40], [590, 192, 50, 30]].map(([x, y, w, h]) => cube(x, y, w, h, '#6a4a2a')).join('')}
  <path d="M320 230v-90" stroke="#6a4a2a" stroke-width="12"/><circle cx="320" cy="120" r="56" fill="#5a8a3a"/><circle cx="280" cy="140" r="34" fill="#6a9a44"/><circle cx="362" cy="138" r="36" fill="#6a9a44"/>
  ${[[230, 258, '#4a6a8a'], [270, 266, '#8a4a3a'], [370, 266, '#5a7a4a'], [410, 258, '#6a5a8a']].map(([x, y, c]) => person(x, y, .8, c, '#f4efe2', x === 270)).join('')}
  <g transform="translate(320 268)"><path d="M-16 0q0 -34 16 -44q16 10 16 44z" fill="#e8e0d0"/><circle cx="0" cy="-52" r="9" fill="#d9b494"/><path d="M-9 -56q0 -24 9 -26q9 2 9 26z" fill="#c8b898"/><path d="M-6 -48q6 14 12 0z" fill="#e8e8e8"/></g>
  ${[[150, 250], [480, 252], [520, 262], [120, 264]].map(([x, y]) => `<path d="M${x} ${y + 14}v-14" stroke="#3a6a2a" stroke-width="2"/><circle cx="${x}" cy="${y}" r="6" fill="#d03a5a"/><circle cx="${x}" cy="${y}" r="2.5" fill="#a02a4a"/>`).join('')}
  ${dove(180, 70, .9)}${dove(460, 56, .8)}`;
}

// Караджаоглан: снег в горах, кочевые шатры, ашык с сазом, в снегу — буква Элиф
function trKaracaoglan() {
  return `<defs>${sky('tKa', [[0, '#5a6a8a'], [1, '#c8d0dc']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#tKa)"/>
  ${range(200, '#6a7a90', '#fbfdff')}<path d="M0 200q160 -20 320 0t320 -6V${H}H0z" fill="#eef2f8"/>
  ${[[460, 214], [540, 208], [600, 220]].map(([x, y]) => `<path d="M${x - 30} ${y}q30 -40 60 0z" fill="#3a2a2a"/><path d="M${x - 6} ${y}v-14h12v14z" fill="#ffd87a"/>`).join('')}
  ${snowflakes(70, 4)}
  <path d="M120 236c6 -40 8 -90 14 -140" stroke="#2a3a5a" stroke-width="10" stroke-linecap="round" fill="none" opacity=".75"/><path d="M128 100q6 -8 14 -4" stroke="#2a3a5a" stroke-width="6" fill="none" opacity=".75" stroke-linecap="round"/>
  ${Array.from({ length: 16 }, (_, i) => `<circle cx="${124 + Math.sin(i) * 14}" cy="${100 + i * 9}" r="${1.5 + (i % 3)}" fill="#fff" opacity=".9"/>`).join('')}
  ${asik(300, 262, 1.15, '#7a3a2a')}
  ${fir(40, 250, 70, '#2a4a3a')}${fir(210, 256, 56, '#2a4a3a')}`;
}

const ART = {
  'athos-peninsula': { draw: athosPeninsula, label: 'Полуостров Афон: вершина и монастырь у моря' },
  'athos-morning': { draw: athosMorning, label: 'Ночная служба: храм и монах с билом' },
  'athos-ferry': { draw: athosFerry, label: 'Паром у башни Уранополиса' },
  'athos-pilgrim': { draw: athosPilgrim, label: 'Икона, лампада, свечи и чётки' },
  'athos-legend': { draw: athosLegend, label: 'Корабль в бурю у берегов Афона' },
  'athos-rossikon': { draw: athosRossikon, label: 'Пантелеимонов монастырь с зелёными куполами' },
  'athos-lavra': { draw: athosLavra, label: 'Великая Лавра на закате' },
  'en-cities': { draw: enCities, label: 'Вечерняя панорама: Биг-Бен, небоскрёбы, статуя Свободы, башня Торонто и Сиднейская опера' },
  'tale-pigs': { draw: talePigs, label: 'Три поросёнка и волк у соломенного, деревянного и кирпичного домиков' },
  'tale-hen': { draw: taleHen, label: 'Рыжая курочка на ферме у пшеничного поля, рядом цыплята и хлеб' },
  'tale-goldilocks': { draw: taleGoldilocks, label: 'Три миски каши и три стула в домике медведей, Златовласка в окне' },
  'tale-beanstalk': { draw: taleBeanstalk, label: 'Джек лезет по бобовому стеблю к замку великана' },
  'tale-whittington': { draw: taleWhittington, label: 'Дик Уиттингтон с котом на холме, вдали звонят колокола Лондона' },
  'tale-krc-elder': { draw: taleKrcElder, label: 'Старик и юноша у аула под горами, на старой дороге взошла пшеница' },
  'tale-krc-share': { draw: taleKrcShare, label: 'Медведь, волк с красной головой и лиса делят добычу на поляне' },
  'tale-krc-olmezbiy': { draw: taleKrcOlmezbiy, label: 'Князь Ёлмезбий едет на закат, на скале огромная птица' },
  'tale-krc-goat': { draw: taleKrcGoat, label: 'Коза у сакли в горах, козлята в окне, волк прячется за камнем' },
  'tale-krc-crane': { draw: taleKrcCrane, label: 'Лиса у плоского блюда и журавль у высокого кувшина' },
  'song-twinkle': { draw: songTwinkle, label: 'Большая мерцающая звезда над спящим домом, путник с фонарём' },
  'song-farm': { draw: songFarm, label: 'Ферма: красный амбар, корова, свинья, овца, утка и лошадь' },
  'song-row': { draw: songRow, label: 'Мальчик гребёт в лодке по тихой речке, рядом утки и камыш' },
  'song-bridge': { draw: songBridge, label: 'Старый Лондонский мост с домами на арках, из пролёта падают камни' },
  'song-bonnie': { draw: songBonnie, label: 'Девушка на шотландском берегу смотрит на парусник за морем' },
  'song-jingle': { draw: songJingle, label: 'Сани с колокольчиками мчатся по снегу зимней ночью' },
  'song-clementine': { draw: songClementine, label: 'Каньон золотоискателей: шахта, хижина, Клементина и утята у реки' },
  'song-grace': { draw: songGrace, label: 'Парусник в море после бури, сквозь тучи пробиваются лучи рассвета' },
  'song-scarborough': { draw: songScarborough, label: 'Ярмарка в Скарборо: палатки, замок на утёсе над морем и травы' },
  'song-greensleeves': { draw: songGreensleeves, label: 'Дама в зелёном платье с лютней у фахверкового дома' },
  'song-auld': { draw: songAuld, label: 'Новогодняя ночь: друзья в кругу держатся за скрещённые руки, салют над холмами' },
  'el-kalanta': { draw: elKalanta, label: 'Рождественская ночь: дети с треугольником у двери дома, кораблик с огоньками' },
  'el-peiraia': { draw: elPeiraia, label: 'Окно с геранью и сердечками над гаванью Пирея на закате' },
  'el-zorbas': { draw: elZorbas, label: 'Трое танцуют сиртаки на берегу Крита под луной' },
  'el-kyriaki': { draw: elKyriaki, label: 'Пасмурное воскресенье: тучи и дождь над крышами, бузуки у окна' },
  'el-olympos': { draw: elOlympos, label: 'Олимп со снежными вершинами и флагами, орёл, рядом гора Кисавос' },
  'el-arnisi': { draw: elArnisi, label: 'Тайная белая бухта, голубь над морем, надпись на песке стирает ветер' },
  'el-ymnos': { draw: elYmnos, label: 'Сине-белый флаг Греции на холме над морем, лавровые ветви' },
  'el-axion': { draw: elAxion, label: 'Сияющее солнце над островами Эгейского моря, ветвь мирта' },
  'el-ithaki': { draw: elIthaki, label: 'Парусник плывёт к острову Итака на рассвете' },
  'el-olympiakos': { draw: elOlympiakos, label: 'Колонны древнего храма и олимпийский огонь, лавровый венок' },
  'de-tannenbaum': { draw: deTannenbaum, label: 'Ёлка с огоньками и звездой у домика в заснеженном лесу' },
  'de-voegel': { draw: deVoegel, label: 'Весенняя ветка в цвету, на ней поют птицы, вокруг ноты' },
  'de-stillenacht': { draw: deStillenacht, label: 'Маленькая церковь в снегу под звёздным небом у Альп' },
  'de-luftballons': { draw: deLuftballons, label: 'Разноцветные воздушные шарики над городом, след самолёта' },
  'de-atemlos': { draw: deAtemlos, label: 'Ночная сцена с огнями, пара танцует под лучами прожекторов' },
  'de-lorelei': { draw: deLorelei, label: 'Девушка с золотыми волосами на скале над Рейном, лодка внизу' },
  'de-erlkoenig': { draw: deErlkoenig, label: 'Ночной лес: отец с сыном скачет на коне, в тумане фигура Лесного царя' },
  'de-freude': { draw: deFreude, label: 'Концертный зал: хор, оркестр и дирижёр в лучах света' },
  'de-hymne': { draw: deHymne, label: 'Чёрно-красно-золотой флаг на холме над Рейном и замком' },
  'de-lilimarleen': { draw: deLilimarleen, label: 'Фонарь у ворот казармы ночью, солдат и девушка' },
  'tr-dandini': { draw: trDandini, label: 'Ночь, мама поёт у колыбели, телята забрались в огород с капустой' },
  'tr-yag': { draw: trYag, label: 'Дети сидят в кругу на лужайке, водящий бежит с платком; горшок мёда' },
  'tr-uskudar': { draw: trUskudar, label: 'Дождь над Босфором, мечети и Девичья башня, девушка и писарь под зонтом' },
  'tr-canakkale': { draw: trCanakkale, label: 'Пролив Дарданеллы на закате, корабли вдали, юный солдат прощается с матерью среди маков' },
  'tr-onbesli': { draw: trOnbesli, label: 'Юноши уходят по каменистой горной дороге, девушки машут им платком' },
  'tr-sarigelin': { draw: trSarigelin, label: 'Базар Эрзурума у заснеженных гор, светловолосая девушка, юноша смотрит издали' },
  'tr-yemen': { draw: trYemen, label: 'Пустыня и пальмы, далёкая колонна солдат в пыли, мать и невеста ждут' },
  'tr-veysel': { draw: trVeysel, label: 'Длинная дорога через степь, полнеба — день, полнеба — ночь, слепой ашык с сазом' },
  'tr-yunus': { draw: trYunus, label: 'Анатолийская деревня: люди сидят в кругу под деревом, розы и голуби' },
  'tr-karacaoglan': { draw: trKaracaoglan, label: 'Снег в горах, шатры кочевников, ашык с сазом, в снегу — буква Элиф' }
};

// Рисунки к турецким сказкам — в отдельном модуле
Object.assign(ART, TR_TALES_ART);
// Рисунки к мифам Древней Греции — в отдельном модуле
Object.assign(ART, EL_MYTHS_ART);

export const hasArt = t => !!(t && ART[t.art]);
// Рисунок материала: 'banner' — шапка в читалке, 'thumb' — полоска на карточке
export function textArt(t, mode = 'banner') {
  const a = t && ART[t.art]; if (!a) return '';
  // у каждого рисунка свои id градиентов: в thumb добавляем суффикс, чтобы карточки не конфликтовали с шапкой
  const svg = mode === 'thumb' ? a.draw().replace(/id="(\w+)"/g, 'id="$1t"').replace(/url\(#(\w+)\)/g, 'url(#$1t)') : a.draw();
  return `<figure class="text-art ${mode}"><svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${a.label}">${svg}</svg></figure>`;
}
export const ART_KEYS = Object.keys(ART);
