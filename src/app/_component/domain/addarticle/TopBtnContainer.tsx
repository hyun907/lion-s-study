import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Toast from "../../common/Toast";
import IcInfo from "@/assets/icon/info.svg";
import InfoModal from "./InfoModal";

import styles from "./TopBtnContainer.module.css";

interface Props {
  title: string;
  markdown: string;
  onSubmit: () => void;
  articleId?: string;
  studyRoomId: string;
}

const TopBtnContainer = ({ title, markdown, onSubmit, articleId, studyRoomId }: Props) => {
  const [showEmptyTitleToast, setShowEmptyTitleToast] = useState(false);
  const [showEmptyContentToast, setShowEmptyContentToast] = useState(false);

  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  // useEffect(() => {
  //   const handleClickOutside = (e: MouseEvent) => {
  //     if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
  //       setShowInfoModal(false);
  //     }
  //   };

  //   if (showInfoModal) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [showInfoModal]);

  // hover
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  //작성완료
  const handleClick = () => {
    if (title.trim() === "") {
      setShowEmptyTitleToast(true);
      return;
    }

    if (markdown.trim() === "") {
      setShowEmptyContentToast(true);
      return;
    }

    onSubmit();
    router.push(`/studyroom/${studyRoomId}`);
  };

  const isReady = title.trim() !== "" && markdown.trim() !== "";

  return (
    <div className={styles.topContainer}>
      <div
        className={styles.infoBtn}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <IcInfo />
        <p>마크다운 언어란?</p>
      </div>

      <div className={styles.buttonSection}>
        <div className={styles.tempSubBtn}>임시저장</div>
        <button
          type="button"
          className={isReady ? styles.activatedBtn : styles.defaultBtn}
          onClick={handleClick}
        >
          {articleId ? "수정하기" : "작성 완료하기"}
        </button>
      </div>

      {showEmptyTitleToast && <Toast toastType="emptyTitle" />}
      {showEmptyContentToast && <Toast toastType="emptyContent" />}

      {isHovering && (
        <div style={{ position: "absolute", zIndex: 1000 }}>
          <InfoModal onClose={() => setIsHovering(false)} />
        </div>
      )}
    </div>
  );
};

export default TopBtnContainer;
