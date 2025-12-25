const BASE_URL = import.meta.env.VITE_API_URL;

export async function searchSongs(q) {
  const res = await fetch(
    `${BASE_URL}/api/music/search?q=${encodeURIComponent(q)}`
  );
  return res.json();
}

export function getSongStreamUrl(id) {
  return `${BASE_URL}/api/music/stream/${id}`;
}
