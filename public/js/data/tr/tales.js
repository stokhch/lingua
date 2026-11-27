// Десять самых известных турецких сказок, анекдотов и легенд (полка «Сказки и истории»).
// Сюжеты народные; тексты — пересказ, написанный для Лингвы простым языком (A1–B1).
// У каждой: перевод под спойлером, «о чём текст», пояснения трудных выражений (explain) и рисунок (art).
// Слова: SET — набор «Слова из сказок», WORDS — остальные слова сказок (только в словарь),
// FORMS — трудные формы, которые не сводятся к словарной отрезанием аффиксов.
const NOTE = 'Пересказ Лингвы по мотивам турецкого народного сюжета: текст написан простым языком, перевод под спойлером.';
const SET_ID = 'tales_tr';

export const TEXTS = [
  {
    id: 'tr-tale-kurk', level: 'A1', topic: 'Сказки', title: 'Ye Kürküm Ye', art: 'tale-tr-kurk', set: SET_ID, note: NOTE,
    summary: 'Самый известный анекдот о Насреддине Ходже. В бедной одежде его на свадьбе не замечают, в богатой шубе — сажают на лучшее место. Ходжа «кормит» шубу: раз почёт оказан одежде, пусть она и ест. Фраза «Ye kürküm ye» стала поговоркой: так говорят, когда человека встречают по одёжке. Насреддин Ходжа — народный мудрец и шутник, по преданию живший в XIII веке в Акшехире; анекдоты о нём (fıkra) знает каждый турок.',
    explain: [
      ['Ye kürküm ye', '«Ешь, шуба моя, ешь!»: ye — повелительное наклонение от yemek, kürk-üm — «моя шуба».'],
      ['Hoca, Hocam', 'Ходжа — учитель, духовное лицо; Hocam — «мой ходжа», вежливое обращение (так и сегодня обращаются к учителю).'],
      ['gider, oturur, der', 'Широкое время (-ar/-er/-ır): им по-турецки обычно рассказывают анекдоты, как русское «приходит он…».'],
      ['ayağa kalkmak', 'Встать на ноги, подняться (в знак уважения).'],
      ['kürk yesin', '«Пусть шуба ест»: -sın/-sin — повеление для третьего лица.']
    ],
    translation: `Однажды Насреддин Ходжа идёт на свадьбу. На нём старая, простая одежда. Никто на него не смотрит. Никто не говорит ему: «Пожалуйста, садитесь». Ходжа сидит один в углу. Приносят еду, но никто не даёт ему поесть.

Ходжа тихо возвращается домой. Он надевает красивую шубу и снова идёт на свадьбу. На этот раз все встают. «Добро пожаловать, ходжа! Пожалуйста, садитесь сюда!» — говорят они. Его сажают на самое лучшее место. Перед ним ставят горячий суп и плов.

Ходжа опускает рукав шубы в суп и говорит: «Ешь, шуба моя, ешь!» Все удивляются: «Ходжа, что вы делаете?» Ходжа улыбается: «Это угощение не для меня, а для шубы. Значит, пусть шуба и ест!»`,
    body: `Nasreddin Hoca bir gün bir düğüne gider. Üstünde eski ve basit giysiler var. Kimse ona bakmaz. Kimse ona "Buyurun, oturun" demez. Hoca bir köşede yalnız oturur. Yemek gelir, ama kimse ona yemek vermez.

Hoca sessizce evine döner. Güzel bir kürk giyer ve tekrar düğüne gider. Bu sefer herkes ayağa kalkar. "Hoş geldiniz, Hocam! Buyurun, buraya oturun!" derler. Onu en güzel yere oturturlar. Önüne sıcak çorba ve pilav koyarlar.

Hoca kürkün kolunu çorbaya sokar ve "Ye kürküm, ye!" der. Herkes şaşırır: "Hocam, ne yapıyorsunuz?" Hoca gülümser: "Bu yemekler bana değil, kürke geldi. O zaman kürk yesin!"`
  },
  {
    id: 'tr-tale-maya', level: 'A2', topic: 'Сказки', title: 'Göle Maya Çalmak', art: 'tale-tr-maya', set: SET_ID, note: NOTE,
    summary: 'Короткий анекдот о Насреддине Ходже: он бросает ложку йогурта в озеро, чтобы заквасить его, как молоко. На насмешку он отвечает: «А вдруг получится!» Выражение «göle maya çalmak» — «заквашивать озеро» — означает браться за почти невозможное дело, а «Ya tutarsa!» говорят, когда надеются на чудо.',
    explain: [
      ['maya çalmak', 'Заквасить: в тёплое молоко кладут ложку йогурта (maya — закваска), и к утру оно становится йогуртом.'],
      ['göle', 'göl «озеро» + -e: дательный падеж «в озеро».'],
      ['Ya tutarsa!', '«А вдруг получится (схватится)!»: tutmak — держать, здесь «схватиться, удаться»; -sa — «если».'],
      ['olur mu?', '«Разве бывает? Разве может быть?» — частый вопрос недоверия.'],
      ['sakin sakin', 'Повтор слова усиливает: «спокойно-спокойно, совершенно спокойно».']
    ],
    translation: `Однажды Насреддин Ходжа сидит на берегу озера. В руках у него миска йогурта. Ходжа ложкой бросает йогурт в озеро.

Подходит один крестьянин и спрашивает: «Ходжа, что ты делаешь?»

«Заквашиваю озеро», — говорит Ходжа.

Крестьянин смеётся: «Ходжа, да разве озеро станет йогуртом?»

Ходжа спокойно отвечает: «А вдруг получится!»

Сегодня про человека, который берётся за невозможное, но доброе дело, турки говорят: «Он заквашивает озеро».`,
    body: `Nasreddin Hoca bir gün göl kenarında oturuyor. Elinde bir kase yoğurt var. Hoca kaşıkla yoğurdu göle atıyor.

Bir köylü geliyor ve soruyor: "Hocam, ne yapıyorsun?"

"Göle maya çalıyorum," diyor Hoca.

Köylü gülüyor: "Hocam, göl hiç yoğurt olur mu?"

Hoca sakin sakin cevap veriyor: "Ya tutarsa!"

Bugün Türkler, zor ama güzel bir işe başlayan insan için "Göle maya çalıyor" der.`
  },
  {
    id: 'tr-tale-kazan', level: 'A2', topic: 'Сказки', title: 'Kazan Doğurdu', art: 'tale-tr-kazan', set: SET_ID, note: NOTE,
    summary: 'Анекдот о Насреддине Ходже и жадном соседе. Ходжа возвращает одолженный казан с кастрюлькой внутри: «казан родил». Сосед с радостью верит. А когда Ходжа не возвращает казан и говорит, что тот умер, сосед возмущается. Ответ Ходжи — пословица: кто поверил, что казан родил, должен поверить, что он умер. Так говорят о людях, которые верят только в то, что им выгодно.',
    explain: [
      ['ödünç almak', 'Взять взаймы, одолжить у кого-то (ödünç vermek — дать взаймы).'],
      ['Müjde!', 'Радостная весть! Так начинают хорошую новость; за müjde принято благодарить подарком.'],
      ['doğurmak', 'Родить. Kazan doğurdu — «казан родил».'],
      ['Başın sağ olsun', '«Пусть твоя голова будет здорова» — обычное турецкое соболезнование. Ходжа говорит его всерьёз, как будто умер человек.'],
      ['doğurduğuna inandın da', '«В то, что он родил, ты поверил…»: -duğ-u-na — «в то, что он сделал»; da здесь — «а, но».']
    ],
    translation: `Однажды Насреддин Ходжа берёт у соседа взаймы большой казан. Через несколько дней он возвращает казан, но внутри казана лежит маленькая кастрюлька.

Сосед удивляется: «Ходжа, а это что за кастрюлька?»

«Радостная весть! Твой казан родил», — говорит Ходжа.

Сосед очень рад и забирает кастрюльку. «Как хорошо, — думает он. — Ходжа немного простоват».

Через некоторое время Ходжа снова просит казан. Сосед сразу даёт. Но на этот раз проходят дни, проходят недели, а казан не возвращается. Сосед стучит в дверь Ходжи: «Ходжа, где мой казан?»

Ходжа с печальным лицом говорит: «Соболезную, твой казан умер».

Сосед кричит: «Ходжа, разве казан может умереть?»

Ходжа улыбается: «В то, что он родил, ты поверил, а в то, что умер, почему не веришь?»`,
    body: `Nasreddin Hoca bir gün komşusundan büyük bir kazan ödünç alır. Birkaç gün sonra kazanı geri verir, ama kazanın içinde küçük bir tencere vardır.

Komşu şaşırır: "Hocam, bu tencere ne?"

"Müjde! Senin kazanın doğurdu," der Hoca.

Komşu çok sevinir ve tencereyi alır. "Ne güzel," diye düşünür, "Hoca biraz saf bir adam."

Bir süre sonra Hoca kazanı yine ister. Komşu hemen verir. Ama bu sefer günler geçer, haftalar geçer, kazan geri gelmez. Komşu Hoca'nın kapısını çalar: "Hocam, kazanım nerede?"

Hoca üzgün bir yüzle söyler: "Başın sağ olsun, kazanın öldü."

Komşu bağırır: "Hocam, kazan hiç ölür mü?"

Hoca gülümser: "Doğurduğuna inandın da öldüğüne neden inanmıyorsun?"`
  },
  {
    id: 'tr-tale-keloglan', level: 'A2', topic: 'Сказки', title: 'Keloğlan ile Dev', art: 'tale-tr-keloglan', set: SET_ID, note: NOTE,
    summary: 'Кельоглан — «плешивый парень», самый любимый герой турецких сказок: бедный, весёлый и смекалистый, как наш Иванушка. В этой сказке он хитростью побеждает великана-дэва: выжимает «сок из камня» (на самом деле из сыра) и подкладывает в постель тыкву. Испуганный дэв отдаёт ему мешок золота. Сказка начинается и кончается традиционными турецкими присказками.',
    explain: [
      ['Bir varmış, bir yokmuş', '«Был — не был»: так начинается почти каждая турецкая сказка, как наше «жили-были».'],
      ['Evvel zaman içinde, kalbur saman içinde', 'Присказка-рифма: «в давние времена, когда решето было в соломе». Смысла не ищут — это звучит как «в некотором царстве».'],
      ['yaşarmış, gitmiş, demiş', 'Прошедшее время на -mış: «говорят, жил; говорят, пошёл». Им рассказывают сказки и то, что сами не видели.'],
      ['dev', 'Дэв — великан-людоед турецких и персидских сказок.'],
      ['belli etmemek', 'Не подать виду, не показать.'],
      ['Gökten üç elma düşmüş', '«С неба упали три яблока: одно мне, одно рассказчику, одно слушателю» — традиционная концовка, как «и я там был, мёд-пиво пил».']
    ],
    translation: `Жил-был… В давние времена, когда решето было в соломе, в одной деревне жил бедный парень по имени Кельоглан. Он жил с матерью в маленьком доме.

Однажды Кельоглан пошёл в лес собирать дрова. В лесу перед ним появился огромный дэв. «Я тебя съем!» — закричал он.

Кельоглан испугался, но не подал виду. «Сначала посмотрим, кто сильнее», — сказал он. Дэв поднял с земли камень и сжал его в руке. Камень превратился в пыль. Кельоглан достал из кармана кусок сыра, а дэв подумал, что это камень. Кельоглан сжал сыр, и из него потекла вода. «Смотри, — сказал Кельоглан, — я выжимаю из камня воду!»

Дэв удивился и испугался. «Будь гостем в моём доме», — сказал он. Ночью Кельоглан не лёг в постель: он положил под одеяло тыкву, а сам спрятался в углу. Ночью пришёл дэв и ударил по постели толстой дубиной. Утром Кельоглан встал и засмеялся: «Ночью меня муха побеспокоила».

Дэв очень испугался: «Этот человек не умирает даже от дубины!» Он дал Кельоглану мешок золота и сказал: «Пожалуйста, уходи». Кельоглан с золотом вернулся к матери, и они жили счастливо.

С неба упали три яблока: одно мне, одно тому, кто рассказывал, и одно тому, кто слушал.`,
    body: `Bir varmış, bir yokmuş. Evvel zaman içinde, kalbur saman içinde, bir köyde Keloğlan adında fakir bir genç yaşarmış. Annesiyle küçük bir evde otururmuş.

Bir gün Keloğlan odun toplamak için ormana gitmiş. Ormanda karşısına kocaman bir dev çıkmış. "Seni yiyeceğim!" diye bağırmış.

Keloğlan korkmuş, ama belli etmemiş. "Önce kim daha güçlü, onu görelim," demiş. Dev yerden bir taş almış ve elinde sıkmış. Taş toz olmuş. Keloğlan cebinden bir parça peynir çıkarmış, dev bunu taş sanmış. Keloğlan peyniri sıkınca suyu akmış. "Bak," demiş Keloğlan, "ben taştan su çıkarırım!"

Dev şaşırmış ve korkmuş. "Gel, evimde misafir ol," demiş. Gece Keloğlan yatağa yatmamış: yorganın altına bir kabak koymuş ve kendisi köşede saklanmış. Gece dev gelmiş ve kalın bir sopayla yatağa vurmuş. Sabah Keloğlan gülerek kalkmış: "Gece bir sinek beni rahatsız etti."

Dev çok korkmuş: "Bu adam sopadan bile ölmüyor!" Keloğlan'a bir çuval altın vermiş ve "Lütfen git," demiş. Keloğlan altınla annesine dönmüş, mutlu yaşamışlar.

Gökten üç elma düşmüş: biri bana, biri anlatana, biri de dinleyene.`
  },
  {
    id: 'tr-tale-kizkulesi', level: 'A2', topic: 'Легенды', title: 'Kız Kulesi', art: 'tale-tr-kizkulesi', set: SET_ID, note: NOTE,
    summary: 'Самая известная легенда Стамбула — о Девичьей башне на островке в Босфоре. Султану предсказали, что его дочь умрёт от укуса змеи, и он поселил её в башне посреди моря. Но змея приплыла в корзине с фруктами — подарке на день рождения. Мораль: от судьбы не уйдёшь. Сама башня настоящая: сегодня в ней музей и кафе, туда ходят лодки из Ускюдара.',
    explain: [
      ['Kız Kulesi', '«Девичья башня»: kız — девушка, дочь; kule — башня, -si — показатель связи двух слов.'],
      ['Boğaz', 'Босфор (буквально «горло, пролив») — пролив, который делит Стамбул на европейскую и азиатскую части.'],
      ['padişah', 'Падишах — султан, правитель.'],
      ['falcı', 'Гадалка, предсказатель (fal — гадание).'],
      ['yaptırmak', 'Велеть построить: суффикс -dır/-tır значит «заставить сделать» (yapmak — делать).'],
      ['Kaderden kaçılmaz', '«От судьбы не убежишь»: kader — судьба, kaçılmaz — «нельзя убежать».']
    ],
    translation: `В Стамбуле, посреди Босфора, на маленьком острове стоит белая башня. Её название — Девичья башня. О ней рассказывают красивую легенду.

Когда-то у одного падишаха была очень красивая дочь. Падишах очень любил дочь. Однажды гадалка сказала падишаху так: «Когда твоей дочери будет восемнадцать лет, её укусит змея, и она умрёт».

Падишах очень испугался. Чтобы защитить дочь от змей, он велел построить башню посреди моря. Девушка жила в этой башне. Падишах навещал её каждый день.

Настал восемнадцатый день рождения девушки. Падишах был очень счастлив, ведь дочь всё ещё жива. В подарок он послал ей корзину фруктов. Но в корзине, под виноградом, пряталась маленькая змея. Змея укусила девушку, и та умерла.

С тех пор люди говорят: «От судьбы не уйдёшь». Сегодня в Девичьей башне музей и кафе. Люди плывут туда на лодке и любуются видом Стамбула.`,
    body: `İstanbul'da, Boğaz'ın ortasında, küçük bir adada beyaz bir kule var. Adı Kız Kulesi. Onun hakkında güzel bir efsane anlatılır.

Eskiden bir padişahın çok güzel bir kızı varmış. Padişah kızını çok severmiş. Bir gün bir falcı padişaha şöyle demiş: "Kızın on sekiz yaşında olunca, onu bir yılan ısıracak ve kız ölecek."

Padişah çok korkmuş. Kızını yılanlardan korumak için denizin ortasında bir kule yaptırmış. Kız bu kulede yaşamış. Padişah onu her gün ziyaret etmiş.

Kızın on sekizinci doğum günü gelmiş. Padişah çok mutluymuş, çünkü kızı hâlâ yaşıyormuş. Ona hediye olarak bir sepet meyve göndermiş. Ama sepetin içinde, üzümlerin altında, küçük bir yılan saklanıyormuş. Yılan kızı ısırmış ve kız ölmüş.

O günden beri insanlar "Kaderden kaçılmaz" der. Bugün Kız Kulesi bir müze ve kafe. İnsanlar oraya kayıkla gidiyor ve İstanbul'un manzarasını izliyor.`
  },
  {
    id: 'tr-tale-ferhat', level: 'A2', topic: 'Легенды', title: 'Ferhat ile Şirin', art: 'tale-tr-ferhat', set: SET_ID, note: NOTE,
    summary: 'Главная турецкая легенда о любви, родом из персидской поэмы и прижившаяся в Анатолии — в городе Амасья. Художник Ферхат влюбляется в Ширин, сестру правительницы. Чтобы получить её руку, он должен пробить гору и провести в город воду. Его обманывают ложной вестью о смерти Ширин, и влюблённые погибают. В Амасье и сейчас показывают «водный канал Ферхата» и могилы влюблённых, а «Ferhat ile Şirin» стали символом верной любви, как Ромео и Джульетта.',
    explain: [
      ['sultan', 'Здесь — правительница, госпожа (в легенде Амасьей правит Мехмене Бану, сестра Ширин).'],
      ['âşık olmak', 'Влюбиться (âşık — влюблённый).'],
      ['Şirin\'i istemek', '«Просить Ширин» — свататься: kız istemek — сватать девушку.'],
      ['dağı delmek', 'Пробить гору; Ferhat gibi dağları delmek — «горы свернуть ради любви».'],
      ['külünk', 'Кирка каменотёса — главный инструмент Ферхата в легенде.'],
      ['gece gündüz', '«Ночью и днём» — без отдыха, день и ночь.']
    ],
    translation: `Очень давно в Амасье жила правительница по имени Мехмене Бану. У неё была красивая младшая сестра по имени Ширин. Ферхат был молодым и талантливым художником: он рисовал на камне.

Работая во дворце, Ферхат увидел Ширин и влюбился в неё. Ширин тоже полюбила Ферхата. Ферхат посватался к Ширин. Правительница сказала: «В городе нет воды. Пробей гору и приведи воду в город. Тогда я отдам тебе Ширин».

Ферхат взял в руки кирку и начал пробивать гору. Он работал день и ночь. Прошли годы, и вода подошла близко к городу.

Но правительница не хотела этого брака. Она послала к Ферхату старуху. Старуха солгала: «Ширин умерла». Ферхат был в таком горе, что бросился с горы. Услышав об этом, Ширин побежала к Ферхату и тоже умерла. Их похоронили рядом.

Сегодня в Амасье есть старый канал, который называют «каналом Ферхата». А о большой и верной любви по-турецки и сейчас говорят: «как Ферхат и Ширин».`,
    body: `Çok eskiden Amasya'da Mehmene Banu adında bir sultan yaşarmış. Onun Şirin adında güzel bir kız kardeşi varmış. Ferhat genç ve yetenekli bir sanatçıymış: taşın üstüne resim yaparmış.

Ferhat sarayda çalışırken Şirin'i görmüş ve ona âşık olmuş. Şirin de Ferhat'ı sevmiş. Ferhat, sultandan Şirin'i istemiş. Sultan şöyle demiş: "Şehrimizde su yok. Dağı del ve şehre su getir. O zaman Şirin'i sana veririm."

Ferhat eline külüngünü almış ve dağı delmeye başlamış. Gece gündüz çalışmış. Yıllar geçmiş ve su şehre yaklaşmış.

Ama sultan bu evliliği istemiyormuş. Ferhat'a yaşlı bir kadın göndermiş. Kadın yalan söylemiş: "Şirin öldü." Ferhat çok üzülmüş ve kendini dağdan atmış. Şirin bunu duyunca Ferhat'ın yanına koşmuş ve o da ölmüş. İkisini yan yana gömmüşler.

Bugün Amasya'da "Ferhat'ın su kanalı" denen eski bir kanal var. Büyük ve temiz bir aşk için Türkçede hâlâ "Ferhat ile Şirin gibi" denir.`
  },
  {
    id: 'tr-tale-dumrul', level: 'B1', topic: 'Легенды', title: 'Deli Dumrul', art: 'tale-tr-dumrul', set: SET_ID, note: NOTE,
    summary: 'Сказание из «Книги моего деда Коркута» (Dede Korkut) — главного эпоса огузов, предков турок, записанного около XV века. Гордый богатырь Дели Думрул берёт плату за мост через сухое русло и вызывает на бой самого ангела смерти Азраила. Побеждённый, он может спастись, только если кто-то отдаст за него жизнь. Отец и мать отказываются, а жена соглашается — и Бог прощает обоих. Это история о гордыне, смирении и верной любви.',
    explain: [
      ['Dede Korkut', 'Деде Коркут — мудрый сказитель огузов; книга его сказаний — основа турецкого и азербайджанского эпоса.'],
      ['deli', 'Буквально «безумный», а в эпосе — «отчаянно смелый, удалой».'],
      ['akçe', 'Акче — старинная мелкая серебряная монета.'],
      ['geçenden otuz üç, geçmeyenden kırk', '«С того, кто проходит, — тридцать три, с того, кто не проходит, — сорок»: знаменитая несправедливая пошлина Думрула.'],
      ['Azrail', 'Азраил — ангел смерти; can almak — «забрать душу, жизнь».'],
      ['canım sana kurban olsun', '«Пусть моя жизнь будет тебе жертвой» — высшая клятва любви и верности.']
    ],
    translation: `Это сказание из книги Деде Коркута. Когда-то среди огузов жил сильный и надменный человек по имени Дели Думрул. Через сухое русло реки он велел построить мост. С того, кто переходил мост, он брал тридцать три акче, а с того, кто не переходил, — сорок.

Однажды рядом с мостом умер молодой человек. Думрул спросил: «Кто убил этого храбреца?» Люди ответили: «По воле Аллаха Азраил забрал его душу». Думрул сильно разгневался: «Кто такой этот Азраил? Пусть придёт и сразится со мной!»

Аллах разгневался на эту гордыню. Азраил явился перед Думрулом. Думрул выхватил меч, но Азраил превратился в голубя и улетел. Потом Думрул упал с коня, а Азраил сел ему на грудь: «Я пришёл забрать твою душу».

Думрул впервые испугался и стал молить Аллаха. Аллах сказал: «Если найдёшь вместо себя другую душу, я тебя помилую». Думрул сначала пошёл к отцу. Отец сказал: «Сын мой, я очень тебя люблю, но свою жизнь отдать не могу». Мать ответила так же.

Тогда Думрул пошёл к жене. Жена сразу сказала: «Пусть моя жизнь будет жертвой за твою!» Увидев такую любовь, Думрул заплакал и стал молиться: «Либо возьми души нас обоих сразу, либо помилуй нас обоих!» Аллаху понравилась эта молитва. Он помиловал Думрула и его жену и подарил им сто сорок лет жизни.`,
    body: `Bu hikâye Dede Korkut kitabından. Eskiden Oğuzlar arasında Deli Dumrul adında güçlü ve kibirli bir adam yaşarmış. Kuru bir derenin üstüne bir köprü yaptırmış. Köprüden geçenden otuz üç akçe, geçmeyenden de kırk akçe alırmış.

Bir gün köprünün yanında genç bir adam ölmüş. Dumrul sormuş: "Bu yiğidi kim öldürdü?" İnsanlar cevap vermiş: "Allah'ın emriyle Azrail onun canını aldı." Dumrul çok kızmış: "Azrail de kimmiş? Gelsin, benimle savaşsın!"

Allah bu kibre kızmış. Azrail, Dumrul'un karşısına çıkmış. Dumrul kılıcını çekmiş, ama Azrail bir güvercin olup uçmuş. Sonra Dumrul atından düşmüş ve Azrail onun göğsüne oturmuş: "Canını almaya geldim."

Dumrul ilk defa korkmuş ve Allah'a yalvarmış. Allah şöyle demiş: "Senin yerine bir can bulursan, seni bağışlarım." Dumrul önce babasına gitmiş. Babası demiş: "Oğlum, seni çok seviyorum, ama canımı veremem." Annesi de aynı cevabı vermiş.

Sonra Dumrul karısına gitmiş. Karısı hemen demiş: "Benim canım senin canına kurban olsun!" Dumrul bu sevgiyi görünce ağlamış ve dua etmiş: "Ya ikimizin canını birden al, ya da ikimizi de bağışla!" Allah bu duayı sevmiş. Dumrul'u ve karısını bağışlamış, onlara yüz kırk yıl ömür vermiş.`
  },
  {
    id: 'tr-tale-tepegoz', level: 'B1', topic: 'Легенды', title: 'Basat ile Tepegöz', art: 'tale-tr-tepegoz', set: SET_ID, note: NOTE,
    summary: 'Ещё одно сказание Деде Коркута — о великане Тепегёзе («глаз на макушке»), одноглазом людоеде, которого не берут ни меч, ни стрела. Огузы вынуждены платить ему дань людьми и овцами, пока молодой богатырь Басат не ослепляет его раскалённым вертелом, не выходит из пещеры в шкуре барана и не убивает великана его же волшебным мечом. Сюжет очень похож на историю Одиссея и циклопа Полифема у Гомера.',
    explain: [
      ['Tepegöz', 'tepe — макушка, вершина + göz — глаз: «глаз на макушке», одноглазый великан.'],
      ['Oğuzlar', 'Огузы — тюркские племена, предки турок, азербайджанцев и туркмен.'],
      ['anlaşma yapmak', 'Заключить договор.'],
      ['sıra ona gelmiş', '«Очередь дошла до него»: sıra — очередь.'],
      ['şiş', 'Вертел, шампур (отсюда şiş kebap — шашлык на шампуре).'],
      ['koç derisi', 'Шкура барана: koç — баран, deri — кожа, шкура.']
    ],
    translation: `Одно из самых знаменитых сказаний Деде Коркута — о Тепегёзе. Тепегёз был великаном с одним-единственным глазом посреди лба. Его тело не мог разрубить ни один меч и не могла пробить ни одна стрела.

Тепегёз причинял огузам много вреда. Огузы заключили с ним договор: каждый день они будут давать ему двух человек и пятьсот овец.

Однажды очередь дошла до второго сына одной старой женщины: первого сына Тепегёз уже съел. Женщина в слезах пошла к молодому богатырю Басату. Тепегёз убил и брата Басата. Басат сказал: «Я пойду к Тепегёзу и спасу огузов».

Басат пришёл в пещеру Тепегёза. Пока великан спал, Басат раскалил в огне вертел и вонзил его в единственный глаз великана. Тепегёз ослеп и сел у входа в пещеру, чтобы ощупывать всех, кто выходит. Но Басат надел шкуру барана и вышел вместе с овцами.

Потом Басат нашёл волшебный меч Тепегёза. Только этот меч мог разрубить его тело. Басат отрубил великану голову. Огузы были спасены и устроили большой праздник.

Эта история очень похожа на рассказ о циклопе из «Одиссеи» Гомера.`,
    body: `Dede Korkut hikâyelerinin en ünlülerinden biri Tepegöz hikâyesidir. Tepegöz, alnının ortasında tek bir gözü olan bir devmiş. Onun bedenini hiçbir kılıç kesemezmiş, hiçbir ok delemezmiş.

Tepegöz, Oğuzlara çok zarar vermiş. Oğuzlar onunla bir anlaşma yapmışlar: her gün ona iki insan ve beş yüz koyun vereceklermiş.

Bir gün sıra yaşlı bir kadının ikinci oğluna gelmiş, çünkü ilk oğlunu Tepegöz daha önce yemiş. Kadın ağlayarak genç kahraman Basat'a gitmiş. Tepegöz, Basat'ın kardeşini de öldürmüş. Basat demiş: "Tepegöz'e gideceğim ve Oğuzları kurtaracağım."

Basat, Tepegöz'ün mağarasına gelmiş. Dev uyurken Basat bir şişi ateşte kızdırmış ve onun tek gözüne saplamış. Tepegöz kör olmuş ve dışarı çıkan herkesi elleriyle yoklamak için mağaranın kapısında oturmuş. Ama Basat bir koç derisi giymiş ve koyunlarla birlikte dışarı çıkmış.

Sonra Basat, Tepegöz'ün sihirli kılıcını bulmuş. Onun bedenini sadece bu kılıç kesebilirmiş. Basat devin başını kesmiş. Oğuzlar kurtulmuş ve büyük bir bayram yapmışlar.

Bu hikâye, Homeros'un Odysseia destanındaki Kiklop hikâyesine çok benzer.`
  },
  {
    id: 'tr-tale-sahmeran', level: 'B1', topic: 'Легенды', title: 'Şahmeran', art: 'tale-tr-sahmeran', set: SET_ID, note: NOTE,
    summary: 'Легенда юго-востока Турции о Шахмеран — царице змей с головой прекрасной женщины, которая живёт под землёй и знает тайны всех лекарств. Юноша Джамасп, брошенный друзьями в колодце, попадает в её подземный сад. Отпуская его домой, Шахмеран просит не выдавать её. Но визирь узнаёт тайну по чешуйчатой коже Джамаспа в бане. Даже погибая, Шахмеран наказывает злого визиря и дарит Джамаспу мудрость. Её изображения — на коврах, стенах и украшениях Мардина и Тарсуса.',
    explain: [
      ['Şahmeran', 'Из персидского: şah — царь + mar — змея, «царь (царица) змей».'],
      ['yarı insan yarı yılan', '«Наполовину человек, наполовину змея».'],
      ['kuyu', 'Колодец; kuyuya indirmek — спустить в колодец.'],
      ['hamam', 'Турецкая баня; в бане все сразу увидели бы его кожу.'],
      ['pul pul', 'Чешуйчатый, покрытый чешуёй (pul — чешуйка, а ещё марка и блёстка).'],
      ['vezir', 'Визирь — главный советник падишаха.']
    ],
    translation: `Шахмеран — царица, наполовину женщина, наполовину змея. Голова у неё была головой красивой женщины, а тело — змеиным. Она жила под землёй вместе с тысячами змей.

Однажды юноша по имени Джамасп пошёл с друзьями собирать мёд. В одном колодце они нашли много мёда. Друзья спустили Джамаспа в колодец, но, получив мёд, бросили его там и убежали.

В колодце Джамасп нашёл дыру и вышел в прекрасный подземный сад. Там он увидел Шахмеран. Шахмеран хорошо с ним обращалась и научила его всему, что знала. Джамасп прожил там много лет. Потом он затосковал по семье и захотел уйти. Шахмеран сказала: «Иди, но никому не говори, где я живу. И ещё: не ходи в баню».

Через много лет падишах страны тяжело заболел. Визирь сказал, что падишах поправится, только если съест мясо Шахмеран. Солдаты стали искать по всем баням и нашли Джамаспа: кожа у него была покрыта чешуёй — значит, он видел Шахмеран. Джамаспу пришлось открыть, где она живёт.

Перед смертью Шахмеран сказала Джамаспу: «Сварите меня. Первую воду пусть выпьет визирь, вторую — ты». Визирь выпил первую воду и умер. Джамасп выпил вторую и узнал лекарства от всех болезней. Падишах тоже поправился.

Сегодня в Мардине и Тарсусе изображения Шахмеран можно увидеть на стенах, украшениях и картинах.`,
    body: `Şahmeran, yarı insan yarı yılan bir kraliçeymiş. Başı güzel bir kadının başı, bedeni ise bir yılanın bedeniymiş. Yerin altında, binlerce yılanla birlikte yaşarmış.

Bir gün Camasp adında genç bir adam, arkadaşlarıyla bal toplamaya gitmiş. Bir kuyuda çok bal bulmuşlar. Arkadaşları Camasp'ı kuyuya indirmişler, ama balı alınca onu orada bırakıp kaçmışlar.

Camasp kuyuda bir delik bulmuş ve yerin altındaki güzel bir bahçeye çıkmış. Orada Şahmeran'ı görmüş. Şahmeran ona iyi davranmış ve bildiği her şeyi ona öğretmiş. Camasp yıllarca orada kalmış. Sonra ailesini özlemiş ve gitmek istemiş. Şahmeran demiş: "Git, ama benim yerimi kimseye söyleme. Bir de hamama gitme."

Yıllar sonra ülkenin padişahı çok hastalanmış. Vezir, padişahın ancak Şahmeran'ın etini yerse iyileşeceğini söylemiş. Askerler bütün hamamlara bakmışlar ve Camasp'ı bulmuşlar: derisi pul pulmuş, yani o Şahmeran'ı görmüş. Camasp onun yerini söylemek zorunda kalmış.

Şahmeran ölmeden önce Camasp'a şöyle demiş: "Beni kaynatın. İlk suyu vezir içsin, ikinci suyu sen iç." Vezir ilk suyu içmiş ve ölmüş. Camasp ikinci suyu içmiş ve bütün hastalıkların ilacını öğrenmiş. Padişah da iyileşmiş.

Bugün Mardin ve Tarsus'ta duvarlarda, takılarda ve resimlerde Şahmeran'ı görebilirsiniz.`
  },
  {
    id: 'tr-tale-koroglu', level: 'B1', topic: 'Легенды', title: 'Köroğlu', art: 'tale-tr-koroglu', set: SET_ID, note: NOTE,
    summary: 'Кёроглу — народный герой-разбойник и певец-ашык, турецкий Робин Гуд. Жестокий бей ослепил его отца-конюха за то, что тот привёл невзрачного жеребёнка. Сын поклялся отомстить и получил прозвище «сын слепого». Жеребёнок вырос в волшебного коня Кырата, а Кёроглу собрал в горах Чамлыбель бедняков и храбрецов. Знаменитая фраза о ружьях «Delikli demir çıktı, mertlik bozuldu» — «Появилось железо с дыркой — пропала честная доблесть» — до сих пор цитируется в Турции.',
    explain: [
      ['Köroğlu', 'kör — слепой + oğul (oğlu) — сын: «сын слепого».'],
      ['seyis', 'Конюх, который ухаживает за лошадьми бея.'],
      ['bey', 'Бей — правитель области, господин.'],
      ['tay', 'Жеребёнок.'],
      ['intikam almak', 'Отомстить; yemin etmek — поклясться.'],
      ['saz, aşık', 'Саз — турецкий струнный инструмент; ашык — народный поэт-певец, который поёт под саз.'],
      ['mertlik', 'Мужество, честная доблесть (mert — честный, отважный).']
    ],
    translation: `У бея города Болу был конюх по имени Юсуф. Бей попросил у него хорошего коня. Юсуф привёл жеребёнка: тот выглядел худым и некрасивым, но на самом деле это был очень ценный жеребёнок. Бей разгневался: «Ты привёл мне этого уродливого коня?» — и велел ослепить Юсуфа.

Сын Юсуфа, Рушен Али, поклялся отомстить за отца. Поэтому его прозвали Кёроглу, то есть «сын слепого». Отец и сын очень хорошо заботились о жеребёнке. Он рос в тёмной конюшне и стал конём по имени Кырат, который скакал, как ветер.

Кёроглу ушёл в горы Чамлыбель. Вокруг себя он собрал бедных и смелых людей. Они отнимали у богатых и отдавали бедным. Кёроглу был не только героем, но и ашыком: с сазом в руках он пел прекрасные песни.

В конце концов Кёроглу отомстил бею Болу за отца. Говорят, когда изобрели ружьё, Кёроглу сказал: «Появилось железо с дыркой — пропала доблесть» — и ушёл из гор.`,
    body: `Bolu beyinin Yusuf adında bir seyisi varmış. Bey ondan iyi bir at istemiş. Yusuf bir tay getirmiş. Tay zayıf ve çirkin görünüyormuş, ama aslında çok değerli bir taymış. Bey kızmış: "Bana bu çirkin atı mı getirdin?" demiş ve Yusuf'un gözlerini kör ettirmiş.

Yusuf'un oğlu Ruşen Ali, babasının intikamını almak için yemin etmiş. Bu yüzden ona Köroğlu, yani "körün oğlu" demişler. Baba ile oğul taya çok iyi bakmışlar. Tay karanlık bir ahırda büyümüş ve rüzgâr gibi koşan, Kırat adında bir at olmuş.

Köroğlu, Çamlıbel dağlarına çıkmış. Etrafına fakir ve cesur insanları toplamış. Zenginlerden alıp fakirlere vermişler. Köroğlu hem bir kahraman, hem de bir aşıkmış: elinde sazıyla güzel türküler söylermiş.

Sonunda Köroğlu, Bolu beyinden babasının intikamını almış. Anlatılana göre, tüfek çıkınca Köroğlu "Delikli demir çıktı, mertlik bozuldu" demiş ve dağlardan çekilmiş.`
  }
];

