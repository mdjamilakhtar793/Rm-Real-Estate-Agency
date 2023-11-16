// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "rm-real-estate-860c7.firebaseapp.com",
  projectId: "rm-real-estate-860c7",
  storageBucket: "rm-real-estate-860c7.appspot.com",
  messagingSenderId: "388734345146",
  appId: "1:388734345146:web:25a79b7782e3204afcc783",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
