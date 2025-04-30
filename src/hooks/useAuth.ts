"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { collection, query, where, getDocs } from "firebase/firestore";
import fireStore from "@/firebase/firestore";

export const useAuth = () => {
  const { uid, googleId, loadUserInfo, isHydrated, clearUser } = useUserStore();
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!uid);

  // 초기 마운트 시 토큰 검증
  useEffect(() => {
    if (typeof window === "undefined") return;
    const authToken = document.cookie.split("; ").find(row => row.startsWith("auth_token="));
    if (!authToken) {
      clearUser();
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (uid) {
      loadUserInfo(uid);
    }
  }, [uid]);

  useEffect(() => {
    const checkUserInDB = async () => {
      if (!googleId) return setIsRegistered(null);

      const usersRef = collection(fireStore, "users");
      const q = query(usersRef, where("googleId", "==", googleId));
      const snapshot = await getDocs(q);
      setIsRegistered(!snapshot.empty);
    };

    if (googleId) {
      checkUserInDB();
    }
  }, [googleId]);

  const needsRegistration = isLoggedIn && isRegistered === false;

  return {
    uid,
    googleId,
    isLoggedIn,
    isRegistered,
    needsRegistration,
    isHydrated
  };
};
