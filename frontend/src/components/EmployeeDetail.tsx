import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    salary: "",
    image: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8081/get/" + id) // Updated URL to match your backend
      .then((res) => setEmployee(res.data.Result[0]))
      .catch((err) => {
        console.error("Failed to fetch employee data:", err);
      });
  }, [id]);

  const handleLogout = () => {
    axios
      .get("http://localhost:8081/logout") // Updated URL to match your backend
      .then(() => {
        navigate("/start");
      })
      .catch((err) => {
        console.error("Logout error:", err);
      });
  };

  // Conditional rendering when employee data is not available yet
  if (!employee.name) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-center flex-column align-items-center mt-3">
        <img
          src={`http://localhost:3000/images/` + employee.image}
          alt=""
          className="empImg"
        />
        <div className="d-flex align-items-center flex-column mt-5">
          <h3>Name: {employee.name}</h3>
          <h3>Email: {employee.email}</h3>
          <h3>Salary: {employee.salary}</h3>
        </div>
        <div>
          <button className="btn btn-primary me-2">Edit</button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetail;
