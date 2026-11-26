// Тренировки: слово-перевод, перевод-слово, аудирование, конструктор слов, карточки (SRS) и спринт.
import { store } from '../store.js';
import { esc, $, $$, icon, shuffle, plural } from '../ui.js';
import * as G from '../game.js';
import { speak, canSpeak } from '../speech.js';
import { GRADES, intervalLabel } from '../srs.js';
import { L, lower, fold, lettersOnly, keysBar } from '../lang.js';
import { EXTRA, EXTRA_INFO, extraPlan, EXTRA_QUESTIONS } from './train-extra.js';

const SESSION = 10;
export const TRAIN_INFO = {
  wt: { title: 'Слово — перевод', desc: 'Выберите правильный перевод слова', ic: 'swap' },
  tw: { title: 'Перевод — слово', desc: 'Найдите иностранное слово по переводу', ic: 'swap' },
  au: { title: 'Аудирование', desc: 'Прослушайте слово и напишите его', ic: 'ear' },
  co: { title: 'Конструктор слов', desc: 'Соберите слово из букв', ic: 'puzzle' },
  cards: { title: 'Карточки', desc: 'Интервальное повторение изученных слов', ic: 'cards' },
  sprint: { title: 'Спринт', desc: '60 секунд: верно или неверно?', ic: 'bolt' },
  ...EXTRA_INFO
};

// План тренировки: список шагов { word, q }, где q — тип вопроса
function buildPlan(kind) {
  const extra = extraPlan(kind);
  if (extra !== undefined) return extra;
  let pool, practice = false;
  if (kind === 'cards') {
    pool = G.dueWords().slice(0, 20);
    if (!pool.length) { pool = shuffle(G.allWords().filter(w => !w.srs)).slice(0, SESSION); practice = 'learn'; }
  } else {
    pool = G.wordsFor(kind).slice(0, SESSION);
    if (kind === 'co') pool = pool.filter(w => lettersOnly(w.w).length <= 14);
  }
  if (!pool.length && G.allWords().length >= 4) { pool = shuffle(G.allWords()).slice(0, SESSION); practice = 'free'; }
  if ((G.allWords().length < 4 && kind !== 'cards') || !pool.length) return null;
  return { steps: shuffle(pool).map(word => ({ word, q: kind })), practice };
}

export function renderTrainings(main) {
  const c = G.counts();
  const n = k => k === 'cards' ? c.due : G.TRAININGS.includes(k) ? G.wordsFor(k).length : k === 'storm' ? c.new + c.learning : null;
  main.innerHTML = `
  <section class="band">
    <h1>Тренировки <span class="muted small-h">· ${L().name}</span></h1>
    <p class="lead">Каждое новое слово проходит четыре тренировки. После этого оно считается изученным и возвращается в «Карточках» через растущие интервалы: 1 день, 3 дня, неделю, месяц…</p>
    <div class="trainings">${Object.entries(TRAIN_INFO).map(([k, t]) => {
      const cnt = n(k);
      return `<a class="train-card ${k}" href="#train-${k}">${icon(t.ic)}<b>${t.title}</b><span>${t.desc}</span>${cnt === null ? '<em>в любое время</em>' : `<em class="${cnt ? 'ready' : ''}">${cnt ? `${cnt} ${plural(cnt, 'слово', 'слова', 'слов')} готово` : 'нет слов'}</em>`}</a>`;
    }).join('')}</div>
    ${c.total < 4 ? `<div class="empty"><p>Для тренировок нужно хотя бы 4 слова в словаре.</p><a class="btn" href="#sets">Выбрать набор слов</a></div>` : ''}
  </section>`;
}

// варианты ответа: перевод другого слова из словаря пользователя или встроенного словаря
export function distractors(word, field, n = 4) {
  const own = G.allWords().filter(w => w.w !== word.w).map(w => field === 't' ? w.t : w.w);
  const pool = shuffle([...new Set(own)]);
  const extra = shuffle([...L().DICT.entries()]).map(([w, t]) => field === 't' ? t : w);
  const out = [];
  for (const v of [...pool, ...extra]) { if (out.length >= n) break; if (v !== word[field] && !out.includes(v)) out.push(v); }
  return out;
}

