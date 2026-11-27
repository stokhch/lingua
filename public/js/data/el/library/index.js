// Библиотека греческих материалов по полкам: тексты для чтения, диалоги, разговорник, сказки и мифы,
// пословицы, культура и история, стихи. Все тексты написаны специально для Лингвы (мифы и басни — пересказ).
// У каждой части свои слова (WORDS: «слово|перевод»), чтобы перевод по клику находил всё.
import * as p1 from './part1.js';
import * as p2 from './part2.js';
import * as p3 from './part3.js';
import * as p4 from './part4.js';
import * as p5 from './part5.js';
import * as p6 from './part6.js';
import * as p7 from './part7.js';
import * as p8 from './part8.js';

const PARTS = [p1, p2, p3, p4, p5, p6, p7, p8];
// Мифы из частей 1–5 получают из части 8 перевод, пояснения, рисунок и тему «Мифы»
const MYTH = { topic: 'Мифы', set: p8.MYTH_SET_ID, note: p8.MYTH_NOTE };
export const LIBRARY = PARTS.flatMap(p => p.TEXTS).map(t => p8.MYTH_EXTRA[t.id] ? { ...t, ...MYTH, ...p8.MYTH_EXTRA[t.id] } : t);
// FORMS: трудные формы без ударений → словарная форма (έπεσε → πέφτω)
export const LIBRARY_FORMS = Object.assign({}, ...PARTS.map(p => p.FORMS || {}));
export const LIBRARY_WORDS = PARTS.flatMap(p => p.WORDS.trim().split('\n').filter(Boolean));
// Наборы слов из песен и стихов (часть 7): добавляются в конец списка наборов
export const SONG_SETS = p7.SONG_SETS;
// Набор «Слова из мифов» (часть 8)
export const MYTH_SET = { id: p8.MYTH_SET_ID, words: p8.MYTH_SET };
