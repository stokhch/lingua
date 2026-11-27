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
import { RESOURCES as krcResources } from './data/krc/resources.js';
import { krcToTurkish, krcToKazakh } from './data/krc/translit.js';
import * as elDict from './data/el/dictionary.js';
import { TEXTS as elTexts } from './data/el/texts.js';
import { COURSES as elCourses, ALL_LESSONS as elLessons } from './data/el/grammar.js';
import { PHRASES as elPhrases } from './data/el/phrases.js';
import * as deDict from './data/de/dictionary.js';
import { TEXTS as deTexts } from './data/de/texts.js';
import { COURSES as deCourses, ALL_LESSONS as deLessons } from './data/de/grammar.js';
import { PHRASES as dePhrases } from './data/de/phrases.js';

// Греческие буквы, включая буквы с ударением (тонос) и диерезисом
const EL_LETTERS = 'Α-ΩΆΈΉΊΌΎΏΪΫα-ωάέήίόύώϊϋΐΰ';

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
  // Немецкий: латиница с умлаутами и ß. Существительные в словаре хранятся строчными (как все слова Лингвы),
  // а род показан в переводе: «haus — дом (das)». Ответ без умлаутов засчитывается с подсказкой (schon = schön).
  de: {
    id: 'de', code: 'DE', name: 'Немецкий', acc: 'немецкий', gen: 'немецкого', flag: '🇩🇪',
    tts: 'de-DE', voiceRe: /^de/i, preferVoice: /de[-_]DE/i,
    letters: 'A-Za-zÄÖÜäöüß', tokenRe: /[A-Za-zÄÖÜäöüß’'-]+/g, extraKeys: ['ä', 'ö', 'ü', 'ß'],
    sample: 'Reise', sampleTr: 'Apfel;яблоко', firstSet: 'start',
    lower: deDict.lower,
    DICT: deDict.DICT, SETS: deDict.SETS, SET_INFO: deDict.SET_INFO, lemma: deDict.lemma, lookup: deDict.lookup,
    TEXTS: deTexts, COURSES: deCourses, ALL_LESSONS: deLessons, PHRASES: dePhrases
  },
  // Новогреческий: своя азбука. На клавиатуре у ученика её обычно нет, поэтому панель — весь алфавит
  // и кнопка ударения «´» (ставит тонос на предыдущую гласную). Ответ без ударений засчитывается с подсказкой.
  el: {
    id: 'el', code: 'GR', name: 'Греческий', acc: 'греческий', gen: 'греческого', flag: '🇬🇷',
    tts: 'el-GR', voiceRe: /^el/i, preferVoice: /el[-_]GR/i,
    letters: EL_LETTERS, tokenRe: new RegExp(`[${EL_LETTERS}’'-]+`, 'g'),
    extraKeys: [...'αβγδεζηθικλμνξοπρσςτυφχψω', '´'], fullKeys: true,
    sample: 'ταξίδι', sampleTr: 'μήλο;яблоко', firstSet: 'start',
    lower: elDict.lower, plain: elDict.plain,
    DICT: elDict.DICT, SETS: elDict.SETS, SET_INFO: elDict.SET_INFO, lemma: elDict.lemma, lookup: elDict.lookup,
    TEXTS: elTexts, COURSES: elCourses, ALL_LESSONS: elLessons, PHRASES: elPhrases
  },
  // Карачаево-балкарский: кириллица, своего голоса синтеза речи нет — читает казахский голос (близкий тюркский язык)
  // по переводу в казахскую кириллицу (къ → қ, ё → ө…); если казахского нет — турецкий (ttsFallback). Онлайн-переводчик его не знает.
  krc: {
    id: 'krc', code: 'КБ', name: 'Карачаево-балкарский', acc: 'карачаево-балкарский', gen: 'карачаево-балкарского', flag: '🏔️',
    tts: 'kk-KZ', voice: 'kk', ttsText: krcToKazakh, ttsFallback: { tts: 'tr-TR', voice: 'tr', ttsText: krcToTurkish }, online: false,
    beta: 'Бета: материалы требуют проверки носителем языка',
    letters: 'А-Яа-яЁёЎў', tokenRe: /[А-Яа-яЁёЎў’'-]+/g, extraKeys: [],
    sample: 'джол', sampleTr: 'алма;яблоко', firstSet: 'core',
    lower: krcDict.lower,
    DICT: krcDict.DICT, SETS: krcDict.SETS, SET_INFO: krcDict.SET_INFO, lemma: krcDict.lemma, lookup: krcDict.lookup,
    TEXTS: krcTexts, COURSES: krcCourses, ALL_LESSONS: krcLessons, PHRASES: krcPhrases, RESOURCES: krcResources
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
// Для греческого: без ударений и диерезиса, конечная ς = σ (καλημερα = καλημέρα).
// Для немецкого: ä → a, ö → o, ü → u, ß → ss (strasse = Straße).
export const fold = s => lower(s).replace(/[çğıöşüâîûäßёў]/g, c => ({ ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', â: 'a', î: 'i', û: 'u', ä: 'a', ß: 'ss', ё: 'е', ў: 'у' })[c]).replace(/дж/g, 'ж')
  .normalize('NFD').replace(/[\u0301\u0308]/g, '').normalize('NFC').replace(/ς/g, 'σ');
// Форма слова для клеток кроссворда: греческие кроссворды пишут без ударений
export const cellForm = s => (L().plain || (x => x))(s);

// Панель с буквами, которых нет на русской/английской клавиатуре. Нажатие вставляет букву
// в последнее активное поле ввода (обработчик — в app.js).
export const keysBar = () => L().extraKeys.length
  ? `<div class="xkeys${L().fullKeys ? ' full' : ''}" aria-label="${L().fullKeys ? 'Буквы' : 'Особые буквы'}">${L().extraKeys.map(k => `<button type="button" tabindex="-1" data-ch="${k}"${k === '´' ? ' class="acc" title="Ударение на предыдущую гласную" aria-label="Поставить ударение"' : ''}>${k}</button>`).join('')}</div>` : '';

// Кнопка «´»: ставит (или снимает) ударение на гласной перед курсором
const ACUTE = { α: 'ά', ε: 'έ', η: 'ή', ι: 'ί', ο: 'ό', υ: 'ύ', ω: 'ώ', ϊ: 'ΐ', ϋ: 'ΰ', Α: 'Ά', Ε: 'Έ', Η: 'Ή', Ι: 'Ί', Ο: 'Ό', Υ: 'Ύ', Ω: 'Ώ' };
const UNACUTE = Object.fromEntries(Object.entries(ACUTE).map(([a, b]) => [b, a]));
export function toggleAccent(ch) { return ACUTE[ch] || UNACUTE[ch] || null; }

// Поля прогресса, у которых своя копия для каждого языка
const PER_LANG = ['words', 'readTexts', 'grammar', 'materials', 'openedTexts', 'mySets', 'exams'];

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
