import { useNavigate } from "react-router-dom";
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
        {children ? (
          children
        ) : (
          <>
            <div style={{ gridColumn: "1 / -1", textAlign: "center", marginBottom: "32px" }}>
              <h1>Welcome to Your Dashboard</h1>
            </div>
            {/* Your tiles go here */}
            <div className="tile">My Applications</div>
            <div className="tile">Saved Jobs</div>
            <div className="tile">Profile</div>
            {/* Add more tiles as needed */}
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;