// Набор «Слова из сказок»: главные слова всех десяти сказок
export const SET = `masal|сказка
efsane|легенда
hikâye|история, рассказ
padişah|падишах, султан
dev|дэв, великан
kahraman|герой, богатырь
kule|башня
yılan|змея
kürk|шуба, мех
düğün|свадьба
kazan|казан, большой котёл
tencere|кастрюля
komşu|сосед
ödünç|взаймы (ödünç almak — одолжить)
göl|озеро
maya|закваска (maya çalmak — заквасить)
kaşık|ложка
kase|миска, пиала
köylü|крестьянин, деревенский житель
fakir|бедный
zengin|богатый
güçlü|сильный
kibirli|надменный, гордый
cesur|смелый
yiğit|храбрец, удалец
orman|лес
odun|дрова
taş|камень
dağ|гора
köprü|мост
mağara|пещера
kuyu|колодец
saray|дворец
kılıç|меч
ok|стрела
koyun|овца
at|конь, лошадь
tay|жеребёнок
koç|баран
altın|золото
çuval|мешок
sopa|палка, дубина
kabak|тыква
yorgan|одеяло
can|душа, жизнь
kader|судьба
aşk|любовь
intikam|месть
yemin|клятва (yemin etmek — клясться)
saklanmak|прятаться
korkmak|бояться, пугаться
şaşırmak|удивляться
kızmak|сердиться
inanmak|верить
bağışlamak|прощать, миловать
kurtarmak|спасать
kurtulmak|спастись
öldürmek|убивать
ısırmak|кусать
sıkmak|сжимать, выжимать`;

