"use client";

import React from "react";

import styles from "./ArticleContent.module.css";

interface Props {
  articleId: string;
}

const ArticleContent = ({ articleId }: Props) => {
  return <div className={styles.wrapper}>아티클 본문 컴포넌트 {articleId}</div>;
};

export default ArticleContent;
