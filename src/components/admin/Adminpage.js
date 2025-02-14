import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import "./Adminpage.css";

export default function Adminpage() {
  const navigate = useNavigate();


  const handleLogout =()=>{
    if(window.confirm("are you sure you want to log out")){
      navigate("/logins")
    }
  }

  return (
    <div className="contain">
      <header className="ab-header">
        <div className="ab-container">
          <nav className="navbar navbar-expand-lg ab-navbar">
            <div className="container-fluid ab-container-fluid">
              <Link className="navbar-brand ab-navbar-brand" to="/admindash/home">
                Admin Dashboard
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
                    <Link className="nav-link ab-nav-link" to="/admindash/home">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item ab-nav-item">
                    <Link className="nav-link ab-nav-link" to="/admindash/empcreate">
                      Create Employer
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
                      Employee & Users
                    </Link>
                    <ul className="dropdown-menu ab-dropdown-menu">
                      <li>
                        <Link className="dropdown-item ab-dropdown-item" to="/admindash/allemp">
                          Total Employee
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item ab-dropdown-item" to="/admindash/alluser">
                          Total Users
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item ab-dropdown-item" to="/admindash/reviews">
                          Reviews
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown ab-dropdown">
                    <Link
                      className="nav-link dropdown-toggle ab-dropdown-toggle"
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Details
                    </Link>
                    <ul className="dropdown-menu ab-dropdown-menu">
                      <li>
                        <Link className="dropdown-item ab-dropdown-item" to="/admindash/pendingapproval">
                          Pending Approvals
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item ab-dropdown-item" to="/admindash/totalpickups">
                          Total Pickups
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item ab-dropdown-item" to="/admindash/stock">
                          Available Stock
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
                <button className="btn btn-outline-success ab-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}
