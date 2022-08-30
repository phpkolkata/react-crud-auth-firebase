import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCkrTZo-wEbw6nMcaOwvPclDLSON-PtCio",
  authDomain: "books-crud-ac5ed.firebaseapp.com",
  projectId: "books-crud-ac5ed",
  storageBucket: "books-crud-ac5ed.appspot.com",
  messagingSenderId: "883043468462",
  appId: "1:883043468462:web:7c7410ff72bb15fa83593f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);