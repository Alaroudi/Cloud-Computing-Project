// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWUMTVvPeq4wCAlbNqbkZPTa_8Y1kENZ4",
  authDomain: "could-computing-project.firebaseapp.com",
  projectId: "could-computing-project",
  storageBucket: "could-computing-project.appspot.com",
  messagingSenderId: "593941992667",
  appId: "1:593941992667:web:2323b6d98ac941f9e2e8fe",
  measurementId: "G-9X4LDPGH04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
