// Встроенный англо-русский словарь проекта (составлен вручную для этого проекта).
// Формат блоков: "слово|перевод" — по строке на слово. Ключ блока = тематический набор.
const RAW = {
core: `the|определённый артикль
a|неопределённый артикль
an|неопределённый артикль
i|я
you|ты, вы
he|он
she|она
it|оно, это
we|мы
they|они
me|меня, мне
him|его, ему
her|её, ей
us|нас, нам
them|их, им
my|мой
your|твой, ваш
his|его
its|его, её (о предметах)
our|наш
their|их
myself|себя, сам
themselves|себя, сами
this|этот, это
that|тот, что, который
these|эти
those|те
what|что, какой
who|кто
where|где, куда
when|когда
why|почему
how|как
which|который
and|и
or|или
but|но
because|потому что
so|так, поэтому
if|если
than|чем
while|пока, в то время как
yet|однако, ещё
however|однако
whether|ли
as|как, так как
in|в
on|на
at|в, у, на
to|к, в, чтобы
from|из, от
with|с
without|без
for|для, на (время)
of|из, о (родительный падеж)
about|о, около
by|у, возле, к (сроку)
near|около, рядом
into|в (внутрь)
through|через, сквозь
along|вдоль
after|после
before|до, перед
away|прочь, вдали
back|назад, обратно
up|вверх
down|вниз
out|наружу
over|над, более
under|под
between|между
despite|несмотря на
instead|вместо
then|затем, тогда
first|сначала, первый
also|также
too|тоже, слишком
very|очень
often|часто
always|всегда
never|никогда
usually|обычно
sometimes|иногда
again|снова
already|уже
still|всё ещё
even|даже
only|только
just|только что, просто
not|не
no|нет, никакой
yes|да
all|все, весь
every|каждый
everyone|все, каждый
some|некоторые, немного
any|любой, какой-нибудь
many|много (исчисл.)
much|много (неисчисл.)
more|больше, более
most|большинство, самый
few|мало, несколько
several|несколько
other|другой
another|ещё один, другой
there|там
here|здесь
now|сейчас
today|сегодня
together|вместе
twice|дважды
less|меньше
least|наименее
be|быть
have|иметь
do|делать
can|мочь, уметь
could|мог бы
will|буду (будущее время)
would|бы
might|может быть, мог бы
must|должен
should|следует
may|может, можно
one|один
two|два
three|три
six|шесть
seven|семь
eight|восемь
twenty|двадцать
fifteen|пятнадцать
hundred|сто
million|миллион
half|половина
o'clock|час (о времени)
part|часть
rest|остаток, отдых
thing|вещь
way|путь, способ
lot|множество
case|случай
result|результат
example|пример
solution|решение
problem|проблема
reason|причина
change|изменение; менять
kind|добрый; вид, сорт
main|главный
own|собственный
simple|простой
important|важный
same|тот же самый
such|такой
particular|особый
ordinary|обычный
off|выключено, прочь
once|однажды, один раз
point|точка, смысл
money|деньги
space|пространство, место
conversation|разговор
collaboration|совместная работа
metre|метр`,

verbs: `get|получать, становиться
get up|вставать
go|идти, ехать
come|приходить
make|делать, создавать
take|брать
give|давать
put|класть
put on|надевать
look|смотреть
see|видеть
watch|смотреть, наблюдать
know|знать
think|думать
believe|верить, считать
want|хотеть
like|нравиться
love|любить
need|нуждаться
use|использовать
find|находить
tell|рассказывать, сообщать
ask|спрашивать
answer|отвечать; ответ
say|сказать
talk|разговаривать
speak|говорить
explain|объяснять
read|читать
write|писать
learn|учить, узнавать
study|учиться, изучать
teach|преподавать
work|работать; работа
play|играть
open|открывать; открытый
close|закрывать
eat|есть
drink|пить
cook|готовить
buy|покупать
pay|платить
sell|продавать
wash|мыть
brush|чистить щёткой
sit|сидеть
stand|стоять
walk|гулять, идти пешком
run|бежать
leave|уходить, оставлять
arrive|прибывать
travel|путешествовать
visit|посещать
stay|оставаться
wait|ждать
start|начинать
begin|начинать
finish|заканчивать
stop|останавливать(ся)
help|помогать
try|пытаться
feel|чувствовать
seem|казаться
keep|хранить, продолжать
move|двигать(ся)
turn|поворачивать
turn off|выключать
show|показывать
meet|встречать
introduce|представлять, знакомить
check|проверять
spend|тратить, проводить (время)
save|сохранять, экономить
lose|терять
get lost|заблудиться
draw|рисовать
laugh|смеяться
smile|улыбаться
recommend|рекомендовать
suggest|предлагать, указывать
improve|улучшать
return|возвращаться
forget|забывать
remember|помнить
review|повторять, просматривать
practise|практиковаться
compare|сравнивать
plan|планировать; план
struggle|бороться, с трудом справляться
concentrate|сосредоточиться
scroll|листать, прокручивать
throw|бросать
throw away|выбрасывать
attract|привлекать
confuse|сбивать с толку
produce|производить
cover|покрывать
explore|исследовать
reach|достигать
crush|раздавить
store|хранить
influence|влиять; влияние
destroy|разрушать
discover|открывать, обнаруживать
warn|предупреждать
argue|утверждать, спорить
rely|полагаться
consider|считать, рассматривать
redesign|перепроектировать
emphasise|подчёркивать
report|сообщать; отчёт
increase|увеличивать(ся)
balance|сочетать, балансировать
miss|скучать, упускать
point out|указывать
experiment|экспериментировать; эксперимент
collaborate|сотрудничать
fall|падать
build|строить
grow|расти
call|звонить, называть
send|отправлять
live|жить
die|умирать
sleep|спать; сон
wake up|просыпаться
happen|случаться
understand|понимать
choose|выбирать
win|выигрывать
pass|проходить, сдавать
hope|надеяться`,

family: `family|семья
mother|мать
father|отец
parent|родитель
brother|брат
sister|сестра
son|сын
daughter|дочь
grandmother|бабушка
grandfather|дедушка
child|ребёнок
children|дети
husband|муж
wife|жена
friend|друг
name|имя
people|люди
person|человек
man|мужчина
woman|женщина
baby|младенец
uncle|дядя
aunt|тётя
cousin|двоюродный брат, сестра
grown-up|взрослый
adult|взрослый
neighbour|сосед
guest|гость
boy|мальчик
girl|девочка`,

food: `food|еда
breakfast|завтрак
lunch|обед
dinner|ужин
tea|чай
coffee|кофе
cup|чашка
bread|хлеб
cheese|сыр
apple|яблоко
soup|суп
fish|рыба
meat|мясо
egg|яйцо
milk|молоко
water|вода
sugar|сахар
salt|соль
rice|рис
potato|картофель
tomato|помидор
cake|торт
sandwich|бутерброд
dish|блюдо
juice|сок
butter|сливочное масло
chicken|курица
orange|апельсин
banana|банан
restaurant|ресторан
waiter|официант
menu|меню
delicious|вкусный
fresh|свежий
hungry|голодный
sweet|сладкий
bill|счёт
plate|тарелка
fork|вилка
knife|нож
spoon|ложка`,

travel: `travel|путешествие
trip|поездка
journey|путешествие
hotel|гостиница
station|вокзал, станция
airport|аэропорт
ticket|билет
passport|паспорт
luggage|багаж
suitcase|чемодан
map|карта
bus|автобус
bus stop|автобусная остановка
train|поезд; тренировать
plane|самолёт
car|машина
taxi|такси
street|улица
city|город
town|городок
country|страна
sea|море
beach|пляж
castle|замок
museum|музей
market|рынок
bridge|мост
tourist|турист
local|местный
cheap|дешёвый
expensive|дорогой
weekend|выходные
holiday|отпуск, праздник
abroad|за границей
narrow|узкий
direction|направление
left|левый, налево
right|правый, правильный
road|дорога
sightseeing|осмотр достопримечательностей`,

work: `job|работа, должность
office|офис
manager|руководитель
team|команда
colleague|коллега
employee|сотрудник
employer|работодатель
company|компания
organisation|организация
meeting|встреча, совещание
task|задача
project|проект
salary|зарплата
career|карьера
boss|начальник
laptop|ноутбук
rule|правило
hobby|хобби
previous|предыдущий
experienced|опытный
productivity|продуктивность
workplace|рабочее место
commute|дорога на работу
flexibility|гибкость
privilege|привилегия
responsibility|обязанность, ответственность
supporter|сторонник
critic|критик
model|модель
deadline|крайний срок
interview|собеседование
contract|договор
business|бизнес, дело
customer|клиент
market share|доля рынка
remote|удалённый
hybrid|гибридный
independently|самостоятельно
in person|лично
accordingly|соответственно`,

home: `home|дом (жилище)
house|дом (здание)
room|комната
kitchen|кухня
bedroom|спальня
bathroom|ванная
window|окно
door|дверь
table|стол
chair|стул
bed|кровать
sofa|диван
desk|письменный стол
wall|стена
floor|пол, этаж
roof|крыша
key|ключ
lamp|лампа
shirt|рубашка
shoe|туфля, ботинок
dress|платье
coat|пальто
bag|сумка
face|лицо
tooth|зуб
teeth|зубы
clock|часы
picture|картина, рисунок
garden|сад
cat|кошка
dog|собака`,

emotions: `happy|счастливый
sad|грустный
angry|сердитый
afraid|испуганный
tired|усталый
nervous|нервный
proud|гордый
calm|спокойный
quiet|тихий
friendly|дружелюбный
kind|добрый
funny|смешной
lonely|одинокий
bored|скучающий
excited|взволнованный
surprised|удивлённый
worried|обеспокоенный
mood|настроение
feeling|чувство
fear|страх
joy|радость
love|любовь
hate|ненавидеть
interesting|интересный
boring|скучный
brave|смелый
shy|застенчивый
honest|честный
lazy|ленивый
clever|умный`,

tech: `phone|телефон
computer|компьютер
screen|экран
message|сообщение
notification|уведомление
news|новости
photo|фотография
internet|интернет
website|сайт
email|электронная почта
password|пароль
app|приложение
data|данные
technology|технология
device|устройство
battery|батарея
keyboard|клавиатура
download|скачивать
upload|загружать
online|в сети, онлайн
software|программное обеспечение
update|обновление
search|искать; поиск
click|щёлкать
file|файл
habit|привычка
focus|сосредоточенность
attention|внимание
mistake|ошибка
scientist|учёный
study|исследование
expert|эксперт
unnecessary|ненужный
constant|постоянный
effective|эффективный`,

nature: `nature|природа
sky|небо
sun|солнце
sunlight|солнечный свет
moon|луна
star|звезда
weather|погода
rain|дождь
snow|снег
wind|ветер
cloud|облако
warm|тёплый
hot|горячий, жаркий
cold|холодный
sunny|солнечный
tree|дерево
flower|цветок
river|река
lake|озеро
mountain|гора
forest|лес
ocean|океан
planet|планета
climate|климат
temperature|температура
pressure|давление
depth|глубина
deep|глубокий
spring|весна; источник
hot spring|горячий источник
bacteria|бактерии
chemical|химическое вещество
energy|энергия
carbon|углерод
ecosystem|экосистема
habitat|среда обитания
predator|хищник
worm|червь
giant|гигантский
submarine|подводная лодка
seabed|морское дно
metal|металл
mining|добыча полезных ископаемых
light|свет; лёгкий
life|жизнь
fraction|доля, часть
condition|условие
extreme|крайний, экстремальный
surprisingly|удивительно
essential|необходимый
global|глобальный
huge|огромный
valuable|ценный
tiny|крошечный
freezing|ледяной, морозный
research|исследование
researcher|исследователь
amount|количество
interest|интерес
company|компания`,

body: `body|тело
head|голова
hand|рука (кисть)
arm|рука
leg|нога
foot|ступня
eye|глаз
ear|ухо
nose|нос
mouth|рот
hair|волосы
heart|сердце
back|спина
doctor|врач
health|здоровье
healthy|здоровый
ill|больной
pain|боль
medicine|лекарство
hospital|больница
memory|память
brain|мозг
pronunciation|произношение`,

time: `time|время
day|день
week|неделя
month|месяц
year|год
hour|час
minute|минута
second|секунда; второй
morning|утро
afternoon|день (после полудня)
evening|вечер
night|ночь
monday|понедельник
friday|пятница
saturday|суббота
sunday|воскресенье
summer|лето
winter|зима
autumn|осень
yesterday|вчера
tomorrow|завтра
early|рано
late|поздно
soon|скоро
ago|назад (о времени)
next|следующий
last|последний, прошлый
interval|интервал
daily|ежедневный
age|возраст`,

adjectives: `big|большой
small|маленький
little|маленький, немного
large|крупный
long|длинный
short|короткий
old|старый
young|молодой
younger|младше
new|новый
good|хороший
bad|плохой
better|лучше
best|лучший
easy|лёгкий
hard|трудный, твёрдый
fast|быстрый
slow|медленный
blue|синий
red|красный
green|зелёный
white|белый
black|чёрный
free|свободный, бесплатный
busy|занятой
clear|ясный
full|полный
empty|пустой
rare|редкий
foreign|иностранный
native|родной
regular|регулярный
increasing|возрастающий
likely|вероятный
able|способный
ready|готовый
possible|возможный
different|разный
real|настоящий
true|верный, правдивый
wrong|неправильный
beautiful|красивый
ugly|некрасивый
rich|богатый
poor|бедный
strong|сильный
weak|слабый
informal|неформальный
older|старше
everything|всё
alone|один, в одиночестве
much|много`,

education: `school|школа
university|университет
teacher|учитель
student|студент
lesson|урок
language|язык
grammar|грамматика
word|слово
text|текст
book|книга
story|история, рассказ
question|вопрос
exam|экзамен
method|метод
technique|техника, приём
strategy|стратегия
goal|цель
effort|усилие
advantage|преимущество
practice|практика
repetition|повторение
spaced repetition|интервальное повторение
football|футбол
research|исследование
idea|идея
dictionary|словарь
translation|перевод`
};

