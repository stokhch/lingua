// Встроенный турецко-русский словарь проекта (составлен вручную для Лингвы).
// Формат блоков: "слово|перевод" — по строке на слово. Глаголы даны в инфинитиве (-mak / -mek).
// Ключ блока = тематический набор.
import { MORE_RAW, MORE_INFO } from './more-sets.js';
import { SONG_SETS, WORDS as SONG_WORDS } from './songs.js';
import { SET as TALE_SET, WORDS as TALE_WORDS, FORMS as TALE_FORMS } from './tales.js';

const RAW = {
start: `merhaba|привет, здравствуйте
selam|привет (разг.)
günaydın|доброе утро
iyi günler|добрый день
iyi akşamlar|добрый вечер
iyi geceler|спокойной ночи
nasılsın|как дела? (ты)
nasılsınız|как дела? (вы)
iyiyim|у меня всё хорошо
teşekkürler|спасибо
teşekkür ederim|спасибо (благодарю)
sağ ol|спасибо (разг.)
rica ederim|пожалуйста (в ответ на спасибо)
lütfen|пожалуйста (просьба)
buyurun|пожалуйста (вот, проходите, слушаю вас)
evet|да
hayır|нет
tamam|хорошо, ладно
özür dilerim|извините, прошу прощения
pardon|простите
affedersiniz|извините (обращение к незнакомому)
hoş geldiniz|добро пожаловать
hoş bulduk|рады быть здесь (ответ на «hoş geldiniz»)
memnun oldum|приятно познакомиться
görüşürüz|увидимся
hoşça kal|до свидания (говорит уходящий)
güle güle|счастливо (говорит остающийся)
afiyet olsun|приятного аппетита
kolay gelsin|бог в помощь (тому, кто работает)
geçmiş olsun|выздоравливай, сочувствую
anlamıyorum|я не понимаю
bilmiyorum|я не знаю
tekrar|снова, ещё раз
tuvalet|туалет
ne|что
kim|кто
nerede|где
bu|этот, это`,

numbers: `sıfır|ноль
bir|один; какой-то
iki|два
üç|три
dört|четыре
beş|пять
altı|шесть
yedi|семь; съел (от yemek)
sekiz|восемь
dokuz|девять
on|десять
on bir|одиннадцать
on beş|пятнадцать
yirmi|двадцать
yirmi beş|двадцать пять
otuz|тридцать
kırk|сорок
elli|пятьдесят
altmış|шестьдесят
yetmiş|семьдесят
seksen|восемьдесят
doksan|девяносто
yüz|сто; лицо
bin|тысяча
milyon|миллион
birinci|первый
ikinci|второй
üçüncü|третий
yarım|половина
çeyrek|четверть
lira|лира (деньги)
kaç|сколько (штук)
ne kadar|сколько (о цене, количестве)
toplam|итого, всего`,

core: `ben|я
sen|ты
o|он, она, оно; тот
biz|мы
siz|вы
onlar|они
bu|этот, это
şu|вот этот, тот
burası|здесь, это место
orası|там, то место
ne|что
kim|кто
nerede|где
nereye|куда
nereden|откуда
ne zaman|когда
neden|почему
niçin|зачем, почему
nasıl|как
kaç|сколько (штук)
ne kadar|сколько (о цене, количестве)
hangi|какой, который
ve|и
veya|или
ama|но
fakat|однако, но
çünkü|потому что
eğer|если
gibi|как, подобно
için|для, ради
ile|с, вместе с
kadar|до, столько же, как
sonra|после, потом
önce|до, раньше
şimdi|сейчас
bugün|сегодня
yarın|завтра
dün|вчера
evet|да
hayır|нет
var|есть, имеется
yok|нет, не имеется
değil|не (отрицание при сказуемом)
çok|очень, много
az|мало
biraz|немного
her|каждый
hep|всегда, всё время
hiç|никогда, совсем не
de|тоже, и
da|тоже, и
mi|ли (вопросительная частица)
mı|ли (вопросительная частица)
mu|ли (вопросительная частица)
mü|ли (вопросительная частица)
bir|один; какой-то
iki|два
üç|три
dört|четыре
beş|пять
altı|шесть
yedi|семь; съел (от yemek)
sekiz|восемь
dokuz|девять
on|десять
yirmi|двадцать
yüz|сто; лицо
bin|тысяча
merhaba|привет, здравствуйте
günaydın|доброе утро
teşekkürler|спасибо
teşekkür ederim|спасибо (благодарю)
lütfen|пожалуйста (просьба)
rica ederim|пожалуйста (в ответ на спасибо)
tamam|хорошо, ладно
güle güle|счастливо (говорит остающийся)
hoşça kal|до свидания (говорит уходящий)
iyi|хороший, хорошо
kendi|свой, сам
herkes|все, каждый
bazen|иногда
genellikle|обычно
artık|уже, больше (не)
hâlâ|всё ещё
daha|ещё, более
en|самый
sadece|только
birlikte|вместе
yine|снова, опять
böyle|так, такой
şöyle|вот так
belki|может быть
tabii|конечно
hemen|сразу, немедленно
yavaş yavaş|постепенно, потихоньку
ilk|первый
son|конец; последний
bütün|весь, целый
kez|раз
örneğin|например
başka|другой, ещё
şey|вещь, что-то
aslında|на самом деле
ayrıca|кроме того
yan|бок, сторона
yanında|рядом с
bu yüzden|поэтому
türk|турок; турецкий
türkçe|турецкий язык
rus|русский
rusça|русский язык
rusya|Россия
türkiye|Турция`,

verbs: `olmak|быть, становиться
yapmak|делать
etmek|делать (вспомогательный глагол)
gitmek|идти, ехать
gelmek|приходить, приезжать
gelişmek|развиваться
dönmek|возвращаться, поворачивать
almak|брать, покупать
vermek|давать
satın almak|покупать
görmek|видеть
bakmak|смотреть
izlemek|смотреть (фильм), наблюдать
duymak|слышать
dinlemek|слушать
söylemek|говорить, сказать
konuşmak|разговаривать
demek|сказать, значить
sormak|спрашивать
cevap vermek|отвечать
bilmek|знать
anlamak|понимать
düşünmek|думать
öğrenmek|учить, узнавать
öğretmek|учить кого-то, преподавать
okumak|читать, учиться
yazmak|писать
çalışmak|работать, заниматься
yemek|есть; еда
içmek|пить
uyumak|спать
uyanmak|просыпаться
kalkmak|вставать
oturmak|сидеть, жить (где-то)
yaşamak|жить
sevmek|любить
istemek|хотеть
beklemek|ждать
başlamak|начинать(ся)
bitmek|заканчиваться
bitirmek|заканчивать
açmak|открывать, включать
kapatmak|закрывать, выключать
koymak|класть, ставить
bulmak|находить
kaybetmek|терять
aramak|искать, звонить
yürümek|идти пешком, гулять
koşmak|бежать
binmek|садиться (в транспорт)
inmek|спускаться, выходить (из транспорта)
girmek|входить
çıkmak|выходить, подниматься
kalmak|оставаться
getirmek|приносить
götürmek|уносить, отвозить
göstermek|показывать
yardım etmek|помогать
hazırlamak|готовить
pişirmek|варить, готовить (еду)
yıkamak|мыть
giymek|надевать
ödemek|платить
sevinmek|радоваться
gülmek|смеяться
ağlamak|плакать
hatırlamak|помнить, вспоминать
unutmak|забывать
denemek|пробовать
sürmek|длиться; вести (машину)
tanışmak|знакомиться
oynamak|играть
gezmek|гулять, путешествовать
ziyaret etmek|посещать
kullanmak|использовать
anlatmak|рассказывать
tekrarlamak|повторять
sevilmek|быть любимым
değişmek|меняться
kazanmak|выигрывать, зарабатывать
taşınmak|переезжать
dinlenmek|отдыхать
fırçalamak|чистить щёткой
kaybolmak|теряться, заблудиться
uçmak|летать
yağmak|идти (о дожде, снеге)
kontrol etmek|проверять
karşılamak|встречать
tanıtmak|представлять, знакомить
önermek|предлагать, советовать
buluşmak|встречаться
görüşmek|видеться, встречаться
görünmek|казаться, виднеться`,

family: `aile|семья
anne|мама
baba|папа
anneanne|бабушка (по маме)
babaanne|бабушка (по папе)
dede|дедушка
kardeş|брат или сестра
abla|старшая сестра
ağabey|старший брат
abi|старший брат (разг.)
kız kardeş|сестра
erkek kardeş|брат
oğul|сын
kız|девочка, дочь
çocuk|ребёнок
bebek|младенец
eş|супруг(а)
koca|муж
karı|жена
amca|дядя (по отцу)
dayı|дядя (по матери)
teyze|тётя (по матери)
hala|тётя (по отцу)
kuzen|двоюродный брат, сестра
arkadaş|друг, подруга
komşu|сосед
insan|человек
adam|мужчина
kadın|женщина
erkek|мужчина, мальчик
genç|молодой; молодёжь
yaşlı|пожилой
misafir|гость
ad|имя
isim|имя
soyadı|фамилия
yaş|возраст
düğün|свадьба`,

food: `yemek|есть; еда
ekmek|хлеб
su|вода
çay|чай
kahve|кофе
süt|молоко
peynir|сыр
yumurta|яйцо
zeytin|оливка
bal|мёд
tereyağı|сливочное масло
reçel|варенье
domates|помидор
salatalık|огурец
patates|картофель
soğan|лук
elma|яблоко
portakal|апельсин
muz|банан
karpuz|арбуз
et|мясо
tavuk|курица
balık|рыба
pilav|плов, рис (блюдо)
çorba|суп
salata|салат
tatlı|сладкий; десерт
şeker|сахар; конфета
tuz|соль
meyve|фрукт
sebze|овощ
kahvaltı|завтрак
öğle yemeği|обед
akşam yemeği|ужин
lokanta|столовая, ресторан
restoran|ресторан
garson|официант
hesap|счёт
menü|меню
bardak|стакан
fincan|чашка
tabak|тарелка
çatal|вилка
kaşık|ложка
bıçak|нож
lezzetli|вкусный
aç|голодный
tok|сытый
simit|бублик с кунжутом
börek|слоёный пирог
ayran|айран
şekerli|с сахаром
şekersiz|без сахара
kafe|кафе
içecek|напиток`,

travel: `yolculuk|путешествие, поездка
seyahat|путешествие
tatil|отпуск, каникулы
otel|гостиница
oda|комната, номер
anahtar|ключ
bilet|билет
pasaport|паспорт
bavul|чемодан
çanta|сумка
havalimanı|аэропорт
uçak|самолёт
tren|поезд
otobüs|автобус
araba|машина
taksi|такси
vapur|паром, пароход
gemi|корабль
istasyon|станция, вокзал
durak|остановка
yol|дорога, путь
sokak|улица
cadde|проспект, улица
şehir|город
köy|деревня
ülke|страна
harita|карта
müze|музей
cami|мечеть
saray|дворец
çarşı|рынок, торговая улица
pazar|рынок, базар; воскресенье
dükkân|магазин, лавка
para|деньги
ucuz|дешёвый
pahalı|дорогой
sol|левый, налево
sağ|правый, направо
düz|прямо, ровный
uzak|далеко, далёкий
yakın|близко, близкий
turist|турист
rehber|гид
manzara|вид, пейзаж
fotoğraf|фотография`,

home: `ev|дом
daire|квартира
mutfak|кухня
banyo|ванная
yatak odası|спальня
salon|гостиная
kapı|дверь
pencere|окно
duvar|стена
masa|стол
sandalye|стул
koltuk|кресло
yatak|кровать
dolap|шкаф
buzdolabı|холодильник
lamba|лампа
halı|ковёр
balkon|балкон
bahçe|сад, двор
merdiven|лестница
kat|этаж
eşya|вещь, вещи
kitap|книга
defter|тетрадь
kalem|ручка, карандаш
telefon|телефон
bilgisayar|компьютер
televizyon|телевизор
saat|часы; час
gömlek|рубашка
pantolon|брюки
elbise|платье
ayakkabı|обувь
ceket|куртка, пиджак
şapka|шапка, шляпа
kedi|кошка
köpek|собака`,

time: `zaman|время
gün|день
gece|ночь
sabah|утро, утром
öğle|полдень
öğleden sonra|после обеда, днём
akşam|вечер, вечером
hafta|неделя
ay|месяц; луна
yıl|год
sene|год
dakika|минута
saniye|секунда
erken|рано
geç|поздно
pazartesi|понедельник
salı|вторник
çarşamba|среда
perşembe|четверг
cuma|пятница
cumartesi|суббота
hafta sonu|выходные
ilkbahar|весна
yaz|лето
sonbahar|осень
kış|зима
ocak|январь
şubat|февраль
mart|март
nisan|апрель
mayıs|май
haziran|июнь
temmuz|июль
ağustos|август
eylül|сентябрь
ekim|октябрь
kasım|ноябрь
aralık|декабрь
her gün|каждый день
geçen|прошлый
gelecek|будущий; будущее`,

adjectives: `büyük|большой
küçük|маленький
uzun|длинный, высокий
kısa|короткий
yeni|новый
eski|старый (о вещах)
güzel|красивый, прекрасный
çirkin|некрасивый
kötü|плохой
sıcak|горячий, жаркий
soğuk|холодный
kolay|лёгкий, простой
zor|трудный
hızlı|быстрый
yavaş|медленный
temiz|чистый
kirli|грязный
ağır|тяжёлый
hafif|лёгкий (по весу)
yüksek|высокий
dolu|полный
boş|пустой
açık|открытый; светлый
kapalı|закрытый
önemli|важный
ilginç|интересный
sıkıcı|скучный
sakin|спокойный, тихий
kalabalık|людный; толпа
dar|узкий
geniş|широкий
eğlenceli|весёлый, увлекательный
beyaz|белый
siyah|чёрный
kırmızı|красный
mavi|синий, голубой
yeşil|зелёный
sarı|жёлтый
renkli|цветной, яркий
taze|свежий
farklı|разный, другой
aynı|одинаковый, тот же
doğru|правильный, верный
yanlış|неправильный
güneşli|солнечный
aydınlık|светлый
anlaşılır|понятный
garip|странный
mantıklı|логичный
doğal|естественный
yabancı|чужой, иностранный; иностранец
yardımcı|полезный; помощник`,

emotions: `mutlu|счастливый
üzgün|грустный
yorgun|усталый
hasta|больной
kızgın|сердитый
heyecanlı|взволнованный
sinirli|нервный, раздражённый
korkmak|бояться
merak etmek|интересоваться, беспокоиться
şaşırmak|удивляться
sevgi|любовь
aşk|любовь (страсть)
mutluluk|счастье
neşeli|весёлый
utangaç|застенчивый
cesur|смелый
çalışkan|трудолюбивый
tembel|ленивый
nazik|вежливый
kibar|воспитанный, учтивый
akıllı|умный
komik|смешной
sabırlı|терпеливый
memnun|довольный
endişeli|встревоженный
rahat|спокойный, удобный
özlemek|скучать по кому-то
hoş|приятный
güvenmek|доверять
umut|надежда`,

body: `vücut|тело
baş|голова; начало
kafa|голова (разг.)
saç|волосы
göz|глаз
kulak|ухо
burun|нос
ağız|рот
diş|зуб
el|рука (кисть)
kol|рука (от плеча)
parmak|палец
bacak|нога
ayak|ступня, нога
kalp|сердце
mide|желудок
sırt|спина
boğaz|горло
ateş|температура, жар; огонь
ağrı|боль
ilaç|лекарство
doktor|врач
hastane|больница
eczane|аптека
sağlık|здоровье
sağlıklı|здоровый
spor|спорт`,

work: `iş|работа, дело
işyeri|место работы
ofis|офис
şirket|компания
patron|начальник
müdür|директор
meslektaş|коллега
toplantı|совещание
proje|проект
görev|задание, обязанность
maaş|зарплата
öğretmen|учитель
öğrenci|ученик, студент
okul|школа
üniversite|университет
sınıf|класс
ders|урок
sınav|экзамен
ödev|домашнее задание
dil|язык
kelime|слово
cümle|предложение
soru|вопрос
cevap|ответ
mühendis|инженер
aşçı|повар
satıcı|продавец
şoför|водитель
polis|полицейский
yazar|писатель
müzik|музыка
film|фильм
oyun|игра
hobi|хобби
fikir|идея, мнение
futbol|футбол
resim|рисунок, картина
hikâye|рассказ, история
kontrol|проверка, контроль
şekil|форма, образ
başlangıç|начало
sistem|система
uzman|специалист
metin|текст
dizi|сериал
hata|ошибка
yardım|помощь
ziyaret|визит
haber|новость
ek|аффикс, приложение
örnek|пример
parça|часть, кусок
sinema|кино, кинотеатр`,

nature: `doğa|природа
hava|погода; воздух
güneş|солнце
yağmur|дождь
kar|снег
rüzgâr|ветер
bulut|облако
gökyüzü|небо
deniz|море
göl|озеро
nehir|река
dağ|гора
orman|лес
ağaç|дерево
çiçek|цветок
kum|песок
plaj|пляж
sahil|берег, побережье
ada|остров
taş|камень
toprak|земля, почва
dünya|мир, Земля
yıldız|звезда
kuş|птица
martı|чайка
hayvan|животное
at|лошадь
inek|корова
balıkçı|рыбак
dalga|волна`
};

