// Иллюстрации к турецким сказкам и легендам (data/tr/tales.js): SVG 640×280, как в text-art.js.
// Отдельный модуль, чтобы рисунки сказок не мешали остальным; text-art.js подключает TR_TALES_ART в общий список.
const W = 640, H = 280;
const sky = (id, stops) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
const sun = (x, y, r, c = '#ffd76a', glow = .35) => `<circle cx="${x}" cy="${y}" r="${r * 2.4}" fill="${c}" opacity="${glow * .4}"/><circle cx="${x}" cy="${y}" r="${r * 1.5}" fill="${c}" opacity="${glow}"/><circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
const cloud = (x, y, s = 1, c = '#fff', o = .85) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}" opacity="${o}"><ellipse cx="0" cy="0" rx="34" ry="14"/><ellipse cx="-22" cy="4" rx="22" ry="11"/><ellipse cx="24" cy="5" rx="24" ry="10"/><ellipse cx="4" cy="-10" rx="20" ry="13"/></g>`;
const hills = (y, c, amp = 30) => `<path d="M0 ${y}q80 ${-amp} 160 -6t160 4t160 -8t160 6V${H}H0z" fill="${c}"/>`;
const pine = (x, y, h, c = '#2f5a3a') => `<path d="M${x} ${y - h}l${h * .28} ${h * .55}h${-h * .12}l${h * .2} ${h * .45}h${-h * .72}l${h * .2} ${-h * .45}h${-h * .12}z" fill="${c}"/>`;
const star = (x, y, r = 1.4) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity=".8"/>`;

// Насреддин Ходжа: халат, белая чалма-кавук, борода
const hoca = (x, y, s = 1, robe = '#3f6a8a', fur = false) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-20 0q2 -40 10 -56h20q8 16 10 56z" fill="${robe}"/>${fur ? '<path d="M-21 0q2 -40 10 -56h5q-8 20 -6 56zM21 0q-2 -40 -10 -56h-5q8 20 6 56z" fill="#8a5a2a"/><path d="M-12 -56h24l-2 6h-20z" fill="#b07a3a"/>' : ''}
  <circle cx="0" cy="-66" r="11" fill="#e9c4a0"/><path d="M-9 -60q9 22 18 0z" fill="#f4f1ea"/>
  <ellipse cx="0" cy="-78" rx="15" ry="10" fill="#fbfaf6"/><path d="M-14 -80q14 -8 28 0" stroke="#ddd6c8" stroke-width="2" fill="none"/><ellipse cx="0" cy="-86" rx="6" ry="5" fill="#c0392b"/>
  <circle cx="4" cy="-68" r="1.4" fill="#333"/></g>`;
// Простой человек в шапочке
const man = (x, y, s = 1, coat = '#6a4a3a', cap = '#2b2b2b') => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-12 0l3 -44h18l3 44z" fill="${coat}"/><circle cx="0" cy="-52" r="9" fill="#e9c4a0"/><path d="M-10 -55q0 -12 10 -12q10 0 10 12z" fill="${cap}"/><circle cx="3" cy="-53" r="1.3" fill="#333"/></g>`;
const sheep = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="-14" rx="18" ry="11" fill="#f4f1ea"/>${[-12, -4, 4, 12].map(k => `<circle cx="${k}" cy="-22" r="6" fill="#f4f1ea"/>`).join('')}<ellipse cx="18" cy="-18" rx="6" ry="5" fill="#3a3a3a"/>${[-10, -4, 6, 12].map(k => `<rect x="${k}" y="-5" width="3" height="7" fill="#3a3a3a"/>`).join('')}</g>`;
const horse = (x, y, s = 1, c = '#d8dde2', mane = '#5a5f66') => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="-34" rx="30" ry="13" fill="${c}"/><path d="M22 -42l16 -24l12 4l-4 10l-10 2l-6 14z" fill="${c}"/><path d="M36 -66l2 -8l4 7z" fill="${c}"/><path d="M24 -46q4 -20 14 -24" stroke="${mane}" stroke-width="5" fill="none"/><circle cx="42" cy="-60" r="1.6" fill="#222"/><path d="M-30 -38q-16 -2 -18 14" stroke="${mane}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M-22 -26l-14 18M-12 -24l-4 24M14 -24l16 14M22 -26l22 4" stroke="${c}" stroke-width="5" stroke-linecap="round"/></g>`;
const minaret = (x, y, h, c = '#3a2f4a') => `<rect x="${x - 3}" y="${y - h}" width="6" height="${h}" fill="${c}"/><path d="M${x - 3} ${y - h}l3 -14l3 14z" fill="${c}"/><rect x="${x - 5}" y="${y - h * .7}" width="10" height="3" fill="${c}"/>`;
const dome = (x, y, r, c = '#3a2f4a') => `<path d="M${x - r} ${y}a${r} ${r} 0 0 1 ${r * 2} 0z" fill="${c}"/><rect x="${x - r * 1.2}" y="${y}" width="${r * 2.4}" height="${r * .6}" fill="${c}"/>`;