export const SET_INFO = {
  core: { title: 'Базовые слова', icon: 'core', desc: 'Местоимения, предлоги, связки' },
  verbs: { title: 'Главные глаголы', icon: 'verbs', desc: 'Самые частые действия' },
  family: { title: 'Семья и люди', icon: 'family', desc: 'Родственники и окружение' },
  food: { title: 'Еда и кафе', icon: 'food', desc: 'Продукты, блюда, ресторан' },
  travel: { title: 'Путешествия', icon: 'travel', desc: 'Транспорт, город, отель' },
  work: { title: 'Работа и офис', icon: 'work', desc: 'Коллеги, задачи, карьера' },
  home: { title: 'Дом и вещи', icon: 'home', desc: 'Комнаты, мебель, одежда' },
  emotions: { title: 'Чувства и характер', icon: 'emotions', desc: 'Эмоции и черты' },
  tech: { title: 'Технологии', icon: 'tech', desc: 'Гаджеты и интернет' },
  nature: { title: 'Природа и наука', icon: 'nature', desc: 'Погода, океан, планета' },
  body: { title: 'Тело и здоровье', icon: 'body', desc: 'Части тела, у врача' },
  time: { title: 'Время и календарь', icon: 'time', desc: 'Дни, месяцы, время суток' },
  adjectives: { title: 'Прилагательные', icon: 'adjectives', desc: 'Описываем мир' },
  education: { title: 'Учёба', icon: 'education', desc: 'Школа, язык, экзамены' }
};

