"use client";

import { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useUserStore } from "@/store/useUserStore";
import { useModalStore } from "@/store/useModalStore";
import fireStore from "@/firebase/firestore";
import { create } from "zustand";
import styles from "./SignUpModal.module.css";
import ICDelete from "@/assets/icon/delete.svg";

interface SignUpModalState {
  name: string;
  year: string;
  part: string;
  favorites: string[];
  setName: (name: string) => void;
  setYear: (year: string) => void;
  setPart: (part: string) => void;
  reset: () => void;
}

const useSignUpModalStore = create<SignUpModalState>(set => ({
  name: "",
  year: "",
  part: "",
  favorites: [],
  setName: name => set({ name }),
  setYear: year => set({ year }),
  setPart: part => set({ part }),
  reset: () => set({ name: "", year: "", part: "", favorites: [] })
}));

const PART_OPTIONS = [
  { value: "기획", label: "기획" },
  { value: "디자인", label: "디자인" },
  { value: "프론트엔드", label: "프론트엔드" },
  { value: "백엔드", label: "백엔드" }
];

export default function SignUpModal({
  uid,
  googleId,
  onSuccess
}: {
  uid: string;
  googleId: string;
  onSuccess: () => void;
}) {
  const { name, year, part, favorites, setName, setYear, setPart } = useSignUpModalStore();
  const { openedModal, closeModal } = useModalStore();
  const { clearUser } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);

  const isFormValid = name && year && part;

  const handleSubmit = async () => {
    if (!isFormValid) return alert("모든 값을 입력하세요");

    await setDoc(doc(fireStore, "users", uid), {
      googleId,
      name,
      year: Number(year),
      part,
      createdAt: serverTimestamp(),
      favorites
    });

    useUserStore.getState().setUser(uid, googleId);
    useUserStore.getState().setUserInfo(name, Number(year), part);
    onSuccess();
    closeModal();
  };

  const handleClose = () => {
    closeModal();
    clearUser();
  };

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string) => {
    setPart(value);
    setIsOpen(false);
  };

  if (openedModal !== "register") return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.title}>
          <p>내 정보 입력</p>
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
                value={year}
                onChange={e => setYear(e.target.value)}
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
              {isOpen && (
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
            <button onClick={handleSubmit} className={isFormValid ? styles.active : ""}>
              완료하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
