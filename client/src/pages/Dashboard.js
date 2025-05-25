import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../styles/Dashboard.css";
import { FaHome, FaBriefcase, FaProjectDiagram, FaUser, FaSignOutAlt, FaBars } from "react-icons/fa"; // ✅ Import icons

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2>Dashboard</h2>
          {/* Toggle button inside sidebar, top right */}
          <button
            className="sidebar-toggle inside"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <FaBars /> Close
          </button>
        </div>
        <p>Welcome, {user?.email}!</p>

        <nav>
          <ul>
            <li><FaHome /> <a href="/dashboard">Dashboard</a></li>
            <li><FaBriefcase /> <a href="/jobs">Job Listings</a></li>
            <li><FaUser /> <a href="/profile">Profile</a></li>
          </ul>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Toggle button outside sidebar, top left, only when closed */}
      {!isSidebarOpen && (
        <button
          className="sidebar-toggle outside"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <FaBars /> Menu
        </button>
      )}

      <div className="main-content">
        <h1>Main Content Area</h1>
        <p>This is where you'll manage applications, job searches, and analytics.</p>
      </div>
    </div>
  );
};

export default Dashboard;