// Страница «Прогресс»: слова, опыт по дням, календарь занятий, стрик, тренировки и языки.
import { store } from '../store.js';
import { esc, $, $$, icon, plural, toast, mascot } from '../ui.js';
import * as G from '../game.js';
import * as St from '../stats.js';
import { L, LANGS, switchLang } from '../lang.js';
import { TRAIN_INFO } from './train.js';
import * as Pim from '../pim.js';

const MONTHS = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
const WD = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const fmtDay = d => d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
const n0 = n => n.toLocaleString('ru-RU');

let period = 7; // 7 | 30 дней на графике опыта

export function renderProgress(main) {
  const s = store.state, now = new Date();
  const lv = G.levelInfo(), streak = G.currentStreak();
  const langs = Object.values(LANGS).map(l => ({ ...l, sum: St.langSummary(s, l, now) }));
  const allWords = langs.map(l => St.langData(s, l.id).words);
  const known = langs.reduce((a, l) => a + l.sum.counts.known, 0);
  const totals = St.activityTotals(s.xpLog);
  const acc = s.stats.answers ? Math.round((s.stats.correct / s.stats.answers) * 100) : 0;

  main.innerHTML = `
  <section class="band prog-head">
    <h1>Прогресс</h1>
    <p class="lead">Всё, чего вы добились: слова, опыт, серии занятий и тренировки${langs.length > 1 ? ' — по всем языкам сразу и по каждому отдельно' : ''}.</p>
    <div class="kpis">
      <div class="kpi gold">${icon('star')}<b>${n0(s.xp)}</b><span>XP всего</span></div>
      <div class="kpi">${icon('trophy')}<b>${lv.level}</b><span>уровень · до следующего ${lv.need - lv.into} XP</span><i class="bar"><i style="width:${lv.pct}%"></i></i></div>
      <div class="kpi fire">${icon('fire')}<b>${streak}</b><span>${plural(streak, 'день', 'дня', 'дней')} подряд · рекорд ${s.bestStreak}</span></div>
      <div class="kpi leaf">${icon('check')}<b>${n0(known)}</b><span>${plural(known, 'слово изучено', 'слова изучено', 'слов изучено')}</span></div>
      <div class="kpi">${icon('home')}<b>${totals.activeDays}</b><span>${plural(totals.activeDays, 'день', 'дня', 'дней')} с занятиями</span></div>
    </div>
  </section>

  <section class="band">${pimPanel(s, now)}</section>

  <section class="band">
    <div class="sec-head"><h2>Опыт по дням</h2>
      <div class="seg" role="tablist" aria-label="Период">${[[7, 'Неделя'], [30, 'Месяц']].map(([v, t]) => `<button role="tab" data-p="${v}" aria-selected="${v === period}">${t}</button>`).join('')}</div>
    </div>
    <div id="xp-block"></div>
  </section>

  <section class="band two-col">
    <div class="panel">
      <h2>Календарь занятий</h2>
      <div id="cal"></div>
    </div>
    <div class="panel streak-card">
      <h2>Ударный режим</h2>
      ${streakCard(s, streak, totals, now)}
    </div>
  </section>

  <section class="band">
    <div class="sec-head"><h2>Слова <span class="muted small-h">· ${esc(L().name)}</span></h2><a class="link" href="#dictionary">Открыть словарь</a></div>
    ${wordsBlock(St.langData(s, L().id).words, now)}
    <h3 class="sub">Новые и изученные слова за 30 дней <span class="muted">· все языки</span></h3>
    ${wordTimeline(St.wordTimeline(allWords, 30, now))}
  </section>

  <section class="band">
    <h2>Тренировки</h2>
    ${trainBlock(s, acc, now)}
  </section>

  <section class="band">
    <h2>Языки</h2>
    <div class="lang-cards">${langs.map(langCard).join('')}</div>
  </section>`;

  const paintXp = () => {
    $('#xp-block').innerHTML = xpBlock(s, period, now);
    $$('.seg button').forEach(b => b.setAttribute('aria-selected', String(Number(b.dataset.p) === period)));
  };
  $('.seg').onclick = e => { const b = e.target.closest('[data-p]'); if (b) { period = Number(b.dataset.p); paintXp(); } };
  paintXp();

  const cal = $('#cal');
  const paintCal = () => { cal.innerHTML = calendar(s.xpLog, s.goal, cal.clientWidth < 520 ? 17 : 26, now); };
  paintCal();
  const ro = new ResizeObserver(() => { const w = cal.clientWidth < 520 ? 17 : 26; if (cal.dataset.w !== String(w)) { cal.dataset.w = w; paintCal(); } });
  ro.observe(cal);

  main.querySelector('.lang-cards').onclick = e => {
    const b = e.target.closest('[data-learn]'); if (!b) return;
    if (switchLang(b.dataset.learn)) { toast(`Учим: ${L().acc}`); location.hash = 'home'; }
  };
  return () => ro.disconnect();
}

