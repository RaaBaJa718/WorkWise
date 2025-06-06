import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import JobListings from "./pages/JobListings";
import JobApplication from "./pages/JobApplication";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import MainLayout from "./components/MainLayout";
import Profile from "./pages/Profile";
import Applications from "./pages/Applications";
import SavedJobs from "./pages/SavedJobs";
import JobSearch from "./components/JobSearch";
import "./App.css";

function AppRoutes() {
  const { user } = React.useContext(require("./context/AuthContext").default);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
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
        <Route path="/dashboard/profile" element={
          <ProtectedRoute>
            <MainLayout>
              <Profile />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/applications" element={
          <ProtectedRoute>
            <MainLayout>
              <Applications />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/saved" element={
          <ProtectedRoute>
            <MainLayout>
              <SavedJobs />
            </MainLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard/jobs" element={
          <ProtectedRoute>
            <MainLayout>
              <JobListings />
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
        <Route path="/dashboard/search" element={
          <ProtectedRoute>
            <MainLayout>
              <JobSearch isRestricted={false} />
            </MainLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;