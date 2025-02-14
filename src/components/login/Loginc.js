import React from "react";
import { Link } from "react-router-dom";
import "./Loginc.css";

export default function Loginc() {
  return (
    <div className="login-container">
      <header className="login-header">
        <h1 className="title">Welcome to the Portal</h1>
        {/* <p className="subtitle">Please select your role to continue.</p> */}
      </header>

      <div className="login-options">
        <div className="login-card">
          <h2>Administrator</h2>
          <p>Manage system configurations and operations efficiently.</p>
          <Link to="/adminlogin" className="login-btn">
            Access Dashboard
          </Link>
        </div>

        <div className="login-card">
          <h2>Employee Portal</h2>
          <p>Collaborate and access essential work resources.</p>
          <Link to="/employeelogin" className="login-btn">
            Proceed
          </Link>
        </div>

        <div className="login-card">
          <h2>Farmer Access</h2>
          <p>Explore services, manage orders, and view your account.</p>
          <Link to="/logins" className="login-btn">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}
