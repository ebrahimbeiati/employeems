import React from 'react'
import '../style.css'

const Login = () => {
  return (
    <div className="d-flex justify-content-center h-screen align-items-center  vh-100 loginPage">
      <div className="bg-white rounded-xl border w-25 p-3">
        <h1 className="align-items-center d-flex justify-content-center">
          <b>Login</b>
        </h1>
        <form>
          <div className="mb-3">
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="form-control rounded-0"
            />
          </div>
          <button
            className=" btn btn-success w-100 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Login
          </button>
          <p>
            Don't have an account?
            <a href="/register">
              <button
                className=" btn btn-success w-100 bg-yellow-500  font-bold py-2 px-4 rounded"
                type="submit">
                Register
              </button>
            </a>
          </p>
          <p>
            Forgot password?
            <a href="/forgot-password">Reset</a>
          </p>
          <p className="text-center m-1">
            <input type="checkbox" className='m-1' />I accept all terms and policies.
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login