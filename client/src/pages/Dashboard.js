import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import Header from "../components/Header";
import "../styles/Dashboard.css";

function Dashboard({ children }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">
      <Header />
      <main className="dashboard-content">
        <div style={{ gridColumn: "1 / -1", textAlign: "center", marginBottom: "32px" }}>
          <h1>Welcome to Your Dashboard</h1>
        </div>
        {children ? (
          children
        ) : (
          <>
            <Link to="/dashboard/applications" className="tile tile-link">
              My Applications
            </Link>
            <Link to="/dashboard/saved" className="tile tile-link">
              Saved Jobs
            </Link>
            <Link to="/dashboard/profile" className="tile tile-link">
              Profile
            </Link>
            {/* Add more interactive tiles as needed */}
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;