export function renderTraining(main, kind) {
  const info = TRAIN_INFO[kind]; if (!info) { location.hash = 'train'; return; }
  if (kind === 'sprint') return sprint(main);

  if (EXTRA[kind]) return EXTRA[kind](main);
  const plan = buildPlan(kind);
  if (!plan) {
    main.innerHTML = `<section class="band narrow"><a class="back" href="#train">${icon('back')} Тренировки</a><h1>${info.title}</h1><div class="empty"><p>${kind === 'cards' ? 'Сейчас нечего повторять. Изученные слова появятся здесь, когда придёт их время.' : kind === 'ctx' ? 'Для этой тренировки нужны слова, которые встречаются в текстах или фразах. Добавьте слова из раздела «Тексты» или наборов.' : 'Добавьте в словарь хотя бы 4 слова.'}</p><a class="btn" href="#sets">Выбрать набор слов</a></div></section>`;
    return;
  }
  const { steps, practice } = plan;

  const results = [];
  let i = 0, timer;
  main.innerHTML = `
  <section class="band narrow trainer">
    <div class="train-top"><a class="back" href="#train">${icon('x')} <span>Закончить</span></a><b>${info.title}</b><span class="count" id="cnt"></span></div>
    <i class="bar"><i id="progress" style="width:0"></i></i>
    ${practice === 'free' ? '<p class="note">Новых слов для этой тренировки нет — повторяем все слова вперемешку.</p>' : practice === 'learn' ? '<p class="note">Повторять пока нечего — учим новые слова карточками.</p>' : ''}
    <div id="stage" class="stage"></div>
  </section>`;
  const stage = $('#stage');

  const answer = (word, ok, extra = '') => {
    results.push({ word, ok });
    G.recordAnswer(ok);
    const q = steps[i].q;
    if (ok) { if (practice !== 'free' && G.TRAININGS.includes(q) && G.hasWord(word.w)) G.markTrained(word.w, q); G.addXp(practice === 'free' ? 1 : 2); }
    stage.classList.add(ok ? 'right' : 'wrong');
    const fb = document.createElement('div');
    fb.className = 'feedback ' + (ok ? 'ok' : 'bad');
    fb.innerHTML = `${icon(ok ? 'check' : 'x')}<div><b>${esc(word.w)}</b> — ${esc(word.t)}${extra}</div><button class="btn" id="next">Дальше</button>`;
    stage.append(fb);
    speak(word.w, store.state.rate);
    $('#next').focus();
    $('#next').onclick = next;
    if (ok) timer = setTimeout(next, 1100);
  };

  const next = () => {
    clearTimeout(timer);
    i++;
    if (i >= steps.length) return finish();
    show();
  };

  const finish = () => {
    const ok = results.filter(r => r.ok).length;
    G.finishTraining(ok, results.length);
    main.innerHTML = `
    <section class="band narrow">
      <h1>${ok === results.length ? 'Без единой ошибки!' : 'Тренировка завершена'}</h1>
      <p class="lead">${ok} из ${results.length} верно · +${5 + (results.length >= 5 && ok === results.length ? 5 : 0)} XP бонус</p>
      <ul class="results">${results.map(r => `<li class="${r.ok ? 'ok' : 'bad'}">${icon(r.ok ? 'check' : 'x')}<b>${esc(r.word.w)}</b><span>${esc(r.word.t)}</span></li>`).join('')}</ul>
      <div class="row gap"><button class="btn" id="again">Ещё раз</button><a class="btn ghost" href="#train">Другие тренировки</a></div>
    </section>`;
    $('#again').onclick = () => renderTraining(main, kind);
  };

  const show = () => {
    const { word, q } = steps[i];
    $('#cnt').textContent = `${i + 1} / ${steps.length}`;
    $('#progress').style.width = `${(i / steps.length) * 100}%`;
    stage.className = 'stage';
    QUESTIONS[q](stage, word, answer, next);
  };
  show();

  const onKey = e => {
    if (!stage.isConnected) return document.removeEventListener('keydown', onKey);
    if (e.target.matches('input')) return;
    const n = Number(e.key);
    const opts = $$('.opt:not([disabled])', stage);
    if (n >= 1 && n <= opts.length) opts[n - 1].click();
  };
  document.addEventListener('keydown', onKey);
  return () => { clearTimeout(timer); document.removeEventListener('keydown', onKey); };
}