// Ye kürküm ye: свадебный стол, Ходжа в шубе опускает рукав в суп
function taleTrKurk() {
  return `<defs>${sky('trK', [[0, '#7a3a2a'], [1, '#d99a5a']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#trK)"/>
  ${Array.from({ length: 9 }, (_, i) => `<path d="M${40 + i * 72} 0v40q-16 20 0 40" stroke="#f3c87a" stroke-width="2" fill="none" opacity=".5"/><circle cx="${40 + i * 72}" cy="84" r="5" fill="#ffe3a0" opacity=".9"/>`).join('')}
  <path d="M0 150h${W}" stroke="#a85a32" stroke-width="3"/>
  <rect x="0" y="214" width="${W}" height="66" fill="#6a3424"/>
  <rect x="120" y="196" width="420" height="16" rx="4" fill="#f4ead6"/><rect x="140" y="212" width="10" height="44" fill="#4a2418"/><rect x="510" y="212" width="10" height="44" fill="#4a2418"/>
  <ellipse cx="320" cy="194" rx="34" ry="8" fill="#e0d8c8"/><ellipse cx="320" cy="191" rx="26" ry="4" fill="#e0a040"/><path d="M312 180q-4 -8 2 -14M326 180q-4 -8 2 -14" stroke="#fff" stroke-width="2" fill="none" opacity=".7"/>
  <ellipse cx="420" cy="194" rx="30" ry="7" fill="#e0d8c8"/><path d="M396 192q24 -18 48 0z" fill="#f6efd8"/>
  <ellipse cx="220" cy="194" rx="20" ry="5" fill="#e0d8c8"/><circle cx="214" cy="188" r="5" fill="#c0392b"/><circle cx="224" cy="189" r="5" fill="#e07a2a"/>
  ${man(480, 196, 1, '#2f5a6a', '#8a2a2a')}${man(540, 198, .95, '#6a5a2a', '#2b2b2b')}${man(160, 198, .95, '#5a3a5a', '#2b2b2b')}
  ${hoca(272, 214, 1.25, '#3f6a8a', true)}<path d="M286 150q20 14 30 34" stroke="#8a5a2a" stroke-width="12" stroke-linecap="round" fill="none"/>`;
}

