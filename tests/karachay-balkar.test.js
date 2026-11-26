import test from 'node:test';
import assert from 'node:assert/strict';
import { lookup, DICT, SETS, SET_INFO } from '../public/js/data/krc/dictionary.js';
import { TEXTS } from '../public/js/data/krc/texts.js';
import { PHRASES } from '../public/js/data/krc/phrases.js';
import { ALL_LESSONS } from '../public/js/data/krc/grammar.js';

const TOKEN = /[\p{L}’'-]+/gu;
const NAMES = new Set(['Аслан', 'Мурат', 'Зухра', 'Къасбот', 'Тамбиев', 'Сосуркъа', 'Сосурукъ', 'Сосурукъгъа', 'Хурла', 'Альберт', 'Узденов', 'Асхатды', 'Шогенцуков', 'Москвагъа', 'Асхат', 'Мырджы', 'Фатима', 'Фатимады']);

test('Карачаево-балкарский: аффиксы отрезаются до словарной формы', () => {
  const cases = {
    юйде: 'юй', шахарда: 'шахар', школгъа: 'школ', таугъа: 'тау', тауланы: 'тау', юйюрюм: 'юйюр',
    барама: 'барыргъа', бардыкъ: 'барыргъа', ишлейди: 'ишлерге', джашайма: 'джашаргъа', ашадыкъ: 'ашаргъа',
    ичебиз: 'ичерге', ангыламайма: 'ангыларгъа', сюеме: 'сюерге', къайтдыкъ: 'къайтыргъа', уллуду: 'уллу',
    къарындашым: 'къарындаш', атынг: 'ат', атам: 'ата', анам: 'ана', алады: 'алыргъа', сорама: 'сорургъа'
  };
  for (const [form, base] of Object.entries(cases)) assert.equal(lookup(form).word, base, form);
});

test('Карачаево-балкарский: все слова в текстах и фразах переводятся по клику', () => {
  const missing = new Set();
  for (const body of [...TEXTS.map(t => t.body), ...PHRASES.map(p => p.en)]) for (const tok of body.match(TOKEN)) {
    if (NAMES.has(tok)) continue;
    if (!lookup(tok).translation) missing.add(tok);
  }
  assert.deepEqual([...missing], []);
});

test('Карачаево-балкарский: наборы непустые, у каждого слова есть перевод', () => {
  assert.deepEqual(Object.keys(SETS).sort(), Object.keys(SET_INFO).sort());
  for (const [id, words] of Object.entries(SETS)) {
    assert.ok(words.length >= 10, id);
    for (const w of words) assert.ok(DICT.get(w), w);
  }
});

test('Карачаево-балкарский: в упражнениях с выбором правильный ответ есть среди вариантов', () => {
  const ids = new Set();
  for (const l of ALL_LESSONS) {
    assert.ok(!ids.has(l.id)); ids.add(l.id);
    for (const ex of l.exercises) {
      if (ex.type === 'choice') assert.ok(ex.options.includes(ex.a), `${l.id}: ${ex.q}`);
      assert.ok(!/[a-z]/i.test(ex.a), `латиница в ответе: ${ex.a}`);
    }
  }
});

test('Карачаево-балкарский: полезные ресурсы — https-ссылки с описанием', async () => {
  const { RESOURCES } = await import('../public/js/data/krc/resources.js');
  assert.ok(RESOURCES.length >= 3);
  for (const g of RESOURCES) for (const r of g.items) {
    assert.match(r.href, /^https:\/\//, r.title);
    assert.ok(r.title && r.desc, r.href);
  }
});

test('Карачаево-балкарский: у текстов уникальные id', () => {
  const ids = TEXTS.map(t => t.id);
  assert.equal(new Set(ids).size, ids.length);
});
