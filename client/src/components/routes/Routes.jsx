import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import HomePage from "../../pages/HomePage";
import Gamified from "../../pages/Gamified";
import Dashboard from "../../pages/PersonalDashboard/Dashboard";
import Signup from "../../pages/Signup";
import Navbar from "../../components/Navbar";

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gamified" element={<Gamified />} />
        <Route path="/dashboard" element={<Signup />} />
          <Route path="/personal-dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;