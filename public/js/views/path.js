// «Тропа»: курс языка в виде сказочной дорожки через джунгли с шагами и сундуками.
import { store } from '../store.js';
import { esc, $, $$, icon, plural, toast, modal, mascot } from '../ui.js';
import * as G from '../game.js';
import { L, LANGS, switchLang } from '../lang.js';
import { buildTrail, chunkWords, CHEST_XP } from '../trail.js';
import { sat } from '../pimfx.js';

const ROW = 112, HEAD = 96, PAD = 40;
const TYPE_IC = { words: 'cards', text: 'read', lesson: 'grammar' };
const TYPE_NAME = { words: 'Слова', text: 'Текст', lesson: 'Грамматика' };

export function viewToggle(active) {
  return `<div class="seg view-seg" role="tablist" aria-label="Вид прогресса">
    <a role="tab" href="#progress" aria-selected="${active === 'stats'}">${icon('chart')} Статистика</a>
    <a role="tab" href="#path" aria-selected="${active === 'path'}">${icon('star')} Тропа</a></div>`;
}

// Сундук (оригинальный рисунок). state: locked | ready | open
function chestSvg(state, size = 70) {
  const lid = state === 'open'
    ? `<g class="lid"><path d="M10 26 Q36 2 62 26 L60 14 Q36 -6 12 14Z" fill="#a0612f" stroke="#5b3416" stroke-width="2.5" stroke-linejoin="round"/><path d="M34 2v16M38 2v16" stroke="#f0b52a" stroke-width="4"/></g>
       <g class="loot"><circle cx="26" cy="30" r="7" fill="#e5483a"/><circle cx="38" cy="27" r="7.5" fill="#ef5a3c"/><circle cx="48" cy="31" r="6.5" fill="#e5483a"/><path d="M38 20v-4" stroke="#6b3f22" stroke-width="2" stroke-linecap="round"/><path d="M39 18c2-2 5-2 6-1-2 2-4 2-6 1z" fill="#3aa055"/><circle cx="35" cy="25" r="1.8" fill="#fff" opacity=".8"/></g>`
    : `<path class="lid" d="M8 34 Q8 14 36 14 Q64 14 64 34Z" fill="#a0612f" stroke="#5b3416" stroke-width="2.5" stroke-linejoin="round"/><path d="M8 34 Q8 14 36 14 Q64 14 64 34" fill="none" stroke="#c98a4b" stroke-width="2" transform="translate(0 4) scale(1 .85)" opacity=".5"/><path d="M33 14v20M39 14v20" stroke="#f0b52a" stroke-width="4"/>`;
  return `<svg class="chest-svg ${state}" width="${size}" height="${size}" viewBox="0 0 72 66" aria-hidden="true">
    <ellipse cx="36" cy="62" rx="28" ry="4" fill="rgba(0,0,0,.18)"/>
    <rect x="8" y="32" width="56" height="28" rx="4" fill="#8a4f24" stroke="#5b3416" stroke-width="2.5"/>
    <path d="M8 42h56" stroke="#5b3416" stroke-width="2" opacity=".5"/>
    <path d="M33 32v28M39 32v28" stroke="#f0b52a" stroke-width="4"/>
    ${lid}
    <rect x="30" y="${state === 'open' ? 34 : 30}" width="12" height="12" rx="2.5" fill="#ffd76a" stroke="#8a5d00" stroke-width="2"/>
    ${state === 'locked' ? '<circle cx="36" cy="' + 36 + '" r="2" fill="#5b3416"/>' : ''}
  </svg>`;
}

function ring(p) {
  const R = 44, C = 2 * Math.PI * R;
  return `<svg class="node-ring" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="${R}" class="nr-bg"/><circle cx="50" cy="50" r="${R}" class="nr-fg" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - p)}"/></svg>`;
}

