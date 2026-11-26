// Тест на уровень: адаптивная проверка словарного запаса, затем цель обучения, темп и рекомендации.
import { store } from '../store.js';
import { esc, $, $$, icon, mascot, shuffle, toast } from '../ui.js';
import * as G from '../game.js';
import { speak } from '../speech.js';
import { L } from '../lang.js';
import { BANKS, LEVEL_NAMES, PURPOSES, PACES } from '../data/leveltest.js';
import { BLOCK, PASS, nextStep, pickByLevel, levelRank } from '../placement.js';

export const myLevel = () => store.state.placement?.[L().id]?.level || null;
export const hasPlacement = () => !!BANKS[L().id];
export const levelLabel = lv => `${lv} · ${LEVEL_NAMES[lv] || ''}`;

// Карточка-приглашение на главной, пока уровень по текущему языку не определён
export function placementBanner() {
  if (myLevel() || !hasPlacement()) return '';
  return `<section class="band"><a class="action primary placement-cta" href="#test">${icon('bolt')}<div><b>Узнайте свой уровень за 3 минуты</b><span>Короткий тест по словам подскажет, с каких текстов, уроков и наборов начать</span></div></a></section>`;
}

export function renderPlacement(main) {
  const bank = BANKS[L().id];
  if (!bank) { main.innerHTML = `<section class="band narrow"><h1>Тест на уровень</h1><p class="lead">Для этого языка теста пока нет.</p></section>`; return; }
  const cur = store.state.placement?.[L().id];
  main.innerHTML = `
  <section class="band narrow placement">
    <div class="placement-intro">
      ${mascot('happy', 120)}
      <div>
        <h1>Тест на уровень</h1>
        <p class="lead">${L().name}. Пим покажет слова, а вы выберите перевод. Если слово незнакомо, честно нажмите «Не знаю»: так результат будет точнее. Тест подстраивается под ответы и занимает 2–4 минуты.</p>
        ${cur ? `<p>Ваш прошлый результат: <b>${levelLabel(cur.level)}</b> (${new Date(cur.at).toLocaleDateString('ru-RU')}).</p>` : ''}
        <div class="row gap"><button class="btn big" id="start">${cur ? 'Пройти заново' : 'Начать тест'}</button>${cur ? '<button class="btn ghost" id="goal">Изменить цель и темп</button>' : ''}</div>
      </div>
    </div>
  </section>`;
  $('#start').onclick = () => runTest(main, bank);
  $('#goal') && ($('#goal').onclick = () => showResult(main, cur.level, null));
}

function runTest(main, bank) {
  const blocks = [];
  let asked = 0, right = 0, timer;
  main.innerHTML = `
  <section class="band narrow trainer">
    <div class="train-top"><a class="back" href="#test">${icon('x')} <span>Прервать</span></a><b>Тест на уровень</b><span class="count" id="cnt"></span></div>
    <i class="bar"><i id="progress" style="width:0"></i></i>
    <div id="stage" class="stage"></div>
  </section>`;
  const stage = $('#stage');
  const maxQ = bank.levels.length * BLOCK;

  const nextBlock = () => {
    const step = nextStep(bank.levels, blocks);
    if (step.done) return finish(step.level);
    const items = shuffle(bank.items[bank.levels[step.next]]);
    const qs = items.slice(0, BLOCK);
    let k = 0, ok = 0;
    const ask = () => {
      if (!stage.isConnected) return;
      if (k >= qs.length) { blocks.push({ i: step.next, passed: ok >= PASS }); return nextBlock(); }
      const [w, t] = qs[k];
      const opts = shuffle([t, ...shuffle(items.filter(x => x[1] !== t)).slice(0, 3).map(x => x[1])]);
      asked++;
      $('#cnt').textContent = `${asked}`;
      $('#progress').style.width = `${Math.min(95, (asked / maxQ) * 100 * 1.6)}%`;
      stage.className = 'stage';
      stage.innerHTML = `<p class="muted">Выберите перевод</p>
        <button class="big-word" id="say">${esc(w)} ${icon('sound')}</button>
        <div class="opts">${opts.map((o, n) => `<button class="opt" data-v="${esc(o)}"><i>${n + 1}</i>${esc(o)}</button>`).join('')}</div>
        <button class="btn ghost" id="dunno">Не знаю</button>`;
      $('#say').onclick = () => speak(w, store.state.rate);
      const pick = v => {
        clearTimeout(timer);
        const good = v === t;
        if (good) { ok++; right++; }
        $$('.opt', stage).forEach(b => { b.disabled = true; if (b.dataset.v === t) b.classList.add('right'); else if (b.dataset.v === v) b.classList.add('wrong'); });
        $('#dunno').disabled = true;
        k++;
        timer = setTimeout(ask, good ? 450 : 900);
      };
      $('.opts', stage).onclick = e => { const b = e.target.closest('.opt'); if (b && !b.disabled) pick(b.dataset.v); };
      $('#dunno').onclick = () => pick(null);
    };
    ask();
  };

  const onKey = e => {
    if (!stage.isConnected) return document.removeEventListener('keydown', onKey);
    const n = Number(e.key); const opts = $$('.opt:not([disabled])', stage);
    if (n >= 1 && n <= opts.length) opts[n - 1].click();
    else if (e.key === '0' || e.key === ' ') { e.preventDefault(); $('#dunno:not([disabled])')?.click(); }
  };
  document.addEventListener('keydown', onKey);

  const finish = level => {
    document.removeEventListener('keydown', onKey);
    const s = store.state;
    const first = !s.placement?.[L().id];
    s.placement = { ...(s.placement || {}), [L().id]: { level, at: Date.now(), score: `${right}/${asked}` } };
    if (first) G.addXp(10, 'тест на уровень пройден'); else store.save();
    showResult(main, level, { right, asked });
  };
  nextBlock();
}

