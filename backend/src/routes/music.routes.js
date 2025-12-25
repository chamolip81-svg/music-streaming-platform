import express from "express";
import { search } from "../controllers/music.controller.js";
import validateQuery from "../middlewares/validateQuery.js";

const router = express.Router();

router.get("/search", validateQuery, search);

export default router;
