"use client";

import ICPlus from "@/assets/icon/plus.svg";

import { useModalStore } from "@/store/useModalStore";

import styles from "./AddBtn.module.css";
import AddStudyContent from "./AddStudyContent";

export default function AddBtn() {
  const open = useModalStore(state => state.open);
  const handleOpenAdd = () => {
    open(<AddStudyContent />);
  };
  return (
    <div className={styles.btnContainer} onClick={handleOpenAdd}>
      <div className={styles.content}>
        <div className={styles.plusBtn}>
          <ICPlus />
        </div>
        <p className={styles.text}>서재 생성하기</p>
      </div>
    </div>
  );
}
