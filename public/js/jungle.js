// Джунгли: оригинальные SVG-лианы и папоротники для оформления (рисуются кодом, без картинок).

// Детерминированный псевдослучайный генератор — чтобы узор не «прыгал» между перерисовками.
function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}
const f = n => n.toFixed(1);

// Лист на конце черешка: заострённый овал, повёрнутый на angle градусов.
function leaf(x, y, angle, size, fill, vein) {
  const w = size * 0.42;
  return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(angle)})">
    <path d="M0 0C${f(w)} ${f(-size * 0.25)} ${f(w)} ${f(-size * 0.8)} 0 ${f(-size)}C${f(-w)} ${f(-size * 0.8)} ${f(-w)} ${f(-size * 0.25)} 0 0Z" fill="${fill}"/>
    <path d="M0 -2V${f(-size * 0.85)}" stroke="${vein}" stroke-width="1" fill="none" opacity=".55"/>
  </g>`;
}

// Одна лиана длиной len px: волнистый стебель, листья, иногда золотой цветок на конце.
function vine(len, seed) {
  const r = rng(seed);
  const amp = 6 + r() * 6, waves = 2 + r() * 2, pts = [];
  for (let y = 0; y <= len; y += 8) pts.push([20 + Math.sin((y / len) * Math.PI * waves + seed) * amp * (y / len), y]);
  const d = 'M' + pts.map(([x, y]) => `${f(x)} ${f(y)}`).join('L');
  const greens = ['#2f9a4c', '#3aa856', '#237a3b', '#4cb562', '#6f9a2e'];
  let leaves = '';
  for (let i = 3; i < pts.length - 1; i += 2 + Math.floor(r() * 2)) {
    const [x, y] = pts[i], side = i % 2 ? 1 : -1;
    leaves += leaf(x, y, side * (55 + r() * 40) + 180, 14 + r() * 10 + (y / len) * 6, greens[Math.floor(r() * greens.length)], '#0f3d1e');
  }
  const [ex, ey] = pts[pts.length - 1];
  const tip = r() > 0.45
    ? `<g transform="translate(${f(ex)} ${f(ey + 6)})">${[0, 72, 144, 216, 288].map(a => `<ellipse rx="3.4" ry="6" cy="-5" fill="#f0b52a" transform="rotate(${a})"/>`).join('')}<circle r="3" fill="#c97a0a"/></g>`
    : leaf(ex, ey, 180, 24, '#2f9a4c', '#0f3d1e');
  return `<svg width="40" height="${len + 20}" viewBox="0 0 40 ${len + 20}" aria-hidden="true" focusable="false">
    <path d="${d}" stroke="#4a3a1a" stroke-width="3.2" fill="none" stroke-linecap="round"/>
    <path d="${d}" stroke="#6f5a28" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".7"/>
    ${leaves}${tip}</svg>`;
}

// Ряд качающихся лиан, свисающих сверху. Каждая качается со своим периодом и задержкой.
export function lianas(count = 9, seed = 7) {
  const r = rng(seed);
  return `<div class="lianas" aria-hidden="true">${Array.from({ length: count }, (_, i) => {
    const left = (i + 0.3 + r() * 0.4) / count * 100;
    const len = Math.round(110 + r() * 170 + (i % 3 === 1 ? 60 : 0));
    const dur = (3.4 + r() * 2.6).toFixed(2), delay = (-r() * 4).toFixed(2), amp = ['', ' s2', ' s3'][i % 3];
    return `<span class="vine${amp}" style="left:${left.toFixed(1)}%;--dur:${dur}s;--delay:${delay}s">${vine(len, seed * 31 + i * 17)}</span>`;
  }).join('')}</div>`;
}

// Лист папоротника: изогнутый стебель с перышками, уменьшающимися к кончику.
export function fern(size = 160, seed = 3, color = '#2f9a4c', flip = false) {
  const r = rng(seed), n = 14, bend = 0.5 + r() * 0.4;
  let d = '', pinnae = '';
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, a = -Math.PI / 2 + t * bend * (flip ? -1 : 1);
    const prev = pts[i - 1] || [size / 2, size];
    pts.push([prev[0] + Math.cos(a) * size / n * 0.95, prev[1] + Math.sin(a) * size / n * 0.95]);
  }
  d = 'M' + pts.map(([x, y]) => `${f(x)} ${f(y)}`).join('L');
  for (let i = 1; i < n; i++) {
    const [x, y] = pts[i], [nx, ny] = pts[i + 1];
    const dir = Math.atan2(ny - y, nx - x) * 180 / Math.PI;
    const len = (1 - i / n) * size * 0.32 + 6;
    for (const side of [-1, 1]) {
      pinnae += `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(dir + side * 62)})"><path d="M0 0Q${f(len * 0.5)} ${f(-len * 0.16)} ${f(len)} 0Q${f(len * 0.5)} ${f(len * 0.16)} 0 0Z" fill="${color}"/></g>`;
    }
  }
  return `<svg class="fern" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true" focusable="false">${pinnae}<path d="${d}" stroke="${color}" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>`;
}

// Куст из нескольких листьев папоротника — для углов героя и подвала.
export function fernBush(size = 180, seed = 5, side = 'left', palette = ['#1f6e35', '#2f9a4c', '#4cb562']) {
  return `<div class="fern-bush ${side}" aria-hidden="true">
    <span style="transform:rotate(-38deg)">${fern(size, seed, palette[0])}</span>
    <span style="transform:rotate(-12deg)">${fern(size * 1.1, seed + 1, palette[1])}</span>
    <span style="transform:rotate(16deg)">${fern(size, seed + 2, palette[2], true)}</span>
    <span style="transform:rotate(40deg)">${fern(size * 0.85, seed + 3, palette[0], true)}</span>
  </div>`;
}

// Подлесок: ряд крупных папоротников вдоль низа страницы, разной высоты и оттенков.
export function fernRow(count = 9, seed = 41) {
  const r = rng(seed);
  const palettes = [['#1f6e35', '#2f9a4c', '#4cb562'], ['#175a2b', '#237a3b', '#3aa856'], ['#2b7d3a', '#6f9a2e', '#4cb562']];
  return `<div class="fern-row" aria-hidden="true">${Array.from({ length: count }, (_, i) => {
    const size = Math.round(190 + r() * 120), left = (i + 0.5) / count * 100 + (r() - 0.5) * 6;
    const flip = r() > 0.5 ? ' flip' : '';
    return `<span class="fr${flip}" style="left:${left.toFixed(1)}%;--d:${(-r() * 6).toFixed(2)}s;z-index:${1 + (i % 3)}">${fernBush(size, seed + i * 7, 'row', palettes[i % 3])}</span>`;
  }).join('')}</div>`;
}
