import React from "react";
import Heading from "../../common/heading/Heading";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="row">
            <Heading subtitle="WELCOME TO Jai Kisan Agro" title="Best Agri Waste Platform in India" />
            <p>
              Agri waste includes crop residues and manure, recycled for compost, bioenergy, or reducing pollution.
            </p>
            <div className="button">
              <Link to="/loginc" className="primary-btn">
                GET STARTED NOW <i className="fa fa-long-arrow-alt-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="margin"></div>
    </>
  );
};

export default Hero;
