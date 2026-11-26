// Грамматика турецкого: теория по-русски + упражнения. Тексты написаны для Лингвы.
// Тип упражнения: choice (выбрать вариант) или input (вписать ответ; допустимы варианты через "/").
export const COURSES = [
  {
    id: 'tr-basics', title: 'Основы: гармония гласных и «быть»', level: 'A1',
    lessons: [
      {
        id: 'tr-harmony', title: 'Гармония гласных и -lar / -ler',
        theory: `<p>Главное правило турецкого — <b>гармония гласных</b>: гласная в аффиксе подстраивается под последнюю гласную основы.</p>
<p>Гласные делятся на <b>задние</b> (a, ı, o, u) и <b>передние</b> (e, i, ö, ü). Двухвариантные аффиксы (тип <b>a/e</b>) выбирают <b>a</b> после задних и <b>e</b> после передних.</p>
<p>Множественное число — <b>-lar / -ler</b>: <i>kitap → kitap<b>lar</b>, ev → ev<b>ler</b>, okul → okul<b>lar</b>, göz → göz<b>ler</b></i>.</p>
<p>После числительных множественное число не ставится: <i>iki kitap</i> — «две книги».</p>`,
        exercises: [
          { type: 'choice', q: 'kitap → kitap___', options: ['lar', 'ler'], a: 'lar' },
          { type: 'choice', q: 'ev → ev___', options: ['lar', 'ler'], a: 'ler' },
          { type: 'choice', q: 'göz → göz___', options: ['lar', 'ler'], a: 'ler' },
          { type: 'choice', q: 'okul → okul___', options: ['lar', 'ler'], a: 'lar' },
          { type: 'input', q: 'çiçek (цветы) → ___', a: 'çiçekler' },
          { type: 'choice', q: 'Как сказать «три яблока»?', options: ['üç elma', 'üç elmalar', 'üç elmaler'], a: 'üç elma' }
        ]
      },
      {
        id: 'tr-to-be', title: 'Я — студент: аффиксы сказуемости',
        theory: `<p>Глагола «быть» в настоящем времени нет — вместо него к слову присоединяется <b>личный аффикс</b> с четырёхвариантной гласной (ı, i, u, ü):</p>
<p><b>ben</b> -ım/-im/-um/-üm · <b>sen</b> -sın/-sin/-sun/-sün · <b>o</b> — ничего · <b>biz</b> -ız/-iz/-uz/-üz · <b>siz</b> -sınız/-siniz… · <b>onlar</b> (-lar/-ler)</p>
<p><i>Ben öğretmen<b>im</b>. Sen yorgun<b>sun</b>. O doktor. Biz mutlu<b>yuz</b>.</i> После гласной появляется соединительная <b>y</b>: <i>hasta<b>yım</b>, mutlu<b>yuz</b></i>.</p>
<p>Гласная аффикса: после a, ı → <b>ı</b>; после e, i → <b>i</b>; после o, u → <b>u</b>; после ö, ü → <b>ü</b>. Отрицание — словом <b>değil</b>: <i>Ben hasta <b>değilim</b>.</i></p>`,
        exercises: [
          { type: 'choice', q: 'Ben öğretmen___.', options: ['im', 'ım', 'um'], a: 'im' },
          { type: 'choice', q: 'Sen yorgun___.', options: ['sin', 'sun', 'sın'], a: 'sun' },
          { type: 'choice', q: 'Biz mutlu___.', options: ['yuz', 'uz', 'yız'], a: 'yuz' },
          { type: 'choice', q: 'Siz öğrenci___.', options: ['sınız', 'siniz', 'sunuz'], a: 'siniz' },
          { type: 'input', q: 'Ben hasta___. (я болен)', a: 'yım' },
          { type: 'choice', q: 'Я не голоден: Ben aç ___.', options: ['değilim', 'yokum', 'değil'], a: 'değilim' }
        ]
      },
      {
        id: 'tr-var-yok', title: 'Var и yok: «у меня есть»',
        theory: `<p><b>var</b> — «есть, имеется», <b>yok</b> — «нет, не имеется»: <i>Masada bir kitap <b>var</b>. Evde süt <b>yok</b>.</i></p>
<p>«У меня есть» строится через принадлежность: предмет получает <b>аффикс владельца</b>, и добавляется var/yok.</p>
<p>Аффиксы принадлежности: <b>(ı)m</b> — мой, <b>(ı)n</b> — твой, <b>(s)ı</b> — его/её, <b>(ı)mız</b> — наш, <b>(ı)nız</b> — ваш, <b>ları</b> — их. <i>kedi<b>m</b>, kitab<b>ım</b>, ev<b>i</b>, araba<b>sı</b></i>.</p>
<p><i>Benim bir kedi<b>m var</b>.</i> — У меня есть кошка. <i>Onun araba<b>sı yok</b>.</i> — У него нет машины. Местоимение (benim, senin…) можно опустить.</p>`,
        exercises: [
          { type: 'choice', q: 'Benim bir kardeş___ var.', options: ['im', 'in', 'i'], a: 'im' },
          { type: 'choice', q: 'Senin araba___ var mı?', options: ['n', 'm', 'sı'], a: 'n' },
          { type: 'choice', q: 'Evde ekmek ___. (нет хлеба)', options: ['yok', 'değil', 'var'], a: 'yok' },
          { type: 'choice', q: 'Onun köpeğ___ var.', options: ['i', 'si', 'im'], a: 'i' },
          { type: 'input', q: 'У нас есть сад: Bizim bahçe___ var.', a: 'miz' },
          { type: 'choice', q: 'Masada bir bardak ___. (стоит стакан)', options: ['var', 'yok', 'değil'], a: 'var' }
        ]
      }
    ]
  },
  {
    id: 'tr-cases', title: 'Падежи: где, куда, откуда', level: 'A1',
    lessons: [
      {
        id: 'tr-locative', title: 'Где? Местный падеж -da / -de',
        theory: `<p>«Где?» — <b>nerede?</b> Ответ получает аффикс <b>-da / -de</b>: <i>ev<b>de</b> — дома, okul<b>da</b> — в школе, masa<b>da</b> — на столе</i>.</p>
<p>После глухих согласных (<b>ç, f, h, k, p, s, ş, t</b>, запомните фразу «<i>Fıstıkçı Şahap</i>») d превращается в <b>t</b>: <i>sokak<b>ta</b>, otobüs<b>te</b>, uçak<b>ta</b></i>.</p>
<p>У имён собственных аффикс отделяется апострофом: <i>İstanbul<b>'da</b>, Ankara<b>'da</b></i>.</p>`,
        exercises: [
          { type: 'choice', q: 'Kedi bahçe___.', options: ['de', 'da', 'te'], a: 'de' },
          { type: 'choice', q: 'Öğrenciler okul___.', options: ['da', 'de', 'ta'], a: 'da' },
          { type: 'choice', q: 'Biz sokak___ yürüyoruz.', options: ['ta', 'da', 'te'], a: 'ta' },
          { type: 'choice', q: 'Otobüs___ çok insan var.', options: ['te', 'de', 'ta'], a: 'te' },
          { type: 'input', q: 'Anahtar masa___. (на столе)', a: 'da' },
          { type: 'choice', q: 'Ben İzmir___ yaşıyorum.', options: ["'de", "'da", 'de'], a: "'de" }
        ]
      },
      {
        id: 'tr-dative-ablative', title: 'Куда и откуда: -a / -e и -dan / -den',
        theory: `<p>«Куда?» — <b>nereye?</b> Направительный падеж <b>-a / -e</b> (после гласной <b>-ya / -ye</b>): <i>ev<b>e</b>, okul<b>a</b>, Ankara<b>'ya</b></i>.</p>
<p>Конечные <b>p, ç, t, k</b> многосложных слов перед гласной озвончаются: <i>kitap → kitab<b>a</b>, sokak → sokağ<b>a</b></i>.</p>
<p>«Откуда?» — <b>nereden?</b> Исходный падеж <b>-dan / -den</b>, после глухих — <b>-tan / -ten</b>: <i>ev<b>den</b>, okul<b>dan</b>, uçak<b>tan</b></i>.</p>
<p><i>Okul<b>dan</b> ev<b>e</b> yürüyorum.</i> — Я иду из школы домой.</p>`,
        exercises: [
          { type: 'choice', q: 'Yarın okul___ gidiyorum.', options: ['a', 'e', 'ya'], a: 'a' },
          { type: 'choice', q: 'Akşam ev___ dönüyoruz.', options: ['e', 'a', 'ye'], a: 'e' },
          { type: 'choice', q: 'Ankara___ gidiyorlar.', options: ["'ya", "'a", "'ye"], a: "'ya" },
          { type: 'choice', q: 'İş___ saat altıda çıkıyorum.', options: ['ten', 'den', 'tan'], a: 'ten' },
          { type: 'input', q: 'Ben Rusya___ geliyorum. (из России)', a: "'dan/dan" },
          { type: 'choice', q: 'Uçak___ iniyoruz.', options: ['tan', 'dan', 'ten'], a: 'tan' }
        ]
      },
      {
        id: 'tr-accusative', title: 'Кого? что? Винительный -ı / -i / -u / -ü',
        theory: `<p>Если прямое дополнение <b>определённое</b> (конкретное, уже известное), оно получает аффикс <b>-ı / -i / -u / -ü</b>, после гласной — <b>-yı / -yi / -yu / -yü</b>.</p>
<p><i>Bir kitap okuyorum.</i> — Я читаю (какую-то) книгу. <i>Kitab<b>ı</b> okuyorum.</i> — Я читаю (эту) книгу.</p>
<p>Примеры: <i>ev<b>i</b>, okul<b>u</b>, göz<b>ü</b>, araba<b>yı</b>, kapı<b>yı</b></i>. Озвончение работает и здесь: <i>kitap → kitab<b>ı</b>, çocuk → çocuğ<b>u</b></i>.</p>`,
        exercises: [
          { type: 'choice', q: 'Kapı___ açar mısın?', options: ['yı', 'ı', 'yi'], a: 'yı' },
          { type: 'choice', q: 'Bu film___ çok seviyorum.', options: ['i', 'ı', 'yi'], a: 'i' },
          { type: 'choice', q: 'Okul___ görüyor musun?', options: ['u', 'ü', 'yu'], a: 'u' },
          { type: 'choice', q: 'Kitab___ masaya koydum.', options: ['ı', 'i', 'u'], a: 'ı' },
          { type: 'input', q: 'Araba___ yıkıyorum. (эту машину)', a: 'yı' },
          { type: 'choice', q: 'Я пью (какой-то) чай:', options: ['Çay içiyorum.', 'Çayı içiyorum.', 'Çaya içiyorum.'], a: 'Çay içiyorum.' }
        ]
      }
    ]
  },
  {
    id: 'tr-verbs', title: 'Глагол: настоящее, прошлое, будущее', level: 'A2',
    lessons: [
      {
        id: 'tr-present', title: 'Настоящее время -iyor',
        theory: `<p>Настоящее время (то, что происходит сейчас или в последнее время): основа глагола + <b>-ıyor / -iyor / -uyor / -üyor</b> + личное окончание.</p>
<p>Основа — инфинитив без <b>-mak / -mek</b>: <i>gel-mek → gel<b>iyor</b>um, oku-mak → oku<b>yor</b>um</i>.</p>
<p>Личные окончания: <b>-um</b> (ben), <b>-sun</b> (sen), — (o), <b>-uz</b> (biz), <b>-sunuz</b> (siz), <b>-lar</b> (onlar): <i>geliyor<b>um</b>, geliyor<b>sun</b>, geliyor, geliyor<b>uz</b></i>.</p>
<p>Конечная <b>a/e</b> основы превращается в ı/i/u/ü: <i>başla → başl<b>ı</b>yor, bekle → bekl<b>i</b>yor</i>. Особые: <i>git → gidiyor, et → ediyor</i>.</p>`,
        exercises: [
          { type: 'choice', q: 'Ben şimdi kitap oku___.', options: ['yorum', 'iyorum', 'uyorum'], a: 'yorum' },
          { type: 'choice', q: 'Sen nereye gid___? (gitmek)', options: ['iyorsun', 'ıyorsun', 'uyorsun'], a: 'iyorsun' },
          { type: 'choice', q: 'Biz Türkçe öğren___.', options: ['iyoruz', 'ıyoruz', 'üyoruz'], a: 'iyoruz' },
          { type: 'input', q: 'O çay ___. (içmek — пьёт)', a: 'içiyor' },
          { type: 'choice', q: 'Film saat sekizde ___.', options: ['başlıyor', 'başlayor', 'başlayıyor'], a: 'başlıyor' },
          { type: 'input', q: 'Ben seni ___. (anlamak — понимаю)', a: 'anlıyorum' }
        ]
      },
      {
        id: 'tr-past', title: 'Прошедшее время -dı',
        theory: `<p>Свершившееся действие в прошлом: основа + <b>-dı / -di / -du / -dü</b>, после глухих — <b>-tı / -ti / -tu / -tü</b>.</p>
<p>Лицо: <b>-m</b> (ben), <b>-n</b> (sen), — (o), <b>-k</b> (biz), <b>-nız</b> (siz), <b>-lar</b> (onlar): <i>gel<b>dim</b>, gel<b>din</b>, gel<b>di</b>, gel<b>dik</b>, gel<b>diniz</b>, gel<b>diler</b></i>.</p>
<p>После глухих согласных: <i>git → git<b>ti</b>m, iç → iç<b>ti</b>k, konuş → konuş<b>tu</b>k</i>.</p>
<p>Подсказки: <i>dün, geçen hafta, geçen yıl</i>.</p>`,
        exercises: [
          { type: 'choice', q: 'Dün sinemaya git___.', options: ['tim', 'dim', 'tum'], a: 'tim' },
          { type: 'choice', q: 'Geçen yıl İstanbul\'da yaşa___.', options: ['dık', 'dik', 'tık'], a: 'dık' },
          { type: 'choice', q: 'Sen kahvaltı yap___ mı?', options: ['tın', 'dın', 'tin'], a: 'tın' },
          { type: 'input', q: 'Biz çok güzel bir film ___. (izlemek — посмотрели)', a: 'izledik' },
          { type: 'choice', q: 'Onlar eve geç gel___.', options: ['diler', 'dılar', 'tiler'], a: 'diler' },
          { type: 'input', q: 'Ben anahtarı ___. (unutmak — забыл)', a: 'unuttum' }
        ]
      },
      {
        id: 'tr-future', title: 'Будущее время -ecek',
        theory: `<p>Будущее: основа + <b>-acak / -ecek</b> (после гласной <b>-yacak / -yecek</b>) + личное окончание.</p>
<p><i>gel<b>eceğim</b>, gel<b>eceksin</b>, gel<b>ecek</b>, gel<b>eceğiz</b>, gel<b>eceksiniz</b>, gel<b>ecekler</b></i>. Перед гласной окончания k → <b>ğ</b>: <i>gelecek + im → geleceğim</i>.</p>
<p>После гласной: <i>oku → oku<b>yacağım</b>, bekle → bekle<b>yeceğim</b></i>. Особые: <i>git → gideceğim, et → edeceğim</i>.</p>`,
        exercises: [
          { type: 'choice', q: 'Yarın seni ara___.', options: ['yacağım', 'acağım', 'yeceğim'], a: 'yacağım' },
          { type: 'choice', q: 'Gelecek yaz Türkiye\'ye gid___.', options: ['eceğiz', 'acağız', 'ecekiz'], a: 'eceğiz' },
          { type: 'choice', q: 'Bu akşam yağmur yağ___.', options: ['acak', 'ecek', 'yacak'], a: 'acak' },
          { type: 'input', q: 'Ben bu kitabı ___. (okumak — прочитаю)', a: 'okuyacağım' },
          { type: 'choice', q: 'Siz ne zaman gel___?', options: ['eceksiniz', 'acaksınız', 'eceğiniz'], a: 'eceksiniz' },
          { type: 'input', q: 'Onlar bize yardım ___. (etmek — помогут)', a: 'edecekler' }
        ]
      },
      {
        id: 'tr-negative-question', title: 'Отрицание -ma / -me и вопрос mi',
        theory: `<p>Отрицание глагола — аффикс <b>-ma / -me</b> сразу после основы: <i>gel<b>me</b>di — не пришёл, iç<b>me</b>yeceğim — не буду пить</i>. С -iyor: <i>gel<b>mi</b>yorum, anla<b>mı</b>yorum</i>.</p>
<p>Общий вопрос — частица <b>mı / mi / mu / mü</b>, пишется отдельно, но подчиняется гармонии: <i>Çay <b>mı</b>? Geldin <b>mi</b>? Yorgun <b>musun</b>?</i></p>
<p>С -iyor личное окончание переходит на частицу: <i>Geliyor <b>musun</b>? Anlıyor <b>musunuz</b>?</i></p>`,
        exercises: [
          { type: 'choice', q: 'Ben et ye___. (не ем)', options: ['miyorum', 'mıyorum', 'meyorum'], a: 'miyorum' },
          { type: 'choice', q: 'Bu kelimeyi anla___. (не понимаю)', options: ['mıyorum', 'miyorum', 'mayorum'], a: 'mıyorum' },
          { type: 'choice', q: 'Kahve ister ___?', options: ['misin', 'musun', 'mısın'], a: 'misin' },
          { type: 'choice', q: 'Yorgun ___?', options: ['musun', 'misin', 'mısın'], a: 'musun' },
          { type: 'input', q: 'Dün o gel___. (не пришёл)', a: 'medi' },
          { type: 'choice', q: 'Türkçe konuşuyor ___?', options: ['musunuz', 'misiniz', 'mısınız'], a: 'musunuz' }
        ]
      }
    ]
  }
];

export const ALL_LESSONS = COURSES.flatMap(c => c.lessons.map(l => ({ ...l, course: c.id })));
