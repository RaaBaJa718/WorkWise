import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>
      <p>Welcome, {user?.email}!</p>
      {/* Dashboard content here */}
    </div>
  );
};

export default Dashboard;