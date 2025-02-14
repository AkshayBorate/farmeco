import React, { useState } from "react";
import "../feedback/Feedback.css";

const FeedbackForm1 = () => {
  const userId = localStorage.getItem("userId");

  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    mobile: "",
    rating: 0,
    reviewText: "",
    farmer: {
      id: userId,
      name: "", 
    },
  });

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (rating) => {
    setFeedback({ ...feedback, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8085/reviews/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback),
      });

      if (response.ok) {
        alert("Thank you for your feedback!");
        setFeedback({
          name: "",
          email: "",
          mobile: "",
          rating: 0,
          reviewText: "",
          farmer: {
            id: userId,
            name: "",
          },
        });
      } else {
        alert("Failed to submit feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="feedback-form-container">
      <h2 className="feedback-form-title">Feedback Form</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        {/* <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={feedback.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            value={feedback.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Mobile:</label>
          <input
            type="tel"
            name="mobile"
            value={feedback.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            className="form-input xs"
            required
          />
        </div> */}
        <div className="form-group">
          <label className="form-label">Rating:</label>
          <div className="rating-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRatingChange(star)}
                className={`rating-star ${star <= feedback.rating ? "active-star" : ""}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Message:</label>
          <textarea
            name="reviewText"
            value={feedback.reviewText}
            onChange={handleChange}
            placeholder="Enter your feedback"
            rows="4"
            className="form-textarea"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm1;
