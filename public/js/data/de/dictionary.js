// Встроенный немецко-русский словарь проекта (составлен вручную для Лингвы).
// Формат строк: "слово|перевод|формы через запятую". Существительные пишутся с артиклем
// («der Hund|собака|Hunde»): в словарь попадает «hund», а к переводу добавляется род — «собака (der)».
// Глаголы даны в инфинитиве; у сильных и неправильных глаголов в третьем поле — особые формы
// (3-е лицо, прошедшее, причастие), чтобы перевод по клику находил «fährt», «ging», «gegessen».
// Ключ блока = тематический набор.
import { MORE_RAW, MORE_INFO } from './more-sets.js';

const RAW = {
start: `hallo|привет, здравствуйте
guten Morgen|доброе утро
guten Tag|добрый день, здравствуйте
guten Abend|добрый вечер
gute Nacht|спокойной ночи
tschüss|пока
auf Wiedersehen|до свидания
bis bald|до скорого
bis morgen|до завтра
wie geht's|как дела?
gut|хорошо; хороший|besser,beste,besten,bester,bestes
danke|спасибо
danke schön|большое спасибо
bitte|пожалуйста
bitte schön|пожалуйста (в ответ на спасибо)
gern|охотно, с удовольствием|gerne,lieber,am liebsten
ja|да
nein|нет
nicht|не
entschuldigung|извините, простите
es tut mir leid|мне жаль
willkommen|добро пожаловать
herzlich|сердечный, тёплый
freut mich|очень приятно
alles|всё
klar|ясно, понятно; ясный
okay|хорошо, ладно
genau|точно, именно
vielleicht|может быть
wie bitte|простите, что? (переспросить)
die Toilette|туалет|Toiletten
der Herr|господин|Herren,Herrn
die Frau|женщина; жена; госпожа|Frauen
das Glück|удача, счастье
prost|за здоровье!
guten Appetit|приятного аппетита
willkommen zurück|с возвращением
vielen Dank|большое спасибо
ein bisschen|немного
bisschen|немного (ein bisschen)
sonst|иначе; кроме того
sonst noch etwas|что-нибудь ещё?
zu Hause|дома
nach Hause|домой`,

numbers: `null|ноль
eins|один (при счёте)
ein|один; неопределённый артикль|eine,einen,einem,einer,eines
zwei|два
drei|три
vier|четыре
fünf|пять
sechs|шесть
sieben|семь
acht|восемь
neun|девять
zehn|десять
elf|одиннадцать
zwölf|двенадцать
dreizehn|тринадцать
fünfzehn|пятнадцать
sechzehn|шестнадцать
siebzehn|семнадцать
zwanzig|двадцать
einundzwanzig|двадцать один
fünfundzwanzig|двадцать пять
dreimal|три раза
mal|раз; -ка (смягчает просьбу)
dreißig|тридцать
vierzig|сорок
fünfzig|пятьдесят
sechzig|шестьдесят
siebzig|семьдесят
achtzig|восемьдесят
neunzig|девяносто
hundert|сто
tausend|тысяча
die Million|миллион|Millionen
erste|первый|erster,ersten,erstes,erstem
zweite|второй|zweiter,zweiten
dritte|третий|dritter,dritten
halb|половина; полу-
das Viertel|четверть
der Euro|евро|Euros
der Cent|цент|Cents
wie viel|сколько
kosten|стоить
der Preis|цена|Preise
zusammen|вместе; итого`,

core: `ich|я|mich,mir
du|ты|dich,dir
er|он|ihn,ihm
sie|она; они; Вы (с заглавной)|ihnen,Ihnen
es|оно; это
wir|мы|uns
ihr|вы; её; их|ihre,ihren,ihrem,ihrer,ihres,euch
man|кто-то (безличное: «говорят», «можно»)
der|определённый артикль (м. р.)|dem,den,des
die|определённый артикль (ж. р., мн. ч.)
das|определённый артикль (ср. р.); это
mein|мой|meine,meinen,meinem,meiner,meines
dein|твой|deine,deinen,deinem,deiner,deines
sein|его; быть|seine,seinen,seinem,seiner,seines,bin,bist,ist,sind,seid,war,warst,waren,wart,gewesen,wäre,wären
unser|наш|unsere,unseren,unserem,unserer,unseres,unsre
euer|ваш|eure,euren,eurem,eurer
kein|никакой, не (при существительном)|keine,keinen,keinem,keiner,keines
dieser|этот|diese,diesen,diesem,dieses
jeder|каждый|jede,jeden,jedem,jedes
was|что
wer|кто|wen,wem
wo|где
wohin|куда
woher|откуда
wann|когда
wie|как
warum|почему
welcher|какой, который|welche,welchen,welches,welchem
und|и
oder|или
aber|но
denn|ведь, потому что
weil|потому что
dass|что (союз)
wenn|если; когда
als|когда (в прошлом); чем; в качестве
ob|ли
dann|потом, тогда
auch|тоже, также
sehr|очень
viel|много|viele,vielen,vieles,mehr,meisten
wenig|мало|wenige,weniger
schon|уже
noch|ещё
nur|только
immer|всегда
oft|часто
manchmal|иногда
nie|никогда
hier|здесь
dort|там
da|там, тут; так как
heute|сегодня
morgen|завтра; утро
gestern|вчера
jetzt|сейчас
bald|скоро
in|в|im,ins
an|у, на (вертикальной поверхности)|am,ans
auf|на
aus|из
bei|у, при|beim
mit|с
nach|после; в (город, страну)
von|от, из|vom
zu|к; слишком|zum,zur
für|для
ohne|без
über|над; о, про
unter|под; среди
vor|перед; назад (тому)
hinter|за, позади
neben|рядом с
zwischen|между
um|вокруг; в (о времени)
bis|до
seit|с (какого-то времени)
gegen|против; около
durch|через
so|так
sich|себя, -ся
selbst|сам
etwas|что-то; немного
nichts|ничего
jemand|кто-то|jemanden
niemand|никто
alle|все
andere|другой|anderen,anderer,anderes,anderem
dort drüben|вон там
zurück|назад, обратно
weg|прочь; ушёл
wieder|снова
zuerst|сначала
endlich|наконец
sofort|сразу
also|итак, значит
ganz|весь, целый; совсем|ganze,ganzen,ganzer
fast|почти
leider|к сожалению
natürlich|конечно; естественный
wirklich|действительно
zum Beispiel|например
das Beispiel|пример|Beispiele
oben|наверху
unten|внизу
links|слева, налево
rechts|справа, направо
geradeaus|прямо
überall|везде
dabei|при этом
deshalb|поэтому
trotzdem|тем не менее
außerdem|кроме того
sondern|а (после отрицания)
damit|чтобы; этим
mittags|днём, в обед
in der Nähe|рядом, поблизости
die Nähe|близость, окрестность
fern|далёкий, далеко`,

verbs: `haben|иметь|habe,hast,hat,habt,hatte,hattest,hatten,hattet,gehabt,hätte
werden|становиться; будет (будущее)|wirst,wird,werdet,wurde,wurdest,wurden,geworden,würde,würdest,würden
können|мочь, уметь|kann,kannst,konnte,konntest,konnten,gekonnt,könnte
müssen|быть должным|muss,musst,musste,mussten,gemusst
wollen|хотеть|will,willst,wollte,wollten,gewollt
dürfen|сметь, иметь право|darf,darfst,durfte,durften
sollen|быть должным (по чьему-то слову)|sollte,sollten
mögen|любить, нравиться|mag,magst,mochte,mochten,möchte,möchtest,möchten,möchtet
machen|делать
gehen|идти|ging,gingst,gingen,gegangen
kommen|приходить|kam,kamst,kamen,gekommen
fahren|ехать|fährst,fährt,fuhr,fuhren,gefahren
sagen|сказать
sprechen|говорить|sprichst,spricht,sprach,sprachen,gesprochen
fragen|спрашивать
antworten|отвечать
sehen|видеть|siehst,sieht,sah,sahen,gesehen
hören|слышать, слушать
essen|есть, кушать|isst,aß,aßen,gegessen
trinken|пить|trank,tranken,getrunken
schlafen|спать|schläfst,schläft,schlief,schliefen,geschlafen
lesen|читать|liest,las,lasen,gelesen
schreiben|писать|schrieb,schrieben,geschrieben
lernen|учить, учиться
wohnen|жить (где-то)
leben|жить
arbeiten|работать
spielen|играть
kaufen|покупать
bezahlen|платить
geben|давать|gibst,gibt,gab,gaben,gegeben
nehmen|брать|nimmst,nimmt,nahm,nahmen,genommen
finden|находить; считать (мнение)|fand,fanden,gefunden
suchen|искать
bringen|приносить|brachte,brachten,gebracht
denken|думать|dachte,dachten,gedacht
wissen|знать|weiß,weißt,wusste,wussten,gewusst
kennen|знать, быть знакомым|kannte,kannten,gekannt
glauben|верить, полагать
heißen|называться, зваться|hieß,geheißen,heiße
bleiben|оставаться|blieb,blieben,geblieben
stehen|стоять|stand,standen,gestanden
liegen|лежать|lag,lagen,gelegen
sitzen|сидеть|saß,saßen,gesessen
laufen|бежать; идти пешком|läufst,läuft,lief,liefen,gelaufen
helfen|помогать|hilfst,hilft,half,halfen,geholfen
warten|ждать
öffnen|открывать
schließen|закрывать|schloss,geschlossen
beginnen|начинать|begann,begannen,begonnen
lieben|любить
brauchen|нуждаться
zeigen|показывать
verstehen|понимать|verstand,verstanden
vergessen|забывать|vergisst,vergaß,vergessen
bekommen|получать|bekam,bekamen
besuchen|посещать, навещать
reisen|путешествовать
kochen|готовить, варить
tragen|носить, нести|trägst,trägt,trug,trugen,getragen
treffen|встречать|triffst,trifft,traf,trafen,getroffen
aufstehen|вставать|aufgestanden,aufzustehen
anrufen|звонить (по телефону)|angerufen,anzurufen
einkaufen|делать покупки|eingekauft
fernsehen|смотреть телевизор|ferngesehen
mitkommen|идти вместе|mitgekommen
ankommen|прибывать|angekommen
abfahren|отправляться|abgefahren
aussehen|выглядеть|ausgesehen
anfangen|начинать|fängt,fing,fingen,angefangen
gefallen|нравиться|gefällt,gefiel
erzählen|рассказывать
erklären|объяснять
benutzen|пользоваться
wandern|ходить в походы
schwimmen|плавать|schwamm,geschwommen
tanzen|танцевать
singen|петь|sang,gesungen
lachen|смеяться
weinen|плакать
fliegen|лететь|flog,flogen,geflogen
verlieren|терять|verlor,verloren
gewinnen|выигрывать|gewann,gewonnen
versuchen|пытаться
üben|упражняться
wiederholen|повторять
übersetzen|переводить
legen|класть
stellen|ставить
setzen|сажать; садиться (sich)
waschen|мыть|wäscht,wusch,gewaschen
duschen|принимать душ
frühstücken|завтракать
mieten|снимать, арендовать
lassen|оставлять; позволять|lässt,ließ,gelassen
tun|делать|tut,tat,getan
holen|забирать, приносить
packen|паковать
bestellen|заказывать
probieren|пробовать
erinnern|напоминать; вспоминать (sich)
freuen|радовать; радоваться (sich)
fühlen|чувствовать
gehören|принадлежать
passieren|случаться
dauern|длиться
regnen|идти (о дожде)
scheinen|светить; казаться|schien,geschienen
schneien|идти (о снеге)
fotografieren|фотографировать
wählen|выбирать
entscheiden|решать|entschied,entschieden
vorstellen|представлять|vorgestellt
kennenlernen|знакомиться|kennengelernt
hängen|висеть; вешать|hing,gehangen
wachsen|расти|wächst,wuchs,gewachsen
besichtigen|осматривать (достопримечательности)
hinfahren|съездить туда|hingefahren
fehlen|не хватать; отсутствовать
bestehen|состоять (aus — из); сдать (экзамен)|bestand,bestanden`,

family: `die Familie|семья|Familien
die Eltern|родители (мн. ч.)
die Mutter|мать|Mütter
der Vater|отец|Väter
die Mama|мама
der Papa|папа
der Sohn|сын|Söhne
die Tochter|дочь|Töchter
der Bruder|брат|Brüder
die Schwester|сестра|Schwestern
die Geschwister|братья и сёстры (мн. ч.)
die Großmutter|бабушка|Großmütter
der Großvater|дедушка|Großväter
die Oma|бабушка (разг.)
der Opa|дедушка (разг.)
die Großeltern|бабушка и дедушка (мн. ч.)
das Kind|ребёнок|Kinder
das Baby|младенец|Babys
der Mann|мужчина; муж|Männer
der Onkel|дядя
die Tante|тётя|Tanten
der Cousin|двоюродный брат
die Cousine|двоюродная сестра
der Enkel|внук
die Enkelin|внучка
der Freund|друг; парень|Freunde
die Freundin|подруга; девушка|Freundinnen
der Nachbar|сосед|Nachbarn
die Nachbarin|соседка
der Mensch|человек|Menschen
die Leute|люди (мн. ч.)
der Junge|мальчик|Jungen
das Mädchen|девочка
die Hochzeit|свадьба|Hochzeiten
heiraten|жениться, выходить замуж
verheiratet|женатый, замужняя
ledig|холостой, незамужняя
geboren|рождённый
der Geburtstag|день рождения|Geburtstage
das Alter|возраст
alt|старый|alte,alten,alter,altes,älter,ältere,älteren,älteste
jung|молодой|junge,jungen,junger,jünger,jüngere,jüngeren,jüngste
der Name|имя|Namen
der Vorname|имя (личное)
der Gast|гость|Gäste
das Haustier|домашнее животное|Haustiere`,

food: `das Essen|еда
das Frühstück|завтрак
das Mittagessen|обед
das Abendessen|ужин
das Brot|хлеб|Brote
das Brötchen|булочка
die Butter|масло (сливочное)
der Käse|сыр
die Wurst|колбаса|Würste
das Ei|яйцо|Eier
die Milch|молоко
der Kaffee|кофе
der Tee|чай
das Wasser|вода
der Saft|сок|Säfte
das Bier|пиво
der Wein|вино|Weine
das Fleisch|мясо
der Fisch|рыба|Fische
das Huhn|курица|Hühner
das Hähnchen|курица (блюдо)
das Gemüse|овощи
das Obst|фрукты
der Apfel|яблоко|Äpfel
die Kartoffel|картофель|Kartoffeln
die Tomate|помидор|Tomaten
der Salat|салат|Salate
die Suppe|суп|Suppen
der Kuchen|пирог, торт
das Eis|мороженое; лёд
die Currywurst|сосиска с соусом карри|Currywürste
die Kaffeemaschine|кофеварка|Kaffeemaschinen
die Schokolade|шоколад
der Zucker|сахар
das Salz|соль
der Reis|рис
die Nudeln|макароны (мн. ч.)
die Brezel|крендель, брецель|Brezeln
das Schnitzel|шницель
die Bratwurst|жареная колбаска|Bratwürste
das Restaurant|ресторан|Restaurants
das Café|кафе|Cafés
die Speisekarte|меню|Speisekarten
die Rechnung|счёт|Rechnungen
der Kellner|официант
die Kellnerin|официантка
der Tisch|стол|Tische
der Teller|тарелка
die Tasse|чашка|Tassen
das Glas|стакан; стекло|Gläser
lecker|вкусный|leckere,leckeren,lecker
süß|сладкий
satt|сытый
hungrig|голодный
der Hunger|голод
der Durst|жажда
frisch|свежий
warm|тёплый|warme,warmen,wärmer
kalt|холодный|kalte,kalten,kälter
das Stück|кусок, штука|Stücke
die Bäckerei|пекарня|Bäckereien
der Supermarkt|супермаркет|Supermärkte
der Markt|рынок|Märkte`,

travel: `die Reise|путешествие, поездка|Reisen
der Urlaub|отпуск
die Stadt|город|Städte
das Land|страна; деревня (сельская местность)|Länder
das Dorf|деревня|Dörfer
die Straße|улица; дорога|Straßen
der Platz|площадь; место|Plätze
der Bahnhof|вокзал|Bahnhöfe
der Zug|поезд|Züge
der Bus|автобус|Busse
die U-Bahn|метро
die S-Bahn|городская электричка
die Straßenbahn|трамвай
das Auto|машина|Autos
das Fahrrad|велосипед|Fahrräder
das Flugzeug|самолёт|Flugzeuge
der Flughafen|аэропорт|Flughäfen
die Haltestelle|остановка|Haltestellen
die Fahrkarte|проездной билет|Fahrkarten
das Ticket|билет|Tickets
der Koffer|чемодан
der Pass|паспорт|Pässe
das Hotel|гостиница|Hotels
das Zimmer|комната; номер|Zimmer
die Nacht|ночь|Nächte
der Weg|путь, дорога|Wege
die Karte|карта; билет; открытка|Karten
das Museum|музей|Museen
die Kirche|церковь|Kirchen
der Dom|собор|Dome
das Schloss|замок, дворец|Schlösser
die Burg|крепость, замок|Burgen
die Brücke|мост|Brücken
der Turm|башня|Türme
das Tor|ворота|Tore
die Mauer|стена|Mauern
das Zentrum|центр
die Altstadt|старый город
die Hauptstadt|столица
der Tourist|турист|Touristen
das Foto|фотография|Fotos
die Ankunft|прибытие
die Abfahrt|отправление
der Ausgang|выход
der Eingang|вход
die Grenze|граница|Grenzen
Deutschland|Германия
Österreich|Австрия
die Schweiz|Швейцария
Russland|Россия
Europa|Европа
deutsch|немецкий; Deutsch — немецкий язык|deutsche,deutschen,deutscher,deutsches
russisch|русский; Russisch — русский язык|russische,russischen
der Deutsche|немец|Deutschen
der Russe|русский (человек)|Russen
die Russin|русская
weit|далеко; далёкий
nah|близко|nahe,näher
das Meer|море|Meere
Berlin|Берлин
berliner|берлинский
Moskau|Москва
München|Мюнхен
Wien|Вена
Hamburg|Гамбург
Brandenburger Tor|Бранденбургские ворота (das)
der Reichstag|Рейхстаг (здание парламента)
der Freitagabend|вечер пятницы`,

home: `das Haus|дом|Häuser
die Wohnung|квартира|Wohnungen
die Küche|кухня|Küchen
das Bad|ванная|Bäder
das Schlafzimmer|спальня
das Wohnzimmer|гостиная
der Balkon|балкон|Balkone
der Garten|сад|Gärten
die Tür|дверь|Türen
das Fenster|окно
die Wand|стена|Wände
der Boden|пол
die Treppe|лестница|Treppen
der Stock|этаж
der Stuhl|стул|Stühle
das Sofa|диван|Sofas
das Bett|кровать|Betten
der Schrank|шкаф|Schränke
die Lampe|лампа|Lampen
der Kühlschrank|холодильник|Kühlschränke
der Herd|плита
die Dusche|душ|Duschen
der Spiegel|зеркало
der Schlüssel|ключ
das Buch|книга|Bücher
das Bild|картина|Bilder
der Computer|компьютер
das Handy|мобильный телефон|Handys
der Fernseher|телевизор
die Kleidung|одежда
das Hemd|рубашка|Hemden
die Hose|брюки|Hosen
das Kleid|платье|Kleider
die Jacke|куртка|Jacken
der Mantel|пальто|Mäntel
der Schuh|ботинок, туфля|Schuhe
die Tasche|сумка; карман|Taschen
die Miete|квартплата, аренда
gemütlich|уютный|gemütliche,gemütlichen
hell|светлый|helle,hellen
dunkel|тёмный|dunkle,dunklen
sauber|чистый
schmutzig|грязный
leise|тихий
laut|громкий; шумный`,

time: `die Zeit|время
die Uhr|часы; час (о времени)|Uhren
die Stunde|час|Stunden
die Minute|минута|Minuten
die Sekunde|секунда|Sekunden
der Tag|день|Tage
die Woche|неделя|Wochen
der Monat|месяц|Monate
das Jahr|год|Jahre
das Wochenende|выходные
der Morgen|утро
der Vormittag|первая половина дня
der Mittag|полдень
der Nachmittag|вторая половина дня
der Abend|вечер|Abende
der Montag|понедельник
der Dienstag|вторник
der Mittwoch|среда
der Donnerstag|четверг
der Freitag|пятница
der Samstag|суббота
der Sonntag|воскресенье
der Januar|январь
der Februar|февраль
der März|март
der April|апрель
der Mai|май
der Juni|июнь
der Juli|июль
der August|август
der September|сентябрь
der Oktober|октябрь
der November|ноябрь
der Dezember|декабрь
der Frühling|весна
der Sommer|лето
der Herbst|осень
der Winter|зима
früh|рано; ранний|früher
spät|поздно; поздний|später
morgens|по утрам
abends|по вечерам
täglich|ежедневно
jeden Tag|каждый день
pünktlich|пунктуальный, вовремя
das Wetter|погода
der Termin|встреча (назначенная), приём|Termine
der Kalender|календарь
Weihnachten|Рождество
Ostern|Пасха
das Fest|праздник|Feste
der Film|фильм|Filme
das Kino|кино|Kinos
das Lied|песня|Lieder
der Ball|мяч|Bälle
der Park|парк|Parks`,

adjectives: `groß|большой; высокий|große,großen,großer,großes,größer,größte,größten
klein|маленький|kleine,kleinen,kleiner,kleines
neu|новый|neue,neuen,neuer,neues
schön|красивый; хороший|schöne,schönen,schöner,schönes,schönste,schönsten
schlecht|плохой
lang|длинный; долго|lange,langen,länger
kurz|короткий|kürzer
teuer|дорогой|teure,teuren,teurer
billig|дешёвый
schnell|быстрый
langsam|медленный
leicht|лёгкий
schwer|тяжёлый; трудный
einfach|простой
schwierig|сложный
richtig|правильный
falsch|неправильный
wichtig|важный
interessant|интересный
langweilig|скучный
toll|классный, отличный
super|супер
rot|красный|rote,roten,roter,rotes
blau|синий, голубой|blaue,blauen,blauer
grün|зелёный|grüne,grünen,grüner
gelb|жёлтый
weiß|белый
schwarz|чёрный|schwarze,schwarzen
grau|серый
braun|коричневый
bunt|разноцветный
voll|полный
leer|пустой
offen|открытый
geschlossen|закрытый
möglich|возможный
fertig|готовый
bekannt|известный|bekannte,bekannten
berühmt|знаменитый|berühmte,berühmten
modern|современный
historisch|исторический|historische,historischen
beliebt|популярный, любимый|beliebte,beliebten
typisch|типичный
wunderbar|чудесный
ruhig|спокойный, тихий
nett|милый, любезный
freundlich|дружелюбный
hoch|высокий|hohe,hohen,hoher,hohes,höher,höchste,höchsten
tief|глубокий
breit|широкий
eng|узкий, тесный
gleich|одинаковый; сейчас, сразу
verschieden|разный|verschiedene,verschiedenen
eigen|собственный|eigene,eigenen,eigenes
nächste|следующий|nächsten,nächster,nächstes
letzte|последний; прошлый|letzten,letzter,letztes
beide|оба|beiden`,

emotions: `froh|радостный
glücklich|счастливый
traurig|грустный
müde|усталый
krank|больной|kranke,kranken
gesund|здоровый
böse|злой
wütend|сердитый
nervös|нервный
ruhig|спокойный
zufrieden|довольный
aufgeregt|взволнованный
überrascht|удивлённый
die Angst|страх|Ängste
die Freude|радость
die Liebe|любовь
der Spaß|удовольствие, веселье
die Lust|желание, охота
lustig|весёлый, смешной
ernst|серьёзный
fleißig|прилежный
faul|ленивый
klug|умный|klüger
dumm|глупый
mutig|смелый
ehrlich|честный
höflich|вежливый
neugierig|любопытный
stolz|гордый
allein|один, в одиночестве
das Gefühl|чувство|Gefühle
die Hoffnung|надежда
hoffen|надеяться
das Lieblingsessen|любимая еда
der Lieblingsplatz|любимое место
lieb|милый, дорогой|liebe,lieben,lieber
die Sorge|забота, беспокойство|Sorgen`,

body: `der Körper|тело
der Kopf|голова|Köpfe
das Gesicht|лицо|Gesichter
das Auge|глаз|Augen
das Ohr|ухо|Ohren
die Nase|нос
der Mund|рот
der Zahn|зуб|Zähne
das Haar|волос|Haare
der Hals|шея; горло
die Hand|рука (кисть)|Hände
der Arm|рука|Arme
der Finger|палец
das Bein|нога|Beine
der Fuß|стопа, нога|Füße
der Bauch|живот|Bäuche
der Rücken|спина
das Herz|сердце
der Arzt|врач|Ärzte
die Ärztin|врач (женщина)
die Apotheke|аптека|Apotheken
das Krankenhaus|больница
die Praxis|кабинет врача
das Medikament|лекарство|Medikamente
die Tablette|таблетка|Tabletten
das Fieber|температура (жар)
die Erkältung|простуда
der Schmerz|боль|Schmerzen
die Kopfschmerzen|головная боль (мн. ч.)
weh tun|болеть
husten|кашлять
der Sport|спорт
fit|в форме
die Gesundheit|здоровье
gute Besserung|выздоравливайте
der Doktor|доктор|Doktoren
die Halsschmerzen|боль в горле (мн. ч.)`,

work: `die Arbeit|работа
der Beruf|профессия|Berufe
die Firma|фирма|Firmen
das Büro|офис|Büros
der Chef|начальник
die Chefin|начальница
der Kollege|коллега|Kollegen
die Kollegin|коллега (женщина)|Kolleginnen
der Lehrer|учитель
die Lehrerin|учительница
der Student|студент|Studenten
die Studentin|студентка
der Schüler|школьник
die Schülerin|школьница
die Schule|школа|Schulen
die Universität|университет
der Kurs|курс|Kurse
die Prüfung|экзамен|Prüfungen
die Aufgabe|задание|Aufgaben
die Hausaufgabe|домашнее задание|Hausaufgaben
die Frage|вопрос|Fragen
die Antwort|ответ|Antworten
das Wort|слово|Wörter,Worte
der Satz|предложение|Sätze
die Sprache|язык|Sprachen
die Fremdsprache|иностранный язык|Fremdsprachen
der Fehler|ошибка
die Grammatik|грамматика
der Text|текст|Texte
die Bedeutung|значение
das Wörterbuch|словарь|Wörterbücher
der Ingenieur|инженер
die Ingenieurin|инженер (женщина)
der Verkäufer|продавец
die Verkäuferin|продавщица
der Koch|повар|Köche
das Geld|деньги
das Problem|проблема|Probleme
das Projekt|проект|Projekte
die Besprechung|совещание
die E-Mail|электронное письмо|E-Mails
der Brief|письмо|Briefe
das Ziel|цель|Ziele
der Erfolg|успех
die Erfahrung|опыт|Erfahrungen
die Pause|перерыв|Pausen
der Feierabend|конец рабочего дня
studieren|учиться в вузе
verdienen|зарабатывать
die Methode|метод|Methoden
die Übung|упражнение|Übungen
der Anfang|начало
die Regel|правило|Regeln
der Artikel|артикль; статья
der Fall|падеж; случай|Fälle
logisch|логичный
die Zeitung|газета|Zeitungen
der Löffel|ложка
der Fußball|футбол
das Geschenk|подарок|Geschenke`,

nature: `die Natur|природа
die Sonne|солнце
der Mond|луна
der Stern|звезда|Sterne
der Himmel|небо
die Wolke|облако|Wolken
der Regen|дождь
der Schnee|снег
der Wind|ветер
das Gewitter|гроза
die Luft|воздух
der Berg|гора|Berge
die Alpen|Альпы
der See|озеро|Seen
der Fluss|река|Flüsse
der Rhein|Рейн
der Wald|лес|Wälder
der Baum|дерево|Bäume
die Blume|цветок|Blumen
das Gras|трава
das Tal|долина|Täler
die Insel|остров|Inseln
der Strand|пляж|Strände
die Küste|побережье
das Feld|поле|Felder
der Hund|собака|Hunde
die Katze|кошка|Katzen
das Pferd|лошадь|Pferde
die Kuh|корова|Kühe
der Vogel|птица|Vögel
das Tier|животное|Tiere
der Bär|медведь|Bären
der Fuchs|лиса|Füchse
der Wolf|волк|Wölfe
der Hase|заяц|Hasen
das Schaf|овца|Schafe
die Maus|мышь|Mäuse
sonnig|солнечный
regnerisch|дождливый
windig|ветреный
bewölkt|облачный
heiß|жаркий, горячий
das Grad|градус
die Temperatur|температура
der Weg|тропа, путь`
};

