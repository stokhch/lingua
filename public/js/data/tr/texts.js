// Тексты на турецком для чтения с переводом по клику. Все тексты написаны специально для Лингвы.
import { TEXTS as SONGS } from './songs.js';
import { TEXTS as TALES } from './tales.js';

const BASE = [
  {
    id: 'tr-merhaba', level: 'A0', topic: 'Знакомство', title: 'Merhaba!',
    body: `— Merhaba! Benim adım Ali. Senin adın ne?

— Merhaba, Ali! Benim adım Anna.

— Memnun oldum, Anna. Nerelisin?

— Rusyalıyım. Sen nerelisin?

— Ben Türküm. İstanbul'da yaşıyorum. Nasılsın?

— İyiyim, teşekkür ederim. Sen nasılsın?

— Ben de iyiyim. Görüşürüz!

— Hoşça kal!`
  },
  {
    id: 'tr-kafe', level: 'A0', topic: 'Еда', title: 'Kafede',
    body: `— Hoş geldiniz! Buyurun.

— Merhaba. Bir çay, lütfen.

— Şekerli mi, şekersiz mi?

— Şekersiz, lütfen. Bir de simit.

— Tabii. Başka bir şey?

— Hayır, teşekkürler. Ne kadar?

— Çay on lira, simit on beş lira. Toplam yirmi beş lira.

— Buyurun.

— Teşekkürler. Afiyet olsun!`
  },
  {
    id: 'tr-bu-ne', level: 'A0', topic: 'Первые слова', title: 'Bu Ne?',
    body: `Bu bir ev. Ev büyük ve beyaz. Bu bir kedi. Kedi küçük ve siyah.

Şu bir ağaç. Ağaç çok yüksek. Şu bir araba. Araba kırmızı.

— Bu ne? — Bu bir kitap. — Kitap yeni mi? — Hayır, kitap eski.

— Bu kim? — Bu Ayşe. O öğrenci.`
  },
  {
    id: 'tr-oda', level: 'A0', topic: 'Дом', title: 'Benim Odam',
    body: `Bu benim odam. Odamda bir yatak, bir masa ve iki sandalye var.

Masada üç kitap, bir defter ve bir lamba var. Pencere büyük. Odamda televizyon yok, ama bilgisayar var.

Odam küçük ama çok rahat. Ben odamı çok seviyorum.`
  },
  {
    id: 'tr-sabah', level: 'A1', topic: 'Повседневная жизнь', title: 'Benim Sabahım',
    body: `Her gün saat yedide kalkarım. Önce pencereyi açarım ve gökyüzüne bakarım. Sonra mutfağa giderim ve çay yaparım. Kedim masada oturur ve beni izler.

Kahvaltıda ekmek, peynir, zeytin ve yumurta yerim. Türk kahvaltısı çok lezzetli. Kahvaltıdan sonra yüzümü yıkarım ve dişlerimi fırçalarım.

Saat sekizde evden çıkarım. Sabah sokak sakin. Durağa yürürüm ve otobüsü beklerim. Sabahları seviyorum, çünkü sabah sakin ve güzel.`
  },
  {
    id: 'tr-aile', level: 'A1', topic: 'Семья', title: 'Büyük Bir Aile',
    body: `Benim adım Elif. Ben yirmi yaşındayım ve İzmir'de yaşıyorum. Büyük bir ailem var. Annem doktor, babam öğretmen. İki erkek kardeşim ve bir kız kardeşim var.

Ağabeyim Can üniversitede okuyor. O futbol oynamayı çok seviyor. Küçük kız kardeşim Ayşe altı yaşında. O köpekleri seviyor ve her gün resim yapıyor.

Pazar günü hep birlikte akşam yemeği yeriz. Anneannem çorba pişirir, dedem komik hikâyeler anlatır. Biz konuşuruz, güleriz ve çay içeriz. Ailemle birlikte olunca çok mutlu olurum.`
  },
  {
    id: 'tr-lokanta', level: 'A1', topic: 'Еда', title: 'Lokantada',
    body: `Bugün arkadaşım Mehmet ile bir lokantaya gidiyoruz. Lokanta küçük ama çok temiz. Garson bize menüyü getiriyor.

Mehmet çorba ve pilav istiyor. Ben tavuk ve salata istiyorum. İçecek olarak ayran içiyoruz. Yemekler sıcak ve çok lezzetli.

Yemekten sonra tatlı yiyoruz ve çay içiyoruz. Sonra garsondan hesabı istiyoruz. Hesap pahalı değil. Garsona teşekkür ederiz ve lokantadan çıkarız.`
  },
  {
    id: 'tr-istanbul', level: 'A2', topic: 'Путешествия', title: 'İstanbul\'da Bir Hafta Sonu',
    body: `Geçen hafta sonu arkadaşımla İstanbul'a gittik. Cuma akşamı geldik ve istasyonun yakınında ucuz bir otel bulduk.

Cumartesi sabahı hava sıcak ve güneşliydi. Önce eski bir saraya ve büyük bir camiye gittik. Öğleden sonra çarşıda gezdik ve taze simit aldık. Dar sokaklarda kaybolduk, ama nazik bir kadın bize yolu gösterdi.

Akşam vapura bindik. Denizden şehrin manzarası çok güzeldi. Martılar vapurun yanında uçuyordu. Pazar günü yağmur yağdı, bu yüzden bütün gün müzede kaldık. Gelecek yaz İstanbul'a yine gitmek istiyorum.`
  },
  {
    id: 'tr-is', level: 'A2', topic: 'Работа', title: 'İşte İlk Gün',
    body: `Deniz yeni işinin ilk gününde çok heyecanlıydı. Erken uyandı, çantasını iki kez kontrol etti ve evden bir saat önce çıktı.

Ofis büyük ve aydınlıktı. Müdür onu nazik bir şekilde karşıladı ve ona yeni meslektaşlarını tanıttı. Öğle yemeğinde herkes birlikte yemek yedi. Meslektaşları ona şirketi ve projeleri anlattı.

Akşam Deniz yorgundu ama mutluydu. Eve döndü ve annesini aradı. "İşimi çok sevdim," dedi. "Yarın yine erken kalkacağım."`
  },
  {
    id: 'tr-dil', level: 'B1', topic: 'Учёба', title: 'Yeni Bir Dil Öğrenmek',
    body: `Yeni bir dil öğrenmek zor ama çok eğlenceli bir yolculuktur. Başlangıçta her kelime yabancı gelir ve cümleler çok uzun görünür. Ama her gün biraz çalışırsanız, dil yavaş yavaş anlaşılır olur.

Türkçede kelimeler ekler ile değişir. Örneğin "ev" kelimesi "evler", "evim", "evlerimizde" olur. İlk başta bu sistem garip görünür, ama aslında çok mantıklıdır. Ekleri öğrendikten sonra yeni kelimeleri kolayca anlarsınız.

Uzmanlar, her gün kısa bir metin okumayı ve yeni kelimeleri tekrarlamayı öneriyor. Ayrıca Türkçe müzik dinlemek ve dizi izlemek de çok yardımcı olur. En önemlisi, hata yapmaktan korkmamak. Hatalar öğrenmenin doğal bir parçasıdır.`
  },
  {
    id: 'tr-yer-adlari', level: 'B1', topic: 'Культура', title: 'Yer Adları Ne Anlatır?', set: 'toponyms',
    note: 'Текст написан для Лингвы по общедоступным сведениям о топонимике Турции. Где происхождение названия спорно, это сказано прямо.',
    summary: 'Что значат названия мест в Турции. Одни понятны из турецкого: Эскишехир — «старый город», Памуккале — «хлопковая крепость», Кушадасы — «птичий остров», Кызылырмак — «красная река». Чёрное и Средиземное море по-турецки — «чёрное» и «белое»; по одной версии, древние тюрки обозначали цветом стороны света, но это не доказано. Многие города носят переделанные греческие и латинские имена: Измир (Смирна), Трабзон («стол»), Анталья (в честь царя Аттала), Эдирне (в честь Адриана). Стамбул, скорее всего, от греческого «в город». Происхождение названий Анкара и Каппадокия спорно.',
    explain: [
      ['yer adı', 'название места, топоним (мн. ч. yer adları)'],
      ['Eskişehir', '«старый город»: eski — старый, şehir — город'],
      ['Pamukkale', '«хлопковая крепость»: pamuk — хлопок, kale — крепость; белые известковые террасы издали похожи на хлопок'],
      ['Kuşadası', '«птичий остров»: kuş — птица, ada — остров'],
      ['Kızılırmak, Yeşilırmak', '«красная река» (по красноватому илу) и «зелёная река»'],
      ['Karadeniz, Akdeniz', '«Чёрное море» и «Белое море» — так по-турецки называют Средиземное. Версия, что у древних тюрок «чёрный» значил «север», а «белый» — «юг» или «запад», популярна, но не доказана'],
      ['İzmir', 'из греческого Σμύρνη (Смирна)'],
      ['Trabzon', 'из греческого Τραπεζούς, от τράπεζα — «стол»: древний город стоял на плоском холме'],
      ['Antalya', 'основана пергамским царём Атталом II и названа Атталия (Attaleia)'],
      ['Edirne', 'из Hadrianopolis — «город Адриана», римского императора'],
      ['İstanbul', 'по самой распространённой версии — из греческого εἰς τὴν Πόλιν, «в город»: Константинополь греки называли просто «Город»'],
      ['Ankara', 'античное Ἄγκυρα; по-гречески ἄγκυρα — «якорь», но название, вероятно, древнее греческого, его значение спорно'],
      ['Kapadokya', 'часто объясняют из древнеперсидского Katpatuka как «страна красивых лошадей», но это толкование спорно'],
      ['büyük ihtimalle', 'скорее всего, по всей вероятности'],
      ['tartışmalı', 'спорный']
    ],
    translation: `Многие названия мест в Турции очень древние. Одни из них турецкие, а другие пришли из языков народов, которые жили в Анатолии до турок.

Значение некоторых названий понятно каждому, кто знает турецкий. Эскишехир значит «старый город». Белые террасы Памуккале издали похожи на крепость из хлопка. Кушадасы значит «остров птиц». Кызылырмак получил своё название из-за красноватого цвета воды; а Ешилырмак — это «зелёная река».

Названия морей тоже интересны. Карадениз значит «чёрное море», Акдениз — «белое море». По мнению некоторых учёных, древние тюрки обозначали стороны света цветами: чёрный значил север, а белый — юг (или запад). Это объяснение распространено, но не точно.

Многие названия городов пришли из греческого. Старое название Измира было Смирна. Трабзон происходит от Трапезунт, что по-гречески значит «стол», потому что древний город стоял на плоском холме. Анталью основал пергамский царь Аттал II, и город назвали Атталия. Старое название Эдирне — Адрианополь, то есть «город Адриана».

Название Стамбул тоже, скорее всего, пришло из греческого: «эйс тин Полин», то есть «в город». Раньше люди коротко называли Константинополь «Городом».

А значение некоторых названий спорно. Старое название Анкары было Анкира; по-гречески это слово значит «якорь», но название, вероятно, ещё древнее. Говорят, что название Каппадокия значит по-персидски «страна красивых лошадей», но и это не точно.

Тот, кто смотрит на карту, на самом деле читает долгую историю Анатолии.`,
    body: `Türkiye'deki birçok yer adı çok eskidir. Bazıları Türkçedir, bazıları ise Türklerden önce Anadolu'da yaşayan halkların dillerinden gelir.

Bazı adların anlamı Türkçe bilen herkes için açıktır. Eskişehir "eski şehir" demektir. Pamukkale'nin beyaz terasları uzaktan pamuktan bir kaleye benzer. Kuşadası "kuşların adası" anlamına gelir. Kızılırmak bu adı suyunun kırmızımsı renginden almıştır; Yeşilırmak ise "yeşil nehir"dir.

Denizlerin adları da ilginçtir. Karadeniz "kara deniz", Akdeniz "ak deniz", yani "beyaz deniz" demektir. Bazı bilim insanlarına göre eski Türkler yönleri renklerle gösteriyordu: kara kuzey, ak ise güney (ya da batı) demekti. Bu açıklama yaygın ama kesin değil.

Birçok şehir adı Yunancadan gelir. İzmir'in eski adı Smyrna'ydı. Trabzon, Yunanca "masa" anlamına gelen Trapezus'tan gelir, çünkü eski şehir düz bir tepenin üstündeydi. Antalya'yı Bergama kralı II. Attalos kurdu ve şehre Attaleia adı verildi. Edirne'nin eski adı Hadrianopolis'tir, yani "Hadrianus'un şehri".

İstanbul adı da büyük ihtimalle Yunancadan gelir: "eis tin Polin", yani "şehre". Eskiden insanlar Konstantinopolis'e kısaca "Şehir" diyorlardı.

Bazı adların anlamı ise tartışmalıdır. Ankara'nın eski adı Ankyra'ydı; bu kelime Yunancada "çapa" demektir, ama ad muhtemelen daha eskidir. Kapadokya adının Farsça "güzel atlar ülkesi" anlamına geldiği söylenir, fakat bu da kesin değildir.

Haritaya bakan biri aslında Anadolu'nun uzun tarihini okur.`
  }
];

// Песни и стихи (полка «Песни и стихи»), сказки и легенды (полка «Сказки и истории») — после основных текстов
export const TEXTS = [...BASE, ...SONGS, ...TALES];
