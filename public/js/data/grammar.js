// Грамматические курсы: теория + упражнения. Тексты написаны для проекта.
// Тип упражнения: choice (выбрать вариант) или input (вписать ответ; допустимы варианты через "/").
import { ADV_COURSES } from './en/grammar-advanced.js';
export const COURSES = [
  {
    id: 'basics', title: 'Основы: глагол to be и времена Present', level: 'A1',
    lessons: [
      {
        id: 'to-be', title: 'Глагол to be',
        theory: `<p>Глагол <b>to be</b> («быть») в настоящем времени меняет форму: <b>I am</b>, <b>he / she / it is</b>, <b>we / you / they are</b>.</p>
<p>В русском языке его часто опускают («Я студент»), а в английском — никогда: <i>I <b>am</b> a student.</i></p>
<p>Вопрос: глагол ставим в начало — <i><b>Are</b> you tired?</i> Отрицание: добавляем <b>not</b> — <i>She <b>is not</b> (isn't) at home.</i></p>`,
        exercises: [
          { type: 'choice', q: 'I ___ a teacher.', options: ['am', 'is', 'are'], a: 'am' },
          { type: 'choice', q: 'My sister ___ six years old.', options: ['am', 'is', 'are'], a: 'is' },
          { type: 'choice', q: 'They ___ at the museum.', options: ['is', 'are', 'am'], a: 'are' },
          { type: 'choice', q: '___ you hungry?', options: ['Is', 'Am', 'Are'], a: 'Are' },
          { type: 'input', q: 'The weather ___ warm today. (to be)', a: 'is' },
          { type: 'input', q: 'We ___ not friends. (to be)', a: 'are' }
        ]
      },
      {
        id: 'present-simple', title: 'Present Simple',
        theory: `<p><b>Present Simple</b> описывает привычки, факты и расписание: <i>I drink tea every morning.</i></p>
<p>В 3-м лице единственного числа (he, she, it) к глаголу добавляется <b>-s / -es</b>: <i>She work<b>s</b>, he watch<b>es</b>, it fl<b>ies</b>.</i></p>
<p>Вопросы и отрицания строятся с помощью <b>do / does</b>: <i><b>Do</b> you like coffee? He <b>doesn't</b> eat meat.</i> После does глагол без -s.</p>
<p>Слова-подсказки: <i>always, usually, often, sometimes, never, every day</i>.</p>`,
        exercises: [
          { type: 'choice', q: 'My father ___ at a school.', options: ['work', 'works', 'working'], a: 'works' },
          { type: 'choice', q: '___ your brother play football?', options: ['Do', 'Does', 'Is'], a: 'Does' },
          { type: 'choice', q: 'We ___ watch TV in the morning.', options: ["don't", "doesn't", "isn't"], a: "don't" },
          { type: 'input', q: 'She ___ (watch) films every Friday.', a: 'watches' },
          { type: 'input', q: 'He ___ (not / like) cold weather.', a: "doesn't like/does not like" },
          { type: 'choice', q: 'The bus ___ at eight o\'clock.', options: ['leave', 'leaves', 'is leave'], a: 'leaves' }
        ]
      },
      {
        id: 'present-continuous', title: 'Present Continuous',
        theory: `<p><b>Present Continuous</b> — действие происходит прямо сейчас или в текущий период: <i>I <b>am reading</b> a book now.</i></p>
<p>Формула: <b>am / is / are + глагол-ing</b>. Вопрос: <i><b>Is</b> she <b>sleeping</b>?</i> Отрицание: <i>They <b>aren't working</b> today.</i></p>
<p>Сравните: <i>I <b>work</b> in an office</i> (вообще) и <i>I <b>am working</b> from home this week</i> (временно).</p>
<p>Глаголы состояния (<i>know, like, want, believe</i>) обычно не употребляются в Continuous.</p>`,
        exercises: [
          { type: 'choice', q: 'Look! The children ___ in the garden.', options: ['play', 'are playing', 'plays'], a: 'are playing' },
          { type: 'choice', q: 'I ___ you are right.', options: ['think', 'am thinking', 'thinking'], a: 'think' },
          { type: 'input', q: 'She ___ (cook) dinner at the moment.', a: 'is cooking/\'s cooking' },
          { type: 'choice', q: 'What ___ you doing?', options: ['do', 'are', 'is'], a: 'are' },
          { type: 'input', q: 'We ___ (not / watch) TV now.', a: "aren't watching/are not watching" },
          { type: 'choice', q: 'He usually ___ to work by bus.', options: ['goes', 'is going', 'go'], a: 'goes' }
        ]
      }
    ]
  },
  {
    id: 'past-future', title: 'Прошлое и будущее', level: 'A2',
    lessons: [
      {
        id: 'past-simple', title: 'Past Simple',
        theory: `<p><b>Past Simple</b> — завершённое действие в прошлом: <i>We <b>visited</b> an old castle last weekend.</i></p>
<p>Правильные глаголы получают окончание <b>-ed</b>: <i>work → worked, stop → stopped, study → studied</i>. Неправильные нужно запомнить: <i>go → went, see → saw, buy → bought</i>.</p>
<p>Вопросы и отрицания — с <b>did</b>, глагол в начальной форме: <i><b>Did</b> you <b>see</b> the film? I <b>didn't go</b> there.</i></p>
<p>Подсказки: <i>yesterday, last week, ago, in 2020</i>.</p>`,
        exercises: [
          { type: 'input', q: 'Yesterday I ___ (buy) some fresh fish.', a: 'bought' },
          { type: 'input', q: 'They ___ (arrive) on Friday evening.', a: 'arrived' },
          { type: 'choice', q: '___ you go to the museum?', options: ['Did', 'Do', 'Was'], a: 'Did' },
          { type: 'choice', q: 'She didn\'t ___ the answer.', options: ['knew', 'know', 'knows'], a: 'know' },
          { type: 'input', q: 'We ___ (go) to the sea two years ago.', a: 'went' },
          { type: 'choice', q: 'The waiter ___ a local dish.', options: ['recommend', 'recommended', 'recommends'], a: 'recommended' }
        ]
      },
      {
        id: 'future', title: 'Will или going to',
        theory: `<p><b>will + глагол</b> — решение в момент речи, обещание, прогноз-мнение: <i>I'm tired. I <b>will</b> take a taxi. I think it <b>will</b> rain.</i></p>
<p><b>be going to + глагол</b> — заранее принятое намерение или прогноз по очевидным признакам: <i>I<b>'m going to</b> study in London next year. Look at the clouds! It<b>'s going to</b> rain.</i></p>
<p>Отрицание will — <b>won't</b>: <i>I won't forget.</i></p>`,
        exercises: [
          { type: 'choice', q: 'The phone is ringing. — I ___ answer it!', options: ["'ll", "'m going to", 'am'], a: "'ll" },
          { type: 'choice', q: 'We have bought tickets. We ___ visit Rome in May.', options: ['will', 'are going to', 'go'], a: 'are going to' },
          { type: 'input', q: 'Don\'t worry, I ___ (not / forget) your birthday. (will)', a: "won't forget/will not forget" },
          { type: 'choice', q: 'Look at that sky! It ___ snow.', options: ['will', 'is going to', 'goes to'], a: 'is going to' },
          { type: 'choice', q: 'I think people ___ live on Mars one day.', options: ['will', 'are going', 'going to'], a: 'will' }
        ]
      }
    ]
  },
  {
    id: 'words', title: 'Артикли, сравнения и модальные глаголы', level: 'A2–B1',
    lessons: [
      {
        id: 'articles', title: 'Артикли a / an / the',
        theory: `<p><b>a / an</b> — «один из», впервые упоминаемый исчисляемый предмет в единственном числе: <i>I have <b>a</b> cat. She is <b>an</b> engineer.</i> <b>an</b> ставится перед гласным звуком: <i>an apple, an hour</i>.</p>
<p><b>the</b> — конкретный, уже известный или единственный в своём роде: <i><b>The</b> cat is on the table. <b>The</b> sun is hot.</i></p>
<p>Без артикля: имена, большинство стран и городов, неисчисляемые и множественное число в общем смысле — <i>I like music. Dogs are friendly.</i></p>`,
        exercises: [
          { type: 'choice', q: 'I ate ___ apple for breakfast.', options: ['a', 'an', 'the'], a: 'an' },
          { type: 'choice', q: '___ moon is beautiful tonight.', options: ['A', 'The', '—'], a: 'The' },
          { type: 'choice', q: 'My mother is ___ doctor.', options: ['a', 'an', 'the'], a: 'a' },
          { type: 'choice', q: 'I love ___ coffee.', options: ['a', 'the', '—'], a: '—' },
          { type: 'choice', q: 'We found a hotel. ___ hotel was cheap.', options: ['A', 'The', '—'], a: 'The' },
          { type: 'choice', q: 'Wait ___ hour, please.', options: ['a', 'an', 'the'], a: 'an' }
        ]
      },
      {
        id: 'comparatives', title: 'Степени сравнения',
        theory: `<p>Короткие прилагательные: <b>-er / the -est</b> — <i>cheap → cheaper → the cheapest; big → bigger → the biggest; easy → easier → the easiest</i>.</p>
<p>Длинные: <b>more / the most</b> — <i>interesting → more interesting → the most interesting</i>.</p>
<p>Исключения: <i>good → better → the best; bad → worse → the worst; far → further → the furthest</i>.</p>
<p>Сравнение: <i>My bag is heavier <b>than</b> yours. — Моя сумка тяжелее, <b>чем</b> твоя.</i></p>`,
        exercises: [
          { type: 'input', q: 'This hotel is ___ (cheap) than that one.', a: 'cheaper' },
          { type: 'choice', q: 'It was ___ day of my life!', options: ['the best', 'the goodest', 'better'], a: 'the best' },
          { type: 'input', q: 'English is ___ (easy) than Chinese.', a: 'easier' },
          { type: 'choice', q: 'This book is ___ than the film.', options: ['interestinger', 'more interesting', 'most interesting'], a: 'more interesting' },
          { type: 'input', q: 'Today the weather is ___ (bad) than yesterday.', a: 'worse' }
        ]
      },
      {
        id: 'modals', title: 'Модальные глаголы can, must, should',
        theory: `<p><b>can</b> — умею / могу: <i>I <b>can</b> swim. <b>Can</b> you help me?</i> Отрицание — <b>can't</b>.</p>
<p><b>must</b> — должен (внутренняя необходимость, правило): <i>You <b>must</b> wear a seat belt.</i> <b>mustn't</b> — нельзя.</p>
<p><b>should</b> — следует, совет: <i>You <b>should</b> sleep more.</i></p>
<p>После модальных глаголов — глагол без <i>to</i> и без -s: <i>She can <b>speak</b> French</i>, а не <s>can speaks</s>.</p>`,
        exercises: [
          { type: 'choice', q: 'She ___ speak three languages.', options: ['can', 'cans', 'can to'], a: 'can' },
          { type: 'choice', q: 'You look tired. You ___ go to bed.', options: ['should', 'can', "mustn't"], a: 'should' },
          { type: 'choice', q: 'You ___ smoke here. It\'s forbidden.', options: ["mustn't", "don't must", "shouldn't to"], a: "mustn't" },
          { type: 'choice', q: 'He can ___ the guitar.', options: ['play', 'plays', 'to play'], a: 'play' },
          { type: 'input', q: 'I ___ (can, отрицание) find my keys!', a: "can't/cannot/can not" }
        ]
      }
    ]
  }
];

// Курсы B1–C1 — после базовых
COURSES.push(...ADV_COURSES);

export const ALL_LESSONS = COURSES.flatMap(c => c.lessons.map(l => ({ ...l, course: c.id })));
