"use client";

import AddBtn from "./AddBtn";
import StudyBtn from "./StudyBtn";
import { formatDate } from "@/utils/formatDate";
import { useToastStore } from "@/store/useToastStore";
import { useStudyRoomStore } from "@/store/studyRoomStore";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import styles from "./StudySection.module.css";
import { sortByCreatedAt } from "@/utils/sortByCreatedAt";
import Toast from "../../common/Toast";

export default function StudySection() {
  const { studyRooms, isLoading, fetchStudyRooms } = useStudyRoomStore();
  const { isFavorite } = useUserStore();
  const { toastType } = useToastStore();

  useEffect(() => {
    fetchStudyRooms();
  }, [fetchStudyRooms]);

  // favorite 스터디룸과 일반 스터디룸을 분리
  const favoriteRooms = studyRooms.filter(room => isFavorite(room.id));
  const nonFavoriteRooms = studyRooms.filter(room => !isFavorite(room.id));

  // 각각을 updatedAt 기준으로 내림차순 정렬
  const sortedFavoriteRooms = sortByCreatedAt(favoriteRooms, false);
  const sortedNonFavoriteRooms = sortByCreatedAt(nonFavoriteRooms, false);

  // favorite 스터디룸을 먼저 배치
  const sortedStudyRooms = [...sortedFavoriteRooms, ...sortedNonFavoriteRooms];

  return (
    <>
      {toastType && <Toast toastType={toastType} />}
      <div className={styles.studySection}>
        <AddBtn />
        {isLoading ? (
          <p>불러오는 중</p>
        ) : studyRooms.length === 0 ? (
          <p>생성된 스터디룸이 없습니다.</p>
        ) : (
          sortedStudyRooms.map(room => (
            <StudyBtn
              key={room.id}
              id={room.id}
              title={room.title}
              creatorName={room.creatorName}
              creatorYear={room.creatorYear}
              updatedAt={formatDate(room.updatedAt)}
              imageUrl={room.imageUrl}
            />
          ))
        )}
      </div>
    </>
  );
}
