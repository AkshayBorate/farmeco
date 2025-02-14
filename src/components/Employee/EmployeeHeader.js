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
              <Link
                className="navbar-brand ab-navbar-brand"
                to="/empdash/dashboard"
              >
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
              <div
                className="collapse navbar-collapse ab-navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ab-nav">
                  <li className="nav-item ab-nav-item">
                    <Link
                      className="nav-link ab-nav-link"
                      to="/empdash/dashboard"
                    >
                      Dashboard
                    </Link>
                  </li>

                  <li className="nav-item ab-nav-item">
                    <Link
                      className="nav-link ab-nav-link"
                      to="/empdash/processingstatus"
                    >
                      Processing Status
                    </Link>
                  </li>
                  <li className="nav-item dropdown ab-nav-item">
                    <Link
                      className="nav-link dropdown-toggle ab-nav-link"
                      to="#"
                      id="stockDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Stock Management
                    </Link>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="stockDropdown"
                    >
                      <li>
                        <Link className="dropdown-item" to="/empdash/addstock">
                          Add Stock
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/empdash/productlisting">
                          View Stock
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item dropdown ab-nav-item">
                    <Link
                      className="nav-link dropdown-toggle ab-nav-link"
                      to="#"
                      id="recordDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Manage Records
                    </Link>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="recordDropdown"
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/empdash/wasteintake"
                        >
                          Add Record
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/empdash/viewrecords"
                        >
                          View Records
                        </Link>
                      </li>
                    </ul>
                    
                  </li>
                </ul>
                <li className="nav-item ab-nav-item">
                    <Link
                      className="nav-link ab-nav-link"
                      to="/empdash/queries"
                    >
                      Queries
                    </Link>
                  </li>
                <button className="btn btn-outline-success ab-btn">
                  <Link to="/logins" className="ab-logout-link">
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
