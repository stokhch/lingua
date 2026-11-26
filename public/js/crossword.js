// Генератор кроссворда: раскладывает слова на сетке так, чтобы они пересекались по общим буквам.
export function buildCrossword(words, max = 8) {
  const N = 25, grid = Array.from({ length: N }, () => Array(N).fill(null));
  const placed = [];
  const get = (r, c) => (r < 0 || c < 0 || r >= N || c >= N ? null : grid[r][c]);
  const fits = (w, r, c, dir) => {
    const dr = dir === 'down' ? 1 : 0, dc = dir === 'down' ? 0 : 1;
    if (r < 0 || c < 0 || r + dr * (w.length - 1) >= N || c + dc * (w.length - 1) >= N) return -1;
    if (get(r - dr, c - dc) || get(r + dr * w.length, c + dc * w.length)) return -1;
    let cross = 0;
    for (let i = 0; i < w.length; i++) {
      const rr = r + dr * i, cc = c + dc * i, cell = grid[rr][cc];
      if (cell) { if (cell !== w[i]) return -1; cross++; }
      else if (get(rr + dc, cc + dr) || get(rr - dc, cc - dr)) return -1; // соседи сбоку
    }
    return cross;
  };
  const put = (item, r, c, dir) => {
    const dr = dir === 'down' ? 1 : 0, dc = dir === 'down' ? 0 : 1;
    for (let i = 0; i < item.w.length; i++) grid[r + dr * i][c + dc * i] = item.w[i];
    placed.push({ ...item, r, c, dir });
  };
  const list = [...words].sort((a, b) => b.w.length - a.w.length);
  if (!list.length) return null;
  put(list[0], Math.floor(N / 2), Math.floor((N - list[0].w.length) / 2), 'across');
  for (const item of list.slice(1)) {
    if (placed.length >= max) break;
    let best = null;
    for (const p of placed) for (let i = 0; i < p.w.length; i++) for (let j = 0; j < item.w.length; j++) {
      if (p.w[i] !== item.w[j]) continue;
      const dir = p.dir === 'across' ? 'down' : 'across';
      const r = p.dir === 'across' ? p.r - j : p.r + i, c = p.dir === 'across' ? p.c + i : p.c - j;
      const x = fits(item.w, r, c, dir);
      if (x > 0 && (!best || x > best.x)) best = { r, c, dir, x };
    }
    if (best) put(item, best.r, best.c, best.dir);
  }
  const rs = placed.flatMap(p => [p.r, p.dir === 'down' ? p.r + p.w.length - 1 : p.r]);
  const cs = placed.flatMap(p => [p.c, p.dir === 'across' ? p.c + p.w.length - 1 : p.c]);
  const r0 = Math.min(...rs), c0 = Math.min(...cs);
  const out = placed.map(p => ({ ...p, r: p.r - r0, c: p.c - c0 }))
    .sort((a, b) => a.r - b.r || a.c - b.c);
  let num = 0; const starts = {};
  for (const p of out) { const k = p.r + ':' + p.c; p.n = starts[k] ||= ++num; }
  return { rows: Math.max(...rs) - r0 + 1, cols: Math.max(...cs) - c0 + 1, words: out };
}

