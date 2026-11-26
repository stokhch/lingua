// Озвучка через встроенный в браузер синтез речи (Web Speech API) — без аудиофайлов.
// Голос выбирается под изучаемый язык: английский (en-GB / en-US), турецкий (tr-TR) или греческий (el-GR).
// У карачаево-балкарского своего голоса нет: текст переводится в казахскую кириллицу (lang.ttsText)
// и читается казахским голосом (lang.voice = 'kk'); если казахского нет ни в системе, ни онлайн —
// турецким (lang.ttsFallback).
// Если голоса нужного языка в системе нет (частый случай: греческий или турецкий в Chrome на Windows/macOS),
// браузер читает текст голосом по умолчанию — то есть с английским произношением. Тогда звук берём
// с сервера (/api/tts, mp3 на нужном языке), а встроенный синтез остаётся запасным вариантом.
import { L } from './lang.js';
import { ttsChunks } from './tts-chunks.js';

const voices = {};
function pickVoices() {
  const list = window.speechSynthesis?.getVoices?.() || [];
  voices.en = list.find(v => /en[-_]GB/i.test(v.lang) && /google|natural|daniel|serena/i.test(v.name))
    || list.find(v => /en[-_](US|GB)/i.test(v.lang)) || list.find(v => /^en/i.test(v.lang)) || null;
  voices.tr = list.find(v => /tr[-_]TR/i.test(v.lang) && /google|natural|yelda|emel|ahmet/i.test(v.name))
    || list.find(v => /^tr/i.test(v.lang)) || null;
  voices.el = list.find(v => /el[-_]GR/i.test(v.lang) && /google|natural|melina|nikos|athina/i.test(v.name))
    || list.find(v => /^el/i.test(v.lang)) || null;
  voices.kk = list.find(v => /^kk/i.test(v.lang)) || null;
}
if ('speechSynthesis' in window) { pickVoices(); speechSynthesis.onvoiceschanged = pickVoices; }

export const canSpeak = () => 'speechSynthesis' in window && !!L().tts;
// Есть ли в системе голос для текущего языка (без него браузер может читать чужим акцентом)
export const hasVoice = () => !canSpeak() || variants(L()).some(v => voices[v.id]) || !(speechSynthesis.getVoices?.() || []).length;

let audio = null, playId = 0, fails = 0; // после 3 неудач подряд онлайн-озвучку больше не пробуем (например, статичная версия сайта)
const noOnline = new Set(); // голоса, которых нет у онлайн-озвучки (например, kk) — сразу берём запасной

// Варианты озвучки языка по порядку: основной и запасной (у карачаево-балкарского — казахский, затем турецкий)
const variants = lang => [lang, lang.ttsFallback].filter(Boolean)
  .map(v => ({ id: v.voice || lang.id, tts: v.tts, text: v.ttsText || (t => t) }));
function stopAll() {
  playId++;
  if (audio) { try { audio.pause(); } catch {} audio = null; }
  try { speechSynthesis.cancel(); } catch {}
}

function speakBrowser(text, rate, lang, voice) {
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = voice?.lang || lang; if (voice) u.voice = voice;
    u.rate = rate;
    speechSynthesis.speak(u);
    return true;
  } catch { return false; }
}

// Проигрывает куски mp3 по очереди; если первый кусок не загрузился — следующий вариант озвучки,
// при ошибке посередине или когда вариантов не осталось — встроенный синтез с оставшимся текстом
function speakOnline(raw, rate, vars) {
  const v = vars[0], text = v.text(raw), parts = ttsChunks(text), id = ++playId;
  const next = i => {
    if (id !== playId || i >= parts.length) return;
    const a = audio = new Audio(`api/tts?lang=${v.id}&q=${encodeURIComponent(parts[i])}`);
    a.playbackRate = Math.min(2, Math.max(0.5, rate / 0.9)); // 0.9 — обычная скорость в настройках
    a.onended = () => { fails = 0; next(i + 1); };
    const fail = () => {
      if (id !== playId) return;
      audio = null;
      if (a.error && i === 0 && vars.length > 1) { noOnline.add(v.id); return speakFrom(raw, rate, vars.slice(1)); }
      if (a.error) fails++;
      speakBrowser(parts.slice(i).join(' '), rate, v.tts, null);
    };
    a.onerror = fail;
    a.play()?.catch?.(e => { if (e?.name !== 'AbortError') fail(); });
  };
  next(0);
  return true;
}

// По порядку вариантов: голос в системе, затем онлайн-озвучка; если ничего нет — встроенный синтез последнего варианта
function speakFrom(text, rate, vars) {
  for (let k = 0; k < vars.length; k++) {
    const v = vars[k];
    if (voices[v.id]) return speakBrowser(v.text(text), rate, v.tts, voices[v.id]);
    if (fails < 3 && !noOnline.has(v.id) && typeof Audio !== 'undefined') return speakOnline(text, rate, vars.slice(k));
  }
  const last = vars[vars.length - 1];
  return speakBrowser(last.text(text), rate, last.tts, null);
}

export function speak(text, rate = 0.9) {
  if (!canSpeak() || !text) return false;
  try {
    stopAll();
    return speakFrom(text, rate, variants(L()));
  } catch { return false; }
}