export const SET_INFO = {
  start: { title: 'Первые слова', icon: 'core', desc: 'Приветствия и вежливость — с них начинаем' },
  numbers: { title: 'Числа и деньги', icon: 'time', desc: 'От нуля до миллиона, цены' },
  core: { title: 'Базовые слова', icon: 'core', desc: 'Местоимения, вопросы, числа, вежливость' },
  verbs: { title: 'Главные глаголы', icon: 'verbs', desc: 'Самые частые действия (-mak / -mek)' },
  family: { title: 'Семья и люди', icon: 'family', desc: 'Родственники и окружение' },
  food: { title: 'Еда и кафе', icon: 'food', desc: 'Завтрак, локанта, турецкая кухня' },
  travel: { title: 'Путешествия', icon: 'travel', desc: 'Транспорт, город, отель, базар' },
  home: { title: 'Дом и вещи', icon: 'home', desc: 'Комнаты, мебель, одежда' },
  time: { title: 'Время и календарь', icon: 'time', desc: 'Дни недели, месяцы, времена года' },
  adjectives: { title: 'Прилагательные', icon: 'adjectives', desc: 'Размер, цвет, качество' },
  emotions: { title: 'Чувства и характер', icon: 'emotions', desc: 'Эмоции и черты' },
  body: { title: 'Тело и здоровье', icon: 'body', desc: 'Части тела, у врача, аптека' },
  work: { title: 'Работа и учёба', icon: 'work', desc: 'Профессии, офис, школа' },
  nature: { title: 'Природа и погода', icon: 'nature', desc: 'Море, горы, животные' }
};

