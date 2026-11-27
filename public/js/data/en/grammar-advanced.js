// Грамматика английского B1–C1: курсы для перехода на продвинутый уровень. Тексты и примеры написаны для Лингвы.
// Тип упражнения: choice (выбрать вариант) или input (вписать ответ; допустимые варианты через "/").
export const ADV_COURSES = [
  {
    id: 'b1-perfect', title: 'Перфект, условия и пассив', level: 'B1',
    lessons: [
      {
        id: 'present-perfect', title: 'Present Perfect или Past Simple',
        theory: `<p><b>Present Perfect</b> (<b>have / has + третья форма</b>) связывает прошлое с настоящим: важен результат или опыт, а не время. <i>I <b>have lost</b> my keys</i> (их нет сейчас). <i>She <b>has been</b> to Japan twice</i> (опыт).</p>
<p><b>Past Simple</b> — законченное действие в известный момент прошлого: <i>I <b>lost</b> my keys yesterday.</i></p>
<p>Подсказки Present Perfect: <i>already, yet, just, ever, never, so far, since, for</i>. Подсказки Past Simple: <i>yesterday, last year, ago, in 2015, when I was a child</i>.</p>
<p><b>since</b> — с момента (<i>since 2020, since Monday</i>), <b>for</b> — в течение (<i>for three years</i>): <i>We <b>have lived</b> here <b>for</b> ten years.</i></p>`,
        exercises: [
          { type: 'choice', q: 'I ___ this film three times.', options: ['have seen', 'saw', 'see'], a: 'have seen' },
          { type: 'choice', q: 'We ___ to Rome last summer.', options: ['have gone', 'went', 'have been'], a: 'went' },
          { type: 'choice', q: 'She has worked here ___ 2019.', options: ['for', 'since', 'ago'], a: 'since' },
          { type: 'input', q: 'They ___ (not / finish) the project yet.', a: "haven't finished/have not finished" },
          { type: 'choice', q: '___ you ever eaten sushi?', options: ['Did', 'Have', 'Were'], a: 'Have' },
          { type: 'input', q: 'He ___ (live) in London for five years, and he still lives there.', a: "has lived/'s lived/has been living" }
        ]
      },
      {
        id: 'past-continuous-perfect', title: 'Past Continuous и Past Perfect',
        theory: `<p><b>Past Continuous</b> (<b>was / were + -ing</b>) — процесс в прошлом, фон для другого события: <i>I <b>was reading</b> when the phone rang.</i></p>
<p><b>Past Perfect</b> (<b>had + третья форма</b>) — действие, которое случилось <b>раньше</b> другого прошлого действия: <i>When we arrived, the film <b>had</b> already <b>started</b>.</i></p>
<p>Сравните: <i>When I came, she <b>left</b></i> (сначала пришёл я, потом ушла она) и <i>When I came, she <b>had left</b></i> (она ушла до моего прихода).</p>`,
        exercises: [
          { type: 'choice', q: 'While I ___ dinner, the lights went out.', options: ['cooked', 'was cooking', 'had cooked'], a: 'was cooking' },
          { type: 'choice', q: 'By the time the police arrived, the thief ___.', options: ['escaped', 'was escaping', 'had escaped'], a: 'had escaped' },
          { type: 'input', q: 'I was tired because I ___ (not / sleep) the night before.', a: "hadn't slept/had not slept" },
          { type: 'choice', q: 'What ___ you doing at eight o\'clock last night?', options: ['did', 'were', 'had'], a: 'were' },
          { type: 'input', q: 'She realised that she ___ (forget) her passport.', a: "had forgotten/'d forgotten" },
          { type: 'choice', q: 'It ___ when we left the café.', options: ['was raining', 'had rained', 'rains'], a: 'was raining' }
        ]
      },
      {
        id: 'conditionals-1-2', title: 'Условные предложения: первый и второй тип',
        theory: `<p><b>Первый тип</b> — реальное условие в будущем: <b>if + Present Simple, will + глагол</b>. <i>If it <b>rains</b>, we <b>will stay</b> at home.</i> После <b>if</b> и <b>when</b> будущее время не ставится!</p>
<p><b>Второй тип</b> — нереальное или маловероятное условие сейчас: <b>if + Past Simple, would + глагол</b>. <i>If I <b>had</b> more time, I <b>would learn</b> Japanese.</i> (Но времени нет.)</p>
<p>Во втором типе с <i>I / he / she</i> часто употребляют <b>were</b>: <i>If I <b>were</b> you, I would apologise.</i></p>
<p><b>unless</b> = if … not: <i>We'll be late <b>unless</b> we hurry.</i></p>`,
        exercises: [
          { type: 'choice', q: 'If you heat ice, it ___.', options: ['melts', 'would melt', 'melted'], a: 'melts' },
          { type: 'choice', q: 'If she ___ the train, she will be here at six.', options: ['will catch', 'catches', 'caught'], a: 'catches' },
          { type: 'input', q: 'If I ___ (be) rich, I would travel around the world.', a: 'were/was' },
          { type: 'choice', q: 'What would you do if you ___ a million pounds?', options: ['win', 'won', 'will win'], a: 'won' },
          { type: 'input', q: 'If we leave now, we ___ (catch) the last bus.', a: "will catch/'ll catch" },
          { type: 'choice', q: "I won't go ___ you come with me.", options: ['if', 'unless', 'when'], a: 'unless' }
        ]
      },
      {
        id: 'passive', title: 'Страдательный залог',
        theory: `<p><b>Пассив</b> нужен, когда важно действие или его объект, а не тот, кто его совершил: <i>The bridge <b>was built</b> in 1890.</i></p>
<p>Формула: <b>be в нужном времени + третья форма</b>. <i>English <b>is spoken</b> here. The letters <b>were sent</b> yesterday. The room <b>has been cleaned</b>. The results <b>will be published</b> tomorrow.</i></p>
<p>Исполнителя вводим через <b>by</b>, если он важен: <i>The novel was written <b>by</b> Orwell.</i></p>
<p>С модальными: <b>modal + be + третья форма</b> — <i>This form <b>must be signed</b>.</i></p>`,
        exercises: [
          { type: 'choice', q: 'Paper ___ from wood.', options: ['makes', 'is made', 'made'], a: 'is made' },
          { type: 'input', q: 'The museum ___ (open) in 1902.', a: 'was opened' },
          { type: 'choice', q: 'Our flat ___ painted at the moment.', options: ['is being', 'has', 'is been'], a: 'is being' },
          { type: 'input', q: 'The new hospital ___ (build) next year. (will)', a: 'will be built' },
          { type: 'choice', q: 'All tickets ___ sold. There are none left.', options: ['have been', 'were being', 'are'], a: 'have been' },
          { type: 'choice', q: 'This medicine must ___ after meals.', options: ['take', 'be taken', 'been taken'], a: 'be taken' }
        ]
      },
      {
        id: 'gerund-infinitive', title: 'Герундий или инфинитив',
        theory: `<p>После одних глаголов идёт <b>-ing</b>: <i>enjoy, avoid, finish, mind, suggest, keep, consider, give up</i> — <i>I enjoy <b>reading</b>.</i></p>
<p>После других — <b>to + глагол</b>: <i>want, decide, hope, plan, promise, refuse, afford, manage</i> — <i>We decided <b>to leave</b>.</i></p>
<p>После предлогов — всегда <b>-ing</b>: <i>I'm interested <b>in learning</b>. Thank you <b>for helping</b>.</i></p>
<p>Смысл меняется: <i>I <b>stopped smoking</b></i> (бросил курить) — <i>I <b>stopped to smoke</b></i> (остановился, чтобы покурить); <i><b>remember doing</b></i> (помнить, что делал) — <i><b>remember to do</b></i> (не забыть сделать).</p>`,
        exercises: [
          { type: 'choice', q: 'Would you mind ___ the window?', options: ['to open', 'opening', 'open'], a: 'opening' },
          { type: 'choice', q: 'We can\'t afford ___ a new car.', options: ['buying', 'to buy', 'buy'], a: 'to buy' },
          { type: 'input', q: 'She is good at ___ (draw).', a: 'drawing' },
          { type: 'choice', q: 'Please remember ___ the door when you leave.', options: ['locking', 'to lock', 'lock'], a: 'to lock' },
          { type: 'choice', q: 'He finally gave up ___.', options: ['to smoke', 'smoking', 'smoke'], a: 'smoking' },
          { type: 'input', q: 'They refused ___ (answer) my questions.', a: 'to answer' }
        ]
      }
    ]
  },
  {
    id: 'b2-tenses', title: 'Сложные времена, косвенная речь и придаточные', level: 'B2',
    lessons: [
      {
        id: 'perfect-continuous', title: 'Present Perfect Continuous',
        theory: `<p><b>have / has been + -ing</b> — действие началось в прошлом и длится до сих пор (или только что закончилось, и виден след): <i>I<b>'ve been waiting</b> for an hour. Your eyes are red. <b>Have</b> you <b>been crying</b>?</i></p>
<p>Сравните с Present Perfect: Continuous подчёркивает <b>процесс и длительность</b>, Simple — <b>результат и количество</b>. <i>I've been writing emails all morning</i> — <i>I've written ten emails.</i></p>
<p>Глаголы состояния (<i>know, believe, own, like</i>) в Continuous не ставятся: <i>I <b>have known</b> her for years</i>, а не <s>have been knowing</s>.</p>`,
        exercises: [
          { type: 'choice', q: 'She\'s exhausted. She ___ all day.', options: ['has worked', 'has been working', 'worked'], a: 'has been working' },
          { type: 'choice', q: 'I ___ three chapters so far.', options: ['have read', 'have been reading', 'read'], a: 'have read' },
          { type: 'input', q: 'How long have you ___ (learn) English?', a: 'been learning' },
          { type: 'choice', q: 'We ___ each other since school.', options: ['have been knowing', 'have known', 'know'], a: 'have known' },
          { type: 'input', q: 'It ___ (rain) since the morning, and the streets are flooded.', a: "has been raining/'s been raining" },
          { type: 'choice', q: 'Sorry I\'m late. ___ long?', options: ['Have you been waiting', 'Did you wait', 'Are you waiting'], a: 'Have you been waiting' }
        ]
      },
      {
        id: 'future-perfect', title: 'Future Continuous и Future Perfect',
        theory: `<p><b>Future Continuous</b> (<b>will be + -ing</b>) — процесс в определённый момент будущего: <i>This time tomorrow I <b>will be flying</b> to Tokyo.</i> Ещё — вежливый вопрос о планах: <i><b>Will</b> you <b>be using</b> the car tonight?</i></p>
<p><b>Future Perfect</b> (<b>will have + третья форма</b>) — действие завершится <b>к</b> моменту в будущем: <i>By 2030 they <b>will have finished</b> the new line.</i> Подсказки: <i>by, by the time, before</i>.</p>
<p>После <i>by the time, when, before</i> в придаточном — настоящее время: <i>By the time you <b>arrive</b>, we'll have eaten.</i></p>`,
        exercises: [
          { type: 'choice', q: 'Don\'t call at nine — we ___ dinner.', options: ['will have', 'will be having', 'have'], a: 'will be having' },
          { type: 'choice', q: 'By next June I ___ from university.', options: ['will graduate', 'will have graduated', 'graduate'], a: 'will have graduated' },
          { type: 'input', q: 'By the time you get home, I ___ (cook) dinner.', a: "will have cooked/'ll have cooked" },
          { type: 'choice', q: 'This time next week we ___ on the beach.', options: ['will lie', 'will be lying', 'will have lain'], a: 'will be lying' },
          { type: 'choice', q: 'By the time she ___, the meeting will have ended.', options: ['will arrive', 'arrives', 'arrived'], a: 'arrives' },
          { type: 'input', q: 'In ten years, scientists ___ (find) a cure. (Future Perfect)', a: 'will have found' }
        ]
      },
      {
        id: 'third-conditional', title: 'Третий тип условных предложений',
        theory: `<p><b>Третий тип</b> — нереальное условие в прошлом, сожаление о том, чего уже не изменить: <b>if + had + третья форма, would have + третья форма</b>.</p>
<p><i>If I <b>had known</b> about the party, I <b>would have come</b>.</i> — Если бы я знал о вечеринке, я бы пришёл (но не знал и не пришёл).</p>
<p>Вместо would можно <b>could have / might have</b>: <i>If we had left earlier, we <b>might have caught</b> the train.</i></p>
<p>Не путайте: <b>'d</b> в части с if — это <b>had</b>, в главной части — <b>would</b>: <i>If I<b>'d</b> seen him, I<b>'d</b> have told him.</i></p>`,
        exercises: [
          { type: 'choice', q: 'If you had asked me, I ___ you.', options: ['would help', 'would have helped', 'had helped'], a: 'would have helped' },
          { type: 'input', q: 'If she ___ (study) harder, she would have passed the exam.', a: "had studied/'d studied" },
          { type: 'choice', q: 'We ___ the match if our goalkeeper hadn\'t been injured.', options: ['would have won', 'would win', 'won'], a: 'would have won' },
          { type: 'input', q: 'If I ___ (not / miss) the bus, I wouldn\'t have been late.', a: "hadn't missed/had not missed" },
          { type: 'choice', q: 'If they had left earlier, they ___ the traffic.', options: ['might avoid', 'might have avoided', 'had avoided'], a: 'might have avoided' },
          { type: 'choice', q: 'He would have called you if he ___ your number.', options: ['had had', 'would have', 'has'], a: 'had had' }
        ]
      },
      {
        id: 'reported-speech', title: 'Косвенная речь',
        theory: `<p>Когда пересказываем чужие слова после глагола в прошедшем (<i>said, told, asked</i>), время «сдвигается на шаг назад»: <i>"I <b>am</b> tired" → She said (that) she <b>was</b> tired. "We <b>have finished</b>" → They said they <b>had finished</b>. "I <b>will</b> call" → He said he <b>would</b> call.</i></p>
<p>Меняются и указатели: <i>now → then, today → that day, tomorrow → the next day, here → there, this → that</i>.</p>
<p>Вопросы — с прямым порядком слов и без do: <i>"Where <b>do you live</b>?" → She asked where <b>I lived</b>. "<b>Are</b> you OK?" → He asked <b>if / whether</b> I was OK.</i></p>
<p><b>say</b> — без дополнения (<i>said that</i>), <b>tell</b> — с ним (<i>told <b>me</b> that</i>). Просьбы: <i>He asked me <b>to wait</b>.</i></p>`,
        exercises: [
          { type: 'choice', q: '"I love this city," she said. → She said she ___ that city.', options: ['loves', 'loved', 'has loved'], a: 'loved' },
          { type: 'choice', q: 'He ___ me that he was leaving.', options: ['said', 'told', 'asked'], a: 'told' },
          { type: 'input', q: '"I will help you." → He promised that he ___ help me.', a: 'would' },
          { type: 'choice', q: '"Where is the station?" → She asked me where ___.', options: ['is the station', 'the station was', 'was the station'], a: 'the station was' },
          { type: 'choice', q: '"Do you speak French?" → They asked ___ I spoke French.', options: ['that', 'if', 'do'], a: 'if' },
          { type: 'input', q: '"Please close the door." → She asked me ___ the door.', a: 'to close' }
        ]
      },
      {
        id: 'relative-clauses', title: 'Определительные придаточные',
        theory: `<p><b>who</b> — о людях, <b>which</b> — о предметах, <b>that</b> — о тех и других (в определяющих придаточных), <b>whose</b> — «чей», <b>where</b> — «где», <b>when</b> — «когда».</p>
<p><b>Определяющее</b> придаточное нужно, чтобы понять, о ком речь, запятых нет: <i>The woman <b>who lives next door</b> is a doctor.</i> Если местоимение — дополнение, его можно опустить: <i>The book (that) I bought is great.</i></p>
<p><b>Неопределяющее</b> добавляет информацию, выделяется запятыми, <b>that</b> в нём нельзя: <i>My brother, <b>who lives in Oslo</b>, is visiting us.</i></p>
<p><b>which</b> может относиться ко всему предложению: <i>He didn't call, <b>which</b> was strange.</i></p>`,
        exercises: [
          { type: 'choice', q: 'That\'s the man ___ car was stolen.', options: ['who', 'whose', 'which'], a: 'whose' },
          { type: 'choice', q: 'Paris, ___ is the capital of France, attracts millions of tourists.', options: ['that', 'which', 'where'], a: 'which' },
          { type: 'choice', q: 'This is the café ___ we first met.', options: ['which', 'where', 'that'], a: 'where' },
          { type: 'input', q: 'The people ___ work here are very friendly. (о людях)', a: 'who/that' },
          { type: 'choice', q: 'She passed all her exams, ___ surprised everyone.', options: ['that', 'which', 'what'], a: 'which' },
          { type: 'choice', q: 'I\'ll never forget the day ___ I got my first job.', options: ['when', 'which', 'who'], a: 'when' }
        ]
      },
      {
        id: 'modals-deduction', title: 'Модальные глаголы догадки: must have, can\'t have',
        theory: `<p>Уверенность о настоящем: <b>must</b> (наверняка), <b>might / may / could</b> (возможно), <b>can't</b> (не может быть). <i>He <b>must</b> be at home — the lights are on.</i></p>
<p>О прошлом — <b>modal + have + третья форма</b>: <i>She <b>must have forgotten</b></i> (наверняка забыла). <i>They <b>might have missed</b> the train</i> (возможно, опоздали). <i>He <b>can't have seen</b> us</i> (не может быть, что он нас видел).</p>
<p><b>should have + третья форма</b> — упрёк или сожаление: <i>You <b>should have told</b> me! (Надо было сказать.)</i></p>`,
        exercises: [
          { type: 'choice', q: 'The ground is wet. It ___ rained last night.', options: ['must have', "can't have", 'should have'], a: 'must have' },
          { type: 'choice', q: 'She ___ have written this — she doesn\'t speak German.', options: ['must', "can't", 'might'], a: "can't" },
          { type: 'input', q: 'I\'m not sure where he is. He ___ have gone to the gym. (возможно)', a: 'might/may/could' },
          { type: 'choice', q: 'You ___ have told me about the meeting! I missed it.', options: ['should', 'must', 'can'], a: 'should' },
          { type: 'choice', q: 'He looks exhausted. He ___ be working too hard.', options: ['must', "can't", 'should have'], a: 'must' },
          { type: 'input', q: 'They ___ (not / can) have finished already — they only started an hour ago.', a: "can't/cannot/couldn't" }
        ]
      }
    ]
  },
  {
    id: 'b2-usage', title: 'Желания, привычки и связки', level: 'B2',
    lessons: [
      {
        id: 'wish', title: 'I wish и If only',
        theory: `<p>Сожаление о <b>настоящем</b>: <b>wish + Past Simple</b> — <i>I <b>wish</b> I <b>had</b> more free time</i> (жаль, что у меня нет). С be — <b>were</b>: <i>I wish I <b>were</b> taller.</i></p>
<p>Сожаление о <b>прошлом</b>: <b>wish + Past Perfect</b> — <i>I <b>wish</b> I <b>had studied</b> harder at school.</i></p>
<p>Раздражение чужим поведением и желание перемен: <b>wish + would</b> — <i>I <b>wish</b> you <b>would stop</b> interrupting me.</i> О себе так не говорят.</p>
<p><b>If only</b> — то же, но эмоциональнее: <i><b>If only</b> I had listened to you!</i></p>`,
        exercises: [
          { type: 'choice', q: 'I wish I ___ how to swim.', options: ['know', 'knew', 'would know'], a: 'knew' },
          { type: 'choice', q: 'She wishes she ___ that dress. It was a waste of money.', options: ["didn't buy", "hadn't bought", "wouldn't buy"], a: "hadn't bought" },
          { type: 'input', q: 'I wish it ___ (stop) raining! (раздражение)', a: 'would stop' },
          { type: 'choice', q: 'If only I ___ rich!', options: ['am', 'were', 'will be'], a: 'were' },
          { type: 'input', q: 'I wish I ___ (go) to the concert last night. Everyone says it was amazing.', a: "had gone/'d gone" },
          { type: 'choice', q: 'I wish my neighbours ___ so much noise.', options: ["wouldn't make", "don't make", "won't make"], a: "wouldn't make" }
        ]
      },
      {
        id: 'causative', title: 'Have something done',
        theory: `<p>Когда действие за нас выполняет кто-то другой (обычно за плату), говорим <b>have + предмет + третья форма</b>: <i>I <b>had my hair cut</b> yesterday</i> — Я подстригся (в парикмахерской).</p>
<p>Время показывает глагол <b>have</b>: <i>We <b>are having</b> the kitchen <b>painted</b>. She <b>has had</b> her car <b>repaired</b>. I <b>will have</b> it <b>delivered</b>.</i></p>
<p>Разговорный вариант — <b>get something done</b>: <i>You should <b>get</b> your eyes <b>tested</b>.</i></p>
<p>Ещё значение — неприятность, которая с нами случилась: <i>He <b>had his wallet stolen</b> on the train.</i></p>`,
        exercises: [
          { type: 'choice', q: 'I\'m going to have my car ___ tomorrow.', options: ['wash', 'washed', 'washing'], a: 'washed' },
          { type: 'input', q: 'We ___ the roof repaired last week. (have)', a: 'had' },
          { type: 'choice', q: 'She ___ her portrait painted at the moment.', options: ['has', 'is having', 'had'], a: 'is having' },
          { type: 'input', q: 'You should get your teeth ___ (check).', a: 'checked' },
          { type: 'choice', q: 'He had his phone ___ while he was asleep on the train.', options: ['stole', 'stolen', 'stealing'], a: 'stolen' },
          { type: 'choice', q: 'Where do you usually ___ your hair cut?', options: ['have', 'make', 'do'], a: 'have' }
        ]
      },
      {
        id: 'used-to-adv', title: 'Used to, be used to, get used to',
        theory: `<p><b>used to + глагол</b> — привычка или состояние в прошлом, которых больше нет: <i>I <b>used to live</b> in Kazan.</i> Вопрос и отрицание: <i>Did you <b>use to</b> …? I didn't <b>use to</b> …</i></p>
<p><b>would + глагол</b> — тоже повторяющееся действие в прошлом (но не состояние): <i>Every summer we <b>would go</b> to the sea.</i></p>
<p><b>be used to + -ing / существительное</b> — привык: <i>I <b>am used to getting up</b> early.</i></p>
<p><b>get used to + -ing</b> — привыкать (процесс): <i>It took me a year to <b>get used to driving</b> on the left.</i></p>`,
        exercises: [
          { type: 'choice', q: 'I ___ smoke, but I gave up five years ago.', options: ['used to', 'am used to', 'would'], a: 'used to' },
          { type: 'choice', q: 'She is used to ___ in a noisy office.', options: ['work', 'working', 'worked'], a: 'working' },
          { type: 'input', q: 'Did you ___ have long hair when you were a student?', a: 'use to' },
          { type: 'choice', q: 'Living abroad was hard at first, but I soon got used ___ it.', options: ['to', 'with', 'for'], a: 'to' },
          { type: 'choice', q: 'When I was a child, my grandmother ___ tell me stories every night.', options: ['would', 'was used to', 'got used to'], a: 'would' },
          { type: 'input', q: 'I can\'t get used to ___ (wake) up so early.', a: 'waking' }
        ]
      },
      {
        id: 'contrast-linking', title: 'Although, despite, whereas: связки противопоставления',
        theory: `<p><b>although / even though / though</b> + целое предложение: <i><b>Although</b> it was raining, we went out.</i> <b>even though</b> — сильнее, «хотя и».</p>
<p><b>despite / in spite of</b> + существительное или <b>-ing</b>: <i><b>Despite</b> the rain, we went out. <b>In spite of feeling</b> ill, she came to work.</i> С предложением — <b>despite the fact that</b>.</p>
<p><b>however / nevertheless</b> начинают новое предложение и выделяются запятой: <i>The plan was risky. <b>However</b>, it worked.</i></p>
<p><b>whereas / while</b> — сопоставление двух фактов: <i>I love tea, <b>whereas</b> my wife prefers coffee.</i></p>`,
        exercises: [
          { type: 'choice', q: '___ the traffic, we arrived on time.', options: ['Although', 'Despite', 'However'], a: 'Despite' },
          { type: 'choice', q: '___ he had a map, he got lost.', options: ['Even though', 'In spite of', 'Despite'], a: 'Even though' },
          { type: 'choice', q: 'The hotel was expensive. ___, it was worth it.', options: ['Although', 'Whereas', 'Nevertheless'], a: 'Nevertheless' },
          { type: 'input', q: 'In spite ___ being tired, she finished the report.', a: 'of' },
          { type: 'choice', q: 'My brother is very sociable, ___ I am quite shy.', options: ['whereas', 'despite', 'however'], a: 'whereas' },
          { type: 'choice', q: 'Despite ___ hard, he failed the test.', options: ['he studied', 'studying', 'to study'], a: 'studying' }
        ]
      }
    ]
  },
  {
    id: 'c1-structures', title: 'Продвинутые конструкции', level: 'C1',
    lessons: [
      {
        id: 'mixed-conditionals', title: 'Смешанные условные предложения',
        theory: `<p>Смешанные условия соединяют разные времена в двух частях.</p>
<p><b>Прошлое условие → результат сейчас</b>: <b>if + had + третья форма, would + глагол</b>. <i>If I <b>had taken</b> that job, I <b>would be living</b> in Berlin now.</i></p>
<p><b>Постоянное свойство → результат в прошлом</b>: <b>if + Past Simple, would have + третья форма</b>. <i>If she <b>were</b> more patient, she <b>wouldn't have shouted</b> at him yesterday.</i></p>
<p>Вместо if в книжной речи — <b>but for / were it not for</b>: <i><b>But for</b> your help, I would have failed.</i></p>`,
        exercises: [
          { type: 'choice', q: 'If I had saved more money, I ___ a car now.', options: ['would have', 'would have had', 'had'], a: 'would have' },
          { type: 'choice', q: 'If he weren\'t so stubborn, he ___ our advice last week.', options: ['would take', 'would have taken', 'took'], a: 'would have taken' },
          { type: 'input', q: 'If you ___ (not / stay) up so late, you wouldn\'t be so tired now.', a: "hadn't stayed/had not stayed" },
          { type: 'choice', q: '___ your help, I would never have finished on time.', options: ['But for', 'Unless', 'Provided'], a: 'But for' },
          { type: 'choice', q: 'If I spoke Spanish, I ___ the job in Madrid last year.', options: ['would get', 'would have got', 'got'], a: 'would have got' },
          { type: 'input', q: 'If we had booked earlier, we ___ (sit) in the front row now. (would + be + -ing)', a: 'would be sitting' }
        ]
      },
      {
        id: 'inversion', title: 'Инверсия для усиления',
        theory: `<p>В книжной и эмоциональной речи после отрицательных и ограничительных наречий в начале предложения ставится <b>обратный порядок слов, как в вопросе</b>.</p>
<p><i><b>Never have I seen</b> such a beautiful sunset. <b>Rarely does</b> he admit his mistakes. <b>Not only did</b> she win, <b>but</b> she also broke the record.</i></p>
<p>Устойчивые пары: <b>Hardly / Scarcely … when</b>, <b>No sooner … than</b> — «едва… как»: <i><b>No sooner had</b> we sat down <b>than</b> the phone rang.</i></p>
<p><b>Only then / Only after / Not until</b> — инверсия в главной части: <i><b>Not until</b> I got home <b>did I realise</b> I had lost my wallet.</i></p>
<p>Условия без if: <i><b>Had I known</b>, I would have come. <b>Should you need</b> help, call me. <b>Were I</b> you, I'd accept.</i></p>`,
        exercises: [
          { type: 'choice', q: 'Never ___ such a delicious meal.', options: ['I have eaten', 'have I eaten', 'I ate'], a: 'have I eaten' },
          { type: 'choice', q: 'No sooner had we arrived ___ it started to rain.', options: ['when', 'than', 'that'], a: 'than' },
          { type: 'input', q: '___ I known about the problem, I would have helped. (одно слово)', a: 'had' },
          { type: 'choice', q: 'Not only ___ late, but he also forgot the tickets.', options: ['he was', 'was he', 'did he'], a: 'was he' },
          { type: 'choice', q: 'Rarely ___ such talent in someone so young.', options: ['we see', 'do we see', 'we do see'], a: 'do we see' },
          { type: 'choice', q: '___ you have any questions, please contact our office.', options: ['Should', 'Would', 'Had'], a: 'Should' }
        ]
      },
      {
        id: 'cleft', title: 'Выделение: It is … that, What … is',
        theory: `<p><b>It-cleft</b> выделяет одну часть предложения: <i>Tom broke the window → <b>It was Tom who</b> broke the window</i> (именно Том). <i><b>It was in 2010 that</b> they met.</i></p>
<p><b>What-cleft</b> выносит важное в конец: <i>I need a holiday → <b>What I need is</b> a holiday.</i> <i><b>What surprised me was</b> his reaction.</i></p>
<p>С действием: <i><b>What she did was (to) call</b> the police.</i></p>
<p>Похожие обороты: <i><b>All I want is</b> some peace. <b>The reason (why)</b> I left <b>was</b> the salary. <b>The thing that</b> annoys me <b>is</b> the noise.</i></p>`,
        exercises: [
          { type: 'choice', q: 'It was my sister ___ told me the news.', options: ['who', 'what', 'which'], a: 'who' },
          { type: 'choice', q: '___ I really need is a good night\'s sleep.', options: ['That', 'What', 'It'], a: 'What' },
          { type: 'input', q: 'It was in Paris ___ they first met.', a: 'that' },
          { type: 'choice', q: 'What annoys me ___ the constant noise.', options: ['is', 'it is', 'that'], a: 'is' },
          { type: 'choice', q: 'All I want ___ a quiet life.', options: ['is', 'are', 'that'], a: 'is' },
          { type: 'input', q: 'What he did ___ to resign. (глагол-связка)', a: 'was' }
        ]
      },
      {
        id: 'participle-clauses', title: 'Причастные обороты',
        theory: `<p>Причастные обороты сокращают придаточные и делают текст плотнее — как русские деепричастные и причастные обороты.</p>
<p><b>-ing</b> — одновременное действие или причина: <i><b>Feeling</b> tired, I went to bed early</i> (= Because I felt tired…).</p>
<p><b>Having + третья форма</b> — действие произошло раньше: <i><b>Having finished</b> the report, she went home.</i></p>
<p><b>Третья форма</b> — пассивное значение: <i><b>Built</b> in 1890, the bridge is still in use. The ideas <b>discussed</b> at the meeting were rejected.</i></p>
<p>Подлежащее оборота и главного предложения должно совпадать: <s>Walking down the street, the rain started</s> — ошибка.</p>`,
        exercises: [
          { type: 'choice', q: '___ the email, he realised he had made a mistake.', options: ['Having sent', 'Sent', 'Having been sent'], a: 'Having sent' },
          { type: 'choice', q: '___ in 1605, the novel is still widely read.', options: ['Writing', 'Written', 'Having written'], a: 'Written' },
          { type: 'input', q: '___ (not / know) what to say, she remained silent.', a: 'not knowing' },
          { type: 'choice', q: 'The man ___ next to me on the plane was a famous actor.', options: ['sat', 'sitting', 'having sat'], a: 'sitting' },
          { type: 'choice', q: 'Most of the goods ___ in this factory are exported.', options: ['producing', 'produced', 'having produced'], a: 'produced' },
          { type: 'input', q: '___ (live) abroad for years, he found it hard to return home. (Having …)', a: 'having lived' }
        ]
      },
      {
        id: 'impersonal-passive', title: 'It is said that, he is believed to',
        theory: `<p>Чтобы передать мнение без указания источника, в новостях и статьях используют безличный пассив с глаголами <i>say, believe, think, report, expect, know, consider</i>.</p>
<p><b>It + is said + that …</b>: <i><b>It is believed that</b> the painting is a fake.</i></p>
<p><b>Подлежащее + is said + to + глагол</b>: <i>The painting <b>is believed to be</b> a fake.</i></p>
<p>О прошлом — <b>to have + третья форма</b>: <i>The thieves <b>are thought to have escaped</b> abroad.</i> О процессе — <b>to be + -ing</b>: <i>He <b>is said to be working</b> on a new book.</i></p>`,
        exercises: [
          { type: 'choice', q: 'It ___ that the company will close next year.', options: ['is expected', 'expects', 'is expecting'], a: 'is expected' },
          { type: 'choice', q: 'The president is said ___ the country tomorrow.', options: ['to leave', 'leaving', 'that he leaves'], a: 'to leave' },
          { type: 'input', q: 'The castle is believed ___ (build) in the 12th century. (to have …)', a: 'to have been built' },
          { type: 'choice', q: 'He is thought ___ a fortune on the stock market last year.', options: ['to make', 'to have made', 'making'], a: 'to have made' },
          { type: 'choice', q: 'The singer is reported ___ on a new album at the moment.', options: ['to work', 'to be working', 'to have worked'], a: 'to be working' },
          { type: 'input', q: '___ is known that smoking causes cancer. (одно слово)', a: 'it' }
        ]
      },
      {
        id: 'subjunctive', title: 'It\'s time, would rather и сослагательное наклонение',
        theory: `<p><b>It's (high / about) time + Past Simple</b> — «давно пора»: <i>It's time we <b>left</b>. It's high time you <b>got</b> a job.</i></p>
<p><b>would rather</b>: о себе — с инфинитивом без to (<i>I'd rather <b>stay</b> at home</i>), о другом человеке — с Past Simple (<i>I'd rather you <b>didn't smoke</b> here</i>).</p>
<p>После <i>suggest, recommend, insist, demand, it is essential / vital that</i> в официальном стиле ставится <b>глагол без окончаний (subjunctive)</b>: <i>The doctor recommended that he <b>stop</b> smoking. It is vital that everyone <b>be</b> on time.</i> В британском английском возможно <b>should + глагол</b>.</p>
<p>Устойчивые обороты: <i>as it <b>were</b> (так сказать), <b>be</b> that as it may (как бы то ни было), God <b>save</b> the King</i>.</p>`,
        exercises: [
          { type: 'choice', q: 'It\'s high time you ___ to bed.', options: ['go', 'went', 'will go'], a: 'went' },
          { type: 'choice', q: 'I\'d rather you ___ anyone about this.', options: ["don't tell", "didn't tell", "not tell"], a: "didn't tell" },
          { type: 'choice', q: 'The committee insisted that the report ___ published immediately.', options: ['is', 'be', 'was being'], a: 'be' },
          { type: 'input', q: 'I\'d rather ___ (walk) than take a taxi.', a: 'walk' },
          { type: 'choice', q: 'The lawyer suggested that she ___ the contract carefully.', options: ['reads', 'read', 'will read'], a: 'read' },
          { type: 'choice', q: 'Be that as it ___, we still need a decision.', options: ['may', 'might be', 'is'], a: 'may' }
        ]
      }
    ]
  },
  {
    id: 'c1-style', title: 'Стиль, акценты и словообразование', level: 'C1',
    lessons: [
      {
        id: 'emphasis', title: 'Усиление: do, the very, such и so',
        theory: `<p>Вспомогательный <b>do / does / did</b> в утвердительном предложении усиливает глагол: <i>I <b>do</b> like your dress! He <b>did</b> call, but you were out.</i> В повелительном — вежливая настойчивость: <i><b>Do</b> sit down.</i></p>
<p><b>the very</b> — «тот самый, именно»: <i>This is <b>the very</b> book I was looking for.</i></p>
<p><b>so + прилагательное / наречие</b>, <b>such (a) + прилагательное + существительное</b>: <i>It was <b>so</b> cold. It was <b>such a</b> cold day. They are <b>such</b> nice people.</i></p>
<p>Усилители и отрицания: <i><b>whatsoever</b> (no idea whatsoever), <b>at all</b>, <b>by far</b> (by far the best), <b>on earth</b> (What on earth…?)</i>.</p>`,
        exercises: [
          { type: 'choice', q: 'I know you think I forgot, but I ___ send the email!', options: ['did', 'have', 'was'], a: 'did' },
          { type: 'choice', q: 'It was ___ an interesting lecture that nobody left early.', options: ['so', 'such', 'very'], a: 'such' },
          { type: 'choice', q: 'The film was ___ boring that I fell asleep.', options: ['so', 'such', 'such a'], a: 'so' },
          { type: 'input', q: 'She is by ___ the best student in the class.', a: 'far' },
          { type: 'choice', q: 'What ___ earth are you doing?', options: ['in', 'on', 'at'], a: 'on' },
          { type: 'choice', q: 'That\'s the ___ man who sold me the fake watch!', options: ['very', 'such', 'so'], a: 'very' }
        ]
      },
      {
        id: 'ellipsis', title: 'Замены и пропуски: so, neither, one',
        theory: `<p>В живой речи англичане избегают повторов. Согласие с утверждением: <b>so + вспомогательный + подлежащее</b> — <i>I'm tired. — <b>So am I</b>.</i> С отрицанием: <b>neither / nor</b> — <i>I don't eat meat. — <b>Neither do I</b>.</i></p>
<p><b>one / ones</b> заменяют существительное: <i>I don't like the red dress, I prefer the blue <b>one</b>.</i></p>
<p><b>so / not</b> заменяют придаточное после <i>think, hope, expect, suppose, afraid</i>: <i>Will it rain? — I <b>hope not</b>. Is she coming? — I <b>think so</b>.</i></p>
<p>Можно опускать глагол после вспомогательного: <i>Have you finished? — Yes, I <b>have</b>. I'd help you if I <b>could</b>.</i></p>`,
        exercises: [
          { type: 'choice', q: 'I love jazz. — So ___ I.', options: ['am', 'do', 'have'], a: 'do' },
          { type: 'choice', q: 'She hasn\'t been to Africa. — Neither ___ I.', options: ['have', 'did', 'am'], a: 'have' },
          { type: 'choice', q: 'Is the shop open on Sunday? — I\'m afraid ___.', options: ['no', 'not', "don't"], a: 'not' },
          { type: 'input', q: 'These shoes are too small. Do you have bigger ___?', a: 'ones' },
          { type: 'choice', q: 'Will you be at the meeting? — I expect ___.', options: ['it', 'so', 'yes'], a: 'so' },
          { type: 'input', q: 'I wasn\'t ready, and ___ was my brother. (одно слово)', a: 'neither/nor' }
        ]
      },
      {
        id: 'hedging', title: 'Осторожные формулировки в эссе',
        theory: `<p>В академическом и деловом английском избегают категоричности — это называется <b>hedging</b>. Вместо <i>This proves that…</i> пишут <i>This <b>suggests</b> that…</i></p>
<p>Глаголы: <i><b>appear / seem / tend</b> to</i> — <i>Prices <b>tend to</b> rise in winter. The results <b>appear to</b> confirm the theory.</i></p>
<p>Модальные: <i>may, might, could</i> — <i>This <b>may well</b> be the reason.</i> Наречия: <i>arguably, possibly, presumably, to some extent, in most cases</i>.</p>
<p>Безличные обороты: <i><b>It could be argued that</b>… <b>There is some evidence that</b>… <b>It is likely that</b>…</i></p>`,
        exercises: [
          { type: 'choice', q: 'The data ___ that the policy has been successful.', options: ['proves', 'suggests', 'shows clearly'], a: 'suggests' },
          { type: 'choice', q: 'People ___ to spend more when they are in a good mood.', options: ['tend', 'must', 'are'], a: 'tend' },
          { type: 'input', q: 'It could be ___ that the experiment was too small. (argue)', a: 'argued' },
          { type: 'choice', q: 'This ___ well be the most important discovery of the decade.', options: ['may', 'will', 'must'], a: 'may' },
          { type: 'choice', q: 'The new method appears ___ more effective.', options: ['being', 'to be', 'be'], a: 'to be' },
          { type: 'choice', q: 'To some ___, the problem is caused by poor planning.', options: ['extent', 'degree of', 'part'], a: 'extent' }
        ]
      },
      {
        id: 'word-formation', title: 'Словообразование: приставки и суффиксы',
        theory: `<p>На уровне C1 важно уметь образовать нужную часть речи от знакомого корня.</p>
<p>Существительные: <b>-tion, -ment, -ness, -ity, -ance / -ence</b> — <i>decide → decision, achieve → achievement, aware → awareness, able → ability, perform → performance</i>.</p>
<p>Прилагательные: <b>-able / -ible, -ful, -less, -ous, -ive, -al</b> — <i>rely → reliable, hope → hopeful / hopeless, danger → dangerous, create → creative</i>.</p>
<p>Отрицательные приставки: <b>un-, in-, im-, il-, ir-, dis-, mis-</b> — <i>unlikely, inaccurate, impossible, illegal, irrelevant, disagree, misunderstand</i>. Ещё: <b>over-</b> (слишком: overestimate), <b>under-</b> (недо-: underpaid), <b>re-</b> (снова: rebuild).</p>`,
        exercises: [
          { type: 'input', q: 'There is a lack of public ___ about the problem. (aware)', a: 'awareness' },
          { type: 'input', q: 'It is ___ to drive without a licence. (legal)', a: 'illegal' },
          { type: 'choice', q: 'His explanation was completely ___ to the question.', options: ['unrelevant', 'irrelevant', 'disrelevant'], a: 'irrelevant' },
          { type: 'input', q: 'Her ___ in the final was outstanding. (perform)', a: 'performance' },
          { type: 'choice', q: 'I think you have ___ the difficulty of the task.', options: ['underestimated', 'misestimated', 'disestimated'], a: 'underestimated' },
          { type: 'input', q: 'This car is old but very ___. (rely)', a: 'reliable' }
        ]
      }
    ]
  }
];
