// Немецкие песни и стихи: 10 самых известных (A1–B1). Формат как у английских и греческих песен:
// в начале — цитата для разбора (у современных песен — одна-две строки, у старинных песен и стихов,
// которые давно стали общественным достоянием, — строфа), дальше — рассказ о песне на простом немецком,
// написанный для Лингвы, перевод под спойлером, пересказ (summary), ссылки (links), иллюстрация (art)
// и свой набор слов (set → SONG_SETS, подключается в dictionary.js). Полный текст современных песен
// здесь не приводится — только по ссылкам.
export const TEXTS = [
  {
    id: 'de-song-tannenbaum', art: 'de-tannenbaum', set: 'song_de_tannenbaum', level: 'A1', shelf: 'songs', topic: 'Песни', kind: 'song',
    title: 'O Tannenbaum',
    note: 'Рождественская песня; текст Эрнста Аншютца (1824) на старинную народную мелодию — давно общественное достояние, первый куплет приведён полностью. Разбор: der Tannenbaum — ёлка (букв. «пихтовое дерево»), treu — верный, die Blätter — листья (здесь — хвоя), du grünst — ты зеленеешь, zur Sommerzeit — летом, wenn es schneit — когда идёт снег.',
    summary: 'Песня обращается к ёлке и хвалит её за верность: она зелёная не только летом, но и зимой, когда идёт снег. В других куплетах ёлка радует людей на Рождество и учит их надежде и постоянству. Обычай ставить дома наряженную ёлку пришёл из Германии: в XIX веке он распространился по всей Европе, а потом и по миру — вместе с этой песней (пересказ для Лингвы).',
    links: [
      { href: 'https://de.wikipedia.org/wiki/O_Tannenbaum', label: 'о песне и полный текст, Википедия (нем.)' },
      { href: 'https://en.wikipedia.org/wiki/O_Tannenbaum', label: 'O Tannenbaum, Википедия (англ.)' }
    ],
    translation: `О ёлочка, о ёлочка,
как верны твои листья!
Ты зеленеешь не только летом,
нет, и зимой, когда идёт снег.
О ёлочка, о ёлочка,
как верны твои листья!

Это старая песня. Мелодия очень старая, а слова написал Эрнст Аншютц в 1824 году. Он был учителем в Лейпциге.

Ёлка всегда зелёная. Летом она зелёная, и зимой она тоже зелёная. Поэтому песня говорит: ёлка верная.

Немцы поют эту песню на Рождество. Ёлка на Рождество — это немецкая традиция. Сегодня её знает весь мир.`,
    body: `O Tannenbaum, o Tannenbaum,
wie treu sind deine Blätter!
Du grünst nicht nur zur Sommerzeit,
nein, auch im Winter, wenn es schneit.
O Tannenbaum, o Tannenbaum,
wie treu sind deine Blätter!

Das ist ein altes Lied. Die Melodie ist sehr alt, und den Text hat Ernst Anschütz im Jahr 1824 geschrieben. Er war Lehrer in Leipzig.

Der Tannenbaum ist immer grün. Im Sommer ist er grün, und im Winter ist er auch grün. Darum sagt das Lied: Der Baum ist treu.

Die Deutschen singen das Lied zu Weihnachten. Der Weihnachtsbaum ist eine deutsche Tradition. Heute kennt ihn die ganze Welt.`
  },
  {
    id: 'de-song-voegel', art: 'de-voegel', set: 'song_de_voegel', level: 'A1', shelf: 'songs', topic: 'Песни', kind: 'song',
    title: 'Alle Vögel sind schon da',
    note: 'Весенняя детская песня на стихи Августа Генриха Гофмана фон Фаллерслебена (1835) — давно общественное достояние, первый куплет приведён полностью. Разбор: alle Vögel — все птицы, sind schon da — уже здесь, welch ein Singen — какое пение, pfeifen — свистеть, zwitschern — щебетать, tirilieren — заливаться трелями, der Frühling — весна, einmarschieren — входить маршем, mit Sang und Schalle — с песнями и звоном.',
    summary: 'Все птицы уже вернулись — и как они поют, свистят, щебечут и заливаются! Весна входит в город, как оркестр на параде. В других куплетах дрозд, зяблик, скворец и вся птичья компания желают людям счастливого года, а дети должны стать такими же весёлыми, как птицы. Автор слов, Гофман фон Фаллерслебен, написал и «Песнь немцев», которая сегодня стала гимном Германии (пересказ для Лингвы).',
    links: [
      { href: 'https://de.wikipedia.org/wiki/Alle_Vögel_sind_schon_da', label: 'о песне и полный текст, Википедия (нем.)' }
    ],
    translation: `Все птицы уже здесь,
все птицы, все!
Какое пение, музыка,
свист, щебет, трели!
Весна идёт к нам маршем,
приходит с песнями и звоном.

Это весёлая песня для детей. Её написал поэт Гофман фон Фаллерслебен в 1835 году.

Зима кончилась. Птицы вернулись из тёплых стран. Они сидят на деревьях и поют. Весна пришла!

В песне много птиц: дрозд, зяблик и скворец. Все они желают людям хорошего года. Дети в Германии поют эту песню в детском саду и в школе.`,
    body: `Alle Vögel sind schon da,
alle Vögel, alle!
Welch ein Singen, Musiziern,
Pfeifen, Zwitschern, Tiriliern!
Frühling will nun einmarschiern,
kommt mit Sang und Schalle.

Das ist ein fröhliches Lied für Kinder. Der Dichter Hoffmann von Fallersleben hat es im Jahr 1835 geschrieben.

Der Winter ist vorbei. Die Vögel sind aus den warmen Ländern zurückgekommen. Sie sitzen auf den Bäumen und singen. Der Frühling ist da!

Im Lied gibt es viele Vögel: die Amsel, den Fink und den Star. Alle wünschen den Menschen ein gutes Jahr. Kinder in Deutschland singen das Lied im Kindergarten und in der Schule.`
  },
  {
    id: 'de-song-stillenacht', art: 'de-stillenacht', set: 'song_de_stillenacht', level: 'A2', shelf: 'songs', topic: 'Песни', kind: 'song',
    title: 'Stille Nacht, heilige Nacht',
    note: 'Рождественская песня: слова Йозефа Мора (1816), музыка Франца Ксавера Грубера, впервые исполнена в сочельник 1818 года в Оберндорфе под Зальцбургом. Давно общественное достояние, первый куплет приведён полностью. Разбор: still — тихий, heilig — святой, einsam — одиноко, wacht — бодрствует, traut — милый, родной, hochheilig — пресвятой, das Paar — пара (Мария и Иосиф), hold — прелестный, der Knabe — мальчик, im lockigen Haar — с кудрявыми волосами, himmlisch — небесный, die Ruh(e) — покой.',
    summary: 'Тихая святая ночь: всё спит, не спят только Мария и Иосиф у колыбели прелестного кудрявого младенца — спи в небесном покое. Песню впервые спели в сочельник 1818 года в маленькой церкви в Оберндорфе: говорят, орган сломался, и Грубер сочинил мелодию для гитары. Потом её разнесли по Европе бродячие певцы из Тироля. Сегодня «Тихую ночь» поют на трёхстах языках, а в 2011 году ЮНЕСКО внесло её в список нематериального культурного наследия Австрии (пересказ для Лингвы).',
    links: [
      { href: 'https://de.wikipedia.org/wiki/Stille_Nacht,_heilige_Nacht', label: 'история песни и текст, Википедия (нем.)' },
      { href: 'https://en.wikipedia.org/wiki/Silent_Night', label: 'Silent Night, Википедия (англ.)' }
    ],
    translation: `Тихая ночь, святая ночь!
Всё спит, одиноко не спит
только милая пресвятая пара.
Прелестный мальчик с кудрявыми волосами,
спи в небесном покое,
спи в небесном покое!

Эта песня — из Австрии. Слова написал священник Йозеф Мор, а музыку — учитель Франц Грубер. Впервые её спели в маленькой церкви в Оберндорфе, недалеко от Зальцбурга, в сочельник 1818 года.

Говорят, что тогда в церкви сломался орган. Поэтому Мор и Грубер пели песню под гитару.

Песня рассказывает о ночи, когда родился Иисус. Всё тихо, все спят. Только Мария и Иосиф не спят и смотрят на ребёнка.

Сегодня эту песню поют на Рождество во всём мире, больше чем на трёхстах языках.`,
    body: `Stille Nacht, heilige Nacht!
Alles schläft, einsam wacht
nur das traute hochheilige Paar.
Holder Knabe im lockigen Haar,
schlaf in himmlischer Ruh,
schlaf in himmlischer Ruh!

Dieses Lied kommt aus Österreich. Den Text hat der Priester Joseph Mohr geschrieben, die Musik der Lehrer Franz Gruber. Zum ersten Mal hat man es in einer kleinen Kirche in Oberndorf bei Salzburg gesungen, am Heiligabend 1818.

Man erzählt, dass damals die Orgel in der Kirche kaputt war. Deshalb haben Mohr und Gruber das Lied mit der Gitarre gesungen.

Das Lied erzählt von der Nacht, in der Jesus geboren ist. Alles ist still, alle schlafen. Nur Maria und Josef schlafen nicht und schauen das Kind an.

Heute singt man dieses Lied zu Weihnachten auf der ganzen Welt, in mehr als dreihundert Sprachen.`
  },
  {
    id: 'de-song-luftballons', art: 'de-luftballons', set: 'song_de_luftballons', level: 'A2', shelf: 'songs', topic: 'Песни', kind: 'song',
    title: '99 Luftballons',
    note: 'Песня группы Nena (1983), слова Карло Каргеса, музыка Уве Фаренкрога-Петерсена. В начале — первые две строки (короткая цитата). Разбор: hast du etwas Zeit für mich — есть у тебя немного времени для меня, dann singe ich ein Lied für dich — тогда я спою для тебя песню. Полный текст — по ссылке.',
    summary: 'Девяносто девять воздушных шариков летят к горизонту. Радары принимают их за НЛО, генералы поднимают истребители, и из-за шариков начинается война. Через девяносто девять лет войны от мира остались одни руины; героиня находит в развалинах шарик, думает о любимом и отпускает его. Песня вышла в Западной Германии в 1983 году, в разгар холодной войны, когда люди боялись ядерной войны. Она поднялась на первые места хит-парадов во многих странах и стала одной из самых известных немецких песен в мире (пересказ для Лингвы).',
    links: [
      { href: 'https://de.wikipedia.org/wiki/99_Luftballons', label: 'о песне, Википедия (нем.)' },
      { href: 'https://en.wikipedia.org/wiki/99_Luftballons', label: '99 Luftballons, Википедия (англ.)' }
    ],
    translation: `Есть у тебя немного времени для меня?
Тогда я спою для тебя песню.

Это песня группы Nena из 1983 года. Певицу тоже зовут Нена.

Девяносто девять воздушных шариков летят по небу. Военные думают, что это опасные машины. Они посылают самолёты. Начинается война — из-за шариков!

После войны мир разрушен. Певица находит один шарик. Она думает о своём друге и отпускает шарик.

Тогда в Германии люди боялись войны между Востоком и Западом. Поэтому эта песня была очень важной. Её слушали во многих странах мира.`,
    body: `Hast du etwas Zeit für mich,
dann singe ich ein Lied für dich.

Das ist ein Lied von der Band Nena aus dem Jahr 1983. Die Sängerin heißt auch Nena.

Neunundneunzig Luftballons fliegen am Himmel. Die Soldaten denken, dass das gefährliche Maschinen sind. Sie schicken Flugzeuge. Ein Krieg beginnt, nur wegen der Luftballons!

Nach dem Krieg ist die Welt kaputt. Die Sängerin findet einen Luftballon. Sie denkt an ihren Freund und lässt den Ballon fliegen.

Damals hatten die Menschen in Deutschland Angst vor einem Krieg zwischen Ost und West. Deshalb war das Lied sehr wichtig. Man hat es in vielen Ländern der Welt gehört.`
  },
  {
    id: 'de-song-atemlos', art: 'de-atemlos', set: 'song_de_atemlos', level: 'A2', shelf: 'songs', topic: 'Песни', kind: 'song',
    title: 'Atemlos durch die Nacht',
    note: 'Шлягер Хелены Фишер (2013), автор песни — Кристина Бах. В начале — две строки припева (короткая цитата). Разбор: atemlos — без дыхания, запыхавшись (der Atem — дыхание, -los — без), durch die Nacht — сквозь ночь, bis ein neuer Tag erwacht — пока не проснётся новый день. Полный текст — по ссылке.',
    summary: 'Влюблённые всю ночь танцуют и мчатся сквозь город, не переводя дыхания, пока не наступит утро. Им кажется, что они непобедимы и что эта ночь никогда не кончится. Шлягер — немецкая эстрадная песня с простой мелодией, под которую поют все. «Atemlos» стала самой известной песней жанра XXI века: её поют на свадьбах, на дискотеках и на стадионах, а Хелена Фишер — одна из самых успешных певиц в истории Германии (пересказ для Лингвы).',
    links: [
      { href: 'https://de.wikipedia.org/wiki/Atemlos_durch_die_Nacht', label: 'о песне, Википедия (нем.)' },
      { href: 'https://en.wikipedia.org/wiki/Atemlos_durch_die_Nacht', label: 'Atemlos durch die Nacht, Википедия (англ.)' }
    ],
    translation: `Без дыхания сквозь ночь,
пока не проснётся новый день.

Это песня Хелены Фишер из 2013 года. Хелена Фишер родилась в Красноярске, а потом её семья переехала в Германию. Сегодня она — одна из самых известных певиц Германии.

Песня рассказывает о любви. Двое танцуют всю ночь и не устают. Им кажется, что ночь никогда не кончится.

Это шлягер. Шлягеры — весёлые немецкие песни с простой музыкой. Их поют на праздниках и на свадьбах. «Atemlos» знает почти каждый немец.`,
    body: `Atemlos durch die Nacht,
bis ein neuer Tag erwacht.

Das ist ein Lied von Helene Fischer aus dem Jahr 2013. Helene Fischer ist in Krasnojarsk geboren, und dann ist ihre Familie nach Deutschland gezogen. Heute ist sie eine der bekanntesten Sängerinnen in Deutschland.

Das Lied erzählt von der Liebe. Zwei Menschen tanzen die ganze Nacht und werden nicht müde. Sie denken, dass die Nacht nie zu Ende geht.

Das ist ein Schlager. Schlager sind fröhliche deutsche Lieder mit einfacher Musik. Man singt sie auf Festen und auf Hochzeiten. Fast jeder Deutsche kennt „Atemlos“.`
  },
  {
    id: 'de-song-lorelei', art: 'de-lorelei', set: 'song_de_lorelei', level: 'B1', shelf: 'songs', topic: 'Песни', kind: 'song',
    title: 'Die Lorelei',
    note: 'Стихотворение Генриха Гейне (1824), песня Фридриха Зильхера (1837) — давно общественное достояние, первая строфа приведена полностью. Разбор: ich weiß nicht, was soll es bedeuten — не знаю, что это значит, dass ich so traurig bin — что мне так грустно, ein Märchen aus alten Zeiten — сказка давних времён, das kommt mir nicht aus dem Sinn — не идёт у меня из головы.',
    summary: 'Поэту грустно, и он не знает почему: из головы не идёт старая сказка. Вечер, прохладный воздух, тихо течёт Рейн, вершина горы горит в закатном солнце. Наверху, на скале, сидит прекрасная девушка, расчёсывает золотые волосы золотым гребнем и поёт удивительную песню. Лодочник внизу слушает её, забывает о скалах и смотрит только вверх — и волны поглощают и лодку, и лодочника. Так своим пением сделала Лорелея. Скала Лорелей действительно стоит над узким опасным местом Рейна, и песню Гейне и Зильхера знает каждый немец (пересказ для Лингвы).',
    links: [
      { href: 'https://de.wikisource.org/wiki/Ich_weiß_nicht_was_soll_es_bedeuten', label: 'полный текст, Викитека (нем.)' },
      { href: 'https://de.wikipedia.org/wiki/Lore-Ley_(Heine)', label: 'о стихотворении, Википедия (нем.)' }
    ],
    translation: `Не знаю, что это значит,
что мне так грустно;
сказка давних времён
не идёт у меня из головы.

Это стихотворение написал Генрих Гейне в 1824 году. Позже Фридрих Зильхер написал к нему музыку, и стихотворение стало песней.

Лорелея — это высокая скала на Рейне. В этом месте река узкая и опасная. Раньше там часто тонули лодки.

Старая легенда рассказывает: наверху на скале сидит красивая девушка. У неё золотые волосы. Она расчёсывает их и поёт. Лодочник слышит песню и смотрит только наверх. Он не видит скал, и лодка тонет.

Сегодня туристы плывут на корабле по Рейну мимо скалы Лорелей и слушают эту песню.`,
    body: `Ich weiß nicht, was soll es bedeuten,
dass ich so traurig bin;
ein Märchen aus alten Zeiten,
das kommt mir nicht aus dem Sinn.

Dieses Gedicht hat Heinrich Heine im Jahr 1824 geschrieben. Später hat Friedrich Silcher die Musik dazu komponiert, und so ist das Gedicht ein Lied geworden.

Die Lorelei ist ein hoher Felsen am Rhein. An dieser Stelle ist der Fluss schmal und gefährlich. Früher sind dort oft Boote untergegangen.

Eine alte Legende erzählt: Oben auf dem Felsen sitzt eine schöne Frau. Sie hat goldene Haare. Sie kämmt ihre Haare und singt. Der Schiffer hört das Lied und schaut nur nach oben. Er sieht die Felsen nicht, und das Boot geht unter.

Heute fahren Touristen mit dem Schiff auf dem Rhein an der Lorelei vorbei und hören dieses Lied.`
  },
  {
    id: 'de-poem-erlkoenig', art: 'de-erlkoenig', set: 'song_de_erlkoenig', level: 'B1', shelf: 'songs', topic: 'Стихи', kind: 'poem',
    title: 'Erlkönig',
    note: 'Баллада Иоганна Вольфганга Гёте (1782), песня Франца Шуберта (1815) — давно общественное достояние, первая строфа приведена полностью. Разбор: wer reitet so spät — кто скачет так поздно, durch Nacht und Wind — сквозь ночь и ветер, der Knabe — мальчик, wohl — крепко, надёжно, er fasst ihn sicher — он держит его крепко, er hält ihn warm — он греет его. По-русски балладу знают в переводе Жуковского «Лесной царь».',
    summary: 'Ночью отец скачет на коне сквозь ветер и крепко держит в руках сына. Мальчику страшно: он видит Лесного царя в короне и с длинным шлейфом. Отец успокаивает его: это туман, это шелестят листья, это блестят старые ивы. А Лесной царь манит ребёнка ласковыми словами, обещает игры, цветы и своих дочерей, а потом грозит силой. Отец в ужасе скачет быстрее и с трудом добирается до двора — но ребёнок в его руках мёртв. Баллада построена как диалог четырёх голосов, и Шуберт написал к ней одну из самых знаменитых песен в истории музыки (пересказ для Лингвы).',
    links: [
      { href: 'https://de.wikisource.org/wiki/Erlkönig_(Goethe)', label: 'полный текст, Викитека (нем.)' },
      { href: 'https://ru.wikipedia.org/wiki/Лесной_царь', label: '«Лесной царь», Википедия (рус.)' }
    ],
    translation: `Кто скачет так поздно сквозь ночь и ветер?
Это отец со своим ребёнком;
он крепко держит мальчика в руках,
он держит его надёжно, он греет его.

Это баллада Иоганна Вольфганга Гёте из 1782 года. Баллада — это стихотворение, которое рассказывает историю. Франц Шуберт написал к ней музыку, когда ему было всего восемнадцать лет.

Ночь, сильный ветер. Отец скачет на лошади через лес. Он держит своего больного сына. Мальчик видит Лесного царя. Царь зовёт мальчика к себе. Он обещает ему игрушки, цветы и красивые платья.

Отец не видит царя. Он говорит: «Это только туман, это только ветер». Но мальчику всё страшнее. Отец скачет всё быстрее. Когда он приезжает домой, ребёнок уже мёртв.

В России эту балладу знают в переводе Василия Жуковского — «Лесной царь».`,
    body: `Wer reitet so spät durch Nacht und Wind?
Es ist der Vater mit seinem Kind;
er hat den Knaben wohl in dem Arm,
er fasst ihn sicher, er hält ihn warm.

Das ist eine Ballade von Johann Wolfgang von Goethe aus dem Jahr 1782. Eine Ballade ist ein Gedicht, das eine Geschichte erzählt. Franz Schubert hat die Musik dazu komponiert, als er erst achtzehn Jahre alt war.

Es ist Nacht, es gibt starken Wind. Ein Vater reitet mit dem Pferd durch den Wald. Er hält seinen kranken Sohn. Der Junge sieht den Erlkönig. Der König ruft den Jungen zu sich. Er verspricht ihm Spiele, Blumen und schöne Kleider.

Der Vater sieht den König nicht. Er sagt: „Das ist nur Nebel, das ist nur der Wind.“ Aber der Junge hat immer mehr Angst. Der Vater reitet immer schneller. Als er nach Hause kommt, ist das Kind schon tot.

In Russland kennt man diese Ballade in der Übersetzung von Wassili Schukowski.`
  },
  {
    id: 'de-poem-freude', art: 'de-freude', set: 'song_de_freude', level: 'B1', shelf: 'songs', topic: 'Стихи', kind: 'poem',
    title: 'Ode an die Freude',
    note: '«Ода к радости» Фридриха Шиллера (1785) — финал Девятой симфонии Бетховена (1824) и гимн Европейского союза. Стихи давно общественное достояние, первая строфа приведена полностью (в редакции, которую поёт хор у Бетховена). Разбор: der Götterfunken — искра богов, Elysium — Элизиум, рай греческих героев, feuertrunken — опьянённые огнём, das Heiligtum — святилище, der Zauber — волшебство, чары, was die Mode streng geteilt — что строго разделили обычаи, alle Menschen werden Brüder — все люди становятся братьями, wo dein sanfter Flügel weilt — где пребывает твоё нежное крыло.',
    summary: 'Поэт славит Радость — прекрасную искру богов и дочь Элизиума. Опьянённые её огнём, люди входят в её святилище; её волшебство снова соединяет то, что разделили строгие обычаи, и там, где пребывает её крыло, все люди становятся братьями. Шиллер написал оду в 1785 году для дружеского кружка. Почти через сорок лет уже глухой Бетховен положил её на музыку в финале Девятой симфонии — впервые в симфонии запел хор. Мелодия «Оды к радости» — официальный гимн Европы, а рукопись симфонии входит в реестр «Память мира» ЮНЕСКО (пересказ для Лингвы).',
    links: [
      { href: 'https://de.wikisource.org/wiki/An_die_Freude_(1808)', label: 'полный текст, Викитека (нем.)' },
      { href: 'https://de.wikipedia.org/wiki/An_die_Freude', label: 'о стихотворении, Википедия (нем.)' }
    ],
    translation: `Радость, прекрасная искра богов,
дочь Элизиума,
мы входим, опьянённые огнём,
небесная, в твоё святилище!
Твоё волшебство снова соединяет,
что строго разделили обычаи;
все люди становятся братьями
там, где пребывает твоё нежное крыло.

Это стихотворение Фридриха Шиллера из 1785 года. Почти через сорок лет Людвиг ван Бетховен написал к нему музыку. Она звучит в конце его Девятой симфонии.

Тогда Бетховен уже почти ничего не слышал. Но он написал одну из самых известных мелодий в мире. Впервые в симфонии пел хор.

Поэт говорит: радость объединяет людей. Богатые и бедные, люди из разных стран становятся братьями.

Сегодня мелодия «Оды к радости» — гимн Европы. Её играют на праздниках, а на Новый год в Германии часто слушают Девятую симфонию.`,
    body: `Freude, schöner Götterfunken,
Tochter aus Elysium,
wir betreten feuertrunken,
Himmlische, dein Heiligtum!
Deine Zauber binden wieder,
was die Mode streng geteilt;
alle Menschen werden Brüder,
wo dein sanfter Flügel weilt.

Dieses Gedicht hat Friedrich Schiller im Jahr 1785 geschrieben. Fast vierzig Jahre später hat Ludwig van Beethoven die Musik dazu komponiert. Man hört sie am Ende seiner Neunten Sinfonie.

Damals konnte Beethoven fast nichts mehr hören. Aber er hat eine der bekanntesten Melodien der Welt geschrieben. Zum ersten Mal hat in einer Sinfonie ein Chor gesungen.

Der Dichter sagt: Die Freude bringt die Menschen zusammen. Reiche und Arme, Menschen aus verschiedenen Ländern werden Brüder.

Heute ist die Melodie der „Ode an die Freude“ die Hymne Europas. Man spielt sie bei Festen, und zu Silvester hört man in Deutschland oft die Neunte Sinfonie.`
  },
  {
    id: 'de-poem-lied-der-deutschen', art: 'de-hymne', set: 'song_de_hymne', level: 'B1', shelf: 'songs', topic: 'Стихи', kind: 'poem',
    title: 'Das Lied der Deutschen',
    note: '«Песнь немцев» Августа Генриха Гофмана фон Фаллерслебена (1841) на мелодию Йозефа Гайдна. Её третья строфа — государственный гимн Германии. Стихи давно общественное достояние, третья строфа приведена полностью. Разбор: die Einigkeit — единство, das Recht — право, die Freiheit — свобода, das Vaterland — отечество, danach lasst uns alle streben — к этому давайте все стремиться, brüderlich — по-братски, mit Herz und Hand — сердцем и рукой, des Glückes Unterpfand — залог счастья, blüh im Glanze — цвети в блеске.',
    summary: 'Единство, право и свобода для немецкого отечества — к этому давайте все стремиться по-братски, сердцем и рукой. Единство, право и свобода — залог счастья: цвети в блеске этого счастья, немецкое отечество! Гофман фон Фаллерслебен написал песню в 1841 году на острове Гельголанд, когда Германия была разделена на много маленьких государств, и мечтал о единой свободной стране. Мелодию Гайдн сочинил в 1797 году для австрийского императорского гимна. С 1952 года гимном ФРГ служит только третья строфа, а после объединения 1990 года — гимном всей Германии (пересказ для Лингвы).',
    links: [
      { href: 'https://de.wikipedia.org/wiki/Das_Lied_der_Deutschen', label: 'история и полный текст, Википедия (нем.)' },
      { href: 'https://en.wikipedia.org/wiki/Deutschlandlied', label: 'Deutschlandlied, Википедия (англ.)' }
    ],
    translation: `Единство, право и свобода
для немецкого отечества!
К этому давайте все стремиться
по-братски, сердцем и рукой!
Единство, право и свобода —
залог счастья.
Цвети в блеске этого счастья,
цвети, немецкое отечество!

Это третья строфа «Песни немцев». Её написал поэт Гофман фон Фаллерслебен в 1841 году на острове Гельголанд. Музыка ещё старше: её сочинил Йозеф Гайдн в 1797 году.

Тогда единой Германии не было. Было много маленьких стран. Поэт мечтал об одной свободной стране для всех немцев.

Сегодня гимн Германии — только третья строфа. Её поют на праздниках и перед футбольными матчами.`,
    body: `Einigkeit und Recht und Freiheit
für das deutsche Vaterland!
Danach lasst uns alle streben
brüderlich mit Herz und Hand!
Einigkeit und Recht und Freiheit
sind des Glückes Unterpfand –
blüh im Glanze dieses Glückes,
blühe, deutsches Vaterland!

Das ist die dritte Strophe vom „Lied der Deutschen“. Der Dichter Hoffmann von Fallersleben hat sie im Jahr 1841 auf der Insel Helgoland geschrieben. Die Musik ist noch älter: Joseph Haydn hat sie im Jahr 1797 komponiert.

Damals gab es kein einiges Deutschland. Es gab viele kleine Länder. Der Dichter hat von einem freien Land für alle Deutschen geträumt.

Heute ist nur die dritte Strophe die Hymne von Deutschland. Man singt sie bei Festen und vor Fußballspielen.`
  },
  {
    id: 'de-song-lilimarleen', art: 'de-lilimarleen', set: 'song_de_lilimarleen', level: 'B1', shelf: 'songs', topic: 'Песни', kind: 'song',
    title: 'Lili Marleen',
    note: 'Песня на стихи Ханса Ляйпа (1915), музыка Норберта Шульце (1938), первая исполнительница — Лале Андерсен. В начале — первые две строки (короткая цитата). Разбор: vor der Kaserne — перед казармой, vor dem großen Tor — перед большими воротами, stand eine Laterne — стоял фонарь, und steht sie noch davor — и стоит он там до сих пор. Полный текст — по ссылке.',
    summary: 'Перед казармой у больших ворот стоит фонарь. Под ним солдат встречался со своей девушкой Лили Марлен, и их тени сливались в одну. Теперь его зовут на службу, и он вспоминает её шаги и голос; если с ним что-то случится, кто будет стоять под фонарём с Лили Марлен? Ханс Ляйп написал стихи в 1915 году, в Первую мировую войну. Во Вторую мировую песню каждый вечер передавало радио, и её любили солдаты по обе стороны фронта — она звучала и по-немецки, и по-английски, и по-русски. Марлен Дитрих сделала её всемирно известной (пересказ для Лингвы).',
    links: [
      { href: 'https://de.wikipedia.org/wiki/Lili_Marleen', label: 'история песни, Википедия (нем.)' },
      { href: 'https://en.wikipedia.org/wiki/Lili_Marleen', label: 'Lili Marleen, Википедия (англ.)' }
    ],
    translation: `Перед казармой, перед большими воротами
стоял фонарь, и он всё ещё стоит там.

Эти стихи написал Ханс Ляйп в 1915 году, во время Первой мировой войны. Он был молодым солдатом в Берлине. Музыку написал Норберт Шульце в 1938 году.

Под фонарём у казармы солдат встречался со своей девушкой. Её зовут Лили Марлен. Теперь солдат должен уйти. Он думает о ней и спрашивает: кто будет стоять с ней под фонарём, если я не вернусь?

Во время Второй мировой войны песню каждый вечер передавали по радио. Её слушали солдаты в разных странах, даже враги. Песню пели на многих языках. Певица Марлен Дитрих сделала её знаменитой во всём мире.`,
    body: `Vor der Kaserne, vor dem großen Tor,
stand eine Laterne, und steht sie noch davor.

Diesen Text hat Hans Leip im Jahr 1915 geschrieben, im Ersten Weltkrieg. Er war ein junger Soldat in Berlin. Die Musik hat Norbert Schultze im Jahr 1938 komponiert.

Unter der Laterne vor der Kaserne hat sich ein Soldat mit seiner Freundin getroffen. Sie heißt Lili Marleen. Jetzt muss der Soldat weggehen. Er denkt an sie und fragt: Wer steht mit ihr unter der Laterne, wenn ich nicht zurückkomme?

Im Zweiten Weltkrieg hat das Radio das Lied jeden Abend gespielt. Soldaten in verschiedenen Ländern haben es gehört, sogar die Feinde. Man hat das Lied in vielen Sprachen gesungen. Die Sängerin Marlene Dietrich hat es auf der ganzen Welt berühmt gemacht.`
  }
];

