"use client";

import React from "react";
import { useModalStore } from "@/store/useModalStore";
import { useRouter } from "next/navigation";

import ICDelete from "@/assets/icon/delete.svg";
import modalStyles from "@/app/_component/common/Modal.module.css";
import styles from "./DeleteModal.module.css";

export default function DeleteModal() {
  const { close, open } = useModalStore();
  const router = useRouter();

  const handleKeepWriting = () => {
    close();
  };

  const handleStopWriting = () => {
    localStorage.removeItem("draft-title");
    localStorage.removeItem("draft-markdown");
    close();
  };

  return (
    <div className={modalStyles.modal}>
      <div className={styles.modalHeader}>
        <p className={modalStyles.modalTitle}>Article 작성을 그만두시겠습니까?</p>
        <ICDelete onClick={handleKeepWriting} style={{ cursor: "pointer" }} />
      </div>
      <div className={styles.bodyContainer}>
        <p>지금 중단하면 저장이 되지 않습니다.</p>
      </div>
      <div className={styles.btnWrapper}>
        <button onClick={handleKeepWriting} className={styles.keepBtn}>
          이어서 작성하기
        </button>
        <button onClick={handleStopWriting} className={styles.stopBtn}>
          작성 중단하기
        </button>
      </div>
    </div>
  );
}
