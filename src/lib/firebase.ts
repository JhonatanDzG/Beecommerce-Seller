// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0TskyPCBTlqvATgcHdHgG-IDXp-pG4QI",
  authDomain: "beecomerce-y2025.firebaseapp.com",
  projectId: "beecomerce-y2025",
  storageBucket: "beecomerce-y2025.firebasestorage.app",
  messagingSenderId: "34354480069",
  appId: "1:34354480069:web:9cd9013fefe7926e2e81ac",
  measurementId: "G-7Y34W5GCSN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);