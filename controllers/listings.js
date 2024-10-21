const Listing = require("../models/listing");
const maptilerClient = require("@maptiler/client");
const maptilerApiKey = process.env.MAPTILER_API_KEY;

// Set MapTiler API key
maptilerClient.config.apiKey = maptilerApiKey;

module.exports.index = async (req, res) => {
  const allListings = await Listing.find();
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "The requested listing does not exist.");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
  const listing = req.body.listing;
  const { path: url, filename } = req.file;
  const result = await maptilerClient.geocoding.forward(listing.location, { limit: 1 });

  const newListing = new Listing(listing);
  newListing.image = { url, filename };
  newListing.owner = req.user._id;
  newListing.geometry = result.features[0].geometry;
  
  await newListing.save();
  req.flash("success", "New listing created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "The requested listing does not exist.");
    return res.redirect("/listings");
  }

  const originalImgUrl = listing.image.url.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImgUrl });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (req.file) {
    const { path: url, filename } = req.file;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  
  req.flash("success", "Listing deleted!");
  res.redirect("/listings");
};
