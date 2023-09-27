import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import EmployeeModel from "./models/Employee.js"; // Import your MongoDB model

const uri =
"mongodb+srv://ebrahimbeiaty:uQk0bjuok0cTQrSn@cluster0.rplgbdj.mongodb.net/employee"
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

// MongoDB connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

// Route to get all employees
app.get("/getEmployee", (req, res) => {
  EmployeeModel.find({}, (err, result) => {
    if (err) return res.json({ Error: "Get employee error in MongoDB" });
    return res.json({ Status: "Success", Result: result });
  });
});

// Route to get a specific employee by ID
app.get("/get/:id", (req, res) => {
  const id = req.params.id;
  EmployeeModel.findById(id, (err, result) => {
    if (err) return res.json({ Error: "Get employee error in MongoDB" });
    return res.json({ Status: "Success", Result: result });
  });
});

// Route to update an employee's salary by ID
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  EmployeeModel.findByIdAndUpdate(
    id,
    { salary: req.body.salary },
    (err, result) => {
      if (err) return res.json({ Error: "Update employee error in MongoDB" });
      return res.json({ Status: "Success" });
    }
  );
});

// Route to delete an employee by ID
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  EmployeeModel.findByIdAndDelete(id, (err, result) => {
    if (err) return res.json({ Error: "Delete employee error in MongoDB" });
    return res.json({ Status: "Success" });
  });
});

// Middleware to verify user authentication
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are not authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) return res.json({ Error: "Token is invalid" });
      req.role = decoded.role;
      req.id = decoded.id;
      next();
    });
  }
};

// Route to access the dashboard (requires authentication)
app.get("/dashboard", verifyUser, (req, res) => {
  return res.json({ Status: "Success", role: req.role, id: req.id });
});

// Route to get the count of admin users (assuming you have an admin model)
app.get("/adminCount", (req, res) => {
  // Replace with your logic to count admin users in MongoDB
  AdminModel.countDocuments({}, (err, result) => {
    if (err) return res.json({ Error: "Error in counting admin users" });
    return res.json({ adminCount: result });
  });
});

// Route to get the count of employee users
app.get("/employeeCount", (req, res) => {
  EmployeeModel.countDocuments({}, (err, result) => {
    if (err) return res.json({ Error: "Error in counting employee users" });
    return res.json({ employeeCount: result });
  });
});

// Route to get the sum of all employee salaries
// Route to get the sum of all employee salaries
app.get("/salary", (req, res) => {
  EmployeeModel.aggregate([
    {
      $group: {
        _id: null,
        sumOfSalary: { $sum: "$salary" },
      },
    },
  ])
    .then((result) => {
      return res.json(result[0]);
    })
    .catch((err) => {
      return res.json({ Error: "Error in calculating sum of salaries" });
    });
});


// Route to login as an admin
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await EmployeeModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ role: "admin" }, "jwt-secret-key", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      return res.json({ Status: "Success", Message: "Admin login successful" });
    } else {
      return res.json({ Status: "Error", Error: "Wrong Email or Password" });
    }
  } catch (error) {
    return res.json({ Status: "Error", Error: "Error in running query" });
  }
});

// Route to login as an employee
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const employee = await EmployeeModel.findOne({ email });

    if (employee && (bcrypt.compare(password, employee.password))) {
      const token = jwt.sign(
        { role: "employee", id: employee._id },
        "jwt-secret-key",
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({
        Status: "Success",
        Message: "Employee login successful",
        id: employee._id,
      });
    } else {
      return res.json({ Status: "Error", Error: "Wrong Email or Password" });
    }
  } catch (error) {
    return res.json({ Status: "Error", Error: "Error in running query" });
  }
});

// Route to log out
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

// Route to create a new employee
app.post("/create", upload.single("image"), (req, res) => {
  const { name, email, password, address, salary } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.json({ Error: "Error in hashing password" });
    const newEmployee = new EmployeeModel({
      name,
      email,
      password: hash,
      address,
      salary,
      image: req.file.filename,
    });

    newEmployee.save((err, result) => {
      if (err) return res.json({ Error: "Error in saving employee data" });
      return res.json({ Status: "Success" });
    });
  });
});

app.listen(8081, () => {
  console.log("Running");
});
