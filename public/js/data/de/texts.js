// Тексты на немецком для чтения с переводом по клику. Все тексты написаны специально для Лингвы.
import { TEXTS as SONGS } from './songs.js';

const BASE = [
  {
    id: 'de-hallo', level: 'A0', topic: 'Знакомство', title: 'Hallo!',
    body: `— Hallo! Ich heiße Paul. Wie heißt du?

— Hallo, Paul! Ich heiße Anna.

— Freut mich, Anna. Woher kommst du?

— Ich komme aus Russland. Und du?

— Ich komme aus Deutschland. Ich wohne in Berlin. Wie geht's?

— Danke, gut. Und dir?

— Mir geht es auch gut. Bis bald!

— Tschüss!`
  },
  {
    id: 'de-cafe', level: 'A0', topic: 'Еда', title: 'Im Café',
    body: `— Guten Tag! Was möchten Sie?

— Guten Tag. Einen Kaffee, bitte.

— Mit Milch und Zucker?

— Mit Milch, ohne Zucker. Und ein Stück Kuchen, bitte.

— Gern. Sonst noch etwas?

— Nein, danke. Was kostet das?

— Der Kaffee kostet drei Euro, der Kuchen vier Euro. Zusammen sieben Euro.

— Bitte schön.

— Danke schön. Guten Appetit!`
  },
  {
    id: 'de-familie', level: 'A0', topic: 'Семья', title: 'Meine Familie',
    body: `Das ist meine Familie. Mein Vater heißt Thomas, er ist Ingenieur. Meine Mutter heißt Maria, sie ist Lehrerin.

Ich habe einen Bruder und eine Schwester. Mein Bruder ist zehn Jahre alt. Meine Schwester ist noch klein, sie ist drei.

Wir haben auch einen Hund. Er heißt Bello. Er ist groß und sehr lieb. Wir wohnen zusammen in einem Haus mit Garten.`
  },
  {
    id: 'de-weg', level: 'A0', topic: 'Город', title: 'Wo ist der Bahnhof?',
    body: `— Entschuldigung! Wo ist der Bahnhof?

— Der Bahnhof? Gehen Sie hier geradeaus und dann links.

— Ist das weit?

— Nein, nicht weit. Zehn Minuten zu Fuß.

— Und wo ist die Haltestelle?

— Dort drüben, neben dem Café.

— Vielen Dank!

— Bitte. Gute Reise!`
  },
  {
    id: 'de-tag', level: 'A1', topic: 'Быт', title: 'Mein Tag',
    body: `Ich stehe jeden Tag um sieben Uhr auf. Zuerst dusche ich, dann frühstücke ich. Zum Frühstück esse ich ein Brötchen mit Butter und Käse und trinke einen Kaffee.

Um acht Uhr fahre ich mit der U-Bahn zur Arbeit. Ich arbeite in einem Büro im Zentrum. Mittags gehe ich mit meinen Kollegen in ein kleines Restaurant.

Am Abend koche ich oder ich treffe Freunde. Manchmal lese ich ein Buch oder sehe fern. Um elf Uhr gehe ich schlafen.`
  },
  {
    id: 'de-wohnung', level: 'A1', topic: 'Дом', title: 'Meine Wohnung',
    body: `Meine Wohnung ist nicht groß, aber sehr gemütlich. Sie liegt im dritten Stock. Es gibt ein Wohnzimmer, ein Schlafzimmer, eine Küche und ein Bad.

Im Wohnzimmer stehen ein Sofa, ein Tisch und zwei Stühle. An der Wand hängt ein Bild von meiner Oma. Das Fenster ist groß, deshalb ist das Zimmer hell.

Die Küche ist klein, aber modern. Ich habe einen Kühlschrank, einen Herd und eine Kaffeemaschine. Auf dem Balkon wachsen Blumen und Tomaten.`
  },
  {
    id: 'de-wochenende', level: 'A1', topic: 'Отдых', title: 'Das Wochenende',
    body: `Am Samstag schlafe ich lange. Dann gehe ich auf den Markt und kaufe frisches Obst und Gemüse. Am Nachmittag besuche ich meine Eltern. Meine Mutter kocht immer etwas Leckeres.

Am Sonntag ist das Wetter oft schön. Dann fahren wir mit dem Fahrrad an den See. Wir schwimmen, spielen Ball und essen ein Eis. Am Abend bin ich müde, aber glücklich.`
  },
  {
    id: 'de-berlin', level: 'A2', topic: 'Путешествия', title: 'Ein Wochenende in Berlin',
    body: `Letzten Sommer bin ich mit meiner Freundin nach Berlin gefahren. Wir sind am Freitagabend mit dem Zug angekommen und haben ein kleines Hotel in der Nähe vom Bahnhof gefunden.

Am Samstag haben wir die Stadt besichtigt. Zuerst waren wir am Brandenburger Tor, dann sind wir zum Reichstag gegangen. Mittags haben wir eine Currywurst gegessen. Am Nachmittag haben wir ein Stück der Berliner Mauer gesehen. Das war sehr interessant.

Am Sonntag hat es leider geregnet, deshalb sind wir den ganzen Tag im Museum geblieben. Berlin hat mir sehr gut gefallen. Nächstes Jahr möchte ich wieder hinfahren.`
  },
  {
    id: 'de-arzt', level: 'A2', topic: 'Здоровье', title: 'Beim Arzt',
    body: `— Guten Morgen, Frau Weber. Was fehlt Ihnen?

— Guten Morgen, Herr Doktor. Ich fühle mich nicht gut. Ich habe Kopfschmerzen und Fieber.

— Seit wann haben Sie das?

— Seit gestern Abend. Ich habe auch Halsschmerzen und huste viel.

— Das ist eine Erkältung. Sie müssen viel Tee trinken und zu Hause bleiben. Ich gebe Ihnen ein Medikament. Nehmen Sie dreimal täglich eine Tablette.

— Darf ich zur Arbeit gehen?

— Nein, bleiben Sie bitte drei Tage im Bett. Gute Besserung!`
  },
  {
    id: 'de-sprache', level: 'B1', topic: 'Учёба', title: 'Warum ich Deutsch lerne',
    body: `Viele Menschen glauben, dass Deutsch eine schwierige Sprache ist. Es gibt drei Artikel, vier Fälle und lange Wörter wie „Kühlschrank“ oder „Hausaufgabe“. Am Anfang hatte ich auch Angst vor der Grammatik.

Aber mit der Zeit habe ich verstanden, dass Deutsch sehr logisch ist. Lange Wörter bestehen oft aus kurzen Wörtern, die man schon kennt: „Kühlschrank“ ist einfach ein kalter Schrank. Und man liest fast alles so, wie man es schreibt.

Ich lerne jeden Tag zwanzig Minuten. Ich wiederhole neue Wörter, lese kurze Texte und höre deutsche Lieder. Am wichtigsten ist, keine Angst vor Fehlern zu haben. Wer spricht, lernt schneller.`
  },
  // ---------- A1 ----------
  {
    id: 'de-einkaufen', level: 'A1', topic: 'Покупки', title: 'Im Supermarkt',
    body: `Heute ist Samstag. Lena geht in den Supermarkt, denn der Kühlschrank ist fast leer. Sie hat eine Einkaufsliste: Milch, Eier, Brot, Käse, Äpfel und Tomaten.

Im Supermarkt nimmt sie einen Einkaufswagen. Zuerst geht sie zum Obst und Gemüse. Die Äpfel sind heute im Angebot, ein Kilo kostet nur zwei Euro. Lena kauft auch ein Kilo Tomaten.

Dann holt sie Milch, Eier und Käse. Das Brot kauft sie nicht im Supermarkt, sondern beim Bäcker nebenan, denn dort ist es frischer.

An der Kasse fragt die Kassiererin: „Haben Sie eine Tüte?“ — „Ja, ich habe eine Tasche dabei“, antwortet Lena. Sie bezahlt mit Karte. Alles zusammen kostet fünfzehn Euro.`
  },
  {
    id: 'de-wetter', level: 'A1', topic: 'Погода', title: 'Das Wetter in Deutschland',
    body: `In Deutschland gibt es vier Jahreszeiten. Im Frühling wird es langsam wärmer, die Bäume werden grün und überall wachsen Blumen. Aber das Wetter ändert sich oft: Am Morgen scheint die Sonne, und am Nachmittag regnet es.

Im Sommer ist es meistens warm, manchmal sogar heiß. Viele Leute fahren dann an die Ostsee oder in die Berge. Im Herbst werden die Blätter gelb und rot, es ist windig und oft neblig.

Der Winter ist kalt und dunkel. In Süddeutschland und in den Alpen schneit es viel, dann fahren die Leute Ski. In Norddeutschland regnet es im Winter eher. Mein Lieblingswetter? Ein sonniger Herbsttag!`
  },
  {
    id: 'de-hobbys', level: 'A1', topic: 'Хобби', title: 'Meine Hobbys',
    body: `Ich heiße Jonas und ich bin zweiundzwanzig Jahre alt. Ich studiere Informatik in Köln. In meiner Freizeit mache ich gern Sport. Zweimal pro Woche spiele ich Fußball mit Freunden, und am Wochenende fahre ich oft Fahrrad.

Ich lese auch gern, besonders Krimis. Abends höre ich Musik oder spiele Gitarre. Ich spiele noch nicht so gut, aber ich übe jeden Tag ein bisschen.

Meine Freundin Sara mag keinen Sport. Sie malt und fotografiert gern. Zusammen gehen wir oft ins Kino oder ins Museum. Und was machst du in deiner Freizeit?`
  },
  {
    id: 'de-brief', level: 'A1', topic: 'Письмо', title: 'Eine Nachricht an Oma',
    body: `Liebe Oma,

wie geht es dir? Mir geht es gut. Ich bin jetzt seit zwei Wochen in Hamburg. Die Stadt ist sehr schön, aber es regnet oft.

Meine Wohnung ist klein, aber hell. Sie hat ein Zimmer, eine Küche und ein Bad. Meine Nachbarn sind sehr nett. Der Deutschkurs beginnt jeden Tag um neun Uhr. Meine Lehrerin heißt Frau Schulz, sie erklärt alles sehr gut.

Am Sonntag mache ich eine Hafenrundfahrt. Ich schicke dir dann Fotos.

Viele Grüße und bis bald,
deine Mila`
  },
  // ---------- A2 ----------
  {
    id: 'de-umzug', level: 'A2', topic: 'Дом', title: 'Der Umzug',
    body: `Letzten Monat sind Tim und Julia in eine neue Wohnung gezogen. Die alte Wohnung war zu klein, denn im Frühling ist ihr Sohn geboren. Die neue Wohnung hat drei Zimmer und einen Balkon, und sie liegt in der Nähe von einem Park.

Der Umzug war anstrengend. Am Samstag sind um acht Uhr morgens vier Freunde gekommen und haben geholfen. Sie haben die Kisten, die Schränke und die Waschmaschine in einen Lieferwagen getragen. Leider gab es in dem alten Haus keinen Aufzug, und Tim und Julia haben im vierten Stock gewohnt!

Am Abend waren alle müde, aber zufrieden. Julia hat Pizza bestellt, und sie haben zusammen auf dem Balkon gegessen. Jetzt müssen sie noch Lampen aufhängen und Bilder an die Wand hängen. Nächsten Monat wollen sie eine Einweihungsparty machen.`
  },
  {
    id: 'de-urlaub', level: 'A2', topic: 'Путешествия', title: 'Urlaub an der Ostsee',
    body: `Im August haben wir eine Woche Urlaub an der Ostsee gemacht. Wir sind mit dem Auto gefahren, die Fahrt hat sechs Stunden gedauert. Wir haben in einer kleinen Ferienwohnung direkt am Strand gewohnt.

Das Wetter war meistens gut. Jeden Morgen sind wir früh aufgestanden und am Strand spazieren gegangen. Die Kinder haben Sandburgen gebaut und im Meer gebadet. Das Wasser war ziemlich kalt, nur achtzehn Grad, aber das hat ihnen nichts ausgemacht.

An einem Tag hat es geregnet. Da haben wir ein Schiff genommen und eine kleine Insel besucht. Abends haben wir oft Fischbrötchen gegessen, die sind dort besonders lecker. Es war ein wunderbarer Urlaub, und wir möchten nächstes Jahr wiederkommen.`
  },
  {
    id: 'de-vorstellungsgespraech', level: 'A2', topic: 'Работа', title: 'Das Vorstellungsgespräch',
    body: `— Guten Tag, Herr Novak. Bitte nehmen Sie Platz. Erzählen Sie uns etwas über sich.

— Guten Tag. Ich bin achtundzwanzig Jahre alt und komme aus Tschechien. Ich habe in Prag Informatik studiert. Seit drei Jahren arbeite ich als Programmierer bei einer kleinen Firma.

— Warum möchten Sie bei uns arbeiten?

— Ihre Firma ist international, und ich möchte an großen Projekten arbeiten. Außerdem möchte ich in Deutschland leben, weil meine Frau hier eine Stelle bekommen hat.

— Wie gut sprechen Sie Deutsch?

— Ich lerne seit zwei Jahren Deutsch. Im Moment mache ich einen Deutschkurs am Abend und lerne für die Prüfung auf Niveau B eins. Englisch spreche ich fließend.

— Sehr gut. Haben Sie noch Fragen?

— Ja. Wann kann ich anfangen, und kann man manchmal von zu Hause arbeiten?

— Sie könnten am ersten März anfangen. Und ja, zwei Tage pro Woche ist Homeoffice möglich. Wir melden uns bis Freitag bei Ihnen.`
  },
  {
    id: 'de-geburtstag', level: 'A2', topic: 'Праздники', title: 'Eine Geburtstagsparty',
    body: `Am Freitag hatte meine Kollegin Anja Geburtstag. Sie ist dreißig geworden und hat eine große Party gemacht. Sie hat ungefähr zwanzig Gäste eingeladen: Freunde, Kollegen und ihre Familie.

Ich wusste nicht, was ich ihr schenken soll. Zum Glück hat mir ihr Mann einen Tipp gegeben: Anja liest gern und möchte Italienisch lernen. Also habe ich ihr ein italienisches Kochbuch und einen Blumenstrauß gekauft.

Die Party hat um acht Uhr begonnen. Es gab ein großes Buffet mit Salaten, Käse und einem Schokoladenkuchen. Später haben wir getanzt und viel gelacht. Um Mitternacht haben alle „Zum Geburtstag viel Glück“ gesungen. Ich bin erst um zwei Uhr nach Hause gekommen.`
  },
  {
    id: 'de-rezept', level: 'A2', topic: 'Еда', title: 'Ein einfaches Rezept: Kartoffelsuppe',
    body: `Kartoffelsuppe ist ein typisches deutsches Gericht. Sie ist einfach, billig und schmeckt besonders im Winter.

Sie brauchen für vier Personen: ein Kilo Kartoffeln, zwei Karotten, eine Zwiebel, einen Liter Gemüsebrühe, etwas Butter, Salz, Pfeffer und frische Petersilie. Wer möchte, nimmt noch ein paar Würstchen.

Zuerst schälen Sie die Kartoffeln, die Karotten und die Zwiebel und schneiden alles in kleine Stücke. Dann braten Sie die Zwiebel in der Butter an. Danach geben Sie die Kartoffeln, die Karotten und die Brühe in den Topf. Die Suppe muss etwa zwanzig Minuten kochen.

Am Ende pürieren Sie einen Teil der Suppe, damit sie cremig wird. Mit Salz und Pfeffer würzen, die Würstchen in Scheiben schneiden und dazugeben. Zum Schluss streuen Sie Petersilie darüber. Guten Appetit!`
  },
  // ---------- B1 ----------
  {
    id: 'de-muell', level: 'B1', topic: 'Экология', title: 'Mülltrennung in Deutschland',
    body: `Wer nach Deutschland zieht, ist oft überrascht: Vor jedem Haus stehen mehrere Mülltonnen in verschiedenen Farben. In Deutschland wird der Müll nämlich getrennt.

In die blaue Tonne kommen Papier und Pappe, in die gelbe Tonne oder den gelben Sack Verpackungen aus Plastik und Metall. Die braune Tonne ist für Biomüll, also für Essensreste und Gartenabfälle. Alles andere, was man nicht recyceln kann, kommt in die schwarze oder graue Restmülltonne. Glasflaschen bringt man zum Glascontainer, und zwar getrennt nach Farben: weiß, grün und braun.

Für viele Flaschen und Dosen bezahlt man im Geschäft außerdem ein Pfand. Wenn man die leeren Flaschen in den Supermarkt zurückbringt, bekommt man das Geld zurück. Deshalb sieht man auf den Straßen kaum Dosen.

Am Anfang finden viele Ausländer dieses System kompliziert. Aber die meisten gewöhnen sich schnell daran, denn sie verstehen, dass Mülltrennung gut für die Umwelt ist.`
  },
  {
    id: 'de-homeoffice', level: 'B1', topic: 'Работа', title: 'Homeoffice: Fluch oder Segen?',
    body: `Seit einigen Jahren arbeiten viele Deutsche ganz oder teilweise von zu Hause aus. Was früher eine Ausnahme war, ist heute für Millionen Menschen normal geworden. Aber ist Homeoffice wirklich besser als die Arbeit im Büro?

Die Vorteile liegen auf der Hand: Man spart sich den Weg zur Arbeit und damit Zeit und Geld. Viele können sich den Tag freier einteilen und Beruf und Familie leichter verbinden. Außerdem arbeiten manche Menschen zu Hause konzentrierter, weil sie nicht ständig von Kollegen gestört werden.

Es gibt aber auch Nachteile. Wer allein zu Hause sitzt, fühlt sich schnell einsam. Der Kontakt zu den Kollegen fehlt, und spontane Gespräche in der Kaffeeküche, in denen oft gute Ideen entstehen, gibt es nicht mehr. Viele haben auch Probleme, nach der Arbeit abzuschalten, weil Büro und Wohnzimmer derselbe Raum sind.

Deshalb wählen die meisten Firmen heute eine Mischung: zwei oder drei Tage im Büro, den Rest zu Hause. So kann man die Vorteile von beiden Modellen nutzen.`
  },
  {
    id: 'de-weihnachtsmarkt', level: 'B1', topic: 'Традиции', title: 'Auf dem Weihnachtsmarkt',
    body: `Wenn im Dezember die Tage kurz und kalt werden, öffnen in fast jeder deutschen Stadt die Weihnachtsmärkte. Die Tradition ist sehr alt: Der Dresdner Striezelmarkt, einer der bekanntesten, findet schon seit dem fünfzehnten Jahrhundert statt.

Auf dem Weihnachtsmarkt stehen kleine Holzhäuser, die mit Lichtern und Tannenzweigen geschmückt sind. Dort kann man Geschenke kaufen: Kerzen, Holzspielzeug, Schmuck oder handgemachte Weihnachtsdekoration. Überall riecht es nach gebrannten Mandeln, Lebkuchen und Bratwurst.

Das beliebteste Getränk ist der Glühwein, ein heißer Rotwein mit Zimt, Nelken und Orangen. Man trinkt ihn aus einer bunten Tasse, die man behalten oder gegen Pfand zurückgeben kann. Für Kinder gibt es Kinderpunsch ohne Alkohol.

Viele Leute gehen nach der Arbeit mit Kollegen oder Freunden auf den Weihnachtsmarkt. Für sie gehört dieser Besuch genauso zur Adventszeit wie der Adventskranz und der Adventskalender.`
  },
  {
    id: 'de-smartphone', level: 'B1', topic: 'Общество', title: 'Ein Leben ohne Smartphone?',
    body: `Letzten Monat habe ich ein Experiment gemacht: Eine Woche lang habe ich mein Smartphone nicht benutzt. Ich hatte gemerkt, dass ich jeden Tag mehr als vier Stunden auf den Bildschirm schaue, und das hat mich erschreckt.

Die ersten zwei Tage waren schwierig. Ich griff ständig in die Tasche, obwohl das Handy zu Hause in der Schublade lag. Ohne Navigation musste ich nach dem Weg fragen, und ohne den Wecker im Handy habe ich mir einen alten Wecker gekauft. Meine Freunde fanden die Idee verrückt, weil ich ihre Nachrichten nicht sofort beantworten konnte.

Ab dem dritten Tag wurde es leichter. Ich habe abends wieder Bücher gelesen und bin früher eingeschlafen. In der U-Bahn habe ich die Menschen beobachtet, statt durch soziale Netzwerke zu scrollen. Ich hatte das Gefühl, dass ich mehr Zeit habe als vorher.

Natürlich benutze ich mein Smartphone inzwischen wieder. Aber ich habe einige Regeln eingeführt: Beim Essen bleibt das Handy in einem anderen Zimmer, und nach zweiundzwanzig Uhr schaue ich keine Nachrichten mehr an. Wenn ich ehrlich bin, hätte ich das schon viel früher machen sollen.`
  },
  {
    id: 'de-wohnungssuche', level: 'B1', topic: 'Город', title: 'Wohnungssuche in der Großstadt',
    body: `Wer in München, Berlin oder Hamburg eine Wohnung sucht, braucht viel Geduld. Die Mieten sind in den letzten Jahren stark gestiegen, und auf eine Wohnung kommen oft hundert Bewerber.

Zu einer Wohnungsbesichtigung bringt man am besten eine Mappe mit allen wichtigen Unterlagen mit: eine Kopie des Personalausweises, die letzten drei Gehaltsabrechnungen und eine Bestätigung vom alten Vermieter, dass man die Miete immer pünktlich bezahlt hat. Ohne diese Dokumente hat man kaum eine Chance.

In den Anzeigen findet man viele Abkürzungen, die man zuerst verstehen muss. „Kaltmiete“ bedeutet die Miete ohne Heizung und Wasser, bei der „Warmmiete“ sind diese Nebenkosten schon enthalten. Außerdem verlangen die meisten Vermieter eine Kaution von bis zu drei Monatsmieten.

Viele junge Leute ziehen deshalb in eine Wohngemeinschaft, kurz WG. Dort hat jeder sein eigenes Zimmer, aber Küche und Bad teilt man sich. Das ist günstiger, und man ist nicht allein. Manche Freundschaften, die in einer WG beginnen, halten ein Leben lang.`
  },
  {
    id: 'de-maerchen', level: 'B1', topic: 'Культура', title: 'Die Brüder Grimm',
    body: `Fast jedes Kind kennt die Geschichten von Rotkäppchen, Hänsel und Gretel oder Aschenputtel. Dass diese Märchen heute auf der ganzen Welt bekannt sind, verdanken wir zwei Brüdern aus Hessen: Jacob und Wilhelm Grimm.

Die beiden lebten Anfang des neunzehnten Jahrhunderts und waren eigentlich Sprachwissenschaftler. Sie interessierten sich für die deutsche Sprache und Kultur und begannen deshalb, alte Geschichten zu sammeln, die man sich im Volk erzählte. Sie hörten den Erzählerinnen zu, schrieben die Märchen auf und veröffentlichten sie im Jahr 1812 in einem Buch mit dem Titel „Kinder- und Hausmärchen“.

Die ersten Ausgaben waren eigentlich gar nicht für Kinder gedacht, denn viele Märchen waren ziemlich grausam. Erst später hat Wilhelm die Texte so verändert, dass man sie Kindern vorlesen konnte.

Die Brüder Grimm haben aber nicht nur Märchen gesammelt. Sie begannen auch das „Deutsche Wörterbuch“, das größte Wörterbuch der deutschen Sprache. Es wurde erst über hundert Jahre nach ihrem Tod fertig.`
  },
  {
    id: 'de-ortsnamen', level: 'B1', topic: 'Культура', title: 'Was Ortsnamen erzählen', set: 'toponyms',
    note: 'Текст написан для Лингвы по общедоступным сведениям о немецкой топонимике. Где происхождение названия спорно, это сказано прямо.',
    summary: 'Что значат названия немецких городов. Кёльн и Кобленц основаны римлянами (лат. colonia — «поселение», confluentes — «сливающиеся»). Франкфурт — «брод франков», города на -burg выросли у крепостей, Дюссельдорф — «деревня на реке Дюссель». Мюнхен значит «у монахов». Окончания -ing и -ingen означают «у людей такого-то». На востоке много славянских названий: Лейпциг — от слова «липа», Дрезден — «жители болотистого леса». Название Берлин, скорее всего, тоже славянское и значит «болото», а медведь на гербе — просто игра слов.',
    explain: [
      ['der Ortsname', 'название населённого пункта, топоним'],
      ['Köln', 'от лат. colonia — «поселение, колония» (римская Colonia Claudia Ara Agrippinensium). Общепринятое толкование'],
      ['Koblenz', 'от лат. confluentes — «сливающиеся»: город стоит при впадении Мозеля в Рейн'],
      ['die Furt', 'брод. Frankfurt am Main — «брод франков на Майне»'],
      ['die Burg', 'крепость, замок. Hamburg, Magdeburg, Würzburg выросли у крепостей; значение первой части в каждом названии своё и не всегда ясно'],
      ['das Dorf', 'деревня. Düsseldorf — «деревня на реке Дюссель»'],
      ['München', '«у монахов» (древнее Munichen): на гербе города — фигурка монаха, «Münchner Kindl»'],
      ['-ing, -ingen', 'суффикс принадлежности: «у людей (рода) такого-то». Freising, Tübingen, Sigmaringen; особенно часты на юге Германии'],
      ['Leipzig', 'от лужицкого (сорбского) lipsk — «место, где растут липы»'],
      ['Dresden', 'от лужицкого слова, примерно «жители болотистого леса»'],
      ['Berlin', 'по самой распространённой версии — от древнего славянского слова со значением «болото, топь». Народная связь с Bär (медведь, он на гербе) — игра слов. Вопрос до конца не решён'],
      ['sich einig sein', 'быть единодушными, соглашаться (die Forscher sind sich nicht einig — исследователи расходятся во мнениях)'],
      ['das Wortspiel', 'игра слов']
    ],
    translation: `Многие немецкие названия мест очень старые. Кто знает несколько старых слов, часто может угадать, как возник город.

На Рейне и Мозеле почти две тысячи лет назад римляне основывали города. Кёльн происходит от латинского слова colonia, то есть «поселение» или «колония». Кобленц лежит там, где Мозель впадает в Рейн, а название происходит от латинского confluentes — «сливающиеся».

Многие названия описывают, как выглядело поселение или где оно находилось. Брод — это мелкое место в реке, через которое можно пройти или проехать. Значит, Франкфурт был «бродом франков» на Майне. Бург был крепостью; отсюда названия вроде Гамбург, Магдебург или Вюрцбург. Дюссельдорф когда-то был маленькой деревней на реке Дюссель.

Люди тоже давали городам свои имена. Мюнхен значит «у монахов», потому что вначале здесь жили монахи. Поэтому на гербе города до сих пор виден маленький монах — «мюнхенское дитя». На юге Германии многие названия оканчиваются на -ing или -ingen, например Фрайзинг или Тюбинген. Это окончание означает примерно «у людей такого-то…».

На востоке Германии раньше жили славянские народы, поэтому у многих городов там славянские названия. Лейпциг происходит от лужицкого слова «липа», Дрезден значит примерно «люди в болотистом лесу».

Насчёт Берлина исследователи не вполне единодушны. Большинство считает, что название происходит из славянского языка и значит «болото». С медведем на гербе оно, вероятно, никак не связано — это просто игра слов.

Так почти каждое название места рассказывает маленькую историю. Надо только внимательно прислушаться.`,
    body: `Viele deutsche Ortsnamen sind sehr alt. Wer ein paar alte Wörter kennt, kann oft erraten, wie eine Stadt entstanden ist.

Am Rhein und an der Mosel gründeten die Römer vor fast zweitausend Jahren Städte. Köln kommt vom lateinischen Wort colonia, also „Siedlung“ oder „Kolonie“. Koblenz liegt dort, wo die Mosel in den Rhein fließt, und der Name kommt vom lateinischen confluentes – „die Zusammenfließenden“.

Viele Namen beschreiben, wie eine Siedlung aussah oder wo sie lag. Eine Furt ist eine flache Stelle in einem Fluss, durch die man gehen oder fahren kann. Frankfurt war also die „Furt der Franken“ am Main. Eine Burg war eine Festung; daher kommen Namen wie Hamburg, Magdeburg oder Würzburg. Düsseldorf war einmal ein kleines Dorf an dem Fluss Düssel.

Auch Menschen gaben Städten ihre Namen. München bedeutet „bei den Mönchen“, denn am Anfang lebten hier Mönche. Deshalb sieht man auf dem Wappen der Stadt bis heute einen kleinen Mönch, das „Münchner Kindl“. In Süddeutschland enden viele Namen auf -ing oder -ingen, zum Beispiel Freising oder Tübingen. Diese Endung bedeutet ungefähr „bei den Leuten von …“.

Im Osten Deutschlands lebten früher slawische Völker, deshalb haben viele Städte dort slawische Namen. Leipzig kommt von einem sorbischen Wort für „Linde“, Dresden bedeutet ungefähr „die Leute im Sumpfwald“.

Bei Berlin sind sich die Forscher nicht ganz einig. Die meisten glauben, dass der Name aus einer slawischen Sprache kommt und „Sumpf“ bedeutet. Mit dem Bären auf dem Wappen hat er wahrscheinlich nichts zu tun – das ist nur ein Wortspiel.

So erzählt fast jeder Ortsname eine kleine Geschichte. Man muss nur genau hinhören.`
  }
];

// Песни и стихи (полка «Песни и стихи») — после основных текстов
export const TEXTS = [...BASE, ...SONGS];
