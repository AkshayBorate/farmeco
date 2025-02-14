import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Head from "./Head";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./header.css";

const Header = () => {
  const [click, setClick] = useState(false);
  const location = useLocation();
  

  const isLoginPage = location.pathname === "/logins";
  const isSignPage = location.pathname === "/signup";
  const isAdminPage = location.pathname === "/adminlogin";
  const isEmployeePage = location.pathname === "/employeelogin";
  

  if (isLoginPage || isSignPage ||isAdminPage||isEmployeePage) {
    return null;
  }


  

  return (
    <>
      <Head />
      {/* <div className="container">
        <div className="row"> */}
      <header>
        <nav className="flexSB">
          <ul
            className={click ? "mobile-nav" : "flexSB"}
            onClick={() => setClick(false)}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
           
            <li>
              <Link to="/about">About</Link>
            </li>
           
            <li>
              <Link to="/journal">Blogs</Link>
            </li>
          
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li className="loginc headlogin">
              <Link to="/logins">Login</Link>
            </li>
          </ul>
         
        </nav>
      </header>
      {/* </div>
      </div> */}
    </>
  );
};

export default Header;
