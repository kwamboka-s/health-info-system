// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
<<<<<<< HEAD
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
=======
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5F489Via1JbNzGViuNIHxcx-xElNkTlY",
  authDomain: "health-sys.firebaseapp.com",
  projectId: "health-sys",
  storageBucket: "health-sys.firebasestorage.app",
  messagingSenderId: "311614691263",
  appId: "1:311614691263:web:d005b7d71bfc2d1df5b30a"
};

>>>>>>> 88da31ceca2d2edc344ba8cb1051b4725c20fd1b
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;