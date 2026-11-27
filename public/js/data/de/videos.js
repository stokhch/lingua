// Видеоматериалы на немецком: каналы для изучающих, детские передачи, сериалы и фильмы.
// Ссылки проверены в ноябре 2026. Для фильмов и сериалов ссылка ведёт на статью о них (где смотреть — зависит от страны).
export { VIDEO_KINDS, VIDEO_GROUPS } from '../video-kinds.js';
export const VIDEO_INTRO = 'Каналы для изучающих, детские передачи, сериалы и фильмы на немецком. Начните с Easy German и «Передачи с Мышкой», а фильмы смотрите с немецкими субтитрами.';

export const VIDEO_CATALOGS = [
  { title: 'Die Seite mit der Maus (WDR)', href: 'https://www.wdrmaus.de/', desc: 'Сайт «Передачи с Мышкой»: ролики-объяснялки, игры и выпуски для детей.' }
];

export const VIDEOS = [
  { id: 'de-maus', kind: 'cartoon', title: 'Die Sendung mit der Maus', ru: 'Передача с Мышкой, с 1971', level: 'A2', where: 'Сайт WDR', href: 'https://www.wdrmaus.de/', desc: 'Мультфильмы и «Sachgeschichten»: как всё устроено, медленно и понятно.' },
  { id: 'de-easy', kind: 'learn', title: 'Easy German', ru: 'Уличные интервью', level: 'A2', where: 'YouTube', href: 'https://www.youtube.com/@EasyGerman', desc: 'Живая речь на улицах Германии с немецкими и английскими субтитрами; есть выпуски для начинающих.' },
  { id: 'de-dark', kind: 'series', title: 'Dark', ru: 'Тьма, 2017–2020', level: 'B2', where: 'Википедия: о сериале', href: 'https://de.wikipedia.org/wiki/Dark_(Fernsehserie)', desc: 'Мистический сериал Netflix: современный немецкий, медленный темп диалогов.' },
  { id: 'de-good-bye-lenin', kind: 'film', title: 'Good Bye, Lenin!', ru: 'Гуд бай, Ленин!, 2003', level: 'B1', where: 'Википедия: о фильме', href: 'https://de.wikipedia.org/wiki/Good_Bye,_Lenin!', desc: 'Трагикомедия о падении Берлинской стены: бытовая лексика и история ГДР.' },
  { id: 'de-welle', kind: 'film', title: 'Die Welle', ru: 'Эксперимент «Волна», 2008', level: 'B1', where: 'Википедия: о фильме', href: 'https://de.wikipedia.org/wiki/Die_Welle_(2008)', desc: 'Школьная драма: речь подростков и учителей, понятный сюжет.' },
  { id: 'de-lola', kind: 'film', title: 'Lola rennt', ru: 'Беги, Лола, беги, 1998', level: 'B1', where: 'Википедия: о фильме', href: 'https://de.wikipedia.org/wiki/Lola_rennt', desc: 'Одна история три раза подряд — диалоги повторяются, их легко запомнить.' },
  { id: 'de-leben-anderen', kind: 'film', title: 'Das Leben der Anderen', ru: 'Жизнь других, 2006', level: 'B2', where: 'Википедия: о фильме', href: 'https://de.wikipedia.org/wiki/Das_Leben_der_Anderen', desc: 'Драма о Штази, «Оскар» за лучший иностранный фильм. Чёткая, но насыщенная речь.' }
];
