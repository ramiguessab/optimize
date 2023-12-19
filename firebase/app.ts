// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBTeXcXN3gOhhAVIVlivOhm4hnVWyFcaUg",
    authDomain: "optimize-659be.firebaseapp.com",
    projectId: "optimize-659be",
    storageBucket: "optimize-659be.appspot.com",
    messagingSenderId: "475593751380",
    appId: "1:475593751380:web:548a967d003b7d1da2e6c1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
