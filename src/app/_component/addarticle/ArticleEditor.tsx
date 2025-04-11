import React from "react";
import styles from "./ArticleEditor.module.css";
import commonstyles from "./Titlebox.module.css";
import EditorBlock from "./EditorBlock";

const ArticleEditor = () => {
  return (
    <>
      <div className={commonstyles.container}>
        <p className={commonstyles.title}>아티클 에디터</p>
        <EditorBlock />
        <textarea className={`${commonstyles.inputBoxLarge} ${styles.inputBox}`} />
      </div>
    </>
  );
};

export default ArticleEditor;