// Остальные слова сказок — только в словарь, для перевода по клику
export const WORDS = `hoca|ходжа: учитель, духовное лицо; Nasreddin Hoca — Насреддин Ходжа
basit|простой
giysi|одежда
kimse|никто (с отрицанием), кто-нибудь
köşe|угол
sessizce|тихо, молча
tekrar|снова, ещё раз
sefer|раз (bu sefer — на этот раз)
herkes|все, каждый
ayağa|на ноги (ayağa kalkmak — встать)
oturtmak|усаживать, сажать
kol|рука; рукав
sokmak|совать, засовывать
gülümsemek|улыбаться
kenar|край, берег (göl kenarı — берег озера)
yoğurt|йогурт
çalmak|играть; стучать (kapı çalmak); красть; maya çalmak — заквасить
hiç|совсем, вообще; разве (в вопросе); hiç … mü? — разве?
cevap|ответ (cevap vermek — отвечать)
sakin|спокойный
tutmak|держать; удаваться (ya tutarsa — а вдруг получится)
türk|турок; турецкий
müjde|радостная весть
doğurmak|рожать
sevinmek|радоваться
saf|простодушный, наивный; чистый
süre|срок, время (bir süre sonra — через некоторое время)
üzgün|печальный, огорчённый
bağırmak|кричать
neden|почему; причина
evvel|прежде, давно (evvel zaman — давние времена)
zaman|время
kalbur|решето
saman|солома
keloğlan|Кельоглан, «плешивый парень» — герой сказок
toplamak|собирать
karşı|напротив (karşısına çıkmak — появиться перед кем-то)
kocaman|огромный
belli|ясный, заметный (belli etmemek — не подать виду)
toz|пыль, порошок
cep|карман
parça|кусок
peynir|сыр
çıkarmak|вынимать, доставать
sanmak|думать, принимать за
akmak|течь
misafir|гость
yatak|кровать, постель
kalın|толстый
vurmak|ударять, бить
sinek|муха
rahatsız|беспокойный (rahatsız etmek — беспокоить, мешать)
bile|даже
gök|небо
anlatmak|рассказывать
dinlemek|слушать
ada|остров
boğaz|горло; пролив; Boğaz — Босфор
hakkında|о, про
falcı|гадалка
korumak|защищать
yaptırmak|велеть построить, заказать
ziyaret|посещение (ziyaret etmek — навещать)
doğum günü|день рождения
doğum|рождение
hâlâ|всё ещё
hediye|подарок
sepet|корзина
meyve|фрукты
göndermek|посылать
üzüm|виноград
kaçılmaz|нельзя убежать (от kaçmak)
müze|музей
kafe|кафе
kayık|лодка
manzara|вид, пейзаж
izlemek|смотреть, наблюдать
yetenekli|талантливый
sanatçı|художник, артист
resim|картина, рисунок
âşık|влюблённый (âşık olmak — влюбиться)
delmek|пробивать, сверлить
getirmek|приносить, приводить
külünk|кирка каменотёса
yaklaşmak|приближаться
evlilik|брак, женитьба
yalan|ложь (yalan söylemek — лгать)
üzülmek|огорчаться
koşmak|бежать
yan|бок, сторона (yanına — к нему; yan yana — рядом)
gömmek|хоронить, закапывать
kanal|канал
temiz|чистый
gibi|как, подобно
kitap|книга
oğuz|огуз (Oğuzlar — огузы, предки турок)
arasında|среди, между
kuru|сухой
dere|ручей, речка; русло
akçe|акче — старинная серебряная монета
emir|приказ, воля (Allah'ın emriyle — по воле Аллаха)
allah|Аллах, Бог
savaşmak|сражаться
kibir|гордыня, надменность
çekmek|тянуть (kılıç çekmek — выхватить меч)
güvercin|голубь
uçmak|летать
göğüs|грудь
yalvarmak|умолять
yer|место; земля
aynı|такой же, тот же
kurban|жертва (kurban olsun — пусть будет жертвой)
sevgi|любовь
ağlamak|плакать
dua|молитва (dua etmek — молиться)
birden|сразу, вдруг
ömür|жизнь, век (ömür vermek — дать жизни)
yüz|сто; лицо
kırk|сорок
otuz|тридцать
beş yüz|пятьсот
ünlü|знаменитый
alın|лоб
tek|единственный, один
beden|тело
hiçbir|ни один
kesmek|резать, рубить
zarar|вред (zarar vermek — вредить)
anlaşma|договор, соглашение
sıra|очередь; ряд
ikinci|второй
ilk|первый
daha önce|раньше
şiş|вертел, шампур
ateş|огонь
kızdırmak|раскалять; сердить
saplamak|вонзать
kör|слепой
dışarı|наружу, на улицу
yoklamak|ощупывать; проверять
deri|кожа, шкура
sihirli|волшебный
sadece|только
bayram|праздник
destan|эпос, сказание
benzemek|быть похожим
kiklop|циклоп
yarı|половина, наполовину
kraliçe|королева, царица
ise|же, а (bedeni ise — а тело)
bin|тысяча
bal|мёд
indirmek|спускать, опускать
bırakmak|оставлять, бросать
kaçmak|убегать
delik|дыра, отверстие
bahçe|сад
davranmak|вести себя, обращаться
öğretmek|учить, обучать
yıllarca|годами, много лет
özlemek|скучать, тосковать
hamam|баня, хамам
ülke|страна
hastalanmak|заболевать
vezir|визирь
ancak|только, лишь
et|мясо
iyileşmek|выздоравливать
asker|солдат
pul|чешуйка; марка; pul pul — чешуйчатый
yani|то есть
zorunda|вынужденный (zorunda kalmak — быть вынужденным)
kaynatmak|варить, кипятить
hastalık|болезнь
ilaç|лекарство
takı|украшение
duvar|стена
bey|бей, господин
seyis|конюх
zayıf|худой, слабый
çirkin|уродливый, некрасивый
görünmek|выглядеть, казаться
aslında|на самом деле
değerli|ценный
ettirmek|заставить сделать (kör ettirmek — велеть ослепить)
karanlık|тёмный; темнота
ahır|конюшня, хлев
büyümek|расти
rüzgâr|ветер
etraf|окрестность (etrafına — вокруг себя)
aşık|ашык — народный певец-поэт
saz|саз — струнный инструмент
türkü|народная песня
sonunda|в конце концов
tüfek|ружьё
delikli|с дыркой, дырявый
demir|железо
mertlik|мужество, честная доблесть
bozulmak|портиться, ломаться
çekilmek|удаляться, уходить
söylemek|говорить; петь (türkü söylemek)
hasta|больной
yatmak|ложиться, лежать
orta|середина (ortasında — посередине)
üst|верх (üstüne — на; üstünde — на нём)
geri|назад (geri vermek — вернуть)
beri|с (o günden beri — с того дня)
gündüz|днём; день (gece gündüz — день и ночь)
defa|раз (ilk defa — впервые)
ya|а вдруг; ya … ya da — либо … либо
hem|и (hem … hem de — и … и)
sultan|султан, правитель; правительница
alt|низ (altında — под, altına — подо что-то)
iç|внутренность (içinde — внутри)
amasya|Амасья — город на севере Турции
mardin|Мардин — древний город на юго-востоке Турции
tarsus|Тарсус — город на юге Турции
bolu|Болу — город между Стамбулом и Анкарой
ali|Али (имя)`;

