"use client";

import React from "react";
import styles from "./MembersBtn.module.css";
import { useRouter } from "next/navigation";
import { useToastStore } from "@/store/useToastStore";
import { checkAuth } from "@/utils/checkAuth";
import { useModalStore } from "@/store/useModalStore";
import LoginModalContent from "../../domain/login/modal/LoginModalContent";

export default function MembersBtn() {
  const router = useRouter();
  const open = useModalStore(state => state.open);
  const showToast = useToastStore(state => state.showToast);

  const handleGoToMembers = () => {
    if (!checkAuth()) {
      open(<LoginModalContent />);
      showToast("login_common");
      router.refresh();
      return;
    }
    router.push("/members");
  };

  return (
    <button type="button" className={styles.btnText} onClick={handleGoToMembers}>
      MEMBERS
    </button>
  );
}
