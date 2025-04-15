import React, { useEffect, useState } from "react";
import styles from "./Titlebox.module.css";

const Titlebox = () => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    const savedTitle = localStorage.getItem("draft-title");
    if (savedTitle) setTitle(savedTitle);
  }, []);

  // 입력할 때마다 로컬 저장
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    localStorage.setItem("draft-title", newTitle);
  };

  return (
    <div className={styles.topContainer}>
      <div className={styles.container}>
        <p className={styles.title}>제목</p>
        <input type="text" value={title} onChange={handleChange} className={styles.inputBox} />
      </div>
      <div className={styles.buttonSection}>
        <button type="button">생성하기</button>
      </div>
    </div>
  );
};

export default Titlebox;
