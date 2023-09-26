// models/Employee.js
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  startTime: Date,
  endTime: Date,
  image: String,
  address: String,
  salary: Number,
  description: String
  
});

const EmployeeModel = mongoose.model("employees", employeeSchema)
module.exports = EmployeeModel


