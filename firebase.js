// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpshfmE69A5KYAzovzQilUvcoEtQFFYuA",
  authDomain: "longitud-talla.firebaseapp.com",
  projectId: "longitud-talla",
  storageBucket: "longitud-talla.appspot.com",
  messagingSenderId: "333852593637",
  appId: "1:333852593637:web:08c6e7818fc62c0735f30c",
  measurementId: "G-HE9319T8JH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app)
//const analytics = getAnalytics(app);

export { db, storage, auth};