import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "../../pages/HomePage";
import Gamified from "../../pages/Gamified";
import Dashboard from "../../pages/PersonalDashboard/Dashboard";
import Signup from "../../pages/Signup";
import Navbar from "../../components/Navbar";

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedValue = localStorage.getItem("isAuthenticated");
    return storedValue === "true";  // Ensure it returns boolean
  });

  useEffect(() => {
    console.log("Authentication changed:", isAuthenticated);
    localStorage.setItem("isAuthenticated", isAuthenticated); // Store as a string
  }, [isAuthenticated]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gamified" element={<Gamified />} />

        {/* Protect dashboard route */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/signup" />}
        />

        {/* Signup updates authentication */}
        <Route
          path="/signup"
          element={<Signup onLogin={() => setIsAuthenticated(true)} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;