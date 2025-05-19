import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";  // ✅ Import Link for navigation
import AuthContext from "../context/AuthContext";
import "../styles/Dashboard.css";

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

        {/* ✅ Add navigation link to Job Listings */}
        <nav>
          <ul>
            <li><Link to="/jobs">📌 Job Listings</Link></li> {/** ✅ Click to view jobs */}
          </ul>
        </nav>

        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="main-content">
        <h1>Main Content Area</h1>
        <p>This is where you'll manage applications, job searches, and analytics.</p>
      </div>
    </div>
  );
};

export default Dashboard;