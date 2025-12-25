const API_BASE = "http://localhost:5000";

export async function searchSongs(query) {
  const res = await fetch(
    `${API_BASE}/api/music/search?q=${encodeURIComponent(query)}`
  );
  return res.json();
}

export async function getSongStream(id) {
  const res = await fetch(`${API_BASE}/api/music/song/${id}`);
  return res.json();
}