// ---------- ёжик Пим ----------
function pimPanel(s, now) {
  const p = Pim.satiety(s.xpLog, s.goal, now), streak = Pim.fedStreak(s.xpLog, s.goal, now);
  const days = Pim.bowls(s.xpLog, s.goal, 14, now);
  return `
  <div class="pim-panel ${p.state}">
    <div class="pim-pic">${mascot(p.mood, 140)}</div>
    <div class="pim-body">
      <h2>${p.title}</h2>
      <div class="feed big"><span class="apples">${Pim.appleRow(p)}</span><span><b>${p.apples}</b> из ${Pim.APPLES} яблок · ${p.xp} / ${p.goal} XP</span></div>
      <p class="pim-quote">«${esc(Pim.plea(p, now, 'progress'))}»</p>
      <p>${p.hint}${p.left ? ` До полной миски — <b>${p.left} XP</b>, одно яблоко — около ${p.perApple} XP.` : ''}</p>
      ${p.left ? `<a class="btn" href="#train">${icon('train')} Покормить Пима</a>` : ''}
    </div>
    <div class="pim-stats">
      <div><b>${streak}</b><span>${plural(streak, 'сытый день', 'сытых дня', 'сытых дней')} подряд</span></div>
      <div><b>${Pim.fedDays(s.xpLog, s.goal)}</b><span>${plural(Pim.fedDays(s.xpLog, s.goal), 'день', 'дня', 'дней')} Пим был сыт за всё время</span></div>
      <div class="bowls" aria-label="Сытость Пима за две недели">${days.map(d => `<i title="${fmtDay(d.date)}: ${d.xp} XP" class="${d.fill >= 1 ? 'fed' : d.fill > 0 ? 'some' : ''}" style="--f:${d.fill}"></i>`).join('')}</div>
      <small class="muted">миски за 14 дней</small>
    </div>
  </div>`;
}

// ---------- опыт ----------
function xpBlock(s, n, now) {
  const days = St.xpSeries(s.xpLog, n, now), sum = St.periodSummary(s.xpLog, n, s.goal, now);
  const max = Math.max(s.goal, ...days.map(d => d.xp)) * 1.08;
  const label = n === 7 ? 'прошлой неделе' : 'прошлым 30 дням';
  const change = sum.change === null ? (sum.xp ? 'первая активность за период' : 'пока без занятий')
    : `${sum.change >= 0 ? '+' : '−'}${Math.abs(sum.change)}% к ${label}`;
  return `
  <div class="xp-sum">
    <div><b>${n0(sum.xp)}</b><span>XP за ${n === 7 ? '7 дней' : '30 дней'}</span><em class="${sum.change === null ? '' : sum.change >= 0 ? 'up' : 'down'}">${change}</em></div>
    <div><b>${sum.avg}</b><span>XP в среднем за день</span></div>
    <div><b>${sum.goalDays}<small>/${n}</small></b><span>${plural(sum.goalDays, 'день', 'дня', 'дней')} с выполненной целью</span></div>
    <div><b>${sum.best.xp}</b><span>${sum.best.xp ? 'лучший день — ' + fmtDay(sum.best.date) : 'лучший день'}</span></div>
  </div>
  <div class="xp-chart prog n${n}" role="img" aria-label="Опыт по дням за ${n} дней" style="--cols:${n}">
    ${days.map((d, i) => {
      const lbl = n === 7 ? WD[(d.date.getDay() + 6) % 7] : (i % 5 === 4 || i === n - 1 ? d.date.getDate() : '');
      return `<div class="col ${d.xp >= s.goal ? 'hit' : ''} ${i === n - 1 ? 'today' : ''}" title="${fmtDay(d.date)}: ${d.xp} XP"><i style="height:${((d.xp / max) * 100).toFixed(1)}%">${n === 7 && d.xp ? `<em>${d.xp}</em>` : ''}</i><span>${lbl}</span></div>`;
    }).join('')}
    <div class="goal-line" style="bottom:calc(${(s.goal / max).toFixed(3)} * (100% - 22px) + 22px)"><span>цель ${s.goal}</span></div>
  </div>`;
}

