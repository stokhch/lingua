import test from 'node:test';
import assert from 'node:assert/strict';
import { SHELVES, shelfOf, formatOf } from '../public/js/materials.js';
import { TEXTS as EN } from '../public/js/data/texts.js';
import { TEXTS as TR } from '../public/js/data/tr/texts.js';
import { TEXTS as EL } from '../public/js/data/el/texts.js';
import { TEXTS as KRC } from '../public/js/data/krc/texts.js';
import { TEXTS as DE } from '../public/js/data/de/texts.js';

const ids = new Set(SHELVES.map(s => s.id));

test('Полки: каждый текст попадает на существующую полку', () => {
  for (const t of [...EN, ...TR, ...EL, ...KRC]) {
    assert.ok(ids.has(shelfOf(t)), t.id);
    if (t.shelf) assert.ok(ids.has(t.shelf), `неизвестная полка ${t.shelf} у ${t.id}`);
  }
});

test('Полки: правила по теме, формату и явной полке', () => {
  assert.equal(shelfOf({ topic: 'Диалоги' }), 'dialogs');
  assert.equal(shelfOf({ topic: 'Разговорник' }), 'phrasebook');
  assert.equal(shelfOf({ topic: 'Сказки' }), 'tales');
  assert.equal(shelfOf({ topic: 'История' }), 'culture');
  assert.equal(shelfOf({ topic: 'Еда' }), 'reading');
  assert.equal(shelfOf({ topic: 'Еда', shelf: 'culture' }), 'culture');
  assert.equal(shelfOf({ topic: 'Песни', kind: 'song' }), 'songs');
  assert.equal(shelfOf({ topic: 'Что угодно', own: true }), 'own');
  assert.equal(formatOf({ topic: 'Разговорник' }), 'dialog');
  assert.equal(formatOf({ topic: 'Семья' }), 'text');
  assert.equal(formatOf({ kind: 'song' }), 'song');
});

test('Полки: у карачаево-балкарского материалы разложены по нескольким полкам', () => {
  const used = new Set(KRC.map(shelfOf));
  for (const sh of ['reading', 'dialogs', 'phrasebook', 'tales', 'wisdom', 'culture', 'songs']) assert.ok(used.has(sh), sh);
  // базовые английские тексты — на полке «Тексты для чтения»
  assert.ok(EN.filter(t => !t.id.startsWith('en-l-')).every(t => shelfOf(t) === 'reading'));
});

test('Полки: английская библиотека заполняет все полки, id уникальны', () => {
  const lib = EN.filter(t => t.id.startsWith('en-l-'));
  assert.equal(new Set(EN.map(t => t.id)).size, EN.length);
  const used = new Set(lib.map(shelfOf));
  for (const sh of ['reading', 'dialogs', 'phrasebook', 'tales', 'wisdom', 'culture', 'songs']) assert.ok(used.has(sh), sh);
  for (const t of lib) assert.ok(t.title && t.body && ['A1', 'A2', 'B1', 'B2', 'C1'].includes(t.level), t.id);
});

