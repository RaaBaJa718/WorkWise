import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
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

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>Error fetching jobs</p>;

  return (
    <div
      className="landing-container"
      style={{
        background: 'url("/background.png") no-repeat center center/cover'
      }}
    >
      <h1>Find Your Next Opportunity</h1>
      <input type="text" placeholder="Search jobs..." />

      <h2>Featured Jobs</h2>
      <ul className="jobs-list">
        {data.jobs.map(job => (
          <li key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <p>{job.company} - {job.location}</p>
            <Link to={`/jobs/${job.id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LandingPage;