// мелкие украшения вдоль тропы: листья, цветы, грибы, камни
const DECOR = [
  '<svg viewBox="0 0 40 40" width="40" height="40"><path d="M20 38C8 30 6 14 20 2c14 12 12 28 0 36z" fill="#3aa055"/><path d="M20 36V8" stroke="#1f7a3a" stroke-width="2"/></svg>',
  '<svg viewBox="0 0 40 40" width="34" height="34"><g fill="#ffd76a"><circle cx="20" cy="11" r="6"/><circle cx="29" cy="20" r="6"/><circle cx="20" cy="29" r="6"/><circle cx="11" cy="20" r="6"/></g><circle cx="20" cy="20" r="5" fill="#e5483a"/></svg>',
  '<svg viewBox="0 0 40 40" width="34" height="34"><path d="M6 22q14-20 28 0z" fill="#e5483a"/><circle cx="14" cy="17" r="2.5" fill="#fff"/><circle cx="24" cy="14" r="2" fill="#fff"/><rect x="16" y="22" width="8" height="12" rx="3" fill="#fbe4c0"/></svg>',
  '<svg viewBox="0 0 44 30" width="40" height="28"><ellipse cx="22" cy="20" rx="18" ry="9" fill="#9aa08a"/><ellipse cx="18" cy="16" rx="8" ry="4" fill="#b7bda6"/></svg>',
  '<svg viewBox="0 0 48 40" width="44" height="36"><path d="M4 38C10 20 20 10 24 2c4 8 14 18 20 36" fill="none" stroke="#2f9a4c" stroke-width="3"/><g fill="#3aa055"><path d="M10 28l-8-4 9-1z"/><path d="M14 20l-8-5 9 0z"/><path d="M34 20l8-5-9 0z"/><path d="M38 28l8-4-9-1z"/></g></svg>'
];

