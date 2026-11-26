// Неправильные глаголы (английский): справочник и тренировка трёх форм.
import { store } from '../store.js';
import { esc, $, $$, icon, shuffle, toast, plural } from '../ui.js';
import * as G from '../game.js';
import { speak } from '../speech.js';
import { L } from '../lang.js';
import { IRREGULAR, COMMON, formOk } from '../data/irregular.js';

const KNOWN = 2; // столько верных ответов подряд — и глагол считается выученным
const progress = () => (store.state.irr ||= {});
const isKnown = v => (progress()[v.base]?.ok || 0) >= KNOWN;

export function renderVerbs(main) {
  if (L().id !== 'en') { main.innerHTML = `<section class="band narrow"><h1>Неправильные глаголы</h1><p class="lead">Этот справочник — для английского. Переключите язык на английский.</p></section>`; return; }
  let q = '';
  const draw = () => {
    const known = IRREGULAR.filter(isKnown).length;
    const ql = q.trim().toLowerCase();
    const rows = IRREGULAR.filter(v => !ql || [v.base, v.past, v.pp, v.tr].some(x => x.toLowerCase().includes(ql)));
    main.innerHTML = `
    <section class="band">
      <a class="back" href="#sets">${icon('back')} Наборы</a>
      <div class="head-row"><h1>Неправильные глаголы</h1><button class="btn" id="go">${icon('train')} Тренировать формы</button></div>
      <p class="lead">${IRREGULAR.length} глаголов, которые образуют прошедшее время не по правилу. Нажмите на форму, чтобы услышать её. Выученные (${KNOWN} верных ответа подряд) отмечены галочкой.</p>
      <div class="irr-top"><div class="stat"><b>${known}</b><span>из ${IRREGULAR.length} выучено</span><i class="bar"><i style="width:${Math.round((known / IRREGULAR.length) * 100)}%"></i></i></div>
        <label class="search">${icon('search')}<input id="q" placeholder="Поиск: go, went, идти…" value="${esc(q)}" aria-label="Поиск глагола"></label></div>
      <div class="irr-wrap"><table class="irr">
        <thead><tr><th>Инфинитив</th><th>Past Simple</th><th>Past Participle</th><th>Перевод</th><th></th></tr></thead>
        <tbody>${rows.map(v => `<tr class="${isKnown(v) ? 'known' : ''}">
          ${[v.base, v.past, v.pp].map(f => `<td><button class="say-f" data-s="${esc(f.replace('/', ', '))}">${esc(f)}</button></td>`).join('')}
          <td class="tr">${esc(v.tr)}</td>
          <td>${isKnown(v) ? icon('check') : G.hasWord(v.base) ? '' : `<button class="icon-btn add" data-w="${esc(v.base)}" data-t="${esc(v.tr)}" title="В словарь" aria-label="Добавить «${esc(v.base)}» в словарь">${icon('plus')}</button>`}</td></tr>`).join('')}</tbody>
      </table></div>
    </section>`;
    const inp = $('#q');
    inp.oninput = () => { q = inp.value; const pos = inp.selectionStart; draw(); const n = $('#q'); n.focus(); n.setSelectionRange(pos, pos); };
    $('.irr').onclick = e => {
      const b = e.target.closest('.say-f'); if (b) return speak(b.dataset.s, store.state.rate);
      const a = e.target.closest('.add'); if (a && G.addWord(a.dataset.w, a.dataset.t, '', 'Неправильные глаголы')) { toast(`«${a.dataset.w}» добавлено в словарь`); a.remove(); }
    };
    $('#go').onclick = () => train(main);
  };
  draw();
}

