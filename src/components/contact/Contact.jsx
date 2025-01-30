import React from "react";
import Back from "../common/back/Back";
import "./contact.css";

const Contact = () => {
  const map = 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d904726.6131739549!2d85.24565535!3d27.65273865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1652535615693!5m2!1sen!2snp" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" ';

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
            <p className="contact-description">We're open for any suggestion or just to have a chat</p>

            <div className="contact-items grid2">
              <div className="contact-item">
                <h4>ADDRESS:</h4>
                <p>Nhavi Tal-Indapur,Dist-Pune 413232</p>
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

            <form className="contact-form">
              <div className="form-flex">
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
              </div>
              <input type="text" placeholder="Subject" />
              <textarea cols="30" rows="10">
                Create a message here...
              </textarea>
              <button className="primary-btn">SEND MESSAGE</button>
            </form>

            <h3>Follow us here</h3>
            <span className="contact-social-links">FACEBOOK TWITTER INSTAGRAM</span>
            </div>
          </div>
        </div>
        </div>
      </section>
      
   
    </>
  );
};

export default Contact;
