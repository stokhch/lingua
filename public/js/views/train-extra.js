// Дополнительные тренировки: мозговой штурм, слово в контексте, конструктор фраз, диктант, водопад, кроссворд.
import { store } from '../store.js';
import { esc, $, $$, icon, shuffle, plural } from '../ui.js';
import * as G from '../game.js';
import { speak, canSpeak } from '../speech.js';
import { L, lower, fold, lettersOnly, keysBar } from '../lang.js';
import { distractors } from './train.js';
import { buildCrossword } from '../crossword.js';

export const EXTRA_INFO = {
  storm: { title: 'Мозговой штурм', desc: '5 новых слов: знакомство и три тренировки подряд', ic: 'brain' },
  ctx: { title: 'Слово в контексте', desc: 'Вставьте пропущенное слово в предложение', ic: 'quote' },
  phrase: { title: 'Конструктор фраз', desc: 'Соберите фразу по переводу', ic: 'puzzle' },
  dict: { title: 'Диктант', desc: 'Прослушайте фразу и запишите её', ic: 'pen' },
  fall: { title: 'Водопад', desc: 'Успейте выбрать перевод, пока слово падает', ic: 'drop' },
  cross: { title: 'Кроссворд', desc: 'Разгадайте кроссворд из слов словаря', ic: 'grid' }
};

// ---------- планы для пошаговых тренировок ----------
const sentenceCache = {};
const sentences = () => (sentenceCache[L().id] ||= [...L().TEXTS.flatMap(t => t.body.split(/(?<=[.!?])\s+/)), ...L().PHRASES.map(p => p.en)].map(s => s.trim()).filter(Boolean));

function findSentence(w) {
  const tokenRe = new RegExp(L().tokenRe.source, 'g'), { lemma } = L();
  const ordered = w.ctx ? [w.ctx, ...shuffle(sentences())] : shuffle(sentences());
  for (const s of ordered) {
    for (const m of s.matchAll(tokenRe)) if (lemma(m[0]) === w.w) return { sent: s, form: m[0], at: m.index };
  }
  return null;
}

export function extraPlan(kind) {
  const all = G.allWords();
  if (kind === 'storm') {
    if (all.length < 4) return null;
    let words = all.filter(w => !w.srs).sort((a, b) => a.added - b.added).slice(0, 5), practice = false;
    if (!words.length) { words = shuffle(all).slice(0, 5); practice = 'free'; }
    const co = w => (lettersOnly(w.w).length <= 14 ? 'co' : 'au');
    return { practice, steps: [
      ...words.map(word => ({ word, q: 'intro' })),
      ...shuffle(words).map(word => ({ word, q: 'wt' })),
      ...shuffle(words).map(word => ({ word, q: 'tw' })),
      ...shuffle(words).map(word => ({ word, q: co(word) }))
    ] };
  }
  if (kind === 'ctx') {
    if (all.length < 4) return null;
    const items = [];
    for (const w of [...all.filter(x => !x.srs), ...shuffle(all.filter(x => x.srs))]) {
      if (w.w.includes(' ')) continue;
      const f = findSentence(w);
      if (f) items.push({ ...w, ...f });
      if (items.length >= 10) break;
    }
    return items.length ? { practice: false, steps: shuffle(items).map(word => ({ word, q: 'ctx' })) } : null;
  }
  const { PHRASES } = L();
  if (kind === 'phrase') return { practice: false, steps: shuffle(PHRASES).slice(0, 8).map(p => ({ word: { w: p.en, t: p.ru }, q: 'phrase' })) };
  if (kind === 'dict') return { practice: false, steps: shuffle(PHRASES).slice(0, 6).map(p => ({ word: { w: p.en, t: p.ru }, q: 'dict' })) };
  return undefined;
}

