import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { fireAuth } from "./firebasedb";
import { useUserStore } from "@/store/useUserStore";
import fireStore from "./firestore";
import { FirebaseError } from "firebase/app";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<
  | "existing"
  | { uid: string; email: string }
  | { error: "popup_closed" | "network_error" | "internal_error" }
> => {
  if (!navigator.onLine) {
    return { error: "network_error" };
  }

  try {
    const data = await signInWithPopup(fireAuth, provider);
    const user = data.user;

    const userRef = doc(fireStore, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      useUserStore.getState().setUser(user.uid, userData.googleId);
      return "existing";
    } else {
      return { uid: user.uid, email: user.email! };
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/popup-closed-by-user":
        case "auth/cancelled-popup-request":
          return { error: "popup_closed" };
        case "auth/network-request-failed":
          return { error: "network_error" };
        case "auth/internal-error":
          return { error: "internal_error" };
        default:
          return { error: "internal_error" };
      }
    } else {
      console.error("예상치 못한 에러", error);
      return { error: "internal_error" };
    }
  }
};

export const signOutWithGoogle = async () => {
  try {
    await signOut(fireAuth);
    const { clearUser } = useUserStore.getState();
    clearUser();
    console.log("Google 로그아웃 성공");
  } catch (error) {
    console.log("Google 로그아웃 실패", error);
  }
};
