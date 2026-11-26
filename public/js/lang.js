// Изучаемые языки. Весь контент (словарь, наборы, тексты, грамматика, фразы) берётся из текущего языка,
// который хранится в store.state.lang. Личный словарь, прочитанные тексты и уроки у каждого языка свои;
// опыт, стрик и достижения — общие.
import { store } from './store.js';
import * as enDict from './data/dictionary.js';
import { TEXTS as enTexts } from './data/texts.js';
import { COURSES as enCourses, ALL_LESSONS as enLessons } from './data/grammar.js';
import { PHRASES as enPhrases } from './data/phrases.js';
import * as trDict from './data/tr/dictionary.js';
import { TEXTS as trTexts } from './data/tr/texts.js';
import { COURSES as trCourses, ALL_LESSONS as trLessons } from './data/tr/grammar.js';
import { PHRASES as trPhrases } from './data/tr/phrases.js';
import * as krcDict from './data/krc/dictionary.js';
import { TEXTS as krcTexts } from './data/krc/texts.js';
import { COURSES as krcCourses, ALL_LESSONS as krcLessons } from './data/krc/grammar.js';
import { PHRASES as krcPhrases } from './data/krc/phrases.js';

export const LANGS = {
  en: {
    id: 'en', code: 'EN', name: 'Английский', acc: 'английский', gen: 'английского', flag: '🇬🇧',
    tts: 'en-US', voiceRe: /^en/i, preferVoice: /en[-_]GB/i,
    letters: 'A-Za-z', tokenRe: /[A-Za-z’'-]+/g, extraKeys: [],
    sample: 'journey', sampleTr: 'apple;яблоко', firstSet: 'verbs',
    lower: s => s.toLowerCase(),
    DICT: enDict.DICT, SETS: enDict.SETS, SET_INFO: enDict.SET_INFO, lemma: enDict.lemma, lookup: enDict.lookup,
    TEXTS: enTexts, COURSES: enCourses, ALL_LESSONS: enLessons, PHRASES: enPhrases
  },
  tr: {
    id: 'tr', code: 'TR', name: 'Турецкий', acc: 'турецкий', gen: 'турецкого', flag: '🇹🇷',
    tts: 'tr-TR', voiceRe: /^tr/i, preferVoice: /tr[-_]TR/i,
    letters: 'A-Za-zÇçĞğİıÖöŞşÜüÂâÎîÛû', tokenRe: /[A-Za-zÇçĞğİıÖöŞşÜüÂâÎîÛû’'-]+/g, extraKeys: ['ç', 'ğ', 'ı', 'ö', 'ş', 'ü', 'â'],
    sample: 'yolculuk', sampleTr: 'elma;яблоко', firstSet: 'start',
    lower: trDict.lower,
    DICT: trDict.DICT, SETS: trDict.SETS, SET_INFO: trDict.SET_INFO, lemma: trDict.lemma, lookup: trDict.lookup,
    TEXTS: trTexts, COURSES: trCourses, ALL_LESSONS: trLessons, PHRASES: trPhrases
  },
  // Карачаево-балкарский: кириллица, голоса синтеза речи для него нет (tts: null), онлайн-переводчик его не знает.
  krc: {
    id: 'krc', code: 'КБ', name: 'Карачаево-балкарский', acc: 'карачаево-балкарский', gen: 'карачаево-балкарского', flag: '🏔️',
    tts: null, online: false,
    beta: 'Бета: материалы требуют проверки носителем языка',
    letters: 'А-Яа-яЁёЎў', tokenRe: /[А-Яа-яЁёЎў’'-]+/g, extraKeys: [],
    sample: 'джол', sampleTr: 'алма;яблоко', firstSet: 'core',
    lower: krcDict.lower,
    DICT: krcDict.DICT, SETS: krcDict.SETS, SET_INFO: krcDict.SET_INFO, lemma: krcDict.lemma, lookup: krcDict.lookup,
    TEXTS: krcTexts, COURSES: krcCourses, ALL_LESSONS: krcLessons, PHRASES: krcPhrases
  }
};

export const LANG_IDS = Object.keys(LANGS);
export const L = () => LANGS[store.state?.lang] || LANGS.en;
export const lower = s => L().lower(String(s ?? ''));
// Регулярное выражение, которое делит текст на слова (с захватом — для split)
export const splitRe = () => new RegExp(`([${L().letters}’'-]+)`);
// Только буквы текущего языка (для кроссворда, конструктора слов)
export const lettersOnly = s => String(s).replace(new RegExp(`[^${L().letters}]`, 'g'), '');

// Сравнение без диакритики: если у ученика нет турецкой раскладки, «gunes» засчитаем как «güneş» с подсказкой.
// Для кириллицы: ё → е, ў → у, дж → ж (балкарское написание: жол = джол) — ответ засчитывается с подсказкой.
export const fold = s => lower(s).replace(/[çğıöşüâîûёў]/g, c => ({ ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', â: 'a', î: 'i', û: 'u', ё: 'е', ў: 'у' })[c]).replace(/дж/g, 'ж');

// Панель с буквами, которых нет на русской/английской клавиатуре. Нажатие вставляет букву
// в последнее активное поле ввода (обработчик — в app.js).
export const keysBar = () => L().extraKeys.length
  ? `<div class="xkeys" aria-label="Особые буквы">${L().extraKeys.map(k => `<button type="button" tabindex="-1" data-ch="${k}">${k}</button>`).join('')}</div>` : '';

// Поля прогресса, у которых своя копия для каждого языка
const PER_LANG = ['words', 'readTexts', 'grammar'];

export function switchLang(id) {
  const s = store.state;
  if (!LANGS[id] || (s.lang || 'en') === id) return false;
  s.byLang ||= {};
  s.byLang[s.lang || 'en'] = Object.fromEntries(PER_LANG.map(k => [k, s[k]]));
  const saved = s.byLang[id] || {};
  for (const k of PER_LANG) s[k] = saved[k] || {};
  delete s.byLang[id];
  s.lang = id;
  store.save();
  return true;
}

// Сколько слов в словаре у языка (для меню выбора)
export function wordCount(id) {
  const s = store.state;
  if ((s.lang || 'en') === id) return Object.keys(s.words).length;
  return Object.keys(s.byLang?.[id]?.words || {}).length;
}
