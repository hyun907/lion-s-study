import { create } from "zustand";

type UserState = {
  uid: string | null;
  email: string | null;
  setUser: (uid: string, email: string) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>(set => ({
  uid: null,
  email: null,
  setUser: (uid, email) => {
    set({ uid, email });
    // localStorage에 저장
    localStorage.setItem("user", JSON.stringify({ uid, email }));
  },
  clearUser: () => {
    set({ uid: null, email: null });
    localStorage.removeItem("user");
  }
}));
