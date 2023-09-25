import React from "react";
import Login from "./components/Login";
import EmployeeLogin from "./components/employees/EmployeeLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Admin/Dashboard";
import EmployeeList from "./components/Admin/EmployeeList";
import Profile from "./components/Profile";
import Home from "./components/Home";
import AddEmployee from "./components/Admin/AddEmployee";
import EditEmployee from "./components/Admin/EditEmployee"; // Adjust the import path as needed
import Start from "./components/Start";
import EmployeeDetail from "./components/employees/EmployeeDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="" element={<Home />}></Route>
          <Route path="/employee" element={<EmployeeList />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/create" element={<AddEmployee />}></Route>
          <Route path="/employeeEdit/:id" element={<EditEmployee />}></Route>
          <Route path="/employeeLogin" element={<EmployeeLogin />}></Route>

        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/start" element={<Start />}></Route>
        {/* <Route path="/employeeLogin" element={<EmployeeLogin />}></Route> */}
        <Route path="/employeedetail/:id" element={<EmployeeDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
