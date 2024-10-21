const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  comment: {
    type: String,
    required: true, // Ensuring comment is required
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true, // Ensuring rating is required
  },
  createdAt: {
    type: Date,
    default: Date.now, // Changed to Date.now (no parentheses)
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true, // Ensuring author is required
  },
});

// Model export
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
