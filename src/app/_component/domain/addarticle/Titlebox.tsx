import React from "react";
import styles from "./Titlebox.module.css";

interface Props {
  title: string;
  setTitle: (val: string) => void;
}

const Titlebox = ({ title, setTitle }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    localStorage.setItem("draft-title", newTitle);
  };

  return (
    <div className={styles.topContainer}>
      <div className={styles.container}>
        <p className={styles.title}>제목</p>
        <input
          type="text"
          value={title}
          onChange={handleChange}
          className={styles.inputBox}
          placeholder="아티클 제목을 입력해주세요."
        />
      </div>
    </div>
  );
};

export default Titlebox;
