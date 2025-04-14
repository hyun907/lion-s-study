"use client";

import { useState, useRef } from "react";

import { useModalStore } from "@/store/useModalStore";
import { useStudyRoomStore } from "@/store/studyRoomStore";
import { useUserStore } from "@/store/useUserStore";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import fireStore from "@/firebase/firestore";

import ICDelete from "@/assets/icon/delete.svg";
import ICSmallDelete from "@/assets/icon/main/small_delete.svg";
import ICLink from "@/assets/icon/link.svg";
import PlusBtn from "../../common/PlusBtn";

import modalStyles from "@/app/_component/common/Modal.module.css";
import styles from "./AddStudyContent.module.css";


export default function LogoutModalContent() {
  const { name, year } = useUserStore();
  const close = useModalStore(state => state.close);
  const fetchStudyRooms = useStudyRoomStore(state => state.fetchStudyRooms);

  const [fileName, setFileName] = useState("내 PC");
  const [studyName, setStudyName] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const closeModal = () => {
    close();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("내 PC");
    }
  };

  const handleResetFile = () => {
    setFileName("내 PC");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(fireStore, "studyRooms"), {
        title: studyName,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        creatorName: name,
        creatorYear: year
      });

      await fetchStudyRooms();
      close();
    } catch (error) {
      console.error("서재 생성 중 오류 발생:", error);
    }
  };

  return (
    <div className={modalStyles.modal}>
      <div className={modalStyles.modalHeader}>
        <h2 className={modalStyles.modalTitle}>서재 생성하기</h2>
        <ICDelete onClick={closeModal} style={{ cursor: "pointer" }} />
      </div>
      <div className={styles.nameSection}>
        <div className={styles.text}>서재명</div>
        <input
          className={styles.nameInput}
          value={studyName}
          onChange={e => setStudyName(e.target.value)}
        />
      </div>
      <div className={styles.imgSection}>
        <div className={styles.text}>대표 이미지</div>
        <div className={styles.bottomSection}>
          <label
            htmlFor="file"
            className={`${styles.label} ${fileName === "내 PC" ? styles.defaultLabel : ""}`}
          >
            <ICLink />
            <div className={styles.fileNameContainer}>
              {fileName}
              {fileName !== "내 PC" && (
                <ICSmallDelete
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleResetFile();
                  }}
                />
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/jpg,image/gif"
              id="file"
              className={styles.fileInput}
              onChange={handleFileChange}
            />
          </label>
          <PlusBtn
            text="생성하기"
            state={studyName.trim() ? "active" : "default"}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
