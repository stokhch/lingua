// Библиотека английского, часть 4: карточки старинных английских песен (A1–B2).
// Формат как у карточки «Турнала»: в начале — одна-две строки песни (короткая цитата для разбора),
// дальше — рассказ о песне, написанный для Лингвы, перевод под спойлером, пересказ (summary),
// ссылки (links) и набор слов (set → SONG_SETS, подключается в dictionary.js). Полный текст песни
// здесь не приводится — только по ссылкам.
export const TEXTS = [
  {
    id: 'en-l-song-twinkle', art: 'song-twinkle', set: 'song_twinkle', level: 'A1', shelf: 'songs', topic: 'Песни', kind: 'song',
    title: 'Twinkle, Twinkle, Little Star',
    note: 'Колыбельная на стихи английской поэтессы Джейн Тейлор (1806), поётся на старинную французскую мелодию. В начале — первые две строки (короткая цитата для разбора), дальше — рассказ о песне. Разбор строк: twinkle — мерцать, little star — звёздочка, How I wonder… — как мне интересно…, what you are — что ты такое. Слова собраны в набор «Песня «Twinkle, Twinkle, Little Star»».',
    summary: 'Ребёнок смотрит на ночное небо и удивляется маленькой мерцающей звезде: что же она такое? Звезда висит высоко над миром и сверкает, как алмаз. Когда солнце садится, она зажигает свой огонёк и светит всю ночь, а путник в темноте благодарит её: без этой искорки он не нашёл бы дорогу (пересказ для Лингвы).',
    links: [
      { href: 'https://en.wikipedia.org/wiki/Twinkle,_Twinkle,_Little_Star', label: 'история песенки и текст, Википедия (англ.)' }
    ],
    translation: `Мерцай, мерцай, звёздочка,
Как мне хочется знать, что ты такое!

Это очень старая колыбельная. Её слова написала Джейн Тейлор в 1806 году. Мелодия ещё старше, она пришла из Франции.

Ребёнок смотрит на небо ночью. Он видит маленькую звезду. Звезда высоко, она блестит, как алмаз. Когда солнце уходит, звезда светит всю ночь. Путник в темноте говорит ей «спасибо».

Английские дети поют эту песню перед сном. Её знает почти каждый.`,
    body: `Twinkle, twinkle, little star,
How I wonder what you are!

This is a very old lullaby. Jane Taylor wrote the words in 1806. The music is even older. It came from France.

A child looks at the sky at night. The child sees a little star. The star is high, and it shines like a diamond. When the sun goes away, the star shines all night. A traveller in the dark says "thank you" to it.

English children sing this song before bed. Almost everyone knows it.`
  },
  {
    id: 'en-l-song-macdonald', art: 'song-farm', set: 'song_farm', level: 'A1', shelf: 'songs', topic: 'Песни', kind: 'song',
    title: 'Old MacDonald Had a Farm',
    note: 'Народная детская песенка, известная с начала XX века; её предки — английские песни о животных на ферме XVIII века. В начале — первая строка (короткая цитата), дальше — рассказ о песне. Разбор: had a farm — у него была ферма (had — прошедшее от have), E-I-E-I-O — припев без смысла, просто для пения. Слова собраны в набор «Песня «Old MacDonald»».',
    summary: 'У старого Макдональда есть ферма, и на ней живут разные животные: корова, свинья, утка, овца, лошадь. В каждом куплете появляется новое животное, и все поют, как оно «говорит»: корова — moo, свинья — oink, утка — quack. Песенка кумулятивная: звуки копятся, и к концу её поют всё быстрее. По ней дети учат названия животных и английские звукоподражания (пересказ для Лингвы).',
    links: [
      { href: 'https://en.wikipedia.org/wiki/Old_MacDonald_Had_a_Farm', label: 'история песенки, Википедия (англ.)' }
    ],
    translation: `У старого Макдональда была ферма, и-ай-и-ай-о!

Это весёлая песня для детей. Старый Макдональд — фермер. На его ферме много животных.

В каждом куплете — новое животное. Корова говорит «му», свинья говорит «хрю», утка говорит «кря», овца говорит «бе», а лошадь говорит «иго-го».

Английские животные «говорят» не так, как русские! Свинья по-английски говорит «oink», а не «хрю». Дети поют песню и повторяют звуки всё быстрее.`,
    body: `Old MacDonald had a farm, E-I-E-I-O!

This is a funny song for children. Old MacDonald is a farmer. There are a lot of animals on his farm.

Every verse has a new animal. The cow says "moo", the pig says "oink", the duck says "quack", the sheep says "baa", and the horse says "neigh".

English animals do not "speak" like Russian animals! An English pig says "oink". Children sing the song and say the sounds faster and faster.`
  },
  {
    id: 'en-l-song-row', art: 'song-row', set: 'song_row', level: 'A1', shelf: 'songs', topic: 'Песни', kind: 'song',
    title: 'Row, Row, Row Your Boat',
    note: 'Детская песенка-канон, напечатана в США в 1852 году. В начале — первые две строки (короткая цитата), дальше — рассказ о песне. Разбор: row — грести, your boat — свою лодку, gently — тихо, плавно, down the stream — вниз по течению. Слова собраны в набор «Песня «Row, Row, Row Your Boat»».',
    summary: 'Песенка просит спокойно грести на лодке вниз по ручью — весело, весело, ведь жизнь — это только сон. Её поют каноном: вторая группа начинает, когда первая допела первую строку, и голоса догоняют друг друга, как волны. За простыми словами — старая мысль о том, что жизнь проходит, как сон, поэтому плыть по ней стоит легко и радостно (пересказ для Лингвы).',
    links: [
      { href: 'https://en.wikipedia.org/wiki/Row,_Row,_Row_Your_Boat', label: 'история песенки, Википедия (англ.)' }
    ],
    translation: `Греби, греби, греби на своей лодке
Тихонько вниз по ручью.

Это короткая песня для детей. Ей больше ста пятидесяти лет. Человек в маленькой лодке плывёт по реке. Вода спокойная, и ему весело.

Эту песню поют каноном. Одна группа начинает петь. Потом вторая группа начинает ту же песню, а первая продолжает. Голоса звучат вместе, как волны на воде.

В конце песни есть мудрая мысль: жизнь — это только сон. Поэтому не нужно грустить. Греби тихо и улыбайся!`,
    body: `Row, row, row your boat
Gently down the stream.

This is a short song for children. It is more than one hundred and fifty years old. A man in a small boat goes down a river. The water is calm, and he is happy.

People sing this song as a round. One group starts to sing. Then a second group starts the same song, and the first group goes on. The voices sound together like waves on the water.

At the end of the song there is a wise idea: life is only a dream. So do not be sad. Row gently and smile!`
  },
  {
    id: 'en-l-song-bridge', art: 'song-bridge', set: 'song_bridge', level: 'A2', shelf: 'songs', topic: 'Песни', kind: 'song',
    title: 'London Bridge Is Falling Down',
    note: 'Английская народная детская песенка-игра, известная по крайней мере с XVII века. В начале — первая строка и короткий припев (цитата), дальше — рассказ о песне. Разбор: is falling down — падает, рушится (Present Continuous), my fair lady — моя прекрасная леди. Слова собраны в набор «Песня «London Bridge»».',
    summary: 'Лондонский мост рушится, и в песне думают, как его построить заново: из дерева и глины — их смоет вода; из кирпича — он не устоит; из железа и стали — они согнутся; из серебра и золота — их украдут. В конце к мосту ставят сторожа. Под песню дети играют: двое держат руки «мостом», остальные проходят под ним, а на последнем слове «мост» падает и ловит игрока. Настоящий старый мост действительно много раз чинили и перестраивали (пересказ для Лингвы).',
    links: [
      { href: 'https://en.wikipedia.org/wiki/London_Bridge_Is_Falling_Down', label: 'история песенки и игры, Википедия (англ.)' },
      { href: 'https://en.wikipedia.org/wiki/London_Bridge', label: 'история Лондонского моста, Википедия (англ.)' }
    ],
    translation: `Лондонский мост рушится,
Моя прекрасная леди.

Это очень старая песня из Англии. В ней Лондонский мост падает, и люди хотят построить новый мост.

Сначала они строят его из дерева и глины, но вода их уносит. Потом они пробуют кирпичи, железо и даже золото. Но ничего не работает: кирпичи падают, железо гнётся, а золото крадут.

Дети играют под эту песню. Двое детей держатся за руки высоко — это мост. Другие дети проходят под ним. На последнем слове руки опускаются, и мост «ловит» одного ребёнка.

Настоящий Лондонский мост очень старый. Его много раз строили заново.`,
    body: `London Bridge is falling down,
My fair lady.

This is a very old song from England. In the song London Bridge falls down, and people want to build a new bridge.

First they build it with wood and clay, but the water washes them away. Then they try bricks, iron and even gold. But nothing works: the bricks fall, the iron bends, and somebody steals the gold.

Children play a game with this song. Two children hold their hands up high. This is the bridge. The other children walk under it. On the last word the hands come down, and the bridge "catches" one child.

The real London Bridge is very old. People built it again many times.`
  },
  {
    id: 'en-l-song-bonnie', art: 'song-bonnie', set: 'song_bonnie', level: 'A2', shelf: 'songs', topic: 'Песни', kind: 'song',
    title: 'My Bonnie Lies over the Ocean',
    note: 'Шотландская народная песня, напечатана в 1881 году. В начале — первые две строки (короткая цитата), дальше — рассказ о песне. Разбор: bonnie — шотл. «милый, красивый» (здесь — любимый человек), lies — находится (от lie — лежать, находиться), over the ocean — за океаном. Слова собраны в набор «Песня «My Bonnie»».',
    summary: 'Человек тоскует по любимому, который далеко, за океаном и за морем. Ночью ему снится страшный сон, будто любимый умер. Он просит ветры подуть над океаном и вернуть любимого домой, и в последнем куплете ветры действительно приносят его обратно. Припев «Bring back, bring back» (верни, верни) повторяется много раз, поэтому песню легко петь хором. Часто говорят, что «Бонни» — это принц Карл Эдуард Стюарт, уплывший из Шотландии в 1746 году, но доказательств этому нет (пересказ для Лингвы).',
    links: [
      { href: 'https://en.wikipedia.org/wiki/My_Bonnie_Lies_over_the_Ocean', label: 'история песни, Википедия (англ.)' }
    ],
    translation: `Мой милый за океаном,
Мой милый за морем.

Это старая песня из Шотландии. «Bonnie» — шотландское слово. Оно значит «красивый» или «милый».

Человек, который поёт, очень скучает. Его любимый далеко, за океаном. Однажды ночью ему снится плохой сон. Тогда он просит ветер: «Подуй над морем и верни мне моего милого!» В конце ветер приносит любимого домой.

Некоторые люди думают, что «Бонни» — это шотландский принц Чарльз. Он уплыл во Францию в 1746 году и больше не вернулся. Но никто не знает этого точно.`,
    body: `My Bonnie lies over the ocean,
My Bonnie lies over the sea.

This is an old song from Scotland. "Bonnie" is a Scottish word. It means "beautiful" or "dear".

The singer misses someone very much. The person they love is far away, over the ocean. One night the singer has a bad dream. Then the singer asks the wind: "Blow over the sea and bring my Bonnie back to me!" At the end the wind brings the loved one home.

Some people think that "Bonnie" is the Scottish prince Charles. He sailed to France in 1746 and never came back. But nobody knows this for sure.`
  },
  {
    id: 'en-l-song-jingle', art: 'song-jingle', set: 'song_jingle', level: 'A2', shelf: 'songs', topic: 'Песни', kind: 'song',
    title: 'Jingle Bells',
    note: 'Песня американского композитора Джеймса Лорда Пьерпонта, опубликована в 1857 году (общественное достояние). В начале — первые две строки (короткая цитата), дальше — рассказ о песне. Разбор: dashing — мчась, through the snow — по снегу, one-horse — запряжённый одной лошадью, open sleigh — открытые сани. Слова собраны в набор «Песня «Jingle Bells»».',
    summary: 'Компания мчится по снежным полям в открытых санях, запряжённых одной лошадью. Звенят колокольчики на сбруе, все смеются и поют — как весело кататься на санях! Во втором куплете рассказчик берёт покататься девушку, мисс Фанни Брайт, но худая лошадь въезжает в сугроб, и сани переворачиваются. Песню написали не к Рождеству, а про зимние катания, но сейчас это одна из главных новогодних и рождественских песен в мире (пересказ для Лингвы).',
    links: [
      { href: 'https://en.wikipedia.org/wiki/Jingle_Bells', label: 'история песни, Википедия (англ.)' }
    ],
    translation: `Мчимся по снегу
В открытых санях, запряжённых одной лошадью.

Эту песню написал Джеймс Пьерпонт в 1857 году. Сейчас её поют на каждое Рождество и Новый год.

Но сначала это была песня не о Рождестве. Она о зимней забаве. Друзья едут по полям в санях. На лошади колокольчики, и они звенят: «динь-динь». Все смеются и поют.

Во втором куплете молодой человек катает девушку. Но лошадь худая и уставшая. Сани заезжают в большой сугроб и переворачиваются!

«Jingle» — это звук маленьких колокольчиков.`,
    body: `Dashing through the snow
In a one-horse open sleigh.

James Pierpont wrote this song in 1857. Now people sing it every Christmas and New Year.

But at first it was not a song about Christmas. It is about winter fun. Friends ride across the fields in a sleigh. The horse has bells, and they ring: "jingle, jingle". Everybody laughs and sings.

In the second verse a young man takes a girl for a ride. But the horse is thin and tired. The sleigh goes into a big bank of snow and turns over!

"Jingle" is the sound of small bells.`
  },
  {
    id: 'en-l-song-clementine', art: 'song-clementine', set: 'song_clementine', level: 'B1', shelf: 'songs', topic: 'Песни', kind: 'song',
    title: 'Oh My Darling, Clementine',
    note: 'Американская песня времён золотой лихорадки, опубликована в 1884 году (авторство приписывают Перси Монтроузу; общественное достояние). В начале — строки припева (короткая цитата), дальше — рассказ о песне. Разбор: darling — дорогая, милая; припев дальше говорит, что Клементина lost and gone forever — потеряна и ушла навсегда. Слова собраны в набор «Песня «Clementine»».',
    summary: 'В каньоне, у шахты, жил золотоискатель — «сорок девятый», то есть участник золотой лихорадки 1849 года, — и его дочь Клементина. Она была лёгкой, как фея, но носила огромную обувь — вместо туфель ей служили ящики из-под селёдки. Каждое утро она гоняла утят к воде, однажды споткнулась о щепку и упала в бурную реку. Рассказчик не умел плавать — и потерял её. Это пародия на грустные баллады: слова печальные, а мелодия весёлая, и почти каждая деталь нарочно смешна (пересказ для Лингвы).',
    links: [
      { href: 'https://en.wikipedia.org/wiki/Oh_My_Darling,_Clementine', label: 'история песни, Википедия (англ.)' },
      { href: 'https://en.wikipedia.org/wiki/California_Gold_Rush', label: 'о золотой лихорадке в Калифорнии, Википедия (англ.)' }
    ],
    translation: `О, моя милая, о, моя милая,
О, моя милая Клементина!

Эта песня пришла из Америки девятнадцатого века. В 1849 году тысячи людей поехали в Калифорнию искать золото. Их называли «сорок девятыми».

В песне золотоискатель живёт в каньоне со своей дочерью Клементиной. Каждое утро она ведёт утят к реке. Однажды она ударяется ногой о кусок дерева и падает в воду. Человек, который поёт, не умеет плавать, и Клементина тонет.

Звучит как грустная история, но на самом деле песня шуточная. У Клементины такие большие ноги, что она носит коробки из-под рыбы вместо туфель! Мелодия весёлая, и люди обычно смеются, когда её поют.`,
    body: `Oh my darling, oh my darling,
Oh my darling, Clementine!

This song comes from nineteenth-century America. In 1849 thousands of people went to California to look for gold. They were called "forty-niners".

In the song, a gold miner lives in a canyon with his daughter, Clementine. Every morning she takes some ducklings to the river. One day she hits her foot on a piece of wood and falls into the water. The singer cannot swim, and Clementine drowns.

It sounds like a sad story, but in fact the song is a joke. Clementine's feet are so big that she wears fish boxes instead of shoes! The tune is cheerful, and people usually laugh when they sing it.`
  },
  {
    id: 'en-l-song-grace', art: 'song-grace', set: 'song_grace', level: 'B1', shelf: 'songs', topic: 'Песни', kind: 'song',
    title: 'Amazing Grace',
    note: 'Христианский гимн английского священника Джона Ньютона, написан в 1772 году, напечатан в 1779-м (общественное достояние). В начале — первые две строки (короткая цитата), дальше — рассказ о песне. Разбор: amazing — удивительный, grace — благодать, милость; how sweet the sound — как сладок звук; wretch — несчастный, пропащий человек. Слова собраны в набор «Песня «Amazing Grace»».',
    summary: 'Гимн написан от первого лица: человек вспоминает, что был потерян и слеп, а теперь найден и видит. Он благодарит Бога за милость, которая провела его через опасности и труды и доведёт до дома. За словами стоит жизнь автора: в молодости Джон Ньютон был моряком и работорговцем, в 1748 году пережил страшный шторм, постепенно изменил жизнь, стал священником, а позже выступил против работорговли. Сегодня гимн поют и в церквях, и на концертах, и на похоронах — он стал песней о надежде и прощении (пересказ для Лингвы).',
    links: [
      { href: 'https://en.wikipedia.org/wiki/Amazing_Grace', label: 'история гимна, Википедия (англ.)' },
      { href: 'https://en.wikipedia.org/wiki/John_Newton', label: 'о Джоне Ньютоне, Википедия (англ.)' }
    ],
    translation: `Удивительная благодать! Как сладок этот звук,
Что спас такого пропащего, как я!

Это одна из самых известных песен на английском языке. Её написал Джон Ньютон в 1772 году.

Ньютон прожил необычную жизнь. В молодости он был моряком и работал на кораблях, которые перевозили рабов. В 1748 году его корабль попал в ужасный шторм. Он думал, что умрёт, и начал молиться. После этого его жизнь медленно изменилась. Он стал священником, а позже боролся против рабства.

В песне человек говорит: «Я был потерян, а теперь найден; был слеп, а теперь вижу». Это песня о надежде и о втором шансе.`,
    body: `Amazing grace! How sweet the sound
That saved a wretch like me!

This is one of the most famous songs in the English language. John Newton wrote it in 1772.

Newton had an unusual life. When he was young, he was a sailor and worked on ships that carried slaves. In 1748 his ship was caught in a terrible storm. He thought he was going to die, and he began to pray. After that his life slowly changed. He became a priest, and later he fought against slavery.

In the song a person says: "I was lost, but now I am found; I was blind, but now I see." It is a song about hope and a second chance.`
  },
  {
    id: 'en-l-song-scarborough', art: 'song-scarborough', set: 'song_scarborough', level: 'B1', shelf: 'songs', topic: 'Песни', kind: 'song',
    title: 'Scarborough Fair',
    note: 'Старинная английская народная баллада, её варианты записаны в XVII–XIX веках. В начале — первые две строки народного варианта (короткая цитата), дальше — рассказ о песне. Разбор: fair — ярмарка; parsley, sage, rosemary and thyme — петрушка, шалфей, розмарин и тимьян. Знаменитая запись 1966 года — современная обработка, здесь речь о народной балладе. Слова собраны в набор «Песня «Scarborough Fair»».',
    summary: 'Человек просит путника, идущего на ярмарку в Скарборо, передать привет бывшей любимой. Пусть она сошьёт ему рубашку без швов и без иглы, выстирает её в сухом колодце и высушит на терновнике, который никогда не цвёл, — тогда она снова станет его любовью. В других куплетах девушка отвечает такими же невыполнимыми просьбами: пусть он найдёт акр земли между морем и берегом и вспашет его бараньим рогом. Невозможные задания — старый сюжет народных баллад: так говорят, что любовь ушла навсегда. Строка о травах повторяется в каждом куплете как заклинание (пересказ для Лингвы).',
    links: [
      { href: 'https://en.wikipedia.org/wiki/Scarborough_Fair_(ballad)', label: 'история баллады и её вариантов, Википедия (англ.)' }
    ],
    translation: `Ты идёшь на ярмарку в Скарборо?
Петрушка, шалфей, розмарин и тимьян.

Это очень старая баллада с севера Англии. Скарборо — городок у моря. В Средние века там каждый год проходила большая ярмарка, и туда приезжали торговцы со всей страны.

В песне человек просит путника передать слова девушке, которую он когда-то любил. Он просит её о невозможном: сшить рубашку без иглы и выстирать её в колодце без воды. Если она сможет это сделать, она снова будет его любовью.

Конечно, никто не может выполнить такие задания. Так песня говорит, что любовь закончилась. Четыре травы повторяются в каждом куплете, как волшебные слова.`,
    body: `Are you going to Scarborough Fair?
Parsley, sage, rosemary and thyme.

This is a very old ballad from the north of England. Scarborough is a small town by the sea. In the Middle Ages there was a big fair there every year, and merchants came from all over the country.

In the song a man asks a traveller to take a message to a girl he once loved. He asks her to do impossible things: to make a shirt without a needle and to wash it in a well with no water. If she can do this, she will be his true love again.

Of course, nobody can do these tasks. In this way the song says that the love has ended. The four herbs come back in every verse like magic words.`
  },
  {
    id: 'en-l-song-greensleeves', art: 'song-greensleeves', set: 'song_greensleeves', level: 'B2', shelf: 'songs', topic: 'Песни', kind: 'song',
    title: 'Greensleeves',
    note: 'Английская народная баллада XVI века, впервые зарегистрирована для печати в 1580 году (общественное достояние). В начале — первые две строки (короткая цитата), дальше — рассказ о песне. Разбор: alas — увы; you do me wrong — ты поступаешь со мной несправедливо; to cast me off — отвергнуть меня; discourteously — неучтиво, грубо. Слова собраны в набор «Песня «Greensleeves»».',
    summary: 'Влюблённый жалуется даме по прозвищу Зелёные Рукава: она грубо отвергла его, хотя он любил её давно и преданно. Он перечисляет, что для неё делал: дарил платки, наряды и украшения, кормил и одевал, был готов поставить на кон жизнь и землю. Но она так и не ответила на его любовь. В конце он прощается, желает ей счастья и всё же просит вернуться. Легенда приписывает песню королю Генриху VIII, но историки считают это мифом: мелодия построена по итальянскому образцу, который пришёл в Англию уже после его смерти (пересказ для Лингвы).',
    links: [
      { href: 'https://en.wikipedia.org/wiki/Greensleeves', label: 'история баллады и легенда о Генрихе VIII, Википедия (англ.)' }
    ],
    translation: `Увы, любовь моя, ты несправедлива ко мне,
Ты так неучтиво меня отвергаешь.

«Зелёные рукава» — одна из самых старых английских песен, которые поют до сих пор. Её впервые упоминают в 1580 году, во времена королевы Елизаветы I. Шекспир дважды упоминает её в пьесе «Виндзорские насмешницы».

Влюблённый говорит с дамой, которую называет Зелёные Рукава. Годами он дарил ей дорогие подарки: шёлковые платки, красивые платья, драгоценности. И всё равно она его отвергла. В последнем куплете он прощается, но не может отпустить надежду и просит её вернуться.

Многие верят, что песню написал король Генрих VIII для Анны Болейн. Красивая история, но, скорее всего, неправда: стиль музыки появился в Англии уже после смерти короля.`,
    body: `Alas, my love, you do me wrong,
To cast me off discourteously.

"Greensleeves" is one of the oldest English songs that people still sing. It is first mentioned in 1580, in the time of Queen Elizabeth I. Shakespeare refers to it twice in his play "The Merry Wives of Windsor".

A lover speaks to a lady whom he calls Greensleeves. For years he has given her expensive presents: silk handkerchiefs, beautiful dresses, jewellery. Even so, she has rejected him. In the final verse he says goodbye, yet he cannot let go of his hope and begs her to come back.

Many people believe that King Henry VIII wrote the song for Anne Boleyn. It is a lovely story, but it is almost certainly untrue: the style of the music reached England only after the king's death.`
  },
  {
    id: 'en-l-song-auld', art: 'song-auld', set: 'song_auld', level: 'B2', shelf: 'songs', topic: 'Песни', kind: 'song',
    title: 'Auld Lang Syne',
    note: 'Шотландская песня: Роберт Бёрнс записал и дополнил старинный народный текст в 1788 году (общественное достояние). Она написана на шотландском (скотс), а не на стандартном английском. В начале — первые две строки (короткая цитата), дальше — рассказ о песне. Разбор: auld — old (старый), acquaintance — знакомство, старый знакомый, be forgot — быть забытым (старая форма forgotten), auld lang syne — «давние времена», буквально old long since. Слова собраны в набор «Песня «Auld Lang Syne»».',
    summary: 'Песня задаёт вопрос: разве можно забыть старых друзей и давние времена? Двое друзей вспоминают детство: как бегали по холмам и собирали маргаритки, как плескались в ручье с утра до обеда. С тех пор между ними легли широкие моря, но теперь они снова вместе — подают друг другу руки и пьют «чашу доброты» за былое. В Шотландии и во многих странах песню поют в новогоднюю ночь, взявшись за руки в круг; её поют и на выпускных, и на прощаниях (пересказ для Лингвы).',
    links: [
      { href: 'https://en.wikipedia.org/wiki/Auld_Lang_Syne', label: 'история песни и традиция пения на Новый год, Википедия (англ.)' },
      { href: 'https://en.wikipedia.org/wiki/Robert_Burns', label: 'о Роберте Бёрнсе, Википедия (англ.)' }
    ],
    translation: `Неужели старое знакомство забудется
И никогда не придёт на ум?

Эта песня происходит из Шотландии. Роберт Бёрнс, национальный поэт Шотландии, услышал её от старика и записал в 1788 году, добавив несколько собственных куплетов. Песня написана на скотсе — языке, близком английскому, но с множеством своих слов: «auld» значит «old», «syne» значит «since», а «auld lang syne» — что-то вроде «давным-давно».

Двое старых друзей встречаются после многих лет. Они вспоминают детство: как бегали по холмам и играли в ручье. С тех пор между ними легли моря, но дружба жива. Они пожимают друг другу руки и поднимают чашу за прошлое.

В полночь под Новый год британцы встают в круг, скрещивают руки и поют эту песню. Сегодня её поют по всему миру, часто зная только первый куплет.`,
    body: `Should auld acquaintance be forgot,
And never brought to mind?

This song comes from Scotland. Robert Burns, Scotland's national poet, heard it from an old man and wrote it down in 1788, adding a few verses of his own. The song is written in Scots, a language close to English but with many words of its own: "auld" means "old", "syne" means "since", and "auld lang syne" means something like "long, long ago".

Two old friends meet after many years. They remember their childhood: running over the hills and playing in a stream. Since then, seas have separated them, but their friendship is still alive. They shake hands and raise a cup to the past.

At midnight on New Year's Eve, people in Britain stand in a circle, cross their arms and sing this song. Today it is sung all over the world, often by people who know only the first verse.`
  },
];

