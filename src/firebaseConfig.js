// src\firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 


const firebaseConfig = {
  apiKey: "AIzaSyCNqflePXJuILDocwZRcGe2F6ViqtVDnzQ",
  authDomain: "dream-smp-archive.firebaseapp.com",
  databaseURL: "https://dream-smp-archive-default-rtdb.firebaseio.com",
  projectId: "dream-smp-archive",
  storageBucket: "dream-smp-archive.firebasestorage.app",
  messagingSenderId: "807526010937",
  appId: "1:807526010937:web:d5951f192d988ce2d53de8",
  measurementId: "G-030CB1PC1W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db }; 
