const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// User schema definition
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
});

// Create an index on the email field for faster queries
userSchema.index({ email: 1 });

// Add passport-local-mongoose plugin to manage username and password
userSchema.plugin(passportLocalMongoose);

// Model export
module.exports = mongoose.model("User", userSchema);
