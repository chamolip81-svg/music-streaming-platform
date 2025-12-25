import { searchSongs, getSongDetails } from "../services/saavn.service.js";

export async function search(req, res) {
  try {
    const result = await searchSongs(req.query.q);
    res.json(result);
  } catch {
    res.status(500).json({
      success: false,
      message: "Music service unavailable"
    });
  }
}

export async function songDetails(req, res) {
  try {
    const data = await getSongDetails(req.params.id);

    // Pick highest quality URL
    const song = data?.data?.[0];
    const bestQuality =
      song?.downloadUrl?.[song.downloadUrl.length - 1]?.url;

    res.json({
      success: true,
      metadata: song,
      streamUrl: bestQuality
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Unable to fetch song"
    });
  }
}
