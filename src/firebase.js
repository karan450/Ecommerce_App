// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdh_JThBtB8LAjPf3VZmpYX8ILD2cV4Kw",
  authDomain: "ecommerce-5fbad.firebaseapp.com",
  projectId: "ecommerce-5fbad",
  storageBucket: "ecommerce-5fbad.firebasestorage.app",
  messagingSenderId: "477650473128",
  appId: "1:477650473128:web:1faa7deece6ea5852bf29d",
  measurementId: "G-FC7DTQJWKQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);