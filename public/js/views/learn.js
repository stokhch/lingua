// Тексты с переводом по клику и грамматические курсы.
import { store } from '../store.js';
import { esc, $, $$, icon, toast } from '../ui.js';
import * as G from '../game.js';
import { speak } from '../speech.js';
import { translateWord, translateSentence } from '../translate.js';
import { examRow } from './exam.js';
import { L, lower, splitRe, keysBar, fold } from '../lang.js';
import { myLevel } from './placement.js';
import { levelRank } from '../placement.js';
import { KINDS, wordTotal, newWordCount, youtubeId } from '../materials.js';
import { openMaterialEditor, deleteMaterial } from './materials.js';
import * as D from '../grammar-drill.js';
import { grammarCards, grammarState } from './grammar-train.js';

// Словоформы из упражнений → уроки (для подсказок в текстах), строится один раз на язык
const ruleCache = {};
const rules = () => (ruleCache[L().id] ||= D.ruleIndex(L().ALL_LESSONS, L().letters, L().lower));
const lessonById = id => L().ALL_LESSONS.find(l => l.id === id);

const F = { tab: 'all', level: 'all', kind: 'all', status: 'all', topic: 'all', sort: 'level' };
let lessonKey = null;

// Все тексты текущего языка: встроенная библиотека + свои материалы ученика
export const allTexts = () => [...L().TEXTS.map(t => ({ ...t, kind: t.kind || 'text' })), ...Object.values(store.state.materials || {}).map(m => ({ ...m, own: true }))];
const textStatus = id => store.state.readTexts[id] ? 'done' : store.state.openedTexts?.[id] ? 'reading' : 'new';

