"use client";

import React, { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useModalStore } from "@/store/useModalStore";
import LoginBtn from "./LoginBtn";
import NameBtn from "./NameBtn";
import LogoutModal from "./LogoutModal";
import SignUpModal from "./SignUpModal";
import { collection, query, where, getDocs } from "firebase/firestore";
import fireStore from "@/firebase/firestore";

export default function LoginButton() {
  const { uid, googleId, name, year, part, loadUserInfo, initializeFromStorage } = useUserStore();
  const { openedModal, closeModal } = useModalStore();

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
    const checkUserInDB = async () => {
      if (!uid || !googleId) return;
      if (openedModal && openedModal !== "register") return; // 다른 모달이 열려있으면 체크하지 않음

      // 이메일로 사용자 정보 확인
      const usersRef = collection(fireStore, "users");
      const q = query(usersRef, where("googleId", "==", googleId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty && (!name || !year || !part)) {
        // DB에 없는 새로운 사용자인 경우에만 회원가입 모달 표시
        useModalStore.getState().openModal("register");
      }
    };

    checkUserInDB();
  }, [uid, googleId, name, year, part]);

  return (
    <>
      <LogoutModal />
      <SignUpModal uid={uid || ""} googleId={googleId || ""} onSuccess={() => {}} />
      {!uid || openedModal === "register" ? <LoginBtn /> : <NameBtn />}
    </>
  );
}
