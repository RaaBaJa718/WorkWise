import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../styles/Dashboard.css";
import { FaHome, FaBriefcase, FaUser, FaSignOutAlt, FaBars } from "react-icons/fa";

const MainLayout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2>Dashboard</h2>
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
            <li>
              <FaHome /> <Link to="/" className="nav-link">Home</Link>
            </li>
            <li>
              <FaBriefcase /> <Link to="/jobs" className="nav-link">Job Listings</Link>
            </li>
            <li>
              <FaUser /> <Link to="/profile" className="nav-link">Profile</Link>
            </li>
          </ul>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
      {!isSidebarOpen && (
        <button
          className="sidebar-toggle outside"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <FaBars /> Menu
        </button>
      )}
      <div className="main-content">{children}</div>
    </div>
  );
};

export default MainLayout;