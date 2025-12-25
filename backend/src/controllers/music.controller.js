import fetch from "node-fetch";
import {
  searchSongs,
  getSongDetails
} from "../services/saavn.service.js";

/* SEARCH */
export async function search(req, res) {
  try {
    const result = await searchSongs(req.query.q);
    res.json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Music service unavailable"
    });
  }
}

/* SONG METADATA */
export async function songDetails(req, res) {
  try {
    const data = await getSongDetails(req.params.id);
    const song = data?.data?.[0];

    if (!song) {
      return res.status(404).json({ success: false });
    }

    res.json({
      success: true,
      metadata: song
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Unable to fetch song"
    });
  }
}

/* 🔥 REAL AUDIO STREAM (PROXY) */
export async function streamSong(req, res) {
  try {
    const data = await getSongDetails(req.params.id);
    const song = data?.data?.[0];

    const bestQuality =
      song?.downloadUrl?.slice().reverse().find(u => u.url)?.url;

    if (!bestQuality) {
      return res.status(404).end();
    }

    const response = await fetch(bestQuality);

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Accept-Ranges", "bytes");

    response.body.pipe(res);
  } catch (err) {
    console.error("Stream error:", err);
    res.status(500).end();
  }
}
