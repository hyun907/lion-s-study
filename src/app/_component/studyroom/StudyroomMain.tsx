"use client";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import StudyroomTitle from "./StudyroomTitle";
import Notice from "./Notice";
import Article from "./Article";
import Toast from "../common/Toast";

import styles from "./StudyroomMain.module.css";
import Ic_ArrowRight from "../../../assets/icon/arrow_right.svg";
import { useStudyroomIdStore } from "@/store/useStudyroomIdStore";
import { useToastStore } from "@/store/useToastStore";
import { useStudyroomDetail } from "@/hooks/useStudyroomDetail";
import Loading from "@/app/loading";
import NotFound from "@/app/not-found";

// studyroom 메인 페이지
const StudyroomMain = () => {
  const router = useRouter();
  const studyroomId = useStudyroomIdStore(state => state.studyroomId);

  const { toastType } = useToastStore();
  const [showToastState, setShowToastState] = useState(false);
  const { loading, error } = useStudyroomDetail(studyroomId ?? "");

  useEffect(() => {
    if (toastType) {
      setShowToastState(true);
    }
  }, [toastType]);

  if (!studyroomId) {
    return null;
  }

  if (loading) return <Loading />;
  if (error) return <NotFound />;

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.topContainer}>
          <div className={styles.backBtnContainer} onClick={() => router.push("/")}>
            <Ic_ArrowRight viewBox="0 0 28 28" height="26" width="26" />
          </div>
          <StudyroomTitle />
        </div>

        <div className={styles.mainContainer}>
          <Article />
          <Notice />
        </div>
      </div>
      {showToastState && toastType && <Toast toastType={toastType} />}
    </>
  );
};

export default StudyroomMain;
