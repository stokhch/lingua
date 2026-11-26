// «Все ученики»: прогресс всех зарегистрированных пользователей — имя, звание, уровень, опыт, стрик и языки.
// E-mail не показывается; скрыть себя можно в профиле.
import { store } from '../store.js';
import { esc, $, $$, icon, plural } from '../ui.js';
import * as G from '../game.js';
import { LANGS } from '../lang.js';
import { rankFor } from '../ranks.js';

const V = { sort: 'week', lang: 'all', q: '' };
const SORTS = [['week', 'Опыт за неделю'], ['xp', 'Опыт всего'], ['streak', 'Дней подряд'], ['words', 'Слов в словарях']];
const wordsOf = s => s.langs.reduce((n, l) => n + l.words, 0);
const ago = d => { if (!d) return 'ещё не занимался(-ась)'; const days = Math.round((Date.parse(G.today()) - Date.parse(d)) / 86400000); return days <= 0 ? 'занимался(-ась) сегодня' : days === 1 ? 'вчера' : `${days} ${plural(days, 'день', 'дня', 'дней')} назад`; };

export function renderStudents(main) {
  const head = `<a class="back" href="#friends">${icon('back')} Друзья и дуэли</a><h1>Все ученики</h1>`;
  if (!store.serverAvailable) { main.innerHTML = `<section class="band">${head}<div class="empty"><p>Список учеников доступен, когда Лингва работает с сервером.</p></div></section>`; return; }
  main.innerHTML = `<section class="band">${head}<p class="muted">Загрузка…</p></section>`;
  let alive = true, data = null;
  const load = async () => {
    try { if (store.mode === 'server') await store.saveNow(); data = await store.api('GET', 'api/students'); if (alive) draw(); }
    catch (e) { if (alive) { main.innerHTML = `<section class="band">${head}<div class="empty"><p>${esc(e.message)}</p><button class="btn" id="retry">Повторить</button></div></section>`; $('#retry').onclick = load; } }
  };

  const draw = () => {
    const all = data.students, me = all.find(s => s.me);
    const langs = [...new Set(all.flatMap(s => s.langs.map(l => l.id)))].filter(id => LANGS[id]);
    if (V.lang !== 'all' && !langs.includes(V.lang)) V.lang = 'all';
    const key = { week: s => s.week, xp: s => s.xp, streak: s => s.streak, words: wordsOf }[V.sort] || (s => s.week);
    const q = V.q.trim().toLowerCase();
    const list = all.filter(s => (V.lang === 'all' || s.langs.some(l => l.id === V.lang)) && (!q || s.name.toLowerCase().includes(q)))
      .sort((a, b) => key(b) - key(a) || b.xp - a.xp);
    const active = all.filter(s => s.week > 0).length;
    main.innerHTML = `
    <section class="band">
      ${head}
      <p class="lead">${data.total} ${plural(data.total, 'ученик', 'ученика', 'учеников')} в Лингве, на этой неделе ${plural(active, 'занимался', 'занимались', 'занимались')} ${active}. Видны только имена и учебные успехи — без e-mail.</p>
      ${me?.hidden ? `<p class="note">Вы скрыты от других учеников: этот список видят без вас. <a href="#profile">Изменить в профиле</a></p>` : store.mode === 'server' ? `<p class="muted small">Не хотите быть в списке? Скройте себя в <a href="#profile">профиле</a>.</p>` : ''}
      <div class="filters">
        <label class="search">${icon('search')}<input id="st-q" placeholder="Поиск по имени" value="${esc(V.q)}" aria-label="Поиск по имени"></label>
        <select data-v="sort" aria-label="Сортировка">${SORTS.map(([v, t]) => `<option value="${v}" ${V.sort === v ? 'selected' : ''}>${t}</option>`).join('')}</select>
        ${langs.length > 1 ? `<select data-v="lang" aria-label="Язык"><option value="all">Все языки</option>${langs.map(id => `<option value="${id}" ${V.lang === id ? 'selected' : ''}>${esc(LANGS[id].name)}</option>`).join('')}</select>` : ''}
      </div>
      ${list.length ? `<ol class="leaders students">${list.map((s, i) => `<li class="${s.me ? 'me' : ''}"><span class="pos">${i + 1}</span>
        <div class="fr-name"><b>${esc(s.name)}${s.me ? ' (вы)' : ''}</b><span>${esc(rankFor(s.level).title)} · ур. ${s.level} · ${ago(s.active)}</span>
          <span class="st-langs">${s.langs.map(l => `<i title="${esc(LANGS[l.id]?.name || l.id)}: ${l.words} ${plural(l.words, 'слово', 'слова', 'слов')}, изучено ${l.known}, текстов ${l.texts}">${esc(LANGS[l.id]?.code || l.id)}${l.level ? ' ' + esc(l.level) : ''} · ${l.words} ${plural(l.words, 'слово', 'слова', 'слов')}</i>`).join('')}</span></div>
        <span title="Дней подряд (рекорд ${s.best})">${icon('fire')}${s.streak}</span>
        <span class="num" title="Опыт за неделю">${s.week} XP</span>
        <span class="num total" title="Опыт всего">${s.xp}</span></li>`).join('')}</ol>`
        : '<div class="empty"><p>Никого не найдено.</p></div>'}
      ${data.total > all.length ? `<p class="muted small">Показаны первые ${all.length} по опыту за неделю.</p>` : ''}
    </section>`;
    $$('[data-v]').forEach(x => x.onchange = () => { V[x.dataset.v] = x.value; draw(); });
    const inp = $('#st-q');
    inp.oninput = () => { V.q = inp.value; const pos = inp.selectionStart; draw(); const n = $('#st-q'); n.focus(); n.setSelectionRange(pos, pos); };
  };
  load();
  return () => { alive = false; };
}
