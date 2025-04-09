"use client";

import React from "react";
import { useModalStore } from "@/store/useModalStore";
import LoginBtn from "./LoginBtn";
import NameBtn from "./NameBtn";
import { useAuth } from "@/hooks/useAuth";

export default function LoginButton() {
  const { isLoggedIn, needsRegistration } = useAuth();
  const { openModal } = useModalStore();

  // 현재 표시할 버튼 결정
  const shouldShowLoginBtn = !isLoggedIn || needsRegistration;

  const handleOpenLogoutModal = () => {
    openModal("logout");
  };

  return <>{shouldShowLoginBtn ? <LoginBtn /> : <NameBtn onClick={handleOpenLogoutModal} />}</>;
}