export const QUESTIONS = {
  wt(stage, word, answer) { choice(stage, word, 't', answer, `<button class="big-word say">${esc(word.w)} ${icon('sound')}</button>`); speak(word.w, store.state.rate); },
  tw(stage, word, answer) { choice(stage, word, 'w', answer, `<div class="big-word">${esc(word.t)}</div>`); },

  au(stage, word, answer) {
    const can = canSpeak();
    stage.innerHTML = `
      ${can ? `<button class="play say" aria-label="Прослушать ещё раз">${icon('sound')}</button><p class="muted center">Напишите услышанное слово</p>` : `<div class="big-word">${esc(word.t)}</div><p class="muted center">Озвучка недоступна в этом браузере — напишите слово по переводу</p>`}
      <form class="type-form"><input id="typed" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Слово"><button class="btn">Проверить</button></form>
      ${keysBar()}<button class="link" id="hint">Подсказка: показать перевод</button>`;
    if (can) { speak(word.w, store.state.rate); $('.say', stage).onclick = () => speak(word.w, store.state.rate * 0.8); }
    $('#hint').onclick = e => { e.target.textContent = word.t; };
    $('#typed').focus();
    $('.type-form', stage).onsubmit = e => {
      e.preventDefault();
      const v = lower($('#typed').value.trim());
      if (!v) return;
      $('#typed').disabled = true; e.target.querySelector('button').disabled = true;
      const exact = v === word.w, close = !exact && fold(v) === fold(word.w);
      answer(word, exact || close, exact ? '' : close ? `<br><small>Засчитано. Обратите внимание на буквы: ${esc(v)} → ${esc(word.w)}</small>` : `<br><small>Вы написали: ${esc(v)}</small>`);
    };
  },

  co(stage, word, answer) {
    const target = word.w;
    const letters = shuffle([...target].map((ch, idx) => ({ ch, idx })).filter(x => x.ch !== ' '));
    let pos = 0, mistakes = 0;
    const skipSpaces = () => { while (target[pos] === ' ') pos++; };
    stage.innerHTML = `
      <div class="big-word">${esc(word.t)}</div>
      <div class="slots">${[...target].map(ch => ch === ' ' ? '<span class="sgap"></span>' : '<span class="slot"></span>').join('')}</div>
      <div class="tiles">${letters.map((l, k) => `<button class="tile" data-k="${k}">${esc(l.ch)}</button>`).join('')}</div>
      <p class="muted center">Нажимайте на буквы по порядку или печатайте с клавиатуры</p>`;
    const slots = $$('.slot', stage);
    let filled = 0;
    const pick = btn => {
      skipSpaces();
      if (btn.dataset.ch === undefined) btn.dataset.ch = letters[btn.dataset.k].ch;
      if (btn.dataset.ch === target[pos]) {
        slots[filled++].textContent = btn.dataset.ch; btn.disabled = true; btn.classList.add('used'); pos++; skipSpaces();
        if (pos >= target.length) { document.removeEventListener('keydown', onType); answer(word, mistakes <= 1, mistakes ? `<br><small>Ошибок: ${mistakes}</small>` : ''); }
      } else { mistakes++; btn.classList.remove('shake'); void btn.offsetWidth; btn.classList.add('shake'); }
    };
    $('.tiles', stage).onclick = e => { const b = e.target.closest('.tile'); if (b && !b.disabled) pick(b); };
    const onType = e => {
      if (!stage.isConnected) return document.removeEventListener('keydown', onType);
      const ch = lower(e.key); if (ch.length !== 1) return;
      const btn = $$('.tile:not([disabled])', stage).find(b => letters[b.dataset.k].ch === ch) || $$('.tile:not([disabled])', stage)[0];
      if (btn) { if (letters[btn.dataset.k].ch !== ch) { mistakes++; btn.classList.remove('shake'); void btn.offsetWidth; btn.classList.add('shake'); } else pick(btn); }
    };
    document.addEventListener('keydown', onType);
  },

  cards(stage, word, answer) {
    stage.innerHTML = `
      <div class="flash" tabindex="0">
        <div class="front"><button class="big-word say">${esc(word.w)} ${icon('sound')}</button></div>
        <div class="back" hidden><div class="tr">${esc(word.t)}</div>${word.ctx ? `<p class="ctx">${esc(word.ctx)}</p>` : ''}</div>
      </div>
      <button class="btn big" id="flip">Показать перевод</button>
      <div class="grades" hidden>${GRADES.map(g => `<button class="opt grade g${g.id}" data-g="${g.id}"><b>${g.label}</b><span>${intervalLabel(word.srs, g.id)}</span></button>`).join('')}</div>`;
    speak(word.w, store.state.rate);
    $('.say', stage).onclick = e => { e.stopPropagation(); speak(word.w, store.state.rate); };
    const flip = () => { $('.back', stage).hidden = false; $('#flip').remove(); $('.grades', stage).hidden = false; $('.grade.g2', stage).focus(); };
    $('#flip').onclick = flip;
    $('.flash', stage).onclick = () => $('#flip') && flip();
    $('.grades', stage).onclick = e => {
      const b = e.target.closest('.grade'); if (!b) return;
      const g = Number(b.dataset.g);
      G.gradeCard(word.w, g);
      $$('.grade', stage).forEach(x => (x.disabled = true));
      answer(word, g >= 1, g === 0 ? '<br><small>Слово вернётся в тренировки</small>' : '');
    };
  }
};

