// Личный словарь и тематические наборы слов.
import { store } from '../store.js';
import { esc, $, $$, icon, toast, plural } from '../ui.js';
import * as G from '../game.js';
import { speak } from '../speech.js';
import { L, lower, keysBar } from '../lang.js';
import { translateWord } from '../translate.js';

let filter = 'all', query = '';

export function renderDictionary(main) {
  const c = G.counts();
  main.innerHTML = `
  <section class="band">
    <div class="head-row"><h1>Мой словарь</h1><span class="muted">${L().name} · ${c.total} ${plural(c.total, 'слово', 'слова', 'слов')}</span></div>
    <form class="add-word" id="add" autocomplete="off">
      <input id="aw-word" placeholder="Новое слово, например: ${L().sample}" aria-label="Слово (${L().acc})" required autocapitalize="off">
      <input id="aw-tr" placeholder="Перевод" aria-label="Перевод" required>
      <button class="btn" type="submit">${icon('plus')} Добавить</button>
      ${keysBar()}<p class="hint" id="aw-hint"></p>
    </form>
    <div class="toolbar">
      <div class="chips" role="tablist">
        ${[['all', 'Все', c.total], ['new', 'Новые', c.new], ['learning', 'Изучаются', c.learning], ['learned', 'Изучены', c.learned], ['due', 'Повторить', c.due]].map(([k, t, n]) => `<button class="chip ${filter === k ? 'on' : ''}" data-f="${k}">${t} <i>${n}</i></button>`).join('')}
      </div>
      <label class="search">${icon('search')}<input id="q" placeholder="Поиск" value="${esc(query)}" aria-label="Поиск по словарю"></label>
    </div>
    <ul class="words" id="list"></ul>
  </section>`;

  const list = $('#list');
  const draw = () => {
    const q = lower(query.trim());
    const words = G.allWords()
      .filter(w => filter === 'all' || G.wordStatus(w) === filter)
      .filter(w => !q || w.w.includes(q) || lower(w.t).includes(q))
      .sort((a, b) => b.added - a.added);
    if (!words.length) {
      list.innerHTML = `<li class="empty">${c.total ? 'Ничего не найдено.' : 'Словарь пуст. Добавьте слово выше, выберите <a href="#sets">набор</a> или нажимайте на слова в <a href="#texts">текстах</a>.'}</li>`;
      return;
    }
    list.innerHTML = words.map(w => {
      const st = G.wordStatus(w);
      const dots = G.TRAININGS.map(k => `<i class="${w.srs || w.trained?.[k] ? 'on' : ''}"></i>`).join('');
      return `<li class="word ${st}" data-w="${esc(w.w)}">
        <button class="icon-btn say" title="Произнести" aria-label="Произнести ${esc(w.w)}">${icon('sound')}</button>
        <div class="wt"><b>${esc(w.w)}</b><span>${esc(w.t)}</span>${w.ctx ? `<small>${esc(w.ctx)}</small>` : ''}</div>
        <div class="prog" title="${G.STATUS_LABEL[st]}"><span class="dots">${dots}</span><em>${G.STATUS_LABEL[st]}</em></div>
        <button class="icon-btn del" title="Удалить" aria-label="Удалить ${esc(w.w)}">${icon('trash')}</button>
      </li>`;
    }).join('');
  };
  draw();

  list.onclick = e => {
    const li = e.target.closest('[data-w]'); if (!li) return;
    if (e.target.closest('.say')) speak(li.dataset.w, store.state.rate);
    if (e.target.closest('.del')) { const w = li.dataset.w; const saved = store.state.words[w]; G.removeWord(w); draw(); toastUndo(w, saved, draw); }
  };
  $$('.chip').forEach(b => b.onclick = () => { filter = b.dataset.f; $$('.chip').forEach(x => x.classList.toggle('on', x === b)); draw(); });
  $('#q').oninput = e => { query = e.target.value; draw(); };

  let t;
  $('#aw-word').oninput = e => {
    clearTimeout(t);
    const v = e.target.value.trim();
    t = setTimeout(async () => {
      if (!v) return ($('#aw-hint').textContent = '');
      const r = await translateWord(v);
      if (r.translation && !$('#aw-tr').value) $('#aw-tr').value = r.translation;
      $('#aw-hint').textContent = G.hasWord(r.word) ? 'Это слово уже есть в словаре.' : r.translation ? `Подсказка: ${r.translation}` : '';
    }, 300);
  };
  $('#add').onsubmit = e => {
    e.preventDefault();
    const w = $('#aw-word').value, tr = $('#aw-tr').value;
    if (G.addWord(w, tr, '', 'вручную')) { toast(`«${w.trim()}» добавлено`); e.target.reset(); $('#aw-hint').textContent = ''; renderDictionary(main); $('#aw-word').focus(); }
    else $('#aw-hint').textContent = G.hasWord(w) ? 'Это слово уже есть в словаре.' : 'Заполните слово и перевод.';
  };
}