// Тренировка: 10 глаголов, сначала частые и ещё не выученные
function train(main) {
  const p = progress();
  const pool = IRREGULAR.map((v, i) => ({ v, i, ok: p[v.base]?.ok || 0 }))
    .filter(x => x.ok < KNOWN).sort((a, b) => (a.i < COMMON ? 0 : 1) - (b.i < COMMON ? 0 : 1) || a.ok - b.ok || Math.random() - 0.5);
  const list = (pool.length >= 5 ? shuffle(pool.slice(0, 15)).slice(0, 10) : shuffle(IRREGULAR.map(v => ({ v }))).slice(0, 10)).map(x => x.v);
  let i = 0, right = 0;
  const results = [];
  main.innerHTML = `
  <section class="band narrow trainer">
    <div class="train-top"><a class="back" href="#verbs">${icon('x')} <span>Закончить</span></a><b>Неправильные глаголы</b><span class="count" id="cnt"></span></div>
    <i class="bar"><i id="progress" style="width:0"></i></i>
    <div id="stage" class="stage"></div>
  </section>`;
  const stage = $('#stage');
  const show = () => {
    if (i >= list.length) return finish();
    const v = list[i];
    $('#cnt').textContent = `${i + 1} / ${list.length}`;
    $('#progress').style.width = `${(i / list.length) * 100}%`;
    stage.className = 'stage';
    stage.innerHTML = `<p class="muted">Напишите две формы глагола</p>
      <button class="big-word" id="say">${esc(v.base)} ${icon('sound')}</button><p class="tr-hint">${esc(v.tr)}</p>
      <form class="irr-form" autocomplete="off">
        <label>Past Simple<input name="past" autocapitalize="off" spellcheck="false" required></label>
        <label>Past Participle<input name="pp" autocapitalize="off" spellcheck="false" required></label>
        <button class="btn">Проверить</button>
      </form><div id="fb"></div>`;
    $('#say').onclick = () => speak(v.base, store.state.rate);
    const f = $('.irr-form', stage);
    f.past.focus();
    f.onsubmit = e => {
      e.preventDefault();
      if (f.past.disabled) return;
      const okP = formOk(f.past.value, v.past), okPP = formOk(f.pp.value, v.pp), ok = okP && okPP;
      f.past.classList.add(okP ? 'ok' : 'bad'); f.pp.classList.add(okPP ? 'ok' : 'bad');
      f.past.disabled = f.pp.disabled = true; $('button', f).disabled = true;
      G.recordAnswer(ok);
      const rec = p[v.base] || { ok: 0 };
      p[v.base] = { ok: ok ? rec.ok + 1 : 0, at: Date.now() };
      if (ok) { right++; G.addXp(2); }
      results.push({ v, ok });
      speak(`${v.base}, ${v.past.split('/')[0]}, ${v.pp.split('/')[0]}`, store.state.rate);
      stage.classList.add(ok ? 'right' : 'wrong');
      $('#fb').innerHTML = `<div class="feedback ${ok ? 'ok' : 'bad'}">${icon(ok ? 'check' : 'x')}<div>${ok ? 'Верно!' : 'Правильно:'} <b>${esc(v.base)} — ${esc(v.past)} — ${esc(v.pp)}</b></div><button class="btn" id="next">Дальше</button></div>`;
      $('#next').focus();
      $('#next').onclick = () => { i++; show(); };
      store.save();
    };
  };
  const finish = () => {
    G.finishTraining(right, list.length, 'irr');
    main.innerHTML = `
    <section class="band narrow">
      <h1>${right === list.length ? 'Без единой ошибки!' : 'Тренировка завершена'}</h1>
      <p class="lead">${right} из ${list.length} верно · выучено ${IRREGULAR.filter(isKnown).length} ${plural(IRREGULAR.filter(isKnown).length, 'глагол', 'глагола', 'глаголов')} из ${IRREGULAR.length}</p>
      <ul class="results">${results.map(r => `<li class="${r.ok ? 'ok' : 'bad'}">${icon(r.ok ? 'check' : 'x')}<b>${esc(r.v.base)}</b><span>${esc(r.v.past)} · ${esc(r.v.pp)}</span></li>`).join('')}</ul>
      <div class="row gap"><button class="btn" id="again">Ещё 10 глаголов</button><a class="btn ghost" href="#verbs">К таблице</a></div>
    </section>`;
    $('#again').onclick = () => train(main);
  };
  show();
}
