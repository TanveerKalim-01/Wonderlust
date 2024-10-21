const express = require("express");
const router = express.Router({ mergeParams: true });

const { countryFilter, multiFilter } = require("../controllers/filter.js");
const wrapAsync = require("../utils/wrapAsync.js");

router.get("/country", wrapAsync(countryFilter));

router.get("/:filter", wrapAsync(multiFilter));

module.exports = router;
