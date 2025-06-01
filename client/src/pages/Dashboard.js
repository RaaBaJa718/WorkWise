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
      <Header /> {/* Header now includes menu button and dropdown sidebar */}
      <main className="dashboard-content">
        {children ? (
          children
        ) : (
          <>
            <h1>Welcome to Your Dashboard</h1>
            {user && <p>Welcome, {user.email}!</p>}
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;