// Göle maya: Ходжа на берегу озера бросает ложку йогурта в воду
function taleTrMaya() {
  return `<defs>${sky('trM', [[0, '#8ccaf0'], [1, '#eef7fb']])}${sky('trMw', [[0, '#5aa0c8'], [1, '#2f6f9a']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#trM)"/>${sun(540, 56, 20)}${cloud(160, 50, .8)}${cloud(380, 36, .6)}
  ${hills(150, '#9cbf7a', 18)}
  <path d="M0 170q320 -14 640 0V${H}H0z" fill="url(#trMw)"/>
  ${Array.from({ length: 8 }, (_, i) => `<path d="M${60 + i * 70} ${200 + (i % 3) * 18}q12 -5 24 0" stroke="#cfe8f5" stroke-width="2" fill="none" opacity=".7"/>`).join('')}
  <path d="M0 236q120 -30 260 -12q40 6 60 56H0z" fill="#c9b07a"/>
  ${hoca(190, 252, 1.1, '#7a4a2a')}<ellipse cx="226" cy="236" rx="14" ry="6" fill="#f4f1ea"/><ellipse cx="226" cy="233" rx="10" ry="3" fill="#fffdf6"/>
  <path d="M206 214l58 -10" stroke="#8a6a3a" stroke-width="3" stroke-linecap="round"/><circle cx="276" cy="210" r="5" fill="#fffdf6"/><path d="M290 220q4 -4 8 0" stroke="#fff" stroke-width="2" fill="none"/>
  <circle cx="300" cy="232" r="10" fill="none" stroke="#e9f5fb" stroke-width="2" opacity=".8"/><circle cx="300" cy="232" r="18" fill="none" stroke="#e9f5fb" stroke-width="1.5" opacity=".5"/>
  ${man(90, 250, 1.05, '#4a6a3a', '#7a2a2a')}<path d="M100 214q10 -8 18 -2" stroke="#4a6a3a" stroke-width="6" stroke-linecap="round" fill="none"/>`;
}

// Kazan doğurdu: большой медный казан и маленькая кастрюлька у двери соседа
function taleTrKazan() {
  return `<defs>${sky('trZ', [[0, '#f6e3b8'], [1, '#e9c88a']])}<radialGradient id="trZc" cx=".35" cy=".35" r=".8"><stop offset="0" stop-color="#f0a860"/><stop offset="1" stop-color="#a85a24"/></radialGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#trZ)"/>
  <rect x="380" y="60" width="200" height="160" fill="#e8dcc0"/><rect x="370" y="50" width="220" height="14" fill="#9a6a3a"/><rect x="440" y="120" width="56" height="100" rx="4" fill="#6a3e22"/><circle cx="486" cy="172" r="3.5" fill="#e0b040"/><rect x="520" y="90" width="40" height="34" fill="#9ac4d8"/><path d="M540 90v34M520 107h40" stroke="#e8dcc0" stroke-width="3"/>
  <rect x="0" y="220" width="${W}" height="60" fill="#c9a46a"/>${Array.from({ length: 12 }, (_, i) => `<path d="M${i * 56} 236h30" stroke="#b08a52" stroke-width="2"/>`).join('')}
  <g transform="translate(280 238)"><ellipse cx="0" cy="-30" rx="58" ry="40" fill="url(#trZc)"/><ellipse cx="0" cy="-66" rx="52" ry="10" fill="#7a3a18"/><ellipse cx="0" cy="-68" rx="46" ry="6" fill="#3a1a0a"/><path d="M-56 -56q-14 -10 -6 -22M56 -56q14 -10 6 -22" stroke="#7a3a18" stroke-width="5" fill="none"/><path d="M-30 -40q10 -16 28 -18" stroke="#ffd0a0" stroke-width="4" fill="none" opacity=".6"/></g>
  <g transform="translate(366 238)"><path d="M-18 0q-4 -22 0 -26h36q4 4 0 26z" fill="#c8c8c8"/><ellipse cx="0" cy="-26" rx="20" ry="4" fill="#8a8a8a"/><path d="M-20 -20h-8M20 -20h8" stroke="#8a8a8a" stroke-width="4" stroke-linecap="round"/></g>
  ${hoca(150, 250, 1.15, '#3f6a8a')}${man(540, 250, 1.1, '#7a5a2a', '#2b2b2b')}`;
}

