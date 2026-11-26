// Грамматика в ежедневной практике: тренировки по правилам из уроков, интервальное повторение правил,
// подсказки «какое правило в этом тексте» и сводка для страницы «Прогресс».
// Только чистые функции без DOM и store: задания строятся из упражнений уроков любого языка.
import { newCard, review, isDue } from './srs.js';

const DAY = 86400000;
const GAP = '___';

// ---------- разбор упражнения ----------
// Вопрос «Ben hasta___. (я болен)» → предложение с пропуском, подсказки в скобках и контекст
// (перевод по-русски перед двоеточием, реплика собеседника).
export function parseGap(q) {
  if (!q || !q.includes(GAP)) return null;
  const hints = [];
  const s = q.replace(/\s*\(([^()]*)\)/g, (_, h) => { hints.push(h.trim()); return ''; }).trim();
  const parts = s.split(/(?<=[.!?:;…])\s+/);
  const k = parts.findIndex(p => p.includes(GAP));
  // «Если я пойду — бар___»: часть с пропуском отделяем от русского пояснения через тире
  const dash = parts[k].replace(/^[—–-]\s*/, '').split(/\s+[—–]\s+/);
  const j = dash.findIndex(p => p.includes(GAP));
  const sent = dash[j].trim();
  const ctx = [...parts.slice(0, k), ...dash.slice(0, j), ...dash.slice(j + 1), ...parts.slice(k + 1)].join(' ').replace(/[:—–]$/, '').trim();
  return { sent, ctx, hints, arrow: /[→=]/.test(sent) };
}

const first = a => String(a).split('/')[0].trim();
// Подставить ответ в пропуск. «—» в уроке об артиклях значит «без артикля».
export const fill = (sent, v) => (v === '—' ? sent.replace(/___\s*/, '').replace(/^./, c => c.toUpperCase()) : sent.replace(GAP, v));
const splitEnd = s => { const end = (s.match(/[.!?…;]+$/) || [''])[0]; return { body: s.slice(0, s.length - end.length).trim(), end }; };
const words = s => splitEnd(s).body.split(/\s+/).filter(Boolean);

// В предложении есть буквы изучаемого языка (а не одно русское пояснение)
function inLang(sent, letters) {
  if (!letters) return true;
  return new RegExp(`[${letters}]`).test(sent.replace(GAP, ''));
}

// ---------- задания ----------
// kind: form — выбрать или вписать форму (как в уроке), spot — верна ли фраза, build — собрать фразу из слов
export function makeItem(lesson, ex, kind, { rnd = Math.random, letters } = {}) {
  const base = { kind, lesson: lesson.id, title: lesson.title };
  if (kind === 'form') return { ...base, q: ex.q, type: ex.type, options: ex.options, a: ex.a };
  const p = parseGap(ex.q);
  if (!p || p.arrow || !inLang(p.sent, letters)) return null;
  const a = first(ex.a);
  const right = fill(p.sent, a);
  const wrongs = (ex.options || []).filter(o => o !== ex.a && first(o) !== a);
  if (kind === 'spot') {
    if (ex.type !== 'choice' || !wrongs.length || words(right).length < 2) return null;
    const ok = rnd() < 0.5;
    const shown = ok ? a : wrongs[Math.floor(rnd() * wrongs.length)];
    const at = p.sent.indexOf(GAP);
    return { ...base, ok, right, ctx: p.ctx, hints: p.hints, before: p.sent.slice(0, at), shown: shown === '—' ? '' : shown, after: p.sent.slice(at + GAP.length) };
  }
  if (kind === 'build') {
    const target = words(right);
    if (target.length < 3 || target.length > 10) return null;
    // лишние плитки — слова из неверного варианта: собрать фразу можно, только зная правило
    const extra = [];
    if (wrongs.length) {
      const w = wrongs[Math.floor(rnd() * wrongs.length)];
      const pool = [...target];
      for (const t of words(fill(p.sent, w))) { const i = pool.indexOf(t); if (i >= 0) pool.splice(i, 1); else extra.push(t); }
    }
    // в задании без вариантов лишним словом становится начальная форма из подсказки: «(go)» → go
    if (!extra.length) {
      const h = p.hints.find(x => /^\S+$/.test(x) && (!letters || new RegExp(`^[${letters}'’-]+$`).test(x)));
      if (h && !target.includes(h)) extra.push(h);
    }
    return { ...base, words: target, end: splitEnd(right).end, extra: extra.slice(0, 2), ctx: p.ctx, hints: p.hints, right };
  }
  return null;
}

