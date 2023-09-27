
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
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/start" element={<Start />} />
        <Route path="/employeeLogin" element={<EmployeeLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

