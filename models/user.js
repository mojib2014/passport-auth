const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 5, maxlength: 20 },
  googleId: String,
  image: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