// Дополнительные тематические наборы (more-sets.js) — после основных
Object.assign(RAW, MORE_RAW);
Object.assign(SET_INFO, MORE_INFO);
// Наборы слов из песен и стихов (songs.js) — после тематических
for (const [id, s] of Object.entries(SONG_SETS)) {
  RAW[id] = s.words;
  SET_INFO[id] = { title: s.title, icon: 'education', desc: s.desc };
}
// Набор слов из турецких сказок (tales.js) — после тематических
RAW.tales_tr = TALE_SET;
SET_INFO.tales_tr = { title: 'Слова из сказок', icon: 'education', desc: 'Насреддин Ходжа, Кельоглан, Деде Коркут, легенды' };

export const DICT = new Map();      // слово -> перевод
export const SETS = {};             // набор -> [слова]
for (const [set, block] of Object.entries(RAW)) {
  SETS[set] = [];
  for (const line of block.split('\n')) {
    const [w, t] = line.split('|');
    if (!w || !t) continue;
    if (!DICT.has(w)) DICT.set(w, t);
    if (!SETS[set].includes(w)) SETS[set].push(w);
  }
}
// Слова из песен и сказок — только в словарь
for (const line of (SONG_WORDS + '\n' + TALE_WORDS).split('\n')) {
  const [w, t] = line.split('|');
  if (w && t && !DICT.has(w)) DICT.set(w, t);
}

