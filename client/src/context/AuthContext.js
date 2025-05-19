import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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
}, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setUser(jwtDecode(token));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;