// Кельоглан и дэв: лес, огромный дэв и маленький лысый парень выжимает сыр
function taleTrKeloglan() {
  return `<defs>${sky('trL', [[0, '#a8d8f0'], [1, '#eaf6e2']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#trL)"/>${cloud(120, 40, .8)}
  ${hills(170, '#8cbf6a', 22)}
  ${[30, 80, 560, 610, 520].map((x, i) => pine(x, 230, 120 + (i % 3) * 30, i % 2 ? '#2f5a3a' : '#3a6a44')).join('')}
  <rect x="0" y="226" width="${W}" height="54" fill="#5f9a46"/>
  <g transform="translate(400 250)"><path d="M-46 0l8 -110h76l8 110z" fill="#5a7a4a"/><path d="M-38 -110q38 -30 76 0z" fill="#4a6a3a"/>
    <circle cx="0" cy="-140" r="34" fill="#7a9a6a"/><path d="M-26 -166l-8 -22l18 12zM26 -166l8 -22l-18 12z" fill="#e8dcc0"/><circle cx="-12" cy="-146" r="5" fill="#fff"/><circle cx="12" cy="-146" r="5" fill="#fff"/><circle cx="-10" cy="-146" r="2.4" fill="#222"/><circle cx="14" cy="-146" r="2.4" fill="#222"/><path d="M-14 -124q14 10 28 0" stroke="#3a2a1a" stroke-width="3" fill="none"/>
    <path d="M-44 -96q-30 20 -34 50" stroke="#5a7a4a" stroke-width="18" stroke-linecap="round" fill="none"/><circle cx="-80" cy="-44" r="12" fill="#7a9a6a"/><path d="M-92 -30l-6 10M-82 -28l0 10M-72 -30l6 10" stroke="#b8b0a0" stroke-width="3" stroke-linecap="round"/></g>
  <g transform="translate(220 252)"><path d="M-12 0l3 -42h18l3 42z" fill="#c0392b"/><rect x="-11" y="-30" width="22" height="6" fill="#e0b040"/><circle cx="0" cy="-52" r="11" fill="#f1c7a0"/><ellipse cx="0" cy="-58" rx="9" ry="5" fill="#fbe0c4"/><circle cx="4" cy="-53" r="1.5" fill="#333"/><path d="M0 -46q4 3 7 0" stroke="#8a3a2a" stroke-width="1.5" fill="none"/>
    <path d="M10 -34l22 -14" stroke="#f1c7a0" stroke-width="6" stroke-linecap="round"/><rect x="28" y="-60" width="18" height="14" rx="3" fill="#fff6d8"/>${[0, 1, 2].map(i => `<path d="M${33 + i * 5} -44q-2 ${6 + i * 3} 0 ${10 + i * 4}" stroke="#7ac0e8" stroke-width="2.5" fill="none" stroke-linecap="round"/>`).join('')}</g>`;
}

// Девичья башня: Босфор на закате, башня на островке, лодка и чайки
function taleTrKizKulesi() {
  return `<defs>${sky('trQ', [[0, '#4a4a8a'], [.5, '#e08a6a'], [1, '#f6c98a']])}${sky('trQw', [[0, '#d08a6a'], [1, '#3a4a7a']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#trQ)"/>${sun(470, 160, 26, '#ffe0a0', .5)}
  <path d="M0 170h${W}V${H}H0z" fill="url(#trQw)"/>
  <g fill="#3a2f4a">${dome(120, 150, 26)}${minaret(80, 166, 70)}${minaret(160, 166, 70)}${dome(240, 156, 18)}${minaret(214, 166, 52)}<rect x="0" y="156" width="${W}" height="14"/><path d="M300 156l40 -10l60 4l70 -6l170 8v18H300z"/></g>
  ${Array.from({ length: 10 }, (_, i) => `<path d="M${40 + i * 62} ${196 + (i % 3) * 22}h${22 + (i % 2) * 10}" stroke="#f6c98a" stroke-width="2" opacity=".55"/>`).join('')}
  <path d="M330 232q40 -16 90 -4q10 6 -6 10h-80z" fill="#6a5a4a"/>
  <g transform="translate(372 226)"><rect x="-14" y="-72" width="28" height="72" fill="#f4ede0"/><rect x="-18" y="-76" width="36" height="6" fill="#d8ccb8"/><rect x="-9" y="-104" width="18" height="28" fill="#f4ede0"/><path d="M-11 -104l11 -22l11 22z" fill="#5a6a7a"/><path d="M0 -126v-8" stroke="#e0b040" stroke-width="2"/><rect x="-5" y="-60" width="10" height="14" rx="5" fill="#3a4a6a"/><rect x="-4" y="-96" width="8" height="10" rx="4" fill="#ffd98a"/><rect x="18" y="-36" width="32" height="36" fill="#ebe2d0"/><path d="M14 -38l20 -12l20 12z" fill="#8a5a3a"/></g>
  <g transform="translate(190 240)"><path d="M-30 0h60l-8 10h-44z" fill="#7a3a22"/><path d="M0 0v-30" stroke="#3a2414" stroke-width="2"/><path d="M2 -28q18 12 0 26z" fill="#f4efe2"/>${man(-12, 0, .45, '#2f4a6a')}</g>
  ${[[520, 90], [560, 110], [250, 80]].map(([x, y]) => `<path d="M${x - 10} ${y}q5 -6 10 0q5 -6 10 0" stroke="#fff" stroke-width="2" fill="none"/>`).join('')}`;
}

