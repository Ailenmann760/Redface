// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBksqBwPLKZNR7XjcS1r5SDDqLasDpdyJM",
  authDomain: "redface-773bc.firebaseapp.com",
  projectId: "redface-773bc",
  storageBucket: "redface-773bc.firebasestorage.app",
  messagingSenderId: "152641062731",
  appId: "1:152641062731:web:c0e7a5c6991da5c0bd4ace",
  measurementId: "G-KC72XMZCXH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
