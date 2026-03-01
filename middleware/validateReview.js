module.exports = function validateReview(req, res, next) {
  const { name, text, rating, mood } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ message: "Valid name is required" });
  }

  if (!text || text.trim().length < 5) {
    return res
      .status(400)
      .json({ message: "Review text must be at least 5 characters" });
  }

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  const allowedMoods = ["😟", "😐", "😊", "🤩", "🔥"];
  if (!mood || !allowedMoods.includes(mood)) {
    return res.status(400).json({ message: "Invalid mood selected" });
  }

  next();
};
