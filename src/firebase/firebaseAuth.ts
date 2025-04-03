import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { fireAuth } from "./firebasedb";
import { useUserStore } from "@/store/useUserStore";
import fireStore from "./firestore";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const data = await signInWithPopup(fireAuth, provider);
    const user = data.user;

    // Firestore 저장
    const userRef = doc(fireStore, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        email: user.email
      });
    }

    // Zustand + localStorage 저장
    const { setUser } = useUserStore.getState();
    setUser(user.uid, user.email!);

    return user;
  } catch (error) {
    console.error("Google 로그인 실패", error);
    throw error;
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
