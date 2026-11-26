// Грамматические тренировки: «Выбери форму», «Фраза по правилу», «Найди ошибку» и повторение правил.
// Задания строятся из упражнений уроков текущего языка (см. grammar-drill.js).
import { store } from '../store.js';
import { esc, $, $$, icon, plural, shuffle } from '../ui.js';
import * as G from '../game.js';
import * as D from '../grammar-drill.js';
import { L, lower, fold, keysBar } from '../lang.js';
import { resultBlock, markStart, say } from '../pimfx.js';

export const GRAMMAR_TRAIN = {
  review: { title: 'Повторение правил', desc: 'Правила, которые пора освежить: задания из пройденных уроков', ic: 'cards' },
  form: { title: 'Выбери форму', desc: 'Подставьте нужную форму, окончание или артикль', ic: 'grammar' },
  build: { title: 'Фраза по правилу', desc: 'Соберите предложение — одно слово лишнее', ic: 'puzzle' },
  spot: { title: 'Найди ошибку', desc: 'Верно ли построена фраза?', ic: 'check' },
  mix: { title: 'Грамматика вперемешку', desc: 'Формы, фразы и поиск ошибок по одному правилу или всем', ic: 'brain' }
};
// Ключи для статистики «Любимые тренировки»
export const GRAMMAR_STATS_INFO = Object.fromEntries(Object.entries(GRAMMAR_TRAIN).map(([k, v]) => ['g-' + k, v]));

// Уроки текущего языка и записи о них; у старых пройденных уроков появляются карточки повторения
export function grammarState(now = Date.now()) {
  const { ALL_LESSONS } = L(), g = store.state.grammar;
  if (D.ensureCards(ALL_LESSONS, g, now)) store.save();
  return { lessons: ALL_LESSONS, g };
}

// Карточки грамматических тренировок для страниц «Тренировки» и «Грамматика»
export function grammarCards() {
  const { lessons, g } = grammarState();
  const due = D.dueLessons(lessons, g).length;
  const started = lessons.filter(l => g[l.id]).length;
  const label = k => k === 'review'
    ? (due ? `<em class="ready">${due} ${plural(due, 'правило', 'правила', 'правил')} пора повторить</em>` : `<em>${Object.values(g).some(x => x?.srs) ? 'повторять пока нечего' : 'после первого пройденного урока'}</em>`)
    : `<em class="${started ? 'ready' : ''}">${started ? `${started} ${plural(started, 'урок', 'урока', 'уроков')} в практике` : 'начнём с первого урока'}</em>`;
  return `<div class="trainings g-trainings">${['review', 'form', 'build', 'spot'].map(k => `<a class="train-card g-${k}" href="#gtrain-${k}">${icon(GRAMMAR_TRAIN[k].ic)}<b>${GRAMMAR_TRAIN[k].title}</b><span>${GRAMMAR_TRAIN[k].desc}</span>${label(k)}</a>`).join('')}</div>`;
}

