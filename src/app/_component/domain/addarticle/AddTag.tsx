import React, { useState } from "react";
import Toast from "../../common/Toast";

import IcDelete from "@/assets/icon/delete.svg";
import IcPlus from "@/assets/icon/plus.svg";

import styles from "./AddTag.module.css";

const AddTag = () => {
  return (
    <>
      <div className={styles.container}>
        <p className={styles.title}>태그</p>

        <div className={styles.tagContainer}>
          <div className={styles.addTagBtn}>
            <IcPlus viewBox="0 0 12 12" width="8" height="8" cursor="pointer" />
            <p>태그 추가</p>
          </div>
          <div className={styles.tagBtn}>
            <div className={styles.tagColor}></div>
            <p>태그이름</p>
            <IcDelete
              className={styles.deleteIcn}
              viewBox="0 0 12 12"
              width="8"
              height="8"
              cursor="pointer"
            />
          </div>
          <div className={styles.tagBtn}>
            <div className={styles.tagColor}></div>
            <p>태그이름</p>
            <IcDelete
              className={styles.deleteIcn}
              viewBox="0 0 12 12"
              width="8"
              height="8"
              cursor="pointer"
            />
          </div>
          <div className={styles.tagBtn}>
            <div className={styles.tagColor}></div>
            <p>태그이름태그이름태그이름태그이름태그이름</p>
            <IcDelete
              className={styles.deleteIcn}
              viewBox="0 0 12 12"
              width="8"
              height="8"
              cursor="pointer"
            />
          </div>
          <div className={styles.tagBtn}>
            <div className={styles.tagColor}></div>
            <p>태그이름</p>
            <IcDelete
              className={styles.deleteIcn}
              viewBox="0 0 12 12"
              width="8"
              height="8"
              cursor="pointer"
            />
          </div>
          <div className={styles.tagBtn}>
            <div className={styles.tagColor}></div>
            <p>태그이름</p>
            <IcDelete
              className={styles.deleteIcn}
              viewBox="0 0 12 12"
              width="8"
              height="8"
              cursor="pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTag;
