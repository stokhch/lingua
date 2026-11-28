// Друзья и дуэли: запросы в друзья, код для добавления, рейтинг среди друзей, вызов друга на дуэль по словам.
import { store } from '../store.js';
import { esc, $, $$, icon, toast, modal, shuffle, plural } from '../ui.js';
import * as G from '../game.js';
import { L, LANGS } from '../lang.js';
import { rankFor } from '../ranks.js';
import { distractors } from './train.js';
import { inviteLink } from '../invite.js';
import { respondRequest, cancelRequest } from '../friendreq.js';

const REQ_FROM = [['all', 'Все ученики'], ['class', 'Только одноклассники'], ['nobody', 'Никто']];

const DUEL_N = 10;
const fmtTime = ms => `${Math.floor(ms / 60000) ? Math.floor(ms / 60000) + ' мин ' : ''}${Math.round((ms % 60000) / 1000)} с`;
const ago = d => { if (!d) return 'давно'; const days = Math.round((Date.parse(G.today()) - Date.parse(d)) / 86400000); return days <= 0 ? 'сегодня' : days === 1 ? 'вчера' : `${days} ${plural(days, 'день', 'дня', 'дней')} назад`; };

export function renderFriends(main) {
  if (store.mode !== 'server') {
    main.innerHTML = `<section class="band narrow"><h1>Друзья и дуэли</h1><div class="empty"><p>Друзья и дуэли работают с аккаунтом: так друзья видят ваш прогресс, а вы — их вызовы.${store.serverAvailable ? ' Прогресс, накопленный без регистрации, перенесётся в новый аккаунт.' : ''}</p>${store.serverAvailable ? '<a class="btn" href="#profile">Войти или создать аккаунт</a>' : ''}</div></section>`;
    return;
  }
  main.innerHTML = `<section class="band"><h1>Друзья и дуэли</h1><p class="muted">Загрузка…</p></section>`;
  let alive = true;
  const load = async () => {
    try { await store.saveNow(); const d = await store.api('GET', 'api/social'); if (alive) draw(d); }
    catch (e) { if (alive) main.innerHTML = `<section class="band"><h1>Друзья и дуэли</h1><div class="empty"><p>${esc(e.message)}</p><button class="btn" id="retry">Повторить</button></div></section>`, $('#retry').onclick = load; }
  };

  const draw = data => {
    const { code, friends, duels, me } = data;
    const reqs = data.requests || { in: [], out: [] };
    const table = [{ ...me, isMe: true }, ...friends].sort((a, b) => b.week - a.week || b.xp - a.xp);
    const toPlay = duels.filter(d => d.role === 'b' && !d.mine);
    const waiting = duels.filter(d => d.mine && !d.result);
    const done = duels.filter(d => d.result);
    main.innerHTML = `
    <section class="band">
      <div class="toolbar"><h1>Друзья и дуэли</h1><span class="row gap"><a class="btn ghost small" href="#messages">${icon('mail')} Сообщения</a><a class="btn ghost small" href="#students">${icon('chart')} Все ученики</a><a class="btn ghost small" href="#classes">${icon('user')} Классы</a></span></div>
      <p class="lead">Учитесь вместе: отправляйте запросы в друзья, сравнивайте опыт за неделю и вызывайте друзей на дуэль по словам. Кто ответит верно на больше слов, тот и победил, а при равенстве побеждает тот, кто быстрее.</p>
      <div class="friend-code">
        <div><span class="muted">Ваш код для друзей</span><b id="my-code">${esc(code)}</b></div>
        <button class="btn ghost small" id="copy">${icon('check')} Скопировать</button>
        <form id="add-f" class="add-f"><input name="code" placeholder="Код друга" maxlength="12" autocomplete="off" autocapitalize="characters" required aria-label="Код друга"><button class="btn">${icon('plus')} Добавить</button></form>
      </div>
      <div class="invite-box">
        <div><b>Пригласить по ссылке</b><span class="muted">Кто откроет ссылку и войдёт или зарегистрируется, сразу станет вашим другом.</span></div>
        <input id="inv-link" readonly value="${esc(inviteLink(code))}" aria-label="Ваша ссылка-приглашение">
        <div class="row gap"><button class="btn small" id="inv-copy">${icon('check')} Скопировать ссылку</button>${navigator.share ? `<button class="btn ghost small" id="inv-share">${icon('heart')} Поделиться</button>` : ''}</div>
      </div>
      ${reqs.in.length ? `<h2 class="sets-h" id="fr-in">Запросы в друзья</h2><ul class="fr-reqs">${reqs.in.map(r => reqRow(r, `<button class="btn small" data-acc="${esc(r.pid)}" data-name="${esc(r.name)}">${icon('heart')} Принять</button><button class="btn ghost small" data-dec="${esc(r.pid)}" data-name="${esc(r.name)}">Отклонить</button>`)).join('')}</ul>` : ''}
      ${toPlay.length ? `<h2 class="sets-h">Вас вызвали</h2><div class="duels">${toPlay.map(d => duelCard(d)).join('')}</div>` : ''}
    </section>
    <section class="band">
      <h2>Рейтинг друзей за неделю</h2>
      ${friends.length ? `<ol class="leaders friends">${table.map((f, i) => `<li class="${f.isMe ? 'me' : ''}"><span class="pos">${i + 1}</span>
        <div class="fr-name"><b>${esc(f.name)}${f.isMe ? ' (вы)' : ''}</b><span>${esc(rankFor(f.level).title)} · ур. ${f.level} · ${LANGS[f.lang]?.code || ''} · ${ago(f.active)}</span></div>
        <span title="Дней подряд">${icon('fire')}${f.streak}</span><span class="num">${f.week} XP</span>
        ${f.isMe ? '<span></span>' : `<span class="fr-act"><a class="icon-btn" href="#messages-${esc(f.code)}" title="Написать" aria-label="Написать ${esc(f.name)}">${icon('mail')}</a><button class="btn small" data-duel="${esc(f.code)}" data-name="${esc(f.name)}">Дуэль</button><button class="icon-btn" data-rm="${esc(f.code)}" data-name="${esc(f.name)}" title="Удалить из друзей" aria-label="Удалить ${esc(f.name)} из друзей">${icon('x')}</button></span>`}</li>`).join('')}</ol>`
        : `<div class="empty"><p>Пока никого. Найдите ученика во <a href="#students">«Всех учениках»</a> и отправьте запрос в друзья, либо поделитесь ссылкой-приглашением или кодом <b>${esc(code)}</b>.</p></div>`}
    </section>
    <section class="band">
      <div class="toolbar"><h2>Найти друзей</h2><a class="btn small" href="#students">${icon('search')} Все ученики</a></div>
      <p class="muted">Откройте «Все ученики» или рейтинг недели и нажмите «В друзья» рядом с именем. Ученик получит запрос, и дружба начнётся, когда он его примет. Если он уже звал вас, вы сразу станете друзьями.</p>
      ${reqs.out.length ? `<h3 class="sets-h">Отправленные запросы</h3><ul class="fr-reqs">${reqs.out.map(r => reqRow(r, `<button class="btn ghost small" data-cancel="${esc(r.pid)}">Отозвать</button>`)).join('')}</ul>` : ''}
      <label class="fr-pref"><span>Кто может присылать вам запросы в друзья</span><select id="req-from">${REQ_FROM.map(([v, t]) => `<option value="${v}" ${data.reqFrom === v ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
    </section>
    ${waiting.length || done.length ? `<section class="band"><h2>Дуэли</h2><div class="duels">${[...waiting, ...done].slice(0, 20).map(d => duelCard(d)).join('')}</div></section>` : ''}`;

    const link = inviteLink(code);
    $('#inv-copy').onclick = async () => { try { await navigator.clipboard.writeText(link); toast('Ссылка скопирована — отправьте её другу'); } catch { $('#inv-link').select(); toast('Скопируйте ссылку из поля'); } };
    $('#inv-link').onfocus = e => e.target.select();
    $('#inv-share') && ($('#inv-share').onclick = () => navigator.share({ title: 'Лингва', text: `${me.name} зовёт вас учить языки вместе в Лингве`, url: link }).catch(() => {}));
    $('#copy').onclick = async () => { try { await navigator.clipboard.writeText(code); toast('Код скопирован'); } catch { toast(`Ваш код: ${code}`); } };
    $('#add-f').onsubmit = async e => {
      e.preventDefault();
      try { const r = await store.api('POST', 'api/friends', { code: e.target.code.value }); toast(`${r.friend.name} теперь в друзьях`); load(); }
      catch (err) { toast(err.message); }
    };
    $$('[data-acc]').forEach(b => b.onclick = async () => { b.disabled = true; if (await respondRequest(b.dataset.acc, b.dataset.name, true) !== undefined) load(); else b.disabled = false; });
    $$('[data-dec]').forEach(b => b.onclick = () => modal(`<h2>Отклонить запрос от ${esc(b.dataset.name)}?</h2><p class="muted">Ученик не узнает об отказе: у него запрос останется «отправленным», а повторить его можно будет только через месяц. Если вам пишут неприятное — заблокируйте ученика на странице «Сообщения».</p><div class="row gap"><button class="btn danger" id="yes">Отклонить</button><button class="btn ghost" data-close>Отмена</button></div>`,
      (el, close) => { $('#yes', el).onclick = async () => { close(); if (await respondRequest(b.dataset.dec, b.dataset.name, false) !== undefined) load(); }; }));
    $$('[data-cancel]').forEach(b => b.onclick = async () => { b.disabled = true; if (await cancelRequest(b.dataset.cancel) !== undefined) load(); else b.disabled = false; });
    $('#req-from').onchange = async e => {
      try { await store.api('POST', 'api/friends/settings', { reqFrom: e.target.value }); toast('Сохранено'); } catch (err) { toast(err.message); }
    };
    $$('[data-rm]').forEach(b => b.onclick = () => modal(`<h2>Удалить ${esc(b.dataset.name)} из друзей?</h2><p class="muted">Вы пропадёте из списков друг друга. Добавиться снова можно по коду.</p><div class="row gap"><button class="btn danger" id="yes">Удалить</button><button class="btn ghost" data-close>Отмена</button></div>`,
      (el, close) => { $('#yes', el).onclick = async () => { close(); try { await store.api('POST', 'api/friends/remove', { code: b.dataset.rm }); load(); } catch (err) { toast(err.message); } }; }));
    $$('[data-duel]').forEach(b => b.onclick = () => startChallenge(main, b.dataset.duel, b.dataset.name, () => { alive = true; load(); }));
    $$('[data-play]').forEach(b => b.onclick = () => {
      const d = duels.find(x => x.id === b.dataset.play);
      playDuel(main, { title: `Дуэль с ${d.opponent.name}`, lang: d.lang, words: d.words }, async (answers, ms) => {
        const r = await store.api('POST', 'api/duels/answer', { id: d.id, answers, ms });
        return r.duel;
      }, () => load());
    });
  };
  load();
  return () => { alive = false; };
}

const reqRow = (r, actions) => `<li><span class="ava">${esc(r.name.slice(0, 1).toUpperCase())}</span>
  <div class="fr-name"><b>${esc(r.name)}</b><span>${esc(rankFor(r.level).title)} · ур. ${r.level} · ${LANGS[r.lang]?.code || ''} · ${r.week} XP за неделю${r.classmate ? ' · из вашего класса' : ''}</span></div>
  <span class="fr-act row gap">${actions}</span></li>`;

function duelCard(d) {
  const lang = LANGS[d.lang]?.code || d.lang;
  const mine = d.mine ? `${d.mine.score}/${d.n} · ${fmtTime(d.mine.ms)}` : '—';
  const theirs = d.theirs?.score !== undefined ? `${d.theirs.score}/${d.n} · ${fmtTime(d.theirs.ms)}` : d.theirs?.played ? 'сыграл(а), счёт откроется после вашей игры' : 'ещё не сыграл(а)';
  const res = d.result === 'win' ? '<em class="win">Победа</em>' : d.result === 'lose' ? '<em class="lose">Поражение</em>' : d.result === 'draw' ? '<em>Ничья</em>' : '';
  return `<div class="duel ${d.result || (d.mine ? 'wait' : 'todo')}">
    <div class="duel-head"><b>${esc(d.opponent.name)}</b><span class="lv">${esc(lang)}</span>${res}</div>
    <div class="duel-score"><span>Вы: <b>${mine}</b></span><span>${esc(d.opponent.name)}: <b>${theirs}</b></span></div>
    ${!d.mine ? `<button class="btn" data-play="${d.id}">${icon('bolt')} Принять вызов · ${d.n} слов</button>` : ''}
    ${d.words && d.mine ? `<details><summary>Слова дуэли</summary><p class="muted small">${d.words.map(w => `${esc(w.w)} — ${esc(w.t)}`).join(' · ')}</p></details>` : ''}
  </div>`;
}

// Вызов: собираем 10 слов из своего словаря (или встроенного) с вариантами ответа, играем сами и отправляем другу
function startChallenge(main, code, name, back) {
  const own = G.allWords();
  const src = own.length >= DUEL_N ? shuffle(own).slice(0, DUEL_N) : shuffle([...L().DICT.entries()]).slice(0, DUEL_N).map(([w, t]) => ({ w, t }));
  const words = src.map(x => {
    const opts = shuffle([x.t, ...distractors(x, 't', 3)]);
    return { w: x.w, t: x.t, opts };
  }).filter(x => new Set(x.opts).size === 4);
  modal(`<h2>Дуэль с ${esc(name)}</h2><p>${words.length} слов ${own.length >= DUEL_N ? 'из вашего словаря' : 'из встроенного словаря'} · ${L().name}. Сначала играете вы, потом ${esc(name)} получит те же слова. Выигрывает тот, у кого больше верных ответов, а при равенстве — кто быстрее.</p><div class="row gap"><button class="btn" id="go">${icon('bolt')} Начать</button><button class="btn ghost" data-close>Отмена</button></div>`,
    (el, close) => { $('#go', el).onclick = () => { close(); playDuel(main, { title: `Дуэль с ${name}`, lang: L().id, words }, async (answers, ms) => {
      const r = await store.api('POST', 'api/duels', { to: code, lang: L().id, words, answers, ms });
      return r.duel;
    }, back); }; });
}

// Игра: варианты ответа, таймер; ответы отправляются на сервер, счёт считает он
function playDuel(main, { title, words }, submit, back) {
  const answers = []; let i = 0; const t0 = Date.now();
  main.innerHTML = `
  <section class="band narrow trainer">
    <div class="train-top"><span></span><b>${esc(title)}</b><span class="count" id="cnt"></span></div>
    <i class="bar"><i id="progress" style="width:0"></i></i>
    <div id="stage" class="stage"></div>
  </section>`;
  const stage = $('#stage');
  const timer = setInterval(() => { if (!stage.isConnected) return clearInterval(timer); $('#cnt').textContent = `${i + 1}/${words.length} · ${Math.round((Date.now() - t0) / 1000)} с`; }, 250);
  const onKey = e => { if (!stage.isConnected) return document.removeEventListener('keydown', onKey); const n = Number(e.key); const o = $$('.opt:not([disabled])', stage); if (n >= 1 && n <= o.length) o[n - 1].click(); };
  document.addEventListener('keydown', onKey);
  const show = () => {
    if (i >= words.length) return finish();
    const x = words[i];
    $('#progress').style.width = `${(i / words.length) * 100}%`;
    stage.className = 'stage';
    stage.innerHTML = `<p class="muted">Выберите перевод</p><div class="big-word">${esc(x.w)}</div>
      <div class="opts">${x.opts.map((o, k) => `<button class="opt" data-k="${k}"><i>${k + 1}</i>${esc(o)}</button>`).join('')}</div>`;
    $('.opts', stage).onclick = e => {
      const b = e.target.closest('.opt'); if (!b || b.disabled) return;
      answers.push(Number(b.dataset.k));
      $$('.opt', stage).forEach(o => (o.disabled = true));
      // правильный ответ показываем, только если он известен (у вызывающего); у принимающего — просто дальше
      if (x.t) { const ok = x.opts[b.dataset.k] === x.t; b.classList.add(ok ? 'right' : 'wrong'); $$('.opt', stage).find(o => x.opts[o.dataset.k] === x.t)?.classList.add('right'); }
      else b.classList.add('picked');
      i++; setTimeout(show, x.t ? 450 : 200);
    };
  };
  const finish = async () => {
    clearInterval(timer); document.removeEventListener('keydown', onKey);
    const ms = Date.now() - t0;
    stage.innerHTML = '<p class="muted">Отправляем результат…</p>';
    try {
      const d = await submit(answers, ms);
      G.addXp(d.mine.score, 'дуэль');
      const verdict = d.result === 'win' ? 'Победа!' : d.result === 'lose' ? 'В этот раз соперник сильнее' : d.result === 'draw' ? 'Ничья' : 'Вызов отправлен';
      main.innerHTML = `<section class="band narrow"><h1>${verdict}</h1>
        <p class="lead">Ваш результат: ${d.mine.score} из ${d.n} за ${fmtTime(d.mine.ms)}.${d.theirs?.score !== undefined ? ` Соперник: ${d.theirs.score} из ${d.n} за ${fmtTime(d.theirs.ms)}.` : ` ${esc(d.opponent.name)} увидит вызов на странице «Друзья».`}</p>
        ${d.words ? `<ul class="results">${d.words.map((w, k) => { const ok = words[k].opts[answers[k]] === w.t; return `<li class="${ok ? 'ok' : 'bad'}">${icon(ok ? 'check' : 'x')}<b>${esc(w.w)}</b><span>${esc(w.t)}</span></li>`; }).join('')}</ul>` : ''}
        <div class="row gap"><a class="btn" href="#friends" id="back">К друзьям</a></div></section>`;
      $('#back').onclick = e => { e.preventDefault(); back(); };
    } catch (e) {
      stage.innerHTML = `<div class="empty"><p>${esc(e.message)}</p><button class="btn" id="back">К друзьям</button></div>`;
      $('#back').onclick = back;
    }
  };
  show();
}
