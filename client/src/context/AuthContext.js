import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { gql, useMutation } from "@apollo/client";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // <-- Add loading state

  // ✅ Restore user session from localStorage on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        console.log("🔎 Decoded User Object:", decodedUser); // ✅ Add this log
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
      }
    }
    setLoading(false); // <-- Set loading to false after check
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decodedUser = jwtDecode(token);
    console.log("✅ Decoded User After Login:", decodedUser); // Debug log
    setUser(decodedUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const REGISTER_USER = gql`
    mutation RegisterUser($email: String!, $password: String!) {
      registerUser(email: $email, password: $password) {
        token
        user {
          _id
          email
        }
      }
    }
  `;

  const [registerUser] = useMutation(REGISTER_USER);

  const handleRegister = async (email, password) => {
    try {
      const { data } = await registerUser({
        variables: { email, password },
      });

      if (data?.registerUser?.token) {
        // Save token and set user in context if needed
        localStorage.setItem("token", data.registerUser.token);
        // Optionally, update your AuthContext here
        console.log("User registered:", data.registerUser.user);
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, handleRegister }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;