// useAuth.ts
"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { collection, query, where, getDocs } from "firebase/firestore";
import fireStore from "@/firebase/firestore";

export const useAuth = () => {
  const { uid, googleId, loadUserInfo, initializeFromStorage } = useUserStore();

  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const isLoggedIn = !!uid;

  const checkUserInDB = async () => {
    const usersRef = collection(fireStore, "users");
    const q = query(usersRef, where("googleId", "==", googleId));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  };

  useEffect(() => {
    initializeFromStorage();
  }, []);

  useEffect(() => {
    if (uid) {
      loadUserInfo(uid);
    }
  }, [uid]);

  useEffect(() => {
    if (!isLoggedIn || !googleId) return;

    const check = async () => {
      const exists = await checkUserInDB();
      setIsRegistered(exists);
    };

    check();
  }, [isLoggedIn, googleId]);

  return {
    uid,
    googleId,
    isLoggedIn,
    isRegistered,
    needsRegistration: isLoggedIn && isRegistered === false
  };
};
