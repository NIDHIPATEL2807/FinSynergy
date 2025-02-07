import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import Gamified from "../../pages/Gamified";
import Tracker from "../../pages/Tracker";
import Navbar from "../../components/Navbar";

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gamified" element={<Gamified />} />
        <Route path="/tracker" element={<Tracker />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
