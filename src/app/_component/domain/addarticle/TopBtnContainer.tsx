import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "@/firebase/firebaseStorage";

import Toast from "../../common/Toast";
import InfoModal from "./modal/InfoModal";
import LinkModal from "./modal/LinkModal";

import IcInfo from "@/assets/icon/info.svg";
import IcLink from "@/assets/icon/link.svg";
import Icfile from "@/assets/icon/file.svg";

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

  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkCount, setLinkCount] = useState(0);

  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOpenLinkModal = () => setShowLinkModal(true);
  const handleCloseLinkModal = () => setShowLinkModal(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 파일 업로드
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileRef = ref(storage, `articles/${Date.now()}_${file.name}`);
      await uploadBytes(fileRef, file);
      const downloadUrl = await getDownloadURL(fileRef);

      const newFile = { fileName: file.name, fileUrl: downloadUrl };

      // 기존 로컬스토리지 값 가져오기
      const stored = JSON.parse(localStorage.getItem("draft-files") || "[]");

      const updated = [...stored, newFile];

      localStorage.setItem("draft-files", JSON.stringify(updated));

      console.log("파일 업로드 성공", newFile);
    } catch (err) {
      console.error("파일 업로드 실패", err);
    }
  };

  // 링크 모달 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowLinkModal(false);
      }
    };

    if (showLinkModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLinkModal]);

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

  // 링크 개수
  useEffect(() => {
    const updateCount = () => {
      try {
        const links = JSON.parse(localStorage.getItem("draft-link") || "[]");
        const files = JSON.parse(localStorage.getItem("draft-files") || "[]");

        const linkCount = Array.isArray(links) ? links.length : 0;
        const fileCount = Array.isArray(files) ? files.length : 0;

        setLinkCount(linkCount + fileCount);
      } catch (e) {
        console.error("❌ draft-link or draft-files parsing error:", e);
        setLinkCount(0);
      }
    };

    updateCount();
    const interval = setInterval(updateCount, 500);

    return () => clearInterval(interval);
  }, []);

  const isReady = title.trim() !== "" && markdown.trim() !== "";

  return (
    <div className={styles.topContainer}>
      <div className={styles.modalSection}>
        <div
          className={styles.infoBtn}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <IcInfo />
          <p>마크다운 언어란?</p>
        </div>

        <div className={styles.fileBtn} onClick={handleFileSelect}>
          <Icfile width="2.5rem" height="2.5rem" viewBox="0 0 31 31" />
          <p>파일(이미지) 첨부</p>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
        </div>

        <div
          className={`${styles.linkBtn} ${linkCount > 0 ? styles.activeBtn : styles.deActiveBtn}`}
          onClick={linkCount > 0 ? handleOpenLinkModal : undefined}
        >
          <IcLink
            className={`${styles.icLink} ${
              linkCount > 0 ? styles.activeLink : styles.deActiveLink
            }`}
          />
          <p>Reference({linkCount})</p>
        </div>
      </div>

      <div className={styles.buttonSection}>
        {/* <div className={styles.tempSubBtn}>임시저장</div> */}
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

      {showLinkModal && (
        <div ref={modalRef} style={{ position: "absolute", zIndex: 1000 }}>
          <LinkModal onClose={handleCloseLinkModal} />
        </div>
      )}

      {isHovering && (
        <div style={{ position: "absolute", zIndex: 1000 }}>
          <InfoModal onClose={() => setIsHovering(false)} />
        </div>
      )}
    </div>
  );
};

export default TopBtnContainer;
