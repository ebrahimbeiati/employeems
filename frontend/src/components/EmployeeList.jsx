import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style.css"


// Define an interface for the employee object
// Define an object that represents an employee



function EmployeeList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/getEmployee")
      .then((res) => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          console.error("Failed to fetch employee data");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);



  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>Employee List</h3>
      </div>
      <Link to="/create" className="btn btn-success">
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>
                  <img
                    src={`http://localhost:3000/images/` + employee.image}
                    alt={employee.name}
                    className="employee_image"
                  />
                </td>
                <td>{employee.email}</td>
                <td>{employee.address}</td>
                <td>{employee.salary}</td>
                <td>
                  <Link
                    to={`/employeeEdit/` + employee.id}
                    className="btn btn-primary btn-sm me-2"
                  >
                    Edit
                  </Link>
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