export const SET_INFO = {
  start: { title: 'Первые слова', icon: 'core', desc: 'Приветствия и вежливость — с них начинаем' },
  numbers: { title: 'Числа и деньги', icon: 'time', desc: 'От нуля до миллиона, цены' },
  core: { title: 'Базовые слова', icon: 'core', desc: 'Местоимения, артикли, предлоги, вопросы' },
  verbs: { title: 'Главные глаголы', icon: 'verbs', desc: 'Самые частые действия, сильные глаголы' },
  family: { title: 'Семья и люди', icon: 'family', desc: 'Родственники и окружение' },
  food: { title: 'Еда и кафе', icon: 'food', desc: 'Завтрак, ресторан, пекарня' },
  travel: { title: 'Путешествия', icon: 'travel', desc: 'Транспорт, город, вокзал, отель' },
  home: { title: 'Дом и вещи', icon: 'home', desc: 'Комнаты, мебель, одежда' },
  time: { title: 'Время и календарь', icon: 'time', desc: 'Дни недели, месяцы, времена года' },
  adjectives: { title: 'Прилагательные', icon: 'adjectives', desc: 'Размер, цвет, качество' },
  emotions: { title: 'Чувства и характер', icon: 'emotions', desc: 'Эмоции и черты' },
  body: { title: 'Тело и здоровье', icon: 'body', desc: 'Части тела, у врача, аптека' },
  work: { title: 'Работа и учёба', icon: 'work', desc: 'Профессии, офис, учёба' },
  nature: { title: 'Природа и погода', icon: 'nature', desc: 'Горы, леса, реки, животные' }
};

