import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import "../styles/Dashboard.css";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <h2>Work Wise</h2>
      <nav>
        <Link to="/dashboard" className="nav-link">
          Home
        </Link>
        <Link to="/jobs" className="nav-link">Jobs</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
        {!user && <Link to="/login" className="nav-link">Sign In</Link>}
      </nav>
      {user && (
        <div className="dashboard-content">
          <h1>Welcome to Your Dashboard</h1>
          <p>Welcome, {user.email}!</p>
        </div>
      )}
    </aside>
  );
}

export default Dashboard;