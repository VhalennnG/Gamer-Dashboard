"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/config";

type AuthContextType = {
  user: FirebaseUser | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const updateToken = async (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser) {
      try {
        const token = await firebaseUser.getIdToken(true);
        localStorage.setItem("authToken", token);
      } catch (error) {
        console.error("Error refreshing token:", error);
        router.push("/");
      }
    } else {
      localStorage.removeItem("authToken");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      await updateToken(firebaseUser);

      setLoading(false);

      if (!firebaseUser && window.location.pathname !== "/") {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!user) return;

    const refreshInterval = setInterval(async () => {
      try {
        await updateToken(user);
        console.log("Token refreshed");
      } catch (error) {
        console.error("Failed to refresh token:", error);
      }
    }, 50 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
