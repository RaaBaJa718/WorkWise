import React, { useState, useEffect } from "react";
import "../styles/JobListings.css"; // ✅ Import styles
import { Link } from "react-router-dom";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query {
                jobs {
                  _id  // ✅ Ensure we fetch the actual ID from the database
                  title
                  company
                  description
                  postedDate
                  location
                  salary
                }
              }
            `,
          }),
        });

        const data = await response.json();
        console.log("✅ Fetched Jobs:", data.data.jobs); // Debug log
        setJobs(data.data.jobListings); // ✅ Stores actual job IDs
      } catch (error) {
        console.error("❌ Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="job-listings-container">
      <h2>Available Jobs</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id} className="job-card">  {/* ✅ Using _id instead of hardcoded IDs */}
            <h3>{job.title}</h3>
            <p>📍 {job.location} | 💰 {job.salary}</p>
            <button>View Details</button>
            <Link to={`/apply?jobId=${job.id}`}>Apply Now</Link>  {/* ✅ Pass the real job ID */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobListings;