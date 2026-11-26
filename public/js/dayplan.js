// План на день: несколько заданий на сегодня по дневной цели, уровню и словарю ученика.
// Чистые функции без DOM и store — их можно проверять в Node.
// План хранится в state.plans[lang] = { date, goal, tasks, log, done, bonus } и строится заново каждый день.
//   log  — счётчики дня по языку: train (тренировки по словам), grammar (уроки и тренировки правил);
//   done — задания, за которые уже начислена награда; bonus — начислен ли бонус за весь план.

export const TASK_XP = 3;   // за каждое выполненное задание
export const PLAN_XP = 10;  // бонус, когда выполнен весь план

// Объём плана по дневной цели в XP (5, 10, 20, 30+ минут)
export function planSize(goal = 50) {
  if (goal <= 20) return { learn: 3, review: 10, train: 0, both: false };
  if (goal <= 50) return { learn: 5, review: 15, train: 0, both: true };
  if (goal <= 100) return { learn: 8, review: 25, train: 2, both: true };
  return { learn: 12, review: 40, train: 3, both: true };
}

const noonOf = date => new Date(date + 'T12:00:00');
export const dayStart = date => { const d = noonOf(date); d.setHours(0, 0, 0, 0); return d.getTime(); };
// День года: при короткой цели грамматика и чтение чередуются по дням
const dayNo = date => Math.round((noonOf(date) - noonOf(date.slice(0, 4) + '-01-01')) / 86400000);

const pl = (n, a, b, c) => { const m = n % 10, h = n % 100; return m === 1 && h !== 11 ? a : m >= 2 && m <= 4 && (h < 12 || h > 14) ? b : c; };

// Построить план. words — словарь текущего языка; gp — grammarPlan(); text — предложенный текст или null.
export function buildPlan({ date, goal, words = {}, gp = null, text = null, now = Date.now() }) {
  const size = planSize(goal);
  const list = Object.entries(words);
  const fresh = list.filter(([, w]) => !w.srs).length;
  const due = list.filter(([, w]) => w.srs && w.srs.due <= now).sort((a, b) => a[1].srs.due - b[1].srs.due);
  const tasks = [];

  tasks.push(fresh
    ? { id: 'learn', target: size.learn, title: `Выучить ${size.learn} ${pl(size.learn, 'новое слово', 'новых слова', 'новых слов')}`,
      sub: fresh < size.learn ? `В словаре ${fresh} ${pl(fresh, 'новое слово', 'новых слова', 'новых слов')} — добавьте ещё из наборов или текстов` : 'Слово выучено, когда пройдены все четыре тренировки или карточка «Помню»',
      href: '#train', icon: 'cards' }
    : { id: 'learn', target: size.learn, title: `Выучить ${size.learn} ${pl(size.learn, 'новое слово', 'новых слова', 'новых слов')}`,
      sub: 'Новых слов в словаре нет — начните с набора слов, а потом потренируйте их', href: '#sets', icon: 'sets' });

  if (due.length) {
    const keys = due.slice(0, size.review).map(([k]) => k);
    tasks.push({ id: 'review', target: keys.length, keys, title: `Повторить ${keys.length} ${pl(keys.length, 'слово', 'слова', 'слов')}`,
      sub: 'Слова, которые пора освежить в памяти', href: '#train-cards', icon: 'cards' });
  }

  const odd = dayNo(date) % 2 === 1;
  if (gp && (size.both || odd)) {
    tasks.push({ id: 'grammar', target: 1, href: gp.href, icon: 'grammar',
      title: gp.kind === 'review' ? `Повторить ${gp.count === 1 ? 'правило' : 'правила'} грамматики` : gp.kind === 'lesson' ? `Урок: ${gp.lesson.title}` : 'Потренировать грамматику',
      sub: gp.kind === 'review' ? `${gp.lesson.title}${gp.count > 1 ? ` и ещё ${gp.count - 1}` : ''}` : gp.kind === 'lesson' ? 'Следующий урок грамматики' : `Подтянуть правило: ${gp.lesson.title}` });
  }
  if (text && (size.both || !odd || !gp)) {
    tasks.push({ id: 'read', target: 1, href: `#read-${text.id}`, icon: 'read', textId: text.id,
      title: `Прочитать текст «${text.title}»`, sub: `${text.level}${text.topic ? ' · ' + text.topic : ''} · подойдёт и любой другой текст` });
  }
  if (size.train) {
    tasks.push({ id: 'train', target: size.train, href: '#train', icon: 'bolt',
      title: `Пройти ${size.train} ${pl(size.train, 'тренировку', 'тренировки', 'тренировок')}`, sub: 'Любые: по словам, Спринт, Водопад, кроссворд' });
  }
  return { date, goal, tasks };
}

// Сколько сделано по заданию. ctx: { words, readTexts, log, date }
export function progressOf(task, { words = {}, readTexts = {}, log = {}, date }) {
  const from = dayStart(date);
  let n = 0;
  switch (task.id) {
    case 'learn': n = Object.values(words).filter(w => w.learnedAt >= from).length; break;
    case 'review': n = task.keys.filter(k => { const w = words[k]; return !w || !w.srs || w.srs.last >= from; }).length; break;
    case 'read': n = Object.values(readTexts).some(t => t >= from) ? 1 : 0; break;
    case 'grammar': n = log.grammar || 0; break;
    case 'train': n = log.train || 0; break;
  }
  return Math.min(task.target, n);
}

// План на сегодня: старый план заменяется новым днём; при смене цели задания пересобираются,
// а отметки о наградах и счётчики дня сохраняются
export function ensurePlan(saved, input) {
  if (saved?.tasks && saved.date === input.date && saved.goal === input.goal) return saved;
  const keep = saved?.date === input.date ? saved : {};
  return { ...buildPlan(input), log: keep.log || {}, done: keep.done || {}, bonus: !!keep.bonus };
}

// Отметить выполненные задания. Возвращает { plan, items, newly, bonus, xp }: план не меняется на месте.
export function settle(plan, ctx) {
  const items = plan.tasks.map(t => ({ ...t, have: progressOf(t, ctx) })).map(t => ({ ...t, ok: t.have >= t.target }));
  const newly = items.filter(t => t.ok && !plan.done?.[t.id]).map(t => t.id);
  const all = items.length > 0 && items.every(t => t.ok);
  const bonus = all && !plan.bonus;
  const next = { ...plan, done: { ...plan.done, ...Object.fromEntries(newly.map(id => [id, true])) }, bonus: plan.bonus || all };
  return { plan: next, items, newly, bonus, xp: newly.length * TASK_XP + (bonus ? PLAN_XP : 0) };
}

// Счётчик дня в плане (тренировка или грамматика): если плана на сегодня ещё нет, заводим заготовку
export function bump(saved, date, kind) {
  const p = saved?.date === date ? { ...saved } : { date };
  p.log = { ...(p.log || {}), [kind]: (p.log?.[kind] || 0) + 1 };
  return p;
}
