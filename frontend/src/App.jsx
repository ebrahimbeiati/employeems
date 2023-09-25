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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Admin/Dashboard";
import EmployeeList from "./components/Admin/EmployeeList";
import Profile from "./components/Profile";
import Home from "./components/Home";
import AddEmployee from "./components/Admin/AddEmployee";
import EditEmployee from "./components/Admin/EditEmployee";
import Start from "./components/Start";
import EmployeeDetail from "./components/employees/EmployeeDetail";
import Login from "./components/Login";
import EmployeeLogin from "./components/employees/EmployeeLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define the common route for dashboard and its child routes */}
        <Route path="/" element={<Dashboard />}>
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
        <Route path="/login" element={<Login />} />
        <Route path="/start" element={<Start />} />
        <Route path="/employeeLogin" element={<EmployeeLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

