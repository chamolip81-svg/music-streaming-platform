import express from "express";
import { search, songDetails, downloadSong } from "../controllers/music.controller.js";
import validateQuery from "../middlewares/validateQuery.js";

const router = express.Router();

router.get("/search", validateQuery, search);
router.get("/song/:id", songDetails);
router.get("/download/:id", downloadSong);

export default router;
