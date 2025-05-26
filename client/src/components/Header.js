import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/dashboard/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="header">
      <h1>Work Wise</h1>
      <div className="header-row">
        <nav>
          <Link to="/dashboard/home" className="nav-link">Home</Link>
          <Link to="/dashboard/jobs" className="nav-link">Jobs</Link>
          <Link to="/dashboard/profile" className="nav-link">Profile</Link>
          <Link to="/login" className="nav-link">Sign In</Link>
        </nav>
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
      </div>
    </header>
  );
}

export default Header;