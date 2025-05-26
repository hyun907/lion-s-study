"use client";

import React from "react";
import LoginBtn from "./LoginBtn";
import NameBtn from "./NameBtn";
import { useHydration } from "@/hooks/auth";
import { useUserStore } from "@/store/useUserStore";
import styles from "./UserBtn.module.css";

export default function UserBtn() {
  useHydration();

  const { isHydrated, isSignUpCompleted } = useUserStore();

  if (!isHydrated) return <div className={styles.loading}>불러오는 중</div>;

  return <>{isSignUpCompleted ? <NameBtn /> : <LoginBtn />}</>;
}
