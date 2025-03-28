import React from "react";
import styles from "./StudyroomMain.module.css";
import StudyroomTitle from "./StudyroomTitle";
import Notice from "./Notice";
import Link from "./Link";
import Article from "./Article";
import Ic_ArrowRight from "../../../assets/icon/arrow_right.svg";

// studyroom 메인 페이지
const StudyroomMain = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        {/* mainContainer에 절대적인 뒤로가기 버튼 */}

        <div className={`${styles.subContainer} ${styles.leftContainer}`}>
          <div className={styles.absoluteBackBtnContainer}>
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
