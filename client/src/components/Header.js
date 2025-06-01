import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { FaHome, FaBriefcase, FaUser, FaSignInAlt } from "react-icons/fa";
import "../styles/Header.css";

function getInitials(nameOrEmail) {
  if (!nameOrEmail) return "";
  const parts = nameOrEmail.split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function Header() {
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/dashboard/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <header className="header">
      <h1>Work Wise</h1>
      <div className="header-row">
        <div className="header-search">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-btn" onClick={handleSearch}>Search</button>
        </div>
        <nav className="desktop-nav">
          <Link to="/dashboard/home" className="nav-link" title="Home"><FaHome /></Link>
          <Link to="/dashboard/jobs" className="nav-link" title="Jobs"><FaBriefcase /></Link>
          <Link to="/dashboard/profile" className="nav-link" title="Profile"><FaUser /></Link>
          <Link to="/login" className="nav-link" title="Sign In"><FaSignInAlt /></Link>
        </nav>
        {user && (
          <div className="avatar-bubble" title={user.email}>
            {getInitials(user.name || user.email)}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;