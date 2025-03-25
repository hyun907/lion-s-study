import React from "react";
import styles from "./AddArticleModal.module.css";
import Titlebox from "./Titlebox";
import ArticleEditor from "./ArticleEditor";
import ShowArticle from "./ShowArticle";

const AddArticleModal = () => {
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modalBox}>
          <div>
            <Titlebox />
            <ArticleEditor />
          </div>
          <ShowArticle />
        </div>
      </div>
    </>
  );
};

export default AddArticleModal;
