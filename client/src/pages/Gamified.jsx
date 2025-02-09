import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import StockSimulation from "../components/gamify/StockSimulation";
import Learning from "../components/gamify/Learning";
import DashboardNavbar from "../components/DashboardNavbar";

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

  return (
    <div className="p-0 m-0 bg-teal-950">
      {/* Navbar Component */}
      <DashboardNavbar user={user} />

      <div className="rounded-lg shadow p-6">
        <h2 className="text-satoshi font-satoshi text-amber-50 font-bold ml-3 text-4xl bg-amber-600  p-0.5">Current wallet: ${wallet}</h2>
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
