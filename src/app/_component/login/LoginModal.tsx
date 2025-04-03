"use client";

import React, { useEffect } from "react";
import styles from "./LoginModal.module.css";
import GoogleLoginBtn from "./GoogleLoginBtn";
import ICDelete from "@/assets/icon/delete.svg";
import { useModalStore } from "@/store/useModalStore";
import { useUserStore } from "@/store/useUserStore";

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal } = useModalStore();
  const { uid } = useUserStore();

  useEffect(() => {
    if (uid) {
      closeLoginModal();
    }
  }, [uid, closeLoginModal]);

  if (!isLoginModalOpen) return null;

  return (
    <div className={styles.overlay} onClick={closeLoginModal}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.title}>
          <p>로그인</p>
          <ICDelete onClick={closeLoginModal} style={{ cursor: "pointer" }} />
        </div>
        <GoogleLoginBtn />
      </div>
    </div>
  );
}
