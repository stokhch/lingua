// Короткие турецкие фразы с переводом для тренировок «Конструктор фраз», «Диктант» и «Слово в контексте». Написаны для Лингвы.
const RAW = `Merhaba!|Привет!
Günaydın!|Доброе утро!
İyi akşamlar!|Добрый вечер!
Hoş geldiniz!|Добро пожаловать!
Memnun oldum.|Приятно познакомиться.
Özür dilerim.|Извините.
Anlamıyorum.|Я не понимаю.
Tekrar eder misiniz?|Не повторите?
Türkçe bilmiyorum.|Я не знаю турецкий.
Biraz Türkçe konuşuyorum.|Я немного говорю по-турецки.
Bu ne?|Что это?
Bu kim?|Кто это?
Tuvalet nerede?|Где туалет?
Su istiyorum.|Я хочу воды.
Afiyet olsun!|Приятного аппетита!
Kaç yaşındasın?|Сколько тебе лет?
Yirmi beş yaşındayım.|Мне двадцать пять лет.
Ben öğrenciyim.|Я студент.
Her gün saat yedide kalkarım.|Я встаю в семь каждый день.
Kız kardeşim köpekleri çok seviyor.|Моя сестра очень любит собак.
Otobüs durağı nerede?|Где автобусная остановка?
Bana yardım eder misiniz?|Не могли бы вы мне помочь?
Küçük bir lokantada akşam yemeği yedik.|Мы поужинали в маленьком ресторане.
Hava sıcak ve güneşli.|Погода тёплая и солнечная.
Bir bardak çay istiyorum.|Я хочу стакан чая.
Bu bilet ne kadar?|Сколько стоит этот билет?
Annem bir hastanede çalışıyor.|Моя мама работает в больнице.
Bu kelimeyi anlamıyorum.|Я не понимаю это слово.
Eski bir sarayı ziyaret ettik.|Мы посетили старый дворец.
Tren saat kaçta kalkıyor?|Во сколько отходит поезд?
Ağabeyim pazar günü futbol oynar.|Мой старший брат играет в футбол по воскресеньям.
Her gün Türkçe öğreniyorum.|Я каждый день учу турецкий.
Müze istasyonun yakınında.|Музей рядом с вокзалом.
Adın ne?|Как тебя зовут?
Benim adım Elif.|Меня зовут Элиф.
Nerelisin?|Откуда ты?
Rusyalıyım.|Я из России.
Nasılsın?|Как дела?
İyiyim, teşekkür ederim.|Хорошо, спасибо.
Anahtarlarımı evde unuttum.|Я забыл ключи дома.
Lütfen daha yavaş konuşun.|Пожалуйста, говорите медленнее.
Bugün yağmur yağacak.|Сегодня пойдёт дождь.
Yarın seni arayacağım.|Я позвоню тебе завтра.
Daha çok su içmelisin.|Тебе нужно пить больше воды.
Çocuklar bahçede oynuyor.|Дети играют в саду.
Dün haberleri izledin mi?|Ты вчера смотрел новости?
Çantamı bulamıyorum.|Я не могу найти свою сумку.
İşten sonra buluşalım.|Давай встретимся после работы.
Genellikle ofise yürüyerek giderim.|Обычно я хожу в офис пешком.
Şimdi ne yapıyorsun?|Что ты сейчас делаешь?
O et yemiyor.|Он не ест мясо.
Gelecek yaz Türkiye'ye gideceğiz.|Следующим летом мы поедем в Турцию.
Pencereyi açar mısın?|Откроешь окно?
Hesap lütfen.|Счёт, пожалуйста.
Deniz sabah çok sakindi.|Утром море было очень спокойным.
Kahvaltıda simit ve peynir yeriz.|На завтрак мы едим симит и сыр.
Saat kaç?|Который час?
Görüşürüz!|Увидимся!`;

export const PHRASES = RAW.split('\n').map(l => { const [w, ru] = l.split('|'); return { en: w, ru }; });
