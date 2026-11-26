// Свои материалы: добавление и правка текста, песни, субтитров или видео с субтитрами.
import { store } from '../store.js';
import { esc, $, modal, toast } from '../ui.js';
import { L } from '../lang.js';
import { KINDS, MAX_BODY, MAX_ITEMS, parseSubtitles, youtubeId, estimateLevel } from '../materials.js';

const LEVELS = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1'];

export function openMaterialEditor(existing, onSave) {
  const s = store.state;
  s.materials ||= {};
  if (!existing && Object.keys(s.materials).length >= MAX_ITEMS) { toast(`Можно хранить до ${MAX_ITEMS} своих материалов на язык — удалите ненужные`); return; }
  const m = existing || { kind: 'text', level: 'auto', topic: '', title: '', body: '', video: '', source: '' };
  modal(`<h2>${existing ? 'Изменить материал' : 'Свой материал'}</h2>
    <p class="muted">${L().name}. Вставьте текст статьи, книги, песни или субтитры (.srt/.vtt — таймкоды уберутся сами). Слова в нём станут кликабельными, как в библиотеке.</p>
    <form class="mat-form" id="mat-form">
      <label>Название<input name="title" maxlength="80" required value="${esc(m.title)}" placeholder="Например: моя любимая песня"></label>
      <div class="mat-row">
        <label>Формат<select name="kind">${Object.entries(KINDS).map(([k, t]) => `<option value="${k}" ${m.kind === k ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
        <label>Уровень<select name="level"><option value="auto">Определить сам</option>${LEVELS.map(l => `<option ${m.level === l && existing ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
        <label>Тема<input name="topic" maxlength="40" value="${esc(m.topic)}" placeholder="Музыка, новости…" list="mat-topics"></label>
      </div>
      <datalist id="mat-topics">${[...new Set([...L().TEXTS.map(t => t.topic), 'Музыка', 'Кино и сериалы', 'Новости', 'Книги'])].map(t => `<option value="${esc(t)}">`).join('')}</datalist>
      <label class="video-only">Ссылка на YouTube (необязательно) — видео появится над текстом<input name="video" inputmode="url" value="${esc(m.video)}" placeholder="https://www.youtube.com/watch?v=…"></label>
      <label>Текст<textarea name="body" rows="10" maxlength="${MAX_BODY * 2}" required placeholder="Вставьте текст сюда">${esc(m.body)}</textarea></label>
      <label class="file-pick">или загрузите файл .txt / .srt / .vtt<input type="file" accept=".txt,.srt,.vtt,text/plain" id="mat-file"></label>
      <label>Источник (необязательно)<input name="source" maxlength="200" value="${esc(m.source)}" placeholder="Ссылка или название книги"></label>
      <p class="err" id="mat-err" role="alert"></p>
      <div class="row gap"><button class="btn" type="submit">${existing ? 'Сохранить' : 'Добавить и читать'}</button><button class="btn ghost" type="button" data-close>Отмена</button></div>
    </form>`, (el, close) => {
    const f = $('#mat-form', el);
    const syncKind = () => { $('.video-only', el).hidden = !['video', 'subs', 'song'].includes(f.kind.value); };
    f.kind.onchange = syncKind; syncKind();
    $('#mat-file', el).onchange = async e => {
      const file = e.target.files[0]; if (!file) return;
      if (file.size > 512 * 1024) { $('#mat-err', el).textContent = 'Файл слишком большой (больше 500 КБ).'; return; }
      const txt = await file.text();
      f.body.value = txt;
      if (/\.(srt|vtt)$/i.test(file.name) && f.kind.value === 'text') { f.kind.value = 'subs'; syncKind(); }
      if (!f.title.value) f.title.value = file.name.replace(/\.[^.]+$/, '').replace(/[._]+/g, ' ').slice(0, 80);
    };
    f.onsubmit = e => {
      e.preventDefault();
      const err = $('#mat-err', el); err.textContent = '';
      const body = parseSubtitles(f.body.value).replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
      const toks = body.match(L().tokenRe) || [];
      if (toks.length < 5) { err.textContent = `В тексте почти нет слов на языке «${L().name}». Проверьте, что выбран нужный язык.`; return; }
      if (body.length > MAX_BODY) { err.textContent = `Текст длиннее ${MAX_BODY.toLocaleString('ru-RU')} символов — разделите его на части.`; return; }
      const video = f.video.value.trim();
      if (video && !youtubeId(video)) { err.textContent = 'Ссылка на видео не похожа на ссылку YouTube.'; return; }
      const known = w => !!L().lookup(w).translation;
      const level = f.level.value === 'auto' ? estimateLevel(body, L().tokenRe, known, L().id) : f.level.value;
      const id = existing?.id || 'u' + Date.now().toString(36);
      const item = {
        id, title: f.title.value.trim().slice(0, 80) || 'Без названия', topic: f.topic.value.trim().slice(0, 40),
        kind: f.kind.value in KINDS ? f.kind.value : 'text', level, body, video: video ? video.slice(0, 200) : '',
        source: f.source.value.trim().slice(0, 200), added: existing?.added || Date.now()
      };
      s.materials[id] = item;
      store.save();
      toast(existing ? 'Материал сохранён' : `Материал добавлен · уровень ${level}`);
      close();
      onSave?.(item);
    };
  });
}

export function deleteMaterial(id, onDone) {
  const m = store.state.materials?.[id]; if (!m) return;
  modal(`<h2>Удалить материал?</h2><p>«${esc(m.title)}» исчезнет из списка. Слова, которые вы из него добавили, останутся в словаре.</p><div class="row gap"><button class="btn danger" id="yes">Удалить</button><button class="btn ghost" data-close>Отмена</button></div>`,
    (el, close) => { $('#yes', el).onclick = () => {
      delete store.state.materials[id];
      delete store.state.openedTexts?.[id];
      store.save(); close(); toast('Материал удалён'); onDone?.();
    }; });
}
