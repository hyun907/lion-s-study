"use client";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useUserStore } from "@/store/useUserStore";
import { useModalStore } from "@/store/useModalStore";
import fireStore from "@/firebase/firestore";
import ICDelete from "@/assets/icon/delete.svg";
import { useState } from "react";
import modalStyles from "@/app/_component/common/Modal.module.css";
import styles from "./SignUpModal.module.css";
import PlusBtn from "@/app/_component/common/PlusBtn";
import { useToastStore } from "@/store/useToastStore";
import { PartDefaultTags } from "@/constants/PartDefaultTag";

const PART_OPTIONS = [
  { value: "기획", label: "기획" },
  { value: "디자인", label: "디자인" },
  { value: "프론트엔드", label: "프론트엔드" },
  { value: "백엔드", label: "백엔드" }
];

export default function SignUpModalContent({
  uid,
  googleId
}: {
  uid: string | null;
  googleId: string | null;
}) {
  const showToast = useToastStore(state => state.showToast);

  if (!uid || !googleId) {
    showToast("signup_error");
    return null;
  }

  const [isPartOpen, setIsPartOpen] = useState(false);

  const { name, year, part, setName, setYear, setPart, clearUser } = useUserStore();
  const close = useModalStore(state => state.close);

  const isFormValid = name && year && part;

  const handleSubmit = async () => {
    if (!isFormValid) return showToast("signup_empty");

    const defaultTags = PartDefaultTags[part] || [];

    await setDoc(doc(fireStore, "users", uid), {
      googleId,
      name,
      year: Number(year),
      part,
      createdAt: serverTimestamp(),
      favorites: [],
      tags: defaultTags
    });

    useUserStore.getState().setUserInfo(name, Number(year), part);
    showToast("welcome");
    close();
  };

  const handleClose = () => {
    clearUser();
    close();
  };

  const handleSelectClick = () => {
    setIsPartOpen(!isPartOpen);
  };

  const handleOptionClick = (value: string) => {
    setPart(value);
    setIsPartOpen(false);
  };

  return (
    <div className={modalStyles.modal}>
      <div className={modalStyles.modalHeader}>
        <h2 className={modalStyles.modalTitle}>내 정보 입력</h2>
        <ICDelete onClick={handleClose} style={{ cursor: "pointer" }} />
      </div>
      <div className={styles.form}>
        <div>
          <p className={styles.formLabel}>이름</p>
          <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <p className={styles.formLabel}>기수</p>
          <div className={styles.yearWrapper}>
            <input
              value={year || ""}
              onChange={e => {
                const value = e.target.value;
                if (value === "" || /^\d+$/.test(value)) {
                  setYear(value === "" ? 0 : Number(value));
                }
              }}
              placeholder="ex) 13"
              className={styles.yearInput}
            />
            <p className={styles.formLabel}>기</p>
          </div>
        </div>
        <div>
          <p className={styles.formLabel}>파트</p>
          <div className={styles.selectWrapper}>
            <div
              className={styles.selectBox}
              onClick={handleSelectClick}
              style={{ color: part ? "#000" : "#9a9a9a" }}
            >
              {part || "파트 선택"}
            </div>
            {isPartOpen && (
              <div className={styles.optionList}>
                {PART_OPTIONS.map(option => (
                  <div
                    key={option.value}
                    className={`${styles.option} ${
                      part === option.value ? styles.selectedOption : ""
                    }`}
                    onClick={() => handleOptionClick(option.value)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={styles.btnWrapper}>
          <PlusBtn
            onClick={handleSubmit}
            text="완료하기"
            state={isFormValid ? "active" : "default"}
          />
        </div>
      </div>
    </div>
  );
}
