import React, { useState, useEffect } from "react";
import "../styles/JobListings.css";  // ✅ Import styles
import { Link } from "react-router-dom";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
  setJobs([
    { id: "job1", title: "Software Engineer", company: "Tech Corp", description: "Remote role", postedDate: "2025-05-19" },
    { id: "job2", title: "Product Manager", company: "Innovate Inc.", description: "NYC office", postedDate: "2025-05-10" },
    { id: "job3", title: "Data Scientist", company: "AI Solutions", description: "San Francisco", postedDate: "2025-04-25" },
  ]);
}, []);

  return (
    <div className="job-listings-container">
      <h2>Available Jobs</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <p>📍 {job.location} | 💰 {job.salary}</p>
            <button>View Details</button>
            <Link to={`/apply?jobId=${job.id}`}>Apply Now</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobListings;