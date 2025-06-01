import { useState } from "react";
import { Link } from "react-router-dom";

export default function JobSearch({ isRestricted, promptLogin }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (isRestricted && !searchTerm) return; // Prevent empty search on restricted
    setLoading(true);
    const response = await fetch(
      `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(searchTerm)}`
    );
    const data = await response.json();
    setJobs(isRestricted ? data.jobs.slice(0, 5) : data.jobs); // Limit results if restricted
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSearch} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search jobs..."
          style={{ flex: 1, padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>Search</button>
      </form>
      {promptLogin && (
        <div style={{ marginBottom: 16, color: "#007bff" }}>
          <span>
            <Link to="/login">Sign in</Link> or <Link to="/register">Sign up</Link> for unlimited job search!
          </span>
        </div>
      )}
      {loading && <div>Loading...</div>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {jobs.map(job => (
          <li key={job.id} style={{ marginBottom: 12 }}>
            <a href={job.url} target="_blank" rel="noopener noreferrer">
              <strong>{job.title}</strong> at {job.company_name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}