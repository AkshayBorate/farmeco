import React from "react";
import "./App.css";
import Header from "./components/common/header/Header";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import About from "./components/about/About";
// import CourseHome from "./components/allcourses/CourseHome";

import Pricing from "./components/pricing/Pricing";
import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";
import Footer from "./components/common/footer/Footer";
import Home from "./components/home/Home";
import Login from "./components/login/Login";


function App() {
  return (
<>
{/* {role=='admin'?<>:<></>} */}
        <Header />
       <Outlet/>

        <Footer />
        </>
    
  );
}

export default App;
