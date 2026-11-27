import test from 'node:test';
import assert from 'node:assert/strict';
import * as D from '../public/js/grammar-drill.js';
import { ALL_LESSONS as EN } from '../public/js/data/grammar.js';
import { ALL_LESSONS as TR } from '../public/js/data/tr/grammar.js';
import { ALL_LESSONS as EL } from '../public/js/data/el/grammar.js';
import { ALL_LESSONS as KRC } from '../public/js/data/krc/grammar.js';
import { ALL_LESSONS as DE } from '../public/js/data/de/grammar.js';
import { lower as trLower } from '../public/js/data/tr/dictionary.js';
import { lower as elLower } from '../public/js/data/el/dictionary.js';
import { lower as krcLower } from '../public/js/data/krc/dictionary.js';
import { lower as deLower } from '../public/js/data/de/dictionary.js';

const DAY = 86400000;
const LANGS = {
  en: { lessons: EN, letters: 'A-Za-z', tokenRe: /[A-Za-z’'-]+/g, lower: s => s.toLowerCase() },
  tr: { lessons: TR, letters: 'A-Za-zÇçĞğİıÖöŞşÜüÂâÎîÛû', tokenRe: /[A-Za-zÇçĞğİıÖöŞşÜüÂâÎîÛû’'-]+/g, lower: trLower },
  el: { lessons: EL, letters: 'Α-ΩΆΈΉΊΌΎΏΪΫα-ωάέήίόύώϊϋΐΰ', tokenRe: /[Α-ΩΆΈΉΊΌΎΏΪΫα-ωάέήίόύώϊϋΐΰ’'-]+/g, lower: elLower },
  de: { lessons: DE, letters: 'A-Za-zÄÖÜäöüß', tokenRe: /[A-Za-zÄÖÜäöüß’'-]+/g, lower: deLower },
  krc: { lessons: KRC, letters: 'А-Яа-яЁёЎў', tokenRe: /[А-Яа-яЁёЎў’'-]+/g, lower: krcLower }
};
const seq = (...v) => { let i = 0; return () => v[i++ % v.length]; };

test('Разбор вопроса: пропуск, подсказки в скобках и русский контекст', () => {
  assert.deepEqual(D.parseGap('Ben hasta___. (я болен)'), { sent: 'Ben hasta___.', ctx: '', hints: ['я болен'], arrow: false });
  const krc = D.parseGap('Я живу в Нальчике: Мен Нальчик___ джашайма.');
  assert.equal(krc.sent, 'Мен Нальчик___ джашайма.');
  assert.equal(krc.ctx, 'Я живу в Нальчике');
  assert.equal(D.parseGap('Если я пойду — бар___').sent, 'бар___');
  assert.equal(D.parseGap('Yesterday I ___ (buy) some fresh fish.').sent, 'Yesterday I ___ some fresh fish.');
  assert.ok(D.parseGap('γράφω → ___! (напиши)').arrow);
  assert.equal(D.parseGap('Как будет 100?'), null);
});

test('«Фраза по правилу»: слова верной фразы и лишнее слово с неверной формой', () => {
  const lesson = { id: 'x', title: 'X', exercises: [] };
  const it = D.makeItem(lesson, { type: 'choice', q: 'Dün sinemaya git___.', options: ['tim', 'dim', 'tum'], a: 'tim' }, 'build', { rnd: seq(0) });
  assert.deepEqual(it.words, ['Dün', 'sinemaya', 'gittim']);
  assert.equal(it.end, '.');
  assert.deepEqual(it.extra, ['gitdim']);
  // «—» в уроке об артиклях — «без артикля»
  const art = D.makeItem(lesson, { type: 'choice', q: '___ moon is beautiful tonight.', options: ['A', 'The', '—'], a: 'The' }, 'build', { rnd: seq(0.9) });
  assert.deepEqual(art.words, ['The', 'moon', 'is', 'beautiful', 'tonight']);
  assert.deepEqual(art.extra, ['Moon']); // вариант «без артикля»
  const inp = D.makeItem(lesson, { type: 'input', q: 'Yesterday I ___ (buy) some fresh fish.', a: 'bought' }, 'build', { letters: 'A-Za-z' });
  assert.deepEqual(inp.extra, ['buy']);
  // слишком короткое или без предложения — не годится
  assert.equal(D.makeItem(lesson, { type: 'choice', q: 'кёз → кёз___', options: ['ла', 'ле'], a: 'ле' }, 'build'), null);
});

test('«Найди ошибку»: верная или неверная форма на месте пропуска', () => {
  const lesson = { id: 'x', title: 'X', exercises: [] };
  const ex = { type: 'choice', q: 'They ___ at the museum.', options: ['is', 'are', 'am'], a: 'are' };
  const good = D.makeItem(lesson, ex, 'spot', { rnd: seq(0.1) });
  assert.equal(good.ok, true); assert.equal(good.shown, 'are');
  const bad = D.makeItem(lesson, ex, 'spot', { rnd: seq(0.9, 0) });
  assert.equal(bad.ok, false); assert.equal(bad.shown, 'is');
  assert.equal(bad.right, 'They are at the museum.');
  assert.equal(D.makeItem(lesson, { type: 'input', q: 'We ___ not friends.', a: 'are' }, 'spot'), null);
});

for (const [id, x] of Object.entries(LANGS)) {
  test(`Тренировки по грамматике есть для всех уроков: ${id}`, () => {
    for (const l of x.lessons) assert.ok(D.lessonItems(l, 'form').length, l.id);
    const count = k => x.lessons.reduce((n, l) => n + D.lessonItems(l, k, { letters: x.letters }).length, 0);
    assert.ok(count('build') >= 30, `build: ${count('build')}`);
    assert.ok(count('spot') >= 30, `spot: ${count('spot')}`);
    for (const l of x.lessons) for (const it of D.lessonItems(l, 'build', { letters: x.letters })) {
      assert.ok(!it.words.some(w => w.includes('___')), it.right);
      assert.ok(it.words.length >= 3 && it.words.length <= 10);
    }
    const s = D.buildSession(x.lessons.slice(0, 5), 'mix', { size: 12, letters: x.letters });
    assert.equal(s.length, 12);
    assert.ok(new Set(s.map(i => i.lesson)).size >= 3, 'правила чередуются');
  });

  test(`Правила в текстах: словоформы из упражнений ведут к урокам: ${id}`, () => {
    const idx = D.ruleIndex(x.lessons, x.letters, x.lower);
    assert.ok(idx.size >= 20, `index: ${idx.size}`);
    for (const [w, ids] of idx) { assert.ok(!w.includes('_')); for (const lid of ids) assert.ok(x.lessons.some(l => l.id === lid)); }
  });
}

test('Слова-подсказки: конкретные формы связаны с нужными уроками', () => {
  const en = D.ruleIndex(EN, 'A-Za-z');
  assert.ok(en.get('are').includes('to-be'));
  assert.ok(en.get('the').includes('articles'));
  const krc = D.ruleIndex(KRC, 'А-Яа-яЁёЎў', krcLower);
  assert.ok([...krc.keys()].some(w => w.endsWith('де')));
  const found = D.rulesInText('They are at home. The cat is black. I went to a shop.', en, /[A-Za-z’'-]+/g);
  assert.ok(found.some(r => r.id === 'to-be'));
  assert.ok(found.some(r => r.id === 'articles'));
  assert.ok(found.length <= 3);
});

test('Повторение правил: карточка после урока, оценка по ответам, забытое — завтра', () => {
  const now = Date.UTC(2026, 10, 26, 12);
  const lessons = EN.slice(0, 3);
  const g = { 'to-be': { best: 100, passed: true, at: now - 3 * DAY }, 'present-simple': { best: 50, passed: false, at: now } };
  assert.equal(D.ensureCards(lessons, g, now), true);
  assert.equal(g['to-be'].srs.due, now - 2 * DAY);
  assert.equal(g['present-simple'].srs, undefined);
  assert.deepEqual(D.dueLessons(lessons, g, now).map(l => l.id), ['to-be']);
  assert.equal(D.gradeFor(3, 3), 2); assert.equal(D.gradeFor(2, 3), 1); assert.equal(D.gradeFor(1, 3), 0);
  D.reviewLesson(g, 'to-be', 3, 3, now);
  assert.ok(g['to-be'].srs.due > now);
  assert.equal(D.dueLessons(lessons, g, now).length, 0);
  D.reviewLesson(g, 'to-be', 0, 3, now + 10 * DAY);
  assert.equal(g['to-be'].srs.due, now + 11 * DAY);
  assert.equal(D.ruleStrength(g['to-be'], now + 12 * DAY), 'weak');
  // урок впервые сдан — первая карточка на завтра
  g['present-simple'].passed = true;
  D.lessonDone(g, 'present-simple', 5, 6, now);
  assert.equal(g['present-simple'].srs.due, now + DAY);
});

test('План на день и сводка: повторение важнее нового урока', () => {
  const now = Date.UTC(2026, 10, 26, 12);
  const lessons = EN.slice(0, 3);
  assert.deepEqual(D.grammarPlan(lessons, {}, now), { kind: 'lesson', lesson: lessons[0], href: '#lesson-to-be' });
  const g = { 'to-be': { best: 80, passed: true, at: now - 5 * DAY } };
  D.ensureCards(lessons, g, now);
  const p = D.grammarPlan(lessons, g, now);
  assert.equal(p.kind, 'review'); assert.equal(p.href, '#gtrain-review'); assert.equal(p.count, 1);
  D.reviewLesson(g, 'to-be', 3, 3, now);
  assert.equal(D.grammarPlan(lessons, g, now).lesson.id, 'present-simple');
  const all = Object.fromEntries(lessons.map(l => [l.id, { best: l.id === 'present-continuous' ? 70 : 95, passed: true, at: now, srs: { due: now + DAY, ivl: 40, ef: 2.5, reps: 4, lapses: 0, last: now } }]));
  assert.equal(D.grammarPlan(lessons, all, now).kind, 'practice');
  assert.equal(D.grammarPlan(lessons, all, now).href, '#gtrain-mix.present-continuous');
  const sum = D.grammarSummary(lessons, all, now);
  assert.equal(sum.passed, 3); assert.equal(sum.by.strong, 3); assert.equal(sum.due, 0);
  assert.deepEqual(sum.weakest.map(l => l.id), ['present-continuous']);
});
