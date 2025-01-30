import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faUniversity, faQrcode } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./PaymentPage.css";

const stripePromise = loadStripe("your-publishable-key-here");

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setMessage("Stripe is not ready yet.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { data } = await axios.post("http://localhost:5000/create-payment-intent", { amount });
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: cardElement },
      });

      if (result.error) {
        setMessage(`Payment failed: ${result.error.message}`);
      } else if (result.paymentIntent.status === "succeeded") {
        setMessage("Payment successful! Thank you for your purchase.");
      }
    } catch {
      setMessage("An error occurred during the payment process. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <div className="payment-options">
        <label>
          <input
            type="radio"
            name="payment-method"
            value="card"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
          />
          <span className="icon">
            <FontAwesomeIcon icon={faCreditCard} size="lg" />
          </span>
          Credit/Debit Card
        </label>

        <label>
          <input
            type="radio"
            name="payment-method"
            value="upi"
            checked={paymentMethod === "upi"}
            onChange={() => setPaymentMethod("upi")}
          />
          <span className="icon">
            <FontAwesomeIcon icon={faQrcode} size="lg" />
          </span>
          UPI
        </label>

        <label>
          <input
            type="radio"
            name="payment-method"
            value="netbanking"
            checked={paymentMethod === "netbanking"}
            onChange={() => setPaymentMethod("netbanking")}
          />
          <span className="icon">
            <FontAwesomeIcon icon={faUniversity} size="lg" />
          </span>
          Net Banking
        </label>
      </div>

      {paymentMethod === "card" && <CardElement />}
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : `Pay $${amount}`}
      </button>
      {message && (
        <p className={message.includes("successful") ? "success" : "error"}>{message}</p>
      )}
    </form>
  );
};

const PaymentPage = () => {
  const location = useLocation();
  const { amount } = location.state || { amount: 0 };

  if (!amount || amount <= 0) {
    return (
      <div className="payment-page">
        <h1>Error</h1>
        <p>Invalid payment amount. Please go back and try again.</p>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <h1>Payment Page</h1>
      <p>You are about to pay <strong>${amount}</strong></p>
      <Elements stripe={stripePromise}>
        <CheckoutForm amount={amount} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
