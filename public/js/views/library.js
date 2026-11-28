// Библиотека материалов: полки (тексты для чтения, диалоги, разговорник, сказки, мудрость, культура, песни, мои),
// поиск по всем материалам и страница полки с фильтрами по уровню, формату, теме и статусу.
import { store } from '../store.js';
import { esc, $, $$, icon, plural } from '../ui.js';
import { L } from '../lang.js';
import { myLevel } from './placement.js';
import { levelRank } from '../placement.js';
import { KINDS, SHELVES, shelfOf, formatOf, wordTotal, newWordCount } from '../materials.js';
import { openMaterialEditor } from './materials.js';
import { textArt } from '../text-art.js';
import { VIDEO_KINDS, VIDEO_GROUPS } from '../data/video-kinds.js';

const ROW = 8; // карточек в ряду полки на главной странице библиотеки
// Полки, которые на главной странице показываются целиком, без кнопки «Все N»
const FULL_SHELVES = new Set(['songs']);
// В ряду полки: до ROW непрочитанных, а прочитанные не прячутся — идут следом серыми карточками
const rowOf = sh => {
  const all = byRelevance(sh.items);
  if (FULL_SHELVES.has(sh.id)) return all;
  const done = t => textStatus(t.id) === 'done';
  return [...all.filter(t => !done(t)).slice(0, ROW), ...all.filter(done)];
};
const F = { level: 'all', kind: 'all', status: 'all', topic: 'all', sort: 'level' };
const queries = {}; // поиск запоминается для каждого языка отдельно

// Все тексты текущего языка: встроенная библиотека + свои материалы ученика (с полкой и форматом)
export const allTexts = () => [
  ...L().TEXTS.map(t => ({ ...t })),
  ...Object.values(store.state.materials || {}).map(m => ({ ...m, own: true }))
].map(t => ({ ...t, kind: formatOf(t), shelf: shelfOf(t) }));
export const textStatus = id => store.state.readTexts[id] ? 'done' : store.state.openedTexts?.[id] ? 'reading' : 'new';

// Полезные внешние ресурсы по языку (если они заданы в данных языка)
const resourcesHtml = lang => `
    <section class="band resources" id="resources">
      <h2>Полезные ресурсы</h2>
      <p class="muted">Внешние сайты для изучающих ${esc(lang.acc)}: уроки, словари, книги, новости.</p>
      ${lang.RESOURCES.map(g => `<h3>${esc(g.group)}</h3><ul class="res-list">${g.items.map(r => `<li><a href="${esc(r.href)}" target="_blank" rel="noopener">${esc(r.title)}</a><span>${esc(r.desc)}</span></li>`).join('')}</ul>`).join('')}
    </section>`;

// Видеоматериалы: фильмы и мультфильмы с озвучкой на изучаемом языке (если они заданы в данных языка)
const videoKind = {}; // выбранный фильтр по типу, для каждого языка отдельно
const videoCard = v => `<a class="video-card vk-${v.kind} lv-${v.level}" href="${esc(v.href)}" target="_blank" rel="noopener">
      <span class="video-poster" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>
      <span class="video-meta"><span class="lv">${esc(v.level)}</span><span class="video-kind">${esc(VIDEO_KINDS[v.kind] || v.kind)}</span></span>
      <b>${esc(v.title)}</b>${v.ru ? `<span class="video-ru">${esc(v.ru)}</span>` : ''}
      <p>${esc(v.desc)}</p>
      <span class="video-foot">${v.studio ? `Озвучка: ${esc(v.studio)}` : esc(v.where || 'Смотреть')} ↗</span>
    </a>`;
