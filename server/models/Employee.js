// models/Employee.js
import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  salary: Number,
  image: String,
});

const EmployeeModel = mongoose.model("Employee", employeeSchema);

export default EmployeeModel;
