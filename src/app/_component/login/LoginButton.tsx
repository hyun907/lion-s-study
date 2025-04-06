"use client";

import React, { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useModalStore } from "@/store/useModalStore";
import LoginBtn from "./LoginBtn";
import NameBtn from "./NameBtn";
import LogoutModal from "./LogoutModal";
import SignUpModal from "./SignUpModal";

export default function LoginButton() {
  const { uid, name, year, part, loadUserInfo, initializeFromStorage } = useUserStore();
  const { openedModal } = useModalStore();

  // 시작 시 localStorage에서 로그인 상태 불러오기
  useEffect(() => {
    initializeFromStorage();
  }, [initializeFromStorage]);

  // uid가 변경될 때 Firebase DB에서 사용자 정보 불러오기
  useEffect(() => {
    if (uid) {
      loadUserInfo(uid);
    }
  }, [uid, loadUserInfo]);

  // 회원가입이 필요한 경우 회원가입 모달 표시
  useEffect(() => {
    if (uid && (!name || !year || !part) && openedModal !== "register") {
      useModalStore.getState().openModal("register");
    }
  }, [uid, name, year, part, openedModal]);

  return (
    <>
      <LogoutModal />
      <SignUpModal uid={uid || ""} googleId="" onSuccess={() => {}} />
      {!uid || openedModal === "register" ? <LoginBtn /> : <NameBtn />}
    </>
  );
}
