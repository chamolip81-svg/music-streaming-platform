import fetch from "node-fetch";

const SAAVN_BASE = "https://saavn.sumit.co";


export async function searchSongs(query) {
  const url = `${SAAVN_BASE}/api/search/songs?query=${encodeURIComponent(query)}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch from Saavn");
  }

  const data = await res.json();
  return data;
}

export async function getSongDetails(songId) {
  const url = `${SAAVN_BASE}/api/songs/${songId}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch song details");
  }

  const data = await res.json();
  return data;
}
