import React, { useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:8081/dashboard").then((res) => {
      if (res.data.Status === "Success") {
        if (res.data.role === "admin") {
          navigate("/");
        } else {
          const id = res.data.id;
          navigate("/employeedetail/" + id);
        }
      } else {
        navigate("/start");
      }
    });
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:8081/logout")
      .then((res) => {
        navigate("/start");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div classNameName="container-fluid">
      <div classNameName="row flex-nowrap">
        <div classNameName="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div classNameName="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a
              href="/"
              classNameName="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span classNameName="fs-5 fw-bolder d-none d-sm-inline">
                Admin Dashboard
              </span>
            </a>
            <ul
              classNameName="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li>
                <Link
                  to="/"
                  data-bs-toggle="collapse"
                  classNameName="nav-link text-white px-0 align-middle"
                >
                  <i classNameName="fs-4 bi-speedometer2"></i>{" "}
                  <span classNameName="ms-1 d-none d-sm-inline">Dashboard</span>{" "}
                </Link>
              </li>
              <li>
                <Link
                  to="/employee"
                  classNameName="nav-link px-0 align-middle text-white"
                >
                  <i classNameName="fs-4 bi-people"></i>{" "}
                  <span classNameName="ms-1 d-none d-sm-inline">
                    Manage Employees
                  </span>{" "}
                </Link>
              </li>
              <li>
                <Link
                  to="profile"
                  classNameName="nav-link px-0 align-middle text-white"
                >
                  <i classNameName="fs-4 bi-person"></i>{" "}
                  <span classNameName="ms-1 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li onClick={handleLogout}>
                <a href="#" classNameName="nav-link px-0 align-middle text-white">
                  <i classNameName="fs-4 bi-power"></i>{" "}
                  <span classNameName="ms-1 d-none d-sm-inline">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div classNameName="col p-0 m-0">
          <div classNameName="p-2 d-flex justify-content-center shadow">
            <h4>Employee Management System</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
