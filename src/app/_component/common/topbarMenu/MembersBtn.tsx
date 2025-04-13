"use client";

import React from "react";
import styles from "./MembersBtn.module.css";
import { useRouter } from "next/navigation";

export default function MembersBtn() {
  const router = useRouter();
  const handleGoToMembers = () => {
    router.push("/members");
  };

  return (
    <button type="button" className={styles.btnText} onClick={handleGoToMembers}>
      MEMBERS
    </button>
  );
}