Object.assign(QUESTIONS, EXTRA_QUESTIONS);

export function choice(stage, word, field, answer, head) {
  const right = word[field];
  const opts = shuffle([right, ...distractors(word, field)]);
  stage.innerHTML = `${head}<div class="opts">${opts.map((o, k) => `<button class="opt" data-v="${esc(o)}"><i>${k + 1}</i>${esc(o)}</button>`).join('')}</div>
    <button class="link" id="dunno">Не знаю</button>`;
  $('.say', stage) && ($('.say', stage).onclick = () => speak(word.w, store.state.rate));
  const pick = val => {
    $$('.opt', stage).forEach(b => { b.disabled = true; if (b.dataset.v === right) b.classList.add('right'); else if (b.dataset.v === val) b.classList.add('wrong'); });
    $('#dunno').remove();
    answer(word, val === right);
  };
  $('.opts', stage).onclick = e => { const b = e.target.closest('.opt'); if (b && !b.disabled) pick(b.dataset.v); };
  $('#dunno').onclick = () => pick(null);
}

// ---------- Спринт ----------
function sprint(main) {
  const own = G.allWords();
  const src = own.length >= 8 ? own.map(w => ({ w: w.w, t: w.t })) : [...L().DICT.entries()].map(([w, t]) => ({ w, t }));
  let score = 0, combo = 0, time = 60, total = 0, item, truth, tick;
  main.innerHTML = `
  <section class="band narrow trainer">
    <div class="train-top"><a class="back" href="#train">${icon('x')} <span>Закончить</span></a><b>Спринт</b><span class="count" id="time">60</span></div>
    <div class="sprint">
      <p class="muted center">${own.length >= 8 ? 'Слова из вашего словаря' : 'Слова из встроенного словаря'} · стрелки ← → на клавиатуре</p>
      <div class="score"><b id="score">0</b><span id="combo"></span></div>
      <div class="big-word" id="sw"></div><div class="sprint-tr" id="st"></div>
      <div class="row gap center"><button class="btn bad big" id="no">← Неверно</button><button class="btn good big" id="yes">Верно →</button></div>
    </div>
  </section>`;
  const nextPair = () => {
    item = src[Math.floor(Math.random() * src.length)];
    truth = Math.random() < 0.5;
    const shown = truth ? item.t : (src.filter(x => x.t !== item.t)[Math.floor(Math.random() * (src.length - 1))] || item).t;
    truth = shown === item.t;
    $('#sw').textContent = item.w; $('#st').textContent = shown;
  };
  const reply = said => {
    if (time <= 0) return;
    const ok = said === truth; total++;
    G.recordAnswer(ok);
    combo = ok ? combo + 1 : 0;
    if (ok) score += 10 * (1 + Math.min(3, Math.floor(combo / 4)));
    $('#score').textContent = score;
    $('#combo').textContent = combo >= 4 ? `×${1 + Math.min(3, Math.floor(combo / 4))}` : '';
    const box = $('.sprint'); box.classList.remove('right', 'wrong'); void box.offsetWidth; box.classList.add(ok ? 'right' : 'wrong');
    nextPair();
  };
  $('#yes').onclick = () => reply(true); $('#no').onclick = () => reply(false);
  const onKey = e => { if (e.key === 'ArrowRight') reply(true); if (e.key === 'ArrowLeft') reply(false); };
  document.addEventListener('keydown', onKey);
  nextPair();
  tick = setInterval(() => {
    time--; $('#time').textContent = time;
    if (time <= 0) {
      clearInterval(tick); document.removeEventListener('keydown', onKey);
      const xp = Math.round(score / 20);
      G.addXp(xp, 'спринт'); store.state.stats.trainings++; store.save();
      main.innerHTML = `<section class="band narrow"><h1>Время вышло</h1><p class="lead">${score} очков · ${total} ${plural(total, 'ответ', 'ответа', 'ответов')} · +${xp} XP</p><div class="row gap"><button class="btn" id="again">Ещё раз</button><a class="btn ghost" href="#train">Другие тренировки</a></div></section>`;
      $('#again').onclick = () => sprint(main);
    }
  }, 1000);
  return () => { clearInterval(tick); document.removeEventListener('keydown', onKey); };
}
