import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/mutations";
import AuthContext from "../context/AuthContext";
import "../styles/Login.css"; // ✅ Import the new stylesheet

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser] = useMutation(LOGIN_USER);

 const handleSubmit = async (e) => {
  e.preventDefault();

  // ✅ Ensure email and password are provided before calling the login mutation
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
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;