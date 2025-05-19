import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";  // ✅ Import AuthContext
import "../styles/Dashboard.css";  // ✅ Import styles

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Dashboard</h2>
        <p>Welcome, {user?.email}!</p>  
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="main-content">
        <h1>Main Content Area</h1>
        <p>This is where you can add job postings, applications, or analytics.</p>
      </div>
    </div>
  );
};

export default Dashboard;