"use client";

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
  // setFavorites: favorites => set({ favorites }),
  reset: () => set({ name: "", year: "", part: "", favorites: [] })
}));

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

  const handleSubmit = async () => {
    if (!name || !year || !part) return alert("모든 값을 입력하세요");

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

  if (openedModal !== "register") return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.title}>
          <p>내 정보 입력</p>
          <ICDelete onClick={handleClose} style={{ cursor: "pointer" }} />
        </div>
        <div className={styles.form}>
          <p className={styles.formLabel}>이름</p>
          <input value={name} onChange={e => setName(e.target.value)} />
          <p>기수</p>
          <div className={styles.yearWrapper}>
            <input
              value={year}
              onChange={e => setYear(e.target.value)}
              placeholder="ex) 13"
              className={styles.yearInput}
            />
            기
          </div>
          <select value={part} onChange={e => setPart(e.target.value)}>
            <option value="">파트 선택</option>
            <option value="기획">기획</option>
            <option value="디자인">디자인</option>
            <option value="프론트엔드">프론트엔드</option>
            <option value="백엔드">백엔드</option>
          </select>
          <button onClick={handleSubmit}>완료하기</button>
        </div>
      </div>
    </div>
  );
}