export const lower = s => String(s).toLowerCase();

// Дополнительные тематические наборы (more-sets.js) — после основных
Object.assign(RAW, MORE_RAW);
Object.assign(SET_INFO, MORE_INFO);

export const DICT = new Map();      // слово -> перевод
export const SETS = {};             // набор -> [слова]
const FORMS = {};                   // форма -> словарное слово
const ARTICLE = /^(der|die|das) (\p{Lu}\S*)$/u;
for (const [set, block] of Object.entries(RAW)) {
  SETS[set] = [];
  for (const line of block.split('\n')) {
    const [raw, t, forms] = line.split('|');
    if (!raw || !t) continue;
    const m = raw.match(ARTICLE);
    const w = lower(m ? m[2] : raw), tr = m && !/мн\. ч\./.test(t) ? `${t} (${m[1]})` : t;
    if (!DICT.has(w)) DICT.set(w, tr);
    if (!SETS[set].includes(w)) SETS[set].push(w);
    for (const f of (forms || '').split(',')) if (f) FORMS[lower(f)] ||= w;
  }
}

// ---------- поиск начальной формы ----------
// Немецкие слова меняют окончания: Kinder → Kind, großen → groß, arbeitet → arbeiten,
// gespielt → spielen. Особые формы сильных глаголов и множественного числа перечислены в словаре
// (третье поле), остальное находим, отрезая окончания и приставку ge- причастия.

