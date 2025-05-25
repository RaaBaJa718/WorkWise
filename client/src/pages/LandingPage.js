import React, { useState, useEffect } from "react";

function LandingPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("https://workwise-4arc.onrender.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            jobs {
              id
              title
              company
            }
          }
        `,
      }),
    })
      .then(response => response.json())
      .then(result => setJobs(result.data.jobs || []));
  }, []);

  return (
    <div>
      <h1>Welcome to Work Wise 🚀</h1>
      <p>Search for jobs, explore careers, and take the next step!</p>
      <input type="text" placeholder="Search jobs..." />
      <button>Search</button>
      
      <h2>Featured Jobs</h2>
      <ul>
        {jobs.map(job => (
          <li key={job.id}>{job.title} - {job.company}</li>
        ))}
      </ul>

      <p>Sign in to apply or save jobs!</p>
    </div>
  );
}

export default LandingPage;