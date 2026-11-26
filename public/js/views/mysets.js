// Свои наборы слов и «фокус» тренировок: тренировать только слова одного набора.
import { store } from '../store.js';
import { esc, $, $$, icon, toast, modal, plural } from '../ui.js';
import * as G from '../game.js';
import { speak } from '../speech.js';
import { L, lower } from '../lang.js';

const MAX_SETS = 30;
const S = () => store.state;
const sets = () => (S().mySets ||= {});

function createSet(onDone) {
  if (Object.keys(sets()).length >= MAX_SETS) { toast(`Можно создать до ${MAX_SETS} наборов`); return; }
  modal(`<h2>Новый набор</h2><p class="muted">Соберите слова под свою задачу: к экзамену, из сериала, для поездки. Тренировки можно запускать только по этому набору.</p>
    <form id="ns" class="mat-form"><label>Название<input name="title" maxlength="40" required placeholder="Например: к собеседованию"></label>
    <div class="row gap"><button class="btn">Создать</button><button class="btn ghost" type="button" data-close>Отмена</button></div></form>`,
  (el, close) => { $('#ns', el).title.focus(); $('#ns', el).onsubmit = e => {
    e.preventDefault();
    const id = Date.now().toString(36);
    sets()[id] = { id, title: e.target.title.value.trim().slice(0, 40) || 'Мой набор', words: [], created: Date.now() };
    store.save(); close(); onDone(id);
  }; });
}

// Блок «Мои наборы» в начале страницы «Наборы»
export function mySetsHtml() {
  const list = Object.values(sets()).sort((a, b) => b.created - a.created);
  return `<div class="head-row"><h2>Мои наборы</h2><button class="btn ghost small" id="new-set">${icon('plus')} Создать набор</button></div>
    ${list.length ? `<div class="sets my-sets">${list.map(s => {
      const have = s.words.filter(w => G.hasWord(w));
      const learned = have.filter(w => S().words[w]?.srs).length;
      return `<a class="set-card mine" href="#myset-${s.id}"><b>${esc(s.title)}</b><span>${have.length} ${plural(have.length, 'слово', 'слова', 'слов')}</span><i class="bar"><i style="width:${have.length ? Math.round((learned / have.length) * 100) : 0}%"></i></i><em>изучено ${learned} из ${have.length}</em></a>`;
    }).join('')}</div>` : '<p class="muted">Своих наборов пока нет. Создайте набор и добавьте в него слова из словаря.</p>'}
    ${L().id === 'en' ? `<a class="action verbs-link" href="#verbs">${icon('grammar')}<div><b>Неправильные глаголы</b><span>Справочник из 112 глаголов с озвучкой и тренировка трёх форм</span></div></a>` : ''}
    <h2 class="sets-h">Готовые наборы</h2>`;
}
export function bindMySets() {
  $('#new-set') && ($('#new-set').onclick = () => createSet(id => { location.hash = 'myset-' + id; }));
}

// Кнопка «Тренировать только этот набор» на странице набора
export function focusButton(f) {
  const on = G.focusInfo()?.id === f;
  return `<button class="btn ${on ? 'ghost' : ''}" data-focus="${esc(f)}">${icon('train')} ${on ? 'Тренируем этот набор' : 'Тренировать только его'}</button>`;
}
export function bindFocusButton(root = document) {
  $$('[data-focus]', root).forEach(b => b.onclick = () => {
    if (G.focusInfo()?.id === b.dataset.focus) { location.hash = 'train'; return; }
    G.setFocus(b.dataset.focus); toast('Тренировки — только по этому набору'); location.hash = 'train';
  });
}

// Переключатель на странице «Тренировки»
export function focusBar() {
  const f = G.focusInfo();
  const own = Object.values(sets()).filter(s => s.words.some(w => G.hasWord(w)));
  const builtin = Object.entries(L().SET_INFO).map(([id, s]) => [id, s, (L().SETS[id] || []).filter(w => G.hasWord(w)).length]).filter(x => x[2]);
  return `<div class="focus-bar ${f ? 'on' : ''}">
    <label>${icon('sets')}<span>Тренировать:</span>
    <select id="focus" aria-label="Какие слова тренировать">
      <option value="">все слова словаря (${G.allWords().length})</option>
      ${own.length ? `<optgroup label="Мои наборы">${own.map(s => `<option value="my:${s.id}" ${f?.id === 'my:' + s.id ? 'selected' : ''}>${esc(s.title)} (${s.words.filter(w => G.hasWord(w)).length})</option>`).join('')}</optgroup>` : ''}
      ${builtin.length ? `<optgroup label="Готовые наборы">${builtin.map(([id, s, n]) => `<option value="set:${id}" ${f?.id === 'set:' + id ? 'selected' : ''}>${esc(s.title)} (${n})</option>`).join('')}</optgroup>` : ''}
    </select></label>
    ${f ? `<button class="link" id="focus-off">показать все слова</button>` : ''}
  </div>`;
}
export function bindFocusBar(redraw) {
  $('#focus').onchange = e => { G.setFocus(e.target.value); redraw(); };
  $('#focus-off') && ($('#focus-off').onclick = () => { G.setFocus(null); redraw(); });
}

