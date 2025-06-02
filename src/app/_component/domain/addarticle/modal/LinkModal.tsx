"use client";

import React, { useEffect, useState } from "react";
import { useMicrolink } from "@/hooks/microLink";
import Spinner from "@/app/_component/common/Spinner";
import IcDelete from "@/assets/icon/delete.svg";

import styles from "./LinkModal.module.css";

interface Props {
  onClose: () => void;
}

interface FileItem {
  fileName: string;
  fileUrl: string;
}

export default function LinkModal({ onClose }: Props) {
  const [draftLinks, setDraftLinks] = useState<string[]>([]);
  const [attachedFiles, setAttachedFiles] = useState<FileItem[]>([]);

  // draft-link, file 업데이트하고 가져오기
  useEffect(() => {
    const updateDraftLinksAndFiles = () => {
      try {
        const storedLinks = localStorage.getItem("draft-link");
        const storedFiles = localStorage.getItem("draft-files");

        if (storedLinks) {
          const parsedLinks = JSON.parse(storedLinks);
          if (Array.isArray(parsedLinks)) {
            setDraftLinks(parsedLinks);
          }
        }

        if (storedFiles) {
          const parsedFiles = JSON.parse(storedFiles);
          if (Array.isArray(parsedFiles)) {
            setAttachedFiles(parsedFiles);
          }
        }
      } catch (err) {
        console.error("❌ Error parsing draft-link, file:", err);
      }
    };

    updateDraftLinksAndFiles();
  }, []);

  // Microlink API에서 미리보기 데이터 불러오기
  const { linkPreviews, loading, error } = useMicrolink(draftLinks);

  // 파일 삭제
  const handleDeleteFile = (fileNameToDelete: string) => {
    const updatedFiles = attachedFiles.filter(file => file.fileName !== fileNameToDelete);
    setAttachedFiles(updatedFiles);
    localStorage.setItem("draft-files", JSON.stringify(updatedFiles));
  };

  return (
    <div className={styles.modal}>
      <h1 className={styles.modalText}>레퍼런스(Link)</h1>
      <div className={styles.referenceContainer}>
        {loading && (
          <div className={styles.loadingContainer}>
            <Spinner />
          </div>
        )}
        {error && <p>{error}</p>}

        {Array.isArray(linkPreviews) &&
          linkPreviews.map((link, index) => {
            const imageUrl = link.image?.url || "/default_thumbnail.png";

            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.referenceBox}
              >
                <img className={styles.profileImgContainer} src={imageUrl} alt="썸네일" />
                <div className={styles.referenceText}>
                  <h1>{link.title}</h1>
                  <h2>{link.url}</h2>
                </div>
              </a>
            );
          })}
      </div>
      {attachedFiles.length > 0 ? (
        <>
          <h1 className={styles.modalText}>첨부 파일</h1>
          <div className={styles.fileContainer}>
            {attachedFiles.map((file, idx) => (
              <div className={styles.fileBtn} key={idx}>
                <p>{file.fileName}</p>
                <div onClick={() => handleDeleteFile(file.fileName)}>
                  <IcDelete className={styles.icdelete} viewBox="0 0 12 12" />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}
