"use client";

import { signInWithGoogle, signOutWithGoogle } from "@/firebase/firebaseAuth";
import { useUserStore } from "@/store/useUserStore";
import { useModalStore } from "@/store/useModalStore";
import React, { useEffect } from "react";
import styles from "./GoogleLogin.module.css";
import ICGoogle from "@/assets/icon/google_logo.svg";
import { collection, query, where, getDocs } from "firebase/firestore";
import fireStore from "@/firebase/firestore";

export default function GoogleLoginBtn() {
  const { uid, setUser } = useUserStore();
  const { closeModal, openModal } = useModalStore();

  useEffect(() => {
    const checkUserAndSetInfo = async () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const { uid, email } = JSON.parse(userData);

        // 이메일로 사용자 정보 확인
        const usersRef = collection(fireStore, "users");
        const q = query(usersRef, where("googleId", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // 이미 가입된 사용자라면 정보 설정
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          setUser(uid, email);
          useUserStore.getState().setUserInfo(userData.name, userData.year, userData.part);
        }
      }
    };

    checkUserAndSetInfo();
  }, [setUser]);

  const handleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      if (typeof result === "object") {
        // 이메일로 사용자 정보 확인
        const usersRef = collection(fireStore, "users");
        const q = query(usersRef, where("googleId", "==", result.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // 이미 가입된 사용자라면 로그인만 처리
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          setUser(result.uid, result.email);
          useUserStore.getState().setUserInfo(userData.name, userData.year, userData.part);
          closeModal();
        } else {
          // 새로운 사용자라면 회원가입 모달 표시
          setUser(result.uid, result.email);
          closeModal();
          openModal("register");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = async () => {
    await signOutWithGoogle();
    useUserStore.getState().clearUser();
  };

  return (
    <div>
      {uid ? (
        <button type="button" onClick={handleLogout}>
          로그아웃
        </button>
      ) : (
        <button type="button" onClick={handleLogin} className={styles.googleBtn}>
          <ICGoogle />
          <p className={styles.googleBtnText}>Sign in with Google</p>
        </button>
      )}
    </div>
  );
}
