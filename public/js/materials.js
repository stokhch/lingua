// Свои материалы ученика: разбор субтитров, ссылки на видео, оценка уровня текста, статистика слов.
// Модуль без DOM и без store — проверяется в tests/materials.test.js.

export const KINDS = {
  text: 'Текст', dialog: 'Диалог', song: 'Песня', poem: 'Стихи', subs: 'Субтитры', video: 'Видео'
};

// Полки библиотеки. У текста можно явно указать shelf; иначе полка выводится из topic и kind (см. shelfOf).
export const SHELVES = [
  { id: 'reading', title: 'Тексты для чтения', desc: 'Короткие рассказы о жизни, работе, путешествиях — основа чтения по уровням', icon: 'read' },
  { id: 'dialogs', title: 'Диалоги', desc: 'Живые разговоры: в магазине, в дороге, в гостях', icon: 'quote' },
  { id: 'phrasebook', title: 'Разговорник', desc: 'Готовые фразы по ситуациям — от знакомства до врача', icon: 'dict' },
  { id: 'tales', title: 'Сказки и истории', desc: 'Народные сказки и легенды', icon: 'star' },
  { id: 'wisdom', title: 'Народная мудрость', desc: 'Пословицы, загадки, благопожелания', icon: 'brain' },
  { id: 'culture', title: 'Культура и история', desc: 'Традиции, история, края и кухня', icon: 'globe' },
  { id: 'songs', title: 'Песни и стихи', desc: 'Тексты песен и стихотворения', icon: 'sound' },
  { id: 'own', title: 'Мои материалы', desc: 'Ваши тексты, песни, субтитры и видео', icon: 'plus' }
];
const SHELF_BY_TOPIC = {
  'Диалоги': 'dialogs', 'Разговорник': 'phrasebook', 'Сказки': 'tales', 'Легенды': 'tales',
  'Народная мудрость': 'wisdom', 'Пословицы': 'wisdom', 'Культура': 'culture', 'История': 'culture', 'География': 'culture',
  'Песни': 'songs', 'Стихи': 'songs'
};
export function shelfOf(t) {
  if (t.own) return 'own';
  if (t.shelf && SHELVES.some(x => x.id === t.shelf)) return t.shelf;
  if (t.kind === 'song' || t.kind === 'poem') return 'songs';
  return SHELF_BY_TOPIC[t.topic] || 'reading';
}
// Формат: явный kind, а для диалогов и разговорника — «Диалог»
export function formatOf(t) {
  if (t.kind && KINDS[t.kind]) return t.kind;
  const sh = shelfOf(t);
  return sh === 'dialogs' || sh === 'phrasebook' ? 'dialog' : 'text';
}
export const MAX_BODY = 20000;   // символов в одном материале
export const MAX_ITEMS = 40;     // материалов на язык

// Субтитры .srt / .vtt → обычный текст: убираем номера, таймкоды, теги и склеиваем строки реплики.
export function parseSubtitles(src) {
  const s = String(src).replace(/\r/g, '');
  if (!/-->/.test(s)) return s.trim();
  const blocks = s.split(/\n\s*\n/).map(b => b.split('\n')
    .filter(l => l.trim() && !/^\d+$/.test(l.trim()) && !/-->/.test(l) && !/^WEBVTT/i.test(l) && !/^(NOTE|STYLE|REGION)\b/.test(l))
    .map(l => l.replace(/<[^>]+>/g, '').replace(/\{[^}]+\}/g, '').trim())
    .filter(Boolean).join(' ')).filter(Boolean);
  // реплики, которые не заканчиваются точкой, продолжаются в следующей — собираем в абзацы по ~5 реплик
  const paras = []; let cur = [];
  for (const b of blocks) { cur.push(b); if (cur.length >= 5 && /[.!?…]["»”]?$/.test(b)) { paras.push(cur.join(' ')); cur = []; } }
  if (cur.length) paras.push(cur.join(' '));
  return paras.join('\n\n');
}

// Ссылка на YouTube → id ролика (для встроенного плеера). Поддерживаем watch?v=, youtu.be/, shorts/, embed/.
export function youtubeId(url) {
  const m = String(url || '').trim().match(/^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/i);
  return m ? m[1] : null;
}

const tokens = (body, re) => String(body).match(re) || [];

// Оценка уровня по длине предложений, длине слов и доле слов вне базового словаря курса.
// known(token) → true, если слово есть во встроенном словаре. Коэффициенты подобраны по встроенным текстам:
// у турецкого слова длиннее (аффиксы), а предложения короче, поэтому шкала своя.
export function estimateLevel(body, re, known, lang = 'en') {
  const all = tokens(body, re);
  const toks = all.filter(t => !/^[A-ZÇĞİÖŞÜΑ-ΩΆΈΉΊΌΎΏ][a-zçğıöşüα-ωάέήίόύώϊϋΐΰ]+$/.test(t)); // имена собственные не считаем
  if (toks.length < 5) return lang === 'tr' || lang === 'el' ? 'A0' : 'A1';
  const unknown = toks.filter(t => !known(t)).length / toks.length;
  const sentences = String(body).split(lang === 'el' ? /[.!?…;]+\s/ : /[.!?…]+\s/).filter(x => x.trim()).length || 1; // «;» — греческий вопрос
  const sl = all.length / sentences;
  const avg = all.reduce((n, t) => n + t.length, 0) / all.length;
  const long = all.filter(t => t.length >= 8).length / all.length;
  if (lang === 'el') { // греческие слова длиннее английских, шкала подобрана по встроенным текстам
    const sc = sl * 2 + long * 20 + unknown * 40;
    return sc < 12 ? 'A0' : sc < 17.5 ? 'A1' : sc < 21 ? 'A2' : sc < 28 ? 'B1' : sc < 36 ? 'B2' : 'C1';
  }
  if (lang === 'tr') {
    const sc = sl * 2 + long * 20 + unknown * 40;
    return sc < 14 ? 'A0' : sc < 16.5 ? 'A1' : sc < 20 ? 'A2' : sc < 26 ? 'B1' : sc < 34 ? 'B2' : 'C1';
  }
  const sc = sl + (avg - 3.5) * 8 + unknown * 40;
  return sc < 13 ? 'A1' : sc < 20 ? 'A2' : sc < 27 ? 'B1' : sc < 36 ? 'B2' : 'C1';
}

// Сколько разных слов текста ещё нет в личном словаре (lemma — нормализация формы слова).
export function newWordCount(body, re, lemma, has) {
  const seen = new Set();
  for (const t of tokens(body, re)) {
    if (t.length < 2) continue;
    const k = lemma(t);
    if (k && !has(k)) seen.add(k);
  }
  return seen.size;
}

export function wordTotal(body, re) { return tokens(body, re).length; }
