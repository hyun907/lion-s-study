"use client";

import AddBtn from "./AddBtn";
import StudyBtn from "./StudyBtn";
import { formatDate } from "@/utils/formatDate";
import { useToastStore } from "@/store/useToastStore";
import { useStudyRooms } from "@/hooks/studyroom";
import styles from "./StudySection.module.css";
import Toast from "../../common/Toast";
import Spinner from "../../common/Spinner";

export default function StudySection() {
  const { studyRooms, isLoading } = useStudyRooms();
  const { toastType } = useToastStore();

  return (
    <div className={styles.rootWrapper}>
      {toastType && <Toast toastType={toastType} />}
      <div className={styles.wrapper}>
        {!isLoading && (
          <p className={styles.pageText}>숭실대학교 사자들을 위한 스터디 공간입니다.</p>
        )}
        <div className={styles.studySection}>
          {isLoading ? (
            <div className={styles.spinnerWrapper}>
              <Spinner />
            </div>
          ) : studyRooms.length === 0 ? (
            <AddBtn />
          ) : (
            <>
              <AddBtn />
              {studyRooms.map(room => (
                <StudyBtn
                  key={room.id}
                  id={room.id}
                  title={room.title}
                  creatorName={room.creatorName}
                  creatorYear={room.creatorYear}
                  updatedAt={formatDate(room.updatedAt)}
                  imageUrl={room.imageUrl}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