const norm = s => lower(s).replace(/[’`]/g, "'").replace(/\s+/g, ' ').trim();
const normPhrase = s => lower(s).replace(/[’`]/g, "'").replace(/[^\p{L}\p{N}' ]/gu, ' ').replace(/\s+/g, ' ').trim();
const ctxLine = it => [it.ctx, ...(it.hints || [])].filter(Boolean).length
  ? `<p class="g-ctx">${esc([it.ctx, ...(it.hints || []).map(h => `(${h})`)].filter(Boolean).join(' '))}</p>` : '';

// План: param = «form», «build.tr-past» (вид и, необязательно, один урок)
function plan(param) {
  const [kind = 'mix', one] = param.split('.');
  const { lessons, g } = grammarState();
  const letters = L().letters, now = Date.now();
  if (kind === 'review') {
    const due = D.dueLessons(lessons, g, now).slice(0, 4);
    if (!due.length) return { kind, empty: true };
    let items = D.buildSession(due, 'mix', { size: Math.max(6, due.length * 3), letters });
    return { kind, review: due, items };
  }
  let scope, note = '';
  if (one) scope = lessons.filter(l => l.id === one);
  if (!scope?.length) {
    scope = lessons.filter(l => g[l.id]);
    if (!scope.length) {
      const next = D.grammarPlan(lessons, g, now).lesson;
      scope = [next];
      note = `Вы ещё не проходили уроки — тренируем правило «${esc(next.title)}». <a href="#lesson-${next.id}">Прочитать объяснение</a>`;
    }
  }
  let items = D.buildSession(scope, kind, { size: 10, letters });
  if (!items.length && kind !== 'form') { items = D.buildSession(scope, 'mix', { size: 10, letters }); note ||= 'Для этого правила такие задания не подходят — смешиваем разные виды.'; }
  const title = scope.length === 1 ? scope[0].title : '';
  return { kind, items, note, title };
}

export function renderGrammarTraining(main, param = '') {
  const p = plan(param);
  const info = GRAMMAR_TRAIN[p.kind] || GRAMMAR_TRAIN.mix;
  if (p.empty || !p.items?.length) {
    main.innerHTML = `<section class="band narrow"><a class="back" href="#grammar">${icon('back')} Грамматика</a><h1>${info.title}</h1><div class="empty">${say(p.kind === 'review' ? 'Все правила пока свежи в памяти. Я напомню, когда придёт время!' : 'Здесь пока пусто.', { mood: 'happy', size: 80, cls: 'center' })}<p>${p.kind === 'review' ? 'Пройденные уроки возвращаются сюда через растущие интервалы: день, три дня, неделю, месяц…' : 'Для этого языка пока нет подходящих заданий.'}</p><div class="row gap center"><a class="btn" href="#gtrain-mix">Грамматика вперемешку</a><a class="btn ghost" href="#grammar">К урокам</a></div></div></section>`;
    return;
  }
  markStart();
  const steps = p.items, results = [];
  let i = 0;
  main.innerHTML = `
  <section class="band narrow trainer">
    <div class="train-top"><a class="back" href="#grammar">${icon('x')} <span>Закончить</span></a><b>${info.title}${p.title ? ` · ${esc(p.title)}` : ''}</b><span class="count" id="cnt"></span></div>
    <i class="bar"><i id="progress" style="width:0"></i></i>
    ${p.note ? `<p class="note">${p.note}</p>` : ''}
    ${p.review ? `<p class="note">Повторяем: ${p.review.map(l => esc(l.title)).join(', ')}</p>` : ''}
    <div id="stage" class="stage"></div>
  </section>`;
  const stage = $('#stage');

  const answer = (ok, right) => {
    const it = steps[i];
    results.push({ it, ok, right });
    G.recordAnswer(ok);
    if (ok) G.addXp(1);
    stage.classList.add(ok ? 'right' : 'wrong');
    const fb = document.createElement('div');
    fb.className = 'feedback ' + (ok ? 'ok' : 'bad');
    fb.innerHTML = `${icon(ok ? 'check' : 'x')}<div>${ok ? 'Верно!' : 'Правильно:'} <b>${esc(right)}</b><br><small>Правило: <a href="#lesson-${it.lesson}">${esc(it.title)}</a></small></div><button class="btn" id="next">Дальше</button>`;
    stage.append(fb);
    $('#next').focus();
    $('#next').onclick = next;
  };
  const next = () => { i++; if (i >= steps.length) return finish(); show(); };

  const show = () => {
    const it = steps[i];
    $('#cnt').textContent = `${i + 1} / ${steps.length}`;
    $('#progress').style.width = `${(i / steps.length) * 100}%`;
    stage.className = 'stage';
    delete stage.dataset.done;
    Q[it.kind](stage, it, answer);
  };

  const finish = () => {
    const ok = results.filter(r => r.ok).length;
    G.finishTraining(ok, results.length, 'g-' + p.kind);
    let reviewHtml = '';
    if (p.review) {
      const now = Date.now();
      reviewHtml = `<ul class="results">${p.review.map(l => {
        const mine = results.filter(r => r.it.lesson === l.id), right = mine.filter(r => r.ok).length;
        const grade = D.reviewLesson(store.state.grammar, l.id, right, mine.length, now);
        const days = Math.round((store.state.grammar[l.id].srs.due - now) / 86400000);
        return `<li class="${grade ? 'ok' : 'bad'}">${icon(grade ? 'check' : 'x')}<b><a href="#lesson-${l.id}">${esc(l.title)}</a></b><span>${right} из ${mine.length} · ${grade ? `следующее повторение через ${days} ${plural(days, 'день', 'дня', 'дней')}` : 'стоит перечитать урок, вернёмся завтра'}</span></li>`;
      }).join('')}</ul>`;
      store.save();
    }
    const wrong = results.filter(r => !r.ok);
    main.innerHTML = `
    <section class="band narrow">
      <h1>${ok === results.length ? 'Без единой ошибки!' : 'Тренировка завершена'}</h1>
      <p class="lead">${ok} из ${results.length} верно</p>
      ${resultBlock()}
      ${reviewHtml}
      ${wrong.length ? `<h2>Над чем поработать</h2><ul class="results">${wrong.map(r => `<li class="bad">${icon('x')}<b>${esc(r.right)}</b><span><a href="#lesson-${r.it.lesson}">${esc(r.it.title)}</a></span></li>`).join('')}</ul>` : ''}
      <div class="row gap"><button class="btn" id="again">${p.kind === 'review' ? 'Потренировать ещё' : 'Ещё раз'}</button><a class="btn ghost" href="#grammar">К урокам</a><a class="btn ghost" href="#train">Другие тренировки</a></div>
    </section>`;
    $('#again').onclick = () => { if (p.kind === 'review') location.hash = 'gtrain-mix'; else renderGrammarTraining(main, param); };
  };
  show();

  const onKey = e => {
    if (!stage.isConnected) return document.removeEventListener('keydown', onKey);
    if (e.target.matches('input')) return;
    const n = Number(e.key), opts = $$('.opt:not([disabled])', stage);
    if (n >= 1 && n <= opts.length) opts[n - 1].click();
  };
  document.addEventListener('keydown', onKey);
  return () => document.removeEventListener('keydown', onKey);
}

// ---------- виды заданий ----------
const Q = {
  // как в уроке: выбрать вариант или вписать форму
  form(stage, it, answer) {
    const q = esc(it.q).replace('___', '<span class="gap-fill">___</span>');
    const a = it.a.split('/')[0];
    stage.innerHTML = `<p class="muted center small">${esc(it.title)}</p><p class="q g-q">${q}</p>
      ${it.type === 'choice' ? `<div class="opts row-opts">${shuffle(it.options).map((o, k) => `<button class="opt" data-v="${esc(o)}"><i>${k + 1}</i>${esc(o)}</button>`).join('')}</div>`
        : `<form class="type-form"><input id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Ответ"><button class="btn">Проверить</button></form>${keysBar()}`}`;
    const check = val => {
      const answers = it.a.split('/').map(norm);
      const exact = answers.includes(norm(val));
      const close = !exact && it.type !== 'choice' && answers.some(x => fold(x) === fold(norm(val)));
      $$('.opt', stage).forEach(b => { b.disabled = true; if (norm(b.dataset.v) === norm(it.a)) b.classList.add('right'); else if (b.dataset.v === val) b.classList.add('wrong'); });
      $('#ans') && ($('#ans').disabled = true);
      const gap = $('.gap-fill', stage);
      if (gap) { gap.textContent = a; gap.classList.add(exact || close ? 'ok' : 'bad'); }
      answer(exact || close, a);
    };
    if (it.type === 'choice') $('.opts', stage).onclick = e => { const b = e.target.closest('.opt'); if (b && !b.disabled) check(b.dataset.v); };
    else { $('#ans').focus(); $('.type-form', stage).onsubmit = e => { e.preventDefault(); if ($('#ans').value.trim() && !$('#ans').disabled) check($('#ans').value); }; }
  },

  // верна ли фраза: выделенная часть — правильная форма или ошибка
  spot(stage, it, answer) {
    stage.innerHTML = `<p class="muted center small">${esc(it.title)} · верно ли выделенное?</p>${ctxLine(it)}
      <p class="q g-q">${esc(it.before)}<mark class="g-mark" title="${it.shown ? '' : 'Здесь ничего нет'}">${it.shown ? esc(it.shown) : '∅'}</mark>${esc(it.after)}</p>
      <div class="opts row-opts"><button class="opt" data-v="1"><i>1</i>Верно</button><button class="opt" data-v="0"><i>2</i>Есть ошибка</button></div>`;
    $('.opts', stage).onclick = e => {
      const b = e.target.closest('.opt'); if (!b || b.disabled) return;
      const ok = (b.dataset.v === '1') === it.ok;
      $$('.opt', stage).forEach(x => { x.disabled = true; if ((x.dataset.v === '1') === it.ok) x.classList.add('right'); else x.classList.add('wrong'); });
      $('.g-mark', stage).classList.add(it.ok ? 'ok' : 'bad');
      answer(ok, it.right);
    };
  },

  // собрать фразу из слов; среди плиток есть слово с неверной формой
  build(stage, it, answer) {
    const tiles = shuffle([...it.words, ...it.extra].map((t, k) => ({ t, k })));
    const picked = [];
    stage.innerHTML = `<p class="muted center small">${esc(it.title)} · соберите фразу${it.extra.length ? ', лишнее слово не нужно' : ''}</p>${ctxLine(it)}
      <div class="phrase-line" id="line" aria-label="Ваш ответ"></div>
      <div class="tiles words-tiles" id="pool">${tiles.map(x => `<button class="tile word-tile" data-k="${x.k}">${esc(x.t)}</button>`).join('')}</div>
      <div class="row gap center"><button class="btn ghost" id="clear">Сбросить</button><button class="btn" id="check" disabled>Проверить</button></div>`;
    const all = [...it.words, ...it.extra];
    const line = $('#line', stage), pool = $('#pool', stage);
    const draw = () => {
      line.innerHTML = picked.map((k, n) => `<button class="tile word-tile in" data-n="${n}">${esc(all[k])}</button>`).join('') + (picked.length === it.words.length ? `<span class="end">${esc(it.end)}</span>` : '');
      $$('.tile', pool).forEach(b => b.classList.toggle('used', picked.includes(Number(b.dataset.k))));
      $('#check', stage).disabled = picked.length !== it.words.length;
    };
    pool.onclick = e => { const b = e.target.closest('.tile'); if (!b || b.classList.contains('used') || stage.dataset.done || picked.length >= it.words.length) return; picked.push(Number(b.dataset.k)); draw(); };
    line.onclick = e => { const b = e.target.closest('.tile'); if (!b || stage.dataset.done) return; picked.splice(Number(b.dataset.n), 1); draw(); };
    $('#clear', stage).onclick = () => { picked.length = 0; draw(); };
    $('#check', stage).onclick = () => {
      stage.dataset.done = 1;
      $('#check', stage).disabled = true; $('#clear', stage).disabled = true;
      answer(normPhrase(picked.map(k => all[k]).join(' ')) === normPhrase(it.words.join(' ')), it.right);
    };
    draw();
  }
};
