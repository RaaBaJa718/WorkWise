import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/mutations";
import AuthContext from "../context/AuthContext";
import "../styles/Login.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const { data } = await loginUser({ variables: { email, password } });
      if (data?.login?.token) {
        login(data.login.token);
        localStorage.setItem("token", data.login.token);
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="login-container">
      {/* Left Side - Login Form */}
      <div className="login-section">
        <header>
          <h1>Welcome To Work Wise</h1>
          <p>Please sign in to continue</p>
        </header>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="password-input"
          />
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="password-input"
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>

      {/* Right Side - Animated Design */}
      <div className="design-section">
        <h2>Transform Your Work Experience</h2>
        <p>Join thousands of professionals finding their dream jobs.</p>
        <div className="animated-bg"></div>
      </div>
    </div>
  );
};

export default Login;