// «Тропа»: курс языка в виде сказочной дорожки через джунгли с шагами и сундуками.
import { store } from '../store.js';
import { esc, $, $$, icon, plural, toast, modal, mascot } from '../ui.js';
import * as G from '../game.js';
import { L, LANGS, switchLang } from '../lang.js';
import { buildTrail, chunkWords, CHEST_XP } from '../trail.js';
import { sat } from '../pimfx.js';
import { ensureDefs, chestSvg, bigItem, smallItem, use, stream, rnd } from '../trail-art.js';

const ROW = 112, HEAD = 190, PAD = 30;
const TYPE_IC = { words: 'cards', text: 'read', lesson: 'grammar' };
const TYPE_NAME = { words: 'Слова', text: 'Текст', lesson: 'Грамматика' };

export function viewToggle(active) {
  return `<div class="seg view-seg" role="tablist" aria-label="Вид прогресса">
    <a role="tab" href="#progress" aria-selected="${active === 'stats'}">${icon('chart')} Статистика</a>
    <a role="tab" href="#path" aria-selected="${active === 'path'}">${icon('star')} Тропа</a></div>`;
}

function ring(p) {
  const R = 44, C = 2 * Math.PI * R;
  return `<svg class="node-ring" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="${R}" class="nr-bg"/><circle cx="50" cy="50" r="${R}" class="nr-fg" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - p)}"/></svg>`;
}

