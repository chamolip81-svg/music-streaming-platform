export default function validateQuery(req, res, next) {
  const { q } = req.query;

  if (!q || typeof q !== "string" || q.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: "Invalid or missing search query"
    });
  }

  next();
}
