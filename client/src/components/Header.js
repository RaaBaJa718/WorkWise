import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/dashboard/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Only show menu button and sidebar on dashboard pages
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <header className="header">
      <h1>Work Wise</h1>
      <div className="header-row">
        {isDashboard && (
          <button
            className="menu-btn"
            onClick={() => setSidebarOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            &#9776;
          </button>
        )}
        <div className="header-search">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <nav className="desktop-nav">
          <Link to="/dashboard/home" className="nav-link">Home</Link>
          <Link to="/dashboard/jobs" className="nav-link">Jobs</Link>
          <Link to="/dashboard/profile" className="nav-link">Profile</Link>
          <Link to="/login" className="nav-link">Sign In</Link>
        </nav>
      </div>
      {/* Dropdown Sidebar */}
      {isDashboard && sidebarOpen && (
        <aside className="dropdown-sidebar">
          <Link to="/dashboard/home" className="nav-link" onClick={() => setSidebarOpen(false)}>Home</Link>
          <Link to="/dashboard/jobs" className="nav-link" onClick={() => setSidebarOpen(false)}>Jobs</Link>
          <Link to="/dashboard/profile" className="nav-link" onClick={() => setSidebarOpen(false)}>Profile</Link>
          <Link to="/login" className="nav-link" onClick={() => setSidebarOpen(false)}>Sign In</Link>
        </aside>
      )}
    </header>
  );
}

export default Header;