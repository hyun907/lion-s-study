"use client";

import { useModalStore } from "@/store/useModalStore";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";

import LogoutModalContent from "./LogoutModalContent";
import SignUpModalContent from "./SignUpModalContent";
import LoginModalContent from "./LoginModalContent";

import ICDelete from "@/assets/icon/delete.svg";
import styles from "./Modal.module.css";

const MODAL_COMPONENTS = {
  login: LoginModalContent,
  logout: LogoutModalContent,
  signup: SignUpModalContent
} as const;

export default function Modal() {
  const [mounted, setMounted] = useState(false);
  const { modal, closeModal } = useModalStore();
  const { clearUser } = useUserStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !modal) return null;

  const handleClose = () => {
    if (modal.type === "signup") {
      clearUser();
    }
    closeModal();
  };

  const modalContent = (() => {
    switch (modal.type) {
      case "login":
        return <LoginModalContent />;
      case "signup":
        return (
          <SignUpModalContent
            uid={useUserStore.getState().uid}
            googleId={useUserStore.getState().googleId}
          />
        );
      case "logout":
        return <LogoutModalContent />;
      default:
        return null;
    }
  })();

  return createPortal(
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        {modalContent}
      </div>
    </div>,
    document.getElementById("modal-root") || document.body
  );
}
