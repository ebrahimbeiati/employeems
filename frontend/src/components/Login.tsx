import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style.css";

const Login = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    // Add type annotation here
    e.preventDefault();
    console.log(value);

    axios
      .post("http://localhost:3000/login", value)
      .then((res) => {
        console.log(res);
        alert("Login Success");
        // Clear the form
        setValue({ email: "", password: "" });
        // Redirect to another page (e.g., dashboard)
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        alert("Login failed. Please check your credentials.");
      });
  };

  return (
    <div classNameName="d-flex justify-content-center h-screen align-items-center vh-100 loginPage">
      <div classNameName="bg-white rounded-xl border w-25 p-3">
        <h1 classNameName="align-items-center d-flex justify-content-center loginForm">
          <b>Login</b>
        </h1>
        <form onSubmit={handleSubmit} classNameName="loginForm">
          <div classNameName="mb-3">
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              onChange={(e) => setValue({ ...value, email: e.target.value })}
              type="email"
              id="email"
              placeholder="Enter your Email"
              classNameName="form-control rounded-0"
              value={value.email}
              required
            />
          </div>
          <div classNameName="mb-3">
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              onChange={(e) => setValue({ ...value, password: e.target.value })}
              type="password"
              id="password"
              placeholder="Enter your password"
              classNameName="form-control rounded-0"
              value={value.password}
              required
            />
          </div>
          <button
            classNameName="btn btn-success w-100 bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Login
          </button>
          <p>
            Don't have an account?
            <button
              classNameName="btn btn-success w-100 bg-yellow-500 font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </p>
          <p>
            Forgot password?
            <a href="/forgot-password">Reset</a>
          </p>
          <p classNameName="text-center m-1">
            <input type="checkbox" classNameName="m-1" />I accept all terms and
            policies.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
