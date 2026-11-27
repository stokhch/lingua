// Видеоматериалы на турецком: каналы для изучающих, мультфильмы и фильмы.
// Ссылки проверены в ноябре 2026. Для фильмов ссылка ведёт на статью о них (где смотреть — зависит от страны).
export { VIDEO_KINDS, VIDEO_GROUPS } from '../video-kinds.js';
export const VIDEO_INTRO = 'Каналы для изучающих, мультфильмы и фильмы на турецком. Начните с Easy Turkish и детских мультфильмов TRT Çocuk, а фильмы смотрите с турецкими субтитрами.';

export const VIDEO_CATALOGS = [
  { title: 'TRT Çocuk', href: 'https://www.trtcocuk.net.tr/', desc: 'Детский канал турецкого гостелевидения: мультфильмы и передачи онлайн.' },
  { title: 'tabii', href: 'https://www.tabii.com/', desc: 'Онлайн-платформа TRT (бывший TRT İzle): турецкие сериалы и фильмы.' }
];

export const VIDEOS = [
  { id: 'tr-niloya', kind: 'cartoon', title: 'Niloya', ru: 'Нилоя, с 2011', level: 'A1', where: 'Википедия: о мультсериале', href: 'https://tr.wikipedia.org/wiki/Niloya', desc: 'Мультсериал TRT Çocuk для малышей: короткие серии, простые фразы про природу и семью.' },
  { id: 'tr-easy', kind: 'learn', title: 'Easy Turkish', ru: 'Уличные интервью', level: 'A2', where: 'YouTube', href: 'https://www.youtube.com/@EasyTurkish', desc: 'Живая речь на улицах Стамбула с турецкими и английскими субтитрами.' },
  { id: 'tr-hababam', kind: 'film', title: 'Hababam Sınıfı', ru: 'Класс бездельников, 1975', level: 'B1', where: 'Википедия: о фильме', href: 'https://tr.wikipedia.org/wiki/Hababam_S%C4%B1n%C4%B1f%C4%B1_(film)', desc: 'Культовая школьная комедия: фразы из неё знает вся Турция.' },
  { id: 'tr-babam-ve-oglum', kind: 'film', title: 'Babam ve Oğlum', ru: 'Мой отец и мой сын, 2005', level: 'B1', where: 'Википедия: о фильме', href: 'https://tr.wikipedia.org/wiki/Babam_ve_O%C4%9Flum', desc: 'Семейная драма: деревня, отцы и дети, ясная бытовая речь.' },
  { id: 'tr-kis-uykusu', kind: 'film', title: 'Kış Uykusu', ru: 'Зимняя спячка, 2014', level: 'C1', where: 'Википедия: о фильме', href: 'https://tr.wikipedia.org/wiki/K%C4%B1%C5%9F_Uykusu_(film)', desc: 'Фильм Нури Бильге Джейлана, «Золотая пальмовая ветвь». Длинные философские диалоги — для продвинутых.' }
];
