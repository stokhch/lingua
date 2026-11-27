// Видеоматериалы на английском: каналы для изучающих, мультфильмы, сериалы и фильмы.
// Ссылки проверены в ноябре 2026. Для фильмов и сериалов ссылка ведёт на статью о них (где смотреть — зависит от страны).
export { VIDEO_KINDS, VIDEO_GROUPS } from './video-kinds.js';
export const VIDEO_INTRO = 'Каналы для изучающих, мультфильмы, сериалы и фильмы на английском. Начните с роликов для изучающих и мультфильмов, а фильмы смотрите с английскими субтитрами.';

export const VIDEO_CATALOGS = [
  { title: 'British Council — LearnEnglish', href: 'https://learnenglish.britishcouncil.org/', desc: 'Видео, аудио и упражнения по уровням от A1 до C1.' }
];

export const VIDEOS = [
  { id: 'en-peppa', kind: 'cartoon', title: 'Peppa Pig', ru: 'Свинка Пеппа', level: 'A1', where: 'YouTube: официальный канал', href: 'https://www.youtube.com/@PeppaPigOfficial', desc: 'Пятиминутные серии с британским произношением, простые фразы про семью и быт.' },
  { id: 'en-bluey', kind: 'cartoon', title: 'Bluey', ru: 'Блуи, 2018', level: 'A2', where: 'Википедия: о сериале', href: 'https://en.wikipedia.org/wiki/Bluey_(2018_TV_series)', desc: 'Австралийский мультсериал о семье щенков: живые бытовые диалоги, игры, юмор.' },
  { id: 'en-shaun', kind: 'cartoon', title: 'Shaun the Sheep', ru: 'Барашек Шон', level: 'A1', where: 'Википедия: о сериале', href: 'https://en.wikipedia.org/wiki/Shaun_the_Sheep', desc: 'Почти без слов — хорош для самых первых шагов: подписи, вывески и названия предметов.' },
  { id: 'en-bbc-le', kind: 'learn', title: 'BBC Learning English', ru: 'Уроки от BBC', level: 'A2', where: 'YouTube', href: 'https://www.youtube.com/@bbclearningenglish', desc: 'Короткие уроки по грамматике, лексике и произношению, новости простым языком.' },
  { id: 'en-easy', kind: 'learn', title: 'Easy English', ru: 'Уличные интервью', level: 'B1', where: 'YouTube', href: 'https://www.youtube.com/@EasyEnglishVideos', desc: 'Прохожие отвечают на вопросы — живая речь с двойными субтитрами.' },
  { id: 'en-teded', kind: 'learn', title: 'TED-Ed', ru: 'Научно-популярные мультролики', level: 'B2', where: 'YouTube', href: 'https://www.youtube.com/@TEDEd', desc: 'Анимированные уроки на 5 минут об истории, науке и языке; есть субтитры.' },
  { id: 'en-friends', kind: 'series', title: 'Friends', ru: 'Друзья, 1994–2004', level: 'B1', where: 'Википедия: о сериале', href: 'https://en.wikipedia.org/wiki/Friends', desc: 'Классика для изучающих: короткие эпизоды, разговорный американский английский.' },
  { id: 'en-sherlock', kind: 'series', title: 'Sherlock', ru: 'Шерлок, 2010–2017', level: 'C1', where: 'Википедия: о сериале', href: 'https://en.wikipedia.org/wiki/Sherlock_(TV_series)', desc: 'Быстрая британская речь и богатая лексика — для продвинутых.' },
  { id: 'en-paddington', kind: 'film', title: 'Paddington', ru: 'Приключения Паддингтона, 2014', level: 'A2', where: 'Википедия: о фильме', href: 'https://en.wikipedia.org/wiki/Paddington_(film)', desc: 'Добрая семейная комедия, вежливый британский английский.' },
  { id: 'en-notting-hill', kind: 'film', title: 'Notting Hill', ru: 'Ноттинг-Хилл, 1999', level: 'B1', where: 'Википедия: о фильме', href: 'https://en.wikipedia.org/wiki/Notting_Hill_(film)', desc: 'Романтическая комедия: британский и американский английский в одном фильме.' },
  { id: 'en-kings-speech', kind: 'film', title: 'The King’s Speech', ru: 'Король говорит!, 2010', level: 'B2', where: 'Википедия: о фильме', href: 'https://en.wikipedia.org/wiki/The_King%27s_Speech', desc: 'История короля, который учится говорить без заикания: чёткая речь и много про произношение.' }
];
