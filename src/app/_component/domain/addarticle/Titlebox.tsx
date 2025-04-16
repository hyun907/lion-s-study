import React from "react";
import styles from "./Titlebox.module.css";

interface Props {
  title: string;
  setTitle: (val: string) => void;
  markdown: string;
}

const Titlebox = ({ title, setTitle, markdown }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    localStorage.setItem("draft-title", newTitle);
  };

  const isReady = title.trim() !== "" && markdown.trim() !== "";

  return (
    <div className={styles.topContainer}>
      <div className={styles.container}>
        <p className={styles.title}>제목</p>
        <input
          type="text"
          value={title}
          onChange={handleChange}
          className={styles.inputBox}
          placeholder="제목을 입력해주세요."
        />
      </div>
      <div className={styles.buttonSection}>
        <button
          type="button"
          className={isReady ? styles.activatedBtn : styles.defaultBtn}
          disabled={!isReady}
        >
          생성하기
        </button>
      </div>
    </div>
  );
};

export default Titlebox;
