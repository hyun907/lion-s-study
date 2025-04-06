"use client";

import { signInWithGoogle, signOutWithGoogle } from "@/firebase/firebaseAuth";
import { useUserStore } from "@/store/useUserStore";
import { useModalStore } from "@/store/useModalStore";
import React, { useEffect } from "react";
import styles from "./GoogleLogin.module.css";
import ICGoogle from "@/assets/icon/google_logo.svg";

export default function GoogleLoginBtn() {
  const { uid, setUser } = useUserStore();
  const { closeModal, openModal } = useModalStore();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const { uid, email } = JSON.parse(userData);
      setUser(uid, email);
    }
  }, [setUser]);

  const handleLogin = async () => {
    const result = await signInWithGoogle();
    if (typeof result === "object") {
      setUser(result.uid, result.email);
      closeModal();
      openModal("register");
    }
  };

  const handleLogout = async () => {
    await signOutWithGoogle();
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