const shuffleWith = (a, rnd) => { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };

// Все задания вида kind из урока
export function lessonItems(lesson, kind, opts = {}) {
  return lesson.exercises.map(ex => makeItem(lesson, ex, kind, opts)).filter(Boolean);
}

// Задания из нескольких уроков вперемешку: по очереди из каждого урока, чтобы правила чередовались.
// kind 'mix' — для каждого урока поровну форм, фраз и проверок.
export function buildSession(lessons, kind, { size = 10, rnd = Math.random, letters } = {}) {
  const kinds = kind === 'mix' ? ['build', 'spot', 'form'] : [kind];
  const queues = shuffleWith(lessons, rnd).map(l => {
    const per = kinds.map(k => shuffleWith(lessonItems(l, k, { rnd, letters }), rnd));
    const out = [];
    // чередуем виды, но не повторяем одно упражнение в разных видах подряд
    for (let i = 0; out.length < l.exercises.length * kinds.length && per.some(q => q.length); i++) {
      const q = per[i % per.length]; if (q.length) out.push(q.shift());
    }
    return out;
  }).filter(q => q.length);
  const items = [];
  while (items.length < size && queues.some(q => q.length)) {
    for (const q of queues) { if (q.length && items.length < size) items.push(q.shift()); }
  }
  return items;
}

// ---------- интервальное повторение правил ----------
// Пройденный урок получает карточку SM-2 в store.state.grammar[id].srs. Старые пройденные уроки без
// карточки получают её задним числом: первое повторение — через день после прохождения.
export function ensureCards(lessons, grammar, now = Date.now()) {
  let changed = false;
  for (const l of lessons) {
    const g = grammar[l.id];
    if (g?.passed && !g.srs) { g.srs = newCard(Math.min(now, g.at || now)); changed = true; }
  }
  return changed;
}

export const dueLessons = (lessons, grammar, now = Date.now()) =>
  lessons.filter(l => isDue(grammar[l.id]?.srs, now)).sort((a, b) => grammar[a.id].srs.due - grammar[b.id].srs.due);

// Оценка по доле верных ответов: всё верно — «Помню», от 60% — «Трудно», меньше — «Не помню»
export const gradeFor = (right, total) => (!total ? 1 : right === total ? 2 : right / total >= 0.6 ? 1 : 0);

export function reviewLesson(grammar, id, right, total, now = Date.now()) {
  const g = grammar[id] ||= { best: 0, passed: false, at: now };
  const grade = gradeFor(right, total);
  g.srs = review(g.srs, grade, now);
  // забытое правило возвращается завтра, а не через 10 минут, как слово
  if (grade === 0) g.srs.due = now + DAY;
  return grade;
}

// Урок пройден заново: первая карточка или повторение, если правило уже пора было освежить
export function lessonDone(grammar, id, right, total, now = Date.now()) {
  const g = grammar[id];
  if (!g?.passed) return;
  if (!g.srs) g.srs = newCard(now);
  else if (isDue(g.srs, now)) reviewLesson(grammar, id, right, total, now);
}

// Прочность правила: new — не начато, weak — не сдано или забыто, fresh — до недели, solid — до месяца, strong — дольше
export function ruleStrength(g, now = Date.now()) {
  if (!g) return 'new';
  if (!g.passed) return 'weak';
  if (!g.srs) return 'fresh';
  if (isDue(g.srs, now) && g.srs.lapses) return 'weak';
  return g.srs.ivl >= 30 ? 'strong' : g.srs.ivl >= 7 ? 'solid' : 'fresh';
}
export const STRENGTH_LABEL = { new: 'Не начато', weak: 'Нужно подтянуть', fresh: 'Свежее', solid: 'Закрепляется', strong: 'Прочно' };

