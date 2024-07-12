"use client";
import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-hot-toast";
import { auth, signInWithGoogle, signOutUser } from "@/config/Firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("storedUser");
      if (storedUser) {
        setUserInfo(JSON.parse(storedUser));
      }
    }
  }, []);

  useEffect(() => {
    const listenForAuthChanges = () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const idToken = await user.getIdToken();
          localStorage.setItem("auth-token", idToken);
          const userData = {
            name: user.displayName,
            email: user.email,
            uid: user.uid,
          };
          setUserInfo(userData);
          localStorage.setItem("storedUser", JSON.stringify(userData));
        } else {
          setUserInfo({});
          localStorage.removeItem("auth-token");
          localStorage.removeItem("storedUser");
        }
      });
    };

    listenForAuthChanges();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      if (typeof window !== "undefined") {
        const existingUser = localStorage.getItem("storedUser");
        if (existingUser) {
          const userData = JSON.parse(existingUser);
          setUserInfo(userData);
          toast.success("You are already logged in.");
        } else {
          const user = await signInWithGoogle();
          if (user) {
            const userData = {
              name: user.displayName,
              email: user.email,
              uid: user.uid,
            };
            setUserInfo(userData);
            localStorage.setItem("storedUser", JSON.stringify(userData));
            toast.success("Successfully signed in with Google.");
          } else {
            toast.error("Google sign-in failed. Please try again.");
          }
        }
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("Error signing in with Google. Please try again.");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setUserInfo({});
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth-token");
        localStorage.removeItem("storedUser");
      }
      toast.success("Successfully signed out.");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out. Please try again.");
    }
  };

  return (
    <AuthContext.Provider
      value={{ userInfo, setUserInfo, handleGoogleSignIn, handleSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