export const DICT = new Map();      // слово -> перевод
export const SETS = {};             // набор -> [слова]
for (const [set, block] of Object.entries(RAW)) {
  SETS[set] = [];
  for (const line of block.split('\n')) {
    const [w, t] = line.split('|');
    if (!w || !t) continue;
    if (!DICT.has(w)) DICT.set(w, t);
    SETS[set].push(w);
  }
}

// Неправильные формы -> начальная форма
const IRREGULAR = {
  am: 'be', is: 'be', are: 'be', was: 'be', were: 'be', been: 'be', being: 'be',
  has: 'have', had: 'have', does: 'do', did: 'do', done: 'do',
  went: 'go', gone: 'go', got: 'get', came: 'come', made: 'make', took: 'take', taken: 'take',
  gave: 'give', given: 'give', saw: 'see', seen: 'see', knew: 'know', known: 'know',
  thought: 'think', found: 'find', told: 'tell', said: 'say', spoke: 'speak', read: 'read',
  wrote: 'write', written: 'write', ate: 'eat', eaten: 'eat', drank: 'drink', bought: 'buy',
  paid: 'pay', sold: 'sell', sat: 'sit', stood: 'stand', ran: 'run', left: 'leave', met: 'meet',
  spent: 'spend', lost: 'lose', drew: 'draw', felt: 'feel', kept: 'keep', woke: 'wake up',
  began: 'begin', begun: 'begin', threw: 'throw', thrown: 'throw', fell: 'fall', built: 'build',
  grew: 'grow', sent: 'send', slept: 'sleep', understood: 'understand', chose: 'choose',
  won: 'win', taught: 'teach', brought: 'bring', forgot: 'forget', forgotten: 'forget',
  children: 'children', teeth: 'teeth', people: 'people', men: 'man', women: 'woman', feet: 'foot',
  "i'm": 'i', "don't": 'do', "doesn't": 'do', "didn't": 'do', "can't": 'can', cannot: 'can', "it's": 'it',
  better: 'better', best: 'best', worse: 'bad', worst: 'bad', grown: 'grow', 'grown-ups': 'grown-up',
  studies: 'study', practising: 'practise', organisations: 'organisation', lives: 'life'
};

