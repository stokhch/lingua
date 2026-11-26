// «План на день» на главной: задания на сегодня, отметки о выполнении и награда опытом (Пим сыт).
import { store } from '../store.js';
import { esc, icon } from '../ui.js';
import * as G from '../game.js';
import { L } from '../lang.js';
import { myLevel } from './placement.js';
import { pickByLevel } from '../placement.js';
import { grammarState } from './grammar-train.js';
import { grammarPlan } from '../grammar-drill.js';
import { ensurePlan, settle, PLAN_XP, TASK_XP } from '../dayplan.js';

function suggestText() {
  const s = store.state, unread = L().TEXTS.filter(t => !s.readTexts[t.id]);
  if (!unread.length) return null;
  return myLevel() ? pickByLevel(unread, myLevel(), 1)[0] : unread[0];
}

// План на сегодня для текущего языка: строим при первом заходе за день и начисляем награды за выполненное
export function todayPlan() {
  const s = store.state, lang = s.lang || 'en', date = G.today();
  const saved = s.plans?.[lang];
  let plan = saved;
  if (!(saved?.tasks && saved.date === date && saved.goal === s.goal)) {
    const { lessons, g } = grammarState();
    plan = ensurePlan(saved, { date, goal: s.goal, words: s.words, gp: lessons.length ? grammarPlan(lessons, g) : null, text: suggestText() });
  }
  const r = settle(plan, { words: s.words, readTexts: s.readTexts, log: plan.log, date });
  if (r.plan !== saved) s.plans = { ...(s.plans || {}), [lang]: r.plan };
  if (r.xp) G.addXp(r.xp, r.bonus ? 'план на день выполнен' : r.newly.length > 1 ? 'задания плана выполнены' : 'задание плана выполнено');
  else if (r.plan !== saved) store.save();
  return r;
}

export function dayPlanHtml() {
  const { items } = todayPlan();
  if (!items.length) return '';
  const done = items.filter(t => t.ok).length, all = done === items.length;
  return `<section class="band day-plan${all ? ' complete' : ''}" id="day-plan">
    <div class="plan-head">${icon('check')}<div><h2>План на день</h2><p class="muted">${all ? `Всё выполнено — бонус +${PLAN_XP} XP получен, Пим доволен. Завтра будет новый план.` : `Выполнено ${done} из ${items.length}. За каждое задание +${TASK_XP} XP, за весь план ещё +${PLAN_XP} XP — Пиму на яблоки.`}</p></div>
      <span class="plan-count" aria-label="Выполнено ${done} из ${items.length}"><b>${done}</b>/${items.length}</span></div>
    <i class="bar plan-bar"><i style="width:${Math.round((done / items.length) * 100)}%"></i></i>
    <ol class="plan-list">${items.map(t => `<li class="${t.ok ? 'ok' : ''}">
      <a href="${esc(t.href)}"><span class="tick" aria-hidden="true">${t.ok ? icon('check') : icon(t.icon)}</span>
      <span class="what"><b>${esc(t.title)}</b><span>${esc(t.sub)}</span></span>
      <span class="have">${t.ok ? 'готово' : t.target > 1 ? `${t.have} / ${t.target}` : 'сделать'}</span></a></li>`).join('')}</ol>
    <p class="muted small">Объём плана зависит от дневной цели (${store.state.goal} XP) — её можно поменять в <a href="#profile">профиле</a>.</p>
  </section>`;
}
