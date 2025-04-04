import React from "react";
import styles from "./ShowArticle.module.css";
import commonstyles from "./Titlebox.module.css";
import ReactMarkdown from "react-markdown";

const ShowArticle = () => {
  const markdownText = `
  # 테스트
  ## 테스트2
  ### 테스트3
  `;
  return (
    <div className={commonstyles.container}>
      <p className={commonstyles.title}>아티클 미리보기</p>
      <div className={commonstyles.inputBoxLarge} style={{ height: "47.8rem" }}>
        <ReactMarkdown>{markdownText}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ShowArticle;