// Наборы слов из песен: ключ — id набора, title/desc — для страницы наборов, words — «слово|перевод»
export const SONG_SETS = {
  song_twinkle: { title: 'Песня «Twinkle, Twinkle, Little Star»', desc: 'Звезда, небо, ночь, мерцать', words: `twinkle|мерцать
star|звезда
wonder|интересоваться, удивляться
above|над, наверху
world|мир
high|высоко; высокий
diamond|алмаз, бриллиант
sky|небо
sun|солнце
shine|светить, сиять
light|свет, огонёк
night|ночь
traveller|путешественник, путник
dark|темнота; тёмный
spark|искра
tiny|крошечный` },
  song_farm: { title: 'Песня «Old MacDonald»', desc: 'Ферма, животные и что они «говорят»', words: `farm|ферма
farmer|фермер
animal|животное
cow|корова
pig|свинья
duck|утка
sheep|овца
horse|лошадь
moo|му (мычание коровы)
oink|хрю
quack|кря
baa|бе-е (блеяние овцы)
neigh|иго-го (ржание лошади)
verse|куплет
sound|звук
faster|быстрее` },
  song_row: { title: 'Песня «Row, Row, Row Your Boat»', desc: 'Лодка, река, канон', words: `row|грести
boat|лодка
gently|мягко, плавно
stream|ручей, поток
river|река
calm|спокойный
round|канон (песня, которую поют с отставанием)
group|группа
voice|голос
wave|волна
wise|мудрый
dream|сон, мечта
smile|улыбаться` },
  song_bridge: { title: 'Песня «London Bridge»', desc: 'Мост, материалы, детская игра', words: `bridge|мост
fall down|падать, рушиться
fair|прекрасный; ярмарка
lady|леди, дама
build|строить
wood|дерево (материал)
clay|глина
wash away|смывать, уносить водой
brick|кирпич
iron|железо
gold|золото
bend|гнуться
steal|красть
catch|ловить` },
  song_bonnie: { title: 'Песня «My Bonnie»', desc: 'Океан, ветер, тоска по любимому', words: `bonnie|милый, красивый (шотл.)
lie|лежать, находиться
ocean|океан
sea|море
miss|скучать
far away|далеко
dream|сон
blow|дуть
wind|ветер
bring back|вернуть, принести обратно
prince|принц
sail|плыть (на корабле)
for sure|наверняка, точно` },
  song_jingle: { title: 'Песня «Jingle Bells»', desc: 'Зима, сани, колокольчики', words: `jingle|звенеть; звон
bell|колокольчик
dash|мчаться
snow|снег
sleigh|сани
open|открытый
field|поле
ride|ехать, кататься; поездка
ring|звенеть
laugh|смеяться
thin|худой
tired|уставший
bank of snow|сугроб
turn over|переворачиваться` },
  song_clementine: { title: 'Песня «Clementine»', desc: 'Золотая лихорадка, шахта, река', words: `darling|дорогая, милая
gold|золото
miner|шахтёр, золотоискатель
canyon|каньон
daughter|дочь
duckling|утёнок
hit|ударять(ся)
piece|кусок
drown|тонуть
swim|плавать
joke|шутка
instead of|вместо
cheerful|весёлый, бодрый
tune|мелодия` },
  song_grace: { title: 'Песня «Amazing Grace»', desc: 'Надежда, спасение, шторм', words: `amazing|удивительный
grace|благодать, милость
sweet|сладкий, приятный
save|спасать
wretch|несчастный, пропащий человек
sailor|моряк
slave|раб
slavery|рабство
storm|шторм, буря
pray|молиться
priest|священник
lost|потерянный
blind|слепой
hope|надежда
chance|шанс` },
  song_scarborough: { title: 'Песня «Scarborough Fair»', desc: 'Ярмарка, травы, невозможные задания', words: `fair|ярмарка
parsley|петрушка
sage|шалфей
rosemary|розмарин
thyme|тимьян
ballad|баллада
merchant|купец, торговец
message|послание
impossible|невозможный
shirt|рубашка
needle|игла
well|колодец
true love|настоящая любовь
herb|трава (пряная, лечебная)
magic|волшебный` },
  song_greensleeves: { title: 'Песня «Greensleeves»', desc: 'Старинная баллада о неразделённой любви', words: `alas|увы
wrong|несправедливость; неправильный
cast off|отвергать, бросать
discourteously|неучтиво, грубо
sleeve|рукав
lover|влюблённый
silk|шёлк
handkerchief|носовой платок
jewellery|украшения, драгоценности
reject|отвергать
even so|и всё же
let go of|отпускать
beg|умолять
untrue|неправда, ложный` },
  song_auld: { title: 'Песня «Auld Lang Syne»', desc: 'Шотландские слова, дружба, Новый год', words: `auld|старый (шотл. old)
acquaintance|знакомство; знакомый
forgot|забытый (старая форма forgotten)
mind|ум, память
syne|с тех пор (шотл. since)
long ago|давным-давно
national|национальный
childhood|детство
stream|ручей
separate|разделять
friendship|дружба
shake hands|пожимать руки
raise|поднимать
midnight|полночь
circle|круг` },
};