test('Английская библиотека: популярные сказки и текст о городах, все слова переводятся', async () => {
  const en = await import('../public/js/data/dictionary.js');
  const ids = ['en-l-tale-pigs', 'en-l-tale-hen', 'en-l-tale-goldilocks', 'en-l-tale-beanstalk', 'en-l-tale-whittington', 'en-l-cities'];
  for (const id of ids) {
    const t = EN.find(x => x.id === id);
    assert.ok(t && t.art, id);
    const miss = t.body.match(/[A-Za-z’'-]+/g).filter(w => !en.lookup(w).translation && w.split('-').some(p => p && !en.lookup(p).translation));
    assert.deepEqual(miss, [], id);
  }
  assert.equal(EN.filter(t => ids.slice(0, 5).includes(t.id)).every(t => shelfOf(t) === 'tales'), true);
});

test('Иллюстрации к материалам: у каждого art есть рисунок, SVG собирается', async () => {
  const { textArt, hasArt, ART_KEYS } = await import('../public/js/text-art.js');
  const used = [...EL, ...EN, ...KRC, ...DE, ...TR].filter(t => t.art);
  assert.ok(used.length >= 18);
  for (const t of used) {
    assert.ok(hasArt(t), `нет рисунка ${t.art} у ${t.id}`);
    const svg = textArt(t);
    assert.match(svg, /^<figure class="text-art banner"><svg [^>]*>[\s\S]*<\/svg><\/figure>$/);
    assert.ok(!/NaN|undefined/.test(svg), t.art);
    assert.ok(!/id="(\w+)"/.test(textArt(t, 'thumb').replace(/id="\w+t"/g, '')), 'id в полоске с суффиксом');
  }
  for (const k of ART_KEYS) assert.ok(used.some(t => t.art === k), `рисунок ${k} не используется`);
  assert.equal(textArt({ art: 'нет-такого' }), '');
});

test('Английские песни: карточки с короткой цитатой, пересказом, переводом, ссылками, набором и рисунком', async () => {
  const en = await import('../public/js/data/dictionary.js');
  const songs = EN.filter(t => t.id.startsWith('en-l-song-'));
  assert.ok(songs.length >= 10);
  assert.ok(new Set(songs.map(t => t.level)).size >= 3, 'песни разных уровней');
  for (const t of songs) {
    assert.equal(t.kind, 'song', t.id);
    assert.equal(shelfOf(t), 'songs', t.id);
    assert.ok(t.summary?.length > 80 && t.translation && t.note, t.id);
    assert.ok(t.links?.length >= 1 && t.links.every(l => /^https:\/\//.test(l.href)), t.id);
    assert.ok(t.art, t.id);
    // цитата из песни — не больше двух строк в начале (полный текст не приводим)
    assert.ok(t.body.split('\n\n')[0].split('\n').length <= 2, t.id);
    assert.ok(en.SETS[t.set]?.length >= 10 && en.SET_INFO[t.set]?.title, t.id);
    for (const w of en.SETS[t.set]) assert.ok(en.DICT.get(w), `${t.set}: ${w}`);
    const miss = t.body.match(/[A-Za-z’'-]+/g).filter(w => !en.lookup(w).translation && w.split('-').some(p => p && !en.lookup(p).translation));
    assert.deepEqual(miss, [], t.id);
  }
});

test('Греческие песни и стихи: карточки с цитатой, пересказом, переводом, ссылками, набором и рисунком', async () => {
  const el = await import('../public/js/data/el/dictionary.js');
  const items = EL.filter(t => t.set?.startsWith('song_el_'));
  assert.ok(items.length >= 10);
  assert.ok(new Set(items.map(t => t.level)).size >= 3, 'разных уровней');
  for (const t of items) {
    assert.ok(['song', 'poem'].includes(t.kind), t.id);
    assert.equal(shelfOf(t), 'songs', t.id);
    assert.ok(t.summary?.length > 80 && t.translation && t.note, t.id);
    assert.ok(t.links?.length >= 1 && t.links.every(l => /^https:\/\//.test(l.href)), t.id);
    assert.ok(t.art, t.id);
    // у песен — не больше двух строк цитаты; у старинных стихов (общественное достояние) — до двух строф
    const quote = t.body.split('\n\n')[0].split('\n').length;
    assert.ok(t.kind === 'song' ? quote <= 2 : quote <= 8, t.id);
    assert.ok(el.SETS[t.set]?.length >= 20 && el.SET_INFO[t.set]?.title, t.id);
  }
});

test('Немецкие песни и стихи: карточки с цитатой, пересказом, переводом, ссылками, набором и рисунком', async () => {
  const de = await import('../public/js/data/de/dictionary.js');
  const items = DE.filter(t => t.set?.startsWith('song_de_'));
  assert.ok(items.length >= 10);
  assert.ok(new Set(items.map(t => t.level)).size >= 3, 'разных уровней');
  // современные песни, защищённые авторским правом: только одна-две строки
  const modern = new Set(['de-song-luftballons', 'de-song-atemlos', 'de-song-lilimarleen']);
  for (const t of items) {
    assert.ok(['song', 'poem'].includes(t.kind), t.id);
    assert.equal(shelfOf(t), 'songs', t.id);
    assert.ok(t.summary?.length > 80 && t.translation && t.note, t.id);
    assert.ok(t.links?.length >= 1 && t.links.every(l => /^https:\/\//.test(l.href)), t.id);
    assert.ok(t.art, t.id);
    const quote = t.body.split('\n\n')[0].split('\n').length;
    assert.ok(modern.has(t.id) ? quote <= 2 : quote <= 8, t.id);
    assert.ok(de.SETS[t.set]?.length >= 20 && de.SET_INFO[t.set]?.title, t.id);
  }
});

test('Турецкие песни и стихи: карточки с цитатой, пересказом, переводом, ссылками, набором и рисунком', async () => {
  const tr = await import('../public/js/data/tr/dictionary.js');
  const items = TR.filter(t => t.set?.startsWith('song_tr_'));
  assert.ok(items.length >= 10);
  assert.ok(new Set(items.map(t => t.level)).size >= 3, 'разных уровней');
  // песня Ашыка Вейселя защищена авторским правом: только одна-две строки
  const modern = new Set(['tr-song-veysel']);
  for (const t of items) {
    assert.ok(['song', 'poem'].includes(t.kind), t.id);
    assert.equal(shelfOf(t), 'songs', t.id);
    assert.ok(t.summary?.length > 80 && t.translation && t.note, t.id);
    assert.ok(t.links?.length >= 1 && t.links.every(l => /^https:\/\//.test(l.href)), t.id);
    assert.ok(t.art, t.id);
    const quote = t.body.split('\n\n')[0].split('\n').length;
    assert.ok(modern.has(t.id) ? quote <= 2 : quote <= 8, t.id);
    assert.ok(tr.SETS[t.set]?.length >= 20 && tr.SET_INFO[t.set]?.title, t.id);
    // каждое слово цитаты находится в словаре (с учётом аффиксов)
    for (const w of t.body.split('\n\n')[0].split(/[^\p{L}'’]+/u).filter(Boolean)) assert.ok(tr.lookup(w).translation, `${t.id}: ${w}`);
  }
  assert.equal(tr.lookup('Yemen\'de').word, 'yemen');
});

test('Турецкие сказки: десять сказок с переводом, пояснениями, рисунком и набором слов', async () => {
  const tr = await import('../public/js/data/tr/dictionary.js');
  const tales = TR.filter(t => t.id.startsWith('tr-tale-'));
  assert.equal(tales.length, 10);
  assert.equal(new Set(TR.map(t => t.id)).size, TR.length);
  assert.ok(new Set(tales.map(t => t.level)).size >= 3, 'разных уровней');
  for (const t of tales) {
    assert.equal(shelfOf(t), 'tales', t.id);
    assert.ok(t.summary?.length > 150 && t.note && t.art, t.id);
    // перевод: столько же абзацев, сколько в тексте
    assert.equal(t.translation.split('\n\n').length, t.body.split('\n\n').length, t.id);
    assert.ok(t.explain?.length >= 5 && t.explain.every(([w, e]) => w && e?.length > 5), t.id);
    assert.equal(t.set, 'tales_tr', t.id);
  }
  assert.ok(tr.SETS.tales_tr.length >= 50 && tr.SET_INFO.tales_tr.title);
  // трудные формы сводятся к правильным словам
  const cases = { yere: 'yer', altında: 'alt', içinde: 'iç', veriyor: 'vermek', kızmış: 'kızmak', mutluymuş: 'mutlu', kürküm: 'kürk', göle: 'göl', yoğurdu: 'yoğurt' };
  for (const [f, w] of Object.entries(cases)) assert.equal(tr.lookup(f).word, w, f);
});

test('Видеоматериалы: у каждого языка есть карточки с рабочими ссылками и известным типом', async () => {
  const { VIDEO_KINDS } = await import('../public/js/data/video-kinds.js');
  for (const path of ['videos.js', 'tr/videos.js', 'de/videos.js', 'el/videos.js', 'krc/videos.js']) {
    const { VIDEOS, VIDEO_CATALOGS = [], VIDEO_INTRO } = await import('../public/js/data/' + path);
    assert.ok(VIDEOS.length >= 4, path);
    assert.ok(VIDEO_INTRO, path);
    assert.equal(new Set(VIDEOS.map(v => v.id)).size, VIDEOS.length, path);
    for (const v of [...VIDEOS, ...VIDEO_CATALOGS]) {
      assert.match(v.href, /^https:\/\/\S+$/, v.title);
      assert.ok(v.title && v.desc, v.href);
    }
    for (const v of VIDEOS) {
      assert.ok(VIDEO_KINDS[v.kind], v.id);
      assert.match(v.level, /^(A1|A2|B1|B2|C1)$/, v.id);
      assert.ok(v.studio || v.where, v.id);
    }
  }
});

test('Мифы Древней Греции: перевод, пояснения, рисунок и набор слов у каждого мифа', async () => {
  const el = await import('../public/js/data/el/dictionary.js');
  const myths = EL.filter(t => t.topic === 'Мифы');
  assert.ok(myths.length >= 21);
  assert.equal(EL.filter(t => t.id.startsWith('el-myth-')).length, 12);
  assert.equal(new Set(EL.map(t => t.id)).size, EL.length);
  assert.ok(new Set(myths.map(t => t.level)).size >= 3, 'разных уровней');
  for (const t of myths) {
    assert.equal(shelfOf(t), 'tales', t.id);
    assert.ok(t.summary?.length > 150 && t.note && t.art, t.id);
    // перевод: столько же абзацев, сколько в тексте
    assert.equal(t.translation.split('\n\n').length, t.body.split('\n\n').length, t.id);
    assert.ok(t.explain?.length >= 5 && t.explain.every(([w, e]) => w && e?.length > 5), t.id);
    assert.equal(t.set, 'myths_el', t.id);
  }
  assert.ok(el.SETS.myths_el.length >= 50 && el.SET_INFO.myths_el.title);
  const cases = { Ολύμπου: 'Όλυμπος', Δία: 'Δίας', θεάς: 'θεά', ωμό: 'ωμός', νίκες: 'νίκη', φέρεις: 'φέρνω', ύφανε: 'υφαίνω', πολιορκούσαν: 'πολιορκώ', Γοργόνες: 'Γοργόνα' };
  for (const [f, w] of Object.entries(cases)) assert.equal(el.lookup(f).word, w, f);
});

test('Литература: у каждого языка 10 известных произведений с цитатой, переводом, пояснением и ссылками', async () => {
  for (const lang of ['en', 'tr', 'de', 'el', 'krc']) {
    const { BOOKS, BOOKS_INTRO } = await import(`../public/js/data/${lang}/books.js`);
    assert.equal(BOOKS.length, 10, lang);
    assert.ok(BOOKS_INTRO, lang);
    assert.equal(new Set(BOOKS.map(b => b.id)).size, BOOKS.length, lang);
    for (const b of BOOKS) {
      for (const k of ['genre', 'title', 'author', 'year', 'desc', 'quote', 'quoteRu', 'note']) assert.ok(b[k], `${lang}/${b.id}: ${k}`);
      assert.ok(b.note.length > 40, b.id);
      assert.ok(b.words?.length >= 2 && b.words.every(([w, t]) => w && t), b.id);
      assert.ok(b.links?.length >= 2, b.id);
      for (const l of b.links) { assert.ok(l.title, b.id); assert.match(l.href, /^https:\/\/\S+$/, b.id); }
    }
  }
});