const norm = s => lower(s).replace(/[’`]/g, "'").replace(/[^\p{L}' ]/gu, ' ').replace(/\s+/g, ' ').trim();

export const EXTRA_QUESTIONS = {
  intro(stage, word, answer, next) {
    stage.innerHTML = `
      <p class="muted center">Знакомство со словом</p>
      <div class="flash"><button class="big-word say">${esc(word.w)} ${icon('sound')}</button><div class="tr">${esc(word.t)}</div>${word.ctx ? `<p class="ctx">${esc(word.ctx)}</p>` : ''}</div>
      <button class="btn big" id="got">Запомнил(а)</button>`;
    speak(word.w, store.state.rate);
    $('.say', stage).onclick = () => speak(word.w, store.state.rate);
    $('#got').focus();
    $('#got').onclick = next;
  },

  ctx(stage, word, answer) {
    const before = word.sent.slice(0, word.at), after = word.sent.slice(word.at + word.form.length);
    const opts = shuffle([word.w, ...distractors(word, 'w', 3)]);
    stage.innerHTML = `
      <p class="ctx-sent">${esc(before)}<span class="gap-fill">___</span>${esc(after)}</p>
      <div class="opts">${opts.map((o, k) => `<button class="opt" data-v="${esc(o)}"><i>${k + 1}</i>${esc(o)}</button>`).join('')}</div>
      <button class="link" id="hint">Подсказка: перевод слова</button>`;
    $('#hint').onclick = e => { e.target.textContent = word.t; };
    $('.opts', stage).onclick = e => {
      const b = e.target.closest('.opt'); if (!b || b.disabled) return;
      const ok = b.dataset.v === word.w;
      $$('.opt', stage).forEach(x => { x.disabled = true; if (x.dataset.v === word.w) x.classList.add('right'); else if (x === b) x.classList.add('wrong'); });
      const gap = $('.gap-fill', stage); gap.textContent = word.form; gap.classList.add(ok ? 'ok' : 'bad');
      $('#hint').remove();
      answer(word, ok);
    };
  },

  phrase(stage, word, answer) {
    const end = (word.w.match(/[.!?]$/) || [''])[0];
    const target = word.w.slice(0, word.w.length - end.length).split(' ');
    const tiles = shuffle(target.map((t, k) => ({ t, k })));
    const picked = [];
    stage.innerHTML = `
      <div class="big-word phrase-ru">${esc(word.t)}</div>
      <div class="phrase-line" id="line" aria-label="Ваш ответ"></div>
      <div class="tiles words-tiles" id="pool">${tiles.map(x => `<button class="tile word-tile" data-k="${x.k}">${esc(x.t)}</button>`).join('')}</div>
      <div class="row gap center"><button class="btn ghost" id="clear">Сбросить</button><button class="btn" id="check" disabled>Проверить</button></div>`;
    const line = $('#line'), pool = $('#pool');
    const draw = () => {
      line.innerHTML = picked.map((k, n) => `<button class="tile word-tile in" data-n="${n}">${esc(target[k])}</button>`).join('') + (picked.length === target.length ? `<span class="end">${esc(end)}</span>` : '');
      $$('.tile', pool).forEach(b => b.classList.toggle('used', picked.includes(Number(b.dataset.k))));
      $('#check').disabled = picked.length !== target.length;
    };
    pool.onclick = e => { const b = e.target.closest('.tile'); if (!b || b.classList.contains('used')) return; picked.push(Number(b.dataset.k)); draw(); };
    line.onclick = e => { const b = e.target.closest('.tile'); if (!b || stage.dataset.done) return; picked.splice(Number(b.dataset.n), 1); draw(); };
    $('#clear').onclick = () => { picked.length = 0; draw(); };
    $('#check').onclick = () => {
      stage.dataset.done = 1;
      const ok = norm(picked.map(k => target[k]).join(' ')) === norm(target.join(' '));
      $('#check').disabled = true; $('#clear').disabled = true;
      answer(word, ok);
    };
    draw();
  },

  dict(stage, word, answer) {
    const can = canSpeak();
    stage.innerHTML = `
      ${can ? `<div class="row gap center"><button class="play say" aria-label="Прослушать">${icon('sound')}</button><button class="btn ghost" id="slow">Медленнее</button></div><p class="muted center">Запишите фразу целиком</p>`
        : `<div class="big-word phrase-ru">${esc(word.t)}</div><p class="muted center">Озвучка недоступна — переведите фразу на ${L().acc}</p>`}
      <form class="type-form wide"><input id="typed" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Фраза"><button class="btn">Проверить</button></form>${keysBar()}
      ${can ? '<button class="link" id="hint">Подсказка: перевод фразы</button>' : ''}`;
    if (can) {
      speak(word.w, store.state.rate);
      $('.say', stage).onclick = () => speak(word.w, store.state.rate);
      $('#slow').onclick = () => speak(word.w, 0.6);
      $('#hint').onclick = e => { e.target.textContent = word.t; };
    }
    $('#typed').focus();
    $('.type-form', stage).onsubmit = e => {
      e.preventDefault();
      const v = $('#typed').value; if (!v.trim()) return;
      $('#typed').disabled = true; e.target.querySelector('button').disabled = true;
      const exact = norm(v) === norm(word.w), close = !exact && fold(norm(v)) === fold(norm(word.w));
      answer(word, exact || close, exact ? '' : close ? `<br><small>Засчитано. Обратите внимание на буквы: ${esc(v)}</small>` : `<br><small>Вы написали: ${esc(v)}</small>`);
    };
  }
};

// ---------- Водопад ----------
function wordSource() {
  const own = G.allWords();
  return own.length >= 8 ? own.map(w => ({ w: w.w, t: w.t })) : [...L().DICT.entries()].map(([w, t]) => ({ w, t }));
}

function fall(main) {
  const src = wordSource();
  let lives = 3, score = 0, n = 0, dur = 6500, raf, item, t0, locked = false, timer;
  main.innerHTML = `
  <section class="band narrow trainer">
    <div class="train-top"><a class="back" href="#train">${icon('x')} <span>Закончить</span></a><b>Водопад</b><span class="count" id="lives"></span></div>
    <div class="fall-arena" id="arena"><div class="fall-word" id="fw"></div><div class="fall-floor"></div></div>
    <div class="opts fall-opts" id="fo"></div>
    <p class="muted center">Клавиши 1–4 · очки: <b id="fs">0</b></p>
  </section>`;
  const arena = $('#arena'), fw = $('#fw'), fo = $('#fo');
  const hearts = () => { $('#lives').innerHTML = Array.from({ length: 3 }, (_, k) => `<span class="heart ${k < lives ? 'on' : ''}">${icon('heart')}</span>`).join(''); };
  const nextWord = () => {
    if (lives <= 0 || n >= 30) return end();
    locked = false;
    item = src[Math.floor(Math.random() * src.length)];
    const opts = shuffle([item.t, ...distractors({ w: item.w, t: item.t }, 't', 3)]);
    fw.textContent = item.w; fw.className = 'fall-word'; fw.style.transform = 'translateY(0)';
    fo.innerHTML = opts.map((o, k) => `<button class="opt" data-v="${esc(o)}"><i>${k + 1}</i>${esc(o)}</button>`).join('');
    t0 = performance.now();
    const H = arena.clientHeight - 60;
    const step = now => {
      const p = Math.min(1, (now - t0) / dur);
      fw.style.transform = `translateY(${p * H}px)`;
      if (p >= 1) return resolve(null);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  };
  const resolve = val => {
    if (locked) return; locked = true;
    cancelAnimationFrame(raf);
    const ok = val === item.t; n++;
    G.recordAnswer(ok);
    $$('.opt', fo).forEach(b => { b.disabled = true; if (b.dataset.v === item.t) b.classList.add('right'); else if (b.dataset.v === val) b.classList.add('wrong'); });
    if (ok) { score++; dur = Math.max(2600, dur * 0.94); fw.classList.add('ok'); speak(item.w, store.state.rate); }
    else { lives--; fw.classList.add('bad'); hearts(); }
    $('#fs').textContent = score;
    timer = setTimeout(nextWord, ok ? 500 : 1300);
  };
  fo.onclick = e => { const b = e.target.closest('.opt'); if (b && !b.disabled) resolve(b.dataset.v); };
  const onKey = e => { const k = Number(e.key); const b = $$('.opt', fo)[k - 1]; if (b && !b.disabled) b.click(); };
  document.addEventListener('keydown', onKey);
  const end = () => {
    document.removeEventListener('keydown', onKey);
    G.addXp(score, 'водопад'); store.state.stats.trainings++; store.save();
    main.innerHTML = `<section class="band narrow"><h1>${lives > 0 ? 'Все слова пойманы!' : 'Жизни закончились'}</h1><p class="lead">Поймано ${score} из ${n} ${plural(n, 'слова', 'слов', 'слов')} · +${score} XP</p><div class="row gap"><button class="btn" id="again">Ещё раз</button><a class="btn ghost" href="#train">Другие тренировки</a></div></section>`;
    $('#again').onclick = () => fall(main);
  };
  hearts(); nextWord();
  return () => { cancelAnimationFrame(raf); clearTimeout(timer); document.removeEventListener('keydown', onKey); };
}

// ---------- Кроссворд ----------
function cross(main) {
  const letterRe = new RegExp(`^[${L().letters}]{3,10}$`);
  const ok = w => letterRe.test(w) && w === lower(w);
  let cands = shuffle(G.allWords().filter(w => ok(w.w))).map(w => ({ w: w.w, t: w.t }));
  if (cands.length < 6) cands = cands.concat(shuffle([...L().DICT.entries()].filter(([w]) => ok(w))).slice(0, 30).map(([w, t]) => ({ w, t })));
  let cw = null;
  for (let tries = 0; tries < 8; tries++) { const c = buildCrossword(shuffle(cands).slice(0, 16)); if (c && (!cw || c.words.length > cw.words.length)) cw = c; if (cw?.words.length >= 7) break; }
  const cells = {};
  for (const p of cw.words) for (let i = 0; i < p.w.length; i++) {
    const r = p.r + (p.dir === 'down' ? i : 0), c = p.c + (p.dir === 'across' ? i : 0);
    const k = r + ':' + c; (cells[k] ||= { r, c, ch: p.w[i], words: [] }).words.push(p);
  }
  const startNum = {}; for (const p of cw.words) startNum[p.r + ':' + p.c] = p.n;
  let dir = 'across', solved = new Set();
  main.innerHTML = `
  <section class="band trainer cross-wrap">
    <div class="train-top"><a class="back" href="#train">${icon('x')} <span>Закончить</span></a><b>Кроссворд</b><span class="count" id="cc">0 / ${cw.words.length}</span></div>
    <div class="cross">
      <div class="cross-grid" style="--cols:${cw.cols}" id="cg">${Array.from({ length: cw.rows * cw.cols }, (_, i) => {
        const r = Math.floor(i / cw.cols), c = i % cw.cols, k = r + ':' + c;
        return cells[k] ? `<label class="cell">${startNum[k] ? `<i>${startNum[k]}</i>` : ''}<input maxlength="1" data-k="${k}" autocomplete="off" autocapitalize="off" aria-label="Клетка"></label>` : '<span class="cell void"></span>';
      }).join('')}</div>
      <div class="clues">
        ${['across', 'down'].map(d => `<h3>${d === 'across' ? 'По горизонтали' : 'По вертикали'}</h3><ol>${cw.words.filter(p => p.dir === d).map(p => `<li data-id="${p.n}-${d}"><b>${p.n}.</b> ${esc(p.t)} <span class="muted">(${p.w.length})</span></li>`).join('')}</ol>`).join('')}
        ${keysBar()}<div class="row gap"><button class="btn" id="check">Проверить</button><button class="btn ghost" id="hint">Открыть букву</button><button class="btn ghost" id="give">Сдаться</button></div>
      </div>
    </div>
  </section>`;
  const inp = k => $(`input[data-k="${k}"]`);
  let focusK = null;
  const wordAt = k => cells[k].words.find(p => p.dir === dir) || cells[k].words[0];
  const highlight = () => {
    $$('.cell input').forEach(x => x.parentElement.classList.remove('hl'));
    $$('.clues li').forEach(x => x.classList.remove('hl'));
    if (!focusK) return;
    const p = wordAt(focusK); dir = p.dir;
    for (let i = 0; i < p.w.length; i++) inp(`${p.r + (p.dir === 'down' ? i : 0)}:${p.c + (p.dir === 'across' ? i : 0)}`).parentElement.classList.add('hl');
    $(`.clues li[data-id="${p.n}-${p.dir}"]`)?.classList.add('hl');
  };
  const move = (k, delta) => {
    const [r, c] = k.split(':').map(Number);
    const nk = dir === 'down' ? `${r + delta}:${c}` : `${r}:${c + delta}`;
    if (cells[nk]) inp(nk).focus();
  };
  const grid = $('#cg');
  grid.addEventListener('focusin', e => { const k = e.target.dataset.k; if (!k) return; if (focusK === k && cells[k].words.length > 1) { /* повторный клик — смена направления */ } focusK = k; highlight(); });
  grid.addEventListener('click', e => { const k = e.target.dataset?.k; if (k && k === focusK && cells[k].words.length > 1) { dir = dir === 'across' ? 'down' : 'across'; highlight(); } });
  grid.addEventListener('input', e => { const x = e.target; x.value = lettersOnly(lower(x.value)).slice(-1); x.parentElement.classList.remove('bad'); if (x.value) move(x.dataset.k, 1); });
  grid.addEventListener('keydown', e => {
    const k = e.target.dataset.k; if (!k) return;
    if (e.key === 'Backspace' && !e.target.value) { move(k, -1); }
    const arrows = { ArrowRight: ['across', 1], ArrowLeft: ['across', -1], ArrowDown: ['down', 1], ArrowUp: ['down', -1] };
    if (arrows[e.key]) { e.preventDefault(); dir = arrows[e.key][0]; move(k, arrows[e.key][1]); highlight(); }
  });
  $$('.clues li').forEach(li => li.onclick = () => { const [n, d] = li.dataset.id.split('-'); const p = cw.words.find(x => x.n === Number(n) && x.dir === d); dir = d; inp(`${p.r}:${p.c}`).focus(); highlight(); });
  const check = (final = false) => {
    let fresh = 0;
    for (const [k, cell] of Object.entries(cells)) { const v = inp(k).value; inp(k).parentElement.classList.toggle('bad', !!v && v !== cell.ch); }
    for (const p of cw.words) {
      const id = p.n + p.dir;
      const good = [...p.w].every((ch, i) => inp(`${p.r + (p.dir === 'down' ? i : 0)}:${p.c + (p.dir === 'across' ? i : 0)}`).value === ch);
      if (good && !solved.has(id)) { solved.add(id); fresh++; G.recordAnswer(true); $(`.clues li[data-id="${p.n}-${p.dir}"]`)?.classList.add('done'); for (let i = 0; i < p.w.length; i++) inp(`${p.r + (p.dir === 'down' ? i : 0)}:${p.c + (p.dir === 'across' ? i : 0)}`).parentElement.classList.add('ok'); }
    }
    if (fresh && !final) G.addXp(fresh * 2, `${fresh} ${plural(fresh, 'слово', 'слова', 'слов')} в кроссворде`);
    $('#cc').textContent = `${solved.size} / ${cw.words.length}`;
    if (solved.size === cw.words.length || final) finish(final);
  };
  const finish = gaveUp => {
    if (!gaveUp) G.addXp(5, 'кроссворд разгадан');
    store.state.stats.trainings++; store.save();
    $$('.cell input').forEach(x => { x.disabled = true; });
    $('.clues .row').innerHTML = `<p class="lead">${gaveUp ? `Разгадано ${solved.size} из ${cw.words.length}` : 'Кроссворд разгадан!'}</p><button class="btn" id="again">Новый кроссворд</button><a class="btn ghost" href="#train">Другие тренировки</a>`;
    $('#again').onclick = () => cross(main);
  };
  $('#check').onclick = () => check();
  $('#hint').onclick = () => {
    const k = focusK && !inp(focusK).value ? focusK : Object.keys(cells).find(x => inp(x).value !== cells[x].ch);
    if (!k) return; inp(k).value = cells[k].ch; inp(k).parentElement.classList.add('given'); inp(k).focus();
  };
  $('#give').onclick = () => { check(true); for (const [k, c] of Object.entries(cells)) if (inp(k).value !== c.ch) { inp(k).value = c.ch; inp(k).parentElement.classList.add('given'); } };
  inp(`${cw.words[0].r}:${cw.words[0].c}`).focus();
}

export const EXTRA = { fall, cross };