// ---------- календарь ----------
function calendar(xpLog, goal, weeks, now) {
  const grid = St.heatmap(xpLog, weeks, goal, now);
  let lastM = -1;
  const months = grid.map(w => { const m = w[0].date.getMonth(); const show = m !== lastM; lastM = m; return `<span>${show ? MONTHS[m] : ''}</span>`; }).join('');
  return `
  <div class="cal" style="--weeks:${weeks}">
    <div class="cal-m">${months}</div>
    <div class="cal-wd">${WD.map((d, i) => `<span>${i % 2 ? '' : d}</span>`).join('')}</div>
    <div class="cal-grid">${grid.map(w => w.map(c => `<i class="l${c.lvl}${c.future ? ' fut' : ''}${c.today ? ' now' : ''}" title="${c.future ? '' : `${fmtDay(c.date)}: ${c.xp} XP`}"></i>`).join('')).join('')}</div>
  </div>
  <div class="cal-legend"><span>меньше</span>${[0, 1, 2, 3, 4].map(l => `<i class="l${l}"></i>`).join('')}<span>больше</span><span class="muted">· тёмно-зелёный — цель выполнена</span></div>`;
}

// ---------- стрик ----------
function streakCard(s, streak, totals, now) {
  const week = St.heatmap(s.xpLog, 1, s.goal, now)[0];
  const todayDone = (s.xpLog[G.today(now)] || 0) > 0;
  return `
  <div class="flame">${icon('fire')}<b>${streak}</b><span>${plural(streak, 'день', 'дня', 'дней')} подряд</span></div>
  <div class="week-strip">${week.map((c, i) => `<div class="${c.xp ? 'on' : ''} ${c.lvl >= 3 ? 'goal' : ''} ${c.today ? 'now' : ''} ${c.future ? 'fut' : ''}"><i>${c.xp ? icon('check') : ''}</i><span>${WD[i]}</span></div>`).join('')}</div>
  <p class="muted">${todayDone ? 'Сегодня вы уже занимались — серия продолжается.' : streak ? 'Сегодня ещё нет занятий. Наберите хотя бы 1 XP, чтобы не прервать серию.' : 'Начните новую серию: любое занятие сегодня — это первый день.'}</p>
  <dl class="facts">
    <div><dt>Рекорд серии</dt><dd>${s.bestStreak} ${plural(s.bestStreak, 'день', 'дня', 'дней')}</dd></div>
    <div><dt>Дневная цель</dt><dd>${s.goal} XP</dd></div>
    <div><dt>Занимаетесь с</dt><dd>${totals.first ? fmtDay(new Date(totals.first + 'T12:00:00')) : '—'}</dd></div>
  </dl>`;
}

// ---------- слова ----------
function wordsBlock(words, now) {
  const c = St.wordCounts(words, now.getTime()), str = St.strength(words);
  const parts = [['learned', 'Изучены'], ['due', 'Пора повторить'], ['learning', 'Изучаются'], ['new', 'Новые']];
  const tot = c.total || 1;
  const strMax = Math.max(1, ...Object.values(str));
  return `
  <div class="funnel">
    <div class="stack" role="img" aria-label="Слова по статусам">${parts.map(([k]) => c[k] ? `<i class="${k}" style="flex:${c[k]}"></i>` : '').join('') || '<i class="empty-bar"></i>'}</div>
    <div class="dict-meter">${parts.map(([k, t]) => `<a href="#dictionary" class="m ${k}"><b>${c[k]}</b><span>${t}</span><small>${c.total ? Math.round((c[k] / tot) * 100) : 0}%</small></a>`).join('')}</div>
  </div>
  ${c.total ? '' : `<div class="empty"><p>В словаре пока пусто — добавьте слова из наборов или текстов, и здесь появится статистика.</p><a class="btn" href="#sets">Выбрать набор</a></div>`}
  <h3 class="sub">Прочность памяти <span class="muted">· изученные слова по интервалу повторения</span></h3>
  <div class="strength">${St.STRENGTH.map((x, i) => `<div class="st s${i}"><div class="st-top"><b>${str[x.id]}</b><span>${x.title}</span></div><i class="bar"><i style="width:${(str[x.id] / strMax) * 100}%"></i></i><small class="muted">${x.hint}</small></div>`).join('')}</div>`;
}

