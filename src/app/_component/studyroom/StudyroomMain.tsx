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

interface StudyRoomProps {
  id: string;
}

// studyroom 메인 페이지
const StudyroomMain = ({ id }: StudyRoomProps) => {
  const router = useRouter();

  const pathname = usePathname();

  const { showToast, toastType } = useToastStore();

  const [showToastState, setShowToastState] = useState(false);

  // 클릭한 스터디룸 id값 관리
  const setId = useStudyroomIdStore(state => state.setStudyroomId);
  const clearId = useStudyroomIdStore(state => state.clearStudyroomId);
  const studyroomId = useStudyroomIdStore(state => state.studyroomId);

  useEffect(() => {
    setId(id);

    return () => {
      clearId();
    };
  }, [id]);

  useEffect(() => {
    const isInStudyroom = pathname?.startsWith(`/studyroom/${id}`);

    if (!isInStudyroom) {
      clearId();
    }
  }, [pathname, id]);

  useEffect(() => {
    if (toastType) {
      setShowToastState(true);
    }
  }, [toastType]);

  const handleGoBack = () => {
    router.push("/");
  };

  if (!studyroomId) {
    showToast("wrongStudyroomId");
    return null;
  }

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={`${styles.subContainer} ${styles.leftContainer}`}>
          <div className={styles.absoluteBackBtnContainer} onClick={handleGoBack}>
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
