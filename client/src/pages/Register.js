import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import "../styles/Register.css";

const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!) {
    registerUser(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerUser] = useMutation(REGISTER_USER);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser({ variables: { email, password } });
      if (data?.registerUser?.token) {
        localStorage.setItem("token", data.registerUser.token);
        alert("Registration successful!");
        // Optionally redirect or update context here
      } else {
        alert("Registration failed.");
      }
    } catch (err) {
      alert("Registration error: " + err.message);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;