// Простая лемматизация для поиска слова в словаре
export function lemma(raw) {
  const w = raw.toLowerCase().replace(/[’]/g, "'").replace(/^[^a-z]+|[^a-z]+$/g, '');
  if (!w) return '';
  if (IRREGULAR[w]) return IRREGULAR[w];
  if (DICT.has(w)) return w;
  const tries = [];
  if (w.endsWith("'s")) tries.push(w.slice(0, -2));
  if (w.endsWith('ies')) tries.push(w.slice(0, -3) + 'y');
  if (w.endsWith('ied')) tries.push(w.slice(0, -3) + 'y');
  if (w.endsWith('es')) tries.push(w.slice(0, -2));
  if (w.endsWith('s')) tries.push(w.slice(0, -1));
  if (w.endsWith('ed')) { tries.push(w.slice(0, -2), w.slice(0, -1)); if (/(.)\1ed$/.test(w)) tries.push(w.slice(0, -3)); }
  if (w.endsWith('ing')) { tries.push(w.slice(0, -3), w.slice(0, -3) + 'e'); if (/(.)\1ing$/.test(w)) tries.push(w.slice(0, -4)); }
  if (w.endsWith('ier')) tries.push(w.slice(0, -3) + 'y');
  if (w.endsWith('er')) tries.push(w.slice(0, -2), w.slice(0, -1));
  if (w.endsWith('est')) tries.push(w.slice(0, -3), w.slice(0, -2));
  if (w.endsWith('ly')) tries.push(w.slice(0, -2));
  for (const t of tries) if (DICT.has(t)) return t;
  return w;
}

export function lookup(raw) {
  const l = lemma(raw);
  return { word: l, translation: DICT.get(l) || '' };
}
