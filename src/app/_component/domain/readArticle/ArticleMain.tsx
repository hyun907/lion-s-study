import React from "react";

import ArticleList from "@/app/_component/domain/readArticle/ArticleList";
import ArticleContent from "@/app/_component/domain/readArticle/ArticleContent";
import Comment from "@/app/_component/domain/readArticle/Comment";
import styles from "./ArticleMain.module.css";

interface Props {
  articleId: string;
  studyroomId: string;
}

export default function ArticleMain({ articleId, studyroomId }: Props) {
  return (
    <>
      <div className={styles.wrapper}>
        <ArticleList articleId={articleId} studyroomId={studyroomId} />
        <div className={styles.rightContainer}>
          <ArticleContent articleId={articleId} studyroomId={studyroomId} />
          <Comment articleId={articleId} studyroomId={studyroomId} />
        </div>
      </div>
    </>
  );
}
