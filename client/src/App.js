import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import JobListings from "./pages/JobListings";
import JobApplication from "./pages/JobApplication";
import Register from "./pages/Register"; // <-- Add this import
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* Add this route */}
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/apply" element={<JobApplication />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;