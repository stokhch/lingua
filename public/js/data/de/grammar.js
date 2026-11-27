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
      }
    ]
  }
];

export const ALL_LESSONS = COURSES.flatMap(c => c.lessons.map(l => ({ ...l, course: c.id })));
