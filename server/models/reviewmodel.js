const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: "User",
    required: true,
  },
  room: {
    type: String,
    ref: "RoomType",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
