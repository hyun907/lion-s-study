import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useModalStore } from "@/store/useModalStore";
import { collection, query, where, getDocs } from "firebase/firestore";
import fireStore from "@/firebase/firestore";

export const useAuth = () => {
  const { uid, googleId, name, year, part, loadUserInfo, initializeFromStorage } = useUserStore();
  const { openedModal, openModal } = useModalStore();
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);

  // 사용자 정보가 완전한지 확인
  const isUserComplete = Boolean(name && year && part);

  // 로그인 상태 확인
  const isLoggedIn = Boolean(uid);

  // DB에서 사용자 존재 여부 확인
  const checkUserInDB = async () => {
    if (!googleId) return false;

    const usersRef = collection(fireStore, "users");
    const q = query(usersRef, where("googleId", "==", googleId));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty;
  };

  // 초기 로그인 상태 복구
  useEffect(() => {
    initializeFromStorage();
  }, [initializeFromStorage]);

  // uid 변경 시 사용자 정보 로드
  useEffect(() => {
    if (uid) {
      loadUserInfo(uid);
    }
  }, [uid, loadUserInfo]);

  // 로그인/회원가입 상태 체크
  useEffect(() => {
    const checkRegistrationStatus = async () => {
      if (!isLoggedIn) {
        setIsRegistered(null);
        return;
      }

      if (openedModal === "register") return;

      const userExists = await checkUserInDB();
      setIsRegistered(userExists);

      // 새로운 사용자이고 정보가 불완전한 경우 회원가입 모달 표시
      if (!userExists && !isUserComplete) {
        openModal("register");
      }
    };

    checkRegistrationStatus();
  }, [isLoggedIn, googleId, isUserComplete, openedModal]);

  // 회원가입 필요 여부 확인
  const needsRegistration = isLoggedIn && !isRegistered && !isUserComplete;

  return {
    isLoggedIn,
    isUserComplete,
    needsRegistration,
    isRegistered,
    uid,
    googleId
  };
};
