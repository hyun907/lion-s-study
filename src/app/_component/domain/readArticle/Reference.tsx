import React, { useState, useEffect } from "react";
import { useMicrolink } from "@/hooks/useMicroLink";
import Spinner from "@/app/_component/common/Spinner";
import fireStore from "@/firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

import styles from "./Reference.module.css";

interface Props {
  articleId: string;
  studyroomId: string;
}

export default function Reference({ articleId, studyroomId }: Props) {
  const [links, setLinks] = useState<string[]>([]);
  const { linkPreviews, loading, error } = useMicrolink(links);

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

  return (
    <>
      <div className={styles.wrapper}>
        <h1>레퍼런스(Link)</h1>
        <div className={styles.referenceContainer}>
          {loading && (
            <div className={styles.loadingContainer}>
              <Spinner />
            </div>
          )}
          {error && <p>{error}</p>}

          {linkPreviews.map((link, index) => {
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
    </>
  );
}
