import { searchSongs } from "../services/saavn.service.js";

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
