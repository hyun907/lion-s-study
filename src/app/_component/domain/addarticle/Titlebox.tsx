import React, { useState } from "react";
import Toast from "../../common/Toast";
import styles from "./Titlebox.module.css";

interface Props {
  title: string;
  setTitle: (val: string) => void;
  markdown: string;
  onSubmit: () => void;
  articleId?: string;
}

const Titlebox = ({ title, setTitle, markdown, onSubmit, articleId }: Props) => {
  const [showEmptyTitleToast, setShowEmptyTitleToast] = useState(false);
  const [showEmptyContentToast, setShowEmptyContentToast] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    localStorage.setItem("draft-title", newTitle);
  };

  // 제목, 내용 비어있는지
  const handleClick = () => {
    if (title.trim() === "") {
      setShowEmptyTitleToast(true);
      return;
    }

    if (markdown.trim() === "") {
      setShowEmptyContentToast(true);
      return;
    }

    onSubmit();
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
          onClick={handleClick}
        >
          {articleId ? "수정하기" : "생성하기"}
        </button>
      </div>

      {showEmptyTitleToast && <Toast toastType="emptyTitle" />}
      {showEmptyContentToast && <Toast toastType="emptyContent" />}
    </div>
  );
};

export default Titlebox;
