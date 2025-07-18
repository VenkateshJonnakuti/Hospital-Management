// LoginPage.js
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import logo from "./assets/logo.jpg";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    fetch(`http://localhost:3001/logins?email=${data.email}&password=${data.password}`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.length > 0) {
          alert("Login successful!");
          localStorage.setItem("isLoggedIn", "true");
          navigate("/data");
        } else {
          alert("Invalid email or password");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        alert("Server error");
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: "420px", width: "100%" }}>
        <div className="text-center mb-4">
          <img src={logo} alt="logo" className="img-fluid" style={{ maxWidth: "180px" }} />
        </div>
        <h3 className="text-center mb-3">Login</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-danger">{errors.password.message}</p>}
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        <p className="text-center mt-3">
          New user? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
