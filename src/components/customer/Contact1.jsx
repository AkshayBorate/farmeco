import React, { useState } from "react";
import "../contact/contact.css";

const Contact1 = () => {
  const map =
    'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d904726.6131739549!2d85.24565535!3d27.65273865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1652535615693!5m2!1sen!2snp" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade';

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const farmerId = localStorage.getItem("userId");
    if (!farmerId) {
      alert("User ID not found in local storage!");
      return;
    }

    const payload = {
      farmer: { id: farmerId },
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      createdAt: Date.now(),
    };

    try {
      const response = await fetch("http://localhost:8085/contact/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="contact-container padding">
      <div className="contact-container-wrapper shadow flexSB">
        <div className="row">
          <div className="col-xl-6">
            <div className="contact-map">
              <iframe src={map} title="Google Map" />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="contact-right">
              <h1 className="contact-heading">Contact us</h1>
              <p className="contact-description">
                We're open for any suggestion or just to have a chat
              </p>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-flex">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Name"
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Email"
                    onChange={handleChange}
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  placeholder="Subject"
                  onChange={handleChange}
                />
                <textarea
                  name="message"
                  cols="30"
                  rows="10"
                  value={formData.message}
                  placeholder="Create a message here..."
                  onChange={handleChange}
                />
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
  );
};

export default Contact1;
