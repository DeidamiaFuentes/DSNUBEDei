import { getToken, onMessage } from "firebase/messaging";
import { firebaseMessaging } from "../firebase/FirebaseConfig";
import { useEffect, useState } from "react";
import { useFirebaseUser } from "./useFirebaseUser";
import { subscribeToTopic } from "../utils/subscribeToTopic";
import { UserRepository } from "../repositories/UserRepository";

export const useFirebaseNotifications = () => {
  const { user } = useFirebaseUser();
  const [token, setToken] = useState<string | null>(null);
  const [loadingToken, setLoadingToken] = useState<boolean>(true);

  useEffect(() => {
    const obtainToken = async () => {
      try {
        const currentToken = await getToken(firebaseMessaging, {
          vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        });

        if (currentToken) {
          console.log("Firebase token obtained:", currentToken);
          setToken(currentToken);
        } else {
          console.warn(
            "No registration token available. Request permission to generate one."
          );
        }
        setLoadingToken(false);
      } catch (error) {
        console.error("An error occurred while retrieving token. ", error);
      }
    };
    obtainToken();

    onMessage(firebaseMessaging, (payload) => {
      console.log("Message received. ", payload);
    });
  }, []);
  
  useEffect(() => {
    if (!token || !user) {
      return;
    }
    console.log("Firebase token updated:", token);
    const handleTokenUpdate = async () => {
      try {
        const repository = new UserRepository();
        await repository.createOrUpdateNotificationToken(
          user.uid,
          token
        );
        await subscribeToTopic(token, "all");
      }catch (e) {
        console.error("Error actualizando token en Firestore:", e);
      }

    };
    handleTokenUpdate();
    console.log("sss")
  }, [token, user]);
  
  return { token, loadingToken };
};
