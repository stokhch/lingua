// Страница о расширении для браузера: что умеет и как установить.
import { store } from '../store.js';
import { icon } from '../ui.js';

export function renderExtension(main) {
  const can = store.serverAvailable;
  main.innerHTML = `
  <section class="band narrow ext-page">
    <h1>Расширение для браузера</h1>
    <p class="lead">Читайте что угодно в интернете и пополняйте словарь Лингвы: дважды щёлкните по английскому, турецкому или карачаево-балкарскому слову на любом сайте, и появится перевод. Нажмите «В словарь Лингвы», и слово вместе с предложением попадёт в ваш словарь.</p>
    <div class="ext-demo" aria-hidden="true"><p>The weather was <mark>gorgeous</mark> all weekend.</p><div class="ext-pop"><b>gorgeous</b><span>великолепный</span><i>+ В словарь Лингвы</i></div></div>
    <ul class="ext-list">
      <li>${icon('check')} Перевод по двойному клику: формы слова узнаются (<i>went → go</i>, <i>evlerde → ev</i>)</li>
      <li>${icon('check')} Выделите фразу и выберите «Перевести в Лингве» в меню правой кнопки, чтобы получить машинный перевод</li>
      <li>${icon('check')} Слово сохраняется с предложением-контекстом и названием страницы</li>
      <li>${icon('check')} Озвучка слова голосом браузера</li>
    </ul>
    ${can ? `<a class="btn big" href="lingva-extension.zip" download>${icon('plus')} Скачать расширение</a>` : '<p class="note">Скачать расширение можно, когда Лингва открыта через свой сервер (например, на Render).</p>'}
    <h2>Как установить (Chrome, Edge, Яндекс Браузер, Opera)</h2>
    <ol class="ext-steps">
      <li>Распакуйте скачанный архив, появится папка <code>lingva-extension</code>.</li>
      <li>Откройте страницу расширений: <code>chrome://extensions</code> (в Edge <code>edge://extensions</code>, в Яндекс Браузере <code>browser://tune</code>).</li>
      <li>Включите «Режим разработчика» и нажмите «Загрузить распакованное расширение».</li>
      <li>Выберите папку <code>lingva-extension</code>. На панели появится значок ёжика.</li>
      <li>Нажмите на значок и войдите тем же e-mail и паролем, что и на сайте. Без входа перевод тоже работает, но слова не сохраняются.</li>
    </ol>
    <p class="muted">Сохранённые слова появятся в словаре, когда вы откроете Лингву${store.mode === 'server' ? '' : ' под своим аккаунтом'}. Адрес сайта уже прописан в расширении, поменять его можно в окне расширения.</p>
  </section>`;
}
