// Контент-скрипт: двойной клик по слову (или пункт контекстного меню) показывает перевод из Лингвы
// и кнопку «В словарь». Окошко рисуется в Shadow DOM, чтобы стили сайта его не ломали.
(() => {
  if (window.__lingva) return; window.__lingva = true;
  const send = msg => new Promise(res => { try { chrome.runtime.sendMessage(msg, r => res(r || { ok: false, error: chrome.runtime.lastError?.message || 'Нет ответа' })); } catch (e) { res({ ok: false, error: 'Расширение обновилось — перезагрузите страницу' }); } });
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let settings = { lang: 'en', dblclick: true };
  send({ type: 'settings' }).then(r => { if (r.ok) settings = r.data; });
  chrome.storage.onChanged.addListener(ch => { for (const k of ['lang', 'dblclick', 'user']) if (ch[k]) settings[k] = ch[k].newValue; });

  // Язык слова: кириллица — карачаево-балкарский, греческие буквы — греческий, турецкие — турецкий,
  // иначе — выбранный в настройках
  const langOf = w => /[а-яё]/i.test(w) ? 'krc' : /[\u0370-\u03ff]/.test(w) ? 'el' : /[äß]/i.test(w) || (settings.lang === 'de' && /[öü]/i.test(w)) ? 'de' : /[çğıöşüİ]/i.test(w) ? 'tr' : (['krc', 'el'].includes(settings.lang) ? 'en' : settings.lang);
  const WORD = /^[A-Za-zÇçĞğİıÖöŞşÜüÂâÎîÛûА-Яа-яЁёЎўΑ-ΩΆΈΉΊΌΎΏΪΫα-ωάέήίόύώϊϋΐΰ'’-]{1,40}$/;

  let host, root;
  function box() {
    if (host?.isConnected) return root;
    host = document.createElement('lingva-popup');
    host.style.cssText = 'all:initial;position:absolute;z-index:2147483647;top:0;left:0';
    root = host.attachShadow({ mode: 'closed' });
    root.innerHTML = `<style>
      .b{font:15px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif;color:#1c2a1a;background:#fffdf3;border:2px solid #d9dcb8;border-radius:14px;box-shadow:0 10px 30px rgba(15,42,25,.25);padding:10px 12px;width:280px;box-sizing:border-box}
      .h{display:flex;align-items:center;gap:8px}.h b{flex:1;font-size:18px;word-break:break-word}
      .tag{font-size:11px;font-weight:800;color:#8a5d00;background:#fff1c7;border-radius:99px;padding:1px 7px}
      .t{font-size:17px;font-weight:700;margin:6px 0}.m{color:#566450;font-size:13px;margin:4px 0}
      button{font:inherit;cursor:pointer}.x,.s{border:0;background:none;color:#566450;font-size:18px;padding:2px 6px;border-radius:8px}.x:hover,.s:hover{background:#e1efd5}
      .add{border:0;border-radius:10px;background:#1f7a3a;color:#fff;font-weight:800;padding:7px 12px;box-shadow:0 2px 0 #135127}
      .row{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-top:6px}
      input{font:inherit;width:100%;box-sizing:border-box;border:2px solid #d9dcb8;border-radius:10px;padding:6px 8px;margin:4px 0}
      .link{border:0;background:none;color:#1b6b33;text-decoration:underline;padding:0;font-size:13px}
      .ok{color:#148a55;font-weight:700}.err{color:#d6372a}
      @media (prefers-color-scheme:dark){.b{background:#173022;color:#ecf3df;border-color:#2a4733}.m{color:#a9bca0}.tag{background:#3b2f0a;color:#f5c955}input{background:#0e1d14;color:#ecf3df;border-color:#2a4733}.link{color:#86dc9d}}
    </style><div class="b" role="dialog" aria-label="Лингва: перевод"></div>`;
    document.documentElement.append(host);
    return root;
  }
  const close = () => { host?.remove(); host = null; };
  document.addEventListener('mousedown', e => { if (host && !e.composedPath().includes(host)) close(); }, true);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  function contextOf(sel, word) {
    const node = sel?.anchorNode; const el = node?.nodeType === 3 ? node.parentElement : node;
    const text = (el?.closest('p,li,td,h1,h2,h3,h4,blockquote,figcaption,div,span') || el)?.textContent?.replace(/\s+/g, ' ').trim() || '';
    const sentences = text.split(/(?<=[.!?…])\s+/);
    return (sentences.find(s => s.toLowerCase().includes(word.toLowerCase())) || '').slice(0, 240);
  }

  async function show(raw, rect, ctx) {
    const word = raw.trim().replace(/^['’-]+|['’-]+$/g, '');
    const multi = /\s/.test(word);
    if (!word || word.length > 300) return;
    const lang = langOf(word);
    const r = box(); const b = r.querySelector('.b');
    host.style.left = Math.max(8, Math.min(window.scrollX + rect.left, window.scrollX + document.documentElement.clientWidth - 290)) + 'px';
    host.style.top = (window.scrollY + rect.bottom + 8) + 'px';
    b.innerHTML = `<div class="h"><button class="s" title="Произнести" aria-label="Произнести">🔊</button><b>${esc(word)}</b><span class="tag">${lang.toUpperCase()}</span><button class="x" aria-label="Закрыть">×</button></div><p class="m">Ищем перевод…</p>`;
    b.querySelector('.x').onclick = close;
    b.querySelector('.s').onclick = () => { try { const u = new SpeechSynthesisUtterance(word); u.lang = { en: 'en-US', tr: 'tr-TR', el: 'el-GR', de: 'de-DE' }[lang] || ''; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch {} };
    if (multi || !WORD.test(word)) {
      const res = await send({ type: 'sentence', q: word, lang });
      b.querySelector('.m').outerHTML = res.ok && res.data.translation ? `<p class="t">${esc(res.data.translation)}</p><p class="m">Машинный перевод фразы</p>` : `<p class="m err">${esc(res.error || 'Перевод не найден')}</p>`;
      return;
    }
    const res = await send({ type: 'lookup', q: word, lang });
    if (!host) return;
    if (!res.ok) { b.querySelector('.m').outerHTML = `<p class="m err">${esc(res.error)}</p>`; return; }
    const { word: lemma, translation, source } = res.data;
    b.querySelector('.h b').textContent = lemma;
    b.querySelector('.m').outerHTML = `${translation ? `<p class="t">${esc(translation)}</p>` : '<p class="m">Перевода нет — впишите свой:</p>'}
      <input class="tr" value="${esc(translation)}" ${translation ? 'hidden' : ''} aria-label="Перевод" maxlength="120">
      ${ctx ? `<p class="m">«${esc(ctx.length > 120 ? ctx.slice(0, 117) + '…' : ctx)}»</p>` : ''}
      <div class="row"><button class="add">+ В словарь Лингвы</button>${translation ? '<button class="link edit">изменить</button>' : ''}${ctx ? '<button class="link sent">перевести предложение</button>' : ''}</div>
      ${source === 'online' ? '<p class="m">Машинный перевод</p>' : ''}<p class="m out"></p>`;
    const inp = b.querySelector('.tr'), out = b.querySelector('.out');
    b.querySelector('.edit') && (b.querySelector('.edit').onclick = () => { inp.hidden = false; inp.focus(); });
    b.querySelector('.sent') && (b.querySelector('.sent').onclick = async e => {
      e.target.disabled = true; out.textContent = 'Переводим предложение…';
      const s = await send({ type: 'sentence', q: ctx, lang });
      out.textContent = s.ok && s.data.translation ? s.data.translation : (s.error || 'Не удалось перевести');
    });
    b.querySelector('.add').onclick = async e => {
      const t = inp.value.trim(); if (!t) { inp.hidden = false; inp.focus(); return; }
      e.target.disabled = true;
      const a = await send({ type: 'add', word: lemma, translation: t, ctx, src: (document.title || location.hostname).slice(0, 120), lang });
      out.className = 'm out ' + (a.ok ? 'ok' : 'err');
      out.textContent = a.ok ? 'Добавлено! Слово появится в словаре, когда вы откроете Лингву.' : a.error;
      if (!a.ok) e.target.disabled = false;
    };
  }

  document.addEventListener('dblclick', e => {
    if (!settings.dblclick || e.target.closest?.('input,textarea,[contenteditable=""],[contenteditable=true]')) return;
    const sel = window.getSelection(); const text = sel?.toString() || '';
    if (!text.trim() || !WORD.test(text.trim()) || !sel.rangeCount) return;
    show(text, sel.getRangeAt(0).getBoundingClientRect(), contextOf(sel, text.trim()));
  });
  chrome.runtime.onMessage.addListener(msg => {
    if (msg?.type !== 'show') return;
    const sel = window.getSelection();
    const rect = sel?.rangeCount ? sel.getRangeAt(0).getBoundingClientRect() : { left: 20, bottom: 20 };
    const t = String(msg.text || '').trim();
    show(t, rect, WORD.test(t) ? contextOf(sel, t) : '');
  });
})();
