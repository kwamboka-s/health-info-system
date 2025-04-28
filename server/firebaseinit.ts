// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();
console.log("Firebase config loaded:", {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APPLICATION_ID,
});
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.firebasestorage.app`,
  messagingSenderId: "311614691263",
  appId: process.env.FIREBASE_APPLICATION_ID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;