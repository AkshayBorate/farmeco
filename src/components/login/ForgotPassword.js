import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const handleForgotPassword = async () => {
    if (!email || !newPassword) {
      alert("Please provide both email and new password.");
      return;
    }

    setStep(2);

    try {
      const response = await fetch("http://localhost:8085/api/farmers/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("OTP sent successfully. Please check your email.");
      } else {
        setStep(1);
        alert(data.message);
      }
    } catch (error) {
      setStep(1);
      alert("Something went wrong!");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8085/api/farmers/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setStep(1);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Verification failed.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <Link to="/logins" className="signup-link">Back</Link>
        <h2 style={styles.title}>{step === 1 ? "Forgot Password" : "Verify OTP"}</h2>
        {step === 1 ? (
          <>
          
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleForgotPassword} style={styles.button}>
              Submit
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleVerifyOtp} style={styles.button}>
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f9f9f9",
  },
  card: {
    width: "350px",
    padding: "30px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "20px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default ForgotPassword;