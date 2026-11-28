// Достопримечательности Турции: Стамбул, Каппадокия, Памуккале, Эфес, Немрут, Сумела, Анкара.
// Тексты написаны для Лингвы по общедоступным сведениям (энциклопедии, сайты музеев), уровень B1.
// У каждой карточки: текст 10+ предложений для читалки (перевод по клику), перевод целиком, пояснения, слова и ссылки.
export const LANDMARKS_INTRO = 'Десять самых известных мест Турции — от Айя-Софии и Топкапы до каменных голов на горе Немрут.';

export const LANDMARKS = [
  {
    id: 'sight-tr-ayasofya', level: 'B1', region: 'Стамбул', title: 'Ayasofya', ru: 'Айя-София',
    desc: 'Собор Юстиниана VI века: почти тысячу лет храм, потом мечеть, музей и снова мечеть.',
    body: `Ayasofya, İstanbul'un tarihî yarımadasında bulunan ve dünyanın en ünlü yapılarından biri olan büyük bir yapıdır. Bugünkü bina, Bizans İmparatoru Justinianus'un emriyle 532 ile 537 yılları arasında sadece beş yılda inşa edildi. Mimarları Tralles'li Anthemios ve Miletos'lu İsidoros, o dönem için inanılmaz büyüklükte bir kubbe tasarladılar.

Kubbenin çapı yaklaşık otuz bir metredir ve yerden yüksekliği elli beş metreyi geçer. Kubbenin altındaki pencerelerden giren ışık yüzünden, kubbe sanki havada asılı duruyormuş gibi görünür. Ayasofya yaklaşık dokuz yüz yıl boyunca Hristiyan dünyasının en büyük kilisesiydi.

1453'te Fatih Sultan Mehmet İstanbul'u fethettikten sonra Ayasofya camiye dönüştürüldü ve yanına minareler eklendi. 1934'te alınan bir kararla müze oldu ve dünyanın her yerinden turistler onu görmeye geldi. 2020 yılında ise yeniden cami olarak ibadete açıldı. İçeride hem İslam hattatlarının yazdığı büyük levhalar hem de altın yaldızlı Bizans mozaikleri birlikte görülebilir. Bu nedenle Ayasofya, iki büyük medeniyetin buluştuğu bir yer olarak kabul edilir. Ziyaretçilerin namaz vakitlerinde beklemesi ve kadınların başlarını örtmesi gerekir.`,
    translation: `Айя-София — большое здание на исторической части Стамбула, одно из самых знаменитых сооружений в мире. Нынешнее здание построено по приказу византийского императора Юстиниана между 532 и 537 годами — всего за пять лет. Его архитекторы, Анфимий из Тралл и Исидор из Милета, спроектировали купол невероятного для того времени размера.

Диаметр купола около тридцати одного метра, а высота от пола превышает пятьдесят пять метров. Из-за света, проникающего через окна под куполом, кажется, будто купол парит в воздухе. Почти девятьсот лет Айя-София была крупнейшим храмом христианского мира.

В 1453 году, после того как Мехмед Завоеватель взял Стамбул, Айя-Софию превратили в мечеть и пристроили к ней минареты. В 1934 году по принятому решению она стала музеем, и посмотреть на неё приезжали туристы со всего мира. А в 2020 году её снова открыли для молитвы как мечеть. Внутри можно увидеть одновременно и большие щиты с надписями исламских каллиграфов, и золочёные византийские мозаики. Поэтому Айя-Софию считают местом встречи двух великих цивилизаций. Посетителям нужно подождать во время намаза, а женщинам — покрыть голову.`,
    explain: [
      ['emriyle', 'emir («приказ») + -i + -yle: «по его приказу»'],
      ['inşa edildi', 'пассив от inşa etmek: «был построен»'],
      ['duruyormuş gibi görünür', '-mış gibi — «как будто бы»: «кажется, будто стоит»'],
      ['fethettikten sonra', '-dıktan sonra — «после того как»'],
      ['kabul edilir', 'пассив: «принимается, считается»']
    ],
    words: [['yarımadasında', 'на полуострове'], ['yapı', 'здание, сооружение'], ['emriyle', 'по приказу'], ['mimarları', 'его архитекторы'], ['kubbe', 'купол'], ['çapı', 'его диаметр'], ['yüksekliği', 'его высота'], ['ışık', 'свет'], ['asılı', 'подвешенный'], ['kilisesiydi', 'был церковью'], ['fethettikten', 'после завоевания'], ['camiye', 'в мечеть'], ['minareler', 'минареты'], ['ibadete', 'для молитвы, богослужения'], ['hattatlarının', 'каллиграфов'], ['levhalar', 'щиты, таблички'], ['medeniyetin', 'цивилизации']],
    links: [{ title: 'Википедия: Собор Святой Софии (Стамбул)', href: 'https://ru.wikipedia.org/wiki/Собор_Святой_Софии_(Стамбул)' }, { title: 'Vikipedi: Ayasofya', href: 'https://tr.wikipedia.org/wiki/Ayasofya' }]
  },
  {
    id: 'sight-tr-topkapi', level: 'B1', region: 'Стамбул', title: 'Topkapı Sarayı', ru: 'Дворец Топкапы',
    desc: 'Дворец османских султанов над Босфором: гарем, Алмаз ложечника и священные реликвии.',
    body: `Topkapı Sarayı, İstanbul'da Sarayburnu denilen yerde, Boğaz'ın, Haliç'in ve Marmara Denizi'nin birleştiği noktada yer alır. Sarayın yapımına Fatih Sultan Mehmet döneminde, 1460'larda başlandı. Yaklaşık dört yüz yıl boyunca Osmanlı padişahları burada yaşadı ve devleti buradan yönetti.

Saray, Avrupa saraylarına benzemez, çünkü tek bir büyük bina değil, avlular etrafında sıralanmış birçok yapıdan oluşur. Birinci avluya herkes girebilirdi, fakat içeriye doğru ilerledikçe kurallar daha sıkı hâle geliyordu. Harem bölümünde padişahın annesi, eşleri, çocukları ve hizmetçileri yaşıyordu ve burada yüzlerce oda vardır.

1856'da padişahlar Dolmabahçe Sarayı'na taşındı ve Topkapı 1924'te müzeye dönüştürüldü. Hazine bölümünde dünyaca ünlü Kaşıkçı Elması ve zümrütlerle süslenmiş Topkapı Hançeri sergilenir. Bir efsaneye göre bu büyük elması bir balıkçı çöplükte bulmuş ve onu üç kaşık karşılığında satmıştır. Kutsal Emanetler Dairesi'nde ise İslam dünyası için çok değerli eşyalar saklanır. Sarayın bahçelerinden Boğaz'ın ve Asya yakasının muhteşem manzarası görülür. Müzeyi gezmek en az yarım gün sürer, bu yüzden erken gitmek iyi bir fikirdir.`,
    translation: `Дворец Топкапы стоит в Стамбуле на мысе Сарайбурну, там, где сходятся Босфор, Золотой Рог и Мраморное море. Строительство дворца начали при Мехмеде Завоевателе, в 1460-х годах. Почти четыреста лет здесь жили османские султаны и отсюда управляли государством.

Дворец не похож на европейские: это не одно большое здание, а множество построек, расположенных вокруг дворов. В первый двор мог войти кто угодно, но чем дальше вглубь, тем строже становились правила. В гареме жили мать султана, его жёны, дети и слуги, и там сотни комнат.

В 1856 году султаны переехали во дворец Долмабахче, а в 1924 году Топкапы превратили в музей. В сокровищнице выставлены всемирно известный Алмаз ложечника и украшенный изумрудами кинжал Топкапы. По легенде, этот большой алмаз нашёл на свалке рыбак и продал его за три ложки. В покоях Священных реликвий хранятся вещи, очень ценные для исламского мира. Из садов дворца открывается великолепный вид на Босфор и азиатский берег. Осмотр музея занимает не меньше половины дня, так что приходить лучше пораньше.`,
    explain: [
      ['denilen yer', 'denilen — «называемый»: «место, которое называют…»'],
      ['başlandı', 'безличный пассив: «было начато»'],
      ['ilerledikçe', '-dıkça — «по мере того как; чем больше…»'],
      ['bulmuş … satmıştır', '-mış — пересказывательное прошедшее: «(говорят) нашёл, продал»'],
      ['karşılığında', '«в обмен на»']
    ],
    words: [['sarayı', 'дворец'], ['birleştiği', 'где соединяются'], ['yapımına', 'к постройке'], ['padişahları', 'султаны, падишахи'], ['yönetti', 'управлял(и)'], ['avlular', 'дворы'], ['sıkı', 'строгий'], ['eşleri', 'его жёны'], ['hizmetçileri', 'слуги'], ['taşındı', 'переехали'], ['hazine', 'сокровищница'], ['elması', 'алмаз'], ['zümrütlerle', 'изумрудами'], ['hançeri', 'кинжал'], ['çöplükte', 'на свалке'], ['kaşık', 'ложка'], ['emanetler', 'реликвии, вверенные вещи'], ['manzarası', 'вид, пейзаж']],
    links: [{ title: 'Википедия: Топкапы', href: 'https://ru.wikipedia.org/wiki/Топкапы' }, { title: 'Vikipedi: Topkapı Sarayı', href: 'https://tr.wikipedia.org/wiki/Topkapı_Sarayı' }]
  },
  {
    id: 'sight-tr-sultanahmet', level: 'B1', region: 'Стамбул', title: 'Sultanahmet Camii', ru: 'Голубая мечеть (мечеть Султанахмет)',
    desc: 'Мечеть с шестью минаретами и двадцатью тысячами изникских изразцов напротив Айя-Софии.',
    body: `Sultanahmet Camii, Ayasofya'nın tam karşısında yer alan ve İstanbul'un en çok ziyaret edilen camilerinden biridir. Cami, Sultan I. Ahmet'in isteğiyle 1609 ile 1616 yılları arasında inşa edildi. Mimarı, ünlü mimar Sinan'ın öğrencisi olan Sedefkâr Mehmet Ağa'dır.

Caminin içi yirmi binden fazla İznik çinisiyle süslenmiştir. Bu çinilerde en çok mavi renk kullanıldığı için yabancılar ona "Mavi Cami" adını verdiler. Çinilerin üzerinde laleler, karanfiller, selviler ve meyve ağaçları gibi bitki motifleri bulunur. İçeriyi iki yüzden fazla pencere aydınlatır ve gün ışığı mavi çinilerin üzerinde parlar.

Sultanahmet Camii'nin altı minaresi vardır ve o dönemde bu çok sıra dışı bir şeydi. Bir rivayete göre padişah mimardan "altın" minare istemiş, ama mimar bu kelimeyi "altı" diye anlamıştır. Caminin önünde, Bizans zamanında At Meydanı olan büyük bir alan uzanır. Burada bugün hâlâ Mısır'dan getirilmiş üç bin beş yüz yıllık bir dikilitaş görülebilir. Cami ibadete açık olduğu için ziyaretçiler ayakkabılarını çıkarmalı ve sessiz olmalıdır. Akşamları cami ışıklandırıldığında minareler gökyüzünde parıldar.`,
    translation: `Мечеть Султанахмет стоит прямо напротив Айя-Софии и является одной из самых посещаемых мечетей Стамбула. Мечеть построили по желанию султана Ахмеда I между 1609 и 1616 годами. Её архитектор — Седефкяр Мехмед-ага, ученик знаменитого зодчего Синана.

Внутри мечеть украшена более чем двадцатью тысячами изникских изразцов. Поскольку в этих изразцах больше всего синего цвета, иностранцы назвали её «Голубой мечетью». На изразцах — растительные узоры: тюльпаны, гвоздики, кипарисы и фруктовые деревья. Внутренность освещают больше двухсот окон, и дневной свет играет на синих изразцах.

У мечети Султанахмет шесть минаретов, и для того времени это было очень необычно. По преданию, султан попросил у архитектора «золотые» (altın) минареты, а архитектор понял это слово как «шесть» (altı). Перед мечетью простирается большая площадь, которая в византийские времена была ипподромом. Здесь и сегодня можно увидеть привезённый из Египта обелиск возрастом три с половиной тысячи лет. Поскольку мечеть открыта для молитвы, посетители должны снимать обувь и соблюдать тишину. Вечером, когда мечеть подсвечивают, минареты сверкают в небе.`,
    explain: [
      ['I. Ahmet', 'читается Birinci Ahmet — «Ахмед Первый»'],
      ['kullanıldığı için', '-dığı için — «поскольку, так как»'],
      ['istemiş … anlamıştır', '-mış: рассказ с чужих слов, предание'],
      ['"altı" diye', 'diye — «так, что; как бы говоря»: понял как «шесть»'],
      ['çıkarmalı', '-malı — долженствование: «должны снять»']
    ],
    words: [['camii', 'мечеть'], ['karşısında', 'напротив'], ['isteğiyle', 'по желанию'], ['öğrencisi', 'его ученик'], ['çinisiyle', 'изразцами'], ['süslenmiştir', 'украшен'], ['mavi', 'синий, голубой'], ['laleler', 'тюльпаны'], ['karanfiller', 'гвоздики'], ['selviler', 'кипарисы'], ['aydınlatır', 'освещает'], ['parlar', 'блестит, сияет'], ['minaresi', 'минарет'], ['rivayete', 'преданию'], ['altın', 'золото, золотой'], ['dikilitaş', 'обелиск'], ['ayakkabılarını', 'свою обувь'], ['sessiz', 'тихий']],
    links: [{ title: 'Википедия: Голубая мечеть', href: 'https://ru.wikipedia.org/wiki/Голубая_мечеть_(Стамбул)' }, { title: 'Vikipedi: Sultan Ahmet Camii', href: 'https://tr.wikipedia.org/wiki/Sultan_Ahmet_Camii' }]
  },
  {
    id: 'sight-tr-galata', level: 'B1', region: 'Стамбул', title: 'Galata Kulesi', ru: 'Галатская башня',
    desc: 'Генуэзская башня XIV века над Золотым Рогом и легенда о человеке, перелетевшем Босфор.',
    body: `Galata Kulesi, İstanbul'un Beyoğlu ilçesinde, Haliç'e bakan bir tepenin üzerinde yükselir. Kule 1348 yılında, o zaman Galata'da yaşayan Cenevizliler tarafından inşa edildi. Cenevizliler ona "İsa Kulesi" adını vermişlerdi ve kule şehir surlarının bir parçasıydı.

Kulenin yüksekliği yaklaşık altmış yedi metredir ve duvarları çok kalındır. Osmanlı döneminde kule önce bir zindan, sonra da yangın gözetleme kulesi olarak kullanıldı. Ahşap evlerin çok olduğu İstanbul'da yangınlar büyük bir tehlikeydi, bu yüzden bekçiler yukarıdan şehri sürekli izlerdi.

Kuleyle ilgili en ünlü hikâye on yedinci yüzyılda yaşamış Hezârfen Ahmet Çelebi'ye aittir. Seyyah Evliya Çelebi'ye göre Hezârfen, kendi yaptığı kanatlarla kuleden atlamış ve Boğaz'ı geçip Üsküdar'a inmiştir. Bu hikâyenin gerçek olup olmadığı bilinmez, ama İstanbullular onu hâlâ gururla anlatır. Bugün kule bir müzedir ve ziyaretçiler asansörle yukarı çıkabilir. Tepedeki dar balkondan bütün şehir, Tarihi Yarımada, Boğaz ve Kız Kulesi görülür. Akşam saatlerinde balkonda yer bulmak için genellikle uzun bir kuyruk olur.`,
    translation: `Галатская башня возвышается на холме над Золотым Рогом, в районе Бейоглу. Её построили в 1348 году генуэзцы, жившие тогда в Галате. Генуэзцы назвали её «Башней Христа», и она была частью городских стен.

Высота башни около шестидесяти семи метров, а стены у неё очень толстые. В османское время башня служила сначала темницей, а потом пожарной каланчой. В Стамбуле, где было много деревянных домов, пожары были большой опасностью, поэтому сторожа постоянно следили за городом сверху.

Самая известная история о башне связана с Хезарфеном Ахмедом Челеби, жившим в XVII веке. По словам путешественника Эвлии Челеби, Хезарфен прыгнул с башни на сделанных им самим крыльях, перелетел Босфор и приземлился в Ускюдаре. Правда ли это — неизвестно, но стамбульцы до сих пор с гордостью её рассказывают. Сегодня башня — музей, и посетители могут подняться наверх на лифте. С узкого балкона наверху виден весь город, исторический полуостров, Босфор и Девичья башня. Вечером, чтобы найти место на балконе, обычно приходится стоять в длинной очереди.`,
    explain: [
      ['Cenevizliler tarafından', 'tarafından — «кем-то» в пассиве: «генуэзцами»'],
      ['vermişlerdi', 'давнопрошедшее -mişti: «(когда-то) дали»'],
      ['izlerdi', 'широкое время в прошедшем -ardı: «обычно следили»'],
      ['Hezârfen', '«знающий тысячу наук» — прозвище учёного'],
      ['olup olmadığı', '«так ли это или нет»']
    ],
    words: [['kulesi', 'башня'], ['tepenin', 'холма'], ['yükselir', 'возвышается'], ['cenevizliler', 'генуэзцы'], ['surlarının', 'городских стен'], ['kalındır', 'толстые'], ['zindan', 'темница'], ['yangın', 'пожар'], ['gözetleme', 'наблюдение'], ['ahşap', 'деревянный'], ['tehlikeydi', 'была опасностью'], ['bekçiler', 'сторожа'], ['seyyah', 'путешественник'], ['kanatlarla', 'крыльями'], ['atlamış', 'прыгнул'], ['gururla', 'с гордостью'], ['asansörle', 'на лифте'], ['kuyruk', 'очередь; хвост']],
    links: [{ title: 'Википедия: Галатская башня', href: 'https://ru.wikipedia.org/wiki/Галатская_башня' }, { title: 'Vikipedi: Galata Kulesi', href: 'https://tr.wikipedia.org/wiki/Galata_Kulesi' }]
  },
  {
    id: 'sight-tr-kapadokya', level: 'B1', region: 'Каппадокия, Центральная Анатолия', title: 'Kapadokya', ru: 'Каппадокия',
    desc: '«Сказочные трубы» из вулканического туфа, пещерные церкви, подземные города и воздушные шары на рассвете.',
    body: `Kapadokya, İç Anadolu'da Nevşehir, Kayseri ve Aksaray çevresinde uzanan eşsiz bir bölgedir. Milyonlarca yıl önce Erciyes, Hasandağı ve Göllüdağ volkanları patladı ve bölgeyi kalın bir kül tabakasıyla kapladı. Bu kül zamanla yumuşak bir taşa, yani tüfe dönüştü.

Yağmur, rüzgâr ve kar, yumuşak taşı yavaş yavaş aşındırdı ve ortaya peri bacaları denilen ilginç kayalar çıktı. Peri bacalarının çoğunun tepesinde, daha sert taştan oluşan bir şapka vardır. İnsanlar bu yumuşak kayaları kolayca oyarak içlerinde evler, güvercinlikler ve kiliseler yaptılar.

Göreme Açık Hava Müzesi'nde, duvarları renkli fresklerle süslenmiş kaya kiliseleri bulunur. Derinkuyu ve Kaymaklı gibi yer altı şehirleri ise yerin onlarca metre altına iner ve binlerce kişiyi saklayabilirdi. Bu şehirlerde mutfaklar, ahırlar, su kuyuları ve hava kanalları vardır. Bugün Kapadokya'yı en ünlü yapan şeylerden biri, sabahın erken saatlerinde gökyüzüne yükselen yüzlerce sıcak hava balonudur. Turistler mağara otellerde kalabilir, at sırtında vadileri gezebilir ve Avanos'ta çömlek yapmayı öğrenebilir. Kapadokya 1985 yılından beri UNESCO Dünya Mirası Listesi'ndedir.`,
    translation: `Каппадокия — уникальный край в Центральной Анатолии, раскинувшийся вокруг Невшехира, Кайсери и Аксарая. Миллионы лет назад извергались вулканы Эрджиес, Хасандаг и Гёллюдаг и покрыли всю область толстым слоем пепла. Со временем этот пепел превратился в мягкий камень — туф.

Дождь, ветер и снег медленно размывали мягкий камень, и появились необычные скалы, которые называют «сказочными трубами». У большинства «сказочных труб» на верхушке есть «шляпка» из более твёрдого камня. Люди легко выдалбливали эти мягкие скалы и устраивали в них дома, голубятни и церкви.

В музее под открытым небом Гёреме есть скальные церкви, стены которых расписаны цветными фресками. А подземные города, например Деринкую и Каймаклы, уходят на десятки метров под землю и могли укрыть тысячи людей. В этих городах есть кухни, хлевы, колодцы и вентиляционные каналы. Сегодня одна из главных причин славы Каппадокии — сотни воздушных шаров, поднимающихся в небо ранним утром. Туристы могут жить в пещерных отелях, объезжать долины верхом и учиться делать глиняную посуду в Аваносе. С 1985 года Каппадокия входит в список Всемирного наследия ЮНЕСКО.`,
    explain: [
      ['yani', '«то есть»'],
      ['yavaş yavaş', '«медленно, потихоньку» — удвоение усиливает'],
      ['denilen', '«называемый»'],
      ['oyarak', '-arak — деепричастие: «выдалбливая»'],
      ['saklayabilirdi', '-abilirdi — «мог(ли) бы, могли (тогда)»']
    ],
    words: [['bölgedir', 'это край, область'], ['volkanları', 'вулканы'], ['patladı', 'взорвались, извергались'], ['kül', 'пепел'], ['tabakasıyla', 'слоем'], ['yumuşak', 'мягкий'], ['aşındırdı', 'размыл, стёр'], ['peri', 'фея'], ['bacaları', 'трубы'], ['sert', 'твёрдый'], ['şapka', 'шляпа'], ['güvercinlikler', 'голубятни'], ['yer altı', 'подземный'], ['ahırlar', 'хлевы, конюшни'], ['kuyuları', 'колодцы'], ['balonudur', 'воздушный шар'], ['mağara', 'пещера'], ['çömlek', 'глиняный горшок']],
    links: [{ title: 'Википедия: Каппадокия', href: 'https://ru.wikipedia.org/wiki/Каппадокия' }, { title: 'Vikipedi: Kapadokya', href: 'https://tr.wikipedia.org/wiki/Kapadokya' }]
  },
  {
    id: 'sight-tr-pamukkale', level: 'B1', region: 'Денизли', title: 'Pamukkale', ru: 'Памуккале',
    desc: '«Хлопковый замок»: белоснежные травертиновые террасы и античный город Иераполь над ними.',
    body: `Pamukkale, Denizli şehrine yaklaşık yirmi kilometre uzaklıkta bulunan ve adı "pamuktan kale" anlamına gelen doğal bir harikadır. Uzaktan bakıldığında beyaz yamaç, dev bir pamuk yığınına ya da karla kaplı bir dağa benzer. Aslında bu beyazlık kar değil, sıcak sudan çökelen kireçtir.

Yer altından çıkan termal su, içinde çok fazla kalsiyum taşır. Su yamaçtan aşağı akarken soğur ve kalsiyum, travertin denilen beyaz bir taş olarak birikir. Binlerce yıl içinde bu birikintiler, mavi sularla dolu basamak basamak teraslar oluşturdu.

Travertenlerin hemen üstünde antik Hierapolis şehrinin kalıntıları vardır. Bu şehir milattan önce ikinci yüzyılda kuruldu ve şifalı suları sayesinde ünlü bir sağlık merkezi oldu. Burada büyük bir tiyatro, hamamlar ve Anadolu'nun en büyük antik mezarlıklarından biri bulunur. Ziyaretçiler, efsaneye göre Kleopatra'nın da yüzdüğü antik havuzda, eski sütunların arasında yüzebilir. Travertenleri korumak için teraslarda ayakkabıyla yürümek yasaktır, bu yüzden herkes çıplak ayakla yürür. Pamukkale ve Hierapolis 1988'den beri UNESCO Dünya Mirası Listesi'nde yer alır.`,
    translation: `Памуккале — природное чудо примерно в двадцати километрах от города Денизли; его название значит «замок из хлопка». Если смотреть издалека, белый склон похож на гигантскую кучу хлопка или на покрытую снегом гору. На самом деле эта белизна — не снег, а известь, осевшая из горячей воды.

Термальная вода, выходящая из-под земли, несёт в себе очень много кальция. Стекая по склону, вода остывает, и кальций откладывается белым камнем, который называют травертином. За тысячи лет эти отложения образовали ступенчатые террасы, полные голубой воды.

Прямо над травертинами лежат развалины античного города Иераполь. Этот город основан во II веке до н. э. и благодаря целебным водам стал знаменитым лечебным центром. Здесь есть большой театр, бани и одно из крупнейших античных кладбищ Анатолии. Посетители могут поплавать среди старых колонн в античном бассейне, в котором, по легенде, купалась и Клеопатра. Чтобы сберечь травертины, ходить по террасам в обуви запрещено, поэтому все ходят босиком. Памуккале и Иераполь с 1988 года входят в список Всемирного наследия ЮНЕСКО.`,
    explain: [
      ['anlamına gelen', '«означающий»'],
      ['bakıldığında', '-dığında — «когда (смотрят)»'],
      ['akarken', '-arken — «в то время как (течёт)»'],
      ['basamak basamak', '«ступенями, ступенчато»'],
      ['milattan önce', '«до нашей эры» (букв. «до Рождества»), сокращённо MÖ']
    ],
    words: [['pamuk', 'хлопок'], ['kale', 'крепость, замок'], ['harika', 'чудо'], ['yamaç', 'склон'], ['yığınına', 'куче'], ['kireç', 'известь'], ['termal', 'термальный'], ['soğur', 'остывает'], ['birikir', 'накапливается'], ['birikintiler', 'отложения'], ['teraslar', 'террасы'], ['kalıntıları', 'развалины'], ['şifalı', 'целебный'], ['hamamlar', 'бани'], ['mezarlıklarından', 'кладбищ'], ['sütunların', 'колонн'], ['yasaktır', 'запрещено'], ['çıplak ayakla', 'босиком']],
    links: [{ title: 'Википедия: Памуккале', href: 'https://ru.wikipedia.org/wiki/Памуккале' }, { title: 'Vikipedi: Pamukkale', href: 'https://tr.wikipedia.org/wiki/Pamukkale' }]
  },
  {
    id: 'sight-tr-efes', level: 'B1', region: 'Измир', title: 'Efes Antik Kenti', ru: 'Эфес',
    desc: 'Античный город с библиотекой Цельса, театром на 25 тысяч мест и остатками храма Артемиды.',
    body: `Efes, İzmir'in Selçuk ilçesi yakınlarında bulunan ve dünyanın en iyi korunmuş antik kentlerinden biridir. Roma döneminde Efes, Asya eyaletinin başkenti ve iki yüz binden fazla insanın yaşadığı büyük bir liman şehriydi. Zamanla nehrin getirdiği toprak limanı doldurdu ve bugün deniz birkaç kilometre uzaktadır.

Kentin en ünlü yapısı Celsus Kütüphanesi'dir. Bu kütüphane, MS ikinci yüzyılın başında bir oğul tarafından babası Celsus'un anısına yaptırıldı. İçinde on binlerce parşömen saklanıyordu ve Celsus'un mezarı da kütüphanenin altındadır.

Kentteki büyük tiyatro yaklaşık yirmi beş bin kişiyi alabiliyordu ve bugün bile konserlerde kullanılır. Mermer döşeli sokaklarda yürürken eski dükkânları, çeşmeleri ve umumi tuvaletleri görebilirsiniz. Yakınlardaki Artemis Tapınağı, dünyanın yedi harikasından biriydi, ama bugün ondan geriye yalnızca tek bir sütun kalmıştır. Hristiyanlar için de Efes önemli bir yerdir, çünkü Meryem Ana'nın son yıllarını burada geçirdiğine inanılır. Yamaçlardaki Yamaç Evler'de zengin Romalıların duvar resimleri ve mozaikleri hâlâ görülebilir. Efes 2015 yılında UNESCO Dünya Mirası Listesi'ne girdi.`,
    translation: `Эфес, расположенный неподалёку от района Сельчук в Измире, — один из самых хорошо сохранившихся античных городов мира. В римскую эпоху Эфес был столицей провинции Азия и большим портовым городом, где жило больше двухсот тысяч человек. Со временем принесённая рекой земля засыпала гавань, и сегодня море находится в нескольких километрах.

Самое знаменитое здание города — библиотека Цельса. Эту библиотеку в начале II века н. э. построил сын в память о своём отце Цельсе. В ней хранились десятки тысяч свитков, а под библиотекой находится и гробница Цельса.

Большой театр города вмещал около двадцати пяти тысяч человек, и даже сегодня в нём проходят концерты. Шагая по мощённым мрамором улицам, можно увидеть старые лавки, фонтаны и общественные туалеты. Находившийся неподалёку храм Артемиды был одним из семи чудес света, но сегодня от него осталась лишь одна колонна. Для христиан Эфес тоже важное место: считается, что здесь провела последние годы Дева Мария. В Домах на склоне до сих пор можно увидеть настенные росписи и мозаики богатых римлян. В 2015 году Эфес внесли в список Всемирного наследия ЮНЕСКО.`,
    explain: [
      ['en iyi korunmuş', '«лучше всего сохранившийся»'],
      ['MS', 'milattan sonra — «нашей эры»'],
      ['yaptırıldı', 'понудительный залог + пассив: «был построен (по чьему-то заказу)»'],
      ['alabiliyordu', '-abiliyordu — «мог вмещать (тогда)»'],
      ['geçirdiğine inanılır', '«считается, что провела»']
    ],
    words: [['kent', 'город'], ['korunmuş', 'сохранившийся'], ['eyaletinin', 'провинции'], ['başkenti', 'столица'], ['liman', 'порт, гавань'], ['nehrin', 'реки'], ['kütüphanesi', 'библиотека'], ['anısına', 'в память о'], ['parşömen', 'пергамент, свиток'], ['mezarı', 'его гробница'], ['tiyatro', 'театр'], ['mermer', 'мрамор'], ['dükkânları', 'лавки'], ['çeşmeleri', 'фонтаны'], ['tapınağı', 'храм'], ['harikasından', 'из чудес'], ['zengin', 'богатый'], ['duvar resimleri', 'настенные росписи']],
    links: [{ title: 'Википедия: Эфес', href: 'https://ru.wikipedia.org/wiki/Эфес' }, { title: 'Vikipedi: Efes', href: 'https://tr.wikipedia.org/wiki/Efes' }]
  },
  {
    id: 'sight-tr-nemrut', level: 'B1', region: 'Адыяман, Юго-Восточная Анатолия', title: 'Nemrut Dağı', ru: 'Гора Немрут',
    desc: 'Святилище царя Коммагены Антиоха I: каменные головы богов на вершине высотой больше двух километров.',
    body: `Nemrut Dağı, Adıyaman ilinde, yaklaşık iki bin yüz elli metre yüksekliğinde bir dağdır. Dağın tepesinde, milattan önce birinci yüzyılda Kommagene Kralı I. Antiochos'un yaptırdığı muhteşem bir anıt mezar bulunur. Kral, ölümünden sonra tanrıların arasında oturacağına inanıyordu.

Anıt mezarın ortasında, küçük taşlardan yapılmış yaklaşık elli metre yüksekliğinde yapay bir tepe vardır. Kralın mezarının bu tepenin altında olduğu düşünülür, ama bugüne kadar bulunamadı. Tepenin doğu ve batı terasında, kralın ve tanrıların dev heykelleri sıralanır.

Bu heykellerde hem Yunan hem de Pers tanrılarının özellikleri birleşmiştir. Yüzyıllar içinde depremler yüzünden heykellerin başları yere düşmüştür. Bugün iki metreyi aşan bu taş başlar, gövdelerin önünde yan yana durur ve ziyaretçilere bakar. Nemrut'a gelenlerin çoğu, güneşin doğuşunu ya da batışını izlemek için gece yola çıkar. Güneşin ilk ışıkları taş yüzleri kırmızıya ve altın rengine boyar. Zirvede hava yazın bile soğuk olabilir, bu yüzden sıcak giysiler getirmek gerekir. Nemrut Dağı 1987 yılında UNESCO Dünya Mirası Listesi'ne alındı.`,
    translation: `Немрут — гора высотой около двух тысяч ста пятидесяти метров в провинции Адыяман. На её вершине находится великолепное гробничное святилище, которое в I веке до н. э. велел построить царь Коммагены Антиох I. Царь верил, что после смерти будет восседать среди богов.

В центре святилища стоит искусственный курган высотой около пятидесяти метров, сложенный из мелких камней. Считается, что гробница царя находится под этим курганом, но до сих пор её так и не нашли. На восточной и западной террасах кургана выстроены в ряд гигантские статуи царя и богов.

В этих статуях соединились черты и греческих, и персидских богов. За века из-за землетрясений головы статуй упали на землю. Сегодня эти каменные головы высотой больше двух метров стоят рядом перед туловищами и смотрят на посетителей. Большинство приезжающих на Немрут отправляется в путь ночью, чтобы увидеть восход или закат солнца. Первые лучи солнца окрашивают каменные лица в красный и золотой цвет. На вершине даже летом бывает холодно, поэтому нужно брать тёплую одежду. В 1987 году гора Немрут была внесена в список Всемирного наследия ЮНЕСКО.`,
    explain: [
      ['yaptırdığı', 'понудительный залог -dır: «который он велел построить»'],
      ['oturacağına inanıyordu', '«верил, что будет сидеть»'],
      ['bulunamadı', 'невозможность в пассиве: «не удалось найти»'],
      ['yan yana', '«рядом, бок о бок»'],
      ['yola çıkar', 'yola çıkmak — «отправляться в путь»']
    ],
    words: [['dağ', 'гора'], ['tepesinde', 'на вершине'], ['kralı', 'царь, король'], ['anıt mezar', 'мавзолей, гробница-памятник'], ['tanrıların', 'богов'], ['yapay', 'искусственный'], ['heykelleri', 'статуи'], ['sıralanır', 'выстроены в ряд'], ['özellikleri', 'черты'], ['depremler', 'землетрясения'], ['başları', 'головы'], ['gövdelerin', 'туловищ'], ['doğuşunu', 'восход'], ['batışını', 'закат'], ['zirvede', 'на вершине'], ['giysiler', 'одежда']],
    links: [{ title: 'Википедия: Немрут-Даг', href: 'https://ru.wikipedia.org/wiki/Немрут-Даг' }, { title: 'Vikipedi: Nemrut Dağı', href: 'https://tr.wikipedia.org/wiki/Nemrut_Dağı' }]
  },
  {
    id: 'sight-tr-sumela', level: 'B1', region: 'Трабзон, Черноморье', title: 'Sümela Manastırı', ru: 'Монастырь Сумела',
    desc: 'Монастырь Богородицы, встроенный в отвесную скалу над лесистой долиной у Трабзона.',
    body: `Sümela Manastırı, Trabzon'un Maçka ilçesinde, Altındere Vadisi'nde sarp bir kayalığın ortasına inşa edilmiştir. Manastır, vadinin dibinden yaklaşık üç yüz metre yukarıda, yemyeşil ormanların üzerinde asılı gibi durur. Sisli günlerde bulutların arasından görünen manastır, bir rüyadan çıkmış gibidir.

Geleneğe göre manastırı dördüncü yüzyılda Atina'dan gelen iki keşiş, Barnabas ve Sofronios kurdu. Onlar bu mağarada Meryem Ana'nın bir ikonasını bulduklarına inanıyorlardı. Manastırın adı da "kara" anlamına gelen ve yakındaki Karadağ'ı ifade eden bir Rumca kelimeden gelir.

Yüzyıllar boyunca manastır birçok kez onarıldı ve genişletildi. Kaya kilisesinin iç ve dış duvarları, İncil'den sahneleri anlatan renkli fresklerle kaplıdır. Ne yazık ki bazı freskler, ziyaretçilerin yazdığı yazılar yüzünden zarar görmüştür. Birkaç yıl süren restorasyondan sonra manastır yeniden ziyarete açıldı. Ziyaretçiler, ağaçların arasından geçen dik bir yoldan yürüyerek manastıra ulaşır. Her yıl 15 Ağustos'ta burada Ortodoks Hristiyanlar için özel bir ayin düzenlenir.`,
    translation: `Монастырь Сумела построен посреди отвесной скалы в долине Алтындере, в районе Мачка провинции Трабзон. Монастырь стоит примерно в трёхстах метрах над дном долины и будто висит над ярко-зелёными лесами. В туманные дни монастырь, показывающийся из облаков, словно явился из сна.

По преданию, монастырь основали в IV веке два монаха, пришедшие из Афин, — Варнава и Софроний. Они верили, что нашли в этой пещере икону Богородицы. Название монастыря происходит от греческого слова, означающего «чёрный» и указывающего на соседнюю гору Карадаг («Чёрная гора»).

За века монастырь много раз чинили и расширяли. Внутренние и внешние стены скальной церкви покрыты цветными фресками со сценами из Евангелия. К сожалению, некоторые фрески пострадали из-за надписей, оставленных посетителями. После реставрации, длившейся несколько лет, монастырь вновь открыли для посещения. Посетители добираются до монастыря пешком по крутой тропе между деревьями. Каждый год 15 августа здесь проводят особую службу для православных христиан.`,
    explain: [
      ['inşa edilmiştir', 'пассив с -miştir: «построен» (утверждение-факт)'],
      ['yemyeşil', 'усилительная форма от yeşil: «ярко-зелёный»'],
      ['rüyadan çıkmış gibidir', '«как будто вышел из сна»'],
      ['Rumca', 'язык понтийских и константинопольских греков; Rum — грек-подданный Османской империи'],
      ['zarar görmüştür', 'zarar görmek — «пострадать»']
    ],
    words: [['manastırı', 'монастырь'], ['vadisi', 'долина'], ['sarp', 'крутой, отвесный'], ['kayalığın', 'скалы'], ['ormanların', 'лесов'], ['sisli', 'туманный'], ['bulutların', 'облаков'], ['rüya', 'сон, мечта'], ['geleneğe', 'преданию, традиции'], ['keşiş', 'монах'], ['ikonasını', 'икону'], ['onarıldı', 'был починен'], ['genişletildi', 'был расширен'], ['freskler', 'фрески'], ['zarar', 'вред, ущерб'], ['dik', 'крутой'], ['ayin', 'обряд, богослужение']],
    links: [{ title: 'Википедия: Сумела', href: 'https://ru.wikipedia.org/wiki/Сумела' }, { title: 'Vikipedi: Sümela Manastırı', href: 'https://tr.wikipedia.org/wiki/Sümela_Manastırı' }]
  },
  {
    id: 'sight-tr-anitkabir', level: 'B1', region: 'Анкара', title: 'Anıtkabir', ru: 'Аныткабир — мавзолей Ататюрка',
    desc: 'Мавзолей основателя Турецкой Республики на холме в Анкаре: Аллея львов и минута молчания 10 ноября.',
    body: `Anıtkabir, Türkiye Cumhuriyeti'nin kurucusu Mustafa Kemal Atatürk'ün Ankara'daki anıt mezarıdır. Atatürk 10 Kasım 1938'de İstanbul'da vefat etti ve yıllarca geçici olarak Etnografya Müzesi'nde yattı. Anıtkabir için bir yarışma düzenlendi ve mimarlar Emin Onat ile Orhan Arda'nın projesi seçildi.

İnşaat 1944'te başladı ve dokuz yıl sürdü. 1953'te Atatürk'ün naaşı büyük bir törenle yeni anıt mezarına taşındı. Anıtkabir, şehrin ortasındaki Rasattepe adlı bir tepenin üzerine kuruldu ve bugün çevresi büyük bir parkla çevrilidir.

Ziyaretçiler önce Aslanlı Yol'dan yürür; bu yolun iki yanında Hitit sanatından esinlenerek yapılmış yirmi dört aslan heykeli vardır. Yolun sonunda geniş Tören Meydanı ve sütunlarla çevrili büyük Şeref Holü bulunur. Holün içinde kırk ton ağırlığında tek bir taştan yapılmış sembolik bir lahit durur, gerçek mezar ise bunun altındaki odadadır. Anıtkabir'in müzesinde Atatürk'ün kişisel eşyaları, arabaları ve Kurtuluş Savaşı'nı anlatan büyük tablolar sergilenir. Her yıl 10 Kasım'da saat dokuzu beş geçe tüm Türkiye'de sirenler çalar ve insanlar bir dakika saygı duruşunda bulunur. O gün Anıtkabir'e on binlerce kişi gelir.`,
    translation: `Аныткабир — мавзолей основателя Турецкой Республики Мустафы Кемаля Ататюрка в Анкаре. Ататюрк скончался 10 ноября 1938 года в Стамбуле и долгие годы временно покоился в Этнографическом музее. Для Аныткабира провели конкурс и выбрали проект архитекторов Эмина Оната и Орхана Арды.

Строительство началось в 1944 году и длилось девять лет. В 1953 году тело Ататюрка с большой церемонией перенесли в новый мавзолей. Аныткабир построен на холме Расаттепе в центре города, и сегодня вокруг него раскинулся большой парк.

Сначала посетители проходят по Аллее львов — по обеим её сторонам стоят двадцать четыре статуи львов, созданные по мотивам хеттского искусства. В конце аллеи — широкая Церемониальная площадь и большой Зал почёта, окружённый колоннами. В зале стоит символический саркофаг из цельного камня весом сорок тонн, а настоящая гробница находится в помещении под ним. В музее Аныткабира выставлены личные вещи Ататюрка, его автомобили и большие картины о Войне за независимость. Каждый год 10 ноября в 9:05 по всей Турции звучат сирены, и люди замирают на минуту молчания. В этот день в Аныткабир приходят десятки тысяч человек.`,
    explain: [
      ['vefat etti', 'вежливое «скончался»'],
      ['naaşı', 'почтительное «тело (покойного)»'],
      ['esinlenerek', '-erek от esinlenmek: «вдохновляясь»'],
      ['dokuzu beş geçe', '«в пять минут десятого»: geçe — «после (часа)»'],
      ['saygı duruşu', '«минута молчания», букв. «стояние почтения»']
    ],
    words: [['kurucusu', 'основатель'], ['cumhuriyeti', 'республика'], ['geçici', 'временный'], ['yarışma', 'конкурс'], ['seçildi', 'был выбран'], ['inşaat', 'строительство'], ['törenle', 'с церемонией'], ['çevrilidir', 'окружён'], ['aslan', 'лев'], ['meydanı', 'площадь'], ['şeref', 'честь, почёт'], ['ağırlığında', 'весом'], ['lahit', 'саркофаг'], ['kişisel', 'личный'], ['eşyaları', 'вещи'], ['kurtuluş', 'освобождение'], ['savaşı', 'война'], ['sirenler', 'сирены']],
    links: [{ title: 'Википедия: Аныткабир', href: 'https://ru.wikipedia.org/wiki/Аныткабир' }, { title: 'Vikipedi: Anıtkabir', href: 'https://tr.wikipedia.org/wiki/Anıtkabir' }]
  }
];
