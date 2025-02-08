// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqf_ZVgr3kX28NKw8RiO1mmGVparp6ug8",
  authDomain: "finsynergy-3609f.firebaseapp.com",
  projectId: "finsynergy-3609f",
  storageBucket: "finsynergy-3609f.firebasestorage.app",
  messagingSenderId: "802537811585",
  appId: "1:802537811585:web:e6cba551a01d62bf536780",
  measurementId: "G-1HD2SBK73N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
