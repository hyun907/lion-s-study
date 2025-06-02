import React, { useState, useEffect } from "react";
import fireStore from "@/firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import IcDownload from "@/assets/icon/download.svg";

import styles from "./File.module.css";

interface Props {
  articleId: string;
  studyroomId: string;
}

export default function File({ articleId, studyroomId }: Props) {
  const [files, setLinks] = useState<any[]>([]);

  //  데이터 페치
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const articleRef = doc(fireStore, `studyRooms/${studyroomId}/articles/${articleId}`);
        const docSnap = await getDoc(articleRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setLinks(data.files || []);
        } else {
          console.warn("No such article document.");
        }
      } catch (err) {
        console.error("Failed to fetch article links:", err);
      }
    };

    fetchLinks();
  }, [articleId, studyroomId]);

  // 링크가 있을 경우에만
  if (files.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <h1>첨부 파일</h1>
      <div className={styles.fileContainer}>
        {files.map((files, index) => {
          return (
            <div className={styles.fileBtn} key={index}>
              <p>{files.fileName}</p>
              <div className={styles.downloadBtn}>
                <IcDownload className={styles.icdownload} viewBox="0 0 22 22" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
