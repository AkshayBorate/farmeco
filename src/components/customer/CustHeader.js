// import React from "react";
// import { Link } from "react-router-dom";

// const Header = () => {
//   return (
//     <nav class="navbar navbar-expand-lg">
//       <div class="container-fluid">
//         <button
//           class="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <div class="navbar-toggler-icon"></div>
//         </button>
//         <div class="collapse navbar-collapse" id="navbarNav">
//           <ul class="navbar-nav">
//             <li class="nav-item">
//               <Link class="nav-link" aria-current="page" to="/">
//                 Home
//               </Link>
//             </li>
//             <li class="nav-item">
//               <Link class="nav-link" to="/sellwaste">
//                 Sell Waste
//               </Link>
//             </li>
//             <li class="nav-item">
//               <Link class="nav-link" to="/history">
//                 History
//               </Link>
//             </li>
//             <li class="nav-item">
//               <Link class="nav-link" to="/dashboard">
//                 Dashboard
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;

// import React from 'react';
// import { Link } from 'react-router-dom';

// const Header = () => {
//   return (
//     <nav className="navbar navbar-expand-lg">
//       <div className="container-fluid">
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <div className="navbar-toggler-icon"></div>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav">
//             <li className="nav-item">
//               <Link className="nav-link" aria-current="page" to="/">
//                 Home
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/sellwaste">
//                 Sell Waste
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/history">
//                 History
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/dashboard">
//                 Dashboard
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;

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
                <span className="brand-name">Jai Kisan Agro</span>
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
                    <Link className="nav-link ab-nav-link" to="/custheader/pricing">
                      Subscription Plans
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
