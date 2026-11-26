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
  'tale-krc-crane': { draw: taleKrcCrane, label: 'Лиса у плоского блюда и журавль у высокого кувшина' }
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