const videosHtml = lang => {
  const sel = videoKind[lang.id] || 'all';
  const kinds = Object.keys(VIDEO_KINDS).filter(k => lang.VIDEOS.some(v => v.kind === k));
  const list = lang.VIDEOS.filter(v => sel === 'all' || v.kind === sel);
  const count = k => lang.VIDEOS.filter(v => v.kind === k).length;
  return `
    <section class="band videos" id="videos">
      <h2>Видеоматериалы</h2>
      <p class="muted">${esc(lang.VIDEO_INTRO || `Фильмы, сериалы и мультфильмы на ${lang.prep}.`)} Ссылки открываются на внешних сайтах.</p>
      <div class="video-filter" role="group" aria-label="Тип видео">
        <button class="chip${sel === 'all' ? ' on' : ''}" data-vk="all" aria-pressed="${sel === 'all'}">Все <i>${lang.VIDEOS.length}</i></button>
        ${kinds.map(k => `<button class="chip${sel === k ? ' on' : ''}" data-vk="${k}" aria-pressed="${sel === k}">${esc(VIDEO_GROUPS[k])} <i>${count(k)}</i></button>`).join('')}
      </div>
      <div class="video-grid">${list.map(videoCard).join('')}</div>
      ${lang.VIDEO_CATALOGS?.length ? `<h3>Где найти ещё</h3><ul class="res-list">${lang.VIDEO_CATALOGS.map(r => `<li><a href="${esc(r.href)}" target="_blank" rel="noopener">${esc(r.title)}</a><span>${esc(r.desc)}</span></li>`).join('')}</ul>` : ''}
    </section>`;
};

// Литература: самые известные произведения языка — цитата в оригинале, перевод, пояснения и ссылки
const bookCard = (b, lang) => `<article class="book-card">
      <span class="book-meta"><span class="book-genre">${esc(b.genre)}</span><span>${esc(b.year)}</span></span>
      <b lang="${lang}">${esc(b.title)}</b>${b.ru && b.ru !== b.title ? `<span class="book-ru">${esc(b.ru)}</span>` : ''}
      <span class="book-author">${esc(b.author)}</span>
      <p>${esc(b.desc)}</p>
      <blockquote><q lang="${lang}">${esc(b.quote)}</q><span>${esc(b.quoteRu)}</span></blockquote>
      <p class="book-note">${esc(b.note)}</p>
      ${b.words?.length ? `<dl class="book-words">${b.words.map(([w, t]) => `<div><dt lang="${lang}">${esc(w)}</dt><dd>${esc(t)}</dd></div>`).join('')}</dl>` : ''}
      <span class="book-links">${b.links.map(l => `<a href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.title)} ↗</a>`).join('')}</span>
    </article>`;
const booksHtml = lang => `
    <section class="band books" id="books">
      <h2>Литература</h2>
      <p class="muted">${esc(lang.BOOKS_INTRO || `Известные произведения на ${lang.prep}.`)} Ссылки открываются на внешних сайтах.</p>
      <div class="book-grid">${lang.BOOKS.map(b => bookCard(b, lang.id)).join('')}</div>
    </section>`;

function statsFor(list) {
  const s = store.state, { lemma, tokenRe } = L();
  const has = k => !!s.words[k];
  return new Map(list.map(t => [t.id, { n: wordTotal(t.body, tokenRe), fresh: newWordCount(t.body, tokenRe, lemma, has) }]));
}

function card(t, st) {
  const status = textStatus(t.id), words = st.n;
  return `<a class="text-card lv-${t.level}${status === 'done' ? ' done' : ''}" href="#read-${t.id}"${status === 'done' ? ' title="Прочитано — можно перечитать"' : ''}>${textArt(t, 'thumb')}<span class="lv">${t.level}</span><b>${esc(t.title)}</b><span>${t.kind !== 'text' ? `${KINDS[t.kind] || ''} · ` : ''}${esc(t.topic || 'Без темы')} · ${words} слов · ~${Math.max(1, Math.round(words / 120))} мин</span><span class="fresh">${st.fresh ? `новых для вас слов: ${st.fresh}` : 'все слова уже в словаре'}</span>${status === 'done' ? `<em>${icon('check')} прочитано</em>` : status === 'reading' ? '<em class="reading">читаю</em>' : t.level === myLevel() ? '<em class="for-you">ваш уровень</em>' : ''}${t.own ? '<i class="own-tag">моё</i>' : ''}<p>${esc(t.body.slice(0, 110))}…</p></a>`;
}

// Порядок на полке по умолчанию: сначала не прочитанные, ближе к уровню ученика, затем проще
function byRelevance(list) {
  const mine = myLevel() ? levelRank(myLevel()) : null;
  const st = t => ({ reading: 0, new: 1, done: 2 })[textStatus(t.id)];
  return [...list].sort((a, b) => st(a) - st(b)
    || (mine === null ? 0 : Math.abs(levelRank(a.level) - mine) - Math.abs(levelRank(b.level) - mine))
    || levelRank(a.level) - levelRank(b.level));
}

