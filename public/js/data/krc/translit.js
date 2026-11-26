// Карачаево-балкарская кириллица → турецкая латиница, чтобы слова читал турецкий голос.
// Готового голоса для языка нет, а турецкий — близкий тюркский язык с тем же набором звуков
// (ö, ü, ı, ç, ş). Приближение: къ → k, гъ → g, нг → ng, дж/ж → c, ё → ö, ю → ü.
const VOWELS = 'аеёиоуыэюяў';
const ONE = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', ё: 'ö', ж: 'c', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l',
  м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ў: 'v', ф: 'f', х: 'h', ц: 'ts',
  ч: 'ç', ш: 'ş', щ: 'şç', ъ: '', ы: 'ı', ь: '', э: 'e', ю: 'ü'
};
const TWO = { дж: 'c', гъ: 'g', къ: 'k', хъ: 'h', нг: 'ng' };

export function krcToTurkish(text) {
  const s = String(text ?? '').toLowerCase();
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i], two = TWO[c + s[i + 1]];
    if (two !== undefined) { out += two; i++; continue; }
    if (c === 'е' || c === 'я') {
      const prev = s[i - 1] || ' ';
      const soft = !/[а-яёў]/.test(prev) || VOWELS.includes(prev) || prev === 'ъ' || prev === 'ь'; // начало слова или после гласной
      out += (soft ? 'y' : '') + (c === 'е' ? 'e' : 'a');
      continue;
    }
    out += ONE[c] ?? c;
  }
  return out;
}
