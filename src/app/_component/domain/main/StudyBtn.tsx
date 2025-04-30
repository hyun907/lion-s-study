"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { StudyBtnProps } from "@/types/studyRooms/studyRoom";
import { useFavorite } from "@/hooks/useFavorite";
import { useToastStore } from "@/store/useToastStore";
import { checkAuth } from "@/utils/checkAuth";

import ICEmptyHeart from "@/assets/icon/main/empty_heart.svg";
import ICFillHeart from "@/assets/icon/main/fill_heart.svg";
import defaultThumbnail from "@/assets/image/default_thumbnail.png";

import styles from "./StudyBtn.module.css";
import { useModalStore } from "@/store/useModalStore";
import LoginModalContent from "../login/modal/LoginModalContent";

export default function StudyBtn({
  id,
  title,
  creatorName,
  creatorYear,
  updatedAt,
  imageUrl
}: StudyBtnProps) {
  const router = useRouter();
  const { isFavorite, handleToggleFavorite } = useFavorite(id);
  const open = useModalStore(state => state.open);
  const showToast = useToastStore(state => state.showToast);

  const handleStudyBtnClick = () => {
    if (!checkAuth()) {
      open(<LoginModalContent />);
      showToast("login");
      return;
    }
    router.push(`/studyroom/${id}`);
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!checkAuth()) {
      open(<LoginModalContent />);
      showToast("login_common");
      return;
    }
    handleToggleFavorite(e);
  };

  return (
    <div
      className={styles.btnContainer}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleStudyBtnClick();
      }}
    >
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
          <div className={styles.heartWrapper} onClick={handleHeartClick}>
            {isFavorite ? <ICFillHeart /> : <ICEmptyHeart />}
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
