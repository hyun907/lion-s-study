import React from "react";
import styles from "./ReadArticleModal.module.css";
import ICDelete from "@/assets/icon/delete.svg";
import ReactMarkdown from "react-markdown";
const ReadArticleModal = () => {
  const markdownText = `
  # 테스트
  `;
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modalBox}>
          <div className={styles.topSection}>
            <div>
              <h1>Article 읽기</h1>
              <h2>12기 박지효 | 25.02.11</h2>
            </div>

            <ICDelete className={styles.deleteIc} />
          </div>
          <div className={styles.bodySection}>
            <h1>1주차 - 마크다운이란?</h1>

            <ReactMarkdown>{markdownText}</ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadArticleModal;
