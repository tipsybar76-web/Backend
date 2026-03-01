const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    reviewId: {
      type: String,
      unique: true,
    },

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    text: {
      type: String,
      required: [true, "Review text is required"],
      trim: true,
      minlength: 5,
      maxlength: 1000,
    },

    color: {
      type: String,
      trim: true,
      default: "#000000",
    },

    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
    },

    mood: {
      type: String,
      required: [true, "Mood is required"],
      enum: ["😟", "😐", "😊", "🤩", "🔥"],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("Review", reviewSchema);
