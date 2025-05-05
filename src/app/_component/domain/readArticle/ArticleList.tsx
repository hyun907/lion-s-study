"use client";

import React from "react";

import styles from "./ArticleList.module.css";

interface Props {
  articleId: string;
}

const ArticleList = ({ articleId }: Props) => {
  return <div className={styles.wrapper}>아티클 리스트 컴포넌트 {articleId}</div>;
};

export default ArticleList;
