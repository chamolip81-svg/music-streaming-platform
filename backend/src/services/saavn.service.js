const BASE_URL = "https://www.jiosaavn.com/api.php";

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
  "Referer": "https://www.jiosaavn.com/",
  "Accept": "application/json"
};

/* ✅ WORKING SEARCH (SERVER SAFE) */
export async function saavnSearch(query) {
  const url =
    `${BASE_URL}` +
    `?_format=json` +
    `&_marker=0` +
    `&api_version=4` +
    `&ctx=web6dot0` +
    `&method=search.getSong` +
    `&p=1` +
    `&q=${encodeURIComponent(query)}`;

  const res = await fetch(url, { headers: HEADERS });

  if (!res.ok) {
    throw new Error("Saavn search failed");
  }

  return res.json();
}

/* ✅ WORKING SONG DETAILS */
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
    throw new Error("Saavn song details failed");
  }

  return res.json();
}
