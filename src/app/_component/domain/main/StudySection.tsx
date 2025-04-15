"use client";

import AddBtn from "./AddBtn";
import StudyBtn from "./StudyBtn";
import { formatDate } from "@/utils/formatDate";
import { useStudyRoomStore } from "@/store/studyRoomStore";
import { useEffect } from "react";
import styles from "./StudySection.module.css";

export default function StudySection() {
  const { studyRooms, isLoading, fetchStudyRooms } = useStudyRoomStore();

  useEffect(() => {
    fetchStudyRooms();
  }, [fetchStudyRooms]);

  return (
    <div className={styles.studySection}>
      <AddBtn />

      {isLoading ? (
        <p>불러오는 중</p>
      ) : studyRooms.length === 0 ? (
        <p>생성된 스터디룸이 없습니다.</p>
      ) : (
        studyRooms.map(room => (
          <StudyBtn
            key={room.id}
            title={room.title}
            creatorName={room.creatorName}
            creatorYear={room.creatorYear}
            updatedAt={formatDate(room.updatedAt)}
            imageUrl={room.imageUrl}
          />
        ))
      )}
    </div>
  );
}
