const express = require("express");
const router = express.Router();
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware");
const userController = require("../controllers/user");
const wrapAsync = require("../utils/wrapAsync");

// Signup Routes
router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signup));

// Login Routes
router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    savedRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

// Handle User Logout
router.get("/logout", userController.logout);

module.exports = router;
