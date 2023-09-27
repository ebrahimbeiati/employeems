import React, { useState } from "react";
import '../style.css'; // Adjust the path to point to your style.css file
import axios from "axios";
import { useNavigate } from "react-router-dom";
import{ Link} from "react-router-dom"

const AdminLogin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/employee/login", { email, password })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
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
              onChange={(e) => setEmail({ email: e.target.value })}
              className="form-control rounded-0"
              autoComplete="off"
              required
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
              onChange={(e) => setPassword({ password: e.target.value })}
              className="form-control rounded-0"
              required
            />
          </div>
          <Link
            to={"/employee"}
            type="submit"
            className="btn btn-success w-100 rounded-0"
          >
            Log in
          </Link>
        </form>
        <p>
          Forgot password?
          <a href="/forgot-password">Reset</a>
        </p>
        <p className="text-center m-1">
          <input type="checkbox" className="m-1" />I accept all terms and
          policies.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
// import React, { useState } from "react";
// import '../style.css'; // Adjust the path to point to your style.css file
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();
//   axios.defaults.withCredentials = true;
//   const [error, setError] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     axios
//       .post("http://localhost:8081/login", values)
//       .then((res) => {
//         if (res.data.Status === "Success") {
//           navigate("/");
//         } else {
//           setError(res.data.Error);
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
//       <div className="p-3 rounded w-25 border loginForm">
//         <div className="text-danger">{error && error}</div>
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="email">
//               <strong>Email</strong>
//             </label>
//             <input
//               type="email"
//               placeholder="Enter Email"
//               name="email"
//               onChange={(e) => setValues({ ...values, email: e.target.value })}
//               className="form-control rounded-0"
//               autoComplete="off"
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password">
//               <strong>Password</strong>
//             </label>
//             <input
//               type="password"
//               placeholder="Enter Password"
//               name="password"
//               onChange={(e) =>
//                 setValues({ ...values, password: e.target.value })
//               }
//               className="form-control rounded-0"
//             />
//           </div>
//           <button type="submit" className="btn btn-success w-100 rounded-0">
//             {" "}
//             Log in
//           </button>
//           <p>You are agree to aour terms and policies</p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;