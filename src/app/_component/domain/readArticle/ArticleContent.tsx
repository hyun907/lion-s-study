"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import fireStore from "@/firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { useUserStore } from "@/store/useUserStore";

import MDEditor from "@uiw/react-md-editor";

import IcMenu from "@/assets/icon/menu.svg";
import BigLionImg from "@/assets/image/babyLion.png";
import BabyLionImg from "@/assets/image/bigLion.png";

import styles from "./ArticleContent.module.css";
import Reference from "./Reference";

interface Props {
  articleId: string;
  studyroomId: string;
}

const ArticleContent = ({ articleId, studyroomId }: Props) => {
  const { uid } = useUserStore();
  const [articleData, setArticleData] = useState<{
    title: string;
    creatorName: string;
    creatorYear: string;
    creatorId: string;
    content: string;
    createdAt?: any;
  } | null>(null);

  studyroomId = studyroomId;

  useEffect(() => {
    const fetchArticle = async () => {
      if (!studyroomId) return;
      try {
        const articleRef = doc(fireStore, "studyRooms", studyroomId, "articles", articleId);
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
  }, [studyroomId, articleId]);

  if (!articleData) return <div className={styles.overlay}>로딩 중...</div>;
  const isMyArticle = uid === articleData.creatorId;

  return (
    <div className={styles.wrapper}>
      <div className={styles.bodyContainer}>
        <div className={styles.topContainer}>
          <div className={styles.topHeader}>
            <p>13기 디자인 특별세션</p>
            <p>
              {articleData.createdAt
                ? new Date(articleData.createdAt.seconds * 1000).toLocaleDateString("ko-KR")
                : " "}
            </p>
          </div>

          <div className={styles.topBody}>
            <p>{articleData.title}</p>
            {isMyArticle && <IcMenu cursor="pointer" />}
          </div>

          <div className={styles.profile}>
            <Image
              className={styles.profileImgContainer}
              src={BabyLionImg}
              alt="프로필 사진"
              unoptimized={true}
            ></Image>
            <div>
              <h1>{articleData.creatorName}</h1>
              <h2>{articleData.creatorYear}기</h2>
            </div>
          </div>
        </div>

        <MDEditor.Markdown source={articleData.content} />
      </div>

      <Reference articleId={articleId} />
    </div>
  );
};

export default ArticleContent;
