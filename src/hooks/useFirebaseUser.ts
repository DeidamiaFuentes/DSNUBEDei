import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  GoogleAuthProvider,
  FacebookAuthProvider,
  type User,
  signOut,
  linkWithCredential,
  linkWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { firebaseAuth, firebaseDb } from "../firebase/FirebaseConfig";
import { useNavigate } from "react-router";
import { EmailAuthProvider } from "firebase/auth/web-extension";
import { doc, setDoc } from "firebase/firestore";

export const useFirebaseUser = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (user) {
      return;
    }
    onAuthStateChanged(firebaseAuth, (loggedInUser) => {
      if (loggedInUser) {
        setUser(loggedInUser);
      }
    });
  }, [user]);

  const loginWithFirebase = (email: string, password: string) => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User signed in:", user);
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing in:", errorCode, errorMessage);
      });
  };

  const registerWithFirebase = async (
    email: string,
    password: string,
    fullName: string,
    cellphone: number,
    birthDate: string,
  ) => {

    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password)
      const newUSer = userCredential.user;

      await setDoc(doc(firebaseDb, "Users", newUSer.uid), {
        fullName,
        email,
        cellphone,
        birthDate,
      });

      
      updateProfile(newUSer, {
        displayName: fullName,
      })

      navigate("/home");

    } catch (e) {
      console.error("Error registering user", e)
    }
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result);

        console.log("User signed in with Google:", result.user);
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error("Error signing in with Google:", {
          errorCode,
          errorMessage,
          email,
          credential,
        });
      });
  };

  //Homework 1
  const loginWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        FacebookAuthProvider.credentialFromResult(result);
        
        console.log("User signed in with Facebook:", result.user);
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.error("Error signing in with Facebook:", {
          errorCode,
          errorMessage,
          email,
          credential,
        });
      });
  };

  const logout = () => {
    signOut(firebaseAuth)
      .then(() => {
        console.log("User signed out successfully");
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const linkWithPassword = (email: string, password: string) => {
    if (!user) {
      return;
    }
    const credential = EmailAuthProvider.credential(email, password);
    linkWithCredential(user, credential)
      .then((usercred) => {
        const user = usercred.user;
        console.log("Account linking success", user);
      })
      .catch((error) => {
        console.log("Account linking error", error);
      });
  };

  //homework 1
  const linkWithFacebook = () => {
    if (!user) return;
    const provider = new FacebookAuthProvider();
    linkWithPopup(user, provider)
      .then((result) => {
        console.log("Facebook linked:", result.user);
      })
      .catch((error) => {
        console.error("Error linking Facebook:", error);
      });
  };

  return {
    user,
    loginWithFirebase,
    registerWithFirebase,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    linkWithPassword,
    linkWithFacebook,
  };
};
