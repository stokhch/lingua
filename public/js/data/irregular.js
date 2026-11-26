// Неправильные глаголы английского языка: «инфинитив|прошедшее|причастие|перевод».
// Список составлен для этого проекта; варианты через «/» засчитываются оба.
const RAW = `
be|was/were|been|быть
begin|began|begun|начинать
break|broke|broken|ломать
bring|brought|brought|приносить
build|built|built|строить
buy|bought|bought|покупать
catch|caught|caught|ловить
choose|chose|chosen|выбирать
come|came|come|приходить
cost|cost|cost|стоить
cut|cut|cut|резать
do|did|done|делать
draw|drew|drawn|рисовать
drink|drank|drunk|пить
drive|drove|driven|водить машину
eat|ate|eaten|есть
fall|fell|fallen|падать
feel|felt|felt|чувствовать
find|found|found|находить
fly|flew|flown|летать
forget|forgot|forgotten|забывать
get|got|got/gotten|получать
give|gave|given|давать
go|went|gone|идти, ехать
grow|grew|grown|расти
have|had|had|иметь
hear|heard|heard|слышать
hide|hid|hidden|прятать
hold|held|held|держать
keep|kept|kept|хранить, держать
know|knew|known|знать
learn|learnt/learned|learnt/learned|учить
leave|left|left|уходить, оставлять
lend|lent|lent|одалживать
let|let|let|позволять
lose|lost|lost|терять
make|made|made|делать, создавать
mean|meant|meant|значить
meet|met|met|встречать
pay|paid|paid|платить
put|put|put|класть
read|read|read|читать
ride|rode|ridden|ехать верхом
ring|rang|rung|звонить
rise|rose|risen|подниматься
run|ran|run|бежать
say|said|said|сказать
see|saw|seen|видеть
sell|sold|sold|продавать
send|sent|sent|отправлять
set|set|set|устанавливать
shine|shone|shone|светить
shoot|shot|shot|стрелять, снимать
show|showed|shown|показывать
shut|shut|shut|закрывать
sing|sang|sung|петь
sit|sat|sat|сидеть
sleep|slept|slept|спать
speak|spoke|spoken|говорить
spend|spent|spent|тратить
stand|stood|stood|стоять
steal|stole|stolen|красть
swim|swam|swum|плавать
take|took|taken|брать
teach|taught|taught|обучать
tell|told|told|рассказывать
think|thought|thought|думать
throw|threw|thrown|бросать
understand|understood|understood|понимать
wake|woke|woken|просыпаться
wear|wore|worn|носить (одежду)
win|won|won|побеждать
write|wrote|written|писать
bite|bit|bitten|кусать
blow|blew|blown|дуть
burn|burnt/burned|burnt/burned|гореть
dig|dug|dug|копать
dream|dreamt/dreamed|dreamt/dreamed|мечтать, видеть сон
feed|fed|fed|кормить
fight|fought|fought|сражаться
forgive|forgave|forgiven|прощать
freeze|froze|frozen|замерзать
hang|hung|hung|вешать
hit|hit|hit|ударять
hurt|hurt|hurt|причинять боль
lay|laid|laid|класть, накрывать
lead|led|led|вести
lie|lay|lain|лежать
light|lit|lit|зажигать
quit|quit|quit|бросать (занятие)
seek|sought|sought|искать
shake|shook|shaken|трясти
sink|sank|sunk|тонуть
slide|slid|slid|скользить
smell|smelt/smelled|smelt/smelled|пахнуть, нюхать
spell|spelt/spelled|spelt/spelled|писать по буквам
spread|spread|spread|распространять
stick|stuck|stuck|приклеивать
sting|stung|stung|жалить
strike|struck|struck|ударять, бастовать
swear|swore|sworn|клясться
sweep|swept|swept|подметать
swing|swung|swung|качаться
tear|tore|torn|рвать
bend|bent|bent|сгибать
bet|bet|bet|держать пари
bind|bound|bound|связывать
breed|bred|bred|разводить
deal|dealt|dealt|иметь дело
forbid|forbade|forbidden|запрещать
overcome|overcame|overcome|преодолевать
withdraw|withdrew|withdrawn|снимать (деньги), отзывать`;

export const IRREGULAR = RAW.trim().split('\n').map(l => {
  const [base, past, pp, tr] = l.split('|');
  return { base, past, pp, tr };
});

// Самые частые — первые 72 глагола; остальные идут во вторую часть тренировки
export const COMMON = 72;

// Ответ засчитывается, если совпадает с любым из вариантов через «/»
export const formOk = (answer, forms) => forms.split('/').includes(String(answer).trim().toLowerCase().replace(/\s+/g, ' '));
