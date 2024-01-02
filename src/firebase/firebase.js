import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCN-eNFoK-b5055RHiC0BEr2p-AGEaES98",
    authDomain: "homework-app-3cad7.firebaseapp.com",
    projectId: "homework-app-3cad7",
    storageBucket: "homework-app-3cad7.appspot.com",
    messagingSenderId: "579885565243",
    appId: "1:579885565243:web:25c0bacb5340cf8fd3e31e",
    measurementId: "G-G7D0L5FZJ4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);

export {app}