// Формы, которые не сводятся к словарной отрезанием аффиксов
export const FORMS = {
  'git': 'gitmek', 'al': 'almak', 'getir': 'getirmek', 'iç': 'içmek', 'ol': 'olmak',
  'yere': 'yer', 'yerden': 'yer', 'yerin': 'yer', 'yerimi': 'yer', 'yerini': 'yer',
  'atıyor': 'atmak', 'atmış': 'atmak', 'soruyor': 'sormak', 'veriyor': 'vermek', 'verir': 'vermek',
  'içinde': 'iç', 'altına': 'alt', 'altında': 'alt', 'altındaki': 'alt',
  'geçer': 'geçmek', 'geçenden': 'geçmek', 'geçmeyenden': 'geçmek', 'etmemiş': 'etmek', 'etmiş': 'etmek',
  'kızmış': 'kızmak', 'savaşsın': 'savaşmak', 'görünce': 'görmek', 'alınca': 'almak', 'kaçmışlar': 'kaçmak',
  'ye': 'yemek', 'yesin': 'yemek', 'yerse': 'yemek', 'yiyeceğim': 'yemek', 'yemiş': 'yemek',
  'demez': 'demek', 'derler': 'demek', 'demiş': 'demek', 'demişler': 'demek', 'diyor': 'demek', 'denen': 'demek', 'denir': 'demek',
  'kürküm': 'kürk', 'kürke': 'kürk', 'kürkün': 'kürk',
  'yoğurdu': 'yoğurt', 'hocam': 'hoca', 'kazanım': 'kazan', 'kazanın': 'kazan',
  'doğurduğuna': 'doğurmak', 'öldüğüne': 'ölmek',
  'annesiyle': 'anne', 'karşısına': 'karşı', 'cebinden': 'cep', 'suyu': 'su',
  'kendisi': 'kendi', 'kendini': 'kendi', 'anlatana': 'anlatmak', 'dinleyene': 'dinlemek', 'anlatılır': 'anlatmak', 'anlatılana': 'anlatmak',
  'kaderden': 'kader', 'sekizinci': 'sekiz',
  'külüngünü': 'külünk', 'şehrimizde': 'şehir', 'del': 'delmek', 'delemezmiş': 'delmek',
  'kibre': 'kibir', 'emriyle': 'emir', 'göğsüne': 'göğüs', 'canını': 'can', 'canım': 'can', 'canına': 'can', 'canımı': 'can',
  'ikimizin': 'iki', 'ikimizi': 'iki', 'ikisini': 'iki', 'ömür': 'ömür',
  'alnının': 'alın', 'oğluna': 'oğul', 'oğlunu': 'oğul', 'oğlu': 'oğul', 'oğlum': 'oğul', 'oğul': 'oğul',
  'ünlülerinden': 'ünlü', 'hikâyesidir': 'hikâye', 'hikâyesine': 'hikâye', 'hikâyelerinin': 'hikâye', 'hikâyesi': 'hikâye',
  'bildiği': 'bilmek', 'iyileşeceğini': 'iyileşmek', 'etini': 'et', 'derisi': 'deri',
  'beyinin': 'bey', 'beyinden': 'bey', 'intikamını': 'intikam', 'körün': 'kör', 'etrafına': 'etraf', 'sazıyla': 'saz',
  'ağlayarak': 'ağlamak', 'gülerek': 'gülmek', 'ölecek': 'ölmek', 'ısıracak': 'ısırmak', 'vereceklermiş': 'vermek', 'gideceğim': 'gitmek', 'kurtaracağım': 'kurtarmak'
};
