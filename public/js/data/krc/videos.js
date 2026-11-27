// Видеоматериалы на карачаево-балкарском: фильмы, мультфильмы и документальное кино в озвучке на КБ.
// Ссылки проверены в ноябре 2026. Уровень — примерная оценка по типу фильма и темпу речи.
// kind: 'cartoon' — мультфильм, 'film' — художественный фильм, 'doc' — документальный.
export const VIDEO_KINDS = { cartoon: 'Мультфильм', film: 'Фильм', doc: 'Документальный' };
export const VIDEO_GROUPS = { cartoon: 'Мультфильмы', film: 'Фильмы', doc: 'Документальные' };

// Каталоги, где можно найти ещё
export const VIDEO_CATALOGS = [
  { title: 'Karachay-TV', href: 'https://karachay-tv.ru/', desc: 'Самый большой каталог: больше сотни мультфильмов и фильмов в карачаево-балкарской озвучке. Интерфейс на русском.' },
  { title: 'Karachay-TV: Сарин Студио', href: 'https://karachay-tv.ru/category/sarin_studio/', desc: 'Фильмы и мультфильмы, озвученные студией «Сарин».' },
  { title: 'Karachay-TV: документальные фильмы', href: 'https://karachay-tv.ru/category/dokumentalnye-filmy/', desc: 'Документальное кино на карачаево-балкарском языке.' }
];

