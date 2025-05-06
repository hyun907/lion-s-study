import React from "react";
import Image from "next/image";

import styles from "./Reference.module.css";
import UrlImg from "@/assets/image/urlImage.png";

interface Props {
  articleId: string;
}

export default function Reference({ articleId }: Props) {
  return (
    <>
      <div className={styles.wrapper}>
        <h1>레퍼런스(Link)</h1>
        <div className={styles.referenceContainer}>
          <div className={styles.referenceBox}>
            <Image
              className={styles.profileImgContainer}
              src={UrlImg}
              alt="url썸네일"
              unoptimized={true}
            ></Image>
            <div className={styles.referenceText}>
              <h1>[팝업 디자인] 팝업, 토스트 팝업, 스낵바 디자인</h1>
              <h2>https://potatohands-design.tistory.com/20</h2>
            </div>
          </div>

          <div className={styles.referenceBox}>
            <Image
              className={styles.profileImgContainer}
              src={UrlImg}
              alt="url썸네일"
              unoptimized={true}
            ></Image>
            <div className={styles.referenceText}>
              <h1>[팝업 디자인] 팝업, 토스트 팝업, 스낵바 디자인</h1>
              <h2>https://potatohands-design.tistory.com/20</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
