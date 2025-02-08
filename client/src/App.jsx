import { useState } from 'react'
import Signup from './pages/Signup'
import Dashboard from './pages/PersonalDashboard/Dashboard';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from './components/routes/Routes';

function App() {
  

  return (
    <>
      {/* <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router> */}

      <AppRoutes/>
    </>
  )
}

export default App
