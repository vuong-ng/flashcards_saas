// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_eBum9h3LoeFtsPnTgWLrBQL-StBapPI",
  authDomain: "flashcards-saas-73322.firebaseapp.com",
  projectId: "flashcards-saas-73322",
  storageBucket: "flashcards-saas-73322.appspot.com",
  messagingSenderId: "490293346386",
  appId: "1:490293346386:web:957d006b78ff506e9b1f8b",
  measurementId: "G-YBEWBW2NXY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;