const addMaterial = () => openMaterialEditor(null, m => { location.hash = 'read-' + m.id; });

// ---------- главная страница библиотеки: полки ----------
export function renderTexts(main) {
  const draw = () => {
    const all = allTexts();
    const query = queries[L().id] || '';
    const q = query.trim().toLowerCase();
    const shelves = SHELVES.map(sh => ({ ...sh, items: all.filter(t => t.shelf === sh.id) })).filter(sh => sh.items.length || sh.id === 'own');
    const found = q ? all.filter(t => [t.title, t.topic, t.body].some(x => String(x || '').toLowerCase().includes(q))) : null;
    const stats = statsFor(found || shelves.flatMap(rowOf));
    const done = all.filter(t => textStatus(t.id) === 'done').length;
    main.innerHTML = `
    <section class="band lib-head">
      <div class="toolbar"><h1>Тексты и материалы</h1><button class="btn" id="add-mat">${icon('plus')} Свой материал</button></div>
      <p class="lead">${L().name}: ${all.length} ${plural(all.length, 'материал', 'материала', 'материалов')} на ${shelves.filter(s => s.items.length).length} ${plural(shelves.filter(s => s.items.length).length, 'полке', 'полках', 'полках')}, прочитано ${done}. Нажимайте на незнакомые слова — появится перевод, а слово можно сразу отправить в словарь вместе с предложением. На других сайтах слова поможет собирать <a href="#extension">расширение для браузера</a>.</p>
      <label class="search lib-search">${icon('search')}<input id="lib-q" placeholder="Поиск по названию, теме и тексту" value="${esc(query)}" aria-label="Поиск по материалам"></label>
      <nav class="shelf-chips" aria-label="Полки">${shelves.map(sh => `<a class="chip" href="#shelf-${sh.id}">${icon(sh.icon)}${esc(sh.title)} <i>${sh.items.length}</i></a>`).join('')}<a class="chip" href="#shelf-all">Все материалы <i>${all.length}</i></a>${L().VIDEOS ? `<button class="chip" id="to-videos">Видеоматериалы <i>${L().VIDEOS.length}</i></button>` : ''}${L().BOOKS ? `<button class="chip" id="to-books">Литература <i>${L().BOOKS.length}</i></button>` : ''}</nav>
    </section>
    ${found ? `<section class="band"><h2>Найдено: ${found.length}</h2><div class="texts">${byRelevance(found).map(t => card(t, stats.get(t.id))).join('') || '<div class="empty"><p>Ничего не найдено.</p></div>'}</div></section>`
      : shelves.map(sh => {
        const items = rowOf(sh);
        const read = sh.items.filter(t => textStatus(t.id) === 'done').length;
        return `<section class="band shelf" id="sh-${sh.id}">
          <div class="shelf-head">${icon(sh.icon)}<div><h2><a href="#shelf-${sh.id}">${esc(sh.title)}</a></h2><p class="muted">${esc(sh.desc)}${sh.items.length ? ` · прочитано ${read} из ${sh.items.length}` : ''}</p></div>${items.length < sh.items.length ? `<a class="btn ghost small" href="#shelf-${sh.id}">Все ${sh.items.length} ${icon('back', 'flip')}</a>` : ''}</div>
          <div class="shelf-row">${items.map(t => card(t, stats.get(t.id))).join('')}${sh.id === 'own' ? `<button class="text-card add-card" id="add-own">${icon('plus')}<b>Добавить свой материал</b><span>Текст статьи, песню, субтитры или видео с YouTube</span></button>` : ''}</div>
        </section>`;
      }).join('')}
    ${!found && L().VIDEOS ? videosHtml(L()) : ''}
    ${!found && L().BOOKS ? booksHtml(L()) : ''}
    ${L().RESOURCES ? resourcesHtml(L()) : ''}`;
    $('#add-mat').onclick = addMaterial;
    $('#to-videos') && ($('#to-videos').onclick = () => $('#videos')?.scrollIntoView({ behavior: 'smooth' }));
    $('#to-books') && ($('#to-books').onclick = () => $('#books')?.scrollIntoView({ behavior: 'smooth' }));
    $$('[data-vk]').forEach(b => b.onclick = () => { videoKind[L().id] = b.dataset.vk; const y = scrollY; draw(); scrollTo(0, y); });
    $('#add-own') && ($('#add-own').onclick = addMaterial);
    const inp = $('#lib-q');
    inp.oninput = () => { queries[L().id] = inp.value; const pos = inp.selectionStart; draw(); const n = $('#lib-q'); n.focus(); n.setSelectionRange(pos, pos); };
  };
  draw();
}

