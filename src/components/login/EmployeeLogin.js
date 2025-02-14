
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { useState } from "react";

export default function EmployeeLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const loginData = { email, password };

            const response = await axios.post("http://localhost:8085/api/employee/login", loginData);

            if (response.status === 200) {
                const employeeId = response.data.id;

                localStorage.setItem("employeeId", employeeId);

                alert("Login Successful!");
                navigate("/empdash/dashboard");
            } else {
                setErrorMessage("Invalid email or password.");
            }
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || "Error while logging in. Please try again later."
            );
            console.error(error);
        }
    };

    return (
        <div className="unique-login-page">
            <div className="unique-login-container">
                <div className="unique-form-container">
                    <Link to="/loginc" className="signup-link">Back</Link>
                    <h1 className="unique-form-title">Employee Login</h1>
                    <form
                        className="unique-form unique-signin-form"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div className="unique-form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                className="unique-form-input"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="unique-form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                className="unique-form-input"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {errorMessage && (
                            <p className="error-message">{errorMessage}</p>
                        )}
                        <button
                            type="button"
                            className="unique-form-submit-button"
                            onClick={handleLogin}
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
