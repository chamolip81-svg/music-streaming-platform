import fetch from "node-fetch";

const BASE_URL = "https://www.jiosaavn.com/api.php";

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Referer": "https://www.jiosaavn.com/",
  "Accept": "application/json"
};

/* ✅ SEARCH — FINAL & CORRECT */
export async function saavnSearch(query) {
  const url =
    `${BASE_URL}` +
    `?_format=json` +
    `&_marker=0` +
    `&api_version=4` +
    `&ctx=web6dot0` +
    `&method=search.getResults` +
    `&q=${encodeURIComponent(query)}`;

  const res = await fetch(url, { headers: HEADERS });

  if (!res.ok) {
    throw new Error("Saavn search blocked");
  }

  return res.json();
}

/* ✅ SONG DETAILS — FINAL & CORRECT */
export async function saavnSongDetails(id) {
  const url =
    `${BASE_URL}` +
    `?_format=json` +
    `&_marker=0` +
    `&api_version=4` +
    `&ctx=web6dot0` +
    `&method=song.getDetails` +
    `&songid=${id}`;

  const res = await fetch(url, { headers: HEADERS });

  if (!res.ok) {
    throw new Error("Saavn song details blocked");
  }

  return res.json();
}
