import React from 'react';
import "../../common/footer/Terms.css"
import { Link } from 'react-router-dom';
const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <h1>Terms and Conditions</h1>
      
      <section>
        <h2>1. Introduction</h2>
        <p>Welcome to FarmEco Services! These Terms and Conditions govern your use of our platform, services, and products. By accessing or using GrowAgro's services, you agree to be bound by these terms.</p>
      </section>

      <section>
        <h2>2. Definitions</h2>
        <ul>
          <li><strong>"Platform"</strong> refers to GrowAgro's website and services.</li>
          <li><strong>"Farmer"</strong> refers to any individual or business that generates agricultural waste and utilizes GrowAgro’s services.</li>
          <li><strong>"Waste Management Services"</strong> includes all services related to the collection, processing, and conversion of agricultural waste into useful products.</li>
          <li><strong>"Service Provider"</strong> refers to businesses that offer waste collection and recycling services.</li>
          <li><strong>"Processing Units"</strong> refers to the units that convert agricultural waste into products like compost, biofertilizer, or biogas.</li>
        </ul>
      </section>

      <section>
        <h2>3. Acceptance of Terms</h2>
        <p>By using our platform, you confirm that you have read, understood, and agree to comply with these Terms and Conditions. If you do not agree with any part of these terms, you should not use our services.</p>
      </section>

      <section>
        <h2>4. Eligibility</h2>
        <p>You must be at least 18 years old to use our platform. By agreeing to these terms, you confirm that you meet the eligibility criteria.</p>
      </section>

      <section>
        <h2>5. Registration</h2>
        <p>Farmers, service providers, and processing units must register an account to use GrowAgro’s services. You agree to provide accurate, complete, and up-to-date information during the registration process.</p>
      </section>

      <section>
        <h2>6. Services</h2>
        <p>- <strong>For Farmers:</strong> You can schedule waste collection, sell agricultural by-products, track waste processing, and more.</p>
        <p>- <strong>For Service Providers:</strong> You offer waste collection and processing services.</p>
        <p>- <strong>For Processing Units:</strong> You process agricultural waste into products like compost, biogas, etc.</p>
        <p>GrowAgro does not own or operate the waste collection, processing, or recycling services. We simply connect farmers with service providers and processing units.</p>
      </section>

      <section>
        <h2>7. User Responsibilities</h2>
        <p>You agree to use our platform in compliance with all local, state, and national laws. You are responsible for the accuracy and authenticity of the information you provide on the platform.</p>
        <p>You agree to keep your account login details confidential.</p>
      </section>

      <section>
        <h2>8. Payment and Billing</h2>
        <p>Farmers may be required to pay for waste collection services and other features on the platform. Service providers will be billed for services rendered to farmers. Payments must be made in accordance with the pricing plans provided on the platform.</p>
      </section>

      <section>
        <h2>9. Data Privacy</h2>
        <p>We value your privacy. By using our services, you agree to our <Link to="/privacy">PrivacyPolicy</Link>, which governs how your personal information is collected, used, and shared.</p>
      </section>

      <section>
        <h2>10. Waste Management and Environmental Responsibility</h2>
        <p>GrowAgro facilitates the conversion of agricultural waste into useful resources such as compost, biofertilizers, and biogas. By using our platform, you agree to comply with environmental laws and ensure that all waste is handled responsibly and sustainably.</p>
      </section>

      <section>
        <h2>11. Limitations of Liability</h2>
        <p>GrowAgro is not responsible for any damages, losses, or injuries arising from the use of our services or the use of third-party services. GrowAgro does not guarantee the quality or timeliness of services provided by third-party waste management companies or processing units.</p>
      </section>

      <section>
        <h2>12. Termination of Service</h2>
        <p>GrowAgro reserves the right to suspend or terminate any account that violates these Terms and Conditions. Users may terminate their accounts by following the account cancellation process outlined in the platform.</p>
      </section>

      <section>
        <h2>13. Modifications to Terms</h2>
        <p>GrowAgro reserves the right to modify these Terms and Conditions at any time. Any changes will be effective immediately upon posting to the platform. You are responsible for reviewing these terms periodically.</p>
      </section>

      <section>
        <h2>14. Governing Law</h2>
        <p>These Terms and Conditions will be governed by the laws of [Your Country/State], and any disputes will be resolved in the appropriate jurisdiction in [Your Location].</p>
      </section>

      <section>
        <h2>15. Contact Information</h2>
        <p>For any questions or concerns regarding these Terms and Conditions, please contact us at:</p>
        <ul>
          <li><strong>Email:</strong> support@growagro.com</li>
          <li><strong>Phone:</strong> +91 9112959661</li>
          <li><strong>Address:</strong> A/p Nhavi, Indapur Dist-Pune, 413132</li>
        </ul>
      </section>
    </div>
  );
};

export default TermsAndConditions;
