const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

// Listing schema definition
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  filter: {
    type: String,
    enum: [
      "trending",
      "rooms",
      "iconic-cities",
      "mountains",
      "castles",
      "amazing-pools",
      "campground",
      "farms",
      "arctic",
      "domes",
      "boats",
    ],
    required: true,
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"], // Enforce 'Point' type for GeoJSON
      required: true,
    },
    coordinates: {
      type: [Number], // GeoJSON requires [longitude, latitude]
      required: true,
    },
  },
});

// Middleware to delete reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing.reviews.length) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

// Model export
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
