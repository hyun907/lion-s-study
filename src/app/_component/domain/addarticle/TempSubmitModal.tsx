"use client";

import React from "react";
import { useModalStore } from "@/store/useModalStore";

import ICDelete from "@/assets/icon/delete.svg";
import modalStyles from "@/app/_component/common/Modal.module.css";
import styles from "./DeleteModal.module.css";

interface Props {
  onContinue: () => void; // 작성 계속
  onDiscard: () => void; // 작성 중단
}

export default function TempSubmitModal({ onContinue, onDiscard }: Props) {
  const { close } = useModalStore();

  // 계속 작성
  const handleKeepWriting = () => {
    onContinue();
    close();
  };

  // 작성 중단
  const handleStopWriting = () => {
    onDiscard();
    close();
  };

  return (
    <div className={modalStyles.modal}>
      <div className={styles.modalHeader}>
        <p className={modalStyles.modalTitle}>임시저장된 아티클 내용이 있어요</p>
        <ICDelete onClick={handleKeepWriting} style={{ cursor: "pointer" }} />
      </div>
      <div className={styles.bodyContainer}>
        <p>
          작성중이던 내용을 불러올까요?
          <br />
          취소를 누르면 해당 내용은 삭제됩니다.
        </p>
      </div>
      <div className={styles.btnWrapper}>
        <button onClick={handleStopWriting} className={styles.keepBtn}>
          취소
        </button>
        <button onClick={handleKeepWriting} className={styles.stopBtn}>
          확인
        </button>
      </div>
    </div>
  );
}
