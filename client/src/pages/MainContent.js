import React from "react";
import { Link } from "react-router-dom";
import "../styles/MainContent.css";

const MainContent = () => {
  return (
    <div className="main-content">
      <h1>Dashboard Overview</h1>

      {/* ✅ Job Search Section */}
      <section className="dashboard-section">
        <h2>📌 Job Listings</h2>
        <Link to="/jobs"><button>Search Jobs</button></Link>
      </section>

      {/* ✅ Applications Tracker */}
      <section className="dashboard-section">
        <h2>📂 My Job Applications</h2>
        <Link to="/apply"><button>View Applications</button></Link>
      </section>

      {/* ✅ Analytics & Insights */}
      <section className="dashboard-section">
        <h2>📊 Analytics</h2>
        <button>View Insights</button>
      </section>
    </div>
  );
};

export default MainContent;