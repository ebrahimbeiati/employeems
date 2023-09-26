// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
  email: String,
  address: String,
  salary: Number,
  image: String,
  description: String,
  startTime: Date,
  endTime: Date
  // Other user-related fields (e.g., name, email)
});

const AdminModel = mongoose.model("manager", userSchema);
module.exports = AdminModel;

