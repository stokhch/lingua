// Грамматика немецкого: теория по-русски + упражнения. Тексты написаны для Лингвы.
// Тип упражнения: choice (выбрать вариант) или input (вписать ответ; допустимы варианты через "/").
export const COURSES = [
  {
    id: 'de-start', title: 'Старт: читаем, здороваемся, считаем', level: 'A0',
    lessons: [
      {
        id: 'de-alphabet', title: 'Алфавит и чтение',
        theory: `<p>Немецкий пишется латиницей, и почти всегда слово читается так, как написано. Ударение обычно падает на <b>первый слог</b>: <i>Vater, Mutter, Abend</i>.</p>
<p>Буквы и сочетания, которые читаются не так, как в английском:</p>
<ul>
<li><b>ä, ö, ü</b> (умлауты) — «э», «ё» и «ю» без «й» в начале: <i>Käse</i> [кэзе] — сыр, <i>schön</i> — красивый, <i>fünf</i> — пять</li>
<li><b>ß</b> — долгое «с»: <i>Straße</i> [штрасе] — улица</li>
<li><b>ei</b> — «ай»: <i>drei</i> [драй] — три; <b>ie</b> — долгое «и»: <i>Bier</i> [бир] — пиво</li>
<li><b>eu, äu</b> — «ой»: <i>neu</i> [ной] — новый, <i>Häuser</i> — дома</li>
<li><b>sch</b> — «ш»: <i>Schule</i> [шуле] — школа; <b>tsch</b> — «ч»: <i>tschüss</i></li>
<li><b>st, sp</b> в начале слова — «шт», «шп»: <i>Stadt</i> [штат] — город, <i>spielen</i> [шпилен] — играть</li>
<li><b>ch</b> — «х» (мягкое после e, i: <i>ich</i> [ихь]; твёрдое после a, o, u: <i>Buch</i> [бух])</li>
<li><b>z</b> — «ц»: <i>zehn</i> [цейн] — десять; <b>w</b> — «в»: <i>Wasser</i> — вода; <b>v</b> — чаще «ф»: <i>Vater</i> [фатер]</li>
<li><b>j</b> — «й»: <i>ja</i> [я] — да; <b>h</b> после гласной не читается, а удлиняет её: <i>Bahn</i> [ба:н]</li>
</ul>
<p>Все существительные пишутся <b>с большой буквы</b>: <i>der Hund, das Haus, die Stadt</i>.</p>`,
        exercises: [
          { type: 'choice', q: 'Как читается «ei» в слове drei (три)?', options: ['ай', 'эй', 'и'], a: 'ай' },
          { type: 'choice', q: 'Как читается «ie» в слове Bier (пиво)?', options: ['долгое и', 'ие', 'ай'], a: 'долгое и' },
          { type: 'choice', q: 'Как читается «eu» в слове neu (новый)?', options: ['ой', 'эу', 'ю'], a: 'ой' },
          { type: 'choice', q: 'Как читается «sch» в слове Schule (школа)?', options: ['ш', 'сх', 'щ'], a: 'ш' },
          { type: 'choice', q: 'Как читается «z» в слове zehn (десять)?', options: ['ц', 'з', 'с'], a: 'ц' },
          { type: 'choice', q: 'Как читается «st» в начале слова Stadt (город)?', options: ['шт', 'ст', 'сш'], a: 'шт' },
          { type: 'choice', q: 'Какое слово пишется с большой буквы?', options: ['Haus', 'gut', 'drei'], a: 'Haus' },
          { type: 'input', q: 'Запишите по-немецки «улица» [штрасе]: ___', a: 'straße/strasse' }
        ]
      },
      {
        id: 'de-greetings', title: 'Приветствия и вежливость',
        theory: `<p><b>Hallo</b> — «привет», <b>Guten Tag</b> — «добрый день, здравствуйте». Утром — <b>Guten Morgen</b>, вечером — <b>Guten Abend</b>, перед сном — <b>Gute Nacht</b>.</p>
<p><b>Wie geht's?</b> — «Как дела?». Ответ: <b>Danke, gut. Und dir?</b> — «Спасибо, хорошо. А у тебя?». Вежливо: <i>Wie geht es Ihnen?</i> — <i>Danke, gut. Und Ihnen?</i></p>
<p><b>Danke</b> — «спасибо», в ответ — <b>Bitte</b> или <b>Bitte schön</b>. Слово <b>bitte</b> значит и «пожалуйста» в просьбе: <i>Einen Kaffee, bitte.</i></p>
<p>Прощаются словами <b>Tschüss</b> (по-дружески) и <b>Auf Wiedersehen</b> (вежливо). Ещё: <b>Bis bald</b> — «до скорого», <b>Bis morgen</b> — «до завтра», <b>Guten Appetit</b> — «приятного аппетита».</p>
<p><b>du</b> — «ты» (друзьям, детям, родным), <b>Sie</b> с большой буквы — вежливое «Вы».</p>`,
        exercises: [
          { type: 'choice', q: 'Утром вы говорите: ___ Morgen!', options: ['Guten', 'Gute', 'Gut'], a: 'Guten' },
          { type: 'choice', q: '— Danke! — ___ schön.', options: ['Bitte', 'Tschüss', 'Hallo'], a: 'Bitte' },
          { type: 'choice', q: 'Вежливо прощаетесь: Auf ___!', options: ['Wiedersehen', 'Morgen', 'Tag'], a: 'Wiedersehen' },
          { type: 'choice', q: '— Wie geht\'s? — Danke, ___.', options: ['gut', 'bitte', 'hallo'], a: 'gut' },
          { type: 'choice', q: 'Перед сном говорят: Gute ___!', options: ['Nacht', 'Abend', 'Tag'], a: 'Nacht' },
          { type: 'choice', q: 'Wie geht es ___? (вежливо)', options: ['Ihnen', 'dir', 'du'], a: 'Ihnen' },
          { type: 'input', q: 'По-дружески «пока»: ___', a: 'tschüss/tschüs' }
        ]
      },
      {
        id: 'de-numbers', title: 'Числа от 0 до 100',
        theory: `<p><b>0</b> null · <b>1</b> eins · <b>2</b> zwei · <b>3</b> drei · <b>4</b> vier · <b>5</b> fünf · <b>6</b> sechs · <b>7</b> sieben · <b>8</b> acht · <b>9</b> neun · <b>10</b> zehn · <b>11</b> elf · <b>12</b> zwölf</p>
<p>13–19: число + <b>-zehn</b>: <i>dreizehn, vierzehn, fünfzehn</i> (но <i>sechzehn, siebzehn</i>).</p>
<p>Десятки на <b>-zig</b>: <b>20</b> zwanzig · <b>30</b> dreißig · <b>40</b> vierzig · <b>50</b> fünfzig · <b>60</b> sechzig · <b>70</b> siebzig · <b>80</b> achtzig · <b>90</b> neunzig · <b>100</b> hundert · <b>1000</b> tausend</p>
<p>Главная особенность: единицы называют <b>раньше</b> десятков и соединяют словом <b>und</b>, всё пишется слитно: <i>21 = einundzwanzig</i> («один-и-двадцать»), <i>35 = fünfunddreißig</i>, <i>99 = neunundneunzig</i>.</p>
<p>Цена: <i>Was kostet das?</i> — <i>Drei Euro.</i></p>`,
        exercises: [
          { type: 'input', q: 'drei + vier = ___ (словом)', a: 'sieben' },
          { type: 'choice', q: '40 — это…', options: ['vierzig', 'vierzehn', 'vier'], a: 'vierzig' },
          { type: 'choice', q: '16 — это…', options: ['sechzehn', 'sechszehn', 'sechzig'], a: 'sechzehn' },
          { type: 'choice', q: '25 — это…', options: ['fünfundzwanzig', 'zwanzigfünf', 'fünfzwanzig'], a: 'fünfundzwanzig' },
          { type: 'choice', q: '30 — это…', options: ['dreißig', 'dreizig', 'dreizehn'], a: 'dreißig' },
          { type: 'choice', q: 'Einundvierzig — это…', options: ['41', '14', '410'], a: '41' },
          { type: 'input', q: '10 + 2 = ___ (словом)', a: 'zwölf/zwoelf' }
        ]
      },
      {
        id: 'de-was-ist-das', title: 'Что это? Кто это? Артикли',
        theory: `<p><b>Was ist das?</b> — «Что это?». Ответ: <i>Das ist <b>ein</b> Buch.</i> — «Это книга». <b>Wer ist das?</b> — «Кто это?». <i>Das ist Anna.</i></p>
<p>У каждого существительного есть <b>род</b>, и его показывает артикль. Определённый: <b>der</b> (м. р.), <b>die</b> (ж. р.), <b>das</b> (ср. р.). Неопределённый: <b>ein</b> (м. и ср. р.), <b>eine</b> (ж. р.).</p>
<p><i>der Tisch — ein Tisch</i> (стол), <i>die Lampe — eine Lampe</i> (лампа), <i>das Buch — ein Buch</i> (книга).</p>
<p>Род в немецком и русском часто не совпадает: <i>das Mädchen</i> (девочка) — средний род, <i>der Löffel</i> (ложка) — мужской. Поэтому слово учим сразу с артиклем. Подсказки: на <b>-ung, -heit, -keit, -e</b> обычно die; на <b>-chen</b> всегда das.</p>`,
        exercises: [
          { type: 'choice', q: '___ ist das? — Das ist ein Tisch.', options: ['Was', 'Wer', 'Wo'], a: 'Was' },
          { type: 'choice', q: '___ ist das? — Das ist Paul.', options: ['Wer', 'Was', 'Wie'], a: 'Wer' },
          { type: 'choice', q: 'Das ist ___ Lampe.', options: ['eine', 'ein', 'einen'], a: 'eine' },
          { type: 'choice', q: 'Das ist ___ Buch.', options: ['ein', 'eine', 'einer'], a: 'ein' },
          { type: 'choice', q: '___ Mädchen spielt im Garten.', options: ['Das', 'Die', 'Der'], a: 'Das' },
          { type: 'choice', q: '___ Zeitung liegt auf dem Tisch.', options: ['Die', 'Der', 'Das'], a: 'Die' },
          { type: 'choice', q: '___ Hund ist sehr groß.', options: ['Der', 'Die', 'Das'], a: 'Der' }
        ]
      },
      {
        id: 'de-meeting', title: 'Знакомство: имя, откуда, возраст',
        theory: `<p><b>Wie heißt du?</b> — «Как тебя зовут?». Ответ: <i>Ich heiße Anna.</i> Или: <i>Mein Name ist Anna.</i> Вежливо: <i>Wie heißen Sie?</i></p>
<p><b>Woher kommst du?</b> — «Откуда ты?». Ответ: <i>Ich komme <b>aus</b> Russland.</i> <b>Wo wohnst du?</b> — <i>Ich wohne <b>in</b> Moskau.</i></p>
<p><b>Wie alt bist du?</b> — «Сколько тебе лет?». Ответ: <i>Ich bin zwanzig Jahre alt.</i></p>
<p><b>Was bist du von Beruf?</b> — «Кем работаешь?». <i>Ich bin Lehrerin. Ich bin Student.</i> — перед профессией артикль не ставят. В конце: <b>Freut mich!</b> — «Очень приятно!»</p>`,
        exercises: [
          { type: 'choice', q: 'Wie ___ du? — Ich heiße Elena.', options: ['heißt', 'heiße', 'heißen'], a: 'heißt' },
          { type: 'choice', q: 'Ich komme ___ Russland.', options: ['aus', 'in', 'nach'], a: 'aus' },
          { type: 'choice', q: 'Ich wohne ___ Berlin.', options: ['in', 'aus', 'zu'], a: 'in' },
          { type: 'choice', q: 'Wie alt ___ du?', options: ['bist', 'bin', 'ist'], a: 'bist' },
          { type: 'choice', q: 'Ich bin dreißig Jahre ___.', options: ['alt', 'jung', 'groß'], a: 'alt' },
          { type: 'choice', q: '___ kommst du? — Aus Österreich.', options: ['Woher', 'Wo', 'Wohin'], a: 'Woher' },
          { type: 'choice', q: 'Ich bin ___. (я студент)', options: ['Student', 'ein Student', 'der Student'], a: 'Student' }
        ]
      }
    ]
  },
  {
    id: 'de-basics', title: 'Основы: глагол и порядок слов', level: 'A1',
    lessons: [
      {
        id: 'de-sein-haben', title: 'sein и haben',
        theory: `<p>Два главных глагола — <b>sein</b> (быть) и <b>haben</b> (иметь). В отличие от русского, «быть» в настоящем времени не пропускают: <i>Ich <b>bin</b> müde.</i> — «Я устал».</p>
<table class="tbl"><tr><th></th><th>sein</th><th>haben</th></tr>
<tr><td>ich</td><td>bin</td><td>habe</td></tr><tr><td>du</td><td>bist</td><td>hast</td></tr><tr><td>er / sie / es</td><td>ist</td><td>hat</td></tr>
<tr><td>wir</td><td>sind</td><td>haben</td></tr><tr><td>ihr</td><td>seid</td><td>habt</td></tr><tr><td>sie / Sie</td><td>sind</td><td>haben</td></tr></table>
<p>«У меня есть» = <i>Ich <b>habe</b>…</i>: <i>Ich habe einen Bruder.</i> Ещё: <i>Ich habe Hunger</i> — «я голоден», <i>Ich habe Zeit</i> — «у меня есть время».</p>`,
        exercises: [
          { type: 'choice', q: 'Ich ___ müde.', options: ['bin', 'bist', 'ist'], a: 'bin' },
          { type: 'choice', q: 'Du ___ sehr nett.', options: ['bist', 'bin', 'seid'], a: 'bist' },
          { type: 'choice', q: 'Wir ___ zu Hause.', options: ['sind', 'seid', 'ist'], a: 'sind' },
          { type: 'choice', q: 'Er ___ einen Hund.', options: ['hat', 'habt', 'hast'], a: 'hat' },
          { type: 'choice', q: 'Ihr ___ viel Zeit.', options: ['habt', 'hat', 'haben'], a: 'habt' },
          { type: 'choice', q: 'Ich ___ Hunger.', options: ['habe', 'bin', 'hat'], a: 'habe' },
          { type: 'input', q: 'Das Wetter ___ schön. (sein)', a: 'ist' },
          { type: 'input', q: 'Du ___ eine Schwester. (haben)', a: 'hast' }
        ]
      },
      {
        id: 'de-present', title: 'Настоящее время глаголов',
        theory: `<p>Инфинитив оканчивается на <b>-en</b>: <i>wohn<b>en</b>, lern<b>en</b>, spiel<b>en</b></i>. Отбрасываем -en и добавляем окончание лица:</p>
<p><i>ich wohn<b>e</b>, du wohn<b>st</b>, er wohn<b>t</b>, wir wohn<b>en</b>, ihr wohn<b>t</b>, sie wohn<b>en</b></i></p>
<p>Если основа на <b>-t, -d</b>, перед окончанием вставляется <b>e</b>: <i>du arbeit<b>e</b>st, er arbeit<b>e</b>t</i>.</p>
<p>У многих сильных глаголов в формах <b>du</b> и <b>er</b> меняется гласная: <i>fahren → du f<b>ä</b>hrst, er f<b>ä</b>hrt</i>; <i>sprechen → du spr<b>i</b>chst, er spr<b>i</b>cht</i>; <i>lesen → er l<b>ie</b>st</i>; <i>essen → er <b>i</b>sst</i>.</p>`,
        exercises: [
          { type: 'choice', q: 'Ich ___ in München. (wohnen)', options: ['wohne', 'wohnst', 'wohnt'], a: 'wohne' },
          { type: 'choice', q: 'Du ___ Deutsch. (lernen)', options: ['lernst', 'lernt', 'lerne'], a: 'lernst' },
          { type: 'choice', q: 'Er ___ im Büro. (arbeiten)', options: ['arbeitet', 'arbeit', 'arbeitst'], a: 'arbeitet' },
          { type: 'choice', q: 'Wir ___ Fußball. (spielen)', options: ['spielen', 'spielt', 'spielst'], a: 'spielen' },
          { type: 'choice', q: 'Sie ___ gern Bücher. (lesen, она)', options: ['liest', 'lest', 'lesen'], a: 'liest' },
          { type: 'choice', q: 'Er ___ mit dem Zug. (fahren)', options: ['fährt', 'fahrt', 'fahren'], a: 'fährt' },
          { type: 'input', q: 'Du ___ sehr gut Deutsch. (sprechen)', a: 'sprichst' },
          { type: 'input', q: 'Ihr ___ zu viel. (arbeiten)', a: 'arbeitet' }
        ]
      },
      {
        id: 'de-word-order', title: 'Порядок слов и вопросы',
        theory: `<p>Главное правило: в обычном предложении глагол стоит на <b>втором месте</b>. Первым может быть подлежащее или другое слово — тогда подлежащее идёт после глагола:</p>
<p><i>Ich <b>fahre</b> morgen nach Berlin.</i> → <i>Morgen <b>fahre</b> ich nach Berlin.</i></p>
<p>Вопрос с вопросительным словом: слово + глагол + подлежащее: <i>Wo <b>wohnst</b> du? Was <b>machst</b> du?</i></p>
<p>Вопрос «да/нет» начинается с глагола: <i><b>Wohnst</b> du in Berlin? <b>Hast</b> du Zeit?</i> Ответ: <i>Ja</i> или <i>Nein</i>; на отрицательный вопрос «да» — <b>doch</b>.</p>`,
        exercises: [
          { type: 'choice', q: 'Heute ___ ich ins Kino.', options: ['gehe', 'ich gehe', 'gehen'], a: 'gehe' },
          { type: 'choice', q: 'Wo ___ du?', options: ['wohnst', 'du wohnst', 'wohnen'], a: 'wohnst' },
          { type: 'choice', q: '___ du Zeit? — Ja, ich habe Zeit.', options: ['Hast', 'Habe', 'Hat'], a: 'Hast' },
          { type: 'choice', q: 'Am Abend ___ wir Freunde.', options: ['treffen', 'trefft', 'treffe'], a: 'treffen' },
          { type: 'choice', q: '___ machst du am Wochenende?', options: ['Was', 'Wer', 'Wo'], a: 'Was' },
          { type: 'choice', q: '___ kommt der Bus? — Um acht Uhr.', options: ['Wann', 'Wo', 'Wie'], a: 'Wann' }
        ]
      },
      {
        id: 'de-negation', title: 'Отрицание: nicht и kein',
        theory: `<p><b>kein</b> отрицает существительное с неопределённым артиклем или без артикля. Оно склоняется как <i>ein</i>: <i>Ich habe <b>keinen</b> Hund. Das ist <b>keine</b> Katze. Ich habe <b>keine</b> Zeit.</i></p>
<p><b>nicht</b> отрицает всё остальное: глагол, прилагательное, слово с определённым артиклем: <i>Ich komme <b>nicht</b>. Das ist <b>nicht</b> teuer. Das ist <b>nicht</b> mein Buch.</i></p>
<p>Обычно <b>nicht</b> стоит в конце или перед тем словом, которое отрицает: <i>Ich arbeite heute <b>nicht</b>. Er wohnt <b>nicht</b> in Berlin.</i></p>`,
        exercises: [
          { type: 'choice', q: 'Ich habe ___ Zeit.', options: ['keine', 'nicht', 'kein'], a: 'keine' },
          { type: 'choice', q: 'Das Hotel ist ___ teuer.', options: ['nicht', 'kein', 'keine'], a: 'nicht' },
          { type: 'choice', q: 'Er hat ___ Auto.', options: ['kein', 'keine', 'nicht'], a: 'kein' },
          { type: 'choice', q: 'Wir kommen heute ___.', options: ['nicht', 'kein', 'keinen'], a: 'nicht' },
          { type: 'choice', q: 'Ich habe ___ Bruder.', options: ['keinen', 'kein', 'nicht'], a: 'keinen' },
          { type: 'choice', q: 'Das ist ___ mein Koffer.', options: ['nicht', 'kein', 'keine'], a: 'nicht' }
        ]
      },
      {
        id: 'de-plural', title: 'Множественное число',
        theory: `<p>Во множественном числе артикль всегда <b>die</b>, а у слова появляется окончание. Типичные модели:</p>
<ul><li><b>-e</b>: <i>der Tag → die Tage, der Hund → die Hunde</i> (часто с умлаутом: <i>die Stadt → die Städte</i>)</li>
<li><b>-(e)n</b>: <i>die Frau → die Frauen, die Lampe → die Lampen</i> — так почти все слова женского рода</li>
<li><b>-er</b> с умлаутом: <i>das Kind → die Kinder, das Haus → die Häuser, das Buch → die Bücher</i></li>
<li><b>без окончания</b> (иногда с умлаутом): <i>der Lehrer → die Lehrer, die Mutter → die Mütter</i></li>
<li><b>-s</b>: заимствования: <i>das Auto → die Autos, das Hotel → die Hotels</i></li></ul>
<p>Множественное число учим вместе со словом, как и артикль. Неопределённого артикля во множественном нет: <i>ein Buch → Bücher</i>.</p>`,
        exercises: [
          { type: 'choice', q: 'Ein Kind, zwei ___.', options: ['Kinder', 'Kinds', 'Kinden'], a: 'Kinder' },
          { type: 'choice', q: 'Eine Frau, drei ___.', options: ['Frauen', 'Fraue', 'Fraus'], a: 'Frauen' },
          { type: 'choice', q: 'Ein Auto, viele ___.', options: ['Autos', 'Auten', 'Autoe'], a: 'Autos' },
          { type: 'choice', q: 'Ein Haus, zwei ___.', options: ['Häuser', 'Hause', 'Hauser'], a: 'Häuser' },
          { type: 'choice', q: 'Ein Tag, sieben ___.', options: ['Tage', 'Tagen', 'Tags'], a: 'Tage' },
          { type: 'choice', q: '___ Bücher sind interessant.', options: ['Die', 'Das', 'Der'], a: 'Die' },
          { type: 'input', q: 'ein Buch → zwei ___', a: 'bücher/buecher' }
        ]
      }
    ]
  },
  {
    id: 'de-cases', title: 'Падежи и полезные конструкции', level: 'A1',
    lessons: [
      {
        id: 'de-akkusativ', title: 'Винительный падеж (Akkusativ)',
        theory: `<p>Прямое дополнение (кого? что?) стоит в <b>аккузативе</b>. Хорошая новость: меняется только мужской род — <b>der → den</b>, <b>ein → einen</b>, <b>kein → keinen</b>.</p>
<p><i>Der Kaffee ist heiß. → Ich trinke <b>den</b> Kaffee. Ich kaufe <b>einen</b> Kuchen.</i></p>
<p>Женский, средний род и множественное число не меняются: <i>Ich sehe die Frau, das Kind, die Kinder.</i></p>
<p>Местоимения: <i>ich → <b>mich</b>, du → <b>dich</b>, er → <b>ihn</b>, wir → <b>uns</b>, ihr → <b>euch</b></i>. Аккузатив нужен после <i>haben, kaufen, sehen, brauchen, möchten</i>, а также после предлогов <b>für, ohne, durch, gegen, um</b>.</p>`,
        exercises: [
          { type: 'choice', q: 'Ich trinke ___ Kaffee.', options: ['den', 'der', 'dem'], a: 'den' },
          { type: 'choice', q: 'Wir kaufen ___ Tisch.', options: ['einen', 'ein', 'eine'], a: 'einen' },
          { type: 'choice', q: 'Sie sieht ___ Kind.', options: ['das', 'den', 'dem'], a: 'das' },
          { type: 'choice', q: 'Ich brauche ___ Koffer.', options: ['keinen', 'kein', 'keine'], a: 'keinen' },
          { type: 'choice', q: 'Das Geschenk ist für ___. (для тебя)', options: ['dich', 'dir', 'du'], a: 'dich' },
          { type: 'choice', q: 'Kennst du ___? (его)', options: ['ihn', 'ihm', 'er'], a: 'ihn' },
          { type: 'input', q: 'Ich habe ___ Bruder. (один брат, неопр. артикль)', a: 'einen' }
        ]
      },
      {
        id: 'de-dativ', title: 'Дательный падеж (Dativ)',
        theory: `<p><b>Датив</b> отвечает на вопрос «кому? где?» и нужен после предлогов <b>mit, bei, nach, aus, von, zu, seit</b>.</p>
<table class="tbl"><tr><th></th><th>м. р.</th><th>ж. р.</th><th>ср. р.</th><th>мн. ч.</th></tr>
<tr><td>определённый</td><td>dem</td><td>der</td><td>dem</td><td>den (+n)</td></tr>
<tr><td>неопределённый</td><td>einem</td><td>einer</td><td>einem</td><td>—</td></tr></table>
<p><i>Ich fahre mit <b>dem</b> Bus. Ich wohne bei <b>meiner</b> Tante. Er kommt aus <b>der</b> Schweiz.</i></p>
<p>Слияния: <b>zu dem = zum</b>, <b>zu der = zur</b>, <b>bei dem = beim</b>, <b>von dem = vom</b>, <b>in dem = im</b>: <i>zum Bahnhof, zur Arbeit, beim Arzt, im Park</i>.</p>
<p>Местоимения: <i>mir, dir, ihm, ihr, uns, euch, ihnen</i>: <i>Das gefällt <b>mir</b>. Kannst du <b>mir</b> helfen?</i></p>`,
        exercises: [
          { type: 'choice', q: 'Ich fahre mit ___ Bus.', options: ['dem', 'den', 'der'], a: 'dem' },
          { type: 'choice', q: 'Er wohnt bei ___ Mutter.', options: ['seiner', 'seine', 'seinen'], a: 'seiner' },
          { type: 'choice', q: 'Wir gehen ___ Arzt.', options: ['zum', 'zur', 'zu'], a: 'zum' },
          { type: 'choice', q: 'Sie fährt ___ Arbeit.', options: ['zur', 'zum', 'zu dem'], a: 'zur' },
          { type: 'choice', q: 'Das Buch gefällt ___. (мне)', options: ['mir', 'mich', 'ich'], a: 'mir' },
          { type: 'choice', q: 'Ich komme aus ___ Schweiz.', options: ['der', 'die', 'dem'], a: 'der' },
          { type: 'input', q: 'Kannst du ___ helfen? (мне)', a: 'mir' }
        ]
      },
      {
        id: 'de-modal', title: 'Модальные глаголы',
        theory: `<p>Модальные глаголы: <b>können</b> (мочь, уметь), <b>müssen</b> (должен), <b>wollen</b> (хотеть), <b>dürfen</b> (можно, разрешено), <b>sollen</b> (следует), <b>möchten</b> (хотел бы).</p>
<p>В единственном числе у них особые формы, а у <b>ich</b> и <b>er</b> они совпадают и без окончания: <i>ich <b>kann</b>, du <b>kannst</b>, er <b>kann</b></i>; <i>ich <b>muss</b>, ich <b>will</b>, ich <b>darf</b>, ich <b>möchte</b></i>.</p>
<p>Рамка: модальный глагол на втором месте, а смысловой — в инфинитиве <b>в конце</b>: <i>Ich <b>kann</b> gut <b>schwimmen</b>. Wir <b>müssen</b> heute <b>arbeiten</b>. <b>Darf</b> ich hier <b>sitzen</b>?</i></p>`,
        exercises: [
          { type: 'choice', q: 'Ich ___ gut schwimmen.', options: ['kann', 'kannst', 'können'], a: 'kann' },
          { type: 'choice', q: 'Du ___ mehr Wasser trinken.', options: ['musst', 'muss', 'müssen'], a: 'musst' },
          { type: 'choice', q: '___ ich hier sitzen?', options: ['Darf', 'Darfst', 'Dürfen'], a: 'Darf' },
          { type: 'choice', q: 'Er ___ ein Auto kaufen.', options: ['will', 'willst', 'wollen'], a: 'will' },
          { type: 'choice', q: 'Ich ___ einen Kaffee, bitte.', options: ['möchte', 'möchtest', 'möchten'], a: 'möchte' },
          { type: 'choice', q: 'Wir müssen heute lange ___.', options: ['arbeiten', 'arbeitet', 'gearbeitet'], a: 'arbeiten' },
          { type: 'input', q: 'Kannst du Deutsch ___? (sprechen)', a: 'sprechen' }
        ]
      },
      {
        id: 'de-separable', title: 'Глаголы с отделяемой приставкой',
        theory: `<p>У многих глаголов есть приставка, которая в предложении <b>отделяется и уходит в конец</b>: <i><b>auf</b>stehen → Ich stehe um sieben <b>auf</b>.</i></p>
<p>Частые отделяемые приставки: <b>an, auf, aus, ein, mit, zu, ab, zurück, fern</b>: <i>anrufen → Ich rufe dich morgen <b>an</b>. einkaufen → Wir kaufen im Supermarkt <b>ein</b>. fernsehen → Er sieht abends <b>fern</b>.</i></p>
<p>Ударение падает на приставку: <i><b>an</b>rufen, <b>ein</b>kaufen</i>. С модальным глаголом приставка не отделяется: <i>Ich muss früh <b>aufstehen</b>.</i></p>
<p>Неотделяемые приставки <b>be-, ver-, er-, ge-, ent-</b> всегда остаются на месте: <i>Ich <b>besuche</b> meine Oma. Ich <b>verstehe</b> das.</i></p>`,
        exercises: [
          { type: 'choice', q: 'Ich stehe jeden Tag um sechs Uhr ___.', options: ['auf', 'an', 'ein'], a: 'auf' },
          { type: 'choice', q: 'Wir kaufen am Samstag ___.', options: ['ein', 'auf', 'mit'], a: 'ein' },
          { type: 'choice', q: 'Er ___ abends fern.', options: ['sieht', 'fernsieht', 'sehen'], a: 'sieht' },
          { type: 'choice', q: 'Ich rufe dich morgen ___.', options: ['an', 'auf', 'aus'], a: 'an' },
          { type: 'choice', q: 'Kommst du ins Kino ___?', options: ['mit', 'an', 'zu'], a: 'mit' },
          { type: 'choice', q: 'Morgen muss ich früh ___.', options: ['aufstehen', 'stehe auf', 'stehen auf'], a: 'aufstehen' },
          { type: 'choice', q: 'Ich ___ meine Oma. (besuchen)', options: ['besuche', 'suche be', 'be suche'], a: 'besuche' }
        ]
      }
    ]
  },
  {
    id: 'de-everyday', title: 'Повседневная грамматика', level: 'A1',
    lessons: [
      {
        id: 'de-possessive', title: 'Притяжательные: mein, dein, sein, ihr',
        theory: `<p>Притяжательные слова: <b>mein</b> (мой), <b>dein</b> (твой), <b>sein</b> (его), <b>ihr</b> (её), <b>unser</b> (наш), <b>euer</b> (ваш), <b>ihr</b> (их), <b>Ihr</b> (Ваш, вежливо).</p>
<p>Они изменяются как <i>ein</i>: перед словами женского рода и во множественном числе — окончание <b>-e</b>: <i>mein Vater, mein<b>e</b> Mutter, mein Kind, mein<b>e</b> Eltern</i>.</p>
<p>В аккузативе мужской род получает <b>-en</b>: <i>Ich besuche mein<b>en</b> Bruder.</i> В дативе: <i>mit mein<b>em</b> Vater, mit mein<b>er</b> Mutter</i>.</p>
<p>Внимание: «его» — <b>sein</b>, «её» — <b>ihr</b>: <i>Paul und <b>seine</b> Schwester. Anna und <b>ihr</b> Bruder.</i></p>`,
        exercises: [
          { type: 'choice', q: 'Das ist ___ Mutter. (моя)', options: ['meine', 'mein', 'meinen'], a: 'meine' },
          { type: 'choice', q: 'Anna besucht ___ Bruder. (её)', options: ['ihren', 'seinen', 'ihr'], a: 'ihren' },
          { type: 'choice', q: 'Paul spielt mit ___ Hund. (его)', options: ['seinem', 'seinen', 'ihrem'], a: 'seinem' },
          { type: 'choice', q: 'Wo sind ___ Eltern? (твои)', options: ['deine', 'dein', 'deinen'], a: 'deine' },
          { type: 'choice', q: 'Das ist ___ Haus. (наш)', options: ['unser', 'unsere', 'unseren'], a: 'unser' },
          { type: 'choice', q: 'Wie ist ___ Name? (Ваше, вежливо)', options: ['Ihr', 'ihr', 'dein'], a: 'Ihr' },
          { type: 'input', q: 'Ich rufe ___ Vater an. (мой, аккузатив)', a: 'meinen' }
        ]
      },
      {
        id: 'de-imperative', title: 'Повелительное наклонение',
        theory: `<p>Просьба к <b>du</b>: основа глагола без окончания, без местоимения: <i>Komm! Mach das! Schreib mir!</i> Если в форме du меняется e → i, то и здесь: <i>Nimm! Lies! Gib mir das Buch! Sprich langsam!</i> (но <i>fahren → Fahr!</i>, без умлаута).</p>
<p>К <b>ihr</b>: форма как в настоящем времени без местоимения: <i>Kommt! Macht das Fenster zu!</i></p>
<p>Вежливо к <b>Sie</b>: глагол + Sie: <i>Kommen Sie bitte! Nehmen Sie Platz!</i></p>
<p><b>sein</b>: <i>Sei ruhig! Seid ruhig! Seien Sie ruhig!</i> Приставка уходит в конец: <i>Steh auf! Ruf mich an!</i> Слово <b>bitte</b> делает просьбу вежливее.</p>`,
        exercises: [
          { type: 'choice', q: '___ bitte langsam! (du, sprechen)', options: ['Sprich', 'Sprech', 'Sprichst'], a: 'Sprich' },
          { type: 'choice', q: '___ Sie bitte Platz! (nehmen)', options: ['Nehmen', 'Nimm', 'Nehmt'], a: 'Nehmen' },
          { type: 'choice', q: 'Kinder, ___ das Fenster zu! (machen)', options: ['macht', 'mach', 'machen'], a: 'macht' },
          { type: 'choice', q: '___ ruhig, bitte! (du, sein)', options: ['Sei', 'Bist', 'Seid'], a: 'Sei' },
          { type: 'choice', q: 'Steh bitte früh ___!', options: ['auf', 'an', 'aus'], a: 'auf' },
          { type: 'choice', q: '___ mir bitte das Buch! (du, geben)', options: ['Gib', 'Geb', 'Gibst'], a: 'Gib' },
          { type: 'input', q: '___ mich morgen an! (du, rufen)', a: 'ruf/rufe' }
        ]
      },
      {
        id: 'de-time', title: 'Время: um, am, im',
        theory: `<p><b>Wie spät ist es?</b> / <b>Wie viel Uhr ist es?</b> — «Который час?». <i>Es ist acht Uhr. Es ist Viertel nach acht (8:15). Es ist halb neun (8:30)</i> — «половина девятого», как по-русски. <i>Es ist Viertel vor neun (8:45).</i></p>
<p>Предлоги времени:</p>
<ul><li><b>um</b> + час: <i>um sieben Uhr</i></li>
<li><b>am</b> + день недели, часть суток, дата: <i>am Montag, am Abend, am Wochenende, am 3. Mai</i> (но <i>in der Nacht</i>)</li>
<li><b>im</b> + месяц, время года: <i>im Juli, im Winter</i></li>
<li><b>von … bis</b>: <i>von neun bis fünf</i>; <b>seit</b> — с какого-то времени и до сих пор: <i>seit einem Jahr</i></li></ul>`,
        exercises: [
          { type: 'choice', q: 'Der Kurs beginnt ___ neun Uhr.', options: ['um', 'am', 'im'], a: 'um' },
          { type: 'choice', q: '___ Montag gehe ich zum Arzt.', options: ['Am', 'Um', 'Im'], a: 'Am' },
          { type: 'choice', q: '___ Sommer fahren wir ans Meer.', options: ['Im', 'Am', 'Um'], a: 'Im' },
          { type: 'choice', q: 'Es ist ___ acht. (7:30)', options: ['halb', 'Viertel', 'nach'], a: 'halb' },
          { type: 'choice', q: 'Ich arbeite von neun ___ fünf.', options: ['bis', 'um', 'nach'], a: 'bis' },
          { type: 'choice', q: 'Ich lerne ___ einem Jahr Deutsch.', options: ['seit', 'vor', 'um'], a: 'seit' },
          { type: 'input', q: 'Wir treffen uns ___ Abend. (вечером)', a: 'am' }
        ]
      }
    ]
  },
  {
    id: 'de-past', title: 'Прошедшее время и сложные предложения', level: 'A2',
    lessons: [
      {
        id: 'de-perfekt', title: 'Прошедшее время Perfekt',
        theory: `<p>В разговоре о прошлом немцы чаще всего используют <b>Perfekt</b>: <b>haben / sein</b> + причастие (Partizip II) <b>в конце</b>: <i>Ich <b>habe</b> Pizza <b>gegessen</b>.</i></p>
<p>Причастие слабых глаголов: <b>ge- + основа + -t</b>: <i>machen → gemacht, kaufen → gekauft, spielen → gespielt, arbeiten → gearbeitet</i>.</p>
<p>Сильные глаголы: <b>ge- + (изменённая) основа + -en</b>: <i>sehen → gesehen, essen → gegessen, trinken → getrunken, schreiben → geschrieben</i>.</p>
<p>С отделяемой приставкой ge- встаёт внутрь: <i>einkaufen → einge<b>kauft</b>, aufstehen → aufgestanden</i>. Без ge-: глаголы на <b>-ieren</b> и с приставками be-, ver-: <i>studiert, besucht, verstanden</i>.</p>
<p><b>sein</b> берут глаголы движения и изменения состояния: <i>Ich <b>bin</b> nach Berlin <b>gefahren</b>. Er <b>ist</b> zu Hause <b>geblieben</b>.</i></p>`,
        exercises: [
          { type: 'choice', q: 'Gestern ___ ich einen Film gesehen.', options: ['habe', 'bin', 'hat'], a: 'habe' },
          { type: 'choice', q: 'Wir ___ nach Wien gefahren.', options: ['sind', 'haben', 'seid'], a: 'sind' },
          { type: 'choice', q: 'Er hat viel ___. (arbeiten)', options: ['gearbeitet', 'arbeitet', 'gearbeiten'], a: 'gearbeitet' },
          { type: 'choice', q: 'Ich habe einen Brief ___. (schreiben)', options: ['geschrieben', 'geschreibt', 'schrieb'], a: 'geschrieben' },
          { type: 'choice', q: 'Sie ___ zu Hause geblieben.', options: ['ist', 'hat', 'sind'], a: 'ist' },
          { type: 'choice', q: 'Was hast du gestern ___? (machen)', options: ['gemacht', 'gemachen', 'macht'], a: 'gemacht' },
          { type: 'input', q: 'Ich habe Kaffee ___. (trinken)', a: 'getrunken' },
          { type: 'input', q: 'Wir haben im Supermarkt ___. (einkaufen)', a: 'eingekauft' }
        ]
      },
      {
        id: 'de-praeteritum', title: 'war и hatte',
        theory: `<p>Глаголы <b>sein</b> и <b>haben</b>, а также модальные в прошедшем времени обычно употребляют в форме <b>Präteritum</b> — она короче:</p>
<p><b>sein</b>: <i>ich war, du warst, er war, wir waren, ihr wart, sie waren</i></p>
<p><b>haben</b>: <i>ich hatte, du hattest, er hatte, wir hatten, ihr hattet, sie hatten</i></p>
<p>Модальные: <i>ich konnte, musste, wollte, durfte</i>.</p>
<p><i>Gestern <b>war</b> ich im Museum. Wir <b>hatten</b> keine Zeit. Ich <b>musste</b> lange warten.</i></p>`,
        exercises: [
          { type: 'choice', q: 'Gestern ___ ich krank.', options: ['war', 'warst', 'waren'], a: 'war' },
          { type: 'choice', q: 'Wo ___ du im Sommer?', options: ['warst', 'war', 'wart'], a: 'warst' },
          { type: 'choice', q: 'Wir ___ keine Zeit.', options: ['hatten', 'hatte', 'hattet'], a: 'hatten' },
          { type: 'choice', q: 'Er ___ einen Hund.', options: ['hatte', 'hattest', 'hatten'], a: 'hatte' },
          { type: 'choice', q: 'Ich ___ lange warten. (müssen)', options: ['musste', 'muss', 'müsste'], a: 'musste' },
          { type: 'input', q: 'Das Wetter ___ schön. (sein, прошлое)', a: 'war' }
        ]
      },
      {
        id: 'de-weil-dass', title: 'weil, dass, wenn: глагол в конце',
        theory: `<p>В придаточном предложении после союзов <b>weil</b> (потому что), <b>dass</b> (что), <b>wenn</b> (если, когда), <b>ob</b> (ли) глагол уходит <b>в самый конец</b>:</p>
<p><i>Ich bleibe zu Hause, <b>weil</b> ich krank <b>bin</b>.</i></p>
<p><i>Ich glaube, <b>dass</b> er heute <b>kommt</b>.</i></p>
<p><i><b>Wenn</b> das Wetter schön <b>ist</b>, gehen wir in den Park.</i> — если придаточное стоит первым, главное начинается с глагола.</p>
<p>Союзы <b>und, aber, oder, denn</b> порядок слов не меняют: <i>Ich bleibe zu Hause, <b>denn</b> ich <b>bin</b> krank.</i></p>`,
        exercises: [
          { type: 'choice', q: 'Ich lerne Deutsch, weil ich in Berlin ___.', options: ['arbeiten möchte', 'möchte arbeiten', 'arbeite möchte'], a: 'arbeiten möchte' },
          { type: 'choice', q: 'Er sagt, dass er keine Zeit ___.', options: ['hat', 'haben', 'hast'], a: 'hat' },
          { type: 'choice', q: 'Ich bleibe zu Hause, ___ ich müde bin.', options: ['weil', 'denn', 'und'], a: 'weil' },
          { type: 'choice', q: 'Wenn das Wetter schön ist, ___ wir an den See.', options: ['fahren', 'wir fahren', 'fahrt'], a: 'fahren' },
          { type: 'choice', q: 'Ich weiß nicht, ___ er heute kommt.', options: ['ob', 'dass', 'weil'], a: 'ob' },
          { type: 'choice', q: 'Sie kommt nicht, denn sie ___ krank.', options: ['ist', 'sein', 'bin'], a: 'ist' }
        ]
      },
      {
        id: 'de-comparison', title: 'Сравнение: größer, am größten',
        theory: `<p>Сравнительная степень: <b>-er</b>, сравниваем словом <b>als</b>: <i>Berlin ist <b>größer als</b> München.</i></p>
<p>Превосходная: <b>am -sten</b>: <i>Die Zugspitze ist <b>am höchsten</b>.</i> Перед существительным: <i>der größte Berg</i>.</p>
<p>У коротких слов часто появляется умлаут: <i>alt → älter, jung → jünger, groß → größer, warm → wärmer</i>.</p>
<p>Особые формы: <b>gut → besser → am besten</b>, <b>viel → mehr → am meisten</b>, <b>gern → lieber → am liebsten</b>, <b>hoch → höher → am höchsten</b>. Равенство — <b>so … wie</b>: <i>Er ist so groß wie sein Vater.</i></p>`,
        exercises: [
          { type: 'choice', q: 'Mein Bruder ist ___ als ich.', options: ['älter', 'alter', 'am ältesten'], a: 'älter' },
          { type: 'choice', q: 'Der Zug ist schneller ___ der Bus.', options: ['als', 'wie', 'dann'], a: 'als' },
          { type: 'choice', q: 'Tee trinke ich gern, aber Kaffee trinke ich ___.', options: ['lieber', 'gerner', 'mehr gern'], a: 'lieber' },
          { type: 'choice', q: 'Das Wetter ist heute ___ als gestern.', options: ['besser', 'guter', 'gutter'], a: 'besser' },
          { type: 'choice', q: 'Er ist so groß ___ sein Vater.', options: ['wie', 'als', 'so'], a: 'wie' },
          { type: 'choice', q: 'Im Sommer ist es am ___.', options: ['wärmsten', 'warmsten', 'wärmer'], a: 'wärmsten' },
          { type: 'input', q: 'Berlin ist ___ als Hamburg. (groß)', a: 'größer/groesser' }
        ]
      },
      {
        id: 'de-wechsel', title: 'Предлоги места: в, на — где? и куда?',
        theory: `<p>Девять предлогов — <b>in, an, auf, über, unter, vor, hinter, neben, zwischen</b> — требуют двух разных падежей:</p>
<ul><li><b>Wo?</b> (где?) → <b>датив</b>: <i>Das Buch liegt auf <b>dem</b> Tisch. Ich bin in <b>der</b> Stadt.</i></li>
<li><b>Wohin?</b> (куда?) → <b>аккузатив</b>: <i>Ich lege das Buch auf <b>den</b> Tisch. Ich gehe in <b>die</b> Stadt.</i></li></ul>
<p>Пары глаголов: <b>liegen — legen</b> (лежать — класть), <b>stehen — stellen</b> (стоять — ставить), <b>hängen</b> (висеть — вешать), <b>sitzen — sich setzen</b>.</p>
<p>Слияния: <i>in dem = im, in das = ins, an dem = am, an das = ans</i>: <i>Ich bin im Kino. Ich gehe ins Kino.</i></p>`,
        exercises: [
          { type: 'choice', q: 'Die Lampe steht auf ___ Tisch.', options: ['dem', 'den', 'der'], a: 'dem' },
          { type: 'choice', q: 'Ich stelle die Lampe auf ___ Tisch.', options: ['den', 'dem', 'der'], a: 'den' },
          { type: 'choice', q: 'Wir gehen heute ___ Kino.', options: ['ins', 'im', 'in'], a: 'ins' },
          { type: 'choice', q: 'Er ist jetzt ___ Büro.', options: ['im', 'ins', 'in'], a: 'im' },
          { type: 'choice', q: 'Das Bild hängt an ___ Wand.', options: ['der', 'die', 'den'], a: 'der' },
          { type: 'choice', q: 'Ich ___ das Buch ins Regal. (кладу)', options: ['lege', 'liege', 'stehe'], a: 'lege' },
          { type: 'choice', q: 'Die Katze schläft unter ___ Bett.', options: ['dem', 'das', 'den'], a: 'dem' },
          { type: 'input', q: 'Wir fahren am Wochenende an ___ Meer. (куда?)', a: 'das' }
        ]
      },
      {
        id: 'de-reflexive', title: 'Возвратные глаголы: sich freuen',
        theory: `<p>Русскому <b>-ся</b> часто соответствует отдельное слово <b>sich</b>, которое меняется по лицам:</p>
<p><i>ich freue <b>mich</b>, du freust <b>dich</b>, er/sie freut <b>sich</b>, wir freuen <b>uns</b>, ihr freut <b>euch</b>, sie/Sie freuen <b>sich</b></i></p>
<p>Частые возвратные глаголы: <b>sich freuen</b> (радоваться), <b>sich waschen</b> (умываться), <b>sich anziehen</b> (одеваться), <b>sich setzen</b> (садиться), <b>sich interessieren für</b> (интересоваться), <b>sich erinnern an</b> (вспоминать), <b>sich treffen</b> (встречаться), <b>sich gewöhnen an</b> (привыкать).</p>
<p>Если есть ещё прямое дополнение, sich стоит в дативе: <i>Ich wasche <b>mir</b> die Hände.</i></p>`,
        exercises: [
          { type: 'choice', q: 'Ich freue ___ auf den Urlaub.', options: ['mich', 'mir', 'sich'], a: 'mich' },
          { type: 'choice', q: 'Interessierst du ___ für Musik?', options: ['dich', 'dir', 'sich'], a: 'dich' },
          { type: 'choice', q: 'Wir treffen ___ um acht.', options: ['uns', 'sich', 'euch'], a: 'uns' },
          { type: 'choice', q: 'Er zieht ___ schnell an.', options: ['sich', 'ihn', 'ihm'], a: 'sich' },
          { type: 'choice', q: 'Erinnert ihr ___ an den Sommer?', options: ['euch', 'uns', 'sich'], a: 'euch' },
          { type: 'choice', q: 'Ich wasche ___ die Hände.', options: ['mir', 'mich', 'sich'], a: 'mir' },
          { type: 'input', q: 'Setzen Sie ___ bitte! (садитесь)', a: 'sich' }
        ]
      },
      {
        id: 'de-adjective', title: 'Окончания прилагательных',
        theory: `<p>Прилагательное после существительного не меняется: <i>Das Haus ist <b>neu</b>.</i> Перед существительным получает окончание.</p>
<p><b>После der / die / das</b> (определённый артикль): в именительном падеже — <b>-e</b>, почти везде в остальных — <b>-en</b>: <i>der neu<b>e</b> Tisch, die neu<b>e</b> Lampe, das neu<b>e</b> Auto; ich kaufe den neu<b>en</b> Tisch; mit dem neu<b>en</b> Auto; die neu<b>en</b> Bücher</i>.</p>
<p><b>После ein / kein / mein</b> прилагательное «показывает род», если артикль этого не сделал: <i>ein neu<b>er</b> Tisch, ein neu<b>es</b> Auto, eine neu<b>e</b> Lampe; einen neu<b>en</b> Tisch; mit einem neu<b>en</b> Auto</i>.</p>
<p>Без артикля — окончания как у der/die/das: <i>kalt<b>es</b> Wasser, frisch<b>er</b> Kaffee, frisch<b>e</b> Milch</i>.</p>`,
        exercises: [
          { type: 'choice', q: 'Der ___ Mann ist mein Lehrer. (alt)', options: ['alte', 'alter', 'alten'], a: 'alte' },
          { type: 'choice', q: 'Das ist ein ___ Auto. (neu)', options: ['neues', 'neue', 'neuer'], a: 'neues' },
          { type: 'choice', q: 'Ich habe einen ___ Hund. (klein)', options: ['kleinen', 'kleiner', 'kleine'], a: 'kleinen' },
          { type: 'choice', q: 'Sie trägt eine ___ Jacke. (rot)', options: ['rote', 'roter', 'roten'], a: 'rote' },
          { type: 'choice', q: 'Wir wohnen in dem ___ Haus. (groß)', options: ['großen', 'große', 'großes'], a: 'großen' },
          { type: 'choice', q: 'Ich trinke gern ___ Wasser. (kalt)', options: ['kaltes', 'kalte', 'kalten'], a: 'kaltes' },
          { type: 'choice', q: 'Das ist ein ___ Tag! (schön)', options: ['schöner', 'schöne', 'schönen'], a: 'schöner' },
          { type: 'input', q: 'Die ___ Bücher liegen auf dem Tisch. (neu)', a: 'neuen' }
        ]
      },
      {
        id: 'de-futur', title: 'Будущее: werden и настоящее время',
        theory: `<p>О будущем немцы чаще всего говорят в <b>настоящем времени</b> со словом времени: <i>Morgen <b>fahre</b> ich nach Berlin. Nächste Woche <b>habe</b> ich Urlaub.</i></p>
<p><b>Futur I</b> = <b>werden</b> + инфинитив в конце. Оно звучит как обещание, план или предположение: <i>Ich <b>werde</b> dich <b>anrufen</b>. Es <b>wird</b> morgen <b>regnen</b>. Er <b>wird</b> wohl krank <b>sein</b>.</i></p>
<p><b>werden</b>: <i>ich werde, du wirst, er wird, wir werden, ihr werdet, sie werden</i>.</p>
<p>Без инфинитива <b>werden</b> значит «становиться»: <i>Ich <b>werde</b> Arzt. Es <b>wird</b> kalt.</i></p>`,
        exercises: [
          { type: 'choice', q: 'Ich ___ dich morgen anrufen.', options: ['werde', 'wird', 'wirst'], a: 'werde' },
          { type: 'choice', q: 'Du ___ das schaffen!', options: ['wirst', 'werdet', 'wird'], a: 'wirst' },
          { type: 'choice', q: 'Morgen wird es ___.', options: ['regnen', 'regnet', 'geregnet'], a: 'regnen' },
          { type: 'choice', q: 'Wir ___ nächstes Jahr nach Wien ziehen.', options: ['werden', 'werdet', 'wird'], a: 'werden' },
          { type: 'choice', q: 'Im Herbst ___ es früh dunkel. (становится)', options: ['wird', 'werde', 'ist werden'], a: 'wird' },
          { type: 'input', q: 'Ihr ___ viel Spaß haben! (werden)', a: 'werdet' }
        ]
      }
    ]
  },
  {
    id: 'de-b1', title: 'Уровень B1: сложные предложения и формы', level: 'B1',
    lessons: [
      {
        id: 'de-praeteritum-full', title: 'Präteritum: прошедшее в рассказе',
        theory: `<p>В книгах, сказках и новостях прошлое передаётся формой <b>Präteritum</b>.</p>
<p>Слабые глаголы: основа + <b>-te</b>: <i>ich mach<b>te</b>, du mach<b>test</b>, er mach<b>te</b>, wir mach<b>ten</b>, ihr mach<b>tet</b>, sie mach<b>ten</b></i>. После -t/-d: <i>arbeit<b>ete</b></i>.</p>
<p>Сильные глаголы меняют гласную, у ich и er окончания нет: <i>gehen → ging, kommen → kam, sehen → sah, finden → fand, schreiben → schrieb, sprechen → sprach, fahren → fuhr, nehmen → nahm, geben → gab, lesen → las</i>. Мн. ч.: <i>wir gingen, sie kamen</i>.</p>
<p>Смешанные: <i>denken → dachte, bringen → brachte, wissen → wusste, kennen → kannte</i>.</p>`,
        exercises: [
          { type: 'choice', q: 'Gestern ___ ich lange. (arbeiten)', options: ['arbeitete', 'arbeitet', 'arbeiten'], a: 'arbeitete' },
          { type: 'choice', q: 'Es ___ einmal ein König. (sein)', options: ['war', 'ist', 'wurde'], a: 'war' },
          { type: 'choice', q: 'Rotkäppchen ___ in den Wald. (gehen)', options: ['ging', 'gang', 'gehte'], a: 'ging' },
          { type: 'choice', q: 'Der Wolf ___ das Mädchen. (sehen)', options: ['sah', 'sehte', 'sieht'], a: 'sah' },
          { type: 'choice', q: 'Wir ___ spät nach Hause. (kommen)', options: ['kamen', 'kommten', 'kam'], a: 'kamen' },
          { type: 'choice', q: 'Ich ___ an dich. (denken)', options: ['dachte', 'denkte', 'dankte'], a: 'dachte' },
          { type: 'input', q: 'Er ___ einen langen Brief. (schreiben)', a: 'schrieb' },
          { type: 'input', q: 'Sie ___ mit dem Zug nach Berlin. (fahren, она)', a: 'fuhr' }
        ]
      },
      {
        id: 'de-als-wenn', title: 'als и wenn: «когда»',
        theory: `<p>Оба слова переводятся «когда», и после обоих глагол стоит в конце.</p>
<ul><li><b>als</b> — <b>одно</b> событие или период <b>в прошлом</b>: <i><b>Als</b> ich ein Kind <b>war</b>, wohnte ich in Kiew. <b>Als</b> er nach Hause <b>kam</b>, schlief sie schon.</i></li>
<li><b>wenn</b> — в настоящем и будущем, а также о <b>повторяющемся</b> в прошлом («каждый раз, когда»): <i><b>Wenn</b> ich Zeit <b>habe</b>, lese ich. Immer <b>wenn</b> wir Oma <b>besuchten</b>, backte sie Kuchen.</i></li></ul>
<p><b>wenn</b> ещё значит «если»: <i>Wenn es regnet, bleiben wir zu Hause.</i> Вопрос «когда?» — <b>wann</b>: <i>Wann kommst du?</i>, и в косвенном вопросе тоже: <i>Ich weiß nicht, wann er kommt.</i></p>`,
        exercises: [
          { type: 'choice', q: '___ ich zehn Jahre alt war, bekam ich einen Hund.', options: ['Als', 'Wenn', 'Wann'], a: 'Als' },
          { type: 'choice', q: '___ ich müde bin, trinke ich Kaffee.', options: ['Wenn', 'Als', 'Wann'], a: 'Wenn' },
          { type: 'choice', q: 'Immer ___ wir am Meer waren, war das Wetter schlecht.', options: ['wenn', 'als', 'wann'], a: 'wenn' },
          { type: 'choice', q: '___ beginnt der Film?', options: ['Wann', 'Wenn', 'Als'], a: 'Wann' },
          { type: 'choice', q: 'Als wir in Berlin ___, regnete es.', options: ['ankamen', 'kamen an', 'ankommen'], a: 'ankamen' },
          { type: 'choice', q: 'Ich weiß nicht, ___ der Zug abfährt.', options: ['wann', 'wenn', 'als'], a: 'wann' }
        ]
      },
      {
        id: 'de-obwohl', title: 'obwohl, trotzdem, deshalb',
        theory: `<p><b>obwohl</b> (хотя) — союз придаточного, глагол в конце: <i>Ich gehe spazieren, <b>obwohl</b> es <b>regnet</b>.</i></p>
<p><b>trotzdem</b> (тем не менее, всё равно) и <b>deshalb / deswegen / darum</b> (поэтому) — наречия. Они занимают первое место, и глагол идёт сразу за ними: <i>Es regnet. <b>Trotzdem gehe</b> ich spazieren. Ich bin krank, <b>deshalb bleibe</b> ich zu Hause.</i></p>
<p>Сравните: <i>weil</i> (потому что, глагол в конце) — <i>denn</i> (потому что, порядок не меняется) — <i>deshalb</i> (поэтому, глагол сразу после).</p>`,
        exercises: [
          { type: 'choice', q: 'Er arbeitet, ___ er krank ist.', options: ['obwohl', 'trotzdem', 'deshalb'], a: 'obwohl' },
          { type: 'choice', q: 'Es ist kalt. Trotzdem ___ wir schwimmen.', options: ['gehen', 'wir gehen', 'gehen wir nicht'], a: 'gehen' },
          { type: 'choice', q: 'Ich habe keine Zeit, ___ komme ich nicht.', options: ['deshalb', 'obwohl', 'weil'], a: 'deshalb' },
          { type: 'choice', q: 'Obwohl das Hotel teuer ___, war es nicht gut.', options: ['war', 'ist gewesen', 'wird'], a: 'war' },
          { type: 'choice', q: 'Sie lernt viel, ___ sie die Prüfung bestehen will.', options: ['weil', 'deshalb', 'trotzdem'], a: 'weil' },
          { type: 'choice', q: 'Der Bus kam nicht. Deshalb ___ ich zu spät.', options: ['kam', 'ich kam', 'kommen'], a: 'kam' }
        ]
      },
      {
        id: 'de-relative', title: 'Относительные придаточные: der, die, das',
        theory: `<p>«Который» по-немецки — <b>der, die, das</b>, род как у слова, к которому оно относится, а падеж — по роли в придаточном. Глагол — в конце.</p>
<p><i>Der Mann, <b>der</b> dort <b>steht</b>, ist mein Lehrer.</i> (кто? — именительный)</p>
<p><i>Der Film, <b>den</b> ich gestern <b>gesehen habe</b>, war toll.</i> (кого/что? — аккузатив: м. р. <b>den</b>)</p>
<p><i>Die Frau, <b>der</b> ich <b>helfe</b>, ist meine Nachbarin.</i> (кому? — датив: <b>dem / der / dem</b>, мн. ч. <b>denen</b>)</p>
<p>С предлогом: <i>Das ist die Stadt, <b>in der</b> ich wohne. Die Freunde, <b>mit denen</b> ich reise …</i></p>`,
        exercises: [
          { type: 'choice', q: 'Der Mann, ___ dort steht, ist mein Vater.', options: ['der', 'den', 'dem'], a: 'der' },
          { type: 'choice', q: 'Das Buch, ___ ich lese, ist spannend.', options: ['das', 'den', 'der'], a: 'das' },
          { type: 'choice', q: 'Der Film, ___ wir gesehen haben, war lang.', options: ['den', 'der', 'dem'], a: 'den' },
          { type: 'choice', q: 'Die Frau, ___ ich helfe, ist sehr alt.', options: ['der', 'die', 'den'], a: 'der' },
          { type: 'choice', q: 'Das ist die Stadt, in ___ ich geboren bin.', options: ['der', 'die', 'dem'], a: 'der' },
          { type: 'choice', q: 'Die Kinder, mit ___ ich spiele, sind nett.', options: ['denen', 'den', 'die'], a: 'denen' },
          { type: 'input', q: 'Die Lampe, ___ ich gekauft habe, ist kaputt. (которую)', a: 'die' }
        ]
      },
      {
        id: 'de-zu-infinitive', title: 'Инфинитив с zu и um … zu',
        theory: `<p>После многих глаголов и выражений инфинитив ставится в конец с частицей <b>zu</b>: <i>Ich habe keine Lust, <b>zu</b> arbeiten. Es ist schwer, Deutsch <b>zu</b> lernen. Vergiss nicht, mich an<b>zu</b>rufen.</i></p>
<p>Так бывает после <i>versuchen, vergessen, anfangen, aufhören, hoffen, Lust haben, Zeit haben, es ist wichtig / schwer / schön</i>. У отделяемых глаголов zu встаёт внутрь: <i>auf<b>zu</b>stehen, ein<b>zu</b>kaufen</i>.</p>
<p>После модальных глаголов и <i>werden</i> zu <b>не</b> нужно: <i>Ich kann schwimmen.</i></p>
<p>Цель «чтобы»: <b>um … zu</b> + инфинитив, если подлежащее то же: <i>Ich lerne Deutsch, <b>um</b> in Berlin <b>zu</b> arbeiten.</i> Если разное — <b>damit</b> + придаточное: <i>Ich erkläre es langsam, <b>damit</b> du es verstehst.</i></p>`,
        exercises: [
          { type: 'choice', q: 'Ich habe keine Zeit, ins Kino ___.', options: ['zu gehen', 'gehen', 'gehe'], a: 'zu gehen' },
          { type: 'choice', q: 'Ich kann heute nicht ___.', options: ['kommen', 'zu kommen', 'komme'], a: 'kommen' },
          { type: 'choice', q: 'Vergiss nicht, Brot ___!', options: ['einzukaufen', 'zu einkaufen', 'einkaufen zu'], a: 'einzukaufen' },
          { type: 'choice', q: 'Ich spare Geld, ___ ein Auto zu kaufen.', options: ['um', 'damit', 'für'], a: 'um' },
          { type: 'choice', q: 'Ich spreche langsam, ___ du mich verstehst.', options: ['damit', 'um', 'zu'], a: 'damit' },
          { type: 'choice', q: 'Es ist wichtig, jeden Tag ___ üben.', options: ['zu', 'um', 'für'], a: 'zu' },
          { type: 'input', q: 'Ich versuche, früher ___. (aufstehen, с zu)', a: 'aufzustehen' }
        ]
      },
      {
        id: 'de-passive', title: 'Пассив: wird gemacht',
        theory: `<p>Пассив показывает, <b>что делается</b>, когда неважно, кто это делает. Форма: <b>werden</b> + причастие (Partizip II) в конце.</p>
<p>Настоящее: <i>Hier <b>wird</b> Deutsch <b>gesprochen</b>. Der Müll <b>wird</b> getrennt. Die Briefe <b>werden</b> morgen <b>geschickt</b>.</i></p>
<p>Прошедшее (Präteritum): <b>wurde</b> + причастие: <i>Das Haus <b>wurde</b> 1900 <b>gebaut</b>. Die Märchen <b>wurden</b> von den Brüdern Grimm <b>gesammelt</b>.</i></p>
<p>Деятель, если он нужен, вводится предлогом <b>von</b> + датив: <i>Das Buch wurde <b>von</b> einer jungen Autorin geschrieben.</i></p>
<p>С модальным глаголом: <i>Das Fenster <b>muss</b> repariert <b>werden</b>.</i></p>`,
        exercises: [
          { type: 'choice', q: 'In der Schweiz ___ vier Sprachen gesprochen.', options: ['werden', 'wird', 'wurde'], a: 'werden' },
          { type: 'choice', q: 'Das Brot ___ jeden Morgen frisch gebacken.', options: ['wird', 'werden', 'ist'], a: 'wird' },
          { type: 'choice', q: 'Der Dom ___ im Mittelalter gebaut.', options: ['wurde', 'wird', 'wurden'], a: 'wurde' },
          { type: 'choice', q: 'Die Wohnung wird morgen ___. (putzen)', options: ['geputzt', 'putzen', 'putzt'], a: 'geputzt' },
          { type: 'choice', q: 'Das Buch wurde ___ einem Studenten geschrieben.', options: ['von', 'mit', 'durch'], a: 'von' },
          { type: 'choice', q: 'Das Auto muss repariert ___.', options: ['werden', 'wird', 'worden'], a: 'werden' },
          { type: 'input', q: 'Hier ___ nicht geraucht. (не курят)', a: 'wird' }
        ]
      },
      {
        id: 'de-konjunktiv', title: 'Konjunktiv II: würde, hätte, wäre',
        theory: `<p>Сослагательное наклонение («бы») нужно для желаний, вежливых просьб и нереальных условий.</p>
<p>Для большинства глаголов: <b>würde</b> + инфинитив: <i>Ich <b>würde</b> gern nach Italien <b>fahren</b>. <b>Würden</b> Sie bitte das Fenster <b>öffnen</b>?</i></p>
<p>У частых глаголов — свои формы: <b>sein → wäre</b>, <b>haben → hätte</b>, <b>können → könnte</b>, <b>müssen → müsste</b>, <b>mögen → möchte</b>: <i>Ich <b>hätte</b> gern einen Kaffee. Das <b>wäre</b> schön. <b>Könnten</b> Sie mir helfen?</i></p>
<p>Нереальное условие: <i>Wenn ich mehr Zeit <b>hätte</b>, <b>würde</b> ich mehr lesen.</i> Совет: <i>Du <b>solltest</b> mehr schlafen.</i> О прошлом: <i>Ich <b>hätte</b> das früher machen <b>sollen</b>.</i></p>`,
        exercises: [
          { type: 'choice', q: 'Ich ___ gern einen Tee, bitte.', options: ['hätte', 'habe gern', 'hatte'], a: 'hätte' },
          { type: 'choice', q: '___ Sie mir bitte helfen?', options: ['Könnten', 'Können', 'Konnten'], a: 'Könnten' },
          { type: 'choice', q: 'Wenn ich reich ___, würde ich reisen.', options: ['wäre', 'war', 'bin'], a: 'wäre' },
          { type: 'choice', q: 'Wenn ich Zeit hätte, ___ ich dich besuchen.', options: ['würde', 'werde', 'wurde'], a: 'würde' },
          { type: 'choice', q: 'Du ___ mehr schlafen. (совет)', options: ['solltest', 'sollst', 'sollte'], a: 'solltest' },
          { type: 'choice', q: 'Das ___ super! (было бы)', options: ['wäre', 'war', 'würde'], a: 'wäre' },
          { type: 'input', q: 'An deiner Stelle ___ ich das nicht machen. (würde)', a: 'würde' }
        ]
      },
      {
        id: 'de-genitive', title: 'Родительный падеж и wegen, trotz',
        theory: `<p><b>Генитив</b> отвечает на вопрос «чей?». Артикли: <b>des</b> (м. и ср. р., к слову добавляется <b>-s / -es</b>) и <b>der</b> (ж. р. и мн. ч.): <i>das Auto <b>des</b> Vater<b>s</b>, die Farbe <b>des</b> Haus<b>es</b>, die Tasche <b>der</b> Frau, die Zimmer <b>der</b> Kinder</i>.</p>
<p>С именами — просто <b>-s</b>: <i>Annas Bruder, Deutschlands Hauptstadt</i>. В разговоре генитив часто заменяют на <b>von</b> + датив: <i>das Auto von meinem Vater</i>.</p>
<p>Генитив нужен после предлогов <b>wegen</b> (из-за), <b>trotz</b> (несмотря на), <b>während</b> (во время), <b>statt</b> (вместо): <i>wegen <b>des</b> Wetter<b>s</b>, trotz <b>des</b> Regen<b>s</b>, während <b>der</b> Arbeit</i>.</p>`,
        exercises: [
          { type: 'choice', q: 'Das ist das Auto ___ Vaters.', options: ['des', 'der', 'dem'], a: 'des' },
          { type: 'choice', q: 'Die Tasche ___ Frau ist rot.', options: ['der', 'des', 'die'], a: 'der' },
          { type: 'choice', q: 'Wegen ___ Regens bleiben wir zu Hause.', options: ['des', 'dem', 'der'], a: 'des' },
          { type: 'choice', q: '___ des schlechten Wetters gehen wir spazieren.', options: ['Trotz', 'Wegen', 'Während'], a: 'Trotz' },
          { type: 'choice', q: 'Während ___ Arbeit trinke ich viel Kaffee.', options: ['der', 'des', 'die'], a: 'der' },
          { type: 'choice', q: 'Das ist ___ Bruder. (брат Анны)', options: ['Annas', 'Anna', 'der Anna'], a: 'Annas' },
          { type: 'input', q: 'die Farbe des ___ (das Haus, генитив)', a: 'hauses' }
        ]
      }
    ]
  }
];

export const ALL_LESSONS = COURSES.flatMap(c => c.lessons.map(l => ({ ...l, course: c.id })));
