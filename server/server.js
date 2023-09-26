// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import multer from "multer";
// import path from "path";

// const app = express();

// const uri =
//   "mongodb+srv://ebrahimbeiaty:Ju25ZePhpK5syWln@cluster0.rplgbdj.mongodb.net/?retryWrites=true&w=majority";


// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });


// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//     methods: ["POST", "GET", "PUT"],
//     credentials: true,
//   })
// );
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.static("public"));

// // Connect to MongoDB using your provided URL

// // Define a MongoDB schema and model for the "employee" collection
// const employeeSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   address: String,
//   salary: Number,
//   image: String,
// });

// const Employee = mongoose.model("Employee", employeeSchema);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({
//   storage: storage,
// });

// app.get("/getEmployee", (req, res) => {
//   UserModel.find()
//   .then(employeems1=>res.json(employeems1))
//   .catch(err=>console.log(err))
// });

// app.get("/get/:id", (req, res) => {
//   const id = req.params.id;
//   Employee.findById(id, (err, result) => {
//     if (err) return res.json({ Error: "Get employee error in MongoDB" });
//     return res.json({ Status: "Success", Result: result });
//   });
// });

// app.put("/update/:id", (req, res) => {
//   const id = req.params.id;
//   Employee.findByIdAndUpdate(id, { salary: req.body.salary }, (err, result) => {
//     if (err) return res.json({ Error: "Update employee error in MongoDB" });
//     return res.json({ Status: "Success" });
//   });
// });

// app.delete("/delete/:id", (req, res) => {
//   const id = req.params.id;
//   Employee.findByIdAndRemove(id, (err, result) => {
//     if (err) return res.json({ Error: "Delete employee error in MongoDB" });
//     return res.json({ Status: "Success" });
//   });
// });

// const verifyUser = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.json({ Error: "You are not Authenticated" });
//   } else {
//     jwt.verify(token, "jwt-secret-key", (err, decoded) => {
//       if (err) return res.json({ Error: "Token wrong" });
//       req.role = decoded.role;
//       req.id = decoded.id;
//       next();
//     });
//   }
// };

// app.get("/dashboard", verifyUser, (req, res) => {
//   return res.json({ Status: "Success", role: req.role, id: req.id });
// });

// app.get("/adminCount", (req, res) => {
//   Employee.countDocuments((err, count) => {
//     if (err) return res.json({ Error: "Error in running query" });
//     return res.json({ admin: count });
//   });
// });

// app.get("/employeeCount", (req, res) => {
//   Employee.countDocuments((err, count) => {
//     if (err) return res.json({ Error: "Error in running query" });
//     return res.json({ employee: count });
//   });
// });

// app.get("/salary", async (req, res) => {
//   try {
//     const result = await Employee.aggregate([
//       { $group: { _id: null, sumOfSalary: { $sum: "$salary" } } },
//     ]);
//     return res.json({ sumOfSalary: result[0].sumOfSalary });
//   } catch (error) {
//     console.error("Error in running query:", error);
//     return res.json({ Error: "Error in running query" });
//   }
// });


// app.post("/login", async (req, res) => {
//   try {
//     // Get the user's email and password from the request body
//     const email = req.body.email;
//     const password = req.body.password;

//     // Query the MongoDB database for the user with the specified email
//     const user = await Employee.findOne({ email });

//     // If the user does not exist, return an error message
//     if (!user) {
//       return res.json({ Status: "Error", Error: "User does not exist" });
//     }

//     // Compare the user's password to the hashed password in the database
//     const isPasswordCorrect = await bcrypt.compare(password, user.password);

//     // If the password is incorrect, return an error message
//     if (!isPasswordCorrect) {
//       return res.json({ Status: "Error", Error: "Incorrect password" });
//     }

//     // Generate a JWT token for the user
//     const token = jwt.sign(
//       { role: "employee", id: user._id },
//       "jwt-secret-key",
//       {
//         expiresIn: "1d",
//       }
//     );

//     //
//     if (user.role === "admin") {
//       // Generate a JWT token for the admin
//       const token = jwt.sign(
//         { role: "admin", id: user._id },
//         "jwt-secret-key",
//         {
//           expiresIn: "1d",
//         }
//       );

