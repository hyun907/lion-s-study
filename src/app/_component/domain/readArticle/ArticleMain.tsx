"use client";

import React, { useState } from "react";

import ArticleList from "@/app/_component/domain/readArticle/ArticleList";
import ArticleContent from "@/app/_component/domain/readArticle/ArticleContent";
import Comment from "@/app/_component/domain/readArticle/Comment";
import Toast from "@/app/_component/common/Toast";
import styles from "./ArticleMain.module.css";
import { useToastStore } from "@/store/useToastStore";

interface Props {
  articleId: string;
  studyroomId: string;
}

export default function ArticleMain({ articleId, studyroomId }: Props) {
  // 토스트 메시지 타입
  const { toastType } = useToastStore();
  // 토스트 표시 여부를 관리하는 로컬 상태
  const [showToast, setShowToast] = useState(false);

  // toastType이 변경될 때마다 토스트를 표시
  React.useEffect(() => {
    if (toastType) {
      setShowToast(true);
    }
  }, [toastType]);

  return (
    <>
      <div className={styles.wrapper}>
        <ArticleList articleId={articleId} studyroomId={studyroomId} />
        <div className={styles.rightContainer}>
          <ArticleContent articleId={articleId} studyroomId={studyroomId} />
          <Comment articleId={articleId} studyroomId={studyroomId} />
        </div>
      </div>

      {showToast && toastType && <Toast toastType={toastType} />}
    </>
  );
}
