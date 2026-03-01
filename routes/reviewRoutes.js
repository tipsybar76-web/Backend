const express = require("express");
const router = express.Router();

const {
  createReview,
  getReviews,
  deleteReview,
} = require("../controllers/reviewController");

const validateReview = require("../middleware/validateReview");

// POST /api/reviews
router.post("/", validateReview, createReview);

// GET /api/reviews
router.get("/", getReviews);

// DELETE /api/reviews/:id
router.delete("/:id", deleteReview);

module.exports = router;
