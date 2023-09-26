import React, { useState } from "react";
import "../style.css"; // Adjust the path to point to your style.css file
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function EmployeeLogin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
     axios.post("http://localhost:8081/employeeLogin",{email,password})
     .then(result =>console.log(result))
     .catch(err => console.log(err))
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <div className="text-danger">{error && error}</div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={(e)=>setEmail(e.target.value)}
              className="form-control rounded-0"
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={(e) =>
                setPassword( e.target.value )
              }
              className="form-control rounded-0"
            />
          </div>
          <Link
            to={"/employeeDetail/:id"}
            className="btn btn-success w-100 rounded-0"
          >
            {" "}
            Log in
          </Link>
          <p>You agree to our terms and policies</p>
        </form>
      </div>
    </div>
  );
}

export default EmployeeLogin;
