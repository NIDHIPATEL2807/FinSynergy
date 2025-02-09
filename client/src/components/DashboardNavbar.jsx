import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";

const DashboardNavbar = ({ user }) => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully!");
      })
      .catch(() => {
        toast.error("Error logging out");
      });
  };

  return (
    <nav className="mb-8 p-2 bg-teal-700 flex justify-between items-center ">
      {/* Left side - FinSu.... Logo */}
      <div>
        <Link to="/" className="text-white font-satoshi font-[600] text-xl hover:text-teal-100 transition">
          FinSynergy
        </Link>
      </div>

      {/* Middle - Navigation Links */}
      <ul className="flex space-x-4 gap-10">
        <li>
          <Link to="/gamified/simulation" className="text-white font-medium hover:text-teal-100 transition">
            Stock Simulation
          </Link>
        </li>
        <li>
          <Link to="/gamified/learning" className="text-white font-medium hover:text-teal-100 transition">
            Learning
          </Link>
        </li>

        <li>
          <Link to="/personal-dashboard" className="text-white font-medium hover:text-teal-100 transition">
            Dashboard
          </Link>
        </li>
      </ul>

      {/* Right side - User Info & Logout */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-2xl text-orange-400" />
          <span className="font-medium text-white">{user?.displayName || user?.email}</span>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
