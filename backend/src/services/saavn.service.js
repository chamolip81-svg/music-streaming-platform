import fetch from "node-fetch";

const BASE_URL = "https://www.jiosaavn.com/api.php";

/* COMMON HEADERS (MANDATORY FOR RENDER / CLOUD) */
const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept": "application/json",
  "Referer": "https://www.jiosaavn.com/",
};

/* SEARCH SONGS */
export async function searchSongs(query) {
  const url = `${BASE_URL}?_format=json&_marker=0&api_version=4&ctx=web6dot0&method=search.getResults&q=${encodeURIComponent(
    query
  )}`;

  const res = await fetch(url, { headers: HEADERS });

  if (!res.ok) {
    throw new Error("Failed to fetch search results");
  }

  return res.json();
}

/* SONG DETAILS (CRITICAL FOR STREAMING) */
export async function getSongDetails(id) {
  const url = `${BASE_URL}?_format=json&_marker=0&api_version=4&ctx=web6dot0&method=song.getDetails&songid=${id}`;

  const res = await fetch(url, { headers: HEADERS });

  if (!res.ok) {
    throw new Error("Failed to fetch song details");
  }

  return res.json();
}
