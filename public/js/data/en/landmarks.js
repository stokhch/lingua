// Достопримечательности англоязычного мира: Великобритания, Ирландия, США, Канада, Австралия.
// Тексты написаны для Лингвы по общедоступным сведениям (энциклопедии, сайты музеев и парков), уровень B1.
// У каждой карточки: текст 10+ предложений для читалки (перевод по клику), перевод целиком, пояснения, слова и ссылки.
export const LANDMARKS_INTRO = 'Десять самых известных мест Великобритании, Ирландии, США, Канады и Австралии — от Биг-Бена до Сиднейской оперы.';

export const LANDMARKS = [
  {
    id: 'sight-en-bigben', level: 'B1', region: 'Лондон, Англия', title: 'Big Ben and the Houses of Parliament', ru: 'Биг-Бен и здание Парламента',
    desc: 'Самые знаменитые часы мира и неоготический Вестминстерский дворец на берегу Темзы.',
    body: `Big Ben is probably the most famous clock in the world, but the name does not really belong to the tower. Big Ben is the nickname of the Great Bell, which hangs inside the clock tower and weighs more than thirteen tonnes. In 2012 the tower was officially renamed the Elizabeth Tower to celebrate sixty years of Queen Elizabeth II on the throne.

The tower stands at the north end of the Palace of Westminster, where the British Parliament meets. The old palace burned down in a terrible fire in 1834, and almost everything had to be built again. The architects Charles Barry and Augustus Pugin designed the new building in the Gothic style, with hundreds of towers, statues and pointed windows. The clock tower was finished in 1859 and is about ninety-six metres tall.

Each of the four clock faces is seven metres wide, and the minute hands are more than four metres long. For many years the clock was famous for its accuracy, and engineers sometimes adjusted it by putting old pennies on the pendulum. From 2017 to 2022 the tower was covered in scaffolding during a long restoration, and the bell was mostly silent. Today the deep sound of Big Ben is heard again on the radio every New Year's Eve, and millions of people count down the seconds with it.`,
    translation: `Биг-Бен — пожалуй, самые знаменитые часы в мире, но на самом деле это имя принадлежит не башне. Биг-Бен — это прозвище Большого колокола, который висит внутри часовой башни и весит больше тринадцати тонн. В 2012 году башню официально переименовали в Башню Елизаветы в честь шестидесятилетия правления королевы Елизаветы II.

Башня стоит у северного края Вестминстерского дворца, где заседает британский парламент. Старый дворец сгорел в страшном пожаре 1834 года, и почти всё пришлось строить заново. Архитекторы Чарльз Барри и Огастес Пьюджин спроектировали новое здание в готическом стиле — с сотнями башенок, статуй и стрельчатых окон. Часовую башню достроили в 1859 году, её высота около девяноста шести метров.

Каждый из четырёх циферблатов — семь метров в ширину, а минутные стрелки длиннее четырёх метров. Много лет часы славились точностью, и инженеры иногда подправляли ход, кладя на маятник старые пенни. С 2017 по 2022 год башня стояла в строительных лесах на долгой реставрации, и колокол почти молчал. Сегодня низкий звон Биг-Бена снова звучит по радио каждую новогоднюю ночь, и миллионы людей отсчитывают с ним секунды.`,
    explain: [
      ['does not really belong to', 'на самом деле не относится к… — belong to: «принадлежать»'],
      ['was renamed', 'пассив прошедшего времени: «была переименована»'],
      ['had to be built again', 'had to + пассивный инфинитив: «пришлось построить заново»'],
      ['Gothic style', 'неоготика XIX века: стрельчатые окна, шпили, много резных деталей'],
      ['count down', 'фразовый глагол: «вести обратный отсчёт»']
    ],
    words: [['nickname', 'прозвище'], ['bell', 'колокол'], ['weighs', 'весит'], ['throne', 'трон'], ['palace', 'дворец'], ['clock', 'часы (настенные, башенные)'], ['hands', 'стрелки (часов); руки'], ['accuracy', 'точность'], ['pendulum', 'маятник'], ['scaffolding', 'строительные леса'], ['restoration', 'реставрация']],
    links: [{ title: 'Википедия: Биг-Бен', href: 'https://ru.wikipedia.org/wiki/Биг-Бен' }, { title: 'Wikipedia: Big Ben', href: 'https://en.wikipedia.org/wiki/Big_Ben' }, { title: 'UK Parliament: Big Ben', href: 'https://www.parliament.uk/bigben' }]
  },
  {
    id: 'sight-en-tower', level: 'B1', region: 'Лондон, Англия', title: 'The Tower of London', ru: 'Лондонский Тауэр',
    desc: 'Крепость Вильгельма Завоевателя: дворец, тюрьма, монетный двор и хранилище королевских драгоценностей.',
    body: `The Tower of London is a castle on the north bank of the River Thames. It was founded by William the Conqueror soon after he invaded England in 1066. The oldest part, a huge stone keep called the White Tower, was built to show the people of London who their new master was.

Over nine centuries the Tower has had many different jobs. It has been a royal palace, a fortress, a prison and a place of execution. It also kept the Royal Mint, where coins were made, and even a zoo with lions, bears and an elephant. Some of the most famous prisoners in English history were held here, including Anne Boleyn, the second wife of Henry VIII.

Today the Tower is a museum and a World Heritage Site. Visitors queue to see the Crown Jewels, the crowns and sceptres that are still used at coronations. The guards, called Yeoman Warders or Beefeaters, wear red and dark blue uniforms and tell stories about the castle. Ravens also live in the Tower, and an old legend says that the kingdom will fall if they ever leave. That is why at least six ravens are always kept there and looked after by a special Ravenmaster.`,
    translation: `Лондонский Тауэр — это замок на северном берегу Темзы. Его основал Вильгельм Завоеватель вскоре после того, как в 1066 году вторгся в Англию. Самую древнюю часть — огромную каменную башню-донжон, которую называют Белой башней, — построили, чтобы показать жителям Лондона, кто их новый хозяин.

За девять веков у Тауэра было много разных ролей. Он был королевским дворцом, крепостью, тюрьмой и местом казней. Здесь же размещался Королевский монетный двор, где чеканили монеты, и даже зверинец со львами, медведями и слоном. Здесь держали некоторых самых знаменитых узников английской истории, в том числе Анну Болейн, вторую жену Генриха VIII.

Сегодня Тауэр — музей и объект Всемирного наследия. Посетители стоят в очереди, чтобы увидеть королевские регалии — короны и скипетры, которые до сих пор используют при коронациях. Стражи, которых называют йоменами или «бифитерами», носят красно-синюю форму и рассказывают истории о замке. В Тауэре живут и вороны, и старая легенда гласит, что королевство падёт, если они когда-нибудь улетят. Поэтому там всегда держат не меньше шести воронов, а заботится о них особый смотритель — Ravenmaster.`,
    explain: [
      ['was founded by', 'пассив: «был основан кем-то»'],
      ['has had many different jobs', 'present perfect: история продолжается до сих пор'],
      ['were held', 'hold a prisoner — держать узника'],
      ['Beefeaters', 'шутливое прозвище стражи — «едоки говядины»: когда-то им полагался паёк мяса'],
      ['looked after by', 'look after — заботиться; в пассиве предлог by указывает, кто заботится']
    ],
    words: [['castle', 'замок'], ['bank', 'берег (реки); банк'], ['founded', 'основал'], ['invaded', 'вторгся'], ['keep', 'донжон, главная башня замка'], ['fortress', 'крепость'], ['prison', 'тюрьма'], ['execution', 'казнь'], ['coins', 'монеты'], ['prisoners', 'узники, заключённые'], ['queue', 'стоять в очереди'], ['coronations', 'коронации'], ['ravens', 'вороны'], ['legend', 'легенда']],
    links: [{ title: 'Википедия: Тауэр', href: 'https://ru.wikipedia.org/wiki/Тауэр' }, { title: 'Wikipedia: Tower of London', href: 'https://en.wikipedia.org/wiki/Tower_of_London' }, { title: 'Historic Royal Palaces', href: 'https://www.hrp.org.uk/tower-of-london/' }]
  },
  {
    id: 'sight-en-stonehenge', level: 'B1', region: 'Уилтшир, Англия', title: 'Stonehenge', ru: 'Стоунхендж',
    desc: 'Каменный круг эпохи неолита, выстроенный по солнцу; камни везли за десятки и сотни километров.',
    body: `Stonehenge is a circle of enormous standing stones on Salisbury Plain in the south of England. It was built in several stages between about 3000 and 2000 BC, long before anyone in Britain could write. Nobody knows exactly why it was made, so it remains one of the great mysteries of the ancient world.

The monument uses two kinds of stone. The largest stones, called sarsens, weigh up to twenty-five tonnes and were brought from hills about twenty-five kilometres away. The smaller bluestones came from the Preseli Hills in Wales, more than two hundred kilometres to the west. Scientists still argue about how people without metal tools or wheels moved them, but sledges, ropes and wooden rollers are the most popular explanation.

The stones are carefully arranged according to the sun. On the longest day of the year, the summer solstice, the sun rises almost exactly over a stone called the Heel Stone. Thousands of people come every June to watch the sunrise and celebrate. Some archaeologists believe Stonehenge was a temple, others think it was a place for burials or for healing the sick. Since 1986 it has been a World Heritage Site, and visitors now walk around the circle on a path to protect the ground.`,
    translation: `Стоунхендж — это круг огромных стоячих камней на Солсберийской равнине на юге Англии. Его строили в несколько этапов примерно между 3000 и 2000 годами до нашей эры, задолго до того, как в Британии кто-либо умел писать. Никто точно не знает, зачем его создали, поэтому он остаётся одной из великих загадок древнего мира.

В памятнике использованы два вида камня. Самые большие камни, сарсены, весят до двадцати пяти тонн, и их привезли с холмов примерно в двадцати пяти километрах отсюда. Меньшие «голубые камни» доставили с холмов Пресели в Уэльсе, больше чем за двести километров к западу. Учёные до сих пор спорят, как люди без металлических орудий и колёс их перемещали, но самое популярное объяснение — волокуши, верёвки и деревянные катки.

Камни тщательно выстроены по солнцу. В самый длинный день года, в день летнего солнцестояния, солнце встаёт почти точно над камнем, который называют Пяточным. Каждый июнь тысячи людей приезжают сюда встретить рассвет и отпраздновать. Одни археологи считают Стоунхендж храмом, другие думают, что это было место погребений или исцеления больных. С 1986 года это объект Всемирного наследия, и теперь посетители обходят круг по дорожке, чтобы не вытаптывать землю.`,
    explain: [
      ['BC', 'before Christ — «до нашей эры»; AD — «нашей эры»'],
      ['long before anyone … could write', 'long before — «задолго до того, как»'],
      ['were brought from', 'пассив от bring: «были привезены из»'],
      ['argue about', 'спорить о чём-то'],
      ['summer solstice', 'летнее солнцестояние, около 21 июня']
    ],
    words: [['enormous', 'огромный'], ['plain', 'равнина'], ['stages', 'этапы'], ['mysteries', 'загадки, тайны'], ['ancient', 'древний'], ['hills', 'холмы'], ['tools', 'орудия, инструменты'], ['wheels', 'колёса'], ['sledges', 'сани, волокуши'], ['ropes', 'верёвки'], ['rollers', 'катки'], ['arranged', 'расположены'], ['sunrise', 'рассвет'], ['burials', 'погребения'], ['healing', 'исцеление']],
    links: [{ title: 'Википедия: Стоунхендж', href: 'https://ru.wikipedia.org/wiki/Стоунхендж' }, { title: 'Wikipedia: Stonehenge', href: 'https://en.wikipedia.org/wiki/Stonehenge' }, { title: 'English Heritage', href: 'https://www.english-heritage.org.uk/visit/places/stonehenge/' }]
  },
  {
    id: 'sight-en-edinburgh', level: 'B1', region: 'Эдинбург, Шотландия', title: 'Edinburgh Castle', ru: 'Эдинбургский замок',
    desc: 'Замок на скале потухшего вулкана, шотландская корона, Камень судьбы и пушка, стреляющая в час дня.',
    body: `Edinburgh Castle stands on Castle Rock, the remains of an ancient volcano that last erupted about 350 million years ago. From the top of the rock you can see the whole city, the sea and the hills around it. People have lived on this rock since the Bronze Age, because it was so easy to defend.

The oldest building in Edinburgh is inside the castle walls. It is St Margaret's Chapel, a tiny stone church built in the twelfth century in memory of a Scottish queen. The castle also keeps the Honours of Scotland, the oldest crown jewels in the British Isles. Next to them lies the Stone of Destiny, on which Scottish kings were crowned for centuries. The English took the stone to London in 1296, and it was returned to Scotland only in 1996.

Every day except Sunday a cannon is fired from the castle at exactly one o'clock. In the past it helped ships in the harbour to check their clocks. In August the castle becomes the stage for the Royal Edinburgh Military Tattoo, a show with bagpipes, drums and fireworks. From the castle gates the Royal Mile, an old street full of shops and pubs, runs down to the royal palace of Holyrood.`,
    translation: `Эдинбургский замок стоит на Замковой скале — остатке древнего вулкана, который в последний раз извергался около 350 миллионов лет назад. С вершины скалы видно весь город, море и холмы вокруг. Люди жили на этой скале ещё с бронзового века, потому что её было очень легко оборонять.

Самое старое здание Эдинбурга находится внутри стен замка. Это часовня святой Маргариты — крошечная каменная церковь, построенная в XII веке в память о шотландской королеве. В замке хранятся и «Регалии Шотландии» — старейшие королевские драгоценности на Британских островах. Рядом с ними лежит Камень судьбы, на котором веками короновали шотландских королей. Англичане увезли камень в Лондон в 1296 году, а вернули его в Шотландию только в 1996-м.

Каждый день, кроме воскресенья, ровно в час дня из замка стреляет пушка. Раньше по ней корабли в гавани сверяли часы. В августе замок превращается в сцену для Королевского военного тату — шоу с волынками, барабанами и фейерверками. От ворот замка вниз, к королевскому дворцу Холируд, спускается Королевская миля — старая улица, полная магазинов и пабов.`,
    explain: [
      ['last erupted', 'erupt — «извергаться»; last здесь — «в последний раз»'],
      ['in memory of', '«в память о»'],
      ['were crowned', 'пассив от crown: «короновались»'],
      ['is fired', 'пассив настоящего времени: «производится выстрел»'],
      ['Tattoo', 'здесь не татуировка, а военный парад с музыкой: от голландского «doe den tap toe» — «закрывай краны» (сигнал трактирам)']
    ],
    words: [['rock', 'скала'], ['remains', 'остатки'], ['volcano', 'вулкан'], ['erupted', 'извергался'], ['defend', 'защищать, оборонять'], ['walls', 'стены'], ['chapel', 'часовня'], ['tiny', 'крошечный'], ['crown', 'корона'], ['destiny', 'судьба'], ['returned', 'вернули'], ['cannon', 'пушка'], ['harbour', 'гавань'], ['bagpipes', 'волынки'], ['drums', 'барабаны'], ['fireworks', 'фейерверк']],
    links: [{ title: 'Википедия: Эдинбургский замок', href: 'https://ru.wikipedia.org/wiki/Эдинбургский_замок' }, { title: 'Wikipedia: Edinburgh Castle', href: 'https://en.wikipedia.org/wiki/Edinburgh_Castle' }, { title: 'Официальный сайт', href: 'https://www.edinburghcastle.scot/' }]
  },
  {
    id: 'sight-en-cliffs', level: 'B1', region: 'Графство Клэр, Ирландия', title: 'The Cliffs of Moher', ru: 'Утёсы Мохер',
    desc: 'Отвесные скалы над Атлантикой высотой больше двухсот метров, тупики и башня О’Брайена.',
    body: `The Cliffs of Moher are on the west coast of Ireland, in County Clare, where the land suddenly ends above the Atlantic Ocean. They stretch for about fourteen kilometres and rise to a height of more than two hundred metres. On a clear day you can see the Aran Islands and the mountains of Connemara far away across the water.

The cliffs are made of layers of sandstone and shale that formed at the bottom of a river delta about 320 million years ago. The ocean waves keep breaking the rock, so pieces of the cliffs fall into the sea every year. Thousands of seabirds nest on the narrow ledges, and in spring and summer you may see puffins with their bright orange beaks.

Near the highest point stands O'Brien's Tower, a small round stone tower built in 1835 by a local landowner for visitors. Even then he hoped that tourism would help the poor people of the area. Today about a million and a half people come here every year, and there is a visitor centre built into the hillside so that it does not spoil the view. The cliffs have also appeared in films, including Harry Potter and the Half-Blood Prince. The wind here can be extremely strong, so visitors are asked to stay behind the safety wall.`,
    translation: `Утёсы Мохер находятся на западном побережье Ирландии, в графстве Клэр, где суша внезапно обрывается над Атлантическим океаном. Они тянутся примерно на четырнадцать километров и поднимаются на высоту больше двухсот метров. В ясный день вдалеке за водой видны Аранские острова и горы Коннемары.

Утёсы сложены слоями песчаника и сланца, которые образовались на дне речной дельты около 320 миллионов лет назад. Океанские волны постоянно разрушают скалу, поэтому каждый год куски утёсов падают в море. Тысячи морских птиц гнездятся на узких уступах, а весной и летом можно увидеть тупиков с их ярко-оранжевыми клювами.

Неподалёку от самой высокой точки стоит башня О’Брайена — маленькая круглая каменная башня, которую в 1835 году построил для гостей местный землевладелец. Уже тогда он надеялся, что туризм поможет бедным жителям округи. Сегодня сюда приезжают около полутора миллионов человек в год, а центр для посетителей встроен прямо в склон холма, чтобы не портить вид. Утёсы появлялись и в фильмах, например в «Гарри Поттере и Принце-полукровке». Ветер здесь бывает очень сильным, поэтому посетителей просят не заходить за защитную стену.`,
    explain: [
      ['stretch for', 'тянуться на (какое-то расстояние)'],
      ['keep breaking', 'keep + -ing: «продолжают, постоянно делают»'],
      ['may see', 'may — «можете (с некоторой вероятностью)»'],
      ['so that it does not spoil', 'so that — «чтобы» (цель)'],
      ['are asked to stay', 'пассив: «их просят оставаться»']
    ],
    words: [['cliffs', 'утёсы'], ['coast', 'побережье'], ['suddenly', 'внезапно'], ['height', 'высота'], ['layers', 'слои'], ['sandstone', 'песчаник'], ['shale', 'сланец'], ['waves', 'волны'], ['seabirds', 'морские птицы'], ['nest', 'гнездиться'], ['ledges', 'уступы'], ['puffins', 'тупики (птицы)'], ['beaks', 'клювы'], ['landowner', 'землевладелец'], ['spoil', 'портить']],
    links: [{ title: 'Википедия: Утёсы Мохер', href: 'https://ru.wikipedia.org/wiki/Утёсы_Мохер' }, { title: 'Wikipedia: Cliffs of Moher', href: 'https://en.wikipedia.org/wiki/Cliffs_of_Moher' }, { title: 'Официальный сайт', href: 'https://www.cliffsofmoher.ie/' }]
  },
  {
    id: 'sight-en-liberty', level: 'B1', region: 'Нью-Йорк, США', title: 'The Statue of Liberty', ru: 'Статуя Свободы',
    desc: 'Подарок Франции Америке: медная статуя с факелом, встречавшая миллионы иммигрантов.',
    body: `The Statue of Liberty stands on a small island in New York Harbor and is one of the best-known symbols of the United States. It was a gift from the people of France to the people of America, and it was dedicated in 1886. The French sculptor Frédéric Auguste Bartholdi designed the statue, and Gustave Eiffel, who later built the Eiffel Tower, created its iron frame.

The statue shows a woman in a long robe holding a torch high in her right hand. In her left hand she holds a tablet with the date of American independence, July 4, 1776, written in Roman numerals. At her feet lies a broken chain, a symbol of freedom from slavery and oppression. The crown on her head has seven rays, which are often said to stand for the seven continents and seven seas.

The statue is made of thin copper sheets, so at first it was a shiny brown colour. Over about thirty years the air and rain turned the copper green, and this green layer now protects the metal. From the ground to the tip of the torch the monument is about ninety-three metres tall. For millions of immigrants who arrived by ship at nearby Ellis Island, Lady Liberty was the first thing they saw in their new home. Visitors can still climb the stairs inside the statue to look out from the crown.`,
    translation: `Статуя Свободы стоит на небольшом острове в нью-йоркской гавани и является одним из самых известных символов Соединённых Штатов. Это подарок народа Франции народу Америки, торжественно открытый в 1886 году. Статую спроектировал французский скульптор Фредерик Огюст Бартольди, а Гюстав Эйфель, позже построивший Эйфелеву башню, создал её железный каркас.

Статуя изображает женщину в длинном одеянии, которая высоко держит факел в правой руке. В левой руке у неё скрижаль с датой американской независимости — 4 июля 1776 года, записанной римскими цифрами. У её ног лежит разорванная цепь — символ освобождения от рабства и угнетения. У короны на её голове семь лучей, о которых часто говорят, что они означают семь континентов и семь морей.

Статуя сделана из тонких медных листов, поэтому вначале она была блестящей, коричневого цвета. Примерно за тридцать лет воздух и дождь сделали медь зелёной, и теперь этот зелёный слой защищает металл. От земли до кончика факела высота памятника около девяноста трёх метров. Для миллионов иммигрантов, прибывавших на кораблях на соседний остров Эллис, «Леди Свобода» была первым, что они видели на новой родине. Посетители и сегодня могут подняться по лестнице внутри статуи и выглянуть из короны.`,
    explain: [
      ['best-known', 'превосходная степень от well-known — «самый известный»'],
      ['was dedicated', 'dedicate — «посвящать; торжественно открывать (памятник)»'],
      ['Roman numerals', 'римские цифры: JULY IV MDCCLXXVI'],
      ['stand for', 'фразовый глагол: «обозначать, символизировать»'],
      ['Harbor', 'американское написание; в Британии — harbour']
    ],
    words: [['island', 'остров'], ['gift', 'подарок'], ['sculptor', 'скульптор'], ['frame', 'каркас, рама'], ['robe', 'одеяние, мантия'], ['torch', 'факел'], ['tablet', 'скрижаль, табличка'], ['independence', 'независимость'], ['chain', 'цепь'], ['freedom', 'свобода'], ['slavery', 'рабство'], ['rays', 'лучи'], ['copper', 'медь'], ['sheets', 'листы'], ['immigrants', 'иммигранты'], ['stairs', 'лестница']],
    links: [{ title: 'Википедия: Статуя Свободы', href: 'https://ru.wikipedia.org/wiki/Статуя_Свободы' }, { title: 'Wikipedia: Statue of Liberty', href: 'https://en.wikipedia.org/wiki/Statue_of_Liberty' }, { title: 'National Park Service', href: 'https://www.nps.gov/stli/' }]
  },
  {
    id: 'sight-en-grandcanyon', level: 'B1', region: 'Аризона, США', title: 'The Grand Canyon', ru: 'Гранд-Каньон',
    desc: 'Каньон реки Колорадо глубиной больше полутора километров: два миллиарда лет истории Земли в одном разрезе.',
    body: `The Grand Canyon in Arizona is one of the largest and most beautiful canyons on Earth. It is about 446 kilometres long, up to 29 kilometres wide and in some places more than 1.8 kilometres deep. The Colorado River has been cutting through the rock for millions of years, and it is still flowing at the bottom today.

The walls of the canyon look like a giant history book. Each layer of red, orange and grey rock was formed at a different time, and the oldest rocks at the bottom are almost two billion years old. Scientists come here to study fossils of ancient sea creatures, plants and footprints.

Native American peoples, such as the Havasupai and the Hualapai, have lived in and around the canyon for thousands of years. The area became a national park in 1919, and today it receives several million visitors every year. Most people visit the South Rim, which is open all year, while the higher North Rim closes in winter because of snow. Some adventurous visitors walk or ride mules down narrow trails to the river, and others raft through the rapids. It can be very hot at the bottom, so rangers warn hikers to carry plenty of water and never try to go down and back in one day.`,
    translation: `Гранд-Каньон в Аризоне — один из крупнейших и красивейших каньонов на Земле. Его длина около 446 километров, ширина до 29 километров, а глубина местами больше 1,8 километра. Река Колорадо прорезает скалу уже миллионы лет и до сих пор течёт по его дну.

Стены каньона похожи на огромную книгу по истории. Каждый слой красной, оранжевой и серой породы образовался в своё время, а самым старым породам на дне почти два миллиарда лет. Учёные приезжают сюда изучать окаменелости древних морских существ, растений и следы.

Коренные народы Америки, например хавасупаи и валапаи, живут в каньоне и вокруг него тысячи лет. В 1919 году эта территория стала национальным парком, а сегодня её посещают несколько миллионов человек в год. Большинство едет на Южный край каньона, открытый круглый год, а более высокий Северный край зимой закрывают из-за снега. Некоторые смельчаки спускаются к реке по узким тропам пешком или на мулах, а другие сплавляются на плотах через пороги. На дне бывает очень жарко, поэтому смотрители предупреждают туристов брать с собой много воды и никогда не пытаться спуститься и подняться за один день.`,
    explain: [
      ['has been cutting', 'present perfect continuous: действие идёт давно и продолжается'],
      ['look like', '«выглядеть как, быть похожим на»'],
      ['billion', 'миллиард (американское и современное британское значение)'],
      ['while', 'здесь — «тогда как, а» (противопоставление)'],
      ['raft', 'сплавляться на плоту; rapids — речные пороги']
    ],
    words: [['canyon', 'каньон'], ['wide', 'широкий'], ['deep', 'глубокий'], ['cutting', 'прорезая'], ['flowing', 'течёт'], ['bottom', 'дно'], ['giant', 'гигантский'], ['layer', 'слой'], ['fossils', 'окаменелости'], ['creatures', 'существа'], ['footprints', 'следы'], ['rim', 'край, обод'], ['adventurous', 'любящий приключения'], ['mules', 'мулы'], ['trails', 'тропы'], ['rapids', 'пороги'], ['rangers', 'смотрители парка'], ['hikers', 'пешие туристы']],
    links: [{ title: 'Википедия: Гранд-Каньон', href: 'https://ru.wikipedia.org/wiki/Гранд-Каньон' }, { title: 'Wikipedia: Grand Canyon', href: 'https://en.wikipedia.org/wiki/Grand_Canyon' }, { title: 'National Park Service', href: 'https://www.nps.gov/grca/' }]
  },
  {
    id: 'sight-en-goldengate', level: 'B1', region: 'Сан-Франциско, США', title: 'The Golden Gate Bridge', ru: 'Мост Золотые Ворота',
    desc: 'Висячий мост 1937 года цвета «международный оранжевый», окутанный туманом с Тихого океана.',
    body: `The Golden Gate Bridge crosses the Golden Gate, the narrow strait where San Francisco Bay meets the Pacific Ocean. When it opened in 1937, its main span of 1,280 metres was the longest of any suspension bridge in the world. Many engineers had said that a bridge could never be built here because of the strong winds, deep water and frequent fog.

The chief engineer, Joseph Strauss, worked on the project for many years, with the help of the engineer Charles Ellis and the architect Irving Morrow. The two towers rise 227 metres above the water, and the road hangs from two enormous steel cables. Each cable contains more than 27,000 thin wires twisted together.

The famous colour is called International Orange. The US Navy wanted to paint the bridge with black and yellow stripes, but the architect chose orange because it fits the hills and is easy to see in the fog. Painters work on the bridge all the time, because the salty sea air damages the steel. On foggy mornings only the tops of the towers appear above the clouds, which makes the bridge look magical. Today you can walk or cycle across it and enjoy views of the city, the bay and the old prison island of Alcatraz.`,
    translation: `Мост Золотые Ворота пересекает пролив Золотые Ворота — узкий пролив, где залив Сан-Франциско встречается с Тихим океаном. Когда мост открыли в 1937 году, его центральный пролёт в 1280 метров был самым длинным среди всех висячих мостов мира. Многие инженеры говорили, что мост здесь построить невозможно из-за сильных ветров, глубокой воды и частых туманов.

Главный инженер Джозеф Штраус работал над проектом много лет вместе с инженером Чарльзом Эллисом и архитектором Ирвингом Морроу. Две башни поднимаются на 227 метров над водой, а дорога висит на двух огромных стальных тросах. Каждый трос состоит из более чем 27 000 тонких проволок, свитых вместе.

Знаменитый цвет называется «международный оранжевый». Военно-морской флот США хотел покрасить мост в чёрные и жёлтые полосы, но архитектор выбрал оранжевый, потому что он подходит к холмам и хорошо виден в тумане. Маляры работают на мосту постоянно, потому что солёный морской воздух портит сталь. Туманным утром над облаками видны только верхушки башен, и мост кажется волшебным. Сегодня по нему можно пройти пешком или проехать на велосипеде, любуясь видами города, залива и бывшего острова-тюрьмы Алькатрас.`,
    explain: [
      ['strait', 'пролив; не путать со straight — «прямой»'],
      ['suspension bridge', 'висячий мост: полотно подвешено на тросах'],
      ['had said', 'past perfect: говорили ещё до того, как мост построили'],
      ['twisted together', 'свитые вместе'],
      ['all the time', '«постоянно, всё время»']
    ],
    words: [['bridge', 'мост'], ['crosses', 'пересекает'], ['bay', 'залив'], ['span', 'пролёт'], ['suspension', 'подвешивание'], ['engineers', 'инженеры'], ['frequent', 'частый'], ['fog', 'туман'], ['towers', 'башни'], ['steel', 'сталь'], ['cables', 'тросы'], ['wires', 'проволоки, провода'], ['stripes', 'полосы'], ['painters', 'маляры'], ['salty', 'солёный'], ['damages', 'повреждает'], ['magical', 'волшебный'], ['cycle', 'ехать на велосипеде']],
    links: [{ title: 'Википедия: Золотые Ворота (мост)', href: 'https://ru.wikipedia.org/wiki/Золотые_Ворота_(мост)' }, { title: 'Wikipedia: Golden Gate Bridge', href: 'https://en.wikipedia.org/wiki/Golden_Gate_Bridge' }, { title: 'Официальный сайт', href: 'https://www.goldengate.org/' }]
  },
  {
    id: 'sight-en-niagara', level: 'B1', region: 'Онтарио (Канада) и Нью-Йорк (США)', title: 'Niagara Falls', ru: 'Ниагарский водопад',
    desc: 'Три водопада на границе Канады и США, лодки «Дева тумана» и смельчаки в бочках.',
    body: `Niagara Falls is a group of three waterfalls on the Niagara River, right on the border between Canada and the United States. The largest is the Horseshoe Falls, which is mostly in Canada and is shaped like a giant horseshoe. The smaller American Falls and the narrow Bridal Veil Falls are on the American side.

The Horseshoe Falls is about fifty-seven metres high, which is not very high compared with other waterfalls. What makes Niagara special is the huge amount of water: in summer, more than two thousand cubic metres fall over the edge every second. The noise is so loud and the spray so thick that visitors often get wet even standing on the shore.

Since 1846 boats have taken tourists almost into the clouds of spray at the foot of the falls. Visitors are given plastic raincoats, blue on the American boat and red on the Canadian one. Over the years many daredevils have tried to go over the falls, and in 1901 a sixty-three-year-old teacher, Annie Edson Taylor, survived the drop inside a wooden barrel. Today such stunts are illegal and extremely dangerous. The river also produces a lot of electricity, so at night much of the water is sent into tunnels to power stations, and the falls are lit up in bright colours.`,
    translation: `Ниагарский водопад — это группа из трёх водопадов на реке Ниагара, прямо на границе Канады и Соединённых Штатов. Самый большой — водопад Подкова, который находится в основном в Канаде и имеет форму огромной подковы. Меньший Американский водопад и узкий водопад Фата невесты расположены на американской стороне.

Высота Подковы около пятидесяти семи метров — по сравнению с другими водопадами это не так уж много. Особенной Ниагару делает огромный объём воды: летом через край каждую секунду переливается больше двух тысяч кубометров. Шум такой громкий, а водяная пыль такая густая, что посетители часто промокают, даже стоя на берегу.

С 1846 года лодки подвозят туристов почти в самые облака брызг у подножия водопада. Посетителям выдают пластиковые дождевики — синие на американской лодке и красные на канадской. За эти годы многие смельчаки пытались прыгнуть с водопада, а в 1901 году шестидесятитрёхлетняя учительница Энни Эдсон Тейлор пережила падение в деревянной бочке. Сегодня такие трюки запрещены и смертельно опасны. Река даёт и много электричества, поэтому ночью большую часть воды отводят по туннелям к электростанциям, а водопады подсвечивают яркими цветами.`,
    explain: [
      ['is shaped like', '«имеет форму…»'],
      ['compared with', '«по сравнению с»'],
      ['so loud … that', 'so … that — «настолько…, что»'],
      ['daredevils', 'сорвиголовы, смельчаки (dare — «сметь», devil — «чёрт»)'],
      ['are lit up', 'пассив от light up: «подсвечиваются»']
    ],
    words: [['waterfalls', 'водопады'], ['border', 'граница'], ['horseshoe', 'подкова'], ['bridal', 'свадебный, невестин'], ['veil', 'фата, вуаль'], ['amount', 'количество'], ['edge', 'край'], ['noise', 'шум'], ['spray', 'брызги, водяная пыль'], ['shore', 'берег'], ['raincoats', 'дождевики'], ['survived', 'выжила'], ['drop', 'падение, перепад'], ['barrel', 'бочка'], ['stunts', 'трюки'], ['illegal', 'незаконный'], ['tunnels', 'туннели']],
    links: [{ title: 'Википедия: Ниагарский водопад', href: 'https://ru.wikipedia.org/wiki/Ниагарский_водопад' }, { title: 'Wikipedia: Niagara Falls', href: 'https://en.wikipedia.org/wiki/Niagara_Falls' }, { title: 'Niagara Parks (Канада)', href: 'https://www.niagaraparks.com/' }]
  },
  {
    id: 'sight-en-sydney', level: 'B1', region: 'Сидней, Австралия', title: 'The Sydney Opera House', ru: 'Сиднейский оперный театр',
    desc: 'Белые «паруса» Йорна Утзона над гаванью Сиднея — одно из главных зданий XX века.',
    body: `The Sydney Opera House stands on Bennelong Point, a piece of land that sticks out into Sydney Harbour. Its white roofs look like the sails of a ship or giant sea shells, and they can be seen from almost everywhere around the harbour. Many people consider it one of the most important buildings of the twentieth century.

In 1957 the Danish architect Jørn Utzon won an international competition to design the building. His idea was beautiful, but nobody knew how to build such curved roofs, and the engineers spent years solving the problem. In the end Utzon found an answer by imagining all the shells as pieces cut from one large sphere. The project became much more expensive and slower than planned, and after arguments with the government Utzon left Australia in 1966.

The Opera House was finally opened by Queen Elizabeth II in 1973. The roofs are covered with more than a million tiles made in Sweden, which shine in the sun and clean themselves in the rain. Inside there are several halls, and every year they host more than a thousand concerts, operas, ballets and plays. In 2007 the building was added to the World Heritage List, one of the youngest buildings ever to receive this honour. Sadly, Utzon never returned to see his masterpiece finished.`,
    translation: `Сиднейский оперный театр стоит на мысе Беннелонг — участке суши, который выдаётся в Сиднейскую гавань. Его белые крыши похожи на паруса корабля или на огромные морские раковины, и их видно почти отовсюду вокруг гавани. Многие считают его одним из самых важных зданий XX века.

В 1957 году датский архитектор Йорн Утзон выиграл международный конкурс на проект здания. Его замысел был прекрасен, но никто не знал, как строить такие изогнутые крыши, и инженеры годами решали эту задачу. В конце концов Утзон нашёл ответ, представив все раковины частями, вырезанными из одной большой сферы. Строительство оказалось гораздо дороже и дольше, чем планировалось, и после споров с правительством Утзон в 1966 году уехал из Австралии.

Наконец в 1973 году оперный театр открыла королева Елизавета II. Крыши покрыты более чем миллионом плиток, сделанных в Швеции: они блестят на солнце и сами очищаются под дождём. Внутри несколько залов, и каждый год там проходит больше тысячи концертов, опер, балетов и спектаклей. В 2007 году здание внесли в список Всемирного наследия — это одно из самых молодых зданий, когда-либо получавших такую честь. К сожалению, Утзон так и не вернулся, чтобы увидеть своё законченное творение.`,
    explain: [
      ['sticks out into', 'stick out — «выдаваться, торчать»'],
      ['consider it one of', 'consider — «считать (кем-то, чем-то)»'],
      ['by imagining', 'by + -ing: «тем, что представил; путём…»'],
      ['than planned', 'сокращение от than it was planned — «чем планировалось»'],
      ['masterpiece', 'шедевр']
    ],
    words: [['sails', 'паруса'], ['shells', 'раковины'], ['competition', 'конкурс'], ['design', 'спроектировать'], ['curved', 'изогнутый'], ['roofs', 'крыши'], ['solving', 'решая'], ['sphere', 'сфера, шар'], ['expensive', 'дорогой'], ['arguments', 'споры'], ['government', 'правительство'], ['tiles', 'плитки'], ['shine', 'блестеть'], ['halls', 'залы'], ['honour', 'честь'], ['sadly', 'к сожалению']],
    links: [{ title: 'Википедия: Сиднейский оперный театр', href: 'https://ru.wikipedia.org/wiki/Сиднейский_оперный_театр' }, { title: 'Wikipedia: Sydney Opera House', href: 'https://en.wikipedia.org/wiki/Sydney_Opera_House' }, { title: 'Официальный сайт', href: 'https://www.sydneyoperahouse.com/' }]
  }
];
