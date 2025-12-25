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
  song?.downloadUrl?.slice().reverse().find(u => u.url)?.url;


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
export async function downloadSong(req, res) {
  try {
    const data = await getSongDetails(req.params.id);
    const song = data?.data?.[0];

    const bestQuality =
      song?.downloadUrl?.[song.downloadUrl.length - 1]?.url;

    if (!bestQuality) {
      return res.status(404).json({ success: false });
    }

    res.json({
      success: true,
      url: bestQuality,
      filename: `${song.name || song.title}.mp3`
    });
  } catch {
    res.status(500).json({ success: false });
  }
}
