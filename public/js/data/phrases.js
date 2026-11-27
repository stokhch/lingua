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
Practice makes learning easier.|Практика облегчает обучение.
I have been working here for three years.|Я работаю здесь уже три года.
If I had known, I would have told you.|Если бы я знал, я бы тебе сказал.
She said that she was feeling better.|Она сказала, что чувствует себя лучше.
The bridge was built in the nineteenth century.|Мост был построен в девятнадцатом веке.
I wish I had more free time.|Хотел бы я иметь больше свободного времени.
I had my car repaired last week.|На прошлой неделе мне починили машину.
He must have missed the train.|Он, наверное, опоздал на поезд.
You should have told me earlier.|Тебе следовало сказать мне раньше.
Despite the rain, we enjoyed the trip.|Несмотря на дождь, поездка нам понравилась.
I am used to getting up early.|Я привык рано вставать.
By the time you arrive, we will have finished.|К тому времени, как ты приедешь, мы уже закончим.
Never have I seen such a beautiful view.|Никогда я не видел такого красивого вида.
What I really need is a long holiday.|Что мне действительно нужно, так это долгий отпуск.
It is high time we made a decision.|Давно пора принять решение.
Having finished the report, she went home.|Закончив отчёт, она пошла домой.
The painting is believed to be a fake.|Считается, что картина — подделка.
Let's weigh up the pros and cons.|Давай взвесим все за и против.
We need to strike a balance between work and life.|Нам нужно найти баланс между работой и жизнью.
That is a fair point, but I see it differently.|Справедливое замечание, но я смотрю на это иначе.
I'd rather not jump to conclusions.|Я бы не стал делать поспешных выводов.
Could you spell out what you mean?|Не могли бы вы объяснить, что имеете в виду?
The results suggest that the method works.|Результаты говорят о том, что метод работает.
To be honest, it is not my cup of tea.|Честно говоря, это не в моём вкусе.
Let's call it a day.|На сегодня хватит.
This decision could undermine our credibility.|Это решение может подорвать доверие к нам.
We should not overlook the risks.|Нам не следует упускать из виду риски.
Her argument was clear and compelling.|Её аргумент был ясным и убедительным.
The meeting has been put off until Friday.|Встречу перенесли на пятницу.
I'm afraid the plan fell through.|Боюсь, план сорвался.
It goes without saying that safety comes first.|Само собой разумеется, безопасность прежде всего.`;

export const PHRASES = RAW.split('\n').map(l => { const [en, ru] = l.split('|'); return { en, ru }; });
