// Тексты на турецком для чтения с переводом по клику. Все тексты написаны специально для Лингвы.
import { TEXTS as SONGS } from './songs.js';

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
  }
];

// Песни и стихи (полка «Песни и стихи») — после основных текстов
export const TEXTS = [...BASE, ...SONGS];
