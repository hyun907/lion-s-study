"use client";

import React from "react";
import { useModalStore } from "@/store/useModalStore";
import styles from "./LoginBtn.module.css";

export default function LoginBtn() {
  const { openModal } = useModalStore();

  const handleClick = () => {
    openModal("login");
  };

  return (
    <button type="button" className={styles.btn} onClick={handleClick}>
      로그인
    </button>
  );
}
