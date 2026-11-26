// Окно расширения: вход в аккаунт Лингвы, язык по умолчанию, адрес сервера.
const call = msg => new Promise(res => chrome.runtime.sendMessage(msg, r => res(r || { ok: false, error: 'Нет ответа' })));
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const app = document.getElementById('app');

async function draw() {
  const r = await call({ type: 'settings' });
  const s = r.data;
  app.innerHTML = `
    <p class="muted">Дважды щёлкните по слову на любом сайте или выделите фразу и выберите «Перевести в Лингве» в меню правой кнопки.</p>
    <div class="card">${s.user
      ? `<h2>Вы вошли как ${esc(s.user.name)}</h2><p class="muted">${esc(s.user.email)}. Слова попадут в словарь, когда вы откроете Лингву.</p><button class="ghost" id="out">Выйти</button>`
      : `<h2>Вход в аккаунт Лингвы</h2><p class="muted">Без входа перевод работает, а сохранять слова нельзя.</p>
         <form id="login"><label>E-mail<input name="email" type="email" required autocomplete="email"></label>
         <label>Пароль<input name="password" type="password" required autocomplete="current-password"></label>
         <p class="err" id="err"></p><button>Войти</button></form>`}</div>
    <label>Язык, который вы учите<select id="lang"><option value="en">Английский</option><option value="tr">Турецкий</option><option value="krc">Карачаево-балкарский</option></select></label>
    <label class="check"><input type="checkbox" id="dbl" ${s.dblclick ? 'checked' : ''}> Перевод по двойному клику</label>
    <details><summary class="muted">Адрес сайта Лингвы</summary><form id="srv"><label><input name="server" value="${esc(s.server)}" required></label><button class="ghost">Сохранить адрес</button></form></details>`;
  document.getElementById('lang').value = s.lang;
  document.getElementById('lang').onchange = e => call({ type: 'save', patch: { lang: e.target.value } });
  document.getElementById('dbl').onchange = e => call({ type: 'save', patch: { dblclick: e.target.checked } });
  document.getElementById('srv').onsubmit = async e => { e.preventDefault(); const x = await call({ type: 'save', patch: { server: e.target.server.value.trim() } }); if (!x.ok) { e.target.insertAdjacentHTML('beforeend', `<p class="err">${esc(x.error)}</p>`); return; } draw(); };
  const out = document.getElementById('out'); if (out) out.onclick = async () => { await call({ type: 'logout' }); draw(); };
  const login = document.getElementById('login');
  if (login) login.onsubmit = async e => {
    e.preventDefault();
    const f = new FormData(login);
    const x = await call({ type: 'login', email: f.get('email'), password: f.get('password') });
    if (x.ok) draw(); else document.getElementById('err').textContent = x.error;
  };
}
draw();
