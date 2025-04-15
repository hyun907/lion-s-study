"use client";
import dynamic from "next/dynamic";

import React from "react";
import styles from "./AddArticleModal.module.css";
import Titlebox from "./Titlebox";
import ICDelete from "@/assets/icon/delete.svg";

const AddArticleModal = () => {
  const ToastEditor = dynamic(() => import("./ToastEditor"), {
    ssr: false
  });

  return (
    <div className={styles.overlay}>
      <div className={styles.modalBox}>
        <div className={styles.topSection}>
          <p>Article 생성하기</p>
          <ICDelete className={styles.cursorPointer} />
        </div>
        <div className={styles.bodySection}>
          <div className={styles.leftSection}>
            <Titlebox />
            <ToastEditor />
          </div>
        </div>
        {/* <div className={styles.buttonSection}>
          <button type="button">생성하기</button>
        </div> */}
      </div>
    </div>
  );
};

export default AddArticleModal;
