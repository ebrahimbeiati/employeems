// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
  // Other user-related fields (e.g., name, email)
});

const UserModel = mongoose.model("employeems1", userSchema);
module.exports = UserModel;

