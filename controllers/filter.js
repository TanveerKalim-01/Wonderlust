const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync.js");

module.exports.countryFilter = async (req, res) => {
  let country = req.query.country.trim();

  // Case-insensitive search for listings by country
  const allListings = await Listing.find({
    country: { $regex: new RegExp(country, "i") },
  });

  if (allListings.length > 0) {
    res.render("listings/index.ejs", { allListings });
  } else {
    req.flash("error", `No listings available in ${country}`);
    res.redirect("/listings");
  }
};

module.exports.multiFilter = async (req, res) => {
  const filterType = req.params.filter;

  // Case-insensitive search for listings by filter type
  const allListings = await Listing.find({
    filter: { $regex: new RegExp(filterType, "i") },
  });

  if (allListings.length > 0) {
    res.render("listings/index.ejs", { allListings });
  } else {
    req.flash("error", "No listings found for this filter.");
    res.redirect("/listings");
  }
};