//       // Set the JWT token as a cookie in the admin's browser
//       res.cookie("token", token);

//       // Return a successful response
//       return res.json({ Status: "Success" });
//     }

//     // Set the JWT token as a cookie in the user's browser
//     res.cookie("token", token);

//     // Return a successful response
//     return res.json({ Status: "Success" });
//   } catch (error) {
//     console.log(error);
//     return res.json({ Status: "Error", Error: "Something went wrong" });
//   }
// });


// app.post("/employeelogin", async (req, res) => {
//   try {
//     // Get the user's email and password from the request body
//     const email = req.body.email;
//     const password = req.body.password;

//     // Query the MongoDB database for the user with the specified email
//     const employee = await Employee.findOne({ email });

//     // If the user does not exist, return an error message
//     if (!employee) {
//       return res.json({ Status: "Error", Error: "User does not exist" });
//     }

//     // Compare the user's password to the hashed password in the database
//     const isPasswordCorrect = await bcrypt.compare(password, employee.password);

//     // If the password is incorrect, return an error message
//     if (!isPasswordCorrect) {
//       return res.json({ Status: "Error", Error: "Incorrect password" });
//     }

//     // Generate a JWT token for the user
//     const token = jwt.sign(
//       { role: "employee", id: employee._id },
//       "jwt-secret-key",
//       {
//         expiresIn: "1d",
//       }
//     );

//     // Set the JWT token as a cookie in the user's browser
//     res.cookie("token", token);

//     // Return a successful response
//     return res.json({ Status: "Success", id: employee._id });
//   } catch (error) {
//     console.log(error);
//     return res.json({ Status: "Error", Error: "Something went wrong" });
//   }
// });


// app.get("/logout", (req, res) => {
//   res.clearCookie("token");
//   return res.json({ Status: "Success" });
// });

// app.post("/create", upload.single("image"), (req, res) => {
//   bcrypt.hash(req.body.password, 10, (err, hash) => {
//     if (err) return res.json({ Error: "Error in hashing password" });

//     const employee = new Employee({
//       name: req.body.name,
//       email: req.body.email,
//       password: hash,
//       salary: req.body.salary,
//     });

//     employee.save((err, result) => {
//       if (err) return res.json({ Error: "Error in creating employee" });
//       return res.json({ Status: "Success" });
//     });
//   });
// });

// app.listen(8081, () => {
//   console.log("Running");
// });
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import EmployeeModel from "./models/Employee";
import AdminModel from "./models/Admin";


const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,

  })
);
app.use(express.json());
const uri =
  "mongodb+srv://ebrahimbeiaty:k3Udcr7L6BGPrV3v@cluster0.rplgbdj.mongodb.net/Employee-MS";

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
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));




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
  Employee.find()
    .then((employees) => res.json(employees))
    .catch((err) => console.log(err));
});

app.get("/get/:id", (req, res) => {
  const id = req.params.id;
  Employee.findById(id, (err, result) => {
    if (err) return res.json({ Error: "Get employee error in MongoDB" });
    return res.json({ Status: "Success", Result: result });
  });
});

app.put("/updateEmployee/:id", (req, res) => {
  const id = req.params.id;
  Employee.findByIdAndUpdate(id, req.body, (err, result) => {
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

app.get("/salary", async (req, res) => {
  try {
    const result = await Employee.aggregate([
      { $group: { _id: null, sumOfSalary: { $sum: "$salary" } } },
    ]);
    return res.json({ sumOfSalary: result[0].sumOfSalary });
  } catch (error) {
    console.error("Error in running query:", error);
    return res.json({ Error: "Error in running query" });
  }
});

app.post("/adminLogin", (req, res) => {
  AdminModel.create(req.body)
    .then(admins => res.json(admins))
    .catch(err => res.json(err))
});

  

// Employee login route
app.post("/employeeLogin", (req, res) => {
  EmployeeModel.create(req.body)
  .then(employees=>res.json(employees))
  .catch(err => res.json(err))
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
