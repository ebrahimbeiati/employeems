// import React from "react";
// import Login from "./components/Login";
// import EmployeeLogin from "./components/employees/EmployeeLogin";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "./components/Admin/Dashboard";
// import EmployeeList from "./components/Admin/EmployeeList";
// import Profile from "./components/Profile";
// import Home from "./components/Home";
// import AddEmployee from "./components/Admin/AddEmployee";
// import EditEmployee from "./components/Admin/EditEmployee"; // Adjust the import path as needed
// import Start from "./components/Start";
// import EmployeeDetail from "./components/employees/EmployeeDetail";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route>
//         <Route path="/login" element={<Login />}></Route>
//         <Route path="/start" element={<Start />}></Route>
//         <Route path="/employeeLogin" element={<EmployeeLogin />}></Route>
//         </Route>
//          <Route path="/" element={<Home />}></Route>
//          <Route path="/" element={<Dashboard />}>
//           <Route path="/employee" element={<EmployeeList />}></Route>
//           <Route path="/profile" element={<Profile />}></Route>
//           <Route path="/create" element={<AddEmployee />}></Route>
//           <Route path="/employeeEdit/:id" element={<EditEmployee />}></Route>
//           <Route path="/employeeDetail/:id" element={<EmployeeDetail />}></Route>
//         </Route>
       
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import EmployeeList from "./components/EmployeeList";
import Profile from "./components/Profile";
import Home from "./components/Home";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import Start from "./components/Start";
import EmployeeDetail from "./components/EmployeeDetail";
import EmployeeLogin from "./components/EmployeeLogin";
import AdminLogin from "./components/AdminLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Dashboard is the default child route */}
          <Route path="/" element={<Home />} />

          {/* Add other child routes for the dashboard */}
          <Route path="/employee" element={<EmployeeList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<AddEmployee />} />
          <Route path="/employeeEdit/:id" element={<EditEmployee />} />
          <Route path="/employeeDetail/:id" element={<EmployeeDetail />} />
        </Route>

        {/* Define separate routes for login and start pages */}
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/start" element={<Start />} />
        <Route path="/employeeLogin" element={<EmployeeLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

