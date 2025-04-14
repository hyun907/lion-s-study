"use client";

import Image from "next/image";
import ICEmptyHeart from "@/assets/icon/main/empty_heart.svg";
import ICFillHeart from "@/assets/icon/main/fill_heart.svg";
import backgroundImg from "@/assets/image/background_mask.png";
import styles from "./StudyBtn.module.css";
import { useState } from "react";

export default function StudyBtn() {
  const [like, setLike] = useState(false);

  return (
    <div className={styles.btnContainer}>
      <div className={styles.btnTop}>
        {/* 썸네일 */}
        <Image src={backgroundImg} alt="배경 이미지" unoptimized={true} fill />
      </div>
      <div className={styles.btnBottom}>
        <div className={styles.titleSection}>
          <p className={styles.title}>14기 FE 파트 세션</p>
          <div className={styles.heartWrapper} onClick={() => setLike(!like)}>
            {like ? <ICEmptyHeart /> : <ICFillHeart />}
          </div>
        </div>
        <div className={styles.authorSection}>
          <div>
            주인장 | <span>12기 </span>
            <span>백승현</span>
          </div>
          <div>25.02.11</div>
        </div>
      </div>
    </div>
  );
}
