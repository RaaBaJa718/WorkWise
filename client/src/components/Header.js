import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/dashboard/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="header custom-header">
      <div className="header-avatar">
        <div className="avatar-bubble large-avatar" title={user?.email}>
          {getInitials(user?.name || user?.email)}
        </div>
      </div>
      <div className="header-center">
        <form
          className="header-search"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-btn" type="submit">
            Search
          </button>
        </form>
      </div>
      <nav className="header-icons">
        <Link to="/dashboard/home" className="nav-link" title="Home">
          <FaHome />
        </Link>
        <Link to="/dashboard/jobs" className="nav-link" title="Jobs">
          <FaBriefcase />
        </Link>
        <Link to="/dashboard/profile" className="nav-link" title="Profile">
          <FaUser />
        </Link>
        <Link to="/login" className="nav-link" title="Sign In">
          <FaSignInAlt />
        </Link>
      </nav>
    </header>
  );
}

export default Header;