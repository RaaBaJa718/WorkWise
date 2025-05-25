import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import JobListings from "./pages/JobListings";
import JobApplication from "./pages/JobApplication";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage"; // <-- Add this import
import MainLayout from "./pages/MainLayout";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Add this route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          } />
          <Route path="/jobs" element={
            <ProtectedRoute>
              <MainLayout>
                <JobListings />
              </MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/apply" element={<JobApplication />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;