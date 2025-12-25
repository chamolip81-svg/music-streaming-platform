import express from "express";
import {
  search,
  songDetails,
  streamSong
} from "../controllers/music.controller.js";
import validateQuery from "../middlewares/validateQuery.js";

const router = express.Router();

router.get("/search", validateQuery, search);
router.get("/song/:id", songDetails);
router.get("/stream/:id", streamSong); // 🔥 REAL AUDIO STREAM

export default router;