// Ферхат и Ширин: Ферхат киркой пробивает гору, из скалы течёт вода к городу
function taleTrFerhat() {
  return `<defs>${sky('trF', [[0, '#2a3a6a'], [1, '#c08aa0']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#trF)"/>${Array.from({ length: 22 }, (_, i) => star((i * 131 + 40) % W, (i * 47 + 10) % 110)).join('')}
  <circle cx="540" cy="56" r="20" fill="#fff3c0"/><circle cx="550" cy="50" r="17" fill="#2e3e6c"/>
  <path d="M0 260L90 120L170 80L260 140L320 200L320 ${H}H0z" fill="#7a6a6a"/><path d="M90 120L130 150L170 80z" fill="#8e7e7a"/>
  <path d="M0 ${H}V230h${W}V${H}z" fill="#5a6a4a"/>
  <path d="M240 168q20 30 60 46t120 26t220 8" stroke="#6ab0e0" stroke-width="10" fill="none" stroke-linecap="round" opacity=".9"/><path d="M250 172q20 26 56 40" stroke="#bfe6fa" stroke-width="3" fill="none" opacity=".8"/>
  <ellipse cx="236" cy="166" rx="14" ry="18" fill="#3a2e2e"/>
  <g transform="translate(200 214)"><path d="M-12 0l3 -44h18l3 44z" fill="#8a2a2a"/><circle cx="0" cy="-52" r="9" fill="#e0b896"/><path d="M-10 -56q10 -12 20 0" fill="#2a1a10"/><path d="M8 -36l26 -24" stroke="#5a3a1a" stroke-width="4" stroke-linecap="round"/><path d="M26 -70l18 16M22 -62l16 -8" stroke="#b8b8c0" stroke-width="4" stroke-linecap="round"/></g>
  ${[[470, 236], [510, 230], [550, 238], [590, 232]].map(([x, y], i) => `<rect x="${x - 16}" y="${y - 30}" width="32" height="30" fill="${i % 2 ? '#e8dcc0' : '#d8c4a0'}"/><path d="M${x - 20} ${y - 28}l20 -14l20 14z" fill="#8a4a2a"/><rect x="${x - 4}" y="${y - 20}" width="8" height="10" fill="#ffd98a"/>`).join('')}
  <g transform="translate(600 196)"><path d="M-8 0l2 -26h12l2 26z" fill="#c05a8a"/><circle cx="0" cy="-32" r="6" fill="#f3c9a8"/><path d="M-7 -34q7 -10 14 0v14h-14z" fill="#2a1a10" opacity=".9"/></g>`;
}

