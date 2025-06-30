import { createContext, useContext, useEffect, useState } from "react";
import { type User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/Initializer";

interface ContextType {
  user: User | null;
  logOut: () => Promise<void>
}

const AuthContext = createContext<ContextType>({
  user: null,
  logOut: async () => {}  
});

export const UserAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const logOut = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
