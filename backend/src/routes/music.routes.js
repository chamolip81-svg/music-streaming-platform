import express from "express";
import {
  search,
  songDetails,
  streamSong
} from "../controllers/music.controller.js";

const router = express.Router();

router.get("/search", search);
router.get("/song/:id", songDetails);
router.get("/stream/:id", streamSong);

export default router;