export const VIDEOS = [
  // ---------- мультфильмы ----------
  { id: 'kimdi-ol', kind: 'cartoon', title: 'Кимди ол?', ru: 'Кто это?', studio: 'Баппахан', level: 'A1', href: 'https://karachay-tv.ru/malyshi-kimdi-ol/', desc: 'Для малышей: простые вопросы, названия животных и предметов.' },
  { id: 'zhanyuuar-auuaz', kind: 'cartoon', title: 'Жаныууарланы аууазлары', ru: 'Как говорят животные', studio: 'Баппахан', level: 'A1', href: 'https://karachay-tv.ru/malyshi-kak-govoryat-zhivotnye/', desc: 'Животные и их голоса, много повторов — хорошо для первых слов.' },
  { id: 'dzingilik', kind: 'cartoon', title: 'Дзингилик', ru: 'Джинглики, 1 серия', studio: 'Баппахан', level: 'A1', href: 'https://karachay-tv.ru/malyshi-dzhingilik-1/', desc: 'Детский сериал из коротких фраз.' },
  { id: 'luntik', kind: 'cartoon', title: 'Лунтик', ru: 'Лунтик, серии 1–20', studio: 'Эльбрусоид', level: 'A1', href: 'https://karachay-tv.ru/elbrusoid-luntik-1-20/', desc: 'Короткие серии с бытовыми диалогами — можно смотреть по одной в день.' },
  { id: 'karnash-khubolchuk', kind: 'cartoon', title: 'Къарнаш хуболчукъ', ru: 'Братец медвежонок', studio: 'Эльбрусоид', level: 'A2', href: 'https://karachay-tv.ru/elbrusoid-karnash-khubolchuk/', desc: 'Знакомый сюжет помогает следить за речью без перевода.' },
  { id: 'byoryu-bla-buzou', kind: 'cartoon', title: 'Бёрю бла бузоу', ru: 'Волк и телёнок', studio: 'Эльбрусоид', level: 'A2', href: 'https://karachay-tv.ru/elbrusoid-byoryu-bla-buzou/', desc: 'Короткий мультфильм с простыми диалогами.' },
  { id: 'prostokvashino', kind: 'cartoon', title: 'Простоквашинодан ючеулен', ru: 'Трое из Простоквашино', studio: 'Эльбрусоид', level: 'A2', href: 'https://karachay-tv.ru/elbrusoid-prostokvashinodan-yucheulen/', desc: 'Знаменитые реплики по-карачаево-балкарски, бытовая лексика.' },
  { id: 'oneki-ay', kind: 'cartoon', title: 'Онеки ай', ru: 'Двенадцать месяцев', studio: 'Эльбрусоид', level: 'A2', href: 'https://karachay-tv.ru/elbrusoid-oneki-ay/', desc: 'Сказка: названия месяцев и времён года.' },
  { id: 'it-dzhashau', kind: 'cartoon', title: 'Ит джашау', ru: '', level: 'A2', href: 'https://karachay-tv.ru/it-dzhashau/', desc: 'Мультфильм в карачаево-балкарской озвучке из каталога Karachay-TV.' },
  { id: 'kung-fu-panda', kind: 'cartoon', title: 'Кунг-фу Панда', ru: 'Кунг-фу Панда, 2008', level: 'B1', href: 'https://karachay-tv.ru/kung-fu-panda/', desc: 'Полнометражный: юмор, быстрые диалоги, слова про еду и тренировки.' },
  { id: 'erkeg-aiyu-2', kind: 'cartoon', title: 'Эркег айю 2', ru: 'Кунг-фу Панда 2, 2011', level: 'B1', href: 'https://karachay-tv.ru/erkeg-aiyu-2/', desc: 'Продолжение: удобно смотреть после первой части.' },
  { id: 'taulu-kishtik', kind: 'cartoon', title: 'Таулу киштик', ru: 'Кот в сапогах', studio: 'Алан-Ставрополь', level: 'B1', href: 'https://karachay-tv.ru/taulu-kishtik/', desc: 'Полнометражный, живая разговорная речь.' },
  { id: 'arbala', kind: 'cartoon', title: 'Арбала', ru: 'Тачки', studio: 'Эльбрусоид', level: 'B1', href: 'https://karachay-tv.ru/elbrusoid-arbala/', desc: 'Полнометражный, быстрые диалоги, лексика про машины и дорогу.' },
  { id: 'buzlama-zaman', kind: 'cartoon', title: 'Бузлама заман', ru: 'Ледниковый период 2', studio: 'Эльбрусоид', level: 'B1', href: 'https://karachay-tv.ru/elbrusoid-buzlama-zaman/', desc: 'Полнометражный, много юмора.' },
  { id: 'aslan-patchakh', kind: 'cartoon', title: 'Аслан патчах', ru: 'Король Лев', studio: 'Эльбрусоид', level: 'B1', href: 'https://karachay-tv.ru/elbrusoid-aslan-patchakh/', desc: 'Полнометражный, песни и развёрнутые диалоги.' },
  { id: 'suuuk-dzhyurek', kind: 'cartoon', title: 'Сууукъ джюрек', ru: 'Холодное сердце', studio: 'Эльбрусоид', level: 'B1', href: 'https://karachay-tv.ru/elbrusoid-cuuuk-dzhyurek/', desc: 'Полнометражный, песни и диалоги.' },
  // ---------- художественные фильмы ----------
  { id: 'terminal', kind: 'film', title: 'Терминал', ru: 'Терминал, 2004 (Том Хэнкс)', studio: 'Эльбрусоид', level: 'B1', href: 'https://karachay-tv.ru/elbrusoid-terminal/', desc: 'Герой застрял в аэропорту и учит чужой язык — тема как раз для изучающих. Речь неторопливая.' },
  { id: 'mister-pitkin', kind: 'film', title: 'Биткин', ru: 'Мистер Питкин (Норман Уиздом)', level: 'B1', href: 'https://karachay-tv.ru/mister-pitkin/', desc: 'Классическая британская комедия: много визуального юмора, реплики короткие.' },
  { id: 'vsegda-govori-da', kind: 'film', title: 'Огъай деген...', ru: 'Всегда говори «ДА», 2008 (Джим Керри)', level: 'B2', href: 'https://karachay-tv.ru/vsegda-govori-da/', desc: 'Комедия о человеке, который соглашается на всё. Быстрая разговорная речь.' },
  { id: 'v-dzhaze', kind: 'film', title: 'В джазе только девушки', ru: 'Some Like It Hot, 1959', level: 'B2', href: 'https://karachay-tv.ru/v-dzhaze-tolko-devushki/', desc: 'Классическая комедия Билли Уайлдера: игра слов и плотные диалоги.' },
  { id: 'tupoj-i-tupee', kind: 'film', title: 'Тупой и ещё тупее', ru: 'Dumb and Dumber, 1994', level: 'B2', href: 'https://karachay-tv.ru/tupoj-i-eshhyo-tupee/', desc: 'Комедия-путешествие с Джимом Керри: разговорная лексика и шутки.' },
  { id: 'unesyonnye', kind: 'film', title: 'Унесённые', ru: 'Swept Away, 2002', level: 'B2', href: 'https://karachay-tv.ru/unesyonnye/', desc: 'Двое оказываются на необитаемом острове: споры, бытовые диалоги.' },
  // ---------- документальные ----------
  { id: 'prigovoryonnye', kind: 'doc', title: 'Приговорённые к забвению', ru: '', level: 'B2', href: 'https://karachay-tv.ru/prigovoryonnye-k-zabveniyu/', desc: 'Документальный фильм на карачаево-балкарском: публицистическая речь, историческая лексика.' }
];
