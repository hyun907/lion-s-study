"use client";

import { signInWithGoogle } from "@/firebase/firebaseAuth";
import { useUserStore } from "@/store/useUserStore";
import { useAuth } from "@/hooks/useAuth";
import { useModalStore } from "@/store/useModalStore";
import SignUpModalContent from "./modal/SignUpModalContent";
import styles from "./GoogleLogin.module.css";
import ICGoogle from "@/assets/icon/google_logo.svg";
import { useEffect } from "react";
import { useToastStore } from "@/store/useToastStore";

export default function GoogleLoginBtn() {
  const showToast = useToastStore(state => state.showToast);
  const open = useModalStore(state => state.open);
  const close = useModalStore(state => state.close);

  const { setUser, clearUser } = useUserStore();
  const auth = useAuth();

  useEffect(() => {
    if (auth.isRegistered === null) return;

    if (auth.needsRegistration) {
      open(<SignUpModalContent uid={auth.uid} googleId={auth.googleId} />);
      useModalStore.getState().onBackdropClick = () => {
        clearUser();
        close();
      };
    } else if (auth.isLoggedIn && auth.isRegistered) {
      close();
    }
    return () => {
      useModalStore.getState().onBackdropClick = null;
    };
  }, [auth.needsRegistration, auth.isLoggedIn, auth.isRegistered, close]);

  const handleLogin = async () => {
    try {
      const result = await signInWithGoogle();

      if (result === "existing") {
        showToast("welcome");
        return;
      }

      if ("error" in result) {
        switch (result.error) {
          case "popup_closed":
            showToast("login_error");
            return;
          case "network_error":
            showToast("network_error");
            return;
          case "internal_error":
          default:
            showToast("fail");
            return;
        }
      }

      showToast("welcome");
      setUser(result.uid, result.email);
    } catch (error: any) {
      showToast("fail");
      console.error("Login error:", error);
    }
  };

  return (
    <button onClick={handleLogin} className={styles.googleBtn}>
      <ICGoogle />
      <p className={styles.googleBtnText}>Sign in with Google</p>
    </button>
  );
}
