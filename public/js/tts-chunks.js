// Делит текст на куски не длиннее max символов (по предложениям, затем по словам) —
// онлайн-озвучка (/api/tts) принимает короткие фрагменты, а абзац из текста бывает длинным.
export function ttsChunks(text, max = 180) {
  const s = String(text || '').replace(/\s+/g, ' ').trim();
  if (!s) return [];
  const out = [];
  let cur = '';
  const push = piece => {
    if ((cur + ' ' + piece).trim().length <= max) { cur = (cur + ' ' + piece).trim(); return; }
    if (cur) out.push(cur);
    cur = piece;
    while (cur.length > max) { // слишком длинное «предложение» — режем по словам
      let cut = cur.lastIndexOf(' ', max);
      if (cut <= 0) cut = max;
      out.push(cur.slice(0, cut).trim());
      cur = cur.slice(cut).trim();
    }
  };
  for (const sent of s.match(/[^.!?;…]+[.!?;…]*\s*/g) || [s]) push(sent.trim());
  if (cur) out.push(cur);
  return out;
}
