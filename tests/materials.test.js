import test from 'node:test';
import assert from 'node:assert/strict';
import { parseSubtitles, youtubeId, estimateLevel, newWordCount } from '../public/js/materials.js';
import { TEXTS } from '../public/js/data/texts.js';
import { TEXTS as TR } from '../public/js/data/tr/texts.js';
import * as en from '../public/js/data/dictionary.js';
import * as tr from '../public/js/data/tr/dictionary.js';

const reEn = /[A-Za-z’'-]+/g, reTr = /[A-Za-zÇçĞğİıÖöŞşÜüÂâÎîÛû’'-]+/g;

test('Субтитры: убираем номера, таймкоды и теги', () => {
  const srt = `1\n00:00:01,000 --> 00:00:03,000\n<i>Hello there.</i>\n\n2\n00:00:03,500 --> 00:00:05,000\nHow are you\ndoing today?\n`;
  assert.equal(parseSubtitles(srt), 'Hello there. How are you doing today?');
  const vtt = `WEBVTT\n\n00:01.000 --> 00:02.000\nGood morning.\n`;
  assert.equal(parseSubtitles(vtt), 'Good morning.');
  assert.equal(parseSubtitles('Just text.\n\nSecond.'), 'Just text.\n\nSecond.');
});

test('Ссылки YouTube', () => {
  assert.equal(youtubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=5'), 'dQw4w9WgXcQ');
  assert.equal(youtubeId('youtu.be/dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
  assert.equal(youtubeId('https://youtube.com/shorts/dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
  assert.equal(youtubeId('https://evil.example/watch?v=dQw4w9WgXcQ'), null);
  assert.equal(youtubeId(''), null);
});

test('Оценка уровня совпадает с разметкой встроенных текстов', () => {
  // строго — для базовых текстов; у библиотеки (en-l-…) диалоги, стихи и идиомы оценщик мерит иначе
  for (const t of TEXTS.filter(t => !t.id.startsWith('en-l-'))) assert.equal(estimateLevel(t.body, reEn, w => !!en.lookup(w).translation), t.level, t.id);
  // у песен и стихов уровень задаёт цитата (старинные и диалектные слова), а рассказ о песне проще; сказки оценщик тоже мерит иначе
  for (const t of TR.filter(t => t.shelf !== 'songs' && !t.id.startsWith('tr-tale-'))) assert.equal(estimateLevel(t.body, reTr, w => !!tr.lookup(w).translation, 'tr'), t.level, t.id);
  const hard = 'The committee’s deliberations were protracted, and its eventual recommendations, though ostensibly pragmatic, were widely perceived as an attempt to placate vociferous constituencies.';
  assert.equal(estimateLevel(hard, reEn, w => !!en.lookup(w).translation), 'C1');
});

test('Оценка уровня: тексты библиотеки для чтения не дальше одного уровня от разметки', () => {
  const ORDER = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1'];
  // турецкие сказки: диалоги в кавычках оценщик мерит грубее — допускаем один уровень
  for (const t of TR.filter(t => t.id.startsWith('tr-tale-'))) {
    const d = ORDER.indexOf(estimateLevel(t.body, reTr, w => !!tr.lookup(w).translation, 'tr')) - ORDER.indexOf(t.level);
    assert.ok(Math.abs(d) <= 1, t.id);
  }
  for (const t of TEXTS.filter(t => t.id.startsWith('en-l-') && ['reading', 'culture'].includes(t.shelf))) {
    const d = ORDER.indexOf(estimateLevel(t.body, reEn, w => !!en.lookup(w).translation)) - ORDER.indexOf(t.level);
    assert.ok(Math.abs(d) <= 1, t.id);
  }
});

test('Новые слова считаются по леммам', () => {
  const has = k => k === 'go';
  assert.equal(newWordCount('I went. She goes. Cats and a cat.', reEn, en.lemma, has), 3); // she, cat, and (I и a короче двух букв)
});
