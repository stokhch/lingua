// Озвучка через встроенный в браузер синтез речи (Web Speech API) — без аудиофайлов.
let voice = null;
function pickVoice() {
  const list = window.speechSynthesis?.getVoices?.() || [];
  voice = list.find(v => /en[-_]GB/i.test(v.lang) && /google|natural|daniel|serena/i.test(v.name))
    || list.find(v => /en[-_](US|GB)/i.test(v.lang)) || list.find(v => /^en/i.test(v.lang)) || null;
}
if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }

export const canSpeak = () => 'speechSynthesis' in window;

export function speak(text, rate = 0.9) {
  if (!canSpeak() || !text) return false;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = voice?.lang || 'en-US'; if (voice) u.voice = voice;
    u.rate = rate;
    speechSynthesis.speak(u);
    return true;
  } catch { return false; }
}
