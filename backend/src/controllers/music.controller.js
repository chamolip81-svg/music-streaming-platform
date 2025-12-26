import { saavnSongDetails } from "../services/saavn.service.js";

/* ✅ SEARCH via PUBLIC PROXY (WORKS 100%) */
export async function search(req, res) {
  try {
    const q = req.query.q;
    if (!q) return res.status(400).json({ error: "Query missing" });

    const response = await fetch(
      `https://saavn.me/search/songs?query=${encodeURIComponent(q)}`
    );

    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Search failed" });
  }
}

/* SONG DETAILS */
export async function songDetails(req, res) {
  try {
    const data = await saavnSongDetails(req.params.id);
    res.json(data);
  } catch {
    res.status(500).json({ error: "Song details failed" });
  }
}

/* STREAM AUDIO */
export async function streamSong(req, res) {
  try {
    const id = req.params.id;
    const data = await saavnSongDetails(id);
    const song = data?.data?.[0];

    if (!song || !song.downloadUrl) {
      return res.status(404).json({ error: "Song not playable" });
    }

    const audioUrl =
      song.downloadUrl.slice().reverse().find(u => u.url)?.url;

    const response = await fetch(audioUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Referer": "https://www.jiosaavn.com/"
      }
    });

    res.setHeader("Content-Type", "audio/mpeg");
    response.body.pipe(res);
  } catch {
    res.status(500).json({ error: "Stream failed" });
  }
}