// Дели Думрул: мост через сухое русло, всадник с мечом, Азраил улетает голубем
function taleTrDumrul() {
  return `<defs>${sky('trD', [[0, '#6a7a9a'], [1, '#e8d0a8']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#trD)"/>${cloud(120, 50, 1, '#e8e4dc', .6)}${cloud(480, 40, .9, '#e8e4dc', .6)}
  <path d="M0 150q160 -20 320 -4t320 -6V${H}H0z" fill="#b89a6a"/>
  <path d="M0 230q200 -40 320 -40t320 40V${H}H0z" fill="#a8885a"/><path d="M180 270q140 -60 280 0" stroke="#d8c09a" stroke-width="22" fill="none" opacity=".6"/>
  ${Array.from({ length: 9 }, (_, i) => `<ellipse cx="${200 + i * 30}" cy="${258 - Math.sin(i / 8 * Math.PI) * 22}" rx="7" ry="4" fill="#8a7a6a"/>`).join('')}
  <path d="M110 190q210 -110 420 0" stroke="#8a6a4a" stroke-width="18" fill="none"/><path d="M110 190h420" stroke="#7a5a3a" stroke-width="8"/>${Array.from({ length: 6 }, (_, i) => `<path d="M${180 + i * 56} 190v${-30 + Math.abs(i - 2.5) * 10}" stroke="#7a5a3a" stroke-width="5"/>`).join('')}
  <rect x="100" y="186" width="20" height="60" fill="#8a6a4a"/><rect x="520" y="186" width="20" height="60" fill="#8a6a4a"/>
  <g transform="translate(300 142)">${horse(0, 0, .9, '#3a2a22', '#1a1410')}<path d="M-4 -40l2 -30h14l2 30z" fill="#7a1e1e"/><circle cx="5" cy="-78" r="8" fill="#e0b896"/><path d="M-4 -82q9 -16 18 0z" fill="#2b2b2b"/><path d="M12 -64l34 -30" stroke="#d8dde2" stroke-width="4" stroke-linecap="round"/><path d="M10 -62l6 6" stroke="#e0b040" stroke-width="4"/></g>
  <g transform="translate(420 70)" fill="#fbfaf6"><ellipse cx="0" cy="0" rx="14" ry="7"/><circle cx="12" cy="-4" r="5"/><path d="M17 -4l6 2l-6 2z" fill="#e09a4a"/><path d="M-4 -4q-8 -22 10 -24q-2 12 4 20z"/><path d="M-4 2q-6 18 12 20q-2 -10 2 -16z" opacity=".9"/><path d="M-12 0l-10 -5v10z"/></g>
  ${[0, 1, 2].map(i => `<path d="M${452 + i * 12} ${58 - i * 8}q6 -4 12 0" stroke="#fff" stroke-width="1.5" fill="none" opacity=".7"/>`).join('')}`;
}

// Басат и Тепегёз: одноглазый великан у входа в пещеру, овцы выходят наружу
function taleTrTepegoz() {
  return `<defs>${sky('trT', [[0, '#3a3050'], [1, '#a07a6a']])}<radialGradient id="trTg" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffb04a"/><stop offset="1" stop-color="#ffb04a" stop-opacity="0"/></radialGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#trT)"/>${Array.from({ length: 14 }, (_, i) => star((i * 97 + 300) % W, (i * 31 + 12) % 80, 1.2)).join('')}
  <path d="M0 ${H}V90q60 -40 140 -30q90 -30 160 20q40 40 40 200z" fill="#5a4e5a"/><path d="M90 ${H}q0 -150 100 -150q100 0 100 150z" fill="#1e1822"/>
  <path d="M340 ${H}V200q120 -40 300 -10V${H}z" fill="#6a7a4a"/><rect x="0" y="250" width="${W}" height="30" fill="#4a5a3a"/>
  <g transform="translate(190 256)"><path d="M-56 0q-6 -80 56 -96q62 16 56 96z" fill="#8a6a5a"/><circle cx="0" cy="-118" r="40" fill="#a8806a"/><ellipse cx="0" cy="-128" rx="16" ry="12" fill="#fff"/><circle cx="0" cy="-128" r="7" fill="#7a3a1a"/><circle cx="0" cy="-128" r="3.5" fill="#111"/><path d="M-18 -144q18 -8 36 0" stroke="#4a2a1a" stroke-width="4" fill="none"/><path d="M-12 -100q12 8 24 0" stroke="#4a2a1a" stroke-width="3" fill="none"/><path d="M-40 -130q-8 -20 6 -30M40 -130q8 -20 -6 -30" stroke="#6a4a3a" stroke-width="5" fill="none"/>
    <path d="M-52 -60q-30 10 -30 50M52 -60q30 10 30 50" stroke="#8a6a5a" stroke-width="16" stroke-linecap="round" fill="none"/></g>
  ${sheep(340, 262, 1)}${sheep(390, 266, .95)}${sheep(470, 262, 1)}${sheep(540, 266, .9)}
  <g transform="translate(420 262)"><ellipse cx="0" cy="-18" rx="22" ry="14" fill="#efe9dc"/>${[-14, -5, 4, 13].map(k => `<circle cx="${k}" cy="-28" r="7" fill="#efe9dc"/>`).join('')}<circle cx="14" cy="-40" r="7" fill="#e0b896"/><path d="M6 -44q8 -8 16 0" fill="#2a1a10"/></g>
  <circle cx="600" cy="232" r="26" fill="url(#trTg)"/><path d="M588 240l28 -18" stroke="#8a8a8a" stroke-width="3"/><path d="M610 226l8 -6" stroke="#ff8a2a" stroke-width="4" stroke-linecap="round"/>`;
}