export function renderPath(main) {
  const s = store.state;
  s.chests ||= {};
  const draw = () => {
    const lang = L();
    const tr = buildTrail(lang, { words: s.words, readTexts: s.readTexts, grammar: s.grammar }, s.chests);
    const pim = sat();
    main.innerHTML = `
    <section class="band path-head">
      <div class="sec-head"><h1>Тропа <span class="muted small-h">· ${esc(lang.name)}</span></h1>${viewToggle('path')}</div>
      <p class="lead">Весь курс — одна сказочная дорожка через джунгли. Проходите шаги: учите порции слов, читайте тексты, проходите уроки. В конце каждой главы ждёт сундук с яблоками для Пима.</p>
      <div class="path-stats">
        <div><b>${tr.done}<small>/${tr.total}</small></b><span>шагов пройдено</span><i class="bar"><i style="width:${tr.total ? (tr.done / tr.total) * 100 : 0}%"></i></i></div>
        <div><b>${tr.chestsOpened}<small>/${tr.chests}</small></b><span>сундуков открыто${tr.chestsReady ? ` · <em>${tr.chestsReady} ждёт!</em>` : ''}</span></div>
        <div class="langs">${Object.values(LANGS).map(l => `<button class="chip ${l.id === lang.id ? 'on' : ''}" data-l="${l.id}">${l.code}</button>`).join('')}</div>
      </div>
      ${tr.current ? `<button class="btn" id="to-current">${icon('star')} К текущему шагу</button>` : ''}
    </section>
    <section class="band trail-band"><div class="trail" id="trail"></div></section>`;

    const box = $('#trail');
    const layout = () => {
      const W = box.clientWidth, amp = Math.min(130, W / 2 - 70);
      let y = PAD, i = 0, html = '', pts = [], curPt = null, deco = 0;
      for (const ch of tr.chapters) {
        html += `<div class="sign" style="top:${y}px"><span>Глава ${ch.n}</span><b>${esc(ch.title)}</b></div>`;
        y += HEAD;
        for (const it of ch.items) {
          const x = Math.round(W / 2 + Math.sin(i * 0.9) * amp), cy = y + ROW / 2;
          pts.push([x, cy, it.type === 'chest' ? (it.opened || it.ready) : it.done]);
          if (it.type === 'chest') {
            const st = it.opened ? 'open' : it.ready ? 'ready' : 'locked';
            html += `<button class="chest ${st}" style="left:${x}px;top:${cy}px" data-chest="${it.id}" aria-label="Сундук: ${st === 'open' ? 'открыт' : st === 'ready' ? 'можно открыть' : 'закрыт'}">${chestSvg(st, 88)}</button>`;
          } else {
            const st = it.done ? 'done' : it.current ? 'current' : it.progress > 0 ? 'started' : 'todo';
            if (it.current) curPt = [x, cy];
            html += `<button class="node ${st} t-${it.type}" style="left:${x}px;top:${cy}px" data-node="${esc(it.id)}">
              ${st === 'current' || st === 'started' ? ring(it.progress) : ''}<span class="disc">${icon(it.done ? 'check' : TYPE_IC[it.type])}</span>
              <span class="lbl">${esc(it.title)}</span>${it.current ? '<span class="start">Начать</span>' : ''}</button>`;
          }
          // украшение с противоположной от тропы стороны
          if (i % 2 === 0) {
            const side = Math.sin(i * 0.9) > 0 ? -1 : 1;
            html += `<span class="deco" style="left:${Math.round(W / 2 + side * (amp + 40) - 20)}px;top:${cy - 18}px">${DECOR[deco++ % DECOR.length]}</span>`;
          }
          y += ROW; i++;
        }
      }
      y += PAD;
      // тропа: плавная кривая через центры шагов; пройденная часть — золотая
      const seg = (a, b) => `C${a[0]} ${(a[1] + b[1]) / 2} ${b[0]} ${(a[1] + b[1]) / 2} ${b[0]} ${b[1]}`;
      let d = pts.length ? `M${pts[0][0]} ${pts[0][1]}` : '', dDone = d;
      let doneUntil = pts.findIndex(p => !p[2]); if (doneUntil < 0) doneUntil = pts.length - 1;
      for (let k = 1; k < pts.length; k++) { d += seg(pts[k - 1], pts[k]); if (k <= doneUntil) dDone += seg(pts[k - 1], pts[k]); }
      const pimHtml = curPt ? `<div class="trail-pim" style="left:${curPt[0] + (curPt[0] > W / 2 ? -150 : 70)}px;top:${curPt[1] - 60}px">${mascot(pim.state === 'full' || pim.state === 'feast' ? 'happy' : 'calm', 76)}<span class="tp-bubble">${tr.chestsReady ? 'Там сундук! Открой его!' : 'Нам сюда!'}</span></div>` : '';
      box.style.height = y + 'px';
      box.innerHTML = `<svg class="trail-svg" width="${W}" height="${y}" aria-hidden="true"><path d="${d}" class="tr-edge"/><path d="${d}" class="tr-base"/><path d="${dDone}" class="tr-done"/></svg>${html}${pimHtml}`;
    };
    layout();
    let lastW = box.clientWidth;
    const ro = new ResizeObserver(() => { if (Math.abs(box.clientWidth - lastW) > 4) { lastW = box.clientWidth; layout(); } });
    ro.observe(box);
    cleanupRo = () => ro.disconnect();

    const toCurrent = (smooth = true) => $('.node.current', box)?.scrollIntoView({ block: 'center', behavior: smooth ? 'smooth' : 'auto' });
    $('#to-current') && ($('#to-current').onclick = () => toCurrent());
    $$('.langs .chip', main).forEach(b => b.onclick = () => { if (switchLang(b.dataset.l)) { toast(`Учим: ${L().acc}`); cleanupRo(); draw(); } });

    box.onclick = e => {
      const c = e.target.closest('[data-chest]');
      if (c) return openChest(c.dataset.chest, tr, c);
      const n = e.target.closest('[data-node]');
      if (n) nodeSheet(tr.chapters.flatMap(ch => ch.items).find(it => it.id === n.dataset.node));
    };
    return toCurrent;
  };

  let cleanupRo = () => {};
  const toCurrent = draw();
  setTimeout(() => toCurrent(false), 60);
  return () => cleanupRo();

  function openChest(id, tr, el) {
    const it = tr.chapters.flatMap(ch => ch.items).find(x => x.id === id);
    if (!it) return;
    if (it.opened) return toast('Этот сундук уже открыт');
    if (!it.ready) return toast(`Сундук заперт: пройдите ещё ${it.need} ${plural(it.need, 'шаг', 'шага', 'шагов')} до него`);
    s.chests[id] = Date.now();
    el.classList.remove('ready'); el.classList.add('opening');
    el.innerHTML = chestSvg('open');
    store.save();
    setTimeout(() => {
      G.addXp(CHEST_XP, 'сундук открыт');
      modal(`<div class="chest-modal">${chestSvg('open', 120)}<h2>Сундук открыт!</h2><p>Внутри корзина яблок: <b>+${CHEST_XP} XP</b>. Пим уже уплетает их за обе щеки.</p><button class="btn" data-close>Дальше по тропе</button></div>`);
    }, 650);
  }

  function nodeSheet(it) {
    if (!it) return;
    const lang = L();
    if (it.type === 'words') {
      const ws = chunkWords(lang, it.key);
      const st = w => { const x = s.words[w]; return !x ? '' : x.srs ? 'learned' : Object.keys(x.trained || {}).length ? 'learning' : 'new'; };
      modal(`<div class="node-sheet"><span class="kind">${icon('cards')} ${TYPE_NAME.words}</span><h2>${esc(it.title)}</h2>
        <p class="muted">Изучено ${it.learned} из ${it.size} · в словаре ${it.have}. Шаг пройден, когда изучено ${Math.ceil(it.size * 0.8)} слов.</p>
        <i class="bar"><i style="width:${it.progress * 100}%"></i></i>
        <ul class="chunk-words">${ws.map(w => `<li class="${st(w)}"><b>${esc(w)}</b><span>${esc(lang.DICT.get(w) || '')}</span></li>`).join('')}</ul>
        <div class="row gap"><button class="btn" id="learn">${icon('train')} ${it.done ? 'Повторить' : it.have < it.size ? 'Учить эти слова' : 'Тренировать'}</button><a class="btn ghost" href="#set-${esc(it.set)}" data-close>Весь набор</a></div></div>`,
      (el, close) => { $('#learn', el).onclick = () => {
        let n = 0; for (const w of ws) if (G.addWord(w, lang.DICT.get(w) || '', '', lang.SET_INFO[it.set]?.title || 'тропа')) n++;
        G.setFocus('trail:' + it.key);
        if (n) toast(`Добавлено ${n} ${plural(n, 'слово', 'слова', 'слов')} — тренируем только этот шаг`);
        close();
        const hasNew = ws.some(w => s.words[w] && !s.words[w].srs);
        location.hash = hasNew ? 'train-storm' : G.dueWords().length ? 'train-cards' : 'train';
      }; });
    } else if (it.type === 'text') {
      modal(`<div class="node-sheet"><span class="kind">${icon('read')} ${TYPE_NAME.text}${it.level ? ' · ' + esc(it.level) : ''}</span><h2>${esc(it.title)}</h2><p class="muted">${it.done ? 'Прочитан. Можно перечитать и добавить новые слова.' : 'Прочитайте текст до конца: незнакомые слова переводятся по клику.'}</p><div class="row gap"><a class="btn" href="#read-${esc(it.ref)}" data-close>${icon('read')} ${it.done ? 'Перечитать' : 'Читать'}</a></div></div>`);
    } else {
      modal(`<div class="node-sheet"><span class="kind">${icon('grammar')} ${TYPE_NAME.lesson}</span><h2>${esc(it.title)}</h2><p class="muted">${it.done ? 'Урок пройден.' : it.progress ? 'Урок начат, но ещё не пройден.' : 'Теория и упражнения с проверкой.'}</p><div class="row gap"><a class="btn" href="#lesson-${esc(it.ref)}" data-close>${icon('grammar')} ${it.done ? 'Повторить урок' : 'К уроку'}</a></div></div>`);
    }
  }
}