function toastUndo(w, saved, redraw) {
  const el = document.createElement('div');
  el.className = 'undo';
  el.innerHTML = `<span>«${esc(w)}» удалено</span><button class="btn small">Вернуть</button>`;
  document.body.append(el);
  const timer = setTimeout(() => el.remove(), 5000);
  el.querySelector('button').onclick = () => { store.state.words[w] = saved; store.save(); clearTimeout(timer); el.remove(); redraw(); };
}

export function renderSets(main) {
  main.innerHTML = `
  <section class="band">
    <h1>Наборы слов</h1>
    <p class="lead">${L().name}: тематические подборки из встроенного словаря. Откройте набор и добавьте нужные слова — они сразу появятся в тренировках.</p>
    <div class="sets">${Object.entries(L().SET_INFO).map(([id, s]) => {
      const words = L().SETS[id] || []; const have = words.filter(w => G.hasWord(w)).length;
      return `<a class="set-card ${id}" href="#set-${id}"><b>${s.title}</b><span>${s.desc}</span><i class="bar"><i style="width:${Math.round((have / words.length) * 100)}%"></i></i><em>${have} из ${words.length} в словаре</em></a>`;
    }).join('')}</div>
  </section>`;
}

export function renderSet(main, id) {
  const { SET_INFO, SETS, DICT } = L();
  const info = SET_INFO[id]; if (!info) { location.hash = 'sets'; return; }
  const words = SETS[id];
  const draw = () => {
    const left = words.filter(w => !G.hasWord(w)).length;
    main.innerHTML = `
    <section class="band">
      <a class="back" href="#sets">${icon('back')} Все наборы</a>
      <div class="head-row"><h1>${info.title}</h1><button class="btn" id="add-all" ${left ? '' : 'disabled'}>${icon('plus')} ${left ? `Добавить все (${left})` : 'Все слова в словаре'}</button></div>
      <ul class="set-words">${words.map(w => `<li data-w="${esc(w)}" class="${G.hasWord(w) ? 'have' : ''}">
        <button class="icon-btn say" aria-label="Произнести">${icon('sound')}</button>
        <div><b>${esc(w)}</b><span>${esc(DICT.get(w))}</span></div>
        <button class="icon-btn add" aria-label="${G.hasWord(w) ? 'Уже в словаре' : 'Добавить'}">${icon(G.hasWord(w) ? 'check' : 'plus')}</button></li>`).join('')}</ul>
    </section>`;
    $('#add-all').onclick = () => { let n = 0; for (const w of words) if (G.addWord(w, DICT.get(w), '', info.title)) n++; toast(`Добавлено ${n} ${plural(n, 'слово', 'слова', 'слов')}`); draw(); };
    $('.set-words').onclick = e => {
      const li = e.target.closest('[data-w]'); if (!li) return;
      const w = li.dataset.w;
      if (e.target.closest('.say')) speak(w, store.state.rate);
      if (e.target.closest('.add') && !G.hasWord(w)) { G.addWord(w, DICT.get(w), '', info.title); li.classList.add('have'); li.querySelector('.add').innerHTML = icon('check'); }
    };
  };
  draw();
}
