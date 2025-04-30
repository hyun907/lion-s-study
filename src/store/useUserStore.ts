import { create } from "zustand";
import { persist } from "zustand/middleware";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import fireStore from "@/firebase/firestore";
import Cookies from "js-cookie";

/**
 * 사용자 상태를 관리하는 인터페이스
 * - uid: Firebase 사용자 ID
 * - googleId: Google 계정 ID
 * - name: 사용자 이름
 * - year: 기수
 * - part: 파트 (프론트엔드/백엔드/디자인/기획)
 * - favorites: 즐겨찾기한 스터디 ID 목록
 * - isSignUpCompleted: 회원가입 완료 여부
 * - isHydrated: 상태 초기화 완료 여부
 */
interface UserState {
  uid: string | null;
  googleId: string | null;
  name: string | undefined;
  year: number | undefined;
  part: string | undefined;
  favorites: string[];
  isSignUpCompleted: boolean;
  isHydrated: boolean;

  // 상태 업데이트 함수들
  setName: (name: string) => void;
  setYear: (year: number) => void;
  setPart: (part: string) => void;
  setUser: (uid: string, googleId: string) => void;
  setUserInfo: (name: string, year: number, part: string) => void;
  clearUser: () => void;
  loadUserInfo: (uid: string) => Promise<void>;
  toggleFavorite: (studyId: string) => Promise<void>;
  isFavorite: (studyId: string) => boolean;
}

/**
 * Zustand 스토어 생성 함수
 * persist 미들웨어를 사용하여 상태를 로컬 스토리지에 저장
 */
const createUserStore = () => {
  return create<UserState>()(
    persist(
      (set, get) => ({
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

        /**
         * 사용자 기본 정보 설정
         * @param uid Firebase 사용자 ID
         * @param googleId Google 계정 ID
         */
        setUser: (uid, googleId) => {
          set({ uid, googleId, isSignUpCompleted: false });
          // 인증 토큰을 쿠키에 저장 (7일)
          Cookies.set("auth_token", uid, {
            expires: 7,
            secure: true,
            sameSite: "strict"
          });
        },

        /**
         * 사용자 상세 정보 설정
         * @param name 사용자 이름
         * @param year 기수
         * @param part 파트
         */
        setUserInfo: (name, year, part) => set({ name, year, part, isSignUpCompleted: true }),

        /**
         * 사용자 정보 초기화
         * 로그아웃 시 호출
         */
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
          Cookies.remove("auth_token");
          localStorage.removeItem("user");
        },

        /**
         * Firebase에서 사용자 정보 로드
         * @param uid Firebase 사용자 ID
         */
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

        /**
         * 스터디 즐겨찾기 토글
         * @param studyId 스터디 ID
         */
        toggleFavorite: async studyId => {
          const currentFavorites = get().favorites;
          const newFavorites = currentFavorites.includes(studyId)
            ? currentFavorites.filter((id: string) => id !== studyId)
            : [...currentFavorites, studyId];

          set({ favorites: newFavorites });

          const uid = get().uid;
          if (uid) {
            try {
              await updateDoc(doc(fireStore, "users", uid), {
                favorites: newFavorites
              });
            } catch (error) {
              console.error("Error updating favorites in Firebase:", error);
              set({ favorites: currentFavorites });
            }
          }
        },

        /**
         * 스터디가 즐겨찾기 되어있는지 확인
         * @param studyId 스터디 ID
         * @returns 즐겨찾기 여부
         */
        isFavorite: studyId => {
          const favorites = get().favorites;
          return favorites.includes(studyId);
        }
      }),
      {
        name: "user",
        onRehydrateStorage: () => state => {
          if (typeof window !== "undefined") {
            const token = document.cookie.split("; ").find(row => row.startsWith("auth_token="));
            if (!token) {
              state?.clearUser();
              localStorage.removeItem("user");
            }
          }
        }
      }
    )
  );
};

export const useUserStore = createUserStore();