function wordTimeline(days) {
  const max = Math.max(1, ...days.map(d => Math.max(d.added, d.learned)));
  const added = days.reduce((a, d) => a + d.added, 0), learned = days.reduce((a, d) => a + d.learned, 0);
  return `
  <div class="wt-legend"><span class="k added"></span>добавлено <b>${added}</b><span class="k learned"></span>изучено <b>${learned}</b></div>
  <div class="wt-chart" role="img" aria-label="Добавлено ${added}, изучено ${learned} слов за 30 дней">
    ${days.map((d, i) => `<div class="col" title="${fmtDay(d.date)}: добавлено ${d.added}, изучено ${d.learned}"><div class="pair"><i class="added" style="height:${(d.added / max) * 100}%"></i><i class="learned" style="height:${(d.learned / max) * 100}%"></i></div><span>${i % 5 === 4 || i === days.length - 1 ? d.date.getDate() : ''}</span></div>`).join('')}
  </div>`;
}

// ---------- тренировки ----------
function trainBlock(s, acc, now) {
  const today = St.sumDays(s.days, 1, now), week = St.sumDays(s.days, 7, now);
  const pct = d => (d.a ? Math.round((d.c / d.a) * 100) + '%' : '—');
  const by = Object.entries(s.stats.byType || {}).filter(([k]) => TRAIN_INFO[k]).sort((a, b) => b[1] - a[1]);
  const max = Math.max(1, ...by.map(x => x[1]));
  return `
  <div class="kpis small">
    <div class="kpi">${icon('train')}<b>${n0(s.stats.trainings)}</b><span>тренировок пройдено</span></div>
    <div class="kpi">${icon('check')}<b>${n0(s.stats.answers)}</b><span>ответов · ${acc}% верных</span></div>
    <div class="kpi gold">${icon('trophy')}<b>${s.stats.perfect}</b><span>без единой ошибки</span></div>
    <div class="kpi">${icon('cards')}<b>${week.r}</b><span>повторений карточек за неделю</span></div>
  </div>
  <div class="two-col tight">
    <div class="panel">
      <h3 class="sub">Сегодня и за неделю</h3>
      <table class="tbl"><thead><tr><th></th><th>Сегодня</th><th>7 дней</th></tr></thead><tbody>
        <tr><th>Тренировки</th><td>${today.t}</td><td>${week.t}</td></tr>
        <tr><th>Ответы</th><td>${today.a}</td><td>${week.a}</td></tr>
        <tr><th>Точность</th><td>${pct(today)}</td><td>${pct(week)}</td></tr>
        <tr><th>Повторения</th><td>${today.r}</td><td>${week.r}</td></tr>
      </tbody></table>
    </div>
    <div class="panel">
      <h3 class="sub">Любимые тренировки</h3>
      ${by.length ? `<ul class="by-type">${by.map(([k, v]) => `<li>${icon(TRAIN_INFO[k].ic)}<span>${TRAIN_INFO[k].title}</span><b>${v}</b><i class="bar"><i style="width:${(v / max) * 100}%"></i></i></li>`).join('')}</ul>`
        : `<p class="muted">Здесь появится, какие тренировки вы проходите чаще всего.</p><a class="btn small" href="#train">К тренировкам</a>`}
    </div>
  </div>`;
}

// ---------- языки ----------
function langCard(l) {
  const x = l.sum, c = x.counts, tot = c.total || 1;
  return `
  <article class="lang-card ${x.current ? 'on' : ''}">
    <header><span class="code">${l.code}</span><b>${esc(l.name)}</b>${x.current ? '<em>сейчас изучаете</em>' : ''}</header>
    <div class="big"><b>${c.known}</b><span>${plural(c.known, 'слово изучено', 'слова изучено', 'слов изучено')} из ${c.total}</span></div>
    <div class="stack thin">${c.total ? [['learned', c.learned], ['due', c.due], ['learning', c.learning], ['new', c.new]].map(([k, v]) => v ? `<i class="${k}" style="flex:${v / tot}"></i>` : '').join('') : '<i class="empty-bar"></i>'}</div>
    <dl class="facts">
      <div><dt>Изучаются</dt><dd>${c.learning + c.new}</dd></div>
      <div><dt>Тексты</dt><dd>${x.textsRead} / ${x.texts}</dd></div>
      <div><dt>Уроки грамматики</dt><dd>${x.lessonsPassed} / ${x.lessons}</dd></div>
      <div><dt>XP за 30 дней</dt><dd>${x.xp30}</dd></div>
    </dl>
    ${x.current ? '<a class="btn ghost small" href="#train">К тренировкам</a>' : `<button class="btn ghost small" data-learn="${l.id}">Учить ${esc(l.acc)}</button>`}
  </article>`;
}