// ---------- поиск начальной формы ----------
// Турецкий — агглютинативный язык: к основе цепочкой присоединяются аффиксы
// (ev-ler-im-de — «в моих домах»). Чтобы перевод по клику работал, отрезаем
// типичные аффиксы по одному и проверяем, есть ли основа в словаре.
// Учитываем озвончение конечной согласной (kitap → kitabı, çocuk → çocuğu)
// и выпадение гласной перед -yor (başla → başlıyor).

export const lower = s => s.replace(/I/g, 'ı').replace(/İ/g, 'i').toLowerCase();

// Неправильные и трудные формы, встречающиеся в текстах и фразах
const FORMS = {
  'bana': 'ben', 'beni': 'ben', 'benim': 'ben', 'bende': 'ben', 'benden': 'ben',
  'sana': 'sen', 'seni': 'sen', 'senin': 'sen', 'sende': 'sen',
  'ona': 'o', 'onu': 'o', 'onun': 'o', 'onda': 'o', 'ondan': 'o', 'onlarla': 'onlar', 'onları': 'onlar', 'onların': 'onlar',
  'bize': 'biz', 'bizi': 'biz', 'bizim': 'biz', 'bizimle': 'biz', 'size': 'siz', 'sizi': 'siz', 'sizin': 'siz',
  'bunu': 'bu', 'bunun': 'bu', 'buna': 'bu', 'burada': 'burası', 'buraya': 'burası', 'buradan': 'burası',
  'orada': 'orası', 'oraya': 'orası', 'oradan': 'orası', 'şunu': 'şu',
  'kendime': 'kendi', 'kendimi': 'kendi', 'kendini': 'kendi',
  'nerelisin': 'nereden', 'nerelisiniz': 'nereden', 'özür': 'özür dilerim', 'dilerim': 'özür dilerim', 'afiyet': 'afiyet olsun',
  'yaşındasın': 'yaş', 'odam': 'oda', 'odamda': 'oda', 'türküm': 'türk',
  'diyor': 'demek', 'diyorum': 'demek', 'dedi': 'demek', 'der': 'demek', 'diye': 'demek',
  'yiyor': 'yemek', 'yiyorum': 'yemek', 'yiyoruz': 'yemek', 'yedik': 'yemek', 'yer': 'yemek', 'yeriz': 'yemek',
  'gidiyor': 'gitmek', 'gidiyorum': 'gitmek', 'gidiyoruz': 'gitmek', 'gider': 'gitmek', 'gideriz': 'gitmek', 'giderim': 'gitmek', 'gidelim': 'gitmek', 'gidecek': 'gitmek', 'gideceğim': 'gitmek', 'gideceğiz': 'gitmek', 'gitti': 'gitmek', 'gittik': 'gitmek', 'gittim': 'gitmek',
  'ediyor': 'etmek', 'ediyorum': 'etmek', 'eder': 'etmek', 'ederim': 'etmek', 'etti': 'etmek', 'ettik': 'etmek',
  'ederiz': 'etmek', 'edecek': 'etmek', 'edeceğim': 'etmek',
  'oluyor': 'olmak', 'olur': 'olmak', 'oldu': 'olmak', 'olacak': 'olmak', 'olarak': 'olmak', 'olan': 'olmak', 'olduğu': 'olmak',
  'var': 'var', 'vardı': 'var', 'varmış': 'var', 'yoktu': 'yok',
  'değilim': 'değil', 'değildi': 'değil', 'değiliz': 'değil',
  'çocuklar': 'çocuk', 'çocukları': 'çocuk', 'çocuğu': 'çocuk',
  'ağabeyim': 'ağabey', 'kızım': 'kız', 'oğlum': 'oğul', 'oğlu': 'oğul',
  'adım': 'ad', 'adı': 'ad', 'ismim': 'isim', 'ismi': 'isim', 'yaşında': 'yaş', 'yaşındayım': 'yaş',
  'ağzı': 'ağız', 'burnu': 'burun', 'şehri': 'şehir', 'şehre': 'şehir', 'şehirde': 'şehir', 'fikrim': 'fikir',
  'kahvaltıda': 'kahvaltı', 'kahvaltıdan': 'kahvaltı',
  'çayı': 'çay', 'çayımı': 'çay', 'suyu': 'su', 'suyun': 'su',
  'teşekkür': 'teşekkür ederim', 'ederim': 'teşekkür ederim',
  'görüşürüz': 'görüşmek', 'yüzden': 'bu yüzden', 'yedide': 'yedi',
  'açar': 'açmak', 'açarım': 'açmak', 'açarız': 'açmak', 'bindik': 'binmek', 'bindim': 'binmek', 'biner': 'binmek', 'binerim': 'binmek',
  'yaşıyorum': 'yaşamak', 'yaşıyor': 'yaşamak', 'yaşıyoruz': 'yaşamak', 'yaşıyorsun': 'yaşamak', 'yaşadık': 'yaşamak', 'yaşadım': 'yaşamak',
  'şehrin': 'şehir', 'resmi': 'resim', 'rusyalıyım': 'rusya', 'rusyalı': 'rusya', 'türkçede': 'türkçe', 'başlangıçta': 'başlangıç',
  'hikâyeler': 'hikâye', 'hikayeler': 'hikâye', 'hikaye': 'hikâye'
};
// Трудные формы из сказок (tales.js); общие формы выше важнее
for (const [f, w] of Object.entries(TALE_FORMS)) FORMS[f] ||= w;

