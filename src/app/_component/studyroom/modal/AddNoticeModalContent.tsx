"use client";

import { useModalStore } from "@/store/useModalStore";
import ICDelete from "@/assets/icon/delete.svg";
import modalStyles from "@/app/_component/common/Modal.module.css";
import styles from "./AddContent.module.css";

export default function AddNoticeModalContent() {
  const close = useModalStore(state => state.close);

  return (
    <div className={modalStyles.modal}>
      <div className={modalStyles.modalHeader}>
        <h2 className={modalStyles.modalTitle}>Notice 생성하기</h2>
        <ICDelete onClick={close} style={{ cursor: "pointer" }} />
      </div>
      <div className={styles.inputContainer}>
        <div>내용</div>
        <input className={styles.input}></input>
      </div>
      <div className={styles.btnWrapper}>
        <button className={modalStyles.contentAddBtn}>생성하기</button>
      </div>
    </div>
  );
}
