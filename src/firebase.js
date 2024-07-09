import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCLc6LBD8YJf-XavEJxAxxxJfgb5cmNclQ",
    authDomain: "profin-a0baa.firebaseapp.com",
    projectId: "profin-a0baa",
    storageBucket: "profin-a0baa.appspot.com",
    messagingSenderId: "476378496981",
    appId: "1:476378496981:web:c28bbe3557193ce618475c",
    measurementId: "G-N1D4Q6012Z"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, doc, setDoc };
