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

const PARTS = [p1, p2, p3, p4, p5, p6, p7];
export const LIBRARY = PARTS.flatMap(p => p.TEXTS);
// FORMS: трудные формы без ударений → словарная форма (έπεσε → πέφτω)
export const LIBRARY_FORMS = Object.assign({}, ...PARTS.map(p => p.FORMS || {}));
export const LIBRARY_WORDS = PARTS.flatMap(p => p.WORDS.trim().split('\n').filter(Boolean));
// Наборы слов из песен и стихов (часть 7): добавляются в конец списка наборов
export const SONG_SETS = p7.SONG_SETS;
