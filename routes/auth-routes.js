const router = require("express").Router();
const passport = require("passport");

// Auth login route
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

// Auth logout
router.get("/logout", (req, res) => {
  // TODO:
  // handle with passport
  req.logout();
  res.redirect("/");
});

// Auth with google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// Callback route for google to  redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/profile");
});

module.exports = router;
