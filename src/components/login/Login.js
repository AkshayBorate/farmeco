import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function LoginPage() {
    const [errorMessage, setErrorMessage] = useState("");
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const handleSignIn = async () => {
        const username = usernameRef.current.value.trim();
        const password = passwordRef.current.value.trim();

        // Validate input fields
        if (!username || !password) {
            setErrorMessage("Please fill out both fields!");
            return;
        }

        try {
            const response = await fetch("http://localhost:8084/getall", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch user data.");
            }

            const users = await response.json();

            // Check if user exists
            const user = users.find(
                (u) => u.email === username && u.password === password
            );

            if (user) {
                alert("Login successful!");
                navigate("/custheader/dashboard");
            } else {
                setErrorMessage("Invalid username or password.");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("An error occurred while signing in. Please try again later.");
        }
    };

    return (
        <div className="unique-login-page">
            <div className="unique-login-container">
                <div className="unique-form-container">
                    <Link to="/loginc" className="signup-link">Back</Link>
                    <h2 className="unique-form-title">Sign In</h2>
                    <form
                        className="unique-form unique-signin-form"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <div className="unique-form-group">
                            <label htmlFor="username">Username (Email)</label>
                            <input
                                className="unique-form-input"
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                ref={usernameRef}
                                required
                            />
                        </div>
                        <div className="unique-form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                className="unique-form-input"
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                ref={passwordRef}
                                required
                            />
                        </div>
                        <div className="unique-form-options">
                            <label className="unique-checkbox-label">
                                <input type="checkbox" id="keepSignedIn" />
                                Keep me signed in
                            </label>
                        </div>
                        <button
                            type="button"
                            className="unique-form-submit-button"
                            onClick={handleSignIn}
                        >
                            Sign In
                        </button>
                    </form>
                    <div className="unique-signup-link">
                        <p>
                            Don't have an account? <Link to="/signup">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
