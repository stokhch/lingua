// Флаги для карточек выбора языка (SVG, без внешних файлов: эмодзи-флаги не отображаются в Windows).
// У карачаево-балкарского два флага — Карачая и Балкарии. Это упрощённые рисунки:
// балкарский — по описанию флага, принятого 1-м съездом балкарского народа 19.06.1993
// (голубое полотнище, две белые горизонтальные полосы, силуэт двуглавого Эльбруса);
// карачаевский — по изображению, которое прислал пользователь (зелёное полотнище с белой эмблемой).
const svg = (title, vb, body) =>
  `<svg class="flag" viewBox="${vb}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>`;

const UK = svg('Великобритания', '0 0 60 30', `
  <clipPath id="fl-uk-s"><path d="M0,0v30h60v-30z"/></clipPath>
  <clipPath id="fl-uk-t"><path d="M30,15h30v15zv15h-30zh-30v-15zv-15h30z"/></clipPath>
  <g clip-path="url(#fl-uk-s)">
    <path d="M0,0v30h60v-30z" fill="#012169"/>
    <path d="M0,0L60,30M60,0L0,30" stroke="#fff" stroke-width="6"/>
    <path d="M0,0L60,30M60,0L0,30" clip-path="url(#fl-uk-t)" stroke="#C8102E" stroke-width="4"/>
    <path d="M30,0v30M0,15h60" stroke="#fff" stroke-width="10"/>
    <path d="M30,0v30M0,15h60" stroke="#C8102E" stroke-width="6"/>
  </g>`);

const TR = svg('Турция', '0 0 1200 800', `
  <rect width="1200" height="800" fill="#E30A17"/>
  <circle cx="425" cy="400" r="200" fill="#fff"/>
  <circle cx="475" cy="400" r="160" fill="#E30A17"/>
  <polygon fill="#fff" points="483.3,400 552.4,377.5 552.4,304.9 595.1,363.7 664.2,341.2 621.5,400 664.2,458.8 595.1,436.3 552.4,495.1 552.4,422.5"/>`);

// Двуглавый Эльбрус: левая вершина ниже правой — как на рисунках флагов
const ELBRUS = 'M8,13 L12.6,5.6 L14.4,7.9 L16.6,4.4 L22,13 Z';

// Карачай: по присланному изображению — зелёное полотнище, в центре белая эмблема:
// круг, четыре вогнутые дуги («изогнутый квадрат»), малый круг с двуглавым Эльбрусом.
const KARACHAY = svg('Карачай', '-810 -540 1620 1080', `
  <rect x="-810" y="-540" width="1620" height="1080" fill="#04864A"/>
  <g fill="none" stroke="#fff">
    <circle r="264.5" stroke-width="29"/>
    <path stroke-width="26" d="M-176.5,-197A279,279 0 0 0 176.5,-197M-176.5,197A279,279 0 0 1 176.5,197M-197,-176.5A279,279 0 0 1 -197,176.5M197,-176.5A279,279 0 0 0 197,176.5"/>
    <circle cx="-2" cy="-1" r="92" stroke-width="23"/>
  </g>
  <g fill="#fff">
    <polygon points="-72,7 -14,-33 37,7"/>
    <polygon points="11,-34 66,7 43,7 3,-27"/>
  </g>`);

const BALKARIA = svg('Балкария', '0 0 30 20', `
  <rect width="30" height="20" fill="#3BA3DC"/>
  <path d="${ELBRUS}" fill="#fff"/>
  <rect y="14.2" width="30" height="1.3" fill="#fff"/>
  <rect y="16.6" width="30" height="1.3" fill="#fff"/>`);

export const FLAGS = { en: [UK], tr: [TR], krc: [KARACHAY, BALKARIA] };
export const flagsFor = id => `<span class="flags">${(FLAGS[id] || []).join('')}</span>`;
