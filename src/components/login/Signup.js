import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

export default function SignupPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobile] = useState("");
  const [birthdate, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateFields = () => {
    if (
      !fullName.trim() ||
      !email.trim() ||
      !mobileNo.trim() ||
      !birthdate.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setErrorMessage("All fields are required!");
      return false;
    }
    if (!/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(fullName)) {
      setErrorMessage("Full Name must contain only letters and spaces.");
      return false;
    }
    if (!/^[6-9][0-9]{9}$/.test(mobileNo)) {
      setErrorMessage(
        "Mobile Number must be a valid 10-digit number starting with 6-9."
      );
      return false;
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setErrorMessage("Invalid email format.");
      return false;
    }
    if (
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$])[A-Za-z0-9@#$]{6,12}$/.test(
        password
      )
    ) {
      setErrorMessage(
        "Password must be 6-12 characters and include at least one digit, lowercase, uppercase letter, and special character."
      );
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSignupSuccess = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    if (!validateFields()) return;

    setShowOtpField(true);
    setLoading(true);

    const userData = {
      name: fullName,
      email: email,
      mobileNo: mobileNo,
      birthdate: birthdate,
      password: password,
    };

    try {
      const response = await fetch(
        "http://localhost:8085/api/farmers/addUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        setShowOtpField(false);
        const message = await response.text();
        throw new Error(message || "Failed to create account.");
      }

      alert("User added successfully! OTP sent to your email.");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    if (!otp.trim()) {
      setErrorMessage("Please enter the OTP.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8085/api/farmers/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) {
        throw new Error("Invalid OTP. Please try again.");
      }

      alert("Account verified successfully!");
      navigate("/logins");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <div className="signup-wrapper">
        <div className="signup-card">
          <Link to="/" className="signup-link">
            Back
          </Link>
          <br />
          <h2 className="signup-header">Create an Account</h2>
          {!showOtpField ? (
            <form className="signup-form" onSubmit={handleSignupSuccess}>
              {errorMessage && (
                <p className="signup-error-message">{errorMessage}</p>
              )}
              <input
                className="signup-input-field"
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <input
                className="signup-input-field"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="signup-input-field"
                type="tel"
                placeholder="Mobile Number"
                value={mobileNo}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
              <label htmlFor="birthdate" style={{ color: "white" }}>Birth Date</label>
              <input
                className="signup-input-field"
                type="date"
                placeholder="Birth Date"
                value={birthdate}
                onChange={(e) => setDateOfBirth(e.target.value)}
                max={new Date().toISOString().split("T")[0]} 
                required
              />
              <input
                className="signup-input-field"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                className="signup-input-field"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button type="submit" className="signup-btn" disabled={loading}>
                {loading ? "Processing..." : "Sign Up"}
              </button>
            </form>
          ) : (
            <form className="signup-form" onSubmit={handleOtpVerification}>
              {errorMessage && (
                <p className="signup-error-message">{errorMessage}</p>
              )}
              <input
                className="signup-input-field"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button type="submit" className="signup-btn">
                Verify OTP
              </button>
            </form>
          )}
          <div className="signup-footer">
            <p>
              Already have an account?{" "}
              <Link to="/logins" className="signup-link">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
