"use client";

import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import fireStore from "@/firebase/firestore";

interface UserState {
  uid: string | null;
  googleId: string | null;
  name: string | null;
  year: number | null;
  setUser: (uid: string, googleId: string) => void;
  setUserInfo: (name: string, year: number) => void;
  clearUser: () => void;
  loadUserInfo: (uid: string) => Promise<void>;
}

export const useUserStore = create<UserState>(set => ({
  uid: null,
  googleId: null,
  name: null,
  year: null,
  setUser: (uid, googleId) => set({ uid, googleId }),
  setUserInfo: (name, year) => set({ name, year }),
  clearUser: () => set({ uid: null, googleId: null, name: null, year: null }),
  loadUserInfo: async uid => {
    try {
      const userDoc = await getDoc(doc(fireStore, "users", uid));
      if (userDoc.exists()) {
        // 이름과 기수 불러오는 로직
        const userData = userDoc.data();
        set({ name: userData.name, year: userData.year });
      }
    } catch (error) {
      console.error("Error loading user info:", error);
    }
  }
}));
