import express from "express";
import cors from "cors";
import musicRoutes from "./routes/music.routes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10kb" }));

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "music-backend",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/music", musicRoutes);

export default app;
