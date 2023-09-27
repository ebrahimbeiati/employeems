import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import EmployeeModel from "./models/Employee.js";
import ManagerModel from "./models/Manager.js";

const app = express();

app.use(express.json());
app.use(cors());

const uri =
  "mongodb+srv://ebrahimbeiaty:xVJiWvKXSZ78LZAq@cluster0.rplgbdj.mongodb.net/employee";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/register", (req, res) => {
  EmployeeModel.create(req.body)
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  ManagerModel.create(req.body)
    .then((managers) => res.json(managers))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("Running");
});
