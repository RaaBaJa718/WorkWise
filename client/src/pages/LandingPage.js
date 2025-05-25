import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";

const GET_JOBS = gql`
  query GetJobs {
    jobs {
      id
      title
      company
      location
    }
  }
`;

function LandingPage() {
  const { loading, error, data } = useQuery(GET_JOBS);
  const navigate = useNavigate();

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>Error fetching jobs</p>;

  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to Work Wise 🚀</h1>
      <p>Find your next career opportunity!</p>

      <h2>Featured Jobs</h2>
      <div className="jobs-list">
        {data.jobs.map(job => (
          <div key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <p>{job.company} - {job.location}</p>
          </div>
        ))}
      </div>

      {/* Button to navigate to login page */}
      <button className="login-button" onClick={() => navigate("/login")}>
        Sign In / Register
      </button>
    </div>
  );
}

export default LandingPage;