const Listing = require("./models/listing");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

// Middleware to check if the user is logged in
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl; // Store the original URL for redirect
    req.flash("error", "You must be logged in to create a Listing.");
    return res.redirect("/login"); // Redirect to login
  }
  next();
};

// Middleware to save the redirect URL
module.exports.savedRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl; // Make redirect URL available in locals
  }
  next();
};

// Middleware to check if the current user is the owner of the listing
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let currUser = res.locals.currUser;
  let listing = await Listing.findById(id); // Find the listing by ID
  if (!listing.owner._id.equals(currUser._id)) { // Check ownership
    req.flash("error", "You are not the owner of this listing!");
    return res.redirect(`/listings/${id}`); // Redirect if not owner
  }
  next();
};

// Middleware to validate listing data against schema
module.exports.validateListings = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(","); // Collect error messages
    throw new ExpressError(400, errMsg); // Throw validation error
  } else {
    next();
  }
};

// Middleware to validate review data against schema
module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(","); // Collect error messages
    throw new ExpressError(400, errMsg); // Throw validation error
  } else {
    next();
  }
};

// Middleware to check if the current user is the author of the review
module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let currUser = res.locals.currUser;
  let review = await Review.findById(reviewId); // Find the review by ID
  if (!review.author._id.equals(currUser._id)) { // Check authorship
    req.flash("error", "You are not the author of this review!");
    return res.redirect(`/listings/${id}`); // Redirect if not author
  }
  next();
};
