// Короткие фразы с переводом для тренировок «Конструктор фраз» и «Диктант». Написаны для проекта.
const RAW = `I get up at seven every day.|Я встаю в семь каждый день.
My sister loves dogs.|Моя сестра любит собак.
Where is the bus stop?|Где автобусная остановка?
Can you help me, please?|Не могли бы вы мне помочь?
We had dinner in a little restaurant.|Мы поужинали в маленьком ресторане.
The weather is warm and sunny.|Погода тёплая и солнечная.
I would like a cup of tea.|Я бы хотел чашку чая.
How much does this ticket cost?|Сколько стоит этот билет?
She works at a big company.|Она работает в большой компании.
I don't understand this word.|Я не понимаю это слово.
They visited an old castle.|Они посетили старый замок.
What time does the train leave?|Во сколько отходит поезд?
My brother plays football on Sunday.|Мой брат играет в футбол по воскресеньям.
I am learning English every day.|Я учу английский каждый день.
The museum is near the station.|Музей рядом с вокзалом.
Turn off your phone before you sleep.|Выключай телефон перед сном.
He was nervous on his first day.|Он нервничал в свой первый день.
We got lost in the narrow streets.|Мы заблудились в узких улочках.
I forgot my keys at home.|Я забыл ключи дома.
This book is more interesting than the film.|Эта книга интереснее фильма.
Please speak more slowly.|Пожалуйста, говорите медленнее.
It is going to rain today.|Сегодня пойдёт дождь.
I will call you tomorrow.|Я позвоню тебе завтра.
You should drink more water.|Тебе следует пить больше воды.
The children are playing in the garden.|Дети играют в саду.
Did you see the news yesterday?|Ты видел новости вчера?
My mother is a doctor.|Моя мама врач.
I can't find my bag.|Я не могу найти свою сумку.
Let's meet after work.|Давай встретимся после работы.
The waiter recommended a local dish.|Официант посоветовал местное блюдо.
I usually walk to the office.|Обычно я хожу в офис пешком.
What are you doing now?|Что ты сейчас делаешь?
She doesn't eat meat.|Она не ест мясо.
We are going to travel next summer.|Следующим летом мы собираемся путешествовать.
Read a short text every evening.|Читай короткий текст каждый вечер.
Small habits can improve your mood.|Маленькие привычки могут улучшить настроение.
Open the window, please.|Открой окно, пожалуйста.
I have two brothers and one sister.|У меня два брата и одна сестра.
The sea was calm in the morning.|Утром море было спокойным.
Practice makes learning easier.|Практика облегчает обучение.`;

export const PHRASES = RAW.split('\n').map(l => { const [en, ru] = l.split('|'); return { en, ru }; });