// Шахмеран: царица змей в подземном саду, Джамасп у входа
function taleTrSahmeran() {
  return `<defs>${sky('trS', [[0, '#1e3a3a'], [1, '#3a6a4a']])}<radialGradient id="trSl" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#9ae0b0" stop-opacity=".5"/><stop offset="1" stop-color="#9ae0b0" stop-opacity="0"/></radialGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#trS)"/><rect width="${W}" height="${H}" fill="url(#trSl)"/>
  <path d="M0 0h${W}v40q-80 20 -160 0t-160 10t-160 -6t-160 10z" fill="#2a2420"/>
  ${Array.from({ length: 12 }, (_, i) => { const x = 30 + i * 56, h = 30 + (i * 13) % 40; return `<path d="M${x} 280q-6 -${h} 4 -${h + 20}" stroke="#4a8a4a" stroke-width="4" fill="none"/><circle cx="${x + 4}" cy="${280 - h - 22}" r="6" fill="${['#e06a8a', '#f0c04a', '#c08ae0'][i % 3]}"/>`; }).join('')}
  <rect x="0" y="250" width="${W}" height="30" fill="#2f5a3a"/>
  <g transform="translate(330 250)">
    <path d="M-150 0q40 -40 90 -20t90 -10q30 -10 20 -50" stroke="#c8a83a" stroke-width="30" fill="none" stroke-linecap="round"/>
    <path d="M-150 0q40 -40 90 -20t90 -10q30 -10 20 -50" stroke="#7a8a2a" stroke-width="30" fill="none" stroke-linecap="round" stroke-dasharray="4 10" opacity=".7"/>
    <path d="M38 -78q-14 -2 -16 -30q2 -16 18 -18q16 2 18 18q-2 28 -16 30z" fill="#c8a83a"/><path d="M28 -96h24" stroke="#e0c86a" stroke-width="3"/>
    <path d="M22 -140q-4 -26 18 -28q22 2 18 28q-2 30 8 52q-14 -2 -20 -14h-12q-6 12 -20 14q10 -22 8 -52z" fill="#2a1a10"/><circle cx="40" cy="-142" r="14" fill="#f3d2b0"/><path d="M27 -148q13 -14 26 0q-6 -8 -13 -8t-13 8z" fill="#2a1a10"/><circle cx="34" cy="-142" r="1.6" fill="#333"/><circle cx="46" cy="-142" r="1.6" fill="#333"/><path d="M36 -134q4 3 8 0" stroke="#a03a3a" stroke-width="1.5" fill="none"/>
    <path d="M26 -158l4 -14l6 8l4 -12l4 12l6 -8l4 14z" fill="#f0c04a"/><circle cx="40" cy="-164" r="2.4" fill="#e04a4a"/></g>
  ${[[120, 200], [520, 210], [580, 180]].map(([x, y], i) => `<path d="M${x} ${y}q10 -10 20 0t20 0" stroke="${i % 2 ? '#a8c83a' : '#e0b040'}" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="${x + 42}" cy="${y - 1}" r="3.5" fill="${i % 2 ? '#a8c83a' : '#e0b040'}"/>`).join('')}
  ${man(560, 250, 1, '#5a3a2a', '#c0392b')}<path d="M540 30l-40 220h80z" fill="#e8f6d8" opacity=".12"/><ellipse cx="540" cy="34" rx="22" ry="8" fill="#0e0c0a"/>`;
}

