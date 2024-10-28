// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBeT7nNb2UJDUSpoqSAMPpYGCKiSUkteDs",
    authDomain: "countries-bootstrap-teo.firebaseapp.com",
    projectId: "countries-bootstrap-teo",
    storageBucket: "countries-bootstrap-teo.appspot.com",
    messagingSenderId: "1069145056796",
    appId: "1:1069145056796:web:2863fc30fa7591381de1d9",
    measurementId: "G-7XTCHQS7Z6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);