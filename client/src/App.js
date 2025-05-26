import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import JobListings from "./pages/JobListings";
import JobApplication from "./pages/JobApplication";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage"; // <-- Add this import
import MainLayout from "./components/MainLayout";
import "./App.css";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Add this route */}
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
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