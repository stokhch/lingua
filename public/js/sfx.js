// Звуки успеха: короткие фанфары, синтезированные в Web Audio (без файлов и чужих сэмплов).
// done — задание выполнено, big — дневная цель или новый уровень, chime — маленький шаг.
// Выключаются в профиле: store.state.mute = true.
import { store } from './store.js';

const RANK = { chime: 1, done: 2, big: 3 };
let ctx = null, pending = null, timer = null;

export const soundOn = () => !store.state?.mute;

function audio() {
  if (ctx) return ctx;
  const AC = globalThis.AudioContext || globalThis.webkitAudioContext;
  if (!AC) return null;
  try { ctx = new AC(); } catch { ctx = null; }
  return ctx;
}

// Браузеры разрешают звук только после жеста: будим контекст при первом касании/нажатии,
// чтобы фанфары играли и когда задание завершается по таймеру (спринт, водопад).
export function initSfx() {
  if (typeof document === 'undefined') return;
  const wake = () => {
    if (!soundOn()) return;
    const a = audio();
    if (a?.state === 'suspended') a.resume().catch(() => {});
  };
  for (const ev of ['pointerdown', 'keydown', 'touchend']) document.addEventListener(ev, wake, { passive: true, capture: true });
}

// Несколько событий подряд (слово в кроссворде + кроссворд разгадан + новый уровень)
// сливаются в одни фанфары — играет самая торжественная.
export function fanfare(kind = 'done') {
  if (!RANK[kind] || !soundOn() || typeof document === 'undefined') return;
  if (!pending || RANK[kind] > RANK[pending]) pending = kind;
  clearTimeout(timer);
  timer = setTimeout(() => { const k = pending; pending = null; play(k); }, 80);
}

const hz = n => 440 * 2 ** ((n - 69) / 12); // MIDI-нота → частота

function note(a, out, { n, t, d, type = 'triangle', vol = 0.5, detune = 0 }) {
  const o = a.createOscillator(), g = a.createGain();
  o.type = type; o.frequency.value = hz(n); o.detune.value = detune;
  const t0 = a.currentTime + t;
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.015);
  g.gain.exponentialRampToValueAtTime(vol * 0.6, t0 + Math.min(0.12, d * 0.4));
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
  o.connect(g).connect(out);
  o.start(t0); o.stop(t0 + d + 0.05);
}

// «Медь»: треугольник + тихий квадрат чуть в расстройке — ярко, но не резко
const brass = (a, out, n, t, d, vol = 0.32) => {
  note(a, out, { n, t, d, vol });
  note(a, out, { n, t, d, vol: vol * 0.22, type: 'square', detune: 6 });
};
const bell = (a, out, n, t, d = 0.5, vol = 0.12) => note(a, out, { n, t, d, vol, type: 'sine' });

// a — любой AudioContext (в т. ч. OfflineAudioContext для записи образца)
export function play(kind, a = audio()) {
  if (!a) return;
  if (a.state === 'suspended') a.resume?.().catch(() => {});
  const out = a.createGain();
  out.gain.value = 0.55;
  const comp = a.createDynamicsCompressor();
  out.connect(comp).connect(a.destination);

  if (kind === 'chime') { // два колокольчика вверх
    bell(a, out, 84, 0, 0.35, 0.16); bell(a, out, 91, 0.08, 0.5, 0.14);
    return;
  }
  if (kind === 'done') { // соль-до-ми-соль → аккорд до мажор
    [[67, 0], [72, 0.09], [76, 0.18]].forEach(([n, t]) => brass(a, out, n, t, 0.16));
    [72, 76, 79].forEach(n => brass(a, out, n, 0.28, 0.75, 0.2));
    brass(a, out, 48, 0.28, 0.7, 0.18);
    bell(a, out, 96, 0.3, 0.6); bell(a, out, 91, 0.42, 0.5, 0.08);
    return;
  }
  // big: восходящий ход, «та-та-там» и широкий аккорд с искрами
  [[60, 0], [64, 0.1], [67, 0.2], [72, 0.3]].forEach(([n, t]) => brass(a, out, n, t, 0.15));
  brass(a, out, 72, 0.45, 0.12); brass(a, out, 72, 0.58, 0.12);
  [72, 76, 79, 84].forEach(n => brass(a, out, n, 0.72, 1.2, 0.18));
  brass(a, out, 48, 0.72, 1.1, 0.2); brass(a, out, 55, 0.72, 1.1, 0.12);
  [96, 100, 103, 108].forEach((n, i) => bell(a, out, n, 0.76 + i * 0.07, 0.6, 0.07));
}

// Песенка ёжика Пима — своя мелодия (≈3 с), до мажор, бодрый шаг 150 ударов в минуту.
// Голос — треугольник с вибрато через мягкий фильтр, внизу — щипковый бас.
// Возвращает длительность в секундах; при выключенном звуке молчит и возвращает её же,
// чтобы анимация «пения» шла одинаково.
const E = 0.2; // восьмая
export const SONG = [ // [MIDI-нота, длительность в восьмых]
  [67, 1], [72, 1], [76, 2], [74, 1], [72, 1], [76, 2],
  [79, 1], [77, 1], [76, 1], [74, 1], [72, 2], [74, 1], [71, 1],
  [72, 4]
];
const BASS = [[48, 0], [55, 2], [48, 4], [55, 6], [53, 8], [57, 10], [55, 12], [43, 14], [48, 16]];
export const songLength = () => SONG.reduce((t, [, d]) => t + d * E, 0) + 0.3;

function voice(a, out, n, t, d) {
  const o = a.createOscillator(), g = a.createGain(), f = a.createBiquadFilter();
  const lfo = a.createOscillator(), depth = a.createGain();
  o.type = 'triangle'; o.frequency.value = hz(n);
  f.type = 'lowpass'; f.frequency.value = 2400; f.Q.value = 2;
  lfo.frequency.value = 5.5; depth.gain.value = d > 0.3 ? 14 : 5; // вибрато в центах, на долгих нотах сильнее
  lfo.connect(depth).connect(o.detune);
  const t0 = a.currentTime + t, end = t0 + d * 0.92;
  o.frequency.setValueAtTime(hz(n) * 0.97, t0); // лёгкий «подъезд» к ноте, как у голоса
  o.frequency.exponentialRampToValueAtTime(hz(n), t0 + 0.04);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(0.36, t0 + 0.02);
  g.gain.exponentialRampToValueAtTime(0.24, t0 + Math.min(0.1, d * 0.5));
  g.gain.setValueAtTime(0.24, Math.max(t0 + 0.1, end - 0.06));
  g.gain.exponentialRampToValueAtTime(0.0001, end);
  o.connect(f).connect(g).connect(out);
  o.start(t0); lfo.start(t0); o.stop(end + 0.05); lfo.stop(end + 0.05);
}

export function sing(a) {
  const len = songLength();
  if (!soundOn() || typeof document === 'undefined') return len;
  a = a || audio();
  if (!a) return len;
  if (a.state === 'suspended') a.resume?.().catch(() => {});
  const out = a.createGain();
  out.gain.value = 0.5;
  const comp = a.createDynamicsCompressor();
  out.connect(comp).connect(a.destination);
  let t = 0;
  for (const [n, d] of SONG) { voice(a, out, n, t, d * E); t += d * E; }
  for (const [n, at] of BASS) note(a, out, { n, t: at * E, d: at === 16 ? 0.8 : 0.3, vol: 0.22 });
  bell(a, out, 96, t - 0.7, 0.6, 0.06); bell(a, out, 100, t - 0.6, 0.6, 0.05);
  return len;
}
