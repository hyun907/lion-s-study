"use client";

import { useState, useRef } from "react";

import { useModalStore } from "@/store/useModalStore";
import { useStudyRoomStore } from "@/store/studyRoomStore";
import { useUserStore } from "@/store/useUserStore";
import { useAuth } from "@/hooks/useAuth";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import fireStore from "@/firebase/firestore";
import storage from "@/firebase/firebaseStorage";

import ICDelete from "@/assets/icon/delete.svg";
import ICSmallDelete from "@/assets/icon/main/small_delete.svg";
import ICLink from "@/assets/icon/link.svg";
import PlusBtn from "../../common/PlusBtn";

import modalStyles from "@/app/_component/common/Modal.module.css";
import styles from "./AddStudyContent.module.css";

export default function AddStudyContent() {
  const { name, year } = useUserStore();
  const { isLoggedIn } = useAuth();
  const close = useModalStore(state => state.close);
  const fetchStudyRooms = useStudyRoomStore(state => state.fetchStudyRooms);

  const [fileName, setFileName] = useState("내 PC");
  const [studyName, setStudyName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const closeModal = () => {
    close();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
    } else {
      setFileName("내 PC");
      setSelectedFile(null);
    }
  };

  const handleResetFile = () => {
    setFileName("내 PC");
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = null;

      // 사용자 인증 확인
      if (!isLoggedIn) {
        alert("로그인이 필요합니다.");
        return;
      }

      // 이미지가 선택된 경우 스토리지에 업로드
      if (selectedFile) {
        try {
          const storageRef = ref(storage, `studyRooms/${Date.now()}_${selectedFile.name}`);
          await uploadBytes(storageRef, selectedFile);
          imageUrl = await getDownloadURL(storageRef);
        } catch (uploadError) {
          console.error("이미지 업로드 중 오류 발생:", uploadError);
          alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
          return;
        }
      }

      const docRef = await addDoc(collection(fireStore, "studyRooms"), {
        title: studyName,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        creatorName: name,
        creatorYear: year,
        imageUrl: imageUrl || null
      });

      await fetchStudyRooms();
      close();
    } catch (error) {
      console.error("서재 생성 중 오류 발생:", error);
      alert("서재 생성에 실패했습니다. 다시 시도해주세요.");
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
