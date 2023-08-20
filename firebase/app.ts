// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBukI1X2ClG554xJst2p8GdQ1_yOfwA7TM",
    authDomain: "optimize-c0683.firebaseapp.com",
    projectId: "optimize-c0683",
    storageBucket: "optimize-c0683.appspot.com",
    messagingSenderId: "233312396006",
    appId: "1:233312396006:web:7693c7bf5eaec42ea09127",
    measurementId: "G-E3PYFD3CYC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// const analytics = getAnalytics(app);