// Слова, которые читаются иначе, чем по общим правилам
Object.assign(FORMS, {
  'geht': 'gehen', "geht's": 'wie geht\'s', 'heißt': 'heißen', 'ins': 'in', 'zum': 'zu', 'zur': 'zu',
  'tschüs': 'tschüss', 'wiedersehen': 'auf wiedersehen', 'appetit': 'guten appetit', 'besserung': 'gute besserung',
  'leid': 'es tut mir leid', 'drüben': 'dort drüben', 'dank': 'vielen dank', 'nähe': 'in der nähe', 'brandenburger': 'brandenburger tor', 'hause': 'zu hause', 'tut': 'tun', 'freut': 'freuen', 'weiß': 'wissen', 'einander': 'sich',
  'nächstes': 'nächste', 'nächsten': 'nächste', 'letzten': 'letzte', 'letztes': 'letzte',
  'erstens': 'erste', 'liebsten': 'gern', 'mehr': 'viel', 'meisten': 'viel', 'meistens': 'viel',
  'dich': 'du', 'dir': 'du', 'mich': 'ich', 'mir': 'ich', 'uns': 'wir', 'euch': 'ihr',
  'ihn': 'er', 'ihm': 'er', 'ihnen': 'sie', 'wem': 'wer', 'wen': 'wer', 'wessen': 'wer',
  'dem': 'der', 'den': 'der', 'des': 'der', 'dessen': 'der', 'deren': 'der',
  'gibt': 'geben', 'gab': 'geben', 'hast': 'haben', 'hat': 'haben', 'habt': 'haben',
  'wird': 'werden', 'wirst': 'werden', 'ist': 'sein', 'bin': 'sein', 'bist': 'sein', 'sind': 'sein', 'seid': 'sein',
  'gefällt': 'gefallen', 'mag': 'mögen', 'möchte': 'mögen', 'kann': 'können', 'muss': 'müssen', 'will': 'wollen', 'darf': 'dürfen'
});

