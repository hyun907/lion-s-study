"use client";

import React from "react";
import styles from "./LoginBtn.module.css";
import { useModalStore } from "@/store/useModalStore";

export default function LoginBtn() {
  const { openLoginModal } = useModalStore();

  return (
    <button type="button" className={styles.btn} onClick={openLoginModal}>
      로그인
    </button>
  );
}
