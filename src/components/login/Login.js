import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export default function RoleBasedLogin() {
  const [role, setRole] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please fill out both fields!");
      return;
    }

    try {
      const loginData = { email, password };
      const apiUrl =
        role === "customer"
          ? "http://localhost:8085/api/farmers/login"
          : "http://localhost:8085/api/employee/login";

      const response = await axios.post(apiUrl, loginData);

      if (response.status === 200) {
        const { id, role: userRole } = response.data;
        let dashboardPath = "";

        if (role === "customer") {
          // For customer role, directly route without role validation
          dashboardPath = "/custheader/dashboard";
          localStorage.setItem("userId", id);
        } else if (userRole === "ADMIN") {
          dashboardPath = "/admindash/home";
          localStorage.setItem("adminId", id);
        } else if (userRole === "EMPLOYEE") {
          dashboardPath = "/empdash/dashboard";
          localStorage.setItem("employeeId", id);
        } else {
          setErrorMessage("Unauthorized access!");
          return;
        }

        alert("Login successful!");
        navigate(dashboardPath);
      } else {
        setErrorMessage("Invalid email or password.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error while logging in. Please try again later."
      );
      console.error(error);
    }
  };

  return (
    <div className="unique-login-page">
      <div className="unique-login-container">
        <div className="unique-form-container">
          <Link to="/" className="signup-link">Back</Link>
          <h2 className="unique-form-title">Sign In</h2>
          <form
            className="unique-form unique-signin-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="unique-form-group">
              <label htmlFor="role">Select Role</label>
              <select
                className="unique-form-input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin/Employee</option>
              </select>
            </div>

            <div className="unique-form-group">
              <label>Email</label>
              <input
                className="unique-form-input"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="unique-form-group">
              <label>Password</label>
              <input
                className="unique-form-input"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button
              type="button"
              className="unique-form-submit-button"
              onClick={handleLogin}
            >
              Sign In
            </button>

            {role === "customer" && (
              <div className="unique-signup-link">
                <p>
                  Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
                <p>
                  <Link to="/forpass">Forgot Password</Link>
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
