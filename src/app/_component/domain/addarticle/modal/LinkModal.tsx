"use client";

import React, { useEffect, useState } from "react";
import { useMicrolink } from "@/hooks/useMicroLink";
import Spinner from "@/app/_component/common/Spinner";

import styles from "./LinkModal.module.css";

interface Props {
  onClose: () => void;
}

export default function LinkModal({ onClose }: Props) {
  const [draftLinks, setDraftLinks] = useState<string[]>([]);

  // draft-link 업데이트하고 가져오기
  useEffect(() => {
    const updateDraftLinks = () => {
      const storedLinks = localStorage.getItem("draft-link");
      if (storedLinks) {
        try {
          const parsedLinks = JSON.parse(storedLinks);
          if (Array.isArray(parsedLinks)) {
            setDraftLinks(parsedLinks);
          }
        } catch (err) {
          console.error("❌ Error parsing draft-link:", err);
        }
      }
    };

    // 모달이 열릴 때마다 로컬스토리지에서 최신 draft-link 가져오기
    updateDraftLinks();
  }, []);

  // Microlink API에서 미리보기 데이터 불러오기
  const { linkPreviews, loading, error } = useMicrolink(draftLinks);

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
    </div>
  );
}
