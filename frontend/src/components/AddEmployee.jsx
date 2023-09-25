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
    image: null,
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object and append the employee data
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("address", data.address);
    formData.append("salary", data.salary);

    if (data.image !== null) {
      formData.append("image", data.image);
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/create",
        formData
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

const handleImageChange = (e) => {
  if (e.target.files) {
    // Handle changes to the image input field
    setData({ ...data, image: e.target.files[0] });
  } else {
    // Handle the case where no file is selected
  }
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