// Кёроглу: серый конь Кырат скачет по горам Чамлыбель, всадник с сазом
function taleTrKoroglu() {
  return `<defs>${sky('trO', [[0, '#e08a4a'], [.6, '#f3c87a'], [1, '#f6e2b0']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#trO)"/>${sun(110, 110, 30, '#fff0c0', .5)}
  <path d="M0 190L90 100L170 150L260 70L360 160L450 90L560 150L640 110V${H}H0z" fill="#7a6a7a"/><path d="M260 70l-20 30l20 -6l20 10z" fill="#f4eee6"/><path d="M450 90l-16 22l16 -4l14 8z" fill="#f4eee6"/>
  ${hills(206, '#5a7a4a', 26)}${[40, 70, 520, 560, 600].map((x, i) => pine(x, 236, 70 + (i % 2) * 20, '#2f4a32')).join('')}
  <rect x="0" y="236" width="${W}" height="44" fill="#4a6a3a"/>
  <g transform="translate(330 246)">${horse(0, 0, 1.5, '#e4e8ec', '#7a8088')}
    <path d="M-6 -62l2 -36h16l2 36z" fill="#8a2a2a"/><circle cx="4" cy="-106" r="9" fill="#e0b896"/><path d="M-6 -110q10 -14 20 0z" fill="#2a1a10"/><path d="M-2 -100q6 8 12 0" fill="#2a1a10"/>
    <g transform="translate(-8 -78) rotate(-35)"><ellipse cx="0" cy="0" rx="10" ry="7" fill="#b0702a"/><path d="M8 0h40" stroke="#7a4a1a" stroke-width="3"/><path d="M46 -3v6" stroke="#3a2a1a" stroke-width="4"/></g>
    <path d="M-20 -60q-40 4 -56 -6" stroke="#c0392b" stroke-width="3" fill="none"/></g>
  ${[0, 1, 2].map(i => `<path d="M${190 - i * 30} ${226 + i * 8}h-40" stroke="#fff" stroke-width="2" opacity="${.6 - i * .15}" stroke-linecap="round"/>`).join('')}`;
}

export const TR_TALES_ART = {
  'tale-tr-kurk': { draw: taleTrKurk, label: 'Насреддин Ходжа в шубе опускает рукав в суп за свадебным столом' },
  'tale-tr-maya': { draw: taleTrMaya, label: 'Ходжа на берегу озера бросает ложку йогурта в воду, рядом смеётся крестьянин' },
  'tale-tr-kazan': { draw: taleTrKazan, label: 'Большой медный казан и маленькая кастрюлька у двери соседа, Ходжа и сосед' },
  'tale-tr-keloglan': { draw: taleTrKeloglan, label: 'Кельоглан выжимает воду из сыра перед огромным дэвом в лесу' },
  'tale-tr-kizkulesi': { draw: taleTrKizKulesi, label: 'Девичья башня на островке в Босфоре на закате, лодка и минареты Стамбула' },
  'tale-tr-ferhat': { draw: taleTrFerhat, label: 'Ферхат киркой пробивает гору, вода течёт к городу, ночное небо' },
  'tale-tr-dumrul': { draw: taleTrDumrul, label: 'Дели Думрул с мечом на коне у моста над сухим руслом, улетает белый голубь' },
  'tale-tr-tepegoz': { draw: taleTrTepegoz, label: 'Одноглазый великан Тепегёз у входа в пещеру, Басат в шкуре барана среди овец' },
  'tale-tr-sahmeran': { draw: taleTrSahmeran, label: 'Шахмеран — царица змей с короной в подземном саду, Джамасп у входа' },
  'tale-tr-koroglu': { draw: taleTrKoroglu, label: 'Кёроглу с сазом на сером коне Кырате скачет по горам на закате' }
};
