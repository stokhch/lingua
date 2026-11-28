// Ссылки популярной песни (общие для всех языков): YouTube — официальное видео (yt), если оно есть, иначе поиск;
// Яндекс Музыка и Spotify — поиск по исполнителю и названию (для карачаево-балкарского Spotify не показываем: там почти нет этих песен).
export const hitLinks = (h, lang) => {
  const q = encodeURIComponent(`${h.artist.replace(/\s*\(.*\)/, '')} ${h.title}`);
  return [
    { title: 'YouTube', href: h.yt ? `https://www.youtube.com/watch?v=${h.yt}` : `https://www.youtube.com/results?search_query=${q}` },
    { title: 'Яндекс Музыка', href: `https://music.yandex.ru/search?text=${q}` },
    ...(lang.id === 'krc' ? [] : [{ title: 'Spotify', href: `https://open.spotify.com/search/${q}` }])
  ];
};
