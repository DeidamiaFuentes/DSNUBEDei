import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {firebaseConfig} from "./FirebaseConfig";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export {auth, db, app};
