// Популярные песни на английском за последние ~50 лет: 10 карточек.
// Песни защищены авторским правом, поэтому текст целиком не приводится: в карточке — одна-две строки
// для разбора с переводом и пояснением, а полностью песню можно послушать по ссылке.
// yt — id официального видео на YouTube (найдено и проверено в ноябре 2026); если его нет, ссылка ведёт на поиск.
export const HITS_INTRO = 'Мировые хиты на английском с 1979 по 2019 год. Разберите фразы из карточки, а потом слушайте песню целиком — знакомые слова будут узнаваться на слух.';

export const HITS = [
  { id: 'en-hit-dont-stop', title: "Don't Stop Me Now", ru: 'Не останавливай меня', artist: 'Queen', year: 1979, level: 'B1', yt: 'HgzGwKwLmgM',
    desc: 'Песня Фредди Меркьюри из альбома «Jazz». В 1979-м была средним хитом, а сегодня — одна из самых прослушиваемых песен Queen: её ставят в фильмах, рекламе и на праздниках.',
    phrases: [
      { text: "Don't stop me now, I'm having such a good time", tr: 'Не останавливай меня сейчас, мне так хорошо', note: 'have a good time — «хорошо проводить время». Present Continuous (I’m having) — то, что происходит прямо сейчас.' },
      { text: "Don't stop me", tr: 'Не останавливай меня', note: 'Отрицательный приказ строится через don’t + глагол: don’t go, don’t worry.' }
    ] },
  { id: 'en-hit-billie-jean', title: 'Billie Jean', ru: 'Билли Джин', artist: 'Michael Jackson', year: 1983, level: 'A2', yt: 'Zi_XLOBDo_Y',
    desc: 'Сингл с альбома «Thriller» — самого продаваемого альбома в истории. На телешоу «Motown 25» под эту песню Майкл Джексон впервые показал «лунную походку».',
    phrases: [
      { text: 'Billie Jean is not my lover', tr: 'Билли Джин мне не возлюбленная', note: 'lover — «возлюбленный, любимый человек». Отрицание с to be: is not (isn’t).' },
      { text: 'The kid is not my son', tr: 'Этот ребёнок — не мой сын', note: 'kid — разговорное «ребёнок», нейтральное слово — child.' }
    ] },
  { id: 'en-hit-prayer', title: "Livin' on a Prayer", ru: 'Живём одной молитвой', artist: 'Bon Jovi', year: 1986, level: 'B1', yt: 'lDK9QqIzhwk',
    desc: 'Гимн стадионного рока с альбома «Slippery When Wet». История Томми и Джины — простой рабочей пары, которая держится друг за друга в трудные времена.',
    phrases: [
      { text: "Woah, we're half way there", tr: 'О-о, мы уже на полпути', note: 'half way there — «на полпути, полдела сделано». Устойчивое выражение.' },
      { text: "Livin' on a prayer", tr: 'Живём одной молитвой', note: 'Livin’ = living: в песнях и разговорной речи -ing часто звучит как -in’. live on something — «жить на что-то, держаться за счёт чего-то».' }
    ] },
  { id: 'en-hit-teen-spirit', title: 'Smells Like Teen Spirit', ru: 'Пахнет подростковым духом', artist: 'Nirvana', year: 1991, level: 'B2', yt: 'hTWKbfoikeg',
    desc: 'Песня, с которой гранж стал мировым явлением. Название — шутка: «Teen Spirit» — марка дезодоранта, а Курт Кобейн принял надпись подруги за лозунг.',
    phrases: [
      { text: 'Here we are now, entertain us', tr: 'Вот мы здесь — развлекайте нас', note: 'Here we are — «вот и мы». entertain — «развлекать», повелительное наклонение без you.' },
      { text: 'Smells like…', tr: 'Пахнет как…', note: 'smell like + существительное — «пахнуть чем-то»: It smells like coffee.' }
    ] },
  { id: 'en-hit-always', title: 'I Will Always Love You', ru: 'Я всегда буду любить тебя', artist: 'Whitney Houston', year: 1992, level: 'A2', yt: '3JWTaaS7LdU',
    desc: 'Песня Долли Партон 1974 года, которую Уитни Хьюстон перепела для фильма «Телохранитель». Её версия — один из самых продаваемых синглов в истории.',
    phrases: [
      { text: 'And I will always love you', tr: 'И я всегда буду любить тебя', note: 'will + глагол — будущее время, здесь — обещание. always стоит между will и глаголом.' },
      { text: 'Bittersweet memories', tr: 'Горько-сладкие воспоминания', note: 'bittersweet — «горький и сладкий одновременно»: о том, что и радует, и печалит.' }
    ] },
  { id: 'en-hit-wonderwall', title: 'Wonderwall', ru: 'Чудо-стена', artist: 'Oasis', year: 1995, level: 'B1', yt: 'bx1Bh8ZvH84',
    desc: 'Главный хит брит-попа с альбома «(What’s the Story) Morning Glory?». Слово «wonderwall» придумано: так называется альбом Джорджа Харрисона. Ноэл Галлахер объяснял его как «человек, который тебя спасёт».',
    phrases: [
      { text: "Because maybe, you're gonna be the one that saves me", tr: 'Потому что, может быть, именно ты меня спасёшь', note: 'gonna = going to — разговорное будущее время. the one that… — «тот самый, кто…».' },
      { text: "And after all, you're my wonderwall", tr: 'И в конце концов, ты — моя чудо-стена', note: 'after all — «в конце концов, всё-таки».' }
    ] },
  { id: 'en-hit-viva', title: 'Viva la Vida', ru: 'Да здравствует жизнь', artist: 'Coldplay', year: 2008, level: 'B2', yt: 'dvgZkm1xWPE',
    desc: 'Название взято с картины Фриды Кало (по-испански). Песня — монолог свергнутого короля, который вспоминает, как когда-то правил миром. Премия «Грэмми» как песня года.',
    phrases: [
      { text: 'I used to rule the world', tr: 'Когда-то я правил миром', note: 'used to + глагол — «раньше (а теперь нет)»: I used to live in Moscow.' },
      { text: 'Viva la vida', tr: 'Да здравствует жизнь (исп.)', note: 'Название по-испански; сама песня полностью на английском.' }
    ] },
  { id: 'en-hit-rolling', title: 'Rolling in the Deep', ru: 'Катясь в глубину', artist: 'Adele', year: 2010, level: 'B2', yt: 'C7qGwgILT1c',
    desc: 'Первый сингл с альбома «21». Адель написала песню после расставания — это злая и сильная песня-ответ. Название — от сленгового «roll deep» (иметь за спиной своих людей).',
    phrases: [
      { text: 'We could have had it all', tr: 'У нас могло быть всё', note: 'could have + 3-я форма (had) — «могло бы быть, но не случилось». Сожаление о прошлом.' },
      { text: 'Rolling in the deep', tr: 'Катясь в глубину', note: 'Образ из сленга roll deep — «быть с верными друзьями». Буквально перевести трудно.' }
    ] },
  { id: 'en-hit-shape', title: 'Shape of You', ru: 'Твоя фигура', artist: 'Ed Sheeran', year: 2017, level: 'A2', yt: 'JGwWNGJdvx8',
    desc: 'Самая прослушиваемая песня 2017 года и одна из первых, перешагнувших 3 миллиарда прослушиваний в Spotify. Простые слова и повторяющийся припев — хорошо для начинающих.',
    phrases: [
      { text: "I'm in love with the shape of you", tr: 'Я влюблён в твою фигуру', note: 'be in love with — «быть влюблённым в». shape — «форма, фигура».' },
      { text: 'Come on, be my baby', tr: 'Ну же, будь моей', note: 'come on — «ну же, давай». baby — ласковое обращение к любимому человеку.' }
    ] },
  { id: 'en-hit-blinding', title: 'Blinding Lights', ru: 'Ослепляющие огни', artist: 'The Weeknd', year: 2019, level: 'B1', yt: '4NRXx6U8ABQ',
    desc: 'Синти-поп в духе 1980-х. По итогам Billboard — лучшая песня в истории хит-парада Hot 100: она провела в нём 90 недель.',
    phrases: [
      { text: "I said, ooh, I'm blinded by the lights", tr: 'Я сказал: о-о, меня ослепляют огни', note: 'be blinded by — пассив: «быть ослеплённым чем-то». blind — «слепой», to blind — «ослеплять».' },
      { text: "No, I can't sleep until I feel your touch", tr: 'Нет, я не могу уснуть, пока не почувствую твоё прикосновение', note: 'until — «пока не»: после него глагол в настоящем времени, хотя речь о будущем.' }
    ] }
];
