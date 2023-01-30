// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDedzlwV7TvNsCakCWspxmphZaWpkEWCrk",
  authDomain: "fb-crud3.firebaseapp.com",
  projectId: "fb-crud3",
  storageBucket: "fb-crud3.appspot.com",
  messagingSenderId: "964849863271",
  appId: "1:964849863271:web:5758b02d2dcf7160d722c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)