"use client";
import { useState } from "react";
import Image from "next/image";
import { StudyBtnProps } from "@/types/studyRooms/studyRoom";

import ICEmptyHeart from "@/assets/icon/main/empty_heart.svg";
import ICFillHeart from "@/assets/icon/main/fill_heart.svg";
import defaultThumbnail from "@/assets/image/default_thumbnail.png";

import styles from "./StudyBtn.module.css";

export default function StudyBtn({
  title,
  creatorName,
  creatorYear,
  updatedAt,
  imageUrl
}: StudyBtnProps) {
  const [like, setLike] = useState(false);

  return (
    <div className={styles.btnContainer}>
      <div className={styles.btnTop}>
        <Image
          src={imageUrl || defaultThumbnail}
          alt={`${title} 썸네일 이미지`}
          unoptimized={true}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.btnBottom}>
        <div className={styles.titleSection}>
          <p className={styles.title}>{title}</p>
          <div className={styles.heartWrapper} onClick={() => setLike(!like)}>
            {like ? <ICEmptyHeart /> : <ICFillHeart />}
          </div>
        </div>
        <div className={styles.authorSection}>
          <div>
            주인장 | <span>{creatorYear}기 </span>
            <span>{creatorName}</span>
          </div>
          <div>{updatedAt}</div>
        </div>
      </div>
    </div>
  );
}
