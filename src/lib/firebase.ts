// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCD4tQBPHEXG7x4tF_sgwIL19JcRBn7eHg",
  authDomain: "smarttools-95b12.firebaseapp.com",
  projectId: "smarttools-95b12",
  storageBucket: "smarttools-95b12.firebasestorage.app",
  messagingSenderId: "554519618025",
  appId: "1:554519618025:web:b8de7664c2357512c12b78",
  measurementId: "G-HVRXC1VKH9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);