// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxl7_Jhfuz2OmPVVsxno5MIYPaGTSwR9g",
  authDomain: "react-native-app-b68df.firebaseapp.com",
  projectId: "react-native-app-b68df",
  storageBucket: "react-native-app-b68df.firebasestorage.app",
  messagingSenderId: "86905507530",
  appId: "1:86905507530:web:72c5fe592762e4b2deee33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
