// Озвучка через встроенный в браузер синтез речи (Web Speech API) — без аудиофайлов.
// Голос выбирается под изучаемый язык: английский (en-GB / en-US) или турецкий (tr-TR).
// У карачаево-балкарского голоса в браузерах нет (tts: null) — озвучка для него отключена,
// а тренировки на слух показывают задание текстом.
import { L } from './lang.js';

const voices = {};
function pickVoices() {
  const list = window.speechSynthesis?.getVoices?.() || [];
  voices.en = list.find(v => /en[-_]GB/i.test(v.lang) && /google|natural|daniel|serena/i.test(v.name))
    || list.find(v => /en[-_](US|GB)/i.test(v.lang)) || list.find(v => /^en/i.test(v.lang)) || null;
  voices.tr = list.find(v => /tr[-_]TR/i.test(v.lang) && /google|natural|yelda|emel|ahmet/i.test(v.name))
    || list.find(v => /^tr/i.test(v.lang)) || null;
}
if ('speechSynthesis' in window) { pickVoices(); speechSynthesis.onvoiceschanged = pickVoices; }

export const canSpeak = () => 'speechSynthesis' in window && !!L().tts;
// Есть ли в системе голос для текущего языка (без него браузер может читать чужим акцентом)
export const hasVoice = () => !canSpeak() || !!voices[L().id] || !(speechSynthesis.getVoices?.() || []).length;

export function speak(text, rate = 0.9) {
  if (!canSpeak() || !text) return false;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const voice = voices[L().id];
    u.lang = voice?.lang || L().tts; if (voice) u.voice = voice;
    u.rate = rate;
    speechSynthesis.speak(u);
    return true;
  } catch { return false; }
}
