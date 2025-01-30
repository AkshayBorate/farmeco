import React from "react";
import "../../common/footer/Privacy.css"; 

export default function PrivacyPolicy() {
  return (
    <div className="privacy-policy-container">
      <h1 className="title">Privacy Policy</h1>
      <p className="effective-date">Effective Date: [10-11-2024]</p>

      <section className="section">
        <h2>1. Information We Collect</h2>
        <p>
          We collect the following types of information to provide and improve our services:
        </p>
        <ul>
          <li>
            <strong>Personal Information:</strong> Name, email address, phone number, address, and payment details.
          </li>
          <li>
            <strong>Farm and Business Information:</strong> Farm details, waste type, waste volume, and related data.
          </li>
          <li>
            <strong>Usage Data:</strong> Information about your device, browser, and interactions with the platform.
          </li>
          <li>
            <strong>Cookies and Tracking Technologies:</strong> To enhance user experience and analyze platform usage.
          </li>
        </ul>
      </section>

      <section className="section">
        <h2>2. How We Use Your Information</h2>
        <ul>
          <li><strong>Service Delivery:</strong> Enable account creation, login, scheduling, and tracking services.</li>
          <li><strong>Platform Improvement:</strong> Analyze usage patterns to enhance platform functionality.</li>
          <li><strong>Marketing:</strong> Send promotional offers, updates, and newsletters (with your consent).</li>
          <li><strong>Legal Compliance:</strong> Comply with laws and prevent fraudulent activities.</li>
        </ul>
      </section>

      <section className="section">
        <h2>3. How We Share Your Information</h2>
        <ul>
          <li><strong>With Service Providers:</strong> Share data with waste management companies for service fulfillment.</li>
          <li><strong>Legal Requirements:</strong> Share data when required by law or government orders.</li>
          <li><strong>Business Transfers:</strong> Transfer data in case of a merger or acquisition.</li>
        </ul>
      </section>

      <section className="section">
        <h2>4. Your Privacy Rights</h2>
        <ul>
          <li><strong>Access and Update:</strong> Review and update your personal information through your account settings.</li>
          <li><strong>Data Deletion:</strong> Request data deletion by contacting us at <strong>akshayb1905@gmail.com</strong>.</li>
          <li><strong>Opt-Out:</strong> Unsubscribe from promotional emails or disable cookies in your browser.</li>
        </ul>
      </section>

      <section className="section">
        <h2>5. How We Protect Your Information</h2>
        <p>
          We implement robust security measures, including encryption, regular system monitoring, and restricted access to sensitive data.
        </p>
      </section>

      <section className="section">
        <h2>6. Contact Us</h2>
        <p>If you have any questions or concerns, please contact us:</p>
        <ul>
          <li><strong>Email:</strong> akshayb1905@gmail.com</li>
          <li><strong>Phone:</strong> +91 9112959661</li>
          <li><strong>Address:</strong> A/p Nhavi, Indapur, Pune, 413132</li>
        </ul>
      </section>
    </div>
  );
}
