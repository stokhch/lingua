// Банк слов для теста на уровень (составлен вручную для этого проекта).
// Для каждого уровня — 12 слов «слово|перевод»; в тесте на уровень даётся 4 случайных слова.
const parse = block => block.trim().split('\n').map(l => l.split('|').map(s => s.trim()));

export const LEVEL_NAMES = {
  A0: 'начинающий', A1: 'элементарный', A2: 'базовый', B1: 'средний', B2: 'выше среднего', C1: 'продвинутый'
};

export const BANKS = {
  en: {
    levels: ['A1', 'A2', 'B1', 'B2', 'C1'],
    items: {
      A1: parse(`
apple|яблоко
house|дом
water|вода
friend|друг
big|большой
eat|есть, кушать
dog|собака
red|красный
morning|утро
sister|сестра
open|открывать
cold|холодный`),
      A2: parse(`
cheap|дешёвый
borrow|брать взаймы
weather|погода
neighbour|сосед
empty|пустой
invite|приглашать
healthy|здоровый
forget|забывать
ticket|билет
lazy|ленивый
noisy|шумный
arrive|прибывать`),
      B1: parse(`
achieve|достигать
opinion|мнение
rely|полагаться
sudden|внезапный
advice|совет
improve|улучшать
purpose|цель, назначение
complain|жаловаться
recently|недавно
afford|позволить себе
attempt|попытка
reliable|надёжный`),
      B2: parse(`
reluctant|неохотный
assess|оценивать
thorough|тщательный
cope|справляться
outcome|результат, исход
convey|передавать (смысл)
inevitable|неизбежный
undermine|подрывать
notion|понятие, представление
exceed|превышать
widespread|широко распространённый
bias|предвзятость`),
      C1: parse(`
meticulous|дотошный
ubiquitous|вездесущий
alleviate|облегчать
scrutiny|пристальное изучение
tenuous|слабый, неубедительный
ambiguous|двусмысленный
compelling|убедительный
deteriorate|ухудшаться
resilience|стойкость
conspicuous|заметный, бросающийся в глаза
endorse|одобрять, поддерживать
detrimental|вредный, пагубный`)
    }
  },
  tr: {
    levels: ['A1', 'A2', 'B1', 'B2'],
    items: {
      A1: parse(`
ev|дом
su|вода
kitap|книга
büyük|большой
gitmek|идти, ехать
anne|мама
kırmızı|красный
ekmek|хлеб
iyi|хороший
gün|день
kedi|кошка
okul|школа`),
      A2: parse(`
ucuz|дешёвый
hava|погода, воздух
komşu|сосед
yolculuk|путешествие, поездка
unutmak|забывать
bilet|билет
sağlıklı|здоровый
boş|пустой
davet etmek|приглашать
tembel|ленивый
gürültülü|шумный
varmak|прибывать`),
      B1: parse(`
başarmak|достигать
fikir|мнение, идея
tavsiye|совет
geliştirmek|развивать, улучшать
amaç|цель
şikâyet etmek|жаловаться
aniden|внезапно
güvenmek|доверять
son zamanlarda|в последнее время
deneme|попытка
güvenilir|надёжный
gerekli|необходимый`),
      B2: parse(`
isteksiz|неохотный
değerlendirmek|оценивать
kaçınılmaz|неизбежный
kavram|понятие
aşmak|превышать, преодолевать
başa çıkmak|справляться
titiz|тщательный, дотошный
belirsiz|неопределённый
yaygın|распространённый
önyargı|предубеждение
sonuç|результат
etkili|эффективный`)
    }
  }
};

// Цели обучения: подсказывают, с какого набора слов начать
export const PURPOSES = [
  { id: 'travel', title: 'Путешествия', desc: 'Объясниться в аэропорту, отеле, кафе', set: 'travel' },
  { id: 'work', title: 'Работа и карьера', desc: 'Письма, встречи, собеседования', set: 'work' },
  { id: 'exam', title: 'Учёба и экзамены', desc: 'Школа, вуз, международные тесты', set: { en: 'education', tr: 'work' } },
  { id: 'media', title: 'Фильмы, книги, песни', desc: 'Понимать оригинал без перевода', set: 'emotions' },
  { id: 'self', title: 'Для себя', desc: 'Развиваться и тренировать память', set: 'verbs' }
];

// Сколько минут в день — какая дневная цель в XP
export const PACES = [
  { goal: 20, title: '5 минут', desc: 'спокойно' },
  { goal: 50, title: '10 минут', desc: 'обычно' },
  { goal: 100, title: '20 минут', desc: 'серьёзно' },
  { goal: 150, title: '30 минут', desc: 'интенсив' }
];
