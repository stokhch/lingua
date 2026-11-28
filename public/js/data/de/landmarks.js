// Достопримечательности немецкоязычных стран: Германия, Австрия, Швейцария.
// Тексты написаны для Лингвы по общедоступным сведениям (энциклопедии, сайты музеев), уровень B1.
// У каждой карточки: текст 10+ предложений для читалки (перевод по клику), перевод целиком, пояснения, слова и ссылки.
export const LANDMARKS_INTRO = 'Десять самых известных мест Германии, Австрии и Швейцарии — от Бранденбургских ворот до Маттерхорна.';

export const LANDMARKS = [
  {
    id: 'sight-de-tor', level: 'B1', region: 'Берлин, Германия', title: 'Das Brandenburger Tor', ru: 'Бранденбургские ворота',
    desc: 'Классицистские ворота с квадригой: при разделе Берлина — у самой стены, сегодня — символ единства Германии.',
    body: `Das Brandenburger Tor ist das bekannteste Wahrzeichen Berlins und ein Symbol der deutschen Einheit. Es wurde zwischen 1788 und 1791 nach Plänen des Architekten Carl Gotthard Langhans gebaut. Als Vorbild diente ihm das Eingangstor zur Akropolis in Athen.

Auf dem Tor steht die Quadriga, ein Wagen mit vier Pferden, den eine Siegesgöttin lenkt. Der Bildhauer Johann Gottfried Schadow hat sie geschaffen. Im Jahr 1806 ließ Napoleon die Quadriga nach Paris bringen, doch nach seiner Niederlage kehrte sie 1814 nach Berlin zurück.

Nach dem Zweiten Weltkrieg lag das Tor genau an der Grenze zwischen Ost- und West-Berlin. Ab 1961 stand es direkt hinter der Berliner Mauer, und fast drei Jahrzehnte lang durfte niemand hindurchgehen. Am 22. Dezember 1989, wenige Wochen nach dem Fall der Mauer, wurde der Durchgang wieder geöffnet. Tausende Menschen feierten damals auf dem Pariser Platz vor dem Tor. Heute finden hier große Feste statt, zum Beispiel die Silvesterparty, die im Fernsehen übertragen wird. Wer durch das Tor geht, läuft also mitten durch die Geschichte der Stadt.`,
    translation: `Бранденбургские ворота — самая известная достопримечательность Берлина и символ единства Германии. Их построили в 1788–1791 годах по проекту архитектора Карла Готхарда Лангханса. Образцом ему послужили входные ворота Акрополя в Афинах.

На воротах стоит квадрига — колесница с четвёркой коней, которой правит богиня победы. Её создал скульптор Иоганн Готфрид Шадов. В 1806 году Наполеон велел увезти квадригу в Париж, но после его поражения она в 1814 году вернулась в Берлин.

После Второй мировой войны ворота оказались точно на границе между Восточным и Западным Берлином. С 1961 года они стояли прямо за Берлинской стеной, и почти три десятилетия никому нельзя было через них пройти. 22 декабря 1989 года, через несколько недель после падения стены, проход снова открыли. Тысячи людей праздновали тогда на Парижской площади перед воротами. Сегодня здесь проходят большие праздники, например новогодняя вечеринка, которую транслируют по телевидению. Так что тот, кто проходит через ворота, идёт прямо сквозь историю города.`,
    explain: [
      ['wurde … gebaut', 'пассив прошедшего времени (Präteritum Passiv): «был построен»'],
      ['diente ihm als Vorbild', 'dienen als — «служить в качестве»'],
      ['ließ … bringen', 'lassen + инфинитив: «велел привезти»'],
      ['kehrte … zurück', 'отделяемая приставка: zurückkehren — «возвращаться»'],
      ['Silvester', 'по-немецки так называют новогоднюю ночь, 31 декабря']
    ],
    words: [['wahrzeichen', 'символ, достопримечательность'], ['einheit', 'единство'], ['vorbild', 'образец'], ['wagen', 'повозка, колесница'], ['pferden', 'лошадьми, конями'], ['siegesgöttin', 'богиня победы'], ['lenkt', 'правит, управляет'], ['bildhauer', 'скульптор'], ['niederlage', 'поражение'], ['grenze', 'граница'], ['mauer', 'стена'], ['jahrzehnte', 'десятилетия'], ['durchgang', 'проход'], ['übertragen', 'транслировать']],
    links: [{ title: 'Википедия: Бранденбургские ворота', href: 'https://ru.wikipedia.org/wiki/Бранденбургские_ворота' }, { title: 'Wikipedia: Brandenburger Tor', href: 'https://de.wikipedia.org/wiki/Brandenburger_Tor' }]
  },
  {
    id: 'sight-de-dom', level: 'B1', region: 'Кёльн, Германия', title: 'Der Kölner Dom', ru: 'Кёльнский собор',
    desc: 'Готический собор, который строили больше шестисот лет; в нём хранятся мощи трёх волхвов.',
    body: `Der Kölner Dom ist eine der größten gotischen Kirchen der Welt und steht direkt neben dem Hauptbahnhof. Mit dem Bau begann man im Jahr 1248, doch fertig wurde der Dom erst 1880. Um 1530 hörten die Arbeiten auf, weil das Geld fehlte, und mehr als dreihundert Jahre lang stand ein alter Holzkran auf dem unfertigen Südturm.

Im 19. Jahrhundert fand man alte Pläne des Doms wieder, und die Bauarbeiten gingen weiter. Die beiden Türme sind etwa 157 Meter hoch, und für kurze Zeit war der Dom sogar das höchste Gebäude der Welt. Wer die 533 Stufen bis zur Aussichtsplattform hinaufsteigt, sieht ganz Köln und den Rhein.

Im Inneren befindet sich der goldene Dreikönigenschrein. Nach der Überlieferung liegen darin die Gebeine der Heiligen Drei Könige, und deshalb kamen schon im Mittelalter viele Pilger nach Köln. Im Zweiten Weltkrieg trafen den Dom mehrere Bomben, aber er stürzte nicht ein, während die Stadt um ihn herum fast völlig zerstört wurde. Seit 1996 gehört er zum UNESCO-Welterbe, und jeden Tag kommen Tausende Besucher. Die Kölner sagen gern, dass der Dom nie ganz fertig sein wird, denn irgendwo wird immer restauriert.`,
    translation: `Кёльнский собор — одна из крупнейших готических церквей мира, он стоит прямо рядом с главным вокзалом. Строительство начали в 1248 году, но закончили собор только в 1880-м. Около 1530 года работы прекратились, потому что не хватало денег, и больше трёхсот лет на недостроенной южной башне стоял старый деревянный кран.

В XIX веке снова нашли старые чертежи собора, и строительство продолжилось. Высота обеих башен около 157 метров, и некоторое время собор был даже самым высоким зданием в мире. Тот, кто поднимется по 533 ступеням на смотровую площадку, увидит весь Кёльн и Рейн.

Внутри находится золотая рака Трёх королей. По преданию, в ней лежат мощи трёх волхвов, и поэтому уже в Средние века в Кёльн приходило много паломников. Во время Второй мировой войны в собор попало несколько бомб, но он не обрушился, тогда как город вокруг был почти полностью разрушен. С 1996 года он входит в список Всемирного наследия ЮНЕСКО, и каждый день сюда приходят тысячи посетителей. Кёльнцы любят говорить, что собор никогда не будет полностью готов, ведь где-нибудь всегда идёт реставрация.`,
    explain: [
      ['begann man', 'man — неопределённо-личное «начали» (кто — неважно)'],
      ['hörten … auf', 'aufhören — «прекращаться», приставка уходит в конец'],
      ['Wer … hinaufsteigt, sieht', 'wer — «тот, кто»: придаточное стоит перед главным'],
      ['stürzte nicht ein', 'einstürzen — «обрушиться»'],
      ['wird … restauriert', 'безличный пассив: «реставрируют»']
    ],
    words: [['kirchen', 'церкви'], ['hauptbahnhof', 'главный вокзал'], ['bau', 'стройка, строительство'], ['fehlte', 'не хватало'], ['holzkran', 'деревянный кран'], ['türme', 'башни'], ['gebäude', 'здание'], ['stufen', 'ступени'], ['aussichtsplattform', 'смотровая площадка'], ['schrein', 'рака, ковчег'], ['überlieferung', 'предание'], ['gebeine', 'мощи, кости'], ['pilger', 'паломники'], ['zerstört', 'разрушен'], ['welterbe', 'всемирное наследие']],
    links: [{ title: 'Википедия: Кёльнский собор', href: 'https://ru.wikipedia.org/wiki/Кёльнский_собор' }, { title: 'Wikipedia: Kölner Dom', href: 'https://de.wikipedia.org/wiki/Kölner_Dom' }, { title: 'Официальный сайт', href: 'https://www.koelner-dom.de/' }]
  },
  {
    id: 'sight-de-neuschwanstein', level: 'B1', region: 'Бавария, Германия', title: 'Schloss Neuschwanstein', ru: 'Замок Нойшванштайн',
    desc: 'Сказочный замок «короля-мечтателя» Людвига II, вдохновивший Диснея.',
    body: `Schloss Neuschwanstein steht auf einem Felsen in den Bayerischen Alpen, nicht weit von der Stadt Füssen. Es sieht aus wie ein Schloss aus einem Märchen, mit weißen Mauern, schlanken Türmen und einem blauen See im Tal. Gebaut wurde es für König Ludwig II. von Bayern, den viele Menschen den Märchenkönig nennen.

Ludwig liebte die Opern von Richard Wagner, und viele Räume des Schlosses zeigen Szenen aus Wagners Sagen. Der Bau begann im Jahr 1869, aber der König wollte keine echte Burg zur Verteidigung, sondern einen Ort für seine Träume. Deshalb gab es im Schloss schon moderne Technik, zum Beispiel eine Zentralheizung, fließendes Wasser und sogar ein Telefon.

Der König wohnte nur wenige Monate in seinem Schloss, denn 1886 erklärte man ihn für krank und nahm ihm die Macht. Kurz danach starb er unter rätselhaften Umständen im Starnberger See. Schon wenige Wochen nach seinem Tod durften Besucher das Schloss besichtigen. Heute kommen jedes Jahr über eine Million Menschen aus aller Welt hierher. Das Schloss soll auch Walt Disney inspiriert haben, als er das Dornröschenschloss für seine Filme und Parks entwarf. Den schönsten Blick auf Neuschwanstein hat man von der Marienbrücke über einer tiefen Schlucht.`,
    translation: `Замок Нойшванштайн стоит на скале в Баварских Альпах, недалеко от города Фюссен. Он похож на замок из сказки: белые стены, стройные башни и синее озеро в долине. Его построили для короля Баварии Людвига II, которого многие называют «сказочным королём».

Людвиг любил оперы Рихарда Вагнера, и во многих комнатах замка изображены сцены из вагнеровских сказаний. Строительство началось в 1869 году, но король хотел не настоящую крепость для обороны, а место для своих мечтаний. Поэтому в замке уже была современная техника, например центральное отопление, водопровод и даже телефон.

Король прожил в своём замке всего несколько месяцев: в 1886 году его объявили больным и отстранили от власти. Вскоре после этого он погиб при загадочных обстоятельствах в Штарнбергском озере. Уже через несколько недель после его смерти посетителям разрешили осматривать замок. Сегодня сюда каждый год приезжает больше миллиона человек со всего мира. Говорят, замок вдохновил и Уолта Диснея, когда тот придумывал замок Спящей красавицы для своих фильмов и парков. Самый красивый вид на Нойшванштайн открывается с моста Марии над глубоким ущельем.`,
    explain: [
      ['sieht aus wie', 'aussehen wie — «выглядеть как»'],
      ['nicht …, sondern', '«не …, а» — противопоставление после отрицания'],
      ['erklärte man ihn für krank', 'jemanden für etwas erklären — «объявить кого-то кем-то»'],
      ['soll … inspiriert haben', 'sollen + перфектный инфинитив: «говорят, что вдохновил» (с чужих слов)'],
      ['Dornröschen', '«Шиповничек» — немецкое название сказки о Спящей красавице']
    ],
    words: [['schloss', 'замок, дворец'], ['felsen', 'скала'], ['märchen', 'сказка'], ['schlanken', 'стройными'], ['tal', 'долина'], ['räume', 'комнаты, помещения'], ['sagen', 'сказания'], ['verteidigung', 'оборона'], ['träume', 'мечты, сны'], ['zentralheizung', 'центральное отопление'], ['macht', 'власть'], ['rätselhaften', 'загадочных'], ['umständen', 'обстоятельствах'], ['besichtigen', 'осматривать'], ['entwarf', 'спроектировал, придумал'], ['schlucht', 'ущелье']],
    links: [{ title: 'Википедия: Нойшванштайн', href: 'https://ru.wikipedia.org/wiki/Нойшванштайн' }, { title: 'Wikipedia: Schloss Neuschwanstein', href: 'https://de.wikipedia.org/wiki/Schloss_Neuschwanstein' }, { title: 'Официальный сайт', href: 'https://www.neuschwanstein.de/' }]
  },
  {
    id: 'sight-de-mauer', level: 'B1', region: 'Берлин, Германия', title: 'Die Berliner Mauer und die East Side Gallery', ru: 'Берлинская стена и галерея Ист-Сайд',
    desc: 'Стена, 28 лет делившая Берлин, и самый длинный в мире участок, расписанный художниками.',
    body: `In der Nacht zum 13. August 1961 begann die Regierung der DDR, West-Berlin mit Stacheldraht abzusperren. Bald entstand daraus eine Mauer aus Beton, die etwa 155 Kilometer lang war und die Stadt 28 Jahre lang teilte. Familien und Freunde wurden plötzlich getrennt, weil sie auf verschiedenen Seiten wohnten.

Die Grenze wurde streng bewacht, und wer zu fliehen versuchte, riskierte sein Leben. Mindestens 140 Menschen kamen an der Berliner Mauer ums Leben. Am Abend des 9. November 1989 wurde nach großen friedlichen Protesten die Grenze überraschend geöffnet. Menschen aus Ost und West umarmten sich, tanzten auf der Mauer und schlugen Stücke aus dem Beton.

Heute ist von der Mauer nur noch wenig übrig. Das längste erhaltene Stück ist die East Side Gallery an der Spree, die etwa 1,3 Kilometer lang ist. Im Jahr 1990 bemalten über hundert Künstler aus vielen Ländern diese Wand, und so entstand die größte Open-Air-Galerie der Welt. Besonders bekannt ist das Bild „Bruderkuss“ von Dmitri Vrubel, das zwei Politiker beim Küssen zeigt. Wer mehr über das Leben an der Grenze erfahren möchte, sollte auch die Gedenkstätte an der Bernauer Straße besuchen.`,
    translation: `В ночь на 13 августа 1961 года правительство ГДР начало перегораживать Западный Берлин колючей проволокой. Вскоре из неё выросла бетонная стена длиной около 155 километров, которая 28 лет делила город. Семьи и друзья внезапно оказались разлучены, потому что жили по разные стороны.

Границу строго охраняли, и тот, кто пытался бежать, рисковал жизнью. У Берлинской стены погибли не меньше 140 человек. Вечером 9 ноября 1989 года, после больших мирных протестов, границу неожиданно открыли. Люди с Востока и Запада обнимались, танцевали на стене и откалывали куски бетона.

Сегодня от стены осталось совсем немного. Самый длинный сохранившийся участок — галерея Ист-Сайд на берегу Шпрее, длиной около 1,3 километра. В 1990 году больше ста художников из многих стран расписали эту стену, и так появилась крупнейшая галерея под открытым небом в мире. Особенно известна картина «Братский поцелуй» Дмитрия Врубеля, на которой целуются два политика. Тот, кто хочет больше узнать о жизни у границы, должен побывать и в мемориале на Бернауэр-штрассе.`,
    explain: [
      ['DDR', 'Deutsche Demokratische Republik — ГДР, Восточная Германия'],
      ['abzusperren', 'zu-инфинитив отделяемого глагола absperren: zu встаёт между приставкой и корнем'],
      ['kamen … ums Leben', 'ums Leben kommen — «погибнуть»'],
      ['umarmten sich', 'возвратный глагол sich umarmen — «обниматься»'],
      ['sollte … besuchen', 'sollte — мягкий совет: «стоит посетить»']
    ],
    words: [['regierung', 'правительство'], ['stacheldraht', 'колючая проволока'], ['beton', 'бетон'], ['teilte', 'делила'], ['getrennt', 'разлучены, разделены'], ['bewacht', 'охраняется'], ['fliehen', 'бежать, спасаться бегством'], ['friedlichen', 'мирных'], ['überraschend', 'неожиданно'], ['übrig', 'оставшийся'], ['erhaltene', 'сохранившийся'], ['bemalten', 'расписали'], ['künstler', 'художники'], ['bruderkuss', 'братский поцелуй'], ['gedenkstätte', 'мемориал']],
    links: [{ title: 'Википедия: Берлинская стена', href: 'https://ru.wikipedia.org/wiki/Берлинская_стена' }, { title: 'Wikipedia: East Side Gallery', href: 'https://de.wikipedia.org/wiki/East_Side_Gallery' }, { title: 'Мемориал Берлинской стены', href: 'https://www.stiftung-berliner-mauer.de/' }]
  },
  {
    id: 'sight-de-frauenkirche', level: 'B1', region: 'Дрезден, Германия', title: 'Die Frauenkirche in Dresden', ru: 'Фрауэнкирхе в Дрездене',
    desc: 'Барочная церковь с каменным куполом: разрушена в 1945-м, полвека лежала в руинах и восстановлена в 2005 году.',
    body: `Die Frauenkirche steht am Neumarkt in der Altstadt von Dresden. Sie wurde zwischen 1726 und 1743 nach Plänen des Baumeisters George Bähr gebaut. Ihre riesige Kuppel aus Sandstein nannten die Dresdner liebevoll die „Steinerne Glocke“.

Im Februar 1945 wurde Dresden durch schwere Luftangriffe zerstört. Die Kirche hielt das Feuer zuerst aus, doch zwei Tage später brach sie zusammen. In der DDR blieb der große Trümmerberg mehr als vierzig Jahre lang liegen und wurde zu einem Mahnmal gegen den Krieg.

Nach der Wiedervereinigung beschloss man, die Kirche wieder aufzubauen. Spender aus der ganzen Welt gaben Geld, und von 1994 bis 2005 wuchs die Frauenkirche Stein für Stein neu. Die Architekten verwendeten dabei viele originale Steine aus den Trümmern. Man erkennt sie heute leicht, denn sie sind viel dunkler als die neuen, hellen Steine. Das goldene Kreuz auf der Kuppel wurde von einem britischen Goldschmied angefertigt, dessen Vater 1945 als Pilot an den Angriffen auf Dresden beteiligt war. So ist die Kirche heute ein Zeichen der Versöhnung zwischen früheren Feinden.`,
    translation: `Фрауэнкирхе (церковь Богородицы) стоит на площади Ноймаркт в старом городе Дрездена. Её построили в 1726–1743 годах по проекту зодчего Георга Бера. Её огромный купол из песчаника дрезденцы ласково прозвали «Каменным колоколом».

В феврале 1945 года Дрезден был разрушен тяжёлыми авианалётами. Сначала церковь выдержала пожар, но через два дня обрушилась. В ГДР огромная гора обломков пролежала больше сорока лет и стала памятником-предостережением против войны.

После объединения Германии решили восстановить церковь. Жертвователи со всего мира давали деньги, и с 1994 по 2005 год Фрауэнкирхе камень за камнем выросла заново. При этом архитекторы использовали много подлинных камней из обломков. Сегодня их легко узнать: они гораздо темнее новых, светлых камней. Золотой крест на куполе изготовил британский ювелир, чей отец в 1945 году как лётчик участвовал в налётах на Дрезден. Так церковь стала знаком примирения между бывшими врагами.`,
    explain: [
      ['hielt … aus', 'aushalten — «выдерживать»'],
      ['brach … zusammen', 'zusammenbrechen — «рушиться»'],
      ['wieder aufzubauen', 'zu-инфинитив: wieder aufbauen — «восстановить»'],
      ['Stein für Stein', '«камень за камнем», так же: Tag für Tag'],
      ['dessen Vater', 'относительное местоимение в родительном падеже: «чей отец»']
    ],
    words: [['kuppel', 'купол'], ['sandstein', 'песчаник'], ['steinerne', 'каменный'], ['glocke', 'колокол'], ['luftangriffe', 'авианалёты'], ['trümmerberg', 'гора обломков'], ['mahnmal', 'памятник-предостережение'], ['wiedervereinigung', 'воссоединение'], ['spender', 'жертвователи'], ['trümmern', 'обломках'], ['kreuz', 'крест'], ['goldschmied', 'ювелир'], ['beteiligt', 'участвовал'], ['versöhnung', 'примирение'], ['feinden', 'врагами']],
    links: [{ title: 'Википедия: Фрауэнкирхе (Дрезден)', href: 'https://ru.wikipedia.org/wiki/Фрауэнкирхе_(Дрезден)' }, { title: 'Wikipedia: Frauenkirche (Dresden)', href: 'https://de.wikipedia.org/wiki/Frauenkirche_(Dresden)' }, { title: 'Официальный сайт', href: 'https://www.frauenkirche-dresden.de/' }]
  },
  {
    id: 'sight-de-speicherstadt', level: 'B1', region: 'Гамбург, Германия', title: 'Die Speicherstadt in Hamburg', ru: 'Шпайхерштадт в Гамбурге',
    desc: 'Крупнейший в мире квартал складов из красного кирпича на дубовых сваях, рядом — Эльбская филармония.',
    body: `Die Speicherstadt ist der größte zusammenhängende Lagerhauskomplex der Welt. Sie liegt mitten im Hamburger Hafen und wurde ab 1883 auf Tausenden von Eichenpfählen im Wasser gebaut. Für das neue Viertel mussten damals etwa 20.000 Menschen ihre Wohnungen verlassen.

Die hohen Häuser aus rotem Backstein haben Türmchen, Giebel und kleine Fenster, sodass sie ein bisschen wie Burgen aussehen. Zwischen ihnen fließen Kanäle, die man Fleete nennt. Früher brachten Schiffe hier Kaffee, Tee, Gewürze und Teppiche aus der ganzen Welt, und die Waren wurden mit Seilwinden direkt vom Boot in die Speicher gezogen.

Heute lagern hier nur noch wenige Waren, denn moderne Containerschiffe brauchen einen anderen Hafen. In den alten Speichern gibt es jetzt Museen, Büros und Cafés. Sehr beliebt ist das Miniatur Wunderland, die größte Modelleisenbahn der Welt mit winzigen Zügen, Flughäfen und Städten. Seit 2015 gehört die Speicherstadt zusammen mit dem benachbarten Kontorhausviertel zum UNESCO-Welterbe. Nicht weit entfernt steht die Elbphilharmonie, ein Konzerthaus mit einem gläsernen Dach in Form von Wellen. Am schönsten ist die Speicherstadt am Abend, wenn die Gebäude beleuchtet sind und sich im Wasser spiegeln.`,
    translation: `Шпайхерштадт — крупнейший в мире единый комплекс складов. Он находится в самом центре гамбургского порта и строился с 1883 года на тысячах дубовых свай прямо в воде. Ради нового квартала тогда около 20 000 человек пришлось покинуть свои квартиры.

Высокие дома из красного кирпича украшены башенками, фронтонами и маленькими окнами, так что немного похожи на крепости. Между ними текут каналы, которые здесь называют «флетами». Раньше корабли привозили сюда кофе, чай, пряности и ковры со всего мира, а товары поднимали лебёдками прямо с лодок в склады.

Сегодня здесь хранится совсем немного товаров: современным контейнеровозам нужен другой порт. В старых складах теперь музеи, офисы и кафе. Очень популярен «Миниатюрная страна чудес» — самая большая в мире модель железной дороги с крошечными поездами, аэропортами и городами. С 2015 года Шпайхерштадт вместе с соседним кварталом конторских зданий входит во Всемирное наследие ЮНЕСКО. Недалеко стоит Эльбская филармония — концертный зал со стеклянной крышей в форме волн. Красивее всего Шпайхерштадт вечером, когда здания подсвечены и отражаются в воде.`,
    explain: [
      ['zusammenhängende', 'причастие I: «связанный в одно целое, единый»'],
      ['mussten … verlassen', 'модальный глагол в прошедшем: «должны были покинуть»'],
      ['sodass', '«так что» (следствие)'],
      ['wurden … gezogen', 'пассив от ziehen: «поднимались, втягивались»'],
      ['sich spiegeln', '«отражаться»']
    ],
    words: [['speicher', 'склад, амбар'], ['lagerhaus', 'склад'], ['hafen', 'порт, гавань'], ['eichenpfählen', 'дубовых сваях'], ['viertel', 'квартал'], ['backstein', 'кирпич'], ['giebel', 'фронтон'], ['kanäle', 'каналы'], ['gewürze', 'пряности'], ['teppiche', 'ковры'], ['waren', 'товары'], ['seilwinden', 'лебёдки'], ['modelleisenbahn', 'модель железной дороги'], ['winzigen', 'крошечными'], ['gläsernen', 'стеклянной'], ['beleuchtet', 'освещены, подсвечены']],
    links: [{ title: 'Википедия: Шпайхерштадт', href: 'https://ru.wikipedia.org/wiki/Шпайхерштадт' }, { title: 'Wikipedia: Speicherstadt', href: 'https://de.wikipedia.org/wiki/Speicherstadt' }, { title: 'Miniatur Wunderland', href: 'https://www.miniatur-wunderland.de/' }]
  },
  {
    id: 'sight-de-zugspitze', level: 'B1', region: 'Бавария, Германия', title: 'Die Zugspitze', ru: 'Цугшпитце',
    desc: 'Высшая точка Германии — 2962 метра: зубчатая железная дорога, рекордная канатка и вид на четыре страны.',
    body: `Die Zugspitze ist mit 2962 Metern der höchste Berg Deutschlands. Sie liegt im Wettersteingebirge an der Grenze zwischen Bayern und Österreich, nicht weit von Garmisch-Partenkirchen. Auf dem Gipfel steht ein goldenes Kreuz, das man schon von weitem glänzen sieht.

Als Erster erreichte der Vermesser Josef Naus im Jahr 1820 den Gipfel. Heute muss man nicht mehr klettern, um oben zu stehen. Seit 1930 fährt eine Zahnradbahn durch einen langen Tunnel im Berg bis zum Gletscher. Im Jahr 2017 wurde außerdem eine neue Seilbahn eröffnet, die mehrere Weltrekorde aufgestellt hat, zum Beispiel für die höchste Stahlstütze einer Pendelbahn.

Bei klarem Wetter kann man vom Gipfel aus mehr als 400 Gipfel in vier Ländern sehen: in Deutschland, Österreich, der Schweiz und Italien. Im Winter ist das Zugspitzplatt ein beliebtes Skigebiet, und im Sommer wandern viele Menschen über die Almen hinauf. Leider schmelzen die Gletscher der Zugspitze wegen des Klimawandels sehr schnell. Wissenschaftler in der Umweltforschungsstation Schneefernerhaus beobachten deshalb das Wetter und die Luft. Auch im Sommer kann es oben schneien, darum sollte man immer eine warme Jacke mitnehmen.`,
    translation: `Цугшпитце высотой 2962 метра — самая высокая гора Германии. Она находится в горном массиве Веттерштайн на границе Баварии и Австрии, недалеко от Гармиш-Партенкирхена. На вершине стоит золотой крест, блеск которого виден издалека.

Первым на вершину в 1820 году поднялся геодезист Йозеф Наус. Сегодня, чтобы постоять наверху, уже не нужно карабкаться. С 1930 года сквозь длинный туннель в горе до ледника ходит зубчатая железная дорога. А в 2017 году открыли новую канатную дорогу, которая установила несколько мировых рекордов, например по высоте стальной опоры маятниковой канатки.

В ясную погоду с вершины видно больше 400 горных пиков в четырёх странах: в Германии, Австрии, Швейцарии и Италии. Зимой плато Цугшпитцплатт — популярный горнолыжный район, а летом многие поднимаются наверх пешком через альпийские луга. К сожалению, ледники Цугшпитце из-за изменения климата тают очень быстро. Поэтому учёные на экологической станции «Шнеефернерхаус» наблюдают за погодой и воздухом. Даже летом наверху может пойти снег, так что всегда стоит брать с собой тёплую куртку.`,
    explain: [
      ['mit 2962 Metern', 'mit + дательный падеж часто указывает размер: «высотой 2962 метра»'],
      ['von weitem', '«издалека»'],
      ['um … zu stehen', 'um … zu — «чтобы» (цель)'],
      ['vom Gipfel aus', 'von … aus — «с (какого-то места)»'],
      ['Almen', 'Alm — горное пастбище в Альпах']
    ],
    words: [['berg', 'гора'], ['gebirge', 'горы, горный массив'], ['gipfel', 'вершина'], ['glänzen', 'блестеть'], ['vermesser', 'геодезист, землемер'], ['klettern', 'карабкаться, лазать'], ['zahnradbahn', 'зубчатая железная дорога'], ['gletscher', 'ледник'], ['seilbahn', 'канатная дорога'], ['stahlstütze', 'стальная опора'], ['skigebiet', 'горнолыжный район'], ['wandern', 'ходить в походы'], ['schmelzen', 'таять'], ['klimawandels', 'изменения климата'], ['schneien', 'идти (о снеге)']],
    links: [{ title: 'Википедия: Цугшпитце', href: 'https://ru.wikipedia.org/wiki/Цугшпитце' }, { title: 'Wikipedia: Zugspitze', href: 'https://de.wikipedia.org/wiki/Zugspitze' }, { title: 'Официальный сайт', href: 'https://zugspitze.de/' }]
  },
  {
    id: 'sight-de-schoenbrunn', level: 'B1', region: 'Вена, Австрия', title: 'Schloss Schönbrunn', ru: 'Дворец Шёнбрунн',
    desc: 'Летняя резиденция Габсбургов: 1441 комната, Глориетта и старейший действующий зоопарк мира.',
    body: `Schloss Schönbrunn in Wien war die Sommerresidenz der Habsburger, die jahrhundertelang über Österreich herrschten. Der Name erinnert an eine Legende: Kaiser Matthias soll hier auf der Jagd eine Quelle mit klarem Wasser entdeckt und sie einen „schönen Brunnen“ genannt haben. Das heutige Barockschloss ließ vor allem Kaiserin Maria Theresia im 18. Jahrhundert ausbauen.

Das Schloss hat 1441 Räume, aber Besucher sehen nur einen kleinen Teil davon. Im Spiegelsaal spielte im Jahr 1762 der sechsjährige Wolfgang Amadeus Mozart vor der Kaiserin. Später lebten hier Kaiser Franz Joseph und seine Frau Elisabeth, die man überall als Sisi kennt.

Hinter dem Schloss liegt ein riesiger Park mit Brunnen, Statuen, einem Labyrinth und künstlichen römischen Ruinen. Auf einem Hügel steht die Gloriette, von der man einen wunderbaren Blick über Wien hat. Im Park befindet sich auch der Tiergarten Schönbrunn, der 1752 gegründet wurde und heute der älteste noch bestehende Zoo der Welt ist. Seit 1996 gehören Schloss und Park zum UNESCO-Welterbe. Im Winter findet vor dem Schloss ein Weihnachtsmarkt statt, und im Sommer gibt das Wiener Philharmonische Orchester im Park ein kostenloses Konzert.`,
    translation: `Дворец Шёнбрунн в Вене был летней резиденцией Габсбургов, которые веками правили Австрией. Название напоминает о легенде: император Матвей будто бы нашёл здесь на охоте родник с чистой водой и назвал его «прекрасным источником». Нынешний барочный дворец расширила прежде всего императрица Мария Терезия в XVIII веке.

Во дворце 1441 комната, но посетители видят лишь небольшую их часть. В Зеркальном зале в 1762 году шестилетний Вольфганг Амадей Моцарт играл перед императрицей. Позже здесь жили император Франц Иосиф и его жена Елизавета, которую повсюду знают как Сиси.

За дворцом раскинулся огромный парк с фонтанами, статуями, лабиринтом и искусственными римскими руинами. На холме стоит Глориетта, откуда открывается чудесный вид на Вену. В парке находится и зоопарк Шёнбрунн, основанный в 1752 году, — сегодня это старейший из действующих зоопарков мира. С 1996 года дворец и парк входят во Всемирное наследие ЮНЕСКО. Зимой перед дворцом работает рождественская ярмарка, а летом Венский филармонический оркестр даёт в парке бесплатный концерт.`,
    explain: [
      ['jahrhundertelang', '«веками»; -lang образует наречия длительности: tagelang, jahrelang'],
      ['soll … entdeckt … haben', 'sollen + перфектный инфинитив: «по преданию, открыл»'],
      ['ließ … ausbauen', 'lassen + инфинитив: «велела расширить»'],
      ['Sisi', 'домашнее имя императрицы Елизаветы Баварской'],
      ['noch bestehende', 'причастие I: «до сих пор существующий»']
    ],
    words: [['herrschten', 'правили'], ['kaiser', 'император'], ['jagd', 'охота'], ['quelle', 'родник, источник'], ['brunnen', 'колодец, фонтан, источник'], ['kaiserin', 'императрица'], ['spiegelsaal', 'зеркальный зал'], ['künstlichen', 'искусственными'], ['ruinen', 'руины'], ['hügel', 'холм'], ['tiergarten', 'зоопарк, зверинец'], ['gegründet', 'основан'], ['weihnachtsmarkt', 'рождественская ярмарка'], ['kostenloses', 'бесплатный']],
    links: [{ title: 'Википедия: Шёнбрунн', href: 'https://ru.wikipedia.org/wiki/Шёнбрунн' }, { title: 'Wikipedia: Schloss Schönbrunn', href: 'https://de.wikipedia.org/wiki/Schloss_Schönbrunn' }, { title: 'Официальный сайт', href: 'https://www.schoenbrunn.at/' }]
  },
  {
    id: 'sight-de-matterhorn', level: 'B1', region: 'Церматт, Швейцария', title: 'Das Matterhorn', ru: 'Маттерхорн',
    desc: 'Пирамида высотой 4478 метров над Церматтом и драматическое первое восхождение 1865 года.',
    body: `Das Matterhorn ist wohl der berühmteste Berg der Schweiz und steht an der Grenze zu Italien. Mit seiner fast perfekten Pyramidenform ist es 4478 Meter hoch und sieht von jeder Seite anders aus. Am Fuß des Berges liegt das Dorf Zermatt, in dem keine normalen Autos fahren dürfen.

Lange Zeit glaubten viele Menschen, dass niemand diesen steilen Gipfel besteigen kann. Am 14. Juli 1865 erreichte eine Gruppe um den Engländer Edward Whymper als erste den Gipfel. Beim Abstieg riss jedoch ein Seil, und vier der sieben Bergsteiger stürzten in den Tod. Diese Tragödie machte das Matterhorn in ganz Europa bekannt.

Heute versuchen jeden Sommer Tausende Alpinisten, den Gipfel zu erreichen, meistens über den Hörnligrat mit einer Hütte auf etwa 3260 Metern. Für Bergsteiger ohne Erfahrung ist der Weg sehr gefährlich, deshalb gehen viele mit einem Bergführer. Wer nicht klettern möchte, kann mit der Gornergratbahn fahren oder zum Kleinen Matterhorn hinaufschweben, wo eine der höchsten Seilbahnstationen Europas liegt. Am frühen Morgen leuchtet die Spitze des Berges oft rot und golden in der aufgehenden Sonne. Das Matterhorn ist so bekannt, dass sein Bild auf vielen Postkarten und Souvenirs der Schweiz zu sehen ist.`,
    translation: `Маттерхорн — пожалуй, самая знаменитая гора Швейцарии, она стоит на границе с Италией. Почти идеальная пирамида высотой 4478 метров выглядит с каждой стороны по-разному. У подножия горы лежит деревня Церматт, где обычным автомобилям ездить запрещено.

Долгое время многие верили, что на эту крутую вершину никто не сможет подняться. 14 июля 1865 года группа англичанина Эдварда Уимпера первой достигла вершины. Однако на спуске оборвалась верёвка, и четверо из семи альпинистов разбились насмерть. Эта трагедия прославила Маттерхорн на всю Европу.

Сегодня каждое лето тысячи альпинистов пытаются подняться на вершину, чаще всего по гребню Хёрнли, где на высоте около 3260 метров стоит хижина. Для альпинистов без опыта путь очень опасен, поэтому многие идут с горным проводником. Кто не хочет карабкаться, может проехать по железной дороге Горнерграт или подняться по канатке на Малый Маттерхорн, где находится одна из самых высоких канатных станций Европы. Ранним утром вершина часто светится красным и золотым в лучах восходящего солнца. Маттерхорн так известен, что его изображение можно увидеть на множестве швейцарских открыток и сувениров.`,
    explain: [
      ['wohl', 'здесь — «пожалуй, вероятно»'],
      ['um den Engländer', 'eine Gruppe um … — «группа во главе с…»'],
      ['stürzten in den Tod', '«разбились насмерть», букв. «упали в смерть»'],
      ['hinaufschweben', 'schweben — «парить»; о канатной дороге: «подниматься по воздуху»'],
      ['ist … zu sehen', 'sein + zu + инфинитив: «можно увидеть»']
    ],
    words: [['berühmteste', 'самый знаменитый'], ['dorf', 'деревня'], ['steilen', 'крутую'], ['besteigen', 'подняться (на гору)'], ['abstieg', 'спуск'], ['riss', 'оборвался'], ['seil', 'верёвка, канат'], ['bergsteiger', 'альпинисты'], ['grat', 'гребень'], ['hütte', 'хижина'], ['erfahrung', 'опыт'], ['gefährlich', 'опасный'], ['bergführer', 'горный проводник'], ['leuchtet', 'светится'], ['postkarten', 'открытки']],
    links: [{ title: 'Википедия: Маттерхорн', href: 'https://ru.wikipedia.org/wiki/Маттерхорн' }, { title: 'Wikipedia: Matterhorn', href: 'https://de.wikipedia.org/wiki/Matterhorn' }, { title: 'Zermatt: Matterhorn', href: 'https://www.zermatt.ch/' }]
  },
  {
    id: 'sight-de-rheinfall', level: 'B1', region: 'Шаффхаузен, Швейцария', title: 'Der Rheinfall', ru: 'Рейнский водопад',
    desc: 'Самый мощный водопад Европы: Рейн падает с 23 метров, а лодки подвозят прямо к скале посреди потока.',
    body: `Der Rheinfall bei Schaffhausen in der Nordschweiz gilt als der größte Wasserfall Europas. Er ist zwar nur etwa 23 Meter hoch, aber rund 150 Meter breit. Im Sommer, wenn in den Alpen der Schnee schmilzt, stürzen bis zu 600 Kubikmeter Wasser pro Sekunde in die Tiefe.

Der Wasserfall ist etwa 15.000 Jahre alt und entstand nach der letzten Eiszeit, als der Rhein ein neues Bett finden musste. Mitten im Fluss steht ein hoher Felsen, den das Wasser seit Jahrtausenden umspült. Mit kleinen Booten kann man bis zu diesem Felsen fahren und über eine Treppe auf seine Spitze steigen. Dort steht man direkt im Lärm und im Nebel des fallenden Wassers.

Über dem Wasserfall thront das Schloss Laufen, dessen Geschichte bis ins Mittelalter zurückreicht. Von dort führen Wege und Plattformen ganz nah an das tosende Wasser heran. Schon im 19. Jahrhundert kamen Dichter und Maler hierher, zum Beispiel der englische Künstler William Turner, der den Rheinfall mehrmals malte. Am Nationalfeiertag, dem 1. August, gibt es hier ein großes Feuerwerk, das sich im Wasser spiegelt. Wer den Rheinfall besucht, sollte eine Regenjacke mitnehmen, denn die Gischt macht schnell nass.`,
    translation: `Рейнский водопад у Шаффхаузена на севере Швейцарии считается самым большим водопадом Европы. Высота его всего около 23 метров, зато ширина около 150 метров. Летом, когда в Альпах тает снег, вниз низвергается до 600 кубометров воды в секунду.

Водопаду около 15 000 лет: он возник после последнего ледникового периода, когда Рейну пришлось искать новое русло. Посреди реки стоит высокая скала, которую вода омывает уже тысячелетия. На маленьких лодках можно доплыть до этой скалы и подняться по лестнице на её верхушку. Там стоишь прямо в грохоте и тумане падающей воды.

Над водопадом возвышается замок Лауфен, история которого восходит к Средним векам. Оттуда к бурлящей воде совсем близко подводят дорожки и площадки. Уже в XIX веке сюда приезжали поэты и художники, например английский живописец Уильям Тёрнер, который не раз писал Рейнский водопад. В национальный праздник, 1 августа, здесь устраивают большой фейерверк, который отражается в воде. Кто едет к Рейнскому водопаду, пусть возьмёт дождевик: водяная пыль быстро промочит насквозь.`,
    explain: [
      ['gilt als', 'gelten als — «считаться»'],
      ['zwar …, aber', '«хотя и …, но»'],
      ['in die Tiefe', '«в глубину, вниз»'],
      ['thront', 'thronen — «восседать (как на троне), возвышаться»'],
      ['reicht … zurück', 'zurückreichen bis — «уходить корнями в, восходить к»']
    ],
    words: [['wasserfall', 'водопад'], ['breit', 'широкий'], ['schmilzt', 'тает'], ['stürzen', 'низвергаются, падают'], ['eiszeit', 'ледниковый период'], ['bett', 'русло; кровать'], ['fluss', 'река'], ['umspült', 'омывает'], ['boote', 'лодки'], ['treppe', 'лестница'], ['lärm', 'шум, грохот'], ['nebel', 'туман'], ['tosende', 'бушующий, грохочущий'], ['dichter', 'поэты'], ['feuerwerk', 'фейерверк'], ['gischt', 'брызги, водяная пыль']],
    links: [{ title: 'Википедия: Рейнский водопад', href: 'https://ru.wikipedia.org/wiki/Рейнский_водопад' }, { title: 'Wikipedia: Rheinfall', href: 'https://de.wikipedia.org/wiki/Rheinfall' }, { title: 'Официальный сайт', href: 'https://www.rheinfall.ch/' }]
  }
];
