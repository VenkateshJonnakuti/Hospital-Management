// SignUpForm.js
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import logo from "./assets/logo1.jpg";
//this is a functional component
function SignUpForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    fetch("http://localhost:3001/logins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((responseData) => {
        alert("Sign up data submitted!");
        console.log("Saved:", responseData);
        reset(); // Clear form after successful submit
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container mt-4 d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow w-100" style={{ maxWidth: "520px" }}>
        <div className="text-center mb-4">
          <img src={logo} alt="logo" className="img-fluid" style={{ maxWidth: "150px" }} />
        </div>
        <h3 className="text-center mb-3">Sign Up</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <div className="text-danger">{errors.name.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Phone:</label>
            <input
              type="tel"
              className="form-control"
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone must be exactly 10 digits"
                }
              })}
            />
            {errors.phone && <div className="text-danger">{errors.phone.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Gender:</label>
            <select
              className="form-select"
              {...register("gender", { required: "Please select a gender" })}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <div className="text-danger">{errors.gender.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Role / Designation:</label>
            <select
              className="form-select"
              {...register("role", { required: "Please select a role" })}
            >
              <option value="">-- Select Role --</option>
              <option value="Doctor">Doctor</option>
              <option value="Patient">Patient</option>
              <option value="Nurse">Nurse</option>
            </select>
            {errors.role && <div className="text-danger">{errors.role.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format"
                }
              })}
            />
            {errors.email && <div className="text-danger">{errors.email.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
            />
            {errors.password && <div className="text-danger">{errors.password.message}</div>}
          </div>

          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>

        <p className="text-center mt-3">
          ⬅️ Back to Login? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpForm;