// Наборы слов из песен (формат как в dictionary.js: «der Hund|собака|формы»)
export const SONG_SETS = {
  song_de_tannenbaum: { title: 'Песня «O Tannenbaum»', desc: 'Ёлка, зима, Рождество и верность', words: `der Tannenbaum|ель, ёлка|Tannenbäume
der Weihnachtsbaum|рождественская ёлка
das Weihnachten|Рождество
treu|верный
das Blatt|лист|Blätter
grün|зелёный
grünen|зеленеть|grünst
der Sommer|лето
die Sommerzeit|летняя пора, лето
der Winter|зима
schneien|идти (о снеге)|schneit
der Schnee|снег
immer|всегда
nicht nur|не только
auch|тоже, также
das Lied|песня|Lieder
die Melodie|мелодия|Melodien
der Lehrer|учитель
die Tradition|традиция
singen|петь|singt,sang,gesungen
alt|старый
die Welt|мир` },
  song_de_voegel: { title: 'Песня «Alle Vögel sind schon da»', desc: 'Весна, птицы, пение и музыка', words: `der Vogel|птица|Vögel
schon|уже
da|здесь, тут
der Frühling|весна
singen|петь|singt,sang,gesungen
pfeifen|свистеть
zwitschern|щебетать
tirilieren|заливаться трелями|tiriliern
musizieren|музицировать|musiziern
einmarschieren|входить маршем|einmarschiern
der Schall|звон, звук|Schalle
die Amsel|чёрный дрозд|Amseln
der Fink|зяблик|Finken
der Star|скворец; звезда (о человеке)
der Baum|дерево|Bäume
sitzen|сидеть
warm|тёплый
zurückkommen|возвращаться|zurückgekommen
vorbei|кончилось, прошло; мимо
fröhlich|весёлый
wünschen|желать
der Kindergarten|детский сад
der Dichter|поэт` },
  song_de_stillenacht: { title: 'Песня «Stille Nacht»', desc: 'Сочельник, церковь, тишина и покой', words: `still|тихий
heilig|святой
die Nacht|ночь|Nächte
schlafen|спать|schläft,schlief,geschlafen
einsam|одинокий; одиноко
wachen|бодрствовать, не спать|wacht
traut|милый, родной (поэт.)
das Paar|пара
hold|прелестный (поэт.)
der Knabe|мальчик (устар.)|Knaben
lockig|кудрявый
das Haar|волосы|Haare
himmlisch|небесный
die Ruhe|покой|Ruh
der Heiligabend|сочельник
die Kirche|церковь
der Priester|священник
die Orgel|орган
kaputt|сломанный
die Gitarre|гитара
geboren|рождённый (ist geboren — родился)
das Kind|ребёнок|Kinder` },
  song_de_luftballons: { title: 'Песня «99 Luftballons»', desc: 'Воздушные шары, небо, война и мир', words: `der Luftballon|воздушный шар|Luftballons
der Ballon|воздушный шар|Ballons
die Zeit|время
das Lied|песня|Lieder
fliegen|летать|flog,geflogen
der Himmel|небо
der Soldat|солдат|Soldaten
gefährlich|опасный
die Maschine|машина, механизм|Maschinen
schicken|посылать
das Flugzeug|самолёт|Flugzeuge
der Krieg|война|Kriege
beginnen|начинаться|begann,begonnen
wegen|из-за
kaputt|разрушенный, сломанный
finden|находить|fand,gefunden
denken|думать|dachte,gedacht
die Angst|страх
der Osten|восток
der Westen|запад
wichtig|важный
die Sängerin|певица|Sängerinnen` },
  song_de_atemlos: { title: 'Песня «Atemlos durch die Nacht»', desc: 'Шлягер: ночь, танцы, любовь и праздник', words: `atemlos|без дыхания, запыхавшись
der Atem|дыхание
durch|через, сквозь
die Nacht|ночь|Nächte
neu|новый
der Tag|день|Tage
erwachen|просыпаться
die Liebe|любовь
tanzen|танцевать
müde|усталый
nie|никогда
das Ende|конец (zu Ende — закончиться)
der Schlager|шлягер
fröhlich|весёлый
einfach|простой
die Musik|музыка
das Fest|праздник|Feste
die Hochzeit|свадьба|Hochzeiten
bekannt|известный
die Familie|семья
ziehen|тянуть; переезжать|zog,gezogen
fast|почти` },
  song_de_lorelei: { title: 'Песня «Die Lorelei»', desc: 'Рейн, скала, легенда и прекрасная певица', words: `wissen|знать|weiß,wusste,gewusst
bedeuten|значить
traurig|грустный
das Märchen|сказка
die Zeit|время; Zeiten — времена
der Sinn|ум, смысл (aus dem Sinn — из головы)
das Gedicht|стихотворение
der Felsen|скала
der Rhein|Рейн
der Fluss|река
schmal|узкий
gefährlich|опасный
die Stelle|место
das Boot|лодка|Boote
untergehen|тонуть|untergegangen,geht unter
die Legende|легенда
oben|наверху
golden|золотой|goldene
kämmen|расчёсывать|kämmt
der Schiffer|лодочник
schauen|смотреть
komponieren|сочинять музыку
das Schiff|корабль` },
  song_de_erlkoenig: { title: 'Стихи «Erlkönig»', desc: 'Баллада Гёте: ночь, ветер, лес и Лесной царь', words: `reiten|скакать верхом|reitet,ritt,geritten
spät|поздно
der Wind|ветер
der Vater|отец
der Knabe|мальчик (устар.)|Knaben
der Arm|рука|Arme
fassen|хватать, держать|fasst
sicher|надёжный; надёжно
halten|держать|hält,hielt,gehalten
warm|тёплый
die Ballade|баллада
der Erlkönig|Лесной царь
der König|король, царь
das Pferd|лошадь
der Wald|лес
krank|больной
der Junge|мальчик
rufen|звать|ruft,rief,gerufen
versprechen|обещать|verspricht,versprach,versprochen
der Nebel|туман
die Angst|страх
schnell|быстрый
tot|мёртвый
die Übersetzung|перевод` },
  song_de_freude: { title: 'Стихи «Ode an die Freude»', desc: 'Шиллер и Бетховен: радость, братство и гимн Европы', words: `die Freude|радость
schön|прекрасный
der Götterfunken|искра богов
die Tochter|дочь
betreten|входить, ступать
feuertrunken|опьянённый огнём
himmlisch|небесный
das Heiligtum|святилище
der Zauber|волшебство, чары
binden|связывать
wieder|снова
die Mode|мода; обычай
streng|строгий
teilen|делить|geteilt
der Mensch|человек|Menschen
der Bruder|брат|Brüder
sanft|нежный
der Flügel|крыло
weilen|пребывать (поэт.)|weilt
die Ode|ода
die Sinfonie|симфония
der Chor|хор
die Hymne|гимн
reich|богатый
verschieden|разный` },
  song_de_hymne: { title: 'Стихи «Das Lied der Deutschen»', desc: 'Гимн Германии: единство, право и свобода', words: `die Einigkeit|единство
das Recht|право
die Freiheit|свобода
deutsch|немецкий
das Vaterland|отечество, родина
streben|стремиться
brüderlich|по-братски
das Herz|сердце
die Hand|рука|Hände
das Glück|счастье
das Unterpfand|залог
blühen|цвести|blüh,blühe
der Glanz|блеск, сияние|Glanze
die Strophe|строфа
die Insel|остров
einig|единый|einiges
frei|свободный
träumen|мечтать
klein|маленький
das Land|страна|Länder
das Fußballspiel|футбольный матч|Fußballspielen
der Dichter|поэт` },
  song_de_lilimarleen: { title: 'Песня «Lili Marleen»', desc: 'Солдатская песня: казарма, фонарь, разлука', words: `die Kaserne|казарма
das Tor|ворота
die Laterne|фонарь
stehen|стоять|steht,stand,gestanden
davor|перед этим, впереди
noch|ещё
der Soldat|солдат|Soldaten
der Weltkrieg|мировая война
jung|молодой
treffen|встречать|trifft,traf,getroffen
die Freundin|подруга, девушка
weggehen|уходить
zurückkommen|возвращаться|zurückkomme
das Radio|радио
der Abend|вечер
der Feind|враг|Feinde
die Sängerin|певица
berühmt|знаменитый
die Sprache|язык|Sprachen
unter|под
fragen|спрашивать` }
};

