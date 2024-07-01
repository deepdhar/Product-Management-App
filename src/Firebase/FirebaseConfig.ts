import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDZHQaRgM_wfcggtU3gg0_hjqvwWNFgmzY",
    authDomain: "webskitters-assignment-54b51.firebaseapp.com",
    projectId: "webskitters-assignment-54b51",
    storageBucket: "webskitters-assignment-54b51.appspot.com",
    messagingSenderId: "255895883026",
    appId: "1:255895883026:web:0e03dcba6f659ac4a137cb"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);