import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from '../firebase';
import StockSimulation from '../components/gamify/StockSimulation'
import Learning from '../components/gamify/Learning'
import { signOut } from "firebase/auth";
import { FaUserCircle } from "react-icons/fa";
// import { toast } from "react-hot-toast";

const Gamified = () => {
  const [user] = useAuthState(auth);
  const [wallet, setWallet] = useState(1000);

  // Fetch wallet data from Firebase
  useEffect(() => {
    const fetchWallet = async () => {
      if (user) {
        const walletRef = doc(db, "users", user.uid);
        const walletDoc = await getDoc(walletRef);
        
        if (walletDoc.exists() && walletDoc.data().wallet) {
          setWallet(walletDoc.data().wallet);
        } else {
          // Initialize wallet if it doesn't exist
          await setDoc(walletRef, { wallet: 1000 }, { merge: true });
        }
      }
    };
    
    fetchWallet();
  }, [user]);

  // Update wallet in Firebase whenever it changes
  useEffect(() => {
    const updateWallet = async () => {
      if (user) {
        const walletRef = doc(db, "users", user.uid);
        await setDoc(walletRef, { wallet }, { merge: true });
      }
    };
    
    updateWallet();
  }, [wallet, user]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully!");
      })
      .catch((error) => {
        toast.error("Error logging out");
      });
  };

  return (
    <div className="container mx-auto p-4">
      <nav className="mb-8 flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link 
              to="/gamified/simulation" 
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Stock Simulation
            </Link>
          </li>
          <li>
            <Link 
              to="/gamified/learning" 
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Learning
            </Link>
          </li>
        </ul>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FaUserCircle className="text-2xl text-gray-600" />
            <span className="font-medium">{user?.displayName || user?.email}</span>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2>Current wallet: ${wallet}</h2>
        <Routes>
          <Route index element={<StockSimulation wallet={wallet} setWallet={setWallet} />} />
          <Route path="simulation" element={<StockSimulation wallet={wallet} setWallet={setWallet} />} />
          <Route path="learning" element={<Learning wallet={wallet} setWallet={setWallet} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Gamified;