export function renderPath(main) {
  const s = store.state;
  s.chests ||= {};
  ensureDefs();
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
      const W = box.clientWidth, amp = Math.min(130, W / 2 - 70), narrow = W < 520;
      let y = PAD, i = 0, html = '', pts = [], curPt = null;
      const back = [], scene = [], streams = [];
      for (const ch of tr.chapters) {
        // голова главы: ручей (кроме первой), горы и табличка
        if (ch.n > 1) streams.push(y + 34);
        back.push(`<use href="#ta-mountains" x="-10" y="${y + 62}" width="${W + 20}" height="${narrow ? 90 : 110}"/>`);
        html += `<div class="sign" style="top:${y + 92}px"><span>Глава ${ch.n}</span><b>${esc(ch.title)}</b></div>`;
        y += HEAD;
        for (const it of ch.items) {
          const o = Math.sin(i * 0.9) * amp, x = Math.round(W / 2 + o), cy = y + ROW / 2;
          pts.push([x, cy, it.type === 'chest' ? (it.opened || it.ready) : it.done]);
          if (it.type === 'chest') {
            const st = it.opened ? 'open' : it.ready ? 'ready' : 'locked';
            html += `<button class="chest ${st}" style="left:${x}px;top:${cy}px" data-chest="${it.id}" aria-label="Сундук: ${st === 'open' ? 'открыт' : st === 'ready' ? 'можно открыть' : 'закрыт'}">${chestSvg(st, 96)}</button>`;
          } else {
            const st = it.done ? 'done' : it.current ? 'current' : it.progress > 0 ? 'started' : 'todo';
            if (it.current) curPt = [x, cy];
            html += `<button class="node ${st} t-${it.type}" style="left:${x}px;top:${cy}px" data-node="${esc(it.id)}">
              ${st === 'current' || st === 'started' ? ring(it.progress) : ''}<span class="disc">${icon(it.done ? 'check' : TYPE_IC[it.type])}</span>
              <span class="lbl">${esc(it.title)}</span>${it.current ? '<span class="start">Начать</span>' : ''}</button>`;
          }
          // пейзаж: большое дерево на свободной стороне, цветы и грибы — на другой
          const far = o > 0 ? [0, x - 85] : [x + 85, W], near = o > 0 ? [x + 85, W] : [0, x - 85];
          const fw = far[1] - far[0], nw = near[1] - near[0];
          if (fw >= 60 && !it.current) {
            const w = Math.min(narrow ? 78 : 118, fw * 0.8);
            if (i % 2) scene.push(smallItem(i + 7, (far[0] + far[1]) / 2 + (rnd(i + 9) - 0.5) * Math.max(0, fw - 60) * 0.6, cy + 30, Math.min(narrow ? 46 : 60, fw * 0.7)));
            else scene.push(bigItem(i, (far[0] + far[1]) / 2 + (rnd(i + 3) - 0.5) * Math.max(0, fw - w) * 0.6, cy + 34, w));
          }
          if (nw >= 50 && !it.current) scene.push(smallItem(i, (near[0] + near[1]) / 2 + (rnd(i + 5) - 0.5) * Math.max(0, nw - 60) * 0.5, cy + 30, Math.min(narrow ? 44 : 58, nw * 0.7)));
          if (rnd(i + 11) > 0.45) scene.push(use('ta-grass', 40, 24, x + (rnd(i + 13) > 0.5 ? 46 : -46), cy + 44, 28));
          y += ROW; i++;
        }
      }
      y += PAD;
      // тропа: плавная кривая через центры шагов; пройденная часть — золотая
      const seg = (a, b) => `C${a[0]} ${(a[1] + b[1]) / 2} ${b[0]} ${(a[1] + b[1]) / 2} ${b[0]} ${b[1]}`;
      let d = pts.length ? `M${pts[0][0]} ${pts[0][1]}` : '', dDone = d;
      let doneUntil = pts.findIndex(p => !p[2]); if (doneUntil < 0) doneUntil = pts.length - 1;
      for (let k = 1; k < pts.length; k++) { d += seg(pts[k - 1], pts[k]); if (k <= doneUntil) dDone += seg(pts[k - 1], pts[k]); }
      // мостики там, где ручей пересекает тропу
      const xAtY = sy => {
        const k = pts.findIndex(p => p[1] > sy); if (k < 1) return W / 2;
        const [a, b] = [pts[k - 1], pts[k]], m = (a[1] + b[1]) / 2;
        let lo = 0, hi = 1;
        for (let n = 0; n < 24; n++) { const t = (lo + hi) / 2, u = 1 - t, yy = u * u * u * a[1] + 3 * u * t * (u + t) * m + t * t * t * b[1]; yy < sy ? (lo = t) : (hi = t); }
        const t = lo, u = 1 - t; return u * u * u * a[0] + 3 * u * u * t * a[0] + 3 * u * t * t * b[0] + t * t * t * b[0];
      };
      const bridges = streams.map(sy => use('ta-bridge', 60, 56, xAtY(sy), sy + 30, 60)).join('');
      // бабочки
      const flies = narrow ? [] : streams.map((sy, k) => `<g class="fly f${k % 3}" style="transform-origin:${Math.round(W * (0.15 + rnd(k) * 0.7))}px ${sy + 70}px">${use(k % 2 ? 'ta-fly2' : 'ta-fly', 30, 24, Math.round(W * (0.15 + rnd(k) * 0.7)), sy + 82, 26)}</g>`).join('');
      const pimHtml = curPt ? `<div class="trail-pim" style="left:${curPt[0] + (curPt[0] > W / 2 ? -150 : 70)}px;top:${curPt[1] - 60}px">${mascot(pim.state === 'full' || pim.state === 'feast' ? 'happy' : 'calm', 76)}<span class="tp-bubble">${tr.chestsReady ? 'Там сундук! Открой его!' : 'Нам сюда!'}</span></div>` : '';
      box.style.height = y + 'px';
      box.innerHTML = `<svg class="trail-svg" width="${W}" height="${y}" aria-hidden="true">${back.join('')}${streams.map((sy, k) => stream(W, sy, k)).join('')}
        <path d="${d}" class="tr-edge"/><path d="${d}" class="tr-base"/><path d="${dDone}" class="tr-done"/>${bridges}${scene.join('')}${flies}</svg>${html}${pimHtml}`;
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
    el.innerHTML = chestSvg('open', 96);
    store.save();
    setTimeout(() => {
      G.addXp(CHEST_XP, 'сундук открыт');
      modal(`<div class="chest-modal">${chestSvg('open', 150)}<h2>Сундук открыт!</h2><p>Внутри корзина яблок: <b>+${CHEST_XP} XP</b>. Пим уже уплетает их за обе щеки.</p><button class="btn" data-close>Дальше по тропе</button></div>`);
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
