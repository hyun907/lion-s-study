"use client";

import React from "react";
import { useModalStore } from "@/store/useModalStore";
import LoginBtn from "./LoginBtn";
import NameBtn from "./NameBtn";
import LogoutModal from "./LogoutModal";
import SignUpModal from "./SignUpModal";
import { useAuth } from "@/hooks/useAuth";

export default function LoginButton() {
  const { isLoggedIn, needsRegistration, isRegistered, uid, googleId } = useAuth();
  const { openedModal } = useModalStore();

  // 현재 표시할 버튼 결정
  const shouldShowLoginBtn = !isLoggedIn || needsRegistration || openedModal === "register";

  return (
    <>
      <LogoutModal />
      <SignUpModal uid={uid || ""} googleId={googleId || ""} onSuccess={() => {}} />
      {shouldShowLoginBtn ? <LoginBtn /> : <NameBtn />}
    </>
  );
}
