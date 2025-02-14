import React from "react";
import { useNavigate } from "react-router-dom";
import Back from "../common/back/Back";
import "./contact.css";
import Footer from "../common/footer/Footer";

const Contact = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any form validation or API call here if needed
    navigate("/logins"); // Redirects to /logins after form submission
  };

  const map = 'https://www.google.com/maps/embed?...';

  return (
    <>
      <Back title="Contact us" />
      <section className="contact-container padding">
        <div className="contact-container-wrapper shadow flexSB">
          <div className="row">
            <div className="col-xl-6">
              <div className="contact-map">
                <iframe src={map}></iframe>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="contact-right">
                <h1 className="contact-heading">Contact us</h1>
                <p className="contact-description">
                  We're open for any suggestion or just to have a chat
                </p>

                <div className="contact-items grid2">
                  <div className="contact-item">
                    <h4>ADDRESS:</h4>
                    <p>Nhavi Tal-Indapur, Dist-Pune 413232</p>
                  </div>
                  <div className="contact-item">
                    <h4>EMAIL:</h4>
                    <p>akshayb1905@gmail.com</p>
                  </div>
                  <div className="contact-item">
                    <h4>PHONE:</h4>
                    <p>+91 9112959661</p>
                  </div>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-flex">
                    <input type="text" placeholder="Name" required />
                    <input type="email" placeholder="Email" required />
                  </div>
                  <input type="text" placeholder="Subject" required />
                  <textarea cols="30" rows="10" placeholder="Create a message here..." required />
                  <button type="submit" className="primary-btn">
                    SEND MESSAGE
                  </button>
                </form>

                <h3>Follow us here</h3>
                <span className="contact-social-links">
                  FACEBOOK TWITTER INSTAGRAM
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Contact;
