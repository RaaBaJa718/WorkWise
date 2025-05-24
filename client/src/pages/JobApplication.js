import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";  // ✅ Get user info
import "../styles/JobApplication.css";

const JobApplication = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get("jobId");  // ✅ Get jobId from URL dynamically

  const [name, setName] = useState(user?.name || "");
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [availability, setAvailability] = useState("");

  const handleResumeUpload = (e) => {
    setResume(e.target.files[0]);  // ✅ Store selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!resume || !coverLetter || !availability || !name || !jobId) {
      alert("❌ Error: Missing required fields.");
      return;
    }

    // ✅ Debugging logs BEFORE sending the request
    console.log("🔎 User ID being sent:", user?._id);
    console.log("📌 Job ID being sent:", jobId);

    try {
      const response = await fetch("https://workwise-4arc.onrender.com/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation ApplyForJob($userId: ID!, $jobId: ID!) {
              applyForJob(userId: $userId, jobId: $jobId) {
                id
                status
                appliedDate
              }
            }
          `,
          variables: {
            userId: user?._id,  // ✅ Ensure `_id` is used, not `user.id`
            jobId: jobId,  // ✅ Ensure `jobId` is correct from JobListings.js
          },
        }),
      });

      const data = await response.json();
      console.log("✅ GraphQL Response:", data);  // ✅ Debugging log

      // 🚨 Fix: Prevent error if mutation returns `null`
      if (!data.data || !data.data.applyForJob) {
        throw new Error("❌ Mutation returned null—check backend logs!");
      }

      alert(`🎉 Application submitted successfully! Status: ${data.data.applyForJob.status}`);
    } catch (error) {
      console.error("❌ Error submitting application:", error);
      alert("⚠ Failed to submit application. Please try again.");
    }
  };

  return (
    <div className="job-application-container">
      <h2>Apply for a Job</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email:</label>
        <input type="email" value={user?.email || ""} readOnly />

        <label>Upload Resume:</label>
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} />

        <label>Cover Letter:</label>
        <textarea value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} />

        <label>Availability:</label>
        <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
          <option value="">Select Availability</option>
          <option value="Immediate">Immediate</option>
          <option value="1-3 Months">1-3 Months</option>
          <option value="Flexible">Flexible</option>
        </select>

        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default JobApplication;