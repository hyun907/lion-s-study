"use client";

import React, { useState } from "react";
import { useModalStore } from "@/store/useModalStore";
import { useRouter } from "next/navigation";
import { useToastStore } from "@/store/useToastStore";

import ICDelete from "@/assets/icon/delete.svg";
import modalStyles from "@/app/_component/common/Modal.module.css";
import styles from "./DeleteModal.module.css";

interface Props {
  studyroomId: string;
}

export default function DeleteModal({ studyroomId }: Props) {
  const { close, open } = useModalStore();
  const router = useRouter();
  const id = studyroomId;
  const [toastType, setToastType] = useState<string | null>(null);
  const { showToast } = useToastStore();

  // 계속 작성
  const handleKeepWriting = () => {
    close();
  };

  // 작성 중단
  const handleStopWriting = () => {
    localStorage.removeItem("draft-title");
    localStorage.removeItem("draft-markdown");
    router.push(`/studyroom/${id}`);
    close();
  };

  // 임시 저장
  const handleTempSubmit = () => {
    router.push(`/studyroom/${id}`);
    showToast("tempSubmit");
    close();
  };

  return (
    <div className={modalStyles.modal}>
      <div className={styles.modalHeader}>
        <p className={modalStyles.modalTitle}>아티클 작성을 그만두시겠습니까?</p>
        <ICDelete onClick={handleKeepWriting} style={{ cursor: "pointer" }} />
      </div>
      <div className={styles.bodyContainer}>
        <p>지금 중단하면 저장이 되지 않습니다.</p>
      </div>
      <div className={styles.btnWrapper}>
        <button onClick={handleTempSubmit} className={styles.keepBtn}>
          임시 저장하기
        </button>
        <button onClick={handleStopWriting} className={styles.stopBtn}>
          작성 중단하기
        </button>
      </div>
    </div>
  );
}
