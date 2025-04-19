import { create } from "zustand";
import { persist } from "zustand/middleware";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import fireStore from "@/firebase/firestore";
import Cookies from "js-cookie";

interface UserState {
  uid: string | null;
  googleId: string | null;
  name: string | undefined;
  year: number | undefined;
  part: string | undefined;
  favorites: string[] | undefined;
  isSignUpCompleted: boolean;
  isHydrated: boolean;

  setName: (name: string) => void;
  setYear: (year: number) => void;
  setPart: (part: string) => void;
  setUser: (uid: string, googleId: string) => void;
  setUserInfo: (name: string, year: number, part: string) => void;
  clearUser: () => void;
  loadUserInfo: (uid: string) => Promise<void>;
  toggleFavorite: (studyId: string) => void;
  isFavorite: (studyId: string) => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      uid: null,
      googleId: null,
      name: undefined,
      year: undefined,
      part: undefined,
      favorites: [],
      isSignUpCompleted: false,
      isHydrated: false,

      setName: name => set({ name }),
      setYear: year => set({ year }),
      setPart: part => set({ part }),
      setUser: (uid, googleId) => {
        set({ uid, googleId, isSignUpCompleted: false });
        // 인증 토큰을 쿠키에 저장
        Cookies.set("auth_token", uid, {
          expires: 7, 
          secure: true, 
          sameSite: "strict" 
        });
      },
      setUserInfo: (name, year, part) => set({ name, year, part, isSignUpCompleted: true }),
      clearUser: () => {
        set({
          uid: null,
          googleId: null,
          name: undefined,
          year: undefined,
          part: undefined,
          favorites: [],
          isSignUpCompleted: false
        });
        // 인증 토큰 쿠키 삭제
        Cookies.remove("auth_token");
      },
      loadUserInfo: async uid => {
        const userDoc = await getDoc(doc(fireStore, "users", uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          set({
            name: userData.name,
            year: userData.year,
            part: userData.part,
            googleId: userData.googleId,
            favorites: userData.favorites || [],
            isSignUpCompleted: true
          });
        }
      },
      toggleFavorite: async studyId => {
        const currentFavorites = useUserStore.getState().favorites || [];
        const newFavorites = currentFavorites.includes(studyId)
          ? currentFavorites.filter(id => id !== studyId)
          : [...currentFavorites, studyId];

        // Zustand 상태 업데이트
        set({ favorites: newFavorites });

        // 파이어베이스에 저장
        const uid = useUserStore.getState().uid;
        if (uid) {
          try {
            await updateDoc(doc(fireStore, "users", uid), {
              favorites: newFavorites
            });
          } catch (error) {
            console.error("Error updating favorites in Firebase:", error);
            // 에러 발생 시 Zustand 상태 롤백
            set({ favorites: currentFavorites });
          }
        }
      },
      isFavorite: studyId => {
        const favorites = useUserStore.getState().favorites || [];
        return favorites.includes(studyId);
      }
    }),
    {
      name: "user"
    }
  )
);