export function renderTexts(main) {
  const s = store.state, { lemma, tokenRe } = L();
  const has = k => !!s.words[k];
  const draw = () => {
    const all = allTexts();
    const levels = [...new Set(all.map(t => t.level))].sort((a, b) => levelRank(a) - levelRank(b));
    const topics = [...new Set(all.map(t => t.topic).filter(Boolean))].sort();
    const kinds = [...new Set(all.map(t => t.kind))];
    if (F.level !== 'all' && !levels.includes(F.level)) F.level = 'all';
    if (F.topic !== 'all' && !topics.includes(F.topic)) F.topic = 'all';
    const stats = new Map(all.map(t => [t.id, { n: wordTotal(t.body, tokenRe), fresh: newWordCount(t.body, tokenRe, lemma, has) }]));
    let list = all.filter(t => (F.tab === 'all' || (F.tab === 'own') === !!t.own)
      && (F.level === 'all' || t.level === F.level) && (F.kind === 'all' || t.kind === F.kind)
      && (F.topic === 'all' || t.topic === F.topic) && (F.status === 'all' || textStatus(t.id) === F.status));
    const share = t => stats.get(t.id).fresh / Math.max(1, stats.get(t.id).n);
    const sorters = {
      level: (a, b) => levelRank(a.level) - levelRank(b.level),
      fresh: (a, b) => share(a) - share(b),
      recent: (a, b) => (b.added || 0) - (a.added || 0),
      short: (a, b) => stats.get(a.id).n - stats.get(b.id).n
    };
    list = [...list].sort(sorters[F.sort] || sorters.level);
    const own = Object.keys(s.materials || {}).length;
    const sel = (key, opts) => `<select data-f="${key}" aria-label="Фильтр">${opts.map(([v, t]) => `<option value="${esc(v)}" ${F[key] === v ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select>`;
    main.innerHTML = `
    <section class="band">
      <div class="toolbar"><h1>Тексты и материалы</h1><button class="btn" id="add-mat">${icon('plus')} Свой материал</button></div>
      <p class="lead">${L().name}: читайте и нажимайте на незнакомые слова: появится перевод, а слово можно сразу отправить в словарь вместе с предложением. Добавляйте свои тексты, песни и субтитры к видео — они станут такими же интерактивными. А на других сайтах слова поможет собирать <a href="#extension">расширение для браузера</a>.</p>
      <div class="chips">${[['all', 'Все'], ['lib', 'Библиотека'], ['own', `Мои материалы · ${own}`]].map(([k, t]) => `<button class="chip ${F.tab === k ? 'on' : ''}" data-tab="${k}">${t}</button>`).join('')}</div>
      <div class="filters">
        ${sel('level', [['all', 'Все уровни'], ...levels.map(l => [l, l + (l === myLevel() ? ' · ваш' : '')])])}
        ${sel('kind', [['all', 'Любой формат'], ...kinds.map(k => [k, KINDS[k] || k])])}
        ${sel('topic', [['all', 'Все темы'], ...topics.map(t => [t, t])])}
        ${sel('status', [['all', 'Любой статус'], ['new', 'Не начаты'], ['reading', 'Читаю'], ['done', 'Прочитаны']])}
        ${sel('sort', [['level', 'Сначала проще'], ['fresh', 'Меньше новых слов'], ['short', 'Сначала короткие'], ['recent', 'Недавно добавленные']])}
      </div>
      <div class="texts">${list.map(t => {
        const st = stats.get(t.id), words = st.n, status = textStatus(t.id);
        return `<a class="text-card lv-${t.level}" href="#read-${t.id}"><span class="lv">${t.level}</span><b>${esc(t.title)}</b><span>${t.kind !== 'text' ? `${KINDS[t.kind] || ''} · ` : ''}${esc(t.topic || 'Без темы')} · ${words} слов · ~${Math.max(1, Math.round(words / 120))} мин</span><span class="fresh">${st.fresh ? `новых для вас слов: ${st.fresh}` : 'все слова уже в словаре'}</span>${status === 'done' ? `<em>${icon('check')} прочитано</em>` : status === 'reading' ? '<em class="reading">читаю</em>' : t.level === myLevel() ? '<em class="for-you">ваш уровень</em>' : ''}${t.own ? '<i class="own-tag">моё</i>' : ''}<p>${esc(t.body.slice(0, 110))}…</p></a>`;
      }).join('') || `<div class="empty"><p>${F.tab === 'own' && !own ? 'Своих материалов пока нет. Вставьте текст статьи, песни или субтитры — и читайте с переводом по клику.' : 'Ничего не найдено — попробуйте другие фильтры.'}</p>${F.tab === 'own' && !own ? '<button class="btn" id="add-mat2">Добавить материал</button>' : ''}</div>`}</div>
    </section>`;
    $$('[data-tab]').forEach(b => b.onclick = () => { F.tab = b.dataset.tab; draw(); });
    $$('[data-f]').forEach(x => x.onchange = () => { F[x.dataset.f] = x.value; draw(); });
    const add = () => openMaterialEditor(null, m => { location.hash = 'read-' + m.id; });
    $('#add-mat').onclick = add;
    $('#add-mat2') && ($('#add-mat2').onclick = add);
  };
  draw();
}

export function renderReader(main, id) {
  const { lemma } = L();
  const t = allTexts().find(x => x.id === id); if (!t) { location.hash = 'texts'; return; }
  if (!store.state.readTexts[t.id] && !store.state.openedTexts?.[t.id]) { (store.state.openedTexts ||= {})[t.id] = Date.now(); store.save(); }
  const vid = youtubeId(t.video);
  const src = /^https?:[/][/]/.test(t.source || '') ? t.source : '';
  const wordRe = splitRe();
  const paras = t.body.split(/\n\s*\n/);
  const tokenized = paras.map((p, pi) => {
    // делим на предложения, затем на слова, сохраняя пунктуацию
    return `<p data-p="${pi}">` + p.split(/(?<=[.!?])\s+/).map(sent => `<span class="sent">` +
      sent.split(wordRe).map((part, k) => k % 2 ? `<span class="tk" data-w="${esc(part)}">${esc(part)}</span>` : esc(part)).join('') + '</span>').join(' ') +
      ` <button class="icon-btn say-p" data-p="${pi}" aria-label="Прослушать абзац">${icon('sound')}</button></p>`;
  }).join('');
  main.innerHTML = `
  <section class="band reader-wrap">
    <a class="back" href="#texts">${icon('back')} Все тексты</a>
    <article class="reader">
      <div class="meta"><span class="lv">${t.level}</span> ${t.kind && t.kind !== 'text' ? `${KINDS[t.kind]} · ` : ''}${esc(t.topic || '')}${t.own ? ` · <button class="link" id="edit-mat">изменить</button> · <button class="link danger" id="del-mat">удалить</button>` : ''}</div>
      <h1>${esc(t.title)}</h1>
      ${t.note ? `<p class="text-note">${esc(t.note)}${t.link ? ` <a href="${esc(t.link.href)}" target="_blank" rel="noopener">${esc(t.link.label)}</a>` : ''}</p>` : ''}
      ${vid ? `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/${vid}" title="${esc(t.title)}" allow="encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>` : ''}
      ${src ? `<p class="muted small">Источник: <a href="${esc(src)}" target="_blank" rel="noopener nofollow">${esc(src.replace(/^https?:[/][/](www[.])?/, '').slice(0, 60))}</a></p>` : ''}
      <div class="legend"><span class="mine">в словаре</span><span class="known">изучено</span><span>нажмите на слово — перевод слова и всего предложения</span></div>
      ${grammarInText(t.body)}
      <div class="body" id="body">${tokenized}</div>
      <div class="done-row">${store.state.readTexts[t.id] ? `<p class="muted">${icon('check')} Текст прочитан</p>` : '<button class="btn big" id="done">Я прочитал(а) текст · +10 XP</button>'}</div>
    </article>
  </section>`;
  const body = $('#body');
  const paint = () => $$('.tk', body).forEach(el => {
    const w = store.state.words[lemma(el.dataset.w)];
    el.classList.toggle('mine', !!w && !w.srs);
    el.classList.toggle('known', !!w?.srs);
  });
  paint();

  let pop;
  const closePop = () => { pop?.remove(); pop = null; $$('.tk.sel', body).forEach(x => x.classList.remove('sel')); };
  body.onclick = async e => {
    const sp = e.target.closest('.say-p');
    if (sp) return speak(paras[sp.dataset.p], store.state.rate);
    const tk = e.target.closest('.tk'); if (!tk) return;
    closePop();
    tk.classList.add('sel');
    const ctx = tk.closest('.sent').textContent.trim();
    const raw = tk.dataset.w;
    speak(raw, store.state.rate);
    pop = document.createElement('div');
    pop.className = 'pop';
    pop.innerHTML = `<div class="pop-head"><button class="icon-btn say">${icon('sound')}</button><b>${esc(lower(raw))}</b><button class="icon-btn close" aria-label="Закрыть">${icon('x')}</button></div><div class="pop-body muted">Ищем перевод…</div>`;
    document.body.append(pop);
    const r = tk.getBoundingClientRect();
    const place = () => {
      const w = pop.offsetWidth;
      pop.style.left = Math.max(8, Math.min(window.innerWidth - w - 8, r.left + r.width / 2 - w / 2)) + 'px';
      pop.style.top = (r.bottom + window.scrollY + 8) + 'px';
    };
    place();
    $('.close', pop).onclick = closePop;
    $('.say', pop).onclick = () => speak(raw, store.state.rate);
    const myPop = pop;
    const res = await translateWord(raw);
    if (pop !== myPop) return;
    const have = store.state.words[res.word];
    $('.pop-head b', pop).textContent = res.word;
    $('.pop-body', pop).classList.remove('muted');
    $('.pop-body', pop).innerHTML = have
      ? `<p class="tr">${esc(have.t)}</p><p class="muted">${icon('check')} Уже в словаре · ${G.STATUS_LABEL[G.wordStatus(have)]}</p>`
      : `${res.translation ? `<p class="tr">${esc(res.translation)}</p>` : '<p class="muted">Перевода нет во встроенном словаре — впишите свой:</p>'}
         <form class="pop-add"><input name="t" value="${esc(res.translation)}" aria-label="Перевод" ${res.translation ? 'hidden' : 'required'}><button class="btn small">${icon('plus')} В словарь</button>${res.translation ? '<button type="button" class="link edit">изменить</button>' : ''}</form>
         ${res.source === 'online' ? '<p class="muted small">Машинный перевод</p>' : ''}`;
    const rl = ruleLink(raw);
    if (rl) $('.pop-body', pop).insertAdjacentHTML('beforeend', rl);
    const sb = document.createElement('div');
    sb.className = 'pop-sent';
    sb.innerHTML = `<button class="link" type="button">Перевести всё предложение</button>`;
    pop.append(sb);
    $('button', sb).onclick = async () => {
      sb.innerHTML = '<p class="muted small">Переводим…</p>';
      const tr = await translateSentence(ctx);
      if (pop !== myPop) return;
      sb.innerHTML = tr ? `<p class="sent-tr">${esc(tr)}</p><p class="muted small">Машинный перевод предложения</p>` : `<p class="muted small">${store.serverAvailable ? 'Не удалось перевести — попробуйте позже.' : 'Перевод предложений работает, когда сайт открыт через сервер Лингвы.'}</p>`;
      place();
    };
    place();
    const form = $('.pop-add', pop);
    if (form) {
      $('.edit', form) && ($('.edit', form).onclick = () => { form.t.hidden = false; form.t.focus(); });
      form.onsubmit = ev => {
        ev.preventDefault();
        if (G.addWord(res.word, form.t.value, ctx, t.title)) { G.addXp(1); toast(`«${res.word}» добавлено в словарь`); paint(); closePop(); }
      };
    }
  };
  $('#edit-mat') && ($('#edit-mat').onclick = () => openMaterialEditor(store.state.materials[t.id], () => renderReader(main, t.id)));
  $('#del-mat') && ($('#del-mat').onclick = () => deleteMaterial(t.id, () => { location.hash = 'texts'; }));
  const outside = e => { if (pop && !e.composedPath().includes(pop) && !e.target.closest('.tk')) closePop(); };
  document.addEventListener('click', outside);
  $('#done') && ($('#done').onclick = () => {
    store.state.readTexts[t.id] = Date.now(); G.addXp(10, 'текст прочитан');
    $('.done-row').innerHTML = `<p class="muted">${icon('check')} Текст прочитан</p>`;
  });
  return () => { closePop(); document.removeEventListener('click', outside); };
}

// Правила из уроков, которые встречаются в тексте
function grammarInText(body) {
  const found = D.rulesInText(body, rules(), L().tokenRe, L().lower).map(r => ({ ...r, l: lessonById(r.id) })).filter(r => r.l);
  if (!found.length) return '';
  const g = store.state.grammar;
  return `<div class="g-in-text"><span class="muted small">${icon('grammar')} Грамматика в тексте:</span>${found.map(r => `<a class="g-chip ${g[r.id]?.passed ? 'passed' : ''}" href="#lesson-${r.id}" title="Примеры: ${esc(r.words.join(', '))}"><b>${esc(r.l.title)}</b> <span>${esc(r.words.slice(0, 3).join(', '))}</span></a>`).join('')}</div>`;
}
// Ссылка на правило для слова в окне перевода
function ruleLink(word) {
  const id = rules().get(lower(word))?.[0], l = id && lessonById(id);
  return l ? `<p class="pop-rule">${icon('grammar')} Правило: <a href="#lesson-${l.id}">${esc(l.title)}</a></p>` : '';
}

// ---------- Грамматика ----------
export function renderGrammar(main) {
  const { COURSES } = L(), { g } = grammarState(), now = Date.now();
  const due = l => g[l.id]?.srs && g[l.id].srs.due <= now;
  main.innerHTML = `
  <section class="band">
    <h1>Грамматика</h1>
    <p class="lead">${L().name}: короткие уроки: объяснение по-русски и упражнения с проверкой. Урок засчитывается, если верно выполнено не меньше 70% заданий. В конце каждого курса — итоговый тест с оценкой и сертификатом.</p>
    <h2 class="sub">Практика</h2>
    <p class="muted">Пройденные уроки возвращаются на повторение через день, три дня, неделю, месяц — как слова в карточках. Задания берутся из упражнений уроков.</p>
    ${grammarCards()}
    <h2 class="sub">Уроки</h2>
    <div class="courses">${COURSES.map(c => {
      const done = c.lessons.filter(l => g[l.id]?.passed).length;
      return `<div class="course"><div class="course-head"><span class="lv">${c.level}</span><h2>${esc(c.title)}</h2><span class="muted">${done} из ${c.lessons.length}</span></div>
        <i class="bar"><i style="width:${(done / c.lessons.length) * 100}%"></i></i>
        <ol class="lessons">${c.lessons.map(l => `<li><a href="#lesson-${l.id}" class="${g[l.id]?.passed ? 'passed' : ''}">${g[l.id]?.passed ? icon('check') : '<i class="dot"></i>'}<span>${esc(l.title)}</span>${due(l) ? `<em class="due" title="Правило пора повторить">↻</em>` : ''}${g[l.id] ? `<em>${g[l.id].best}%</em>` : ''}</a></li>`).join('')}</ol>${examRow(c)}</div>`;
    }).join('')}</div>
  </section>`;
}

const norm = s => lower(s).replace(/[’`]/g, "'").replace(/\s+/g, ' ').trim();

export function renderLesson(main, id) {
  const { ALL_LESSONS } = L();
  const lesson = ALL_LESSONS.find(l => l.id === id); if (!lesson) { location.hash = 'grammar'; return; }
  const idx = ALL_LESSONS.indexOf(lesson), nextL = ALL_LESSONS[idx + 1];
  main.innerHTML = `
  <section class="band narrow">
    <a class="back" href="#grammar">${icon('back')} Все уроки</a>
    <h1>${esc(lesson.title)}</h1>
    <div class="theory">${lesson.theory}</div>
    <div class="row gap"><button class="btn big" id="go">Перейти к упражнениям</button>${store.state.grammar[lesson.id] ? `<a class="btn ghost" href="#gtrain-mix.${lesson.id}">Тренировать правило</a>` : ''}</div>
    <div id="ex"></div>
  </section>`;
  $('#go').onclick = () => { $('#go').parentElement.remove(); run(); };

  function run() {
    let i = 0, right = 0;
    const box = $('#ex');
    const step = () => {
      if (i >= lesson.exercises.length) return done();
      const ex = lesson.exercises[i];
      const q = esc(ex.q).replace('___', '<span class="gap-fill">___</span>');
      box.innerHTML = `<div class="exercise"><div class="ex-top"><span class="muted">Задание ${i + 1} из ${lesson.exercises.length}</span></div><p class="q">${q}</p>
        ${ex.type === 'choice' ? `<div class="opts row-opts">${ex.options.map((o, k) => `<button class="opt" data-v="${esc(o)}"><i>${k + 1}</i>${esc(o)}</button>`).join('')}</div>`
          : `<form class="type-form"><input id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Ответ"><button class="btn">Проверить</button></form>${keysBar()}`}
        <div id="fb"></div></div>`;
      box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      const check = val => {
        const answers = ex.a.split('/').map(norm);
        const exact = answers.includes(norm(val));
        // без ударений / диакритики — засчитываем, но показываем правильное написание
        const close = !exact && ex.type !== 'choice' && answers.some(a => fold(a) === fold(norm(val)));
        const ok = exact || close;
        if (ok) right++;
        G.recordAnswer(ok);
        $$('.opt', box).forEach(b => { b.disabled = true; if (norm(b.dataset.v) === norm(ex.a)) b.classList.add('right'); else if (b.dataset.v === val) b.classList.add('wrong'); });
        $('#ans') && ($('#ans').disabled = true);
        const gap = $('.gap-fill', box); // в вопросе без пропуска «___» подставлять нечего
        if (gap) { gap.textContent = ex.a.split('/')[0]; gap.classList.add(ok ? 'ok' : 'bad'); }
        $('#fb').innerHTML = `<div class="feedback ${ok ? 'ok' : 'bad'}">${icon(ok ? 'check' : 'x')}<div>${close ? `Засчитано! Пишется так: <b>${esc(ex.a.split('/')[0])}</b>` : ok ? 'Верно!' : `Правильный ответ: <b>${esc(ex.a.split('/')[0])}</b>`}</div><button class="btn" id="next">Дальше</button></div>`;
        $('#next').focus();
        $('#next').onclick = () => { i++; step(); };
      };
      if (ex.type === 'choice') $('.opts', box).onclick = e => { const b = e.target.closest('.opt'); if (b && !b.disabled) check(b.dataset.v); };
      else { $('#ans').focus(); $('.type-form', box).onsubmit = e => { e.preventDefault(); if ($('#ans').value.trim() && !$('#ans').disabled) check($('#ans').value); }; }
    };
    const done = () => {
      const pct = Math.round((right / lesson.exercises.length) * 100);
      const prev = store.state.grammar[lesson.id];
      const passed = pct >= 70;
      store.state.grammar[lesson.id] = { ...prev, best: Math.max(pct, prev?.best || 0), passed: passed || !!prev?.passed, at: Date.now() };
      D.lessonDone(store.state.grammar, lesson.id, right, lesson.exercises.length);
      G.addXp(right + (passed && !prev?.passed ? 15 : 0), passed && !prev?.passed ? 'урок пройден' : 'упражнения');
      box.innerHTML = `<div class="exercise result"><h2>${passed ? 'Урок пройден' : 'Почти получилось'}</h2><p class="lead">${right} из ${lesson.exercises.length} верно (${pct}%)</p>
        <div class="row gap"><button class="btn ${passed ? 'ghost' : ''}" id="retry">Пройти ещё раз</button>${nextL ? `<a class="btn ${passed ? '' : 'ghost'}" href="#lesson-${nextL.id}">Следующий урок</a>` : ''}<a class="btn ghost" href="#gtrain-mix.${lesson.id}">Закрепить в тренировке</a><a class="btn ghost" href="#grammar">К списку</a></div>${passed && !prev?.passed ? '<p class="muted small">Правило вернётся на повторение завтра — в «Тренировках» и на главной.</p>' : ''}</div>`;
      $('#retry').onclick = () => run();
    };
    step();
    document.removeEventListener('keydown', lessonKey);
    const onKey = lessonKey = e => {
      if (!box.isConnected) return document.removeEventListener('keydown', onKey);
      if (e.target.matches('input')) return;
      const n = Number(e.key); const opts = $$('.opt:not([disabled])', box);
      if (n >= 1 && n <= opts.length) opts[n - 1].click();
    };
    document.addEventListener('keydown', onKey);
  }
}
