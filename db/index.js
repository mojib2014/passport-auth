const mongoose = require("mongoose");
const { mongodbURI } = require("../config/keys");

mongoose.connect(mongodbURI, () =>
  console.log("Successfully connected to mongodb!"),
);
