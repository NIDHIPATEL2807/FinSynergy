import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-blue-600 text-white p-4 shadow-md">
      {/* Logo & App Name */}
      <Link to="/" className="text-2xl font-bold">
        FinSynergy
      </Link>

      {/* Navigation Links */}
      <div className="space-x-6">
        <Link to="/gamified" className="hover:underline">
          Gamified
        </Link>
        <Link to="/tracker" className="hover:underline">
          Tracker
        </Link>
      </div>

      {/* Login Button */}
      {/* <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold">
        Login
      </Link> */}
    </nav>
  );
};

export default Navbar;