export const WORDS = `
lullaby|колыбельная
jane|Джейн (имя)
taylor|Тейлор (фамилия)
france|Франция
macdonald|Макдональд (фамилия)
e-i-e-i-o|и-ай-и-ай-о (припев без смысла)
russian|русский
dear|дорогой, милый
charles|Чарльз (имя)
pierpont|Пьерпонт (фамилия)
everybody|все, каждый
clementine|Клементина (имя)
nineteenth|девятнадцатый
nineteenth-century|девятнадцатого века
one-horse|запряжённый одной лошадью
america|Америка
california|Калифорния
forty-niner|«сорок девятый», участник золотой лихорадки 1849 года
john|Джон (имя)
newton|Ньютон (фамилия)
against|против
scarborough|Скарборо (город на северо-востоке Англии)
cast|бросать (cast off — отвергать)
greensleeves|Зелёные Рукава (прозвище дамы из песни)
queen|королева
elizabeth|Елизавета (имя)
refer|упоминать, ссылаться (refer to)
merry|весёлый (The Merry Wives of Windsor — «Виндзорские насмешницы»)
wife|жена
windsor|Виндзор (город в Англии)
whom|которого, кого
present|подарок; настоящий
henry|Генрих (имя)
viii|VIII (восьмой)
anne|Анна (имя)
boleyn|Болейн (фамилия)
style|стиль
scots|скотс (шотландский язык); шотландский
lang|долгий (шотл. long)
alive|живой
eve|канун (New Year's Eve — канун Нового года)
cross|скрещивать; пересекать; крест
`;

export const FORMS = {
  'forty-niners': 'forty-niner', wives: 'wife', sung: 'sing', refers: 'refer', presents: 'present'
};
