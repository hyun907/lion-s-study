import React from "react";
import styles from "./ReadArticleModal.module.css";
import ICDelete from "@/assets/icon/delete.svg";

const ReadArticleModal = () => {
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modalBox}>
          <div className={styles.topSection}>
            <p>Article 읽기</p>
            <ICDelete className={styles.cursorPointer} />
          </div>
          <div className={styles.bodySection}></div>
        </div>
      </div>
    </>
  );
};

export default ReadArticleModal;