// Остальные слова из рассказов о песнях — в словарь, но не в наборы
export const WORDS = `
o|о! (восклицание)
der Tannenbaum|ель, ёлка|Tannenbäume
die Sommerzeit|летняя пора, лето
die Melodie|мелодия|Melodien
Anschütz|Аншютц (фамилия; Эрнст Аншютц — учитель и поэт)
Leipzig|Лейпциг
welch|какой (восклицание: welch ein … — какой …!)
musizieren|музицировать, играть музыку|musiziern
pfeifen|свистеть
zwitschern|щебетать
tirilieren|заливаться трелями|tiriliern
nun|теперь, вот
einmarschieren|входить маршем|einmarschiern
der Schall|звон, звук|Schalle
Hoffmann|Гофман (Август Генрих Гофман фон Фаллерслебен — поэт)
Fallersleben|Фаллерслебен (городок; часть имени поэта)
vorbei|мимо; прошло, кончилось
zurückkommen|возвращаться|zurückgekommen,zurückkomme,kam zurück
die Amsel|чёрный дрозд|Amseln
der Fink|зяблик|Finken
der Kindergarten|детский сад
heilig|святой|heilige,heiligen
traut|милый, родной (поэт.)|traute
hochheilig|пресвятой|hochheilige
hold|прелестный, милый (поэт.)|holder
der Knabe|мальчик (устар.)|Knaben
himmlisch|небесный|himmlischer,himmlische
die Ruhe|покой, тишина|Ruh
der Priester|священник
Joseph|Йозеф (имя)
Mohr|Мор (фамилия; Йозеф Мор — священник и поэт)
Franz|Франц (имя)
Gruber|Грубер (фамилия; Франц Ксавер Грубер — композитор)
Oberndorf|Оберндорф (городок под Зальцбургом)
Salzburg|Зальцбург
der Heiligabend|сочельник (24 декабря)
damals|тогда, в то время
die Orgel|орган (инструмент)
Jesus|Иисус
Maria|Мария
Josef|Иосиф
dreihundert|триста
Nena|Нена (певица и группа)
die Sängerin|певица|Sängerinnen
neunundneunzig|девяносто девять
die Maschine|машина, механизм|Maschinen
der Ballon|воздушный шар|Ballons
atemlos|запыхавшись, без дыхания
erwachen|просыпаться
Helene|Хелена (имя)
Krasnojarsk|Красноярск
Heinrich|Генрих (имя)
Heine|Гейне (фамилия; Генрих Гейне — поэт)
Friedrich|Фридрих (имя)
Silcher|Зильхер (фамилия; Фридрих Зильхер — композитор)
dazu|к этому, к тому
komponieren|сочинять музыку
Lorelei|Лорелея (скала на Рейне и героиня легенды)
untergehen|тонуть; заходить (о солнце)|untergegangen,geht unter
die Legende|легенда
wohl|хорошо, крепко; наверное
die Ballade|баллада
Johann|Иоганн (имя)
Wolfgang|Вольфганг (имя)
Goethe|Гёте (фамилия; Иоганн Вольфганг фон Гёте — поэт)
Schubert|Шуберт (фамилия; Франц Шуберт — композитор)
der Erlkönig|Лесной царь (букв. «король ольхи»)
der König|король, царь
der Nebel|туман
tot|мёртвый
Wassili|Василий (имя)
Schukowski|Жуковский (фамилия; Василий Жуковский — поэт)
der Götterfunken|искра богов
Elysium|Элизиум (рай древних греков)
betreten|входить, ступать
feuertrunken|опьянённый огнём
das Heiligtum|святилище
der Zauber|волшебство, чары
binden|связывать, соединять
sanft|нежный, мягкий|sanfter
Schiller|Шиллер (фамилия; Фридрих Шиллер — поэт)
Ludwig|Людвиг (имя)
van|ван (часть фамилии)
Beethoven|Бетховен (фамилия; Людвиг ван Бетховен — композитор)
die Sinfonie|симфония
der Chor|хор
die Ode|ода
die Hymne|гимн
die Einigkeit|единство
das Vaterland|отечество, родина
streben|стремиться
brüderlich|по-братски
das Unterpfand|залог, порука
blühen|цвести|blüh
der Glanz|блеск, сияние|Glanze
die Strophe|строфа
Helgoland|Гельголанд (остров в Северном море)
Haydn|Гайдн (фамилия; Йозеф Гайдн — композитор)
das Fußballspiel|футбольный матч|Fußballspielen
die Kaserne|казарма
die Laterne|фонарь
davor|перед этим, впереди
Hans|Ханс (имя)
Leip|Ляйп (фамилия; Ханс Ляйп — поэт)
der Weltkrieg|мировая война
Norbert|Норберт (имя)
Schultze|Шульце (фамилия; Норберт Шульце — композитор)
Lili|Лили (имя)
Marleen|Марлен (имя)
weggehen|уходить
der Feind|враг|Feinde
Marlene|Марлен (имя)
Dietrich|Дитрих (фамилия; Марлен Дитрих — актриса и певица)
Fischer|Фишер (фамилия; Хелена Фишер — певица)
die Sprache|язык|Sprachen
der Schlager|шлягер (эстрадная песня)
die Stelle|место|Stellen
kämmen|расчёсывать|kämmt
der Schiffer|лодочник, корабельщик
reiten|скакать верхом|reitet,ritt,geritten
fassen|хватать, держать|fasst
erst|только; сначала
weilen|пребывать (поэт.)|weilt
lassen|оставлять; позволять; lasst uns — давайте|lasst
das Spiel|игра|Spiele
die Liebe|любовь
wegen|из-за
golden|золотой|goldene,goldenen
`;
