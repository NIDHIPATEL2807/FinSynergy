// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useState } from "react";
// import HomePage from "../../pages/HomePage";
// import Gamified from "../../pages/Gamified";
// import Dashboard from "../../pages/PersonalDashboard/Dashboard";
// import Signup from "../../pages/Signup";
// import Navbar from "../../components/Navbar";

// const AppRoutes = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/gamified" element={<Gamified />} />
        
//         {/* If user is not authenticated, redirect to signup first */}
//         <Route
//           path="/dashboard"
//           element={isAuthenticated ? <Dashboard /> : <Navigate to="/signup" />}
//         />
        
//         {/* After signing up, navigate to dashboard */}
//         <Route
//           path="/signup"
//           element={<Signup onLogin={() => setIsAuthenticated(true)} />}
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default AppRoutes;


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "../../pages/HomePage";
import Gamified from "../../pages/Gamified";
import Dashboard from "../../pages/PersonalDashboard/Dashboard";
import Signup from "../../pages/Signup";
import Navbar from "../../components/Navbar";

const AppRoutes = () => {
  // Retrieve authentication status from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  // Update localStorage whenever authentication state changes
  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gamified" element={<Gamified />} />
        
        {/* Protect Dashboard Route */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/signup" />}
        />
        
        {/* Signup page updates auth state */}
        <Route
          path="/signup"
          element={<Signup onLogin={() => setIsAuthenticated(true)} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
