"use client";

import React from "react";

import styles from "./Comment.module.css";

interface Props {
  articleId: string;
}

const Comment = ({ articleId }: Props) => {
  return <div className={styles.wrapper}>댓글창 컴포넌트 {articleId}</div>;
};

export default Comment;