export function grammarSummary(lessons, grammar = {}, now = Date.now()) {
  const by = { new: 0, weak: 0, fresh: 0, solid: 0, strong: 0 };
  let best = 0, started = 0, passed = 0;
  for (const l of lessons) {
    const g = grammar[l.id];
    by[ruleStrength(g, now)]++;
    if (g) { started++; best += g.best || 0; }
    if (g?.passed) passed++;
  }
  const weakest = lessons.filter(l => grammar[l.id] && (grammar[l.id].best || 0) < 90)
    .sort((a, b) => (grammar[a.id].best || 0) - (grammar[b.id].best || 0)).slice(0, 3);
  return { total: lessons.length, passed, started, due: dueLessons(lessons, grammar, now).length, avg: started ? Math.round(best / started) : 0, by, weakest };
}

// Что делать с грамматикой сегодня: повторить правила, пройти следующий урок или подтянуть слабое
export function grammarPlan(lessons, grammar = {}, now = Date.now()) {
  const due = dueLessons(lessons, grammar, now);
  if (due.length) return { kind: 'review', count: due.length, lesson: due[0], href: '#gtrain-review' };
  const next = lessons.find(l => !grammar[l.id]?.passed);
  if (next) return { kind: 'lesson', lesson: next, href: `#lesson-${next.id}` };
  const weak = lessons.filter(l => grammar[l.id]).sort((a, b) => (grammar[a.id].best || 0) - (grammar[b.id].best || 0))[0] || lessons[0];
  return { kind: 'practice', lesson: weak, href: `#gtrain-mix.${weak.id}` };
}

// ---------- правила в текстах ----------
// Словоформы из ответов упражнений → уроки. «Мен Нальчик___ джашайма» + «де» даёт «нальчикде»,
// «They ___ at the museum» + «are» — «are». По ним текст и слово в окне перевода ссылаются на урок.
export function ruleIndex(lessons, letters, lower = s => s.toLowerCase()) {
  const idx = new Map();
  const run = `[${letters}'’-]`;
  const whole = new RegExp(`^${run}+$`), lead = new RegExp(`${run}*$`), tail = new RegExp(`^${run}*`);
  const add = (w, l) => {
    w = lower(w).replace(/^['’-]+|['’-]+$/g, '');
    if (!w || !whole.test(w)) return;
    const list = idx.get(w) || [];
    if (!list.includes(l.id)) list.push(l.id);
    idx.set(w, list);
  };
  for (const l of lessons) for (const ex of l.exercises) {
    const a = first(ex.a);
    if (!a || a === '—' || /\s/.test(a)) continue;
    const p = parseGap(ex.q);
    if (!p) { if (ex.type === 'choice' && whole.test(a)) add(a, l); continue; }
    if (p.arrow || !inLang(p.sent, letters)) continue;
    const at = p.sent.indexOf(GAP);
    add(p.sent.slice(0, at).match(lead)[0] + a + p.sent.slice(at + GAP.length).match(tail)[0], l);
  }
  return idx;
}

// Какие правила встречаются в тексте: до max уроков, где совпало больше всего разных слов
export function rulesInText(text, index, tokenRe, lower = s => s.toLowerCase(), max = 3) {
  const hits = new Map();
  for (const m of String(text).matchAll(new RegExp(tokenRe.source, 'g'))) {
    const w = lower(m[0]);
    for (const id of index.get(w) || []) {
      const h = hits.get(id) || { id, words: new Set(), n: 0 };
      h.words.add(w); h.n++; hits.set(id, h);
    }
  }
  return [...hits.values()].sort((a, b) => b.words.size - a.words.size || b.n - a.n).slice(0, max)
    .map(h => ({ id: h.id, words: [...h.words].slice(0, 4), n: h.n }));
}
