"use client";

import React from "react";
import styles from "./MembersBtn.module.css";
import { useRouter } from "next/navigation";
import { useToastStore } from "@/store/useToastStore";
import { checkAuth } from "@/utils/checkAuth";

export default function MembersBtn() {
  const router = useRouter();
  const { showToast } = useToastStore();

  const handleGoToMembers = () => {
    if (!checkAuth()) {
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
