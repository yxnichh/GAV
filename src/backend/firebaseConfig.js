// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8G26JFSIbG75rVJXY-0ahkWvQdf68snw",
  authDomain: "gavp-dcca3.firebaseapp.com",
  projectId: "gavp-dcca3",
  storageBucket: "gavp-dcca3.firebasestorage.app",
  messagingSenderId: "509921323083",
  appId: "1:509921323083:web:713a9cc87a584274f7c5ce",
  measurementId: "G-3FZNYGS99J"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

