import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    salary: "",
    image: null, // Initialize image as null
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    formdata.append("address", data.address);
    formdata.append("salary", data.salary);

    if (data.image !== null) {
      // Only append the image if it's not null
      formdata.append("image", data.image);
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/create",
        formdata
      );
      if (response.data.Status === "Success") {
        navigate("/employee");
      } else {
        alert("Error creating employee");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (event) => {
    // Handle changes to the image input field
    setData({ ...data, image: event.target.files[0] });
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Add Employee</h2>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Enter Name"
            autoComplete="off"
            onChange={(e) => setData({ ...data, name: e.target.value })}
            value={data.name}
            required
          />
        </div>
        {/* Add other form input fields here (email, password, etc.) */}
        <div className="col-12">
          <label htmlFor="inputImage" className="form-label">
            Image
          </label>
          <input
            type="file" // Use type "file" for image upload
            className="form-control"
            id="inputImage"
            accept="image/*" // Allow only image files
            onChange={handleImageChange} // Handle image change
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;
