const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const { google } = require("./keys");
const User = require("../models/user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      // Options for strategy
      clientID: google.clientID,
      clientSecret: google.clientSecret,
      callbackURL: "/auth/google/redirect",
    },
    async (token, tokenSecret, profile, done) => {
      // Passport callback function
      try {
        // Check if user exists in our database
        let user = await User.findOne({ googleId: profile.id });

        if (user) return done(null, user);
        // If doesn't exists create a new one and save it to our database (mongodb)
        user = new User({
          username: profile.displayName,
          googleId: profile.id,
          image: profile.photos[0].value,
        });

        await user.save();

        return done(null, user);
      } catch (err) {
        console.log("passport callback error: ", err);
      }
    },
  ),
);
