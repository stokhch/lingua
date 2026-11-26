// Поздравления и подарки между учениками: общие данные клиента и сервера (без зависимостей).
// Подарки — только встроенные картинки (SVG ниже): своих картинок загрузить нельзя, поэтому в подарке
// не может оказаться ничего неподобающего.

// Названия достижений — те же id, что в BADGES (game.js); сервер проверяет, что у получателя оно есть
export const BADGE_TITLES = {
  'first-word': 'Первое слово', 'words-50': 'Коллекционер', 'words-200': 'Ходячий словарь', 'learned-10': 'Десятка',
  'streak-3': 'Разгон', 'streak-7': 'Неделя без пропусков', 'streak-30': 'Железная воля', perfect: 'Без ошибок',
  reader: 'Читатель', bookworm: 'Книжный червь', grammar: 'Грамотей', 'xp-1000': 'Тысячник'
};

// Готовые слова для поздравления (можно дописать своё)
export const CHEERS = ['Поздравляю! 🎉', 'Так держать!', 'Вот это да! Молодец!', 'Горжусь тобой!', 'Ты лучше всех!', 'Вперёд к новым словам!'];

const svg = body => `<svg viewBox="0 0 64 64" aria-hidden="true">${body}</svg>`;

export const GIFTS = [
  { id: 'apple', title: 'Яблоко для Пима', svg: svg('<path d="M32 18c-9-6-22-1-22 14 0 13 9 24 16 24 3 0 4-2 6-2s3 2 6 2c7 0 16-11 16-24 0-15-13-20-22-14z" fill="#e5484d"/><path d="M22 26c-4 2-5 7-5 10" stroke="#fff" stroke-opacity=".6" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M32 19c0-6 2-10 5-12" stroke="#6b4423" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M34 14c4-6 12-6 14-4-3 6-10 7-14 4z" fill="#46a758"/>') },
  { id: 'flowers', title: 'Букет', svg: svg('<path d="M32 34 26 58h12z" fill="#8ec5ff"/><path d="M32 34v-8M32 34l-9-8M32 34l9-8" stroke="#46a758" stroke-width="3"/><g fill="#ff8fab"><circle cx="20" cy="22" r="6"/><circle cx="44" cy="22" r="6"/></g><g fill="#ffd166"><circle cx="32" cy="16" r="7"/></g><circle cx="32" cy="16" r="3" fill="#e5484d"/><circle cx="20" cy="22" r="2.5" fill="#fff"/><circle cx="44" cy="22" r="2.5" fill="#fff"/><path d="M26 44h12" stroke="#fff" stroke-width="2"/>') },
  { id: 'cake', title: 'Торт', svg: svg('<rect x="12" y="34" width="40" height="20" rx="4" fill="#f4a261"/><path d="M12 40c4 4 8-2 12 2s8-2 12 2 8-2 12 2 4-2 4-2v-6H12z" fill="#fff"/><rect x="10" y="53" width="44" height="4" rx="2" fill="#c47d3a"/><g stroke="#8ec5ff" stroke-width="3"><path d="M22 34v-9M32 34v-11M42 34v-9"/></g><g fill="#ffd166"><path d="M22 25c-2-3 0-6 0-6s2 3 0 6z"/><path d="M32 23c-2-3 0-6 0-6s2 3 0 6z"/><path d="M42 25c-2-3 0-6 0-6s2 3 0 6z"/></g><g fill="#e5484d"><circle cx="20" cy="46" r="2"/><circle cx="32" cy="48" r="2"/><circle cx="44" cy="46" r="2"/></g>') },
  { id: 'medal', title: 'Медаль', svg: svg('<path d="M20 6h10l6 16h-10zM44 6H34l-6 16h10z" fill="#4f8ef7"/><circle cx="32" cy="40" r="16" fill="#f5b700"/><circle cx="32" cy="40" r="11" fill="#ffd166"/><path d="m32 32 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" fill="#f5b700"/>') },
  { id: 'cup', title: 'Кубок', svg: svg('<path d="M18 10h28v12c0 10-6 17-14 17s-14-7-14-17z" fill="#f5b700"/><path d="M18 14H10c0 8 4 12 9 12M46 14h8c0 8-4 12-9 12" stroke="#f5b700" stroke-width="4" fill="none"/><path d="M28 38h8v8h-8z" fill="#d99a00"/><rect x="20" y="46" width="24" height="10" rx="2" fill="#6b4423"/><path d="M25 16c0 6 2 10 5 12" stroke="#fff" stroke-opacity=".6" stroke-width="3" fill="none" stroke-linecap="round"/>') },
  { id: 'heart', title: 'Сердечко', svg: svg('<path d="M32 56S8 42 8 24c0-8 6-14 13-14 5 0 9 3 11 7 2-4 6-7 11-7 7 0 13 6 13 14 0 18-24 32-24 32z" fill="#ff5c8a"/><path d="M17 20c-2 3-2 6-1 9" stroke="#fff" stroke-opacity=".7" stroke-width="3" fill="none" stroke-linecap="round"/>') },
  { id: 'star', title: 'Звезда', svg: svg('<path d="m32 5 8 17 18 2-13 13 4 19-17-9-17 9 4-19L6 24l18-2z" fill="#ffd166" stroke="#f5b700" stroke-width="3" stroke-linejoin="round"/><circle cx="26" cy="30" r="2.5" fill="#6b4423"/><circle cx="38" cy="30" r="2.5" fill="#6b4423"/><path d="M27 37q5 4 10 0" stroke="#6b4423" stroke-width="2.5" fill="none" stroke-linecap="round"/>') },
  { id: 'book', title: 'Книга', svg: svg('<path d="M6 14c9-3 18-3 26 2v38c-8-5-17-5-26-2z" fill="#4f8ef7"/><path d="M58 14c-9-3-18-3-26 2v38c8-5 17-5 26-2z" fill="#3a6fd1"/><path d="M11 22c6-1 11 0 16 2M11 30c6-1 11 0 16 2M37 24c5-2 10-3 16-2M37 32c5-2 10-3 16-2" stroke="#fff" stroke-opacity=".7" stroke-width="2" fill="none"/>') },
  { id: 'rocket', title: 'Ракета', svg: svg('<path d="M32 4c10 8 13 20 10 34H22C19 24 22 12 32 4z" fill="#e9ecf5" stroke="#8a94a6" stroke-width="2"/><circle cx="32" cy="22" r="5" fill="#4f8ef7" stroke="#8a94a6" stroke-width="2"/><path d="M22 30l-8 10v8l9-6zM42 30l8 10v8l-9-6z" fill="#e5484d"/><path d="M26 40h12l-3 10h-6z" fill="#ffd166"/><path d="M29 50h6l-3 10z" fill="#f4a261"/>') },
  { id: 'sun', title: 'Солнышко', svg: svg('<g stroke="#f5b700" stroke-width="4" stroke-linecap="round"><path d="M32 4v8M32 52v8M4 32h8M52 32h8M12 12l6 6M46 46l6 6M12 52l6-6M46 18l6-6"/></g><circle cx="32" cy="32" r="14" fill="#ffd166"/><circle cx="27" cy="30" r="2" fill="#6b4423"/><circle cx="37" cy="30" r="2" fill="#6b4423"/><path d="M26 36q6 5 12 0" stroke="#6b4423" stroke-width="2.5" fill="none" stroke-linecap="round"/>') },
  { id: 'hedgehog', title: 'Ёжик', svg: svg('<path d="M8 44c0-16 10-28 26-28 12 0 22 8 22 20 0 6-4 12-10 12H14c-4 0-6-2-6-4z" fill="#8b5e3c"/><g stroke="#5c3b22" stroke-width="2.5" stroke-linecap="round"><path d="M16 30l-6-4M22 22l-4-7M31 18l-1-8M40 19l3-7M47 24l6-5"/></g><path d="M44 48c-8 0-12-6-12-12 4 0 10-2 14-6 6 2 10 7 10 12 0 3-4 6-12 6z" fill="#f2d6b3"/><circle cx="46" cy="38" r="2.2" fill="#2b2b2b"/><circle cx="56" cy="42" r="2.5" fill="#2b2b2b"/><circle cx="22" cy="50" r="3" fill="#5c3b22"/><circle cx="38" cy="50" r="3" fill="#5c3b22"/>') },
  { id: 'balloons', title: 'Шарики', svg: svg('<path d="M22 34c2 8-2 14 6 26M42 32c-2 10 2 16-8 28M32 30v30" stroke="#8a94a6" stroke-width="1.5" fill="none"/><ellipse cx="20" cy="20" rx="10" ry="13" fill="#4f8ef7"/><ellipse cx="44" cy="18" rx="10" ry="13" fill="#e5484d"/><ellipse cx="32" cy="24" rx="9" ry="12" fill="#ffd166"/><path d="M15 13c-2 2-2 5-1 7M39 11c-2 2-2 5-1 7" stroke="#fff" stroke-opacity=".7" stroke-width="2.5" fill="none" stroke-linecap="round"/>') }
];

export const giftById = id => GIFTS.find(g => g.id === id);