// Слова, которые узнаём только целиком (как основа для аффиксов они дали бы ложные совпадения: kal-dık)
const EXACT = { kal: 'hoşça kal', 'hoşça': 'hoşça kal', güle: 'güle güle' };

// Аффиксы (без учёта гармонии гласных — проверку делает словарь)
const SUFFIXES = [
  // глагольные окончания и времена
  'iyorum', 'ıyorum', 'uyorum', 'üyorum', 'yorum', 'iyorsun', 'ıyorsun', 'uyorsun', 'üyorsun', 'yorsun',
  'iyoruz', 'ıyoruz', 'uyoruz', 'üyoruz', 'yoruz', 'iyorlar', 'ıyorlar', 'uyorlar', 'üyorlar', 'yorlar',
  'iyordu', 'ıyordu', 'uyordu', 'üyordu', 'yordu', 'iyor', 'ıyor', 'uyor', 'üyor', 'yor',
  'yacağım', 'yeceğim', 'yacağız', 'yeceğiz', 'yacaksın', 'yeceksin', 'acaklar', 'ecekler', 'yacaklar', 'yecekler',
  'ydı', 'ydi', 'ydu', 'ydü', 'ydım', 'ydim', 'ydum', 'ydüm', 'ydık', 'ydik', 'yduk', 'ydük',
  'sa', 'se', 'sam', 'sem', 'san', 'sen', 'sak', 'sek', 'sanız', 'seniz',
  'acağım', 'eceğim', 'acağız', 'eceğiz', 'acaksın', 'eceksin', 'acak', 'ecek', 'yacak', 'yecek',
  'mışım', 'mişim', 'muşum', 'müşüm', 'mış', 'miş', 'muş', 'müş', 'ymış', 'ymiş', 'ymuş', 'ymüş',
  'dım', 'dim', 'dum', 'düm', 'tım', 'tim', 'tum', 'tüm', 'dık', 'dik', 'duk', 'dük', 'tık', 'tik', 'tuk', 'tük',
  'dın', 'din', 'dun', 'dün', 'dılar', 'diler', 'dular', 'düler', 'tılar', 'tiler', 'tular', 'tüler',
  'dı', 'di', 'du', 'dü', 'tı', 'ti', 'tu', 'tü',
  'malıyım', 'meliyim', 'malı', 'meli', 'abilir', 'ebilir', 'yabilir', 'yebilir', 'abilirsin', 'ebilirsin',
  'ma', 'me', 'mak', 'mek', 'mayı', 'meyi', 'ması', 'mesi', 'maya', 'meye',
  'arak', 'erek', 'yarak', 'yerek', 'ınca', 'ince', 'unca', 'ünce', 'yınca', 'yince', 'yunca', 'yünce',
  'ken', 'yken', 'ip', 'ıp', 'up', 'üp', 'yip', 'yıp', 'yup', 'yüp',
  'alım', 'elim', 'yalım', 'yelim', 'ın', 'in', 'un', 'ün', 'yın', 'yin', 'yun', 'yün', 'ınız', 'iniz', 'unuz', 'ünüz',
  'arım', 'erim', 'ırım', 'irim', 'urum', 'ürüm', 'arız', 'eriz', 'ırız', 'iriz', 'uruz', 'ürüz',
  'ar', 'er', 'ır', 'ir', 'ur', 'ür', 'r', 'maz', 'mez',
  'dığı', 'diği', 'duğu', 'düğü', 'tığı', 'tiği', 'tuğu', 'tüğü', 'dığım', 'diğim', 'duğum', 'düğüm',
  'an', 'en', 'yan', 'yen',
  // сказуемость и лицо
  'yım', 'yim', 'yum', 'yüm', 'ım', 'im', 'um', 'üm', 'm',
  'sın', 'sin', 'sun', 'sün', 'sınız', 'siniz', 'sunuz', 'sünüz',
  'yız', 'yiz', 'yuz', 'yüz', 'ız', 'iz', 'uz', 'üz',
  'dır', 'dir', 'dur', 'dür', 'tır', 'tir', 'tur', 'tür',
  // множественное число, принадлежность
  'lar', 'ler', 'ları', 'leri', 'ımız', 'imiz', 'umuz', 'ümüz', 'mız', 'miz', 'muz', 'müz',
  'ınız', 'nız', 'niz', 'nuz', 'nüz', 'sı', 'si', 'su', 'sü', 'ı', 'i', 'u', 'ü',
  // падежи
  'nın', 'nin', 'nun', 'nün', 'ın', 'in', 'un', 'ün',
  'yı', 'yi', 'yu', 'yü', 'nı', 'ni', 'nu', 'nü',
  'ya', 'ye', 'na', 'ne', 'a', 'e',
  'nda', 'nde', 'da', 'de', 'ta', 'te',
  'ndan', 'nden', 'dan', 'den', 'tan', 'ten',
  'yla', 'yle', 'la', 'le', 'ki', 'ca', 'ce', 'ça', 'çe', 'lı', 'li', 'lu', 'lü', 'sız', 'siz', 'suz', 'süz',
  'cı', 'ci', 'cu', 'cü', 'çı', 'çi', 'çu', 'çü'
];
const UNIQUE_SUFFIXES = [...new Set(SUFFIXES)];

