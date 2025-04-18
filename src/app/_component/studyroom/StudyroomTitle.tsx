"use client";

import React from "react";
import styles from "./StudyroomTitle.module.css";
import commonStyles from "./CommonStyles.module.css";
import Ic_Heart_Abled from "../../../assets/icon/heart.svg";
// Disable된 버전 import 예정
import Ic_Share from "../../../assets/icon/share.svg";
import { useStudyroomIdStore } from "@/store/useStudyroomIdStore";
import { useStudyroomDetail } from "@/hooks/useStudyroomDetail";
import { useUserStore } from "@/store/useUserStore";

const StudyroomTitle = () => {
  const user = useUserStore();
  const id = useStudyroomIdStore(state => state.studyroomId);
  const { studyroom, loading, error } = useStudyroomDetail(id ?? "");

  if (!id || !user) {
    return <div>오류 발생</div>;
  }

  // 이후 loading, error 처리
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  const handleShare = async () => {
    if (!id) return;

    const shareUrl = `${window.location.origin}/studyroom/${id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("링크가 복사되었습니다!");
    } catch (err) {
      console.error("클립보드 복사 실패:", err);
      alert("링크 복사에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (studyroom)
    return (
      <div className={commonStyles.contentContainer} id={styles.mainBg}>
        <div className={commonStyles.contentTitle}>
          <div>{studyroom.title}</div>
          <div className={styles.svgContainer}>
            <div className={styles.svgItemContainer}>
              <Ic_Heart_Abled />
            </div>
            <div
              className={styles.svgItemContainer}
              onClick={handleShare}
              style={{ cursor: "pointer" }}
            >
              <Ic_Share />
            </div>
          </div>
        </div>
        <div className={commonStyles.contentInfo} id={styles.mainTitle}>
          주인장 | {studyroom.creatorYear}기 {studyroom.creatorName}
        </div>
      </div>
    );
  else return <div>오류 발생</div>;
};

export default StudyroomTitle;
