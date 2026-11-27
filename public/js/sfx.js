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
