import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import HomePage from "../../pages/HomePage";
import Gamified from "../../pages/Gamified";
import Dashboard from "../../pages/PersonalDashboard/Dashboard";
import Signup from "../../pages/Signup";
import Navbar from "../../components/Navbar";
import DiscussionForum from "../../pages/DiscussionForum";

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
      {/* Move useLocation logic inside Router */}
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Navbar />  {/* Navbar only for HomePage */}
              <HomePage getStartedPath={user ? "/gamified/simulation" : "/signup"} />
            </>
          } 
        />
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

          <Route 
          path="/discussionforum" 
          element={
            <ProtectedRoute>
              <DiscussionForum />
            </ProtectedRoute>
          } 
        />

      </Routes>
    </Router>
  );
};

export default AppRoutes;