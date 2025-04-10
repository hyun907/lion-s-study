"use client";

import { useEffect } from "react";
import { signInWithGoogle } from "@/firebase/firebaseAuth";
import { useUserStore } from "@/store/useUserStore";
import { useAuth } from "@/hooks/useAuth";
import { useModalStore } from "@/store/useModalStore";
import SignUpModalContent from "../modal/SignUpModalContent";
import styles from "./GoogleLogin.module.css";
import ICGoogle from "@/assets/icon/google_logo.svg";

export default function GoogleLoginBtn() {
  const open = useModalStore(state => state.open);
  const close = useModalStore(state => state.close);
  const setUser = useUserStore(state => state.setUser);
  const auth = useAuth();

  // ✅ 상태 기반으로 모달 열기
  useEffect(() => {
    if (auth.needsRegistration && auth.uid && auth.googleId) {
      open(<SignUpModalContent uid={auth.uid} googleId={auth.googleId} />);
    }
  }, [auth.needsRegistration, auth.uid, auth.googleId]);

  const handleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      close(); // 기존 모달 닫기
      if (typeof result === "object") {
        setUser(result.uid, result.email);
      }
    } catch (error) {
      alert("Google 로그인 실패");
      console.error(error);
    }
  };

  return (
    <button onClick={handleLogin} className={styles.googleBtn}>
      <ICGoogle />
      <p className={styles.googleBtnText}>Sign in with Google</p>
    </button>
  );
}
