import express from "express";
import { search, songDetails } from "../controllers/music.controller.js";
import validateQuery from "../middlewares/validateQuery.js";

const router = express.Router();

router.get("/search", validateQuery, search);
router.get("/song/:id", songDetails);

export default router;
