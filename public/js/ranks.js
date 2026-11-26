// Звания по уровню опыта: лестница «путешественника по джунглям» (названия придуманы для Лингвы).
export const RANKS = [
  { from: 1, title: 'Новичок на опушке' },
  { from: 3, title: 'Любопытный следопыт' },
  { from: 5, title: 'Шустрый собиратель слов' },
  { from: 7, title: 'Знаток лесных тропинок' },
  { from: 10, title: 'Смелый исследователь чащи' },
  { from: 13, title: 'Хранитель лиан' },
  { from: 16, title: 'Мудрый ёж-проводник' },
  { from: 20, title: 'Покоритель джунглей' },
  { from: 25, title: 'Повелитель слов' },
  { from: 30, title: 'Легенда тропического леса' },
  { from: 40, title: 'Великий магистр Лингвы' }
];

// Звание для уровня и следующее звание (или null на вершине)
export function rankFor(level) {
  let i = 0;
  while (i + 1 < RANKS.length && level >= RANKS[i + 1].from) i++;
  return { ...RANKS[i], index: i, next: RANKS[i + 1] || null };
}
