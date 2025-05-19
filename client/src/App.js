import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import JobListings from "./pages/JobListings";
import JobApplication from "./pages/JobApplication";  // ✅ Import the component

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
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