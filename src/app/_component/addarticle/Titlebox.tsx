import React from "react";
import styles from "./Titlebox.module.css";

const Titlebox = () => {
  return (
    <div className={styles.topContainer}>
      <div className={styles.container}>
        <p className={styles.title}>제목</p>
        <input type="text" className={styles.inputBox} />
      </div>
      <div className={styles.buttonSection}>
        <button type="button">생성하기</button>
      </div>
    </div>
  );
};

export default Titlebox;
