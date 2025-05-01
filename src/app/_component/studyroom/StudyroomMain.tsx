"use client";
import React, { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import StudyroomTitle from "./StudyroomTitle";
import Notice from "./Notice";
import Link from "./Link";
import Article from "./Article";
import Toast from "../common/Toast";

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

  useEffect(() => {
    // 스터디룸 배열을 사용하여 유효한 스터디룸인지 확인하는 함수
    const validate = async () => {
      if (!isLoading && studyRooms.length === 0) {
        // 만약 특정 스터디룸 링크로 바로 들어온 상태라면 fetch 해주어야 함.
        await fetchStudyRooms();
      }

      const exists = studyRooms.some(room => room.id === id);

      if (!exists) {
        showToast("wrongStudyroomId");
        clearId();
        router.push("/"); // 메인페이지로
      } else {
        setId(id);
      }
    };

    validate();

    return () => {
      clearId();
    };
  }, [id]);

  useEffect(() => {
    if (toastType) {
      setShowToastState(true);
    }
  }, [toastType]);

  if (!studyroomId) {
    return null;
  }

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