// Страница своего набора
export function renderMySet(main, id) {
  const set = sets()[id]; if (!set) { location.hash = 'sets'; return; }
  let q = '', adding = false;
  const draw = () => {
    set.words = set.words.filter(w => G.hasWord(w)); // удалённые из словаря слова уходят и из набора
    const inSet = new Set(set.words);
    const ql = lower(q.trim());
    const cand = G.allWords().filter(w => !inSet.has(w.w) && (!ql || w.w.includes(ql) || lower(w.t).includes(ql))).sort((a, b) => b.added - a.added).slice(0, 60);
    main.innerHTML = `
    <section class="band">
      <a class="back" href="#sets">${icon('back')} Все наборы</a>
      <div class="head-row"><h1>${esc(set.title)}</h1><div class="row gap">${set.words.length ? focusButton('my:' + id) : ''}<button class="btn ghost small" id="ren">Переименовать</button><button class="btn ghost small danger" id="del">Удалить набор</button></div></div>
      <p class="muted">${set.words.length} ${plural(set.words.length, 'слово', 'слова', 'слов')} · слова остаются в общем словаре, набор только группирует их</p>
      <ul class="set-words">${set.words.map(k => { const w = S().words[k]; return `<li data-w="${esc(k)}" class="have">
        <button class="icon-btn say" aria-label="Произнести">${icon('sound')}</button>
        <div><b>${esc(k)}</b><span>${esc(w.t)} · ${G.STATUS_LABEL[G.wordStatus(w)]}</span></div>
        <button class="icon-btn rm" aria-label="Убрать из набора" title="Убрать из набора">${icon('x')}</button></li>`; }).join('') || '<li class="empty">В наборе пока нет слов — добавьте их из словаря ниже.</li>'}</ul>
      <h2 class="sets-h">Добавить из словаря</h2>
      <div class="toolbar"><label class="search">${icon('search')}<input id="q" placeholder="Поиск по словарю" value="${esc(q)}" aria-label="Поиск по словарю"></label>
        ${cand.length ? `<button class="btn ghost small" id="all">${icon('plus')} Добавить ${ql ? 'найденные' : 'показанные'} (${cand.length})</button>` : ''}</div>
      <ul class="set-words cand">${cand.map(w => `<li data-w="${esc(w.w)}"><button class="icon-btn say" aria-label="Произнести">${icon('sound')}</button><div><b>${esc(w.w)}</b><span>${esc(w.t)}</span></div><button class="icon-btn add" aria-label="Добавить в набор">${icon('plus')}</button></li>`).join('') || `<li class="empty">${G.allWords().length ? 'Все подходящие слова уже в наборе.' : 'Словарь пуст: добавьте слова в разделе «Словарь» или из текстов.'}</li>`}</ul>
    </section>`;
    bindFocusButton(main);
    const inp = $('#q');
    inp.oninput = () => { q = inp.value; const pos = inp.selectionStart; draw(); const n = $('#q'); n.focus(); n.setSelectionRange(pos, pos); };
    $('#all') && ($('#all').onclick = () => { set.words.push(...cand.map(w => w.w)); store.save(); toast(`Добавлено ${cand.length}`); draw(); });
    main.querySelectorAll('.set-words').forEach(ul => ul.onclick = e => {
      const li = e.target.closest('[data-w]'); if (!li) return;
      const k = li.dataset.w;
      if (e.target.closest('.say')) return speak(k, S().rate);
      if (e.target.closest('.rm')) { set.words = set.words.filter(x => x !== k); store.save(); draw(); }
      if (e.target.closest('.add')) { set.words.push(k); store.save(); draw(); }
    });
    $('#ren').onclick = () => modal(`<h2>Переименовать набор</h2><form id="rn" class="mat-form"><input name="title" maxlength="40" value="${esc(set.title)}" required><div class="row gap"><button class="btn">Сохранить</button><button class="btn ghost" type="button" data-close>Отмена</button></div></form>`,
      (el, close) => { $('#rn', el).onsubmit = e => { e.preventDefault(); set.title = e.target.title.value.trim().slice(0, 40) || set.title; store.save(); close(); draw(); }; });
    $('#del').onclick = () => modal(`<h2>Удалить набор «${esc(set.title)}»?</h2><p>Слова останутся в словаре, исчезнет только группировка.</p><div class="row gap"><button class="btn danger" id="yes">Удалить</button><button class="btn ghost" data-close>Отмена</button></div>`,
      (el, close) => { $('#yes', el).onclick = () => { delete sets()[id]; if (G.focusInfo() === null) G.setFocus(null); store.save(); close(); location.hash = 'sets'; }; });
  };
  draw();
}
