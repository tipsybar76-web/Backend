const Review = require("../models/Review");

// CREATE REVIEW
exports.createReview = async (req, res) => {
  const { v4: uuidv4 } = require("uuid");
  try {
    const { name, text, color, rating, mood } = req.body;

    const review = new Review({
      reviewId: uuidv4(), // server generated ID
      name,
      text,
      color,
      rating,
      mood,
    });
     
    const savedReview = await review.save();

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({
      message: "Error creating review",
      error: error.message,
    });
  }
};

// GET ALL REVIEWS
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};

// DELETE REVIEW
exports.deleteReview = async (req, res) => {
  try {
    const deleted = await Review.findOneAndDelete({
      reviewId: req.params.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting review",
      error: error.message,
    });
  }
};
