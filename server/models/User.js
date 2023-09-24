// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
  // Other user-related fields (e.g., name, email)
});

module.exports = mongoose.model("User", userSchema);
