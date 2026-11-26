// Логика адаптивного теста на уровень (без DOM — проверяется в tests/placement.test.js).
// Слова идут блоками по уровням. Начинаем со второго уровня (A2). Блок засчитан, если верно ≥ PASS из BLOCK.
// Засчитан — поднимаемся выше, не засчитан — опускаемся. Тест заканчивается, когда найдена граница:
// уровень пройден, а следующий за ним — нет (или пройден самый верхний / провален самый нижний).
export const BLOCK = 4;
export const PASS = 3;

// levels — список уровней по возрастанию, blocks — [{ i: индекс уровня, passed: bool }] в порядке прохождения.
// Возвращает { next: индекс } или { done: true, level: 'B1' | 'A0' }.
export function nextStep(levels, blocks) {
  if (!blocks.length) return { next: Math.min(1, levels.length - 1) };
  const result = (i, p) => blocks.find(b => b.i === i && b.passed === p);
  const last = blocks[blocks.length - 1];
  if (last.passed) {
    if (last.i === levels.length - 1 || result(last.i + 1, false)) return { done: true, level: levels[last.i] };
    return { next: last.i + 1 };
  }
  if (last.i === 0) return { done: true, level: 'A0' };
  if (result(last.i - 1, true)) return { done: true, level: levels[last.i - 1] };
  return { next: last.i - 1 };
}

const ORDER = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
export const levelRank = lv => ORDER.indexOf(String(lv).slice(0, 2));

// Подходящие материалы: того же уровня, а если таких нет — ближайшие ниже, затем выше.
export function pickByLevel(items, level, n = 3) {
  const r = levelRank(level);
  const score = it => { const d = levelRank(it.level) - r; return d === 0 ? 0 : d < 0 ? -d * 2 - 1 : d * 2; };
  return [...items].sort((a, b) => score(a) - score(b)).slice(0, n);
}
