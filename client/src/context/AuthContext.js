import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

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
      console.log("🔎 Decoded User Object:", decodedUser);  // ✅ Add this log
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
  console.log("✅ Decoded User After Login:", decodedUser);  // Debug log
  setUser(decodedUser);
};

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;