import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import * as firebaseui from 'firebaseui'
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getMessaging } from "firebase/messaging";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyA01UWXTQTeGtAV2L5LfTm5tGjE6961Jkw",
  authDomain: "auth-dei.firebaseapp.com",
  projectId: "auth-dei",
  storageBucket: "auth-dei.firebasestorage.app",
  messagingSenderId: "148667249314",
  appId: "1:148667249314:web:d110f8055703c140de5dfb",
  measurementId: "G-9JJV87B9ZT",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseUi = new firebaseui.auth.AuthUI(firebaseAuth);
firebaseAuth.useDeviceLanguage();
export const firebaseDb = getFirestore(firebaseApp);
export const firebaseMessaging = getMessaging(firebaseApp);
export const firebaseFunctions = getFunctions(firebaseApp);
