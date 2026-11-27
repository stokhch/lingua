// Иллюстрации к мифам Древней Греции (data/el/library/part8.js): SVG 640×280, как в text-art.js.
// Отдельный модуль; text-art.js подключает EL_MYTHS_ART в общий список. Палитра — краснофигурная керамика,
// мрамор, море и золото; фигуры условные, в хитонах.
const W = 640, H = 280;
const grad = (id, stops, x2 = 0, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
const sun = (x, y, r, c = '#ffd76a', glow = .35) => `<circle cx="${x}" cy="${y}" r="${r * 2.4}" fill="${c}" opacity="${glow * .4}"/><circle cx="${x}" cy="${y}" r="${r * 1.5}" fill="${c}" opacity="${glow}"/><circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
const cloud = (x, y, s = 1, c = '#fff', o = .85) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}" opacity="${o}"><ellipse cx="0" cy="0" rx="34" ry="14"/><ellipse cx="-22" cy="4" rx="22" ry="11"/><ellipse cx="24" cy="5" rx="24" ry="10"/><ellipse cx="4" cy="-10" rx="20" ry="13"/></g>`;
const stars = (n, seed = 1, maxY = 150) => Array.from({ length: n }, (_, i) => `<circle cx="${(i * 131 + seed * 37) % W}" cy="${(i * 53 + seed * 11) % maxY}" r="${1 + (i % 3) * .5}" fill="#fff" opacity="${.45 + (i % 4) * .12}"/>`).join('');
const waves = (y, n = 9, c = '#cfe8f5', o = .6) => Array.from({ length: n }, (_, i) => `<path d="M${30 + i * 68} ${y + (i % 3) * 14}q12 -6 24 0t24 0" stroke="${c}" stroke-width="2" fill="none" opacity="${o}"/>`).join('');
// греческий меандр полоской
const meander = (y, c = '#e9d9b0', h = 10) => `<g stroke="${c}" stroke-width="2" fill="none" opacity=".8">${Array.from({ length: Math.ceil(W / 20) }, (_, i) => `<path d="M${i * 20} ${y + h}v${-h}h${14}v${h * .7}h${-7}v${-h * .4}"/>`).join('')}</g>`;
// фигура в хитоне: x, y — ступни; robe — цвет хитона; opts: helmet, beard, hair, arm (путь руки)
const person = (x, y, s = 1, robe = '#c2563a', o = {}) => `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M-15 0q1 -36 7 -52h16q6 16 7 52z" fill="${robe}"/><path d="M-8 -52q8 6 16 0" stroke="#00000033" stroke-width="2" fill="none"/>
  <circle cx="0" cy="-62" r="10" fill="${o.skin || '#e8c09a'}"/>
  <path d="M-10 -63q0 -13 10 -13q11 0 11 12q-6 -6 -11 -5q-6 0 -10 6z" fill="${o.hair || '#3a2414'}"/>
  ${o.long ? `<path d="M-10 -64q-4 14 -2 24h5zM10 -64q4 14 2 24h-5z" fill="${o.hair || '#3a2414'}"/>` : ''}
  ${o.beard ? `<path d="M-8 -58q8 16 16 0z" fill="${o.beard}"/>` : ''}
  ${o.helmet ? `<path d="M-11 -64q0 -16 11 -16q11 0 11 16h-4v-4h-14v4z" fill="${o.helmet}"/><path d="M-8 -80q8 -14 18 -4" stroke="#c0392b" stroke-width="5" fill="none" stroke-linecap="round"/>` : ''}
  ${o.wreath ? `<path d="M-10 -68q10 -8 20 0" stroke="${o.wreath}" stroke-width="3" fill="none" stroke-dasharray="3 2"/>` : ''}
  <circle cx="4" cy="-62" r="1.3" fill="#2a1a10"/>
  ${o.arm ? `<path d="${o.arm}" stroke="${o.skin || '#e8c09a'}" stroke-width="5" stroke-linecap="round" fill="none"/>` : ''}${o.extra || ''}</g>`;
const column = (x, y, h, w = 14, c = '#efe6d2') => `<rect x="${x - w / 2}" y="${y - h}" width="${w}" height="${h}" fill="${c}"/>${[-.25, 0, .25].map(k => `<path d="M${x + k * w} ${y - h + 4}v${h - 8}" stroke="#00000018" stroke-width="1.5"/>`).join('')}<rect x="${x - w * .75}" y="${y - h - 5}" width="${w * 1.5}" height="5" fill="${c}"/><rect x="${x - w * .7}" y="${y - 4}" width="${w * 1.4}" height="4" fill="${c}"/>`;
const temple = (x, y, w, h, c = '#efe6d2', n = 6) => `<g>${Array.from({ length: n }, (_, i) => column(x + 10 + i * (w - 20) / (n - 1), y - 6, h, w / n * .42, c)).join('')}<rect x="${x - 4}" y="${y - 6}" width="${w + 8}" height="6" fill="${c}"/><rect x="${x - 4}" y="${y - h - 16}" width="${w + 8}" height="10" fill="${c}"/><path d="M${x - 8} ${y - h - 16}L${x + w / 2} ${y - h - 40}L${x + w + 8} ${y - h - 16}z" fill="${c}"/></g>`;
const olive = (x, y, s = 1, leaf = '#7f9a5a') => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-4 0q-6 -30 4 -50q-14 -10 -10 -24M2 -46q14 -12 22 -10" stroke="#6a5038" stroke-width="7" fill="none" stroke-linecap="round"/>${[[-20, -78, 26], [10, -84, 30], [30, -64, 22], [-28, -58, 20], [0, -60, 24]].map(([cx, cy, r]) => `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * .62}" fill="${leaf}" opacity=".92"/>`).join('')}${[[-14, -70], [16, -78], [28, -60], [-4, -56]].map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="2.6" fill="#3a3a4a"/>`).join('')}</g>`;
const ship = (x, y, s = 1, sail = '#f4efe2', hull = '#5a3a22', oars = 0) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-70 -6q70 14 140 0l-14 20h-112z" fill="${hull}"/><path d="M70 -6q12 -8 10 -22" stroke="${hull}" stroke-width="5" fill="none"/><circle cx="-50" cy="2" r="3" fill="#fff"/>${Array.from({ length: oars }, (_, i) => `<path d="M${-52 + i * 13} 6l-8 22" stroke="#3a2414" stroke-width="2.5"/>`).join('')}<path d="M0 -6v-84" stroke="#3a2414" stroke-width="3"/><path d="M-36 -82h72v56h-72z" fill="${sail}"/><path d="M-36 -82h72" stroke="#3a2414" stroke-width="3"/></g>`;
const bolt = (x, y, s = 1, c = '#ffe27a') => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 0l-14 34h12l-10 34l30 -44h-13l11 -24z" fill="${c}"/>`;
const snake = (x, y, s = 1, c = '#4f8a3a') => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 0q10 -12 0 -22q-10 -10 2 -20" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
const wing = (x, y, s = 1, flip = 1, c = '#f6efe0') => `<g transform="translate(${x} ${y}) scale(${s * flip} ${s})">${[0, 1, 2, 3, 4].map(i => `<path d="M0 0q${30 + i * 4} ${-20 + i * 9} ${46 + i * 2} ${-6 + i * 10}" stroke="${c}" stroke-width="${7 - i}" stroke-linecap="round" fill="none"/>`).join('')}</g>`;
const flower = (x, y, c = '#fff', mid = '#f4c430') => `<path d="M${x} ${y}v-22" stroke="#4f7a3a" stroke-width="2"/>${[0, 72, 144, 216, 288].map(a => `<ellipse cx="${x}" cy="${y - 28}" rx="3.2" ry="7" fill="${c}" transform="rotate(${a} ${x} ${y - 22})"/>`).join('')}<circle cx="${x}" cy="${y - 22}" r="3" fill="${mid}"/>`;
const sheep = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="-14" rx="18" ry="11" fill="#f4f1ea"/>${[-12, -4, 4, 12].map(k => `<circle cx="${k}" cy="-22" r="6" fill="#f4f1ea"/>`).join('')}<ellipse cx="18" cy="-18" rx="6" ry="5" fill="#3a3a3a"/>${[-10, -4, 6, 12].map(k => `<rect x="${k}" y="-5" width="3" height="7" fill="#3a3a3a"/>`).join('')}</g>`;
const horse = (x, y, s = 1, c = '#f4f1ea', mane = '#c9c2b2') => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="-34" rx="30" ry="13" fill="${c}"/><path d="M22 -42l16 -24l12 4l-4 10l-10 2l-6 14z" fill="${c}"/><path d="M36 -66l2 -8l4 7z" fill="${c}"/><path d="M24 -46q4 -20 14 -24" stroke="${mane}" stroke-width="5" fill="none"/><circle cx="42" cy="-60" r="1.6" fill="#222"/><path d="M-30 -38q-16 -2 -18 14" stroke="${mane}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M-22 -26l-14 18M-12 -24l-4 24M14 -24l16 14M22 -26l22 4" stroke="${c}" stroke-width="5" stroke-linecap="round"/></g>`;

// ---------- новые мифы ----------
// Олимп: гора в облаках, храм на вершине, молния
function theoi() {
  return `<defs>${grad('mT', [[0, '#3f5f9a'], [.6, '#c9a0c0'], [1, '#f6d6a8']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#mT)"/>${sun(520, 70, 22, '#ffe7a0', .4)}
  <path d="M60 ${H}L250 120L340 92h120L600 ${H}z" fill="#6d7c96"/><path d="M250 120L280 132L262 142zM340 92h120l16 14l-30 6l-20 -8l-40 10l-30 -6z" fill="#f2f4f8"/>
  <path d="M0 ${H}L150 170L230 210L360 160L470 200L${W} 150V${H}z" fill="#55657e"/>
  ${temple(354, 94, 92, 26, '#fbf6ea', 5)}
  ${cloud(140, 150, 1.4, '#fff', .9)}${cloud(320, 176, 1.8, '#fff', .92)}${cloud(520, 160, 1.5, '#fff', .9)}${cloud(240, 200, 1.2, '#fff', .8)}
  ${bolt(196, 36, 1.2)}${bolt(560, 120, .8, '#fff2b0')}
  ${meander(256, '#f6e6c0')}`;
}

// Арахна: ткацкий станок с узором, паутина и паучок
function arachni() {
  return `<defs>${grad('mA', [[0, '#e9d4ae'], [1, '#c79a64']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#mA)"/>
  <rect x="0" y="236" width="${W}" height="44" fill="#9a6a3e"/>
  <path d="M220 236V40M420 236V40M210 44h220" stroke="#6a4424" stroke-width="10" stroke-linecap="round"/>
  <rect x="236" y="56" width="168" height="130" fill="#f4ead6"/>
  ${Array.from({ length: 8 }, (_, i) => `<path d="M${246 + i * 21} 56v130" stroke="#d8c8a8" stroke-width="1"/>`).join('')}
  <path d="M236 80h168M236 160h168" stroke="#2f5a8a" stroke-width="6"/>${meander(98, '#c0392b', 12).replace('<g ', '<g clip-path="url(#mAc)" ')}
  <clipPath id="mAc"><rect x="236" y="56" width="168" height="130"/></clipPath>
  ${person(306, 176, .7, '#2f5a8a', { helmet: '#c9a227' })}${person(350, 176, .7, '#c0392b', { long: true })}
  <path d="M230 236v-40l20 -10h140l20 10v40" fill="none" stroke="#6a4424" stroke-width="6"/>
  ${person(128, 236, 1.25, '#7a3a5a', { long: true, hair: '#5a2a14', arm: 'M8 -44q20 -6 34 -26' })}
  <g transform="translate(560 70)" stroke="#fff" stroke-width="1.4" fill="none" opacity=".9">${[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(a => `<path d="M0 0L${(Math.cos(a * Math.PI / 180) * 70).toFixed(1)} ${(Math.sin(a * Math.PI / 180) * 70).toFixed(1)}"/>`).join('')}${[16, 32, 48, 64].map(r => `<circle r="${r}"/>`).join('')}</g>
  <g transform="translate(560 112)"><path d="M0 -42V-8" stroke="#fff" stroke-width="1"/><ellipse cx="0" cy="0" rx="7" ry="9" fill="#2a1a10"/><circle cx="0" cy="-10" r="5" fill="#2a1a10"/>${[-1, 1].map(f => [-6, -2, 2, 6].map(k => `<path d="M0 ${k}q${f * 12} -6 ${f * 16} ${4 + k}" stroke="#2a1a10" stroke-width="1.8" fill="none"/>`).join('')).join('')}</g>`;
}

// Прометей: ночь, герой несёт огонь в тростнике; вдали скала с цепями и орёл
function prometheas() {
  return `<defs>${grad('mP', [[0, '#141a36'], [.7, '#3b2e52'], [1, '#7a4a3a']])}<radialGradient id="mPf"><stop offset="0" stop-color="#ffd76a"/><stop offset="1" stop-color="#ff7a2a" stop-opacity="0"/></radialGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#mP)"/>${stars(40, 3)}
  <path d="M430 ${H}L520 120L560 140L620 90L${W} 110V${H}z" fill="#2a2236"/>
  <path d="M556 150l10 30M566 180l-14 20" stroke="#9aa0aa" stroke-width="3" stroke-dasharray="4 3"/>
  <g transform="translate(540 70)" fill="#1a1424"><path d="M0 0q-30 -18 -54 -6q24 2 34 14q-18 6 -22 18q22 -10 42 -10q20 0 42 10q-4 -12 -22 -18q10 -12 34 -14q-24 -12 -54 6z"/></g>
  <path d="M0 ${H}V230q140 -40 300 -16q80 12 160 66z" fill="#2c2030"/>
  <circle cx="232" cy="118" r="60" fill="url(#mPf)" opacity=".8"/>
  ${person(200, 226, 1.4, '#a8452a', { beard: '#3a2414', arm: 'M8 -44q14 -18 22 -36' })}
  <path d="M224 186l14 -76" stroke="#8a9a4a" stroke-width="4"/>
  <path d="M238 110q-14 -18 2 -40q4 16 12 10q4 18 -14 30z" fill="#ffb03a"/><path d="M238 104q-6 -10 2 -22q4 10 6 8q0 10 -8 14z" fill="#fff1a0"/>
  ${[[90, 250], [130, 262], [330, 246]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="22" ry="5" fill="#ff9a3a" opacity=".25"/>`).join('')}`;
}

// Афина и Посейдон: скала Акрополя, олива и трезубец
function athina() {
  return `<defs>${grad('mAt', [[0, '#8cc8ee'], [1, '#f2f7f2']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#mAt)"/>${sun(90, 60, 18)}${cloud(250, 46, .7)}${cloud(520, 40, .9)}
  <path d="M0 ${H}V220q160 -20 320 -6t320 -4V${H}z" fill="#c9b08a"/>
  <path d="M120 222q20 -70 80 -84h260q60 14 80 84z" fill="#b89a74"/><path d="M150 210q20 -50 60 -60" stroke="#a68a64" stroke-width="3" fill="none"/>
  ${temple(250, 138, 150, 44, '#f6efe0', 8)}
  ${olive(170, 140, 1.15)}
  <g transform="translate(500 138)"><path d="M0 0v-96" stroke="#3a6a9a" stroke-width="5"/><path d="M-18 -96v-22M18 -96v-22M0 -96v-30M-18 -96h36" stroke="#3a6a9a" stroke-width="5" stroke-linecap="round"/><path d="M-22 -116l4 -8l4 8M14 -116l4 -8l4 8M-4 -124l4 -8l4 8" fill="#3a6a9a"/></g>
  <path d="M488 140q-10 20 -30 40q-14 14 -40 26" stroke="#7ac0e8" stroke-width="6" fill="none" stroke-linecap="round" opacity=".85"/>
  ${[0, 1, 2].map(i => `<circle cx="${470 - i * 20}" cy="${156 + i * 18}" r="3" fill="#bfe4f7"/>`).join('')}`;
}

// Сизиф: склон, человек толкает огромный камень, сумрак подземного мира
function sisyfos() {
  return `<defs>${grad('mS', [[0, '#2e2a3e'], [1, '#6a5a6e']])}<radialGradient id="mSr" cx=".35" cy=".35"><stop offset="0" stop-color="#9a9088"/><stop offset="1" stop-color="#4f4842"/></radialGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#mS)"/>${stars(18, 7, 90)}
  <path d="M0 ${H}L0 250L560 40L${W} 40V${H}z" fill="#3e3640"/><path d="M0 250L560 40" stroke="#5a4e58" stroke-width="3"/>
  <circle cx="574" cy="40" r="4" fill="#ffe7a0"/><path d="M566 40h16" stroke="#ffe7a0" stroke-width="2"/>
  <g transform="rotate(-20.6 330 132)"><circle cx="372" cy="98" r="46" fill="url(#mSr)"/><path d="M350 80q10 -8 24 -4M380 114q10 2 16 -8" stroke="#3a342e" stroke-width="2" fill="none"/>
  ${person(300, 132, 1.25, '#7a3a2a', { beard: '#2a1a10', arm: 'M6 -46q20 -4 34 -6M2 -40q22 4 34 2' })}</g>
  ${[[120, 230], [200, 196], [80, 254]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="10" ry="5" fill="#2e2830"/>`).join('')}`;
}

// Ахилл: воин в шлеме со щитом, стрела летит к пятке
function axilleas() {
  return `<defs>${grad('mX', [[0, '#e8b47a'], [1, '#f6e2c0']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#mX)"/>${sun(520, 70, 26, '#fff0b8', .4)}
  <path d="M0 ${H}V230q200 -20 400 0t240 -6V${H}z" fill="#c99a62"/>
  <path d="M420 230v-90h200v90" fill="#b88a5a"/>${[440, 480, 520, 560, 600].map(x => `<rect x="${x - 8}" y="130" width="16" height="14" fill="#b88a5a"/>`).join('')}
  ${person(250, 236, 1.7, '#1f1f24', { helmet: '#c9a227', arm: 'M-6 -46q-14 -20 -6 -46', extra: '<path d="M-14 -88v-44" stroke="#6a4a2a" stroke-width="3"/><path d="M-18 -130l4 -12l4 12z" fill="#9aa0aa"/><circle cx="16" cy="-30" r="20" fill="#c9a227"/><circle cx="16" cy="-30" r="14" fill="none" stroke="#7a5a12" stroke-width="2"/><path d="M8 -36l8 -8l8 8l-8 10z" fill="#7a5a12"/>' })}
  <path d="M520 220L300 232" stroke="#4a3a2a" stroke-width="3"/><path d="M300 232l14 -6l-2 10z" fill="#4a3a2a"/><path d="M512 220l10 -6M512 220l10 6" stroke="#c0392b" stroke-width="3"/>
  <circle cx="276" cy="234" r="14" fill="none" stroke="#c0392b" stroke-width="2" stroke-dasharray="4 3"/>`;
}

// Европа на белом быке плывёт по морю
function evropi() {
  return `<defs>${grad('mE', [[0, '#f6c88a'], [1, '#fbe6c8']])}${grad('mEw', [[0, '#3f8fbf'], [1, '#1f5a86']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#mE)"/>${sun(120, 80, 28, '#ffe3a0', .4)}${cloud(470, 60, .8)}
  <path d="M500 150q60 -30 140 -26V160H500z" fill="#b48a6a"/>
  <rect x="0" y="150" width="${W}" height="130" fill="url(#mEw)"/>${waves(176, 10)}
  <g transform="translate(330 222)"><ellipse cx="0" cy="-16" rx="62" ry="22" fill="#fbfaf6"/><path d="M48 -26q30 -20 46 -8q6 10 -4 18q-12 6 -30 2z" fill="#fbfaf6"/><path d="M74 -36q-4 -18 8 -22M86 -32q10 -14 22 -10" stroke="#e0c890" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="84" cy="-24" r="2" fill="#2a1a10"/>
  ${['#e05a6a', '#f4c430', '#fff', '#e05a6a', '#f4c430'].map((c, i) => `<circle cx="${60 + i * 6}" cy="${-14 + (i % 2) * 3}" r="3" fill="${c}"/>`).join('')}
  <path d="M-80 -6q160 18 180 0" stroke="#1f5a86" stroke-width="12" opacity=".6"/></g>
  ${person(316, 196, 1.1, '#e07a6a', { long: true, hair: '#6a2a14', arm: 'M8 -44q14 4 20 16', extra: '<path d="M-14 -4q-10 -8 -6 -20" stroke="#e07a6a" stroke-width="10" stroke-linecap="round"/>' })}
  ${waves(250, 9, '#9fd0ec', .5)}`;
}

// Яблоко раздора: золотое яблоко на столе и силуэты трёх богинь
function milo() {
  return `<defs>${grad('mM', [[0, '#2f2a4a'], [1, '#7a4a5a']])}<radialGradient id="mMa" cx=".35" cy=".35"><stop offset="0" stop-color="#fff2a0"/><stop offset=".6" stop-color="#e0b020"/><stop offset="1" stop-color="#a07010"/></radialGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#mM)"/>${stars(26, 5, 120)}
  ${[80, 200, 440, 560].map(x => column(x, 236, 170, 22, '#4a3e5e')).join('')}
  ${person(200, 236, 1.5, '#7a5aa8', { long: true, hair: '#2a1a10', wreath: '#e0b020' })}
  ${person(440, 236, 1.5, '#e07a8a', { long: true, hair: '#c98a3a' })}
  ${person(560, 236, 1.5, '#3f6a8a', { helmet: '#c9a227' })}
  <rect x="250" y="200" width="150" height="10" rx="3" fill="#c9a46a"/><path d="M270 210v36M380 210v36" stroke="#8a6a3e" stroke-width="6"/>
  <circle cx="325" cy="180" r="44" fill="#ffe27a" opacity=".18"/>
  <circle cx="325" cy="184" r="16" fill="url(#mMa)"/><path d="M325 168q0 -8 4 -10" stroke="#6a4a1a" stroke-width="2" fill="none"/><path d="M329 162q10 -6 14 2q-8 4 -14 -2z" fill="#7f9a5a"/>`;
}

// Троянский конь у стен Трои
function dourios() {
  return `<defs>${grad('mD', [[0, '#e8926a'], [.6, '#f3c08a'], [1, '#f6dcb0']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#mD)"/>${sun(540, 110, 30, '#ffe3a0', .4)}
  <rect x="0" y="96" width="300" height="150" fill="#b99468"/>${[0, 40, 80, 120, 160, 200, 240, 280].map(x => `<rect x="${x}" y="84" width="22" height="14" fill="#b99468"/>`).join('')}
  <rect x="200" y="56" width="70" height="190" fill="#a8845a"/>${[200, 224, 248].map(x => `<rect x="${x}" y="44" width="16" height="14" fill="#a8845a"/>`).join('')}
  <path d="M60 246v-70q30 -26 60 0v70z" fill="#5a3a22"/>${[[30, 130], [150, 140], [234, 110]].map(([x, y]) => `<rect x="${x}" y="${y}" width="10" height="16" fill="#5a3a22"/>`).join('')}
  <rect x="0" y="240" width="${W}" height="40" fill="#c9a46a"/>
  <g transform="translate(430 232)"><rect x="-80" y="-10" width="160" height="10" fill="#6a4424"/>${[-60, -20, 20, 60].map(x => `<circle cx="${x}" cy="4" r="10" fill="#4a2e18"/><circle cx="${x}" cy="4" r="3" fill="#c9a46a"/>`).join('')}
  <path d="M-66 -10v-50M-36 -10v-50M36 -10v-50M66 -10v-50" stroke="#8a5a30" stroke-width="12"/>
  <path d="M-80 -60q0 -50 60 -50h60q40 0 40 30v20z" fill="#9a6a38"/><path d="M-70 -86h140M-74 -70h150" stroke="#6a4424" stroke-width="2"/>
  <path d="M60 -96l20 -60l30 4l10 30l-16 8l-14 -6l-6 30z" fill="#9a6a38"/><path d="M84 -150l6 -16l8 14z" fill="#9a6a38"/><path d="M66 -110q6 -36 16 -46" stroke="#5a3a1a" stroke-width="7" fill="none"/><circle cx="104" cy="-136" r="3" fill="#2a1a10"/>
  <path d="M-80 -80q-24 6 -22 34" stroke="#5a3a1a" stroke-width="7" fill="none" stroke-linecap="round"/><rect x="-14" y="-96" width="22" height="16" fill="#6a4424"/></g>`;
}

// Персей с крылатыми сандалиями, щит-зеркало и Пегас
function perseas() {
  return `<defs>${grad('mPe', [[0, '#2a4a7a'], [.7, '#7aa0c8'], [1, '#e8e2d0']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#mPe)"/>${cloud(120, 60, .9)}${cloud(420, 200, 1.3, '#fff', .7)}
  <path d="M0 ${H}V236q120 -22 240 -6V${H}z" fill="#5a5a6a"/><path d="M40 236l20 -40l24 4l10 36z" fill="#6a6a7a"/>
  <g transform="rotate(-14 300 160)">${person(300, 190, 1.5, '#c0392b', { helmet: '#9aa0aa', arm: 'M8 -46q20 -10 34 -30', extra: '<path d="M42 -76l18 -34" stroke="#cfd6dd" stroke-width="4" stroke-linecap="round"/><ellipse cx="-14" cy="-34" rx="16" ry="20" fill="#d8dee4"/><ellipse cx="-14" cy="-34" rx="11" ry="14" fill="#a8b4c0"/>' })}
  ${wing(286, 192, .45, -1)}${wing(312, 192, .45, 1)}</g>
  <g transform="translate(520 130)">${horse(0, 0, 1.2)}${wing(-4, -44, .9, -1, '#fff')}</g>
  ${stars(10, 2, 60)}`;
}

// Ясон: корабль «Арго» с вёслами, золотое руно на дереве и дракон
function iasonas() {
  return `<defs>${grad('mI', [[0, '#5a7aa8'], [1, '#f0d6a8']])}${grad('mIw', [[0, '#2f6f9a'], [1, '#1a4a6e']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#mI)"/>${sun(330, 70, 22, '#ffe3a0', .35)}
  <path d="M420 190q60 -70 220 -60V${H}H420z" fill="#4f6a3a"/>
  <rect x="0" y="180" width="440" height="100" fill="url(#mIw)"/>${waves(204, 6)}
  ${ship(200, 196, 1.2, '#e9d6a8', '#6a3a1e', 9)}<path d="M180 116l20 -12l20 12z" fill="#c0392b"/>
  <path d="M540 200v-90M540 130l-30 -30M540 120l26 -26" stroke="#5a3a22" stroke-width="9" stroke-linecap="round"/>${[[510, 92], [566, 88], [540, 72]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="34" ry="20" fill="#3f6a2a"/>`).join('')}
  <path d="M520 112q20 -8 40 0l-4 34q-16 6 -32 0z" fill="#f2c43a"/>${[0, 1, 2].map(i => `<path d="M${526 + i * 10} 118q4 8 0 18" stroke="#c99a1a" stroke-width="2" fill="none"/>`).join('')}
  <path d="M600 210q-30 -6 -40 -20q-10 -16 6 -24q18 -6 22 10q4 14 30 12" stroke="#2f6a3a" stroke-width="12" fill="none" stroke-linecap="round"/><circle cx="572" cy="170" r="10" fill="#2f6a3a"/><circle cx="568" cy="167" r="2" fill="#ffd76a"/><path d="M560 172l-8 2" stroke="#c0392b" stroke-width="2"/>`;
}

// Сфинкс на скале и путник с посохом
function sfigga() {
  return `<defs>${grad('mSf', [[0, '#f0a868'], [1, '#f8dcae']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#mSf)"/>${sun(110, 70, 24, '#fff0c0', .4)}
  <path d="M0 ${H}V240q320 -16 640 0V${H}z" fill="#c9a06a"/>
  <path d="M330 ${H}L360 150h200l40 130z" fill="#a8805a"/><path d="M380 160l-10 40M520 170l10 50" stroke="#8a6a46" stroke-width="3"/>
  <g transform="translate(470 150)"><ellipse cx="0" cy="-20" rx="56" ry="20" fill="#d9a85a"/><path d="M-56 -14q-20 -4 -22 -24" stroke="#d9a85a" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M-36 -2v-10M-16 -2v-10M26 -2v-12M46 -2v-12" stroke="#c08a3e" stroke-width="10" stroke-linecap="round"/>
  <path d="M-10 -30q-40 -40 -10 -70q10 30 40 30z" fill="#a8743a"/><path d="M-6 -34q-22 -26 -4 -50" stroke="#8a5a2a" stroke-width="2" fill="none"/>
  <path d="M30 -28q4 -30 10 -34h18q6 4 6 34z" fill="#d9a85a"/><circle cx="48" cy="-72" r="13" fill="#e8c09a"/><path d="M34 -74q0 -18 14 -18q14 0 14 18v14h-6v-10h-16v10h-6z" fill="#3a2414"/><circle cx="53" cy="-73" r="1.5" fill="#2a1a10"/></g>
  ${person(200, 246, 1.4, '#3f6a8a', { arm: 'M-6 -44q-12 10 -16 22', extra: '<path d="M-24 0v-76" stroke="#6a4a2a" stroke-width="4" stroke-linecap="round"/>' })}
  <text x="300" y="70" font-family="Georgia,serif" font-size="40" fill="#7a4a2a" opacity=".55">;</text>`;
}

// ---------- мифы из частей 1–5 ----------
// Икар: солнце, море, отец и сын на крыльях, падающие перья
function ikaros() {
  return `<defs>${grad('mIk', [[0, '#f6b25a'], [.5, '#f8d89a'], [1, '#bfe0f0']])}${grad('mIkw', [[0, '#3a8ac0'], [1, '#1a4e7a']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#mIk)"/>${sun(500, 60, 34, '#fff1a0', .5)}
  <rect x="0" y="196" width="${W}" height="84" fill="url(#mIkw)"/>${waves(214, 9)}
  <path d="M0 200q60 -30 120 -10v10H0z" fill="#b48a6a"/>
  <g transform="translate(160 150)">${wing(-4, -40, .8, -1)}${wing(4, -40, .8, 1)}${person(0, 0, .9, '#3f6a8a', { beard: '#e8e2d6', hair: '#e8e2d6' })}</g>
  <g transform="translate(420 96) rotate(30)">${wing(-4, -40, .6, -1, '#f6efe0')}${person(0, 0, .8, '#c0392b')}</g>
  ${[[400, 130, 20], [440, 150, -30], [380, 170, 50], [460, 120, 10]].map(([x, y, a]) => `<path transform="rotate(${a} ${x} ${y})" d="M${x} ${y}q8 -6 16 0q-8 4 -16 0z" fill="#fff8e8"/>`).join('')}`;
}

// Персефона: слева зима, справа весна, посередине гранат
function persefoni() {
  return `<defs>${grad('mPw', [[0, '#8a9ab0'], [1, '#d8dee6']])}${grad('mPs', [[0, '#8cd0f0'], [1, '#e8f6e0']])}</defs>
  <rect width="320" height="${H}" fill="url(#mPw)"/><rect x="320" width="320" height="${H}" fill="url(#mPs)"/>${sun(560, 60, 20)}
  <path d="M0 ${H}V220q160 -20 320 0V${H}z" fill="#f2f4f8"/><path d="M320 ${H}V220q160 -20 320 0V${H}z" fill="#7fb85a"/>
  ${[60, 140, 230].map(x => `<path d="M${x} 222v-60M${x} 186l-16 -18M${x} 176l14 -14" stroke="#6a5a4a" stroke-width="5" stroke-linecap="round"/>`).join('')}
  ${Array.from({ length: 20 }, (_, i) => `<circle cx="${(i * 47) % 300 + 8}" cy="${(i * 37) % 200 + 10}" r="2" fill="#fff"/>`).join('')}
  ${[380, 470, 570].map(x => olive(x, 222, .7, '#5fa04a')).join('')}${[[350, 250, '#e05a8a'], [420, 262, '#f4c430'], [520, 252, '#fff'], [600, 266, '#e05a8a']].map(([x, y, c]) => flower(x, y, c)).join('')}
  ${person(250, 240, 1.2, '#4a3a5a', { long: true, hair: '#c9c2b2' })}${person(400, 240, 1.2, '#e07a6a', { long: true, hair: '#6a2a14', wreath: '#5fa04a' })}
  <g transform="translate(320 120)"><circle r="30" fill="#c0392b"/><path d="M-8 -28l8 -12l8 12z" fill="#8a2a1e"/><path d="M-18 4a18 14 0 0 0 36 0z" fill="#f4e0d0"/>${[-10, -4, 2, 8, -6, 4].map((x, i) => `<circle cx="${x}" cy="${6 + (i > 3 ? 6 : 0)}" r="2.6" fill="#e0304a"/>`).join('')}</g>`;
}

// Мидас: всё золотое — дерево, кубок и дочь-статуя
function midas() {
  return `<defs>${grad('mMi', [[0, '#5a3a6a'], [1, '#a86a5a']])}<linearGradient id="mMg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff2a0"/><stop offset=".5" stop-color="#e0b020"/><stop offset="1" stop-color="#a87810"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#mMi)"/>${[110, 530].map(x => column(x, 236, 180, 24, '#6a4a7a')).join('')}
  <rect x="0" y="236" width="${W}" height="44" fill="#4a2e4a"/>
  ${olive(190, 236, 1.2, 'url(#mMg)')}
  ${person(330, 236, 1.5, '#7a2a3a', { beard: '#6a4a2a', wreath: '#e0b020', arm: 'M8 -44q20 -4 30 -14' })}<path d="M300 150l4 -14l6 8l6 -10l6 10l6 -8l4 14z" fill="#e0b020"/>
  ${person(450, 236, 1.2, 'url(#mMg)', { long: true, hair: '#c99a1a', skin: '#f0c84a' })}
  <g transform="translate(380 190)"><path d="M-10 0h20l-4 -18h-12z" fill="url(#mMg)"/><rect x="-2" y="0" width="4" height="10" fill="#e0b020"/></g>
  ${[[420, 120], [480, 150], [260, 100], [560, 90]].map(([x, y]) => `<path d="M${x} ${y - 6}v12M${x - 6} ${y}h12" stroke="#ffe27a" stroke-width="2"/>`).join('')}`;
}

// Циклоп: пещера, великан с одним глазом и овцы у входа
function kyklopas() {
  return `<defs>${grad('mK', [[0, '#3a2e2a'], [1, '#6a5446']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#mK)"/>
  <path d="M0 0h${W}v60q-80 -30 -160 10q-60 -40 -140 0q-80 -30 -170 10q-90 -40 -170 0z" fill="#2a201c"/>
  <path d="M470 ${H}V130q50 -60 110 -50q40 10 60 60V${H}z" fill="#9ac0d8" opacity=".55"/><circle cx="560" cy="150" r="40" fill="#7a6a5a"/>
  <rect x="0" y="244" width="${W}" height="36" fill="#4a3a30"/>
  <g transform="translate(260 244)"><path d="M-60 0q4 -100 22 -130h76q18 30 22 130z" fill="#7a5a3a"/><circle cx="0" cy="-152" r="34" fill="#d8b08a"/><path d="M-34 -160q0 -30 34 -30q34 0 34 30q-14 -12 -34 -12q-20 0 -34 12z" fill="#3a2414"/><path d="M-24 -136q24 34 48 0z" fill="#3a2414"/>
  <circle cx="0" cy="-158" r="11" fill="#fff"/><circle cx="2" cy="-158" r="5" fill="#2a1a10"/><path d="M-60 -90q-30 20 -26 60M60 -90q30 20 26 60" stroke="#d8b08a" stroke-width="14" stroke-linecap="round" fill="none"/></g>
  ${sheep(430, 248, 1.1)}${sheep(500, 252, 1)}${sheep(380, 256, .9)}
  ${person(110, 250, 1.1, '#3f6a8a', { beard: '#2a1a10', arm: 'M8 -44q16 -10 26 -26' })}<path d="M134 196l26 -22" stroke="#8a5a2a" stroke-width="6"/>`;
}

// Пандора: открытая шкатулка, тёмные беды улетают, внутри светится надежда
function pandora() {
  return `<defs>${grad('mPa', [[0, '#3a2a4a'], [1, '#8a5a6a']])}<radialGradient id="mPh"><stop offset="0" stop-color="#fff6c0"/><stop offset="1" stop-color="#ffd76a" stop-opacity="0"/></radialGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#mPa)"/>
  <rect x="0" y="232" width="${W}" height="48" fill="#4a2e3e"/>
  ${[[360, 120, 1], [420, 70, -1], [480, 110, 1], [300, 60, -1], [540, 50, 1]].map(([x, y, f]) => `<path d="M${x} ${y + 60}q${-30 * f} -30 0 -60q${20 * f} -20 ${10 * f} -40" stroke="#1a1020" stroke-width="10" stroke-linecap="round" fill="none" opacity=".75"/><circle cx="${x + 10 * f}" cy="${y - 40}" r="7" fill="#1a1020" opacity=".8"/>`).join('')}
  <g transform="translate(330 232)"><rect x="-50" y="-44" width="100" height="44" fill="#a8743a"/><path d="M-50 -44h100" stroke="#e0b060" stroke-width="3"/><path d="M-50 -22h100" stroke="#e0b060" stroke-width="2" stroke-dasharray="6 4"/>
  <path d="M-52 -46l96 -40l6 8l-96 40z" fill="#c08a4a"/><circle cx="0" cy="-58" r="40" fill="url(#mPh)"/><circle cx="0" cy="-50" r="6" fill="#fff6c0"/></g>
  ${person(200, 236, 1.4, '#e07a6a', { long: true, hair: '#2a1a10', arm: 'M8 -44q30 -6 50 -18' })}`;
}

// Тесей: лабиринт, красная нить и корабль с чёрными парусами
function thiseas() {
  return `<defs>${grad('mTh', [[0, '#c9a46a'], [1, '#8a6a42']])}${grad('mThw', [[0, '#3a8ac0'], [1, '#1a4e7a']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#mTh)"/>
  <g stroke="#5a3e22" stroke-width="8" fill="none">${[110, 86, 62, 38].map((r, i) => `<path d="M${200 - r} 140a${r} ${r} 0 1 1 ${r * 2} 0a${r} ${r} 0 1 1 ${-r * 1.4} ${r * .7}" transform="rotate(${i * 60} 200 140)"/>`).join('')}</g>
  <path d="M60 270q40 -40 30 -110q-6 -40 40 -60q60 -20 80 20q16 30 -10 50" stroke="#e02a2a" stroke-width="3" fill="none"/>
  <g transform="translate(200 140)"><path d="M-14 -10q-10 -16 -2 -24M14 -10q10 -16 2 -24" stroke="#f4ead6" stroke-width="4" fill="none"/><circle r="12" fill="#3a2414"/></g>
  <rect x="380" y="150" width="260" height="130" fill="url(#mThw)"/>${waves(176, 4).replace(/M(\d+)/g, (m, x) => `M${+x + 380}`)}
  ${ship(510, 200, 1, '#1a1a1a', '#5a3a22', 6)}<path d="M380 150q100 -16 260 -6" stroke="#a8c8de" stroke-width="2" fill="none"/>
  ${person(330, 270, 1.1, '#3f6a8a', { long: true, hair: '#c98a3a', arm: 'M-8 -44q-30 -10 -40 -40' })}`;
}

// Нарцисс: юноша склонился над озером, в воде отражение, вокруг нарциссы
function narkissos() {
  return `<defs>${grad('mN', [[0, '#a8d8b8'], [1, '#eef6e0']])}${grad('mNw', [[0, '#5aa0c8'], [1, '#2f6f9a']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#mN)"/>${sun(560, 50, 18)}
  ${[60, 120, 520, 600].map(x => `<path d="M${x} 170v-70" stroke="#5a4a3a" stroke-width="6"/><ellipse cx="${x}" cy="96" rx="34" ry="44" fill="#5f9a4a"/>`).join('')}
  <path d="M0 160h${W}V${H}H0z" fill="#7fb85a"/>
  <ellipse cx="330" cy="222" rx="200" ry="44" fill="url(#mNw)"/>
  <g transform="translate(300 190) rotate(40)">${person(0, 0, 1.2, '#f4ead6', { hair: '#c98a3a' })}</g>
  <g opacity=".5"><circle cx="352" cy="232" r="11" fill="#e8c09a"/><path d="M341 233q0 13 11 13q11 0 11 -12q-6 6 -11 5q-6 0 -11 -6z" fill="#c98a3a"/></g>
  ${[[120, 230], [150, 246], [530, 236], [560, 252], [500, 262], [180, 264]].map(([x, y]) => flower(x, y)).join('')}
  <path d="M30 120q20 -10 40 0M50 110q20 -10 40 0" stroke="#fff" stroke-width="1.5" fill="none" opacity=".6"/>`;
}

// Геракл в львиной шкуре с палицей и многоголовая гидра
function iraklis() {
  return `<defs>${grad('mH', [[0, '#7a8a5a'], [1, '#d8c89a']])}</defs>
  <rect width="${W}" height="${H}" fill="url(#mH)"/>${cloud(500, 50, .8, '#fff', .6)}
  <path d="M0 ${H}V230q200 -24 400 -6t240 -10V${H}z" fill="#5a6a3a"/><ellipse cx="470" cy="250" rx="140" ry="24" fill="#4a6a5a"/>
  ${[[-50, -60], [-24, -84], [0, -96], [24, -84], [50, -60], [-36, -110], [36, -110]].map(([dx, dy], i) => `<path d="M470 240q${dx * .3} ${dy * .4} ${dx} ${dy}" stroke="#3f7a4a" stroke-width="12" fill="none" stroke-linecap="round"/><circle cx="${470 + dx}" cy="${240 + dy}" r="11" fill="#3f7a4a"/><circle cx="${474 + dx}" cy="${237 + dy}" r="2" fill="#ffd76a"/><path d="M${480 + dx} ${240 + dy}l8 2" stroke="#c0392b" stroke-width="2"/>`).join('')}
  ${person(220, 240, 1.7, '#a87a3a', { beard: '#3a2414', arm: 'M8 -44q20 -14 26 -40', extra: '<path d="M-14 -76q0 -20 14 -22q16 0 16 22q-4 -4 -16 -6q-10 2 -14 6z" fill="#d8a85a"/><path d="M-16 -52q-8 20 -4 50" stroke="#d8a85a" stroke-width="7" fill="none"/><path d="M34 -84l14 -34" stroke="#6a4424" stroke-width="10" stroke-linecap="round"/>' })}`;
}

// Орфей с лирой поднимается к свету, позади тень Эвридики
function orfeas() {
  return `<defs>${grad('mO', [[0, '#0e0e1e'], [1, '#2e2440']])}<radialGradient id="mOl" cx=".85" cy=".2" r=".6"><stop offset="0" stop-color="#ffe7a0" stop-opacity=".9"/><stop offset="1" stop-color="#ffe7a0" stop-opacity="0"/></radialGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#mO)"/><rect width="${W}" height="${H}" fill="url(#mOl)"/>
  <path d="M0 ${H}L0 250L${W} 70V${H}z" fill="#1e1828"/><path d="M0 250L${W} 70" stroke="#3a3048" stroke-width="3"/>
  <g transform="translate(400 170)">${person(0, 0, 1.3, '#c0392b', { wreath: '#7f9a5a', arm: 'M8 -44q14 -2 20 -14', extra: '<g transform="translate(30 -66)"><path d="M-10 20q-8 -26 4 -34M10 20q8 -26 -4 -34M-8 -10h16M-8 20h16" stroke="#e0b020" stroke-width="3" fill="none"/>' + [-4, 0, 4].map(x => `<path d="M${x} -10v30" stroke="#fff" stroke-width="1"/>`).join('') + '</g>' })}</g>
  <g transform="translate(250 212)" opacity=".4">${person(0, 0, 1.25, '#c8d0e8', { long: true, hair: '#c8d0e8', skin: '#c8d0e8' })}</g>
  ${[[460, 110], [490, 90], [520, 120]].map(([x, y]) => `<path d="M${x} ${y}q6 -8 0 -14" stroke="#ffe7a0" stroke-width="2" fill="none" opacity=".7"/>`).join('')}${stars(14, 9, 120)}`;
}

export const EL_MYTHS_ART = {
  'myth-el-theoi': { draw: theoi, label: 'Гора Олимп в облаках, храм на вершине и молнии Зевса' },
  'myth-el-arachni': { draw: arachni, label: 'Ткацкий станок с узором, ткачиха и паук в паутине' },
  'myth-el-prometheas': { draw: prometheas, label: 'Ночью Прометей несёт людям огонь в стебле тростника' },
  'myth-el-athina': { draw: athina, label: 'Скала Акрополя, олива Афины и трезубец Посейдона с солёным источником' },
  'myth-el-sisyfos': { draw: sisyfos, label: 'Сизиф толкает огромный камень вверх по склону' },
  'myth-el-axilleas': { draw: axilleas, label: 'Ахилл в шлеме со щитом, стрела летит ему в пятку' },
  'myth-el-evropi': { draw: evropi, label: 'Европа на белом быке плывёт по морю' },
  'myth-el-milo': { draw: milo, label: 'Золотое яблоко на столе и три богини' },
  'myth-el-dourios': { draw: dourios, label: 'Деревянный конь на колёсах у стен Трои' },
  'myth-el-perseas': { draw: perseas, label: 'Персей в крылатых сандалиях со щитом и мечом, рядом Пегас' },
  'myth-el-iasonas': { draw: iasonas, label: 'Корабль «Арго» с вёслами, золотое руно на дереве и дракон' },
  'myth-el-sfigga': { draw: sfigga, label: 'Сфинкс на скале и путник с посохом' },
  'myth-el-ikaros': { draw: ikaros, label: 'Дедал и Икар на крыльях над морем, перья падают у солнца' },
  'myth-el-persefoni': { draw: persefoni, label: 'Зима и весна, Деметра и Персефона, между ними гранат' },
  'myth-el-midas': { draw: midas, label: 'Царь Мидас, золотое дерево, кубок и дочь, ставшая золотой статуей' },
  'myth-el-kyklopas': { draw: kyklopas, label: 'Одноглазый циклоп в пещере, овцы и Одиссей с колом' },
  'myth-el-pandora': { draw: pandora, label: 'Пандора открывает шкатулку, беды улетают, внутри светится надежда' },
  'myth-el-thiseas': { draw: thiseas, label: 'Лабиринт с красной нитью Ариадны и корабль с чёрными парусами' },
  'myth-el-narkissos': { draw: narkissos, label: 'Нарцисс склонился над озером, вокруг цветут нарциссы' },
  'myth-el-iraklis': { draw: iraklis, label: 'Геракл в львиной шкуре с палицей и многоголовая гидра' },
  'myth-el-orfeas': { draw: orfeas, label: 'Орфей с лирой поднимается к свету, позади тень Эвридики' }
};
