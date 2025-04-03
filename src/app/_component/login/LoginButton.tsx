"use client";

import React, { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import LoginBtn from "./LoginBtn";
import NameBtn from "./NameBtn";

export default function LoginButton() {
  const { uid, loadUserInfo } = useUserStore();

  useEffect(() => {
    if (uid) {
      loadUserInfo(uid);
    }
  }, [uid, loadUserInfo]);

  if (!uid) {
    return <LoginBtn />;
  }

  return <NameBtn />;
}
