import React from "react";
import styles from "./StudyroomMain.module.css";
import StudyroomTitle from "./StudyroomTitle";
import Notice from "./Notice";
import Link from "./Link";
import Article from "./Article";
import Ic_ArrowRight from "../../../assets/icon/arrow_right.svg";
import { useRouter } from "next/navigation";

// studyroom 메인 페이지
const StudyroomMain = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={`${styles.subContainer} ${styles.leftContainer}`}>
          <div className={styles.absoluteBackBtnContainer} onClick={handleGoBack}>
            <Ic_ArrowRight />
          </div>
          <StudyroomTitle />
          <Notice />
        </div>
        <div className={`${styles.subContainer} ${styles.rightContainer}`}>
          <Link />
          <Article />
        </div>
      </div>
    </>
  );
};

export default StudyroomMain;
