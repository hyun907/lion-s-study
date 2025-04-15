"use client";
import dynamic from "next/dynamic";

import React from "react";
import styles from "./AddArticleModal.module.css";
import Titlebox from "./Titlebox";
import ICDelete from "@/assets/icon/delete.svg";
import { useModalStore } from "@/store/useModalStore";
import DeleteModal from "./DeleteModal";

const AddArticleModal = () => {
  const ToastEditor = dynamic(() => import("./ToastEditor"), {
    ssr: false
  });

  const open = useModalStore(state => state.open);
  const handleOpenDelete = () => {
    open(<DeleteModal />);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalBox}>
        <div className={styles.topSection}>
          <p>Article 생성하기</p>
          <ICDelete onClick={handleOpenDelete} style={{ cursor: "pointer" }} />
        </div>
        <div className={styles.bodySection}>
          <div className={styles.leftSection}>
            <Titlebox />
            <ToastEditor />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddArticleModal;
