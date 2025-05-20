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
                id
                title
                company
                description
                postedDate
              }
            }
          `,
        }),
      });

      const data = await response.json();
      console.log("🔎 Full API Response:", data); // ✅ Debug log

      // 🚨 Log errors from GraphQL response
      if (data.errors) {
        console.error("❌ GraphQL Error:", data.errors); // Debug actual errors
        throw new Error("GraphQL query failed!");
      }

      if (!data.data || !data.data.jobs) {
        throw new Error("❌ API response is empty or incorrectly structured!");
      }

      setJobs(data.data.jobs);
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