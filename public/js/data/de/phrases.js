// Короткие немецкие фразы с переводом для тренировок «Конструктор фраз», «Диктант» и «Слово в контексте». Написаны для Лингвы.
const RAW = `Hallo!|Привет!
Guten Morgen!|Доброе утро!
Guten Abend!|Добрый вечер!
Herzlich willkommen!|Добро пожаловать!
Freut mich.|Очень приятно.
Entschuldigung!|Извините!
Ich verstehe das nicht.|Я этого не понимаю.
Können Sie das wiederholen?|Не могли бы вы повторить?
Ich spreche kein Deutsch.|Я не говорю по-немецки.
Ich spreche ein bisschen Deutsch.|Я немного говорю по-немецки.
Was ist das?|Что это?
Wer ist das?|Кто это?
Wo ist die Toilette?|Где туалет?
Ich möchte ein Wasser.|Я хотел бы воды.
Guten Appetit!|Приятного аппетита!
Wie alt bist du?|Сколько тебе лет?
Ich bin fünfundzwanzig Jahre alt.|Мне двадцать пять лет.
Ich bin Student.|Я студент.
Ich komme aus Russland.|Я из России.
Ich wohne in Moskau.|Я живу в Москве.
Ich stehe jeden Tag um sieben Uhr auf.|Я встаю каждый день в семь часов.
Meine Schwester liebt Hunde.|Моя сестра любит собак.
Wo ist die Haltestelle?|Где остановка?
Können Sie mir helfen?|Можете мне помочь?
Wir haben in einem kleinen Restaurant gegessen.|Мы поели в маленьком ресторане.
Das Wetter ist heute schön.|Сегодня хорошая погода.
Zum Frühstück esse ich Brot mit Käse.|На завтрак я ем хлеб с сыром.
Wie spät ist es?|Который час?
Es ist halb acht.|Половина восьмого.
Was kostet das?|Сколько это стоит?
Die Rechnung, bitte.|Счёт, пожалуйста.
Ich habe Hunger.|Я голоден.
Ich habe keine Zeit.|У меня нет времени.
Wohin fährt dieser Zug?|Куда идёт этот поезд?
Wann beginnt der Film?|Когда начинается фильм?
Am Wochenende besuche ich meine Eltern.|На выходных я навещаю родителей.
Gestern war ich im Museum.|Вчера я был в музее.
Ich lerne seit einem Jahr Deutsch.|Я учу немецкий уже год.
Das Buch gefällt mir sehr.|Мне очень нравится эта книга.
Bis morgen!|До завтра!
Auf Wiedersehen!|До свидания!
Tschüss!|Пока!`;

export const PHRASES = RAW.split('\n').map(l => { const [w, ru] = l.split('|'); return { en: w, ru }; });
