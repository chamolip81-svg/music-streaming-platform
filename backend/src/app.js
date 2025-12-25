import express from "express";
import cors from "cors";
import limiter from "./middlewares/rateLimiter.js";

const app = express();

/* Security */
app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(limiter);

/* Health */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "music-backend",
    timestamp: new Date().toISOString()
  });
});

export default app;
