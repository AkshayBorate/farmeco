import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function AdminLogin() {
  const admin = useRef();
  const pass = useRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();

 

  const handleLogin = (e) => {
    e.preventDefault();
    const adminVal = admin.current.value.trim();
    const passVal = pass.current.value.trim();

    if (!adminVal || !passVal) {
      setError("Username and password cannot be empty.");
      return;
    }

    if (adminVal === "admin" && passVal === "password") {
      setError("");
      navigate("/admindash/home");
    } else {
      setError("Please enter valid credentials");
    }
  };

  return (
    <div className="unique-login-page">
      <div className="unique-login-container">
        <div className="unique-form-container">
          <Link to="/loginc" className="signup-link">Back</Link>
          <h1 className="unique-form-title">Admin</h1>
          <h2 className="unique-form-title">Sign In</h2>
          <form className="unique-form unique-signin-form" onSubmit={handleLogin}>
            <div className="unique-form-group">
              <label htmlFor="username">Username</label>
              <input
                className="unique-form-input"
                type="text"
                name="username"
                placeholder="Enter your username"
                ref={admin}
              />
            </div>
            <div className="unique-form-group">
              <label htmlFor="password">Password</label>
              <input
                className="unique-form-input"
                type="password"
                name="password"
                placeholder="Enter your password"
                ref={pass}
              />
            </div>
          
            <button type="submit" className="unique-form-submit-button">
              Sign In
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
}
