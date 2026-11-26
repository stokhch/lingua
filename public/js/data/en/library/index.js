// Библиотека английских материалов по полкам: тексты для чтения и новости, диалоги, разговорник, сказки,
// идиомы и пословицы, культура и история, стихи. Все тексты написаны специально для Лингвы (басни — пересказ).
// У каждой части свои слова (WORDS: «слово|перевод») и формы (FORMS: форма → начальная форма),
// чтобы перевод по клику находил каждое слово.
import * as p1 from './part1.js';
const PARTS = [p1];
export const LIBRARY = PARTS.flatMap(p => p.TEXTS);
export const LIBRARY_FORMS = Object.assign({}, ...PARTS.map(p => p.FORMS || {}));
export const LIBRARY_WORDS = PARTS.flatMap(p => p.WORDS.trim().split('\n').filter(Boolean));
