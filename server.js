const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./config/passport-setup");
const { sessionKeys } = require("./config/keys");
const auth = require("./routes/auth-routes");
const profile = require("./routes/profile");

const app = express();

// Set up view engine
app.set("view engine", "ejs");

// Setup cookie session
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: sessionKeys,
  }),
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Connecting to mongodb
require("./db/index");

// Setting auth routes
app.use("/auth", auth);
app.use("/profile", profile);

// Home route
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.listen(3000, () => console.log("Server listening on port", 3000));
