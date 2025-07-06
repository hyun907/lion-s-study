"use client";

import React, { useEffect, useState } from "react";

import ArticleList from "@/app/_component/domain/readArticle/ArticleList";
import ArticleContent from "@/app/_component/domain/readArticle/ArticleContent";
import Comment from "@/app/_component/domain/readArticle/Comment";
import Toast from "@/app/_component/common/Toast";
import styles from "./ArticleMain.module.css";
import { useToastStore } from "@/store/useToastStore";
import { useArticlesStore } from "@/store/useArticlesStore";
import Loading from "@/app/loading";
import { ArticleItem } from "@/types/studyRoomDetails/article";
import { useRouter } from "next/navigation";
import { useCommonTagStore } from "@/store/useCommontagStore";

interface Props {
  articleId: string;
  studyroomId: string;
}

export default function ArticleMain({ articleId, studyroomId }: Props) {
  const router = useRouter();

  // 토스트 메시지 타입
  const { toastType } = useToastStore();
  // 토스트 표시 여부를 관리하는 로컬 상태
  const [showToast, setShowToast] = useState(false);
  const [singleArticle, setSingleArticle] = useState<ArticleItem | null>(null);

  // 상위 컴포넌트에서 loading 여부를 한번에 확인
  const { isLoading, articles } = useArticlesStore();
  const { isTagLoading, tags } = useCommonTagStore();

  // toastType이 변경될 때마다 토스트를 표시
  React.useEffect(() => {
    if (toastType) {
      setShowToast(true);
    }
  }, [toastType]);

  // articles 데이터에 대한 isLoading은 단일 로직 처리
  // articles 전역 데이터는 부모 컴포넌트에서 받아 props로 전달

  useEffect(() => {
    if (!isLoading && articles.length > 0) {
      const found = articles.find(article => article.id === articleId);
      if (!found) router.replace("/404"); // 바로 404로
      else setSingleArticle(found);
    }
  }, [isLoading, articleId]);

  if (isLoading || articles.length === 0 || !singleArticle || isTagLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className={styles.wrapper}>
        {/* 아티클 리스트에는 전역 아티클 리스트를 전달 */}
        <ArticleList articleId={articleId} studyroomId={studyroomId} articles={articles} />
        <div className={styles.rightContainer}>
          {/* 아티클 컨텐트에는 단일 아티클 아이템만 전달 */}
          <ArticleContent
            articleId={articleId}
            studyroomId={studyroomId}
            article={singleArticle}
            tags={tags}
          />
          <Comment articleId={articleId} studyroomId={studyroomId} />
        </div>
      </div>

      {showToast && toastType && <Toast toastType={toastType} />}
    </>
  );
}
