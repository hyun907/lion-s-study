"use client";

import React from "react";
import Image from "next/image";
import styles from "./StudyroomTitle.module.css";
import commonStyles from "./CommonStyles.module.css";
import Ic_Clip from "../../../assets/icon/clip.svg";
import { useStudyroomIdStore } from "@/store/useStudyroomIdStore";
import { useStudyroomDetail } from "@/hooks/useStudyroomDetail";
import { useUserStore } from "@/store/useUserStore";
import { useFavorite } from "@/hooks/useFavorite";
import { useToastStore } from "@/store/useToastStore";

import BabyLionImg from "../../../assets/image/babyLion.png";
import BigLionImg from "../../../assets/image/bigLion.png";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

const StudyroomTitle = () => {
  const router = useRouter();

  const user = useUserStore();
  const id = useStudyroomIdStore(state => state.studyroomId);
  const { studyroom, loading, error } = useStudyroomDetail(id ?? "");
  const { isFavorite, handleToggleFavorite } = useFavorite(id ?? "");
  const { showToast } = useToastStore();

  if (!id || !user) {
    router.replace("/404");
  }

  // 이후 loading, error 처리
  if (loading) return <Loading />;
  if (error) router.replace("/404");

  const handleShare = async () => {
    if (!id) return;

    const shareUrl = `${window.location.origin}/studyroom/${id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast("copyLink");
    } catch (err) {
      showToast("fail");
    }
  };

  if (studyroom)
    return (
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <div className={styles.title} id={commonStyles.overflowEllipsis}>
            {studyroom.title}
          </div>
          <div className={styles.svgContainer}>
            <div
              className={styles.svgItemContainer}
              onClick={handleShare}
              style={{ cursor: "pointer" }}
            >
              <Ic_Clip />
            </div>
          </div>
        </div>
        <div className={commonStyles.subContainer}>
          <Image
            className={commonStyles.profileImgContainer}
            src={studyroom.creatorYear == 13 ? BabyLionImg : BigLionImg}
            alt="프로필 사진"
            unoptimized={true}
          ></Image>
          <div className={commonStyles.subTextContainer}>
            <div className={commonStyles.nameContainer}>{studyroom.creatorName}</div>
            {studyroom.creatorYear}기
          </div>
        </div>
      </div>
    );
  else router.replace("/404");
};

export default StudyroomTitle;
