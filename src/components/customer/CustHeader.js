import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./CustHeader.css";

export default function CustHeader() {
  return (
    <div className="contain">
      <header className="ab-header">
        <div className="ab-container">
          <nav className="navbar navbar-expand-lg ab-navbar">
            <div className="container-fluid ab-container-fluid">
              <Link
                className="navbar-brand ab-navbar-brand"
                to="/custheader/dashboard"
              >
                <span className="brand-icon">🌍</span>
                <span className="brand-name">FarmEco</span>
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
                      to="/custheader/dashboard"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item ab-nav-item">
                    <Link
                      className="nav-link ab-nav-link"
                      to="/custheader/sellwaste"
                    >
                      Sell Waste
                    </Link>
                  </li>
                  <li className="nav-item ab-nav-item">
                    <Link
                      className="nav-link ab-nav-link"
                      to="/custheader/history"
                    >
                      History
                    </Link>
                  </li>
                  <li className="nav-item ab-nav-item">
                    <Link className="nav-link ab-nav-link" to="/custheader/marketplace">
                      MaketPlace
                    </Link>
                  </li>

                  <li className="nav-item dropdown ab-dropdown">
                    <Link
                      className="nav-link dropdown-toggle ab-dropdown-toggle"
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Support
                    </Link>
                    <ul className="dropdown-menu ab-dropdown-menu">
                      <li>
                        <Link
                          className="dropdown-item ab-dropdown-item"
                          to="/custheader/contact1"
                        >
                          Contact
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item ab-dropdown-item"
                          to="/custheader/feedback1"
                        >
                          Give Review
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
                {/* <button className="btn btn-outline-success ab-btn">
                  <Link to="/loginc" className="ab-logout-link">
                    Logout
                  </Link>
                </button> */}
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}