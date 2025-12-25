import express from "express";
import cors from "cors";
// import limiter from "./middlewares/rateLimiter.js";
import musicRoutes from "./routes/music.routes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10kb" }));
// app.use(limiter);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "music-backend",
    timestamp: new Date().toISOString()
  });
});

/* Music API */
app.use("/api/music", musicRoutes);

export default app;
