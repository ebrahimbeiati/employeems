// models/Employee.js
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  startTime: Date,
  endTime: Date,
});

module.exports = mongoose.model("Employee", employeeSchema);
