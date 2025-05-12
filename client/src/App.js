import React from "react";
import { AuthProvider } from "./context/AuthContext"; // Adjust the path if necessary
import Login from "./pages/Login"; // Adjusted path

function App() {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
}

export default App;