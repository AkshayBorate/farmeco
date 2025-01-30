import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../admin/Adminpage.css";

export default function EmployeeHeader() {
  return (
    <div className="contain">
      <header className="ab-header">
        <div className="ab-container">
          <nav className="navbar navbar-expand-lg ab-navbar">
            <div className="container-fluid ab-container-fluid">
              <Link className="navbar-brand ab-navbar-brand" to="/empdash/dashboard">
               Emplyee Dashboard
              </Link>
              <button
                className="navbar-toggler ab-navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon ab-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse ab-navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ab-nav">
                  <li className="nav-item ab-nav-item">
                    <Link className="nav-link ab-nav-link" to="/empdash/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item ab-nav-item">
                    <Link className="nav-link ab-nav-link" to="/empdash/wasteintake">
                      Waste Intake
                    </Link>
                  </li>
                  <li className="nav-item ab-nav-item">
                    <Link className="nav-link ab-nav-link" to="/empdash/processingstatus">
                      Processing Status
                    </Link>
                  </li>
                  <li className="nav-item ab-nav-item">
                    <Link className="nav-link ab-nav-link" to="/empdash/productlisting">
                      Product Listings
                    </Link>
                  </li>
                  
                </ul>
                <button className="btn btn-outline-success ab-btn">
                  <Link to="/loginc" className="ab-logout-link">
                    Logout
                  </Link>
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}