const deUml = s => s.replace(/[äöü]/g, c => ({ ä: 'a', ö: 'o', ü: 'u' })[c]);
// Окончания глагола (сначала ищем глагол) и окончания существительных и прилагательных (сначала само слово)
const VERB_END = ['test', 'tet', 'ten', 'te', 'est', 'et', 'st', 't'];
const NOUN_END = ['ern', 'nen', 'em', 'en', 'er', 'es', 'e', 'n', 's'];
// Отделяемые приставки: aufgestanden, anzurufen
const PREFIXES = ['zurück', 'zusammen', 'kennen', 'fern', 'weg', 'auf', 'aus', 'ein', 'mit', 'nach', 'vor', 'los', 'ab', 'an', 'bei', 'zu', 'her', 'hin'];

function verbOf(stem) {
  for (const v of [stem + 'en', stem + 'n', deUml(stem) + 'en']) if (DICT.has(v)) return v;
  return '';
}
function nounOf(stem) {
  if (FORMS[stem]) return FORMS[stem];
  if (DICT.has(stem)) return stem;
  const d = deUml(stem);
  if (d !== stem && DICT.has(d)) return d;
  return '';
}

// Причастие: ge-…-t / ge-…-en, в том числе после отделяемой приставки (auf-ge-räumt)
function participle(w) {
  for (const p of ['', ...PREFIXES]) {
    if (!w.startsWith(p + 'ge') || w.length - p.length < 5) continue;
    const core = w.slice(p.length + 2);
    for (const end of ['en', 't', 'et']) {
      if (!core.endsWith(end)) continue;
      const v = verbOf(core.slice(0, -end.length));
      const full = v && (p ? (DICT.has(p + v) ? p + v : '') : v);
      if (full) return full;
      if (v && p) return p + v;
    }
  }
  // zu-инфинитив: anzurufen → anrufen
  for (const p of PREFIXES) if (w.startsWith(p + 'zu') && DICT.has(p + w.slice(p.length + 2))) return p + w.slice(p.length + 2);
  return '';
}