// ---------- страница полки ----------
export function renderShelf(main, id) {
  const shelf = id === 'all' ? { id: 'all', title: 'Все материалы', desc: 'Все полки вместе', icon: 'read' } : SHELVES.find(s => s.id === id);
  if (!shelf) { location.hash = 'texts'; return; }
  const draw = () => {
    const all = allTexts().filter(t => id === 'all' || t.shelf === id);
    const levels = [...new Set(all.map(t => t.level))].sort((a, b) => levelRank(a) - levelRank(b));
    const topics = [...new Set(all.map(t => t.topic).filter(Boolean))].sort();
    const kinds = [...new Set(all.map(t => t.kind))];
    for (const [k, vals] of [['level', levels], ['topic', topics], ['kind', kinds]]) if (F[k] !== 'all' && !vals.includes(F[k])) F[k] = 'all';
    const stats = statsFor(all);
    const share = t => stats.get(t.id).fresh / Math.max(1, stats.get(t.id).n);
    const sorters = {
      level: (a, b) => levelRank(a.level) - levelRank(b.level),
      fresh: (a, b) => share(a) - share(b),
      recent: (a, b) => (b.added || 0) - (a.added || 0),
      short: (a, b) => stats.get(a.id).n - stats.get(b.id).n
    };
    const list = all.filter(t => (F.level === 'all' || t.level === F.level) && (F.kind === 'all' || t.kind === F.kind)
      && (F.topic === 'all' || t.topic === F.topic) && (F.status === 'all' || textStatus(t.id) === F.status)).sort(sorters[F.sort] || sorters.level);
    const sel = (key, opts) => opts.length > 2 || key === 'status' || key === 'sort' ? `<select data-f="${key}" aria-label="Фильтр">${opts.map(([v, t]) => `<option value="${esc(v)}" ${F[key] === v ? 'selected' : ''}>${esc(t)}</option>`).join('')}</select>` : '';
    const read = all.filter(t => textStatus(t.id) === 'done').length;
    main.innerHTML = `
    <section class="band">
      <a class="back" href="#texts">${icon('back')} Все полки</a>
      <div class="toolbar"><h1>${esc(shelf.title)}</h1>${id === 'own' ? `<button class="btn" id="add-mat">${icon('plus')} Свой материал</button>` : ''}</div>
      <p class="lead">${esc(shelf.desc)} · ${all.length} ${plural(all.length, 'материал', 'материала', 'материалов')}, прочитано ${read}</p>
      ${all.length ? `<i class="bar shelf-bar"><i style="width:${Math.round((read / all.length) * 100)}%"></i></i>` : ''}
      <div class="filters">
        ${sel('level', [['all', 'Все уровни'], ...levels.map(l => [l, l + (l === myLevel() ? ' · ваш' : '')])])}
        ${sel('kind', [['all', 'Любой формат'], ...kinds.map(k => [k, KINDS[k] || k])])}
        ${sel('topic', [['all', 'Все темы'], ...topics.map(t => [t, t])])}
        ${sel('status', [['all', 'Любой статус'], ['new', 'Не начаты'], ['reading', 'Читаю'], ['done', 'Прочитаны']])}
        ${sel('sort', [['level', 'Сначала проще'], ['fresh', 'Меньше новых слов'], ['short', 'Сначала короткие'], ['recent', 'Недавно добавленные']])}
      </div>
      <div class="texts">${list.map(t => card(t, stats.get(t.id))).join('') || `<div class="empty"><p>${id === 'own' && !all.length ? 'Своих материалов пока нет. Вставьте текст статьи, песни или субтитры — и читайте с переводом по клику.' : 'Ничего не найдено — попробуйте другие фильтры.'}</p>${id === 'own' && !all.length ? '<button class="btn" id="add-mat2">Добавить материал</button>' : ''}</div>`}</div>
    </section>`;
    $$('[data-f]').forEach(x => x.onchange = () => { F[x.dataset.f] = x.value; draw(); });
    $('#add-mat') && ($('#add-mat').onclick = addMaterial);
    $('#add-mat2') && ($('#add-mat2').onclick = addMaterial);
  };
  draw();
}
