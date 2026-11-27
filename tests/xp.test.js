import test from 'node:test';
import assert from 'node:assert/strict';

// game.js тянет браузерные модули — даём им минимальное окружение
// заглушка DOM: любой доступ к свойству или вызов возвращает ту же заглушку
const stub = new Proxy(function () {}, { get: (_, k) => k === Symbol.toPrimitive ? () => '' : stub, apply: () => stub, set: () => true });
globalThis.window ||= stub;
globalThis.document ||= stub;
const { store, emptyState } = await import('../public/js/store.js');
const { addXp, todayXp } = await import('../public/js/game.js');

// Регрессия: addXp падал с ReferenceError (переменная goal использовалась до объявления),
// и тренировки останавливались после первого верного ответа.
test('addXp начисляет опыт без ошибок, в том числе при выполнении дневной цели', () => {
  store.state = emptyState();
  store.save = () => {};
  store.state.goal = 5;
  assert.doesNotThrow(() => addXp(2));
  assert.doesNotThrow(() => addXp(4, 'тренировка'));
  assert.equal(store.state.xp, 6);
  assert.equal(todayXp(), 6);
});
