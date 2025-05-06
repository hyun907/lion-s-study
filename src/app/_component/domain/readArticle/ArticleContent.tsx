"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

import fireStore from "@/firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { useUserStore } from "@/store/useUserStore";

import MDEditor from "@uiw/react-md-editor";

import IcMenu from "@/assets/icon/menu.svg";
import BabyLionImg from "@/assets/image/babyLion.png";
import BigLionImg from "@/assets/image/bigLion.png";
import MenuModal from "./MenuModal";

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

  const [studyroomData, setStudyroomData] = useState<{
    title: string;
  } | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  useEffect(() => {
    const fetchStudyroom = async () => {
      if (!studyroomId) return;
      try {
        const studyroomRef = doc(fireStore, "studyRooms", studyroomId);
        const studyroomSnap = await getDoc(studyroomRef);

        if (studyroomSnap.exists()) {
          setStudyroomData(studyroomSnap.data() as any);
        } else {
          console.error("해당 스터디룸을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("스터디룸 이름 불러오기 실패:", error);
      }
    };

    fetchStudyroom();
  }, [studyroomId]);

  // 메뉴 모달

  const menuRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOpenMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target as Node) &&
      modalRef.current &&
      !modalRef.current.contains(e.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  if (!articleData) return <div className={styles.overlay}>로딩 중...</div>;

  const isMyArticle = uid === articleData.creatorId;

  return (
    <div className={styles.wrapper}>
      <div className={styles.bodyContainer}>
        <div className={styles.topContainer}>
          <div className={styles.topHeader}>
            <p>{studyroomData?.title}</p>
            <p>
              {articleData.createdAt
                ? new Date(articleData.createdAt.seconds * 1000).toLocaleDateString("ko-KR")
                : " "}
            </p>
          </div>

          <div className={styles.topBody}>
            <p>{articleData.title}</p>
            {isMyArticle && (
              <div style={{ position: "relative" }} ref={menuRef}>
                <IcMenu onClick={handleOpenMenu} style={{ cursor: "pointer" }} />
                {isMenuOpen && (
                  <div
                    ref={modalRef}
                    style={{
                      position: "absolute",
                      top: "3rem",
                      right: "14rem",
                      zIndex: 1000
                    }}
                  >
                    <MenuModal articleId={articleId} studyroomId={studyroomId} />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className={styles.profile}>
            <Image
              className={styles.profileImgContainer}
              src={articleData.creatorYear == "13" ? BabyLionImg : BigLionImg}
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
