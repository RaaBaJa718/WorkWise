import React, { useState, useEffect } from "react";
import "../styles/JobListings.css";
import { Link } from "react-router-dom";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
                  location
                  salary
                }
              }
            `,
          }),
        });

        const data = await response.json();
        console.log("🔎 Full API Response:", data);

        if (data.errors) {
          console.error("❌ GraphQL Error:", data.errors);
          throw new Error("Failed to fetch job listings!");
        }

        if (!data.data || !data.data.jobs) {
          throw new Error("❌ API response is empty or incorrectly structured!");
        }

        setJobs(data.data.jobs);
      } catch (error) {
        console.error("❌ Error fetching jobs:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="job-listings-container">
      <h2>Available Jobs</h2>

      {loading && <p>⏳ Loading job listings...</p>}
      {error && <p className="error">❌ {error}</p>}

      <ul>
        {jobs.map((job) => (
          <li key={job.id || job._id} className="job-card">
            <h3>{job.title}</h3>
            <p>
              📍 {job.location ?? "Location not specified"} | 💰 {job.salary ?? "Salary not listed"}
            </p>
            <Link to={`/apply?jobId=${job.id || job._id}`}>Apply Now</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobListings;