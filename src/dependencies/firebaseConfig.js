import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA9Z6J7UTKMTryNjWL7xXUO7PGPeLZZOVk",
  authDomain: "booknest-5fd22.firebaseapp.com",
  projectId: "booknest-5fd22",
  storageBucket: "booknest-5fd22.appspot.com",
  messagingSenderId: "251620963069",
  appId: "1:251620963069:web:27fcf4f42beb81dc54c494",
  measurementId: "G-RVRWEZ75MN",
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
