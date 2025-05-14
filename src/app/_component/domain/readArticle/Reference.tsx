import React, { useState, useEffect } from "react";
import fireStore from "@/firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import styles from "./Reference.module.css";

interface Props {
  articleId: string;
  studyroomId: string;
}

export default function Reference({ articleId, studyroomId }: Props) {
  const [links, setLinks] = useState<any[]>([]);

  // 링크 데이터 페치
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const articleRef = doc(fireStore, `studyRooms/${studyroomId}/articles/${articleId}`);
        const docSnap = await getDoc(articleRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setLinks(data.link || []);
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
  if (links.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <h1>레퍼런스(Link)</h1>
      <div className={styles.referenceContainer}>
        {links.map((link, index) => {
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
