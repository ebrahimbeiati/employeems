import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditEmployee() {
  const [data, setData] = useState({
    name: "",
    email: "",
    address: "",
    salary: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3000/get/" + id)
      .then((res) => {
        if (res.data.Status === "Success" && res.data.Result.length > 0) {
          const employeeData = res.data.Result[0];
          setData({
            ...data,
            name: employeeData.name,
            email: employeeData.email,
            address: employeeData.address,
            salary: employeeData.salary,
          });
        } else {
          console.log("Employee data not found");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .put("http://localhost:3000/update/" + id, data)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/employee");
        } else {
          console.error("Failed to update employee");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Update Employee</h2>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        {/* ... Input fields here */}
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEmployee;