function step(w) {
  if (FORMS[w]) return FORMS[w];
  if (DICT.has(w)) return w;
  const d = deUml(w);
  if (d !== w && DICT.has(d)) return d;
  return '';
}

export function lemma(raw) {
  let w = lower(String(raw)).replace(/[’`]/g, "'").replace(/^[^\p{L}']+|[^\p{L}']+$/gu, '').replace(/^'+|'+$/g, '');
  if (!w) return '';
  const direct = step(w);
  if (direct) return direct;
  if (w.includes("'")) { const base = step(w.split("'")[0]); if (base) return base; w = w.split("'")[0]; }
  if (DICT.has(w + 'en') || DICT.has(w + 'n')) return verbOf(w); // повелительное и «ich komm»
  const part = participle(w);
  if (part) return part;
  // отрезаем окончания: на первом шаге одно, на втором — ещё одно (größte → größt → groß)
  let level = [w];
  for (let depth = 0; depth < 2; depth++) {
    const next = [];
    for (const s of level) {
      for (const end of VERB_END) {
        if (!s.endsWith(end) || s.length - end.length < 2) continue;
        const stem = s.slice(0, -end.length);
        const hit = verbOf(stem) || nounOf(stem) || participle(stem);
        if (hit) return hit;
        next.push(stem);
      }
      for (const end of NOUN_END) {
        if (!s.endsWith(end) || s.length - end.length < 2) continue;
        const stem = s.slice(0, -end.length);
        const hit = nounOf(stem) || participle(stem) || verbOf(stem);
        if (hit) return hit;
        next.push(stem);
      }
    }
    level = next;
  }
  return w;
}

export function lookup(raw) {
  const l = lemma(raw);
  return { word: l, translation: DICT.get(l) || '' };
}
