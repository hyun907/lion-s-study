"use client";
import React, { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import StudyroomTitle from "./StudyroomTitle";
import Notice from "./Notice";
import Link from "./Link";
import Article from "./Article";
import Toast from "../common/Toast";
import Spinner from "../common/Spinner";

import styles from "./StudyroomMain.module.css";
import Ic_ArrowRight from "../../../assets/icon/arrow_right.svg";
import { useStudyroomIdStore } from "@/store/useStudyroomIdStore";
import { useToastStore } from "@/store/useToastStore";
import { useStudyRoomStore } from "@/store/studyRoomStore";

interface StudyRoomProps {
  id: string;
}

// studyroom 메인 페이지
const StudyroomMain = ({ id }: StudyRoomProps) => {
  const router = useRouter();

  const { showToast, toastType } = useToastStore();
  const [showToastState, setShowToastState] = useState(false);

  // 클릭한 스터디룸 id값 관리
  const setId = useStudyroomIdStore(state => state.setStudyroomId);
  const clearId = useStudyroomIdStore(state => state.clearStudyroomId);
  const studyroomId = useStudyroomIdStore(state => state.studyroomId);

  const { studyRooms, isLoading, fetchStudyRooms } = useStudyRoomStore();

  // studyRooms 배열이 바뀌거나 id가 바뀌면 다시 받아오거나 기존 배열 사용
  useEffect(() => {
    if (studyRooms.length == 0) {
      fetchStudyRooms();
    }
  }, [studyRooms, id]);

  // 2. isLoading이 끝난 후 유효성 검사
  useEffect(() => {
    if (isLoading) return;

    const exists = studyRooms.some(room => room.id === id);

    if (!exists) {
      showToast("wrongStudyroomId");
      clearId();
      router.push("/");
    } else {
      setId(id);
    }

    return () => {
      clearId();
    };
  }, [isLoading, studyRooms, id]);

  useEffect(() => {
    if (toastType) {
      setShowToastState(true);
    }
  }, [toastType]);

  if (!studyroomId) {
    return null;
  }

  if (isLoading) return <Spinner />;
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={`${styles.subContainer} ${styles.leftContainer}`}>
          <div className={styles.absoluteBackBtnContainer} onClick={() => router.push("/")}>
            <Ic_ArrowRight viewBox="0 0 28 28" height="26" width="26" />
          </div>
          <StudyroomTitle />
          <Notice />
        </div>
        <div className={`${styles.subContainer} ${styles.rightContainer}`}>
          <Link />
          <Article />
        </div>
      </div>

      {showToastState && toastType && <Toast toastType={toastType} />}
    </>
  );
};

export default StudyroomMain;
