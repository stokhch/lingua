// Популярные песни на немецком за последние ~50 лет: 10 карточек (песни, которые уже есть на полке
// «Песни и стихи» — «99 Luftballons», «Atemlos», — здесь не повторяются).
// Песни защищены авторским правом: в карточке — одна-две строки для разбора с переводом, полностью — по ссылке.
// yt — id официального видео на YouTube (найдено и проверено в ноябре 2026); если его нет, ссылка ведёт на поиск.
export const HITS_INTRO = 'Немецкие хиты с 1984 по 2014 год: Австрия и Германия, рок, поп и хип-хоп. Припевы этих песен знает вся Германия — их поют на стадионах и в караоке.';

export const HITS = [
  { id: 'de-hit-maenner', title: 'Männer', ru: 'Мужчины', artist: 'Herbert Grönemeyer', year: 1984, level: 'B1',
    desc: 'Прорыв Грёнемайера с альбома «4630 Bochum». Ироничный список того, какие бывают мужчины — и сильные, и ранимые. Почти каждая строка начинается со слова Männer.',
    phrases: [
      { text: 'Wann ist ein Mann ein Mann?', tr: 'Когда мужчина — настоящий мужчина?', note: 'wann — «когда» (в вопросе). Порядок слов в вопросе: вопросительное слово + глагол + подлежащее.' },
      { text: 'Männer nehmen in den Arm', tr: 'Мужчины обнимают', note: 'in den Arm nehmen — «обнять» (букв. «взять в руку»). Männer — мн. ч. от der Mann.' }
    ] },
  { id: 'de-hit-amadeus', title: 'Rock Me Amadeus', ru: 'Зажги меня, Амадей', artist: 'Falco', year: 1985, level: 'B1', yt: 'cVikZ8Oe_XA',
    desc: 'Австриец Фалько рассказывает о Моцарте как о рок-звезде своего времени. Единственная песня на немецком, ставшая № 1 в американском Billboard Hot 100.',
    phrases: [
      { text: 'Er war ein Punker und er lebte in der großen Stadt', tr: 'Он был панком и жил в большом городе', note: 'war, lebte — прошедшее время Präteritum (от sein и leben). in der großen Stadt — дательный падеж после in (где?).' },
      { text: 'Rock me, Amadeus', tr: 'Зажги меня, Амадей', note: 'Припев по-английски — Фалько смешивает языки, как многие австрийские поп-музыканты.' }
    ] },
  { id: 'de-hit-freiheit', title: 'Freiheit', ru: 'Свобода', artist: 'Marius Müller-Westernhagen', year: 1989, level: 'A2',
    desc: 'Песня вышла незадолго до падения Берлинской стены, и концертная версия 1990 года стала гимном объединения Германии. Медленная, с ясным произношением.',
    phrases: [
      { text: 'Freiheit, Freiheit ist die einzige, die fehlt', tr: 'Свобода — свобода единственное, чего не хватает', note: 'fehlen — «не хватать, отсутствовать». die Freiheit — женский род, отсюда die einzige.' }
    ] },
  { id: 'de-hit-du-hast', title: 'Du hast', ru: 'Ты (меня) / Ты ненавидишь', artist: 'Rammstein', year: 1997, level: 'A2', yt: 'W3q8Od5qJio',
    desc: 'Самая известная песня Rammstein в мире. Построена на игре слов: du hast («у тебя есть / ты (сделал)») звучит так же, как du hasst («ты ненавидишь»). Текст пародирует свадебную клятву.',
    phrases: [
      { text: 'Du hast mich gefragt und ich hab nichts gesagt', tr: 'Ты меня спросил(а), а я ничего не сказал', note: 'Perfekt: hast … gefragt, hab(e) … gesagt — разговорное прошедшее время. В песнях часто hab вместо habe.' },
      { text: 'Willst du bis der Tod euch scheidet…', tr: 'Хочешь ли ты, пока смерть не разлучит вас…', note: 'Формула из свадебной клятвы. bis — «пока не, до тех пор пока».' }
    ] },
  { id: 'de-hit-kompliment', title: 'Ein Kompliment', ru: 'Комплимент', artist: 'Sportfreunde Stiller', year: 2002, level: 'B1',
    desc: 'Признание в любви от мюнхенской инди-группы с альбома «Die gute Seite». Через несколько лет снова попала в чарты в «Unplugged»-версии и стала классикой свадеб.',
    phrases: [
      { text: 'Wenn man so will, bist du das Ziel einer langen Reise', tr: 'Если угодно, ты — цель долгого путешествия', note: 'wenn man so will — «если можно так сказать». После придаточного с wenn глагол bist стоит перед подлежащим. einer langen Reise — родительный падеж.' }
    ] },
  { id: 'de-hit-welle', title: 'Perfekte Welle', ru: 'Идеальная волна', artist: 'Juli', year: 2004, level: 'A2', yt: 'ad8ukI7Z-b8',
    desc: 'Дебютный хит группы из Гиссена — летняя песня о том, чтобы поймать свой момент. После цунами в Индийском океане в декабре 2004-го её на время перестали ставить на радио.',
    phrases: [
      { text: 'Das ist die perfekte Welle, das ist der perfekte Tag', tr: 'Это идеальная волна, это идеальный день', note: 'Удобная пара для родов: die Welle (ж. р.) → die perfekte, der Tag (м. р.) → der perfekte.' }
    ] },
  { id: 'de-hit-das-beste', title: 'Das Beste', ru: 'Самое лучшее', artist: 'Silbermond', year: 2006, level: 'A2', yt: 'LyYAQHDMqfA',
    desc: 'Баллада группы из Баутцена (Саксония), одна из самых популярных песен о любви на немецком. Её часто ставят на свадьбах.',
    phrases: [
      { text: 'Du bist das Beste, was mir je passiert ist', tr: 'Ты — лучшее, что со мной когда-либо случалось', note: 'das Beste, was… — «лучшее, что…»: после das Beste, das Alles и т. п. ставится was, а не das. je — «когда-либо». passieren в Perfekt с sein: ist passiert.' }
    ] },
  { id: 'de-hit-haus-am-see', title: 'Haus am See', ru: 'Дом у озера', artist: 'Peter Fox', year: 2008, level: 'B1', yt: 'YN2YT23x6J0',
    desc: 'Сольный хит берлинца Петера Фокса (группа Seeed) с альбома «Stadtaffe». Мечта о простой жизни: уехать, вернуться и жить в доме у озера с большой семьёй.',
    phrases: [
      { text: 'Und am Ende der Straße steht ein Haus am See', tr: 'А в конце улицы стоит дом у озера', note: 'am Ende der Straße — «в конце улицы» (der Straße — родительный падеж). am See = an dem See: der See — «озеро», а die See — «море».' }
    ] },
  { id: 'de-hit-tage', title: 'Tage wie diese', ru: 'Такие дни, как эти', artist: 'Die Toten Hosen', year: 2012, level: 'B1', yt: 'j09hpp3AxIE',
    desc: 'Панк-группа из Дюссельдорфа записала песню о лучших днях в жизни — и она стала главным гимном стадионов, футбольных побед и праздников 2010-х.',
    phrases: [
      { text: 'An Tagen wie diesen wünscht man sich Unendlichkeit', tr: 'В такие дни, как эти, хочется бесконечности', note: 'an Tagen — «в дни» (an + дательный для дат и дней). sich etwas wünschen — «желать себе чего-то». man — безличное «хочется, желают».' }
    ] },
  { id: 'de-hit-auf-uns', title: 'Auf uns', ru: 'За нас', artist: 'Andreas Bourani', year: 2014, level: 'A2',
    desc: 'Песня-тост, ставшая неофициальным гимном победы сборной Германии на чемпионате мира по футболу 2014 года.',
    phrases: [
      { text: 'Ein Hoch auf uns, auf dieses Leben', tr: 'Выпьем за нас, за эту жизнь', note: 'ein Hoch auf … — «ура / тост за …» (auf + винительный падеж): ein Hoch auf dich! — «за тебя!».' }
    ] }
];
