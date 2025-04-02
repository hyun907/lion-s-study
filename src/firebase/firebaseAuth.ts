// src/firebase/firebaseAuth.ts
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { fireAuth } from "./firebasedb";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const data = await signInWithPopup(fireAuth, provider);
    console.log(data.user);
    return data.user;
  } catch (error) {
    console.error("Google 로그인 실패", error);
    throw error;
  }
};
