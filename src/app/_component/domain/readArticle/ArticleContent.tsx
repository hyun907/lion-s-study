"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

import { useUserStore } from "@/store/useUserStore";

import MDEditor from "@uiw/react-md-editor";

import IcMenu from "@/assets/icon/menu.svg";
import BabyLionImg from "@/assets/image/babyLion.png";
import BigLionImg from "@/assets/image/bigLion.png";
import MenuModal from "./MenuModal";

import styles from "./ArticleContent.module.css";
import Reference from "./Reference";

import { ArticleItem } from "@/types/studyRoomDetails/article";
import { Tag } from "@/types/studyRoomDetails/article";
import { useStudyroomDetail } from "@/hooks/studyroom";
import TagItem from "../../common/TagItem";

interface Props {
  article: ArticleItem;
  articleId: string;
  studyroomId: string;
  tags: Tag[];
}

const ArticleContent = ({ article, articleId, studyroomId, tags }: Props) => {
  const { uid } = useUserStore();

  const { studyroom } = useStudyroomDetail(studyroomId);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const isMyArticle = uid === article.creatorId;
  const tagMap = new Map(tags.map(tag => [tag.id, tag]));

  return (
    <div className={styles.wrapper}>
      <div className={styles.bodyContainer}>
        <div className={styles.topContainer}>
          <div className={styles.topHeader}>
            <p>{studyroom?.title}</p>
            <p className={styles.articleDate}>
              {article.createdAt
                ? new Date(article.createdAt.seconds * 1000).toLocaleDateString("ko-KR")
                : " "}
            </p>
          </div>

          <div className={styles.topBody}>
            <p>{article.title}</p>
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

          <div className={styles.tag}>
            {article.tagIds &&
              article.tagIds.map(tagId => {
                const matchedTag = tagMap.get(tagId);
                return (
                  matchedTag && (
                    <TagItem key={matchedTag.id} name={matchedTag.name} color={matchedTag.color} />
                  )
                );
              })}
          </div>

          <div className={styles.profile}>
            <Image
              className={styles.profileImgContainer}
              src={article.creatorYear == 13 ? BabyLionImg : BigLionImg}
              alt="프로필 사진"
              unoptimized={true}
            ></Image>
            <div>
              <h1>{article.creatorName}</h1>
              <h2>{article.creatorYear}기</h2>
            </div>
          </div>
        </div>

        <MDEditor.Markdown
          source={article.content}
          components={{
            // linkTarget="_blank"
            a: ({ children, href }) => (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
            ul: ({ children }) => <ul style={{ listStyleType: "disc" }}>{children}</ul>,
            ol: ({ children }) => <ol style={{ listStyleType: "decimal" }}>{children}</ol>
          }}
        />
      </div>

      <Reference articleId={articleId} studyroomId={studyroomId} />
    </div>
  );
};

export default ArticleContent;
