// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;