const SOFT = { b: 'p', c: 'ç', d: 't', ğ: 'k', g: 'k' };

function variants(stem) {
  const out = [stem];
  const last = stem.at(-1);
  if (SOFT[last]) out.push(stem.slice(0, -1) + SOFT[last]);
  return out;
}

// Проверка основы: существительное/прилагательное или основа глагола
function resolve(stem) {
  for (const v of variants(stem)) {
    if (DICT.has(v)) return v;
    for (const inf of [v + 'mak', v + 'mek', v + 'amak', v + 'emek']) if (DICT.has(inf)) return inf;
  }
  return '';
}

export function lemma(raw) {
  let w = lower(String(raw)).replace(/[’`]/g, "'").replace(/^[^\p{L}']+|[^\p{L}']+$/gu, '').replace(/^'+|'+$/g, '');
  if (!w) return '';
  if (w.includes("'")) w = w.split("'")[0]; // имя собственное + аффикс: İstanbul'da
  if (FORMS[w]) return FORMS[w];
  if (EXACT[w]) return EXACT[w];
  if (DICT.has(w)) return w;
  // поиск в ширину: сначала одна отрезанная аффиксация, потом две и т.д.
  let level = [w];
  const seen = new Set(level);
  for (let depth = 0; depth < 5 && level.length; depth++) {
    const next = [];
    let best = '', bestLen = 0; // на одном уровне выбираем самую длинную основу: okul-a, а не oku-la
    for (const s of level) {
      for (const suf of UNIQUE_SUFFIXES) {
        if (!s.endsWith(suf) || s.length - suf.length < 2) continue;
        const stem = s.slice(0, -suf.length);
        const hit = FORMS[stem] || resolve(stem);
        if (hit && stem.length > bestLen) { best = hit; bestLen = stem.length; }
        if (!seen.has(stem)) { seen.add(stem); next.push(stem); }
      }
    }
    if (best) return best;
    level = next;
  }
  return w;
}

export function lookup(raw) {
  const l = lemma(raw);
  return { word: l, translation: DICT.get(l) || '' };
}
