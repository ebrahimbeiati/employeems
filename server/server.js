import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import UserModel from "./models/employeems1";

const app = express();

const uri =
  "mongodb+srv://ebrahimbeiaty:Ju25ZePhpK5syWln@cluster0.rplgbdj.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});


app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

// Connect to MongoDB using your provided URL

// Define a MongoDB schema and model for the "employee" collection
const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  salary: Number,
  image: String,
});

const Employee = mongoose.model("Employee", employeeSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

app.get("/getEmployee", (req, res) => {
  UserModel.find()
  .then(employeems1=>res.json(employeems1))
  .catch(err=>console.log(err))
});

app.get("/get/:id", (req, res) => {
  const id = req.params.id;
  Employee.findById(id, (err, result) => {
    if (err) return res.json({ Error: "Get employee error in MongoDB" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  Employee.findByIdAndUpdate(id, { salary: req.body.salary }, (err, result) => {
    if (err) return res.json({ Error: "Update employee error in MongoDB" });
    return res.json({ Status: "Success" });
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Employee.findByIdAndRemove(id, (err, result) => {
    if (err) return res.json({ Error: "Delete employee error in MongoDB" });
    return res.json({ Status: "Success" });
  });
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are not Authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) return res.json({ Error: "Token wrong" });
      req.role = decoded.role;
      req.id = decoded.id;
      next();
    });
  }
};

app.get("/dashboard", verifyUser, (req, res) => {
  return res.json({ Status: "Success", role: req.role, id: req.id });
});

app.get("/adminCount", (req, res) => {
  Employee.countDocuments((err, count) => {
    if (err) return res.json({ Error: "Error in running query" });
    return res.json({ admin: count });
  });
});

app.get("/employeeCount", (req, res) => {
  Employee.countDocuments((err, count) => {
    if (err) return res.json({ Error: "Error in running query" });
    return res.json({ employee: count });
  });
});

app.get("/salary", (req, res) => {
  Employee.aggregate([
    { $group: { _id: null, sumOfSalary: { $sum: "$salary" } } },
  ]).exec((err, result) => {
    if (err) return res.json({ Error: "Error in running query" });
    return res.json({ sumOfSalary: result[0].sumOfSalary });
  });
});

app.post("/login", (req, res) => {
  Employee.findOne({ email: req.body.email }, (err, result) => {
    if (err)
      return res.json({ Status: "Error", Error: "Error in MongoDB query" });
    if (!result) {
      return res.json({ Status: "Error", Error: "Wrong Email or Password" });
    }

    bcrypt.compare(req.body.password, result.password, (err, response) => {
      if (err) return res.json({ Error: "Password error" });
      if (response) {
        const token = jwt.sign({ role: "admin" }, "jwt-secret-key", {
          expiresIn: "1d",
        });
        res.cookie("token", token);
        return res.json({ Status: "Success" });
      } else {
        return res.json({ Status: "Error", Error: "Wrong Email or Password" });
      }
    });
  });
});

app.post("/employeelogin", (req, res) => {
  Employee.findOne({ email: req.body.email }, (err, result) => {
    if (err)
      return res.json({ Status: "Error", Error: "Error in MongoDB query" });
    if (!result) {
      return res.json({ Status: "Error", Error: "Wrong Email or Password" });
    }

    bcrypt.compare(req.body.password, result.password, (err, response) => {
      if (err) return res.json({ Error: "Password error" });
      if (response) {
        const token = jwt.sign(
          { role: "employee", id: result._id },
          "jwt-secret-key",
          { expiresIn: "1d" }
        );
        res.cookie("token", token);
        return res.json({ Status: "Success", id: result._id });
      } else {
        return res.json({
          Status: "Error",
          Error: "Wrong Email or Password",
        });
      }
    });
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

app.post("/create", upload.single("image"), (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.json({ Error: "Error in hashing password" });

    const employee = new Employee({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      salary: req.body.salary,
    });

    employee.save((err, result) => {
      if (err) return res.json({ Error: "Error in creating employee" });
      return res.json({ Status: "Success" });
    });
  });
});

app.listen(8081, () => {
  console.log("Running");
});
