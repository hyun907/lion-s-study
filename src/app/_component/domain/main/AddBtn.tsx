"use client";

import ICPlus from "@/assets/icon/plus.svg";
import styles from "./AddBtn.module.css";

export default function AddBtn() {
  return (
    <div className={styles.btnContainer}>
      <div className={styles.content}>
        <div className={styles.plusBtn}>
          <ICPlus />
        </div>
        <p className={styles.text}>서재 생성하기</p>
      </div>
    </div>
  );
}