function showResult(main, level, score) {
  const s = store.state, { TEXTS, COURSES, SET_INFO, firstSet } = L();
  let purpose = s.purpose || null, goal = s.goal;
  const texts = pickByLevel(TEXTS, level, 3);
  const course = pickByLevel(COURSES.filter(c => c.lessons.some(l => !s.grammar[l.id]?.passed)), level, 1)[0] || COURSES[0];
  const lesson = course.lessons.find(l => !s.grammar[l.id]?.passed) || course.lessons[0];
  const setFor = () => {
    const p = PURPOSES.find(x => x.id === purpose);
    const id = levelRank(level) <= 1 ? firstSet : p ? (typeof p.set === 'string' ? p.set : p.set[L().id]) : firstSet;
    return SET_INFO[id] ? id : firstSet;
  };
  const advice = {
    A0: 'Начнём с самых нужных слов и коротких диалогов. Через пару недель занятий по 10 минут вы будете читать первые тексты.',
    A1: 'Вы знаете базовые слова. Добавляйте наборы по темам и читайте короткие тексты: так словарь растёт быстрее всего.',
    A2: 'Простые тексты уже по силам. Пора закрепить времена глаголов и читать чуть больше.',
    B1: 'Хороший средний уровень. Читайте тексты на интересные темы и добавляйте незнакомые слова прямо из них.',
    B2: 'Вы свободно читаете. Расширяйте словарь сложной лексикой из текстов и загружайте свои материалы.',
    C1: 'Отличный результат. Используйте Лингву, чтобы не терять форму: свои тексты, редкие слова, повторения.'
  }[level] || '';

  main.innerHTML = `
  <section class="band narrow placement">
    <div class="placement-result">
      ${mascot('happy', 130)}
      <div>
        <p class="muted">${score ? `Верных ответов: ${score.right} из ${score.asked}` : 'Ваш уровень'}</p>
        <h1><span class="lv big">${level}</span> ${esc(LEVEL_NAMES[level] || '')}</h1>
        <p class="lead">${advice}</p>
      </div>
    </div>
    <h2>Зачем вы учите ${L().acc}?</h2>
    <div class="pick-grid" id="purposes">${PURPOSES.map(p => `<button class="pick ${purpose === p.id ? 'on' : ''}" data-p="${p.id}"><b>${p.title}</b><span>${p.desc}</span></button>`).join('')}</div>
    <h2>Сколько времени в день?</h2>
    <div class="pick-grid four" id="paces">${PACES.map(p => `<button class="pick ${goal === p.goal ? 'on' : ''}" data-g="${p.goal}"><b>${p.title}</b><span>${p.desc} · ${p.goal} XP</span></button>`).join('')}</div>
    <h2>С чего начать</h2>
    <div class="grid-3 recs" id="recs"></div>
    <div class="row gap" style="margin-top:20px"><a class="btn big" href="#home" id="save">Готово</a><a class="btn ghost" href="#test">Пройти тест ещё раз</a></div>
  </section>`;

  const drawRecs = () => {
    const set = setFor();
    $('#recs').innerHTML = `
      <a class="action" href="#set-${set}">${icon('sets')}<div><b>${esc(SET_INFO[set].title)}</b><span>Набор слов · ${esc(SET_INFO[set].desc)}</span></div></a>
      <a class="action" href="#lesson-${lesson.id}">${icon('grammar')}<div><b>${esc(lesson.title)}</b><span>Грамматика · ${esc(course.level)}</span></div></a>
      ${texts.map(t => `<a class="action" href="#read-${t.id}">${icon('read')}<div><b>${esc(t.title)}</b><span>Текст · ${t.level} · ${esc(t.topic)}</span></div></a>`).join('')}`;
  };
  drawRecs();
  const persist = () => { s.purpose = purpose; s.goal = goal; store.save(); };
  $('#purposes').onclick = e => { const b = e.target.closest('[data-p]'); if (!b) return; purpose = b.dataset.p; $$('#purposes .pick').forEach(x => x.classList.toggle('on', x === b)); persist(); drawRecs(); };
  $('#paces').onclick = e => { const b = e.target.closest('[data-g]'); if (!b) return; goal = Number(b.dataset.g); $$('#paces .pick').forEach(x => x.classList.toggle('on', x === b)); persist(); };
  $('#save').onclick = () => { persist(); toast('План сохранён'); };
}
