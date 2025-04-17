"use client";

import React, { useEffect, useState } from "react";
import styles from "./ReadArticleModal.module.css";
import ICDelete from "@/assets/icon/delete.svg";
import ReactMarkdown from "react-markdown";
import { useModalStore } from "@/store/useModalStore";
import { doc, getDoc } from "firebase/firestore";
import fireStore from "@/firebase/firestore";

interface Props {
  studyRoomId: string;
  articleId: string;
}

const ReadArticleModal = ({ studyRoomId, articleId }: Props) => {
  const close = useModalStore(state => state.close);

  const [articleData, setArticleData] = useState<{
    title: string;
    creatorName: string;
    creatorYear: string;
    content: string;
    createdAt?: any;
  } | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articleRef = doc(fireStore, "studyRooms", studyRoomId, "articles", articleId);
        const articleSnap = await getDoc(articleRef);

        if (articleSnap.exists()) {
          setArticleData(articleSnap.data() as any);
        } else {
          console.error("해당 아티클을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("아티클 불러오기 실패:", error);
      }
    };

    fetchArticle();
  }, [studyRoomId, articleId]);

  if (!articleData) return <div className={styles.overlay}>로딩 중...</div>;

  return (
    <div className={styles.overlay}>
      <div className={styles.modalBox}>
        <div className={styles.topSection}>
          <div>
            <h1>{articleData.title}</h1>
            <h2>
              {articleData.creatorYear}기 {articleData.creatorName} |{" "}
              {articleData.createdAt
                ? new Date(articleData.createdAt.seconds * 1000).toLocaleDateString("ko-KR")
                : " "}
            </h2>
          </div>

          <ICDelete className={styles.deleteIc} onClick={close} />
        </div>
        <div className={styles.bodySection}>
          <ReactMarkdown>{articleData.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ReadArticleModal;
