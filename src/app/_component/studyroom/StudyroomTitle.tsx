import React from "react";
import styles from "./StudyroomTitle.module.css";
import commonStyles from "./CommonStyles.module.css";
import Ic_Heart_Abled from "../../../assets/icon/heart.svg";
// Disable된 버전 import 예정
import Ic_Share from "../../../assets/icon/share.svg";

const StudyroomTitle = () => {
  return (
    <div className={commonStyles.contentContainer} id={styles.mainBg}>
      <div className={commonStyles.contentTitle}>
        <div>13기 디자인 파트 세션</div>
        <div className={styles.svgContainer}>
          <div className={styles.svgItemContainer}>
            <Ic_Heart_Abled />
          </div>
          <div className={styles.svgItemContainer}>
            <Ic_Share />
          </div>
        </div>
      </div>
      <div className={commonStyles.contentInfo} id={styles.mainTitle}>
        주인장 | 12기 박지효
      </div>
    </div>
  );
};

export default StudyroomTitle;
