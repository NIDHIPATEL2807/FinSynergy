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
        {console.log(isAuthenticated)}
        {/* If user is not auAthenticated, redirect to signup first */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        
        {/* After signing up, navigate to dashboard */}
        <Route
          path="/signup"
          element={<Signup onLogin={() => {
            setIsAuthenticated(true);
            console.log("isAuthenticated wowowowow: " + isAuthenticated);
            ;
          }} />}
        />
        {console.log(isAuthenticated)}
      </Routes>
    </Router>
  );
};

export default AppRoutes;