const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup");
};

module.exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    // Automatically login the user after signup
    req.login(registeredUser, (err) => {
      if (err) {
        req.flash("error", err.message);
        return res.redirect("/signup");
      }
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login");
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome to Wanderlust!");
  const redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "Logged you out!");
    res.redirect("/listings");
  });
};