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
//         <Route path="/dashboard" element={<Signup />} />
//           <Route path="/personal-dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>



//   );
// };

// export default AppRoutes;


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import HomePage from "../../pages/HomePage";
import Gamified from "../../pages/Gamified";
import Dashboard from "../../pages/PersonalDashboard/Dashboard";
import Signup from "../../pages/Signup";
import Navbar from "../../components/Navbar";

const AppRoutes = () => {
  const [user, loading] = useAuthState(auth);

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/dashboard" />;
    return children;
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={!user ? <Signup /> : <Navigate to="/personal-dashboard" />} />
        <Route 
          path="/gamified/*" 
          element={
            <ProtectedRoute>
              <Gamified />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/personal-dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;