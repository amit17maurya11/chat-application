import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBtH9B0Ks2psFWwHIc8P0ZlZ8XPvrI2_TA",
  authDomain: "signup-efaac.firebaseapp.com",
  databaseURL: "https://signup-efaac-default-rtdb.firebaseio.com",
  projectId: "signup-efaac",
  storageBucket: "signup-efaac.appspot.com",
  messagingSenderId: "520891810441",
  appId: "1:520891810441:web:7d6b931b2941399f33bc58",
  measurementId: "G-FSR2L4VM6J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
