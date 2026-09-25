import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCtwAXHGkd9Oiv95PCEoqaR3qjo4SJSfTM",
  authDomain: "pioneer-academy-8d9fb.firebaseapp.com",
  projectId: "pioneer-academy-8d9fb",
  storageBucket: "pioneer-academy-8d9fb.firebasestorage.app",
  messagingSenderId: "1076709843934",
  appId: "1:1076709843934:web:30f95869a78082ca93b34f"
};

// Initialize Firebase (prevents duplicate initializations in Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export the specific services we need
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, storage };