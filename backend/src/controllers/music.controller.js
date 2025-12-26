import { saavnSearch, saavnSongDetails } from "../services/saavn.service.js";

/* SEARCH */
export async function search(req, res) {
  try {
    const q = req.query.q;
    if (!q) {
      return res.status(400).json({ error: "Query missing" });
    }

    const data = await saavnSearch(q);
    res.json(data);
  } catch (err) {
    console.error("SEARCH ERROR:", err.message);
    res.status(500).json({ error: "Search failed" });
  }
}

/* SONG DETAILS */
export async function songDetails(req, res) {
  try {
    const id = req.params.id;
    const data = await saavnSongDetails(id);
    res.json(data);
  } catch (err) {
    console.error("DETAILS ERROR:", err.message);
    res.status(500).json({ error: "Song details failed" });
  }
}

/* STREAM AUDIO */
export async function streamSong(req, res) {
  try {
    const id = req.params.id;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "Invalid song id" });
    }

    const data = await saavnSongDetails(id);
    const song = data?.data?.[0];

    if (!song || !song.downloadUrl) {
      return res.status(404).json({ error: "Song not playable" });
    }

    const audioUrl =
      song.downloadUrl.slice().reverse().find(u => u.url)?.url;

    if (!audioUrl) {
      return res.status(404).json({ error: "No stream URL" });
    }

    const response = await fetch(audioUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
        "Referer": "https://www.jiosaavn.com/"
      }
    });

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Accept-Ranges", "bytes");

    response.body.pipe(res);
  } catch (err) {
    console.error("STREAM ERROR:", err.message);
    res.status(500).json({ error: "Stream failed" });
  }
}
