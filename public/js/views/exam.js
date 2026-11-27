// Итоговый тест курса грамматики: 10 случайных заданий из всех уроков курса, оценка и сертификат.
import { store } from '../store.js';
import { esc, $, $$, icon, shuffle, mascot } from '../ui.js';
import * as G from '../game.js';
import { L, lower, keysBar } from '../lang.js';

const SIZE = 10;
// Подставить ответ в пропуск; «'ll», «'s» пишутся слитно с предыдущим словом
const fill = (q, a) => a.startsWith("'") ? q.replace(/\s?___/, a) : q.replace('___', a);
const norm = s => lower(s).replace(/[’`]/g, "'").replace(/\s+/g, ' ').trim();

export function gradeOf(pct) {
  return pct >= 90 ? { mark: 5, title: 'Отлично' } : pct >= 75 ? { mark: 4, title: 'Хорошо' } : pct >= 60 ? { mark: 3, title: 'Зачёт' } : { mark: 2, title: 'Не сдан' };
}
const exams = () => (store.state.exams ||= {});

// Кнопка и результат итогового теста в карточке курса
export function examRow(course) {
  const r = exams()[course.id];
  const done = course.lessons.filter(l => store.state.grammar[l.id]?.passed).length;
  return `<div class="exam-row">
    <a class="btn ${r?.passed ? 'ghost' : ''} small" href="#exam-${course.id}">${icon('trophy')} Итоговый тест</a>
    ${r ? `<span class="exam-mark m${gradeOf(r.best).mark}">${gradeOf(r.best).title} · ${r.best}%</span>${r.passed ? `<a class="link" href="#exam-${course.id}-cert">сертификат</a>` : ''}`
      : `<span class="muted small">${done < course.lessons.length ? 'лучше после всех уроков курса' : 'все уроки пройдены — пора на тест'}</span>`}
  </div>`;
}

export function renderExam(main, param) {
  const [id, mode] = [param.replace(/-cert$/, ''), param.endsWith('-cert') ? 'cert' : ''];
  const course = L().COURSES.find(c => c.id === id);
  if (!course) { location.hash = 'grammar'; return; }
  if (mode === 'cert' && exams()[id]?.passed) return certificate(main, course, exams()[id]);
  const pool = course.lessons.flatMap(l => l.exercises.map(ex => ({ ...ex, lesson: l.title })));
  const items = shuffle(pool).slice(0, Math.min(SIZE, pool.length));
  main.innerHTML = `
  <section class="band narrow">
    <a class="back" href="#grammar">${icon('back')} Грамматика</a>
    <h1>Итоговый тест</h1>
    <p class="lead">${esc(course.title)} · ${items.length} заданий из всех уроков курса. Подсказок не будет, правильные ответы — в конце. Оценка: 90% — «отлично», 75% — «хорошо», 60% — «зачёт».</p>
    <button class="btn big" id="go">Начать тест</button>
    <div id="ex"></div>
  </section>`;
  $('#go').onclick = () => { $('#go').remove(); run(); };

  function run() {
    const answers = [];
    let i = 0;
    const box = $('#ex');
    const onKey = e => {
      if (!box.isConnected) return document.removeEventListener('keydown', onKey);
      if (e.target.matches('input')) return;
      const n = Number(e.key); const o = $$('.opt:not([disabled])', box);
      if (n >= 1 && n <= o.length) o[n - 1].click();
    };
    document.addEventListener('keydown', onKey);
    const step = () => {
      if (i >= items.length) { document.removeEventListener('keydown', onKey); return finish(answers); }
      const ex = items[i];
      box.innerHTML = `<div class="exercise"><div class="ex-top"><span class="muted">Задание ${i + 1} из ${items.length} · ${esc(ex.lesson)}</span></div>
        <i class="bar"><i style="width:${(i / items.length) * 100}%"></i></i>
        <p class="q">${esc(ex.q).replace('___', '<span class="gap-fill">___</span>')}</p>
        ${ex.type === 'choice' ? `<div class="opts row-opts">${ex.options.map((o, k) => `<button class="opt" data-v="${esc(o)}"><i>${k + 1}</i>${esc(o)}</button>`).join('')}</div>`
          : `<form class="type-form"><input id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Ответ"><button class="btn">Ответить</button></form>${keysBar()}`}</div>`;
      const take = v => { answers.push(v); i++; step(); };
      if (ex.type === 'choice') $('.opts', box).onclick = e => { const b = e.target.closest('.opt'); if (b) take(b.dataset.v); };
      else { $('#ans').focus(); $('.type-form', box).onsubmit = e => { e.preventDefault(); const v = $('#ans').value.trim(); if (v) take(v); }; }
    };
    step();
  }

  function finish(answers) {
    const res = items.map((ex, k) => ({ ex, given: answers[k], ok: ex.a.split('/').map(norm).includes(norm(answers[k])) }));
    const right = res.filter(r => r.ok).length;
    res.forEach(r => G.recordAnswer(r.ok));
    const pct = Math.round((right / items.length) * 100);
    const g = gradeOf(pct), passed = g.mark >= 3;
    const prev = exams()[id];
    exams()[id] = { best: Math.max(pct, prev?.best || 0), passed: passed || !!prev?.passed, at: passed && !prev?.passed ? Date.now() : prev?.at || Date.now(), name: store.state.name };
    G.addXp(right + (passed && !prev?.passed ? 20 : 0), passed && !prev?.passed ? 'итоговый тест сдан' : 'итоговый тест', passed ? 'done' : 'none');
    main.innerHTML = `
    <section class="band narrow">
      <a class="back" href="#grammar">${icon('back')} Грамматика</a>
      <div class="exam-result"><span class="exam-mark big m${g.mark}">${g.title}</span><h1>${right} из ${items.length} · ${pct}%</h1>
        <p class="lead">${passed ? 'Тест сдан. Знания курса подтверждены, а сертификат можно открыть и распечатать.' : 'Чтобы сдать тест, нужно 60%. Повторите уроки, в которых были ошибки, и попробуйте снова.'}</p></div>
      <ul class="results exam-answers">${res.map(r => `<li class="${r.ok ? 'ok' : 'bad'}">${icon(r.ok ? 'check' : 'x')}<div><b>${esc(fill(r.ex.q, r.ex.a.split('/')[0]))}</b>${r.ok ? '' : `<span>Ваш ответ: ${esc(r.given)} · правильно: ${esc(r.ex.a.split('/')[0])} · урок «${esc(r.ex.lesson)}»</span>`}</div></li>`).join('')}</ul>
      <div class="row gap">${passed ? `<a class="btn" href="#exam-${id}-cert">${icon('trophy')} Сертификат</a>` : ''}<button class="btn ${passed ? 'ghost' : ''}" id="again">Пройти ещё раз</button><a class="btn ghost" href="#grammar">К курсам</a></div>
    </section>`;
    $('#again').onclick = () => renderExam(main, id);
  }
}

function certificate(main, course, r) {
  main.innerHTML = `
  <section class="band narrow">
    <a class="back no-print" href="#grammar">${icon('back')} Грамматика</a>
    <div class="cert">
      <div class="cert-top">${mascot('happy', 90)}<div><span>Лингва · ${esc(L().name)}</span><h1>Сертификат</h1></div></div>
      <p>подтверждает, что</p>
      <h2 class="cert-name">${esc(r.name || store.state.name)}</h2>
      <p>успешно сдал(а) итоговый тест курса</p>
      <h3>«${esc(course.title)}»</h3>
      <p class="cert-grade">Результат: <b>${r.best}%</b> · ${gradeOf(r.best).title} · уровень ${esc(course.level)}</p>
      <p class="muted">${new Date(r.at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
    </div>
    <div class="row gap no-print"><button class="btn" id="print">Распечатать или сохранить в PDF</button><a class="btn ghost" href="#grammar">К курсам</a></div>
  </section>`;
  $('#print').onclick = () => window.print();
}
