import mongoose from "mongoose";

const ManagerSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const ManagerModel = mongoose.model("managers", ManagerSchema);

export default ManagerModel;
