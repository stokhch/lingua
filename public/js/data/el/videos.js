// Видеоматериалы на греческом: каналы для изучающих, сериалы и фильмы.
// Ссылки проверены в ноябре 2026. Для фильмов и сериалов ссылка ведёт на статью о них (где смотреть — зависит от страны).
export { VIDEO_KINDS, VIDEO_GROUPS } from '../video-kinds.js';
export const VIDEO_INTRO = 'Каналы для изучающих, сериалы и фильмы на греческом. Начните с Easy Greek, а сериалы и фильмы бесплатно смотрите на ERTFLIX — там есть греческие субтитры.';

export const VIDEO_CATALOGS = [
  { title: 'ERTFLIX', href: 'https://www.ertflix.gr/', desc: 'Бесплатная онлайн-платформа греческого гостелевидения ERT: сериалы, фильмы, детские передачи.' }
];

export const VIDEOS = [
  { id: 'el-easy', kind: 'learn', title: 'Easy Greek', ru: 'Уличные интервью', level: 'A2', where: 'YouTube', href: 'https://www.youtube.com/@EasyGreek', desc: 'Живая речь на улицах Греции с греческими и английскими субтитрами.' },
  { id: 'el-nisi', kind: 'series', title: 'Το νησί', ru: 'Остров, 2010–2011', level: 'B1', where: 'Википедия: о сериале', href: 'https://el.wikipedia.org/wiki/%CE%A4%CE%BF_%CE%9D%CE%B7%CF%83%CE%AF_(%CF%83%CE%B5%CE%B9%CF%81%CE%AC)', desc: 'Сериал по роману Виктории Хислоп о Крите и острове Спиналонга: семейная сага, понятные диалоги.' },
  { id: 'el-kalpiki-lira', kind: 'film', title: 'Ιστορία μιας κάλπικης λίρας', ru: 'История одной фальшивой монеты, 1955', level: 'B1', where: 'Википедия: о фильме', href: 'https://el.wikipedia.org/wiki/%CE%99%CF%83%CF%84%CE%BF%CF%81%CE%AF%CE%B1_%CE%BC%CE%B9%CE%B1%CF%82_%CE%BA%CE%AC%CE%BB%CF%80%CE%B9%CE%BA%CE%B7%CF%82_%CE%BB%CE%AF%CF%81%CE%B1%CF%82', desc: 'Классика Йоргоса Тзавелласа: четыре новеллы о монете, переходящей из рук в руки. Короткие сюжеты.' },
  { id: 'el-kynodontas', kind: 'film', title: 'Κυνόδοντας', ru: 'Клык, 2009', level: 'B2', where: 'Википедия: о фильме', href: 'https://el.wikipedia.org/wiki/%CE%9A%CF%85%CE%BD%CF%8C%CE%B4%CE%BF%CE%BD%CF%84%CE%B1%CF%82_(%CF%84%CE%B1%CE%B9%CE%BD%CE%AF%CE%B1)', desc: 'Фильм Йоргоса Лантимоса, номинант на «Оскар». Странный, но с простыми фразами и игрой со словами. 18+.' }
];
