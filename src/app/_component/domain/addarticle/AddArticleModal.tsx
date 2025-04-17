"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";

import { useModalStore } from "@/store/useModalStore";
import { useUserStore } from "@/store/useUserStore";
import { useAuth } from "@/hooks/useAuth";
import DeleteModal from "./DeleteModal";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import fireStore from "@/firebase/firestore";

import Titlebox from "./Titlebox";
import ICDelete from "@/assets/icon/delete.svg";

import styles from "./AddArticleModal.module.css";

const ToastEditor = dynamic(() => import("./ToastEditor"), {
  ssr: false,
  loading: () => <p>잠시만 기다려주세요...</p>
});

interface Props {
  studyRoomId: string;
}

const AddArticleModal = ({ studyRoomId }: Props) => {
  console.log(studyRoomId);
  const { name, year, uid } = useUserStore();

  const { isLoggedIn } = useAuth();
  const open = useModalStore(state => state.open);
  const handleOpenDelete = () => open(<DeleteModal />);

  const [title, setTitle] = useState(() => localStorage.getItem("draft-title") || "");
  const [markdown, setMarkdown] = useState(() => localStorage.getItem("draft-markdown") || "");

  const handleSubmit = async () => {
    try {
      if (!isLoggedIn) {
        alert("로그인이 필요합니다.");
        return;
      }

      const articleRef = collection(fireStore, "studyRooms", studyRoomId, "articles");

      await addDoc(articleRef, {
        title,
        content: markdown,
        creatorName: name,
        creatorYear: year,
        creatorId: uid,
        createdAt: serverTimestamp()
      });

      localStorage.removeItem("draft-title");
      localStorage.removeItem("draft-markdown");

      useModalStore.getState().close();
      alert("성공적으로 생성되었습니다!");
    } catch (error) {
      console.error("생성 중 오류:", error);
      alert("생성에 실패했습니다.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalBox}>
        <div className={styles.topSection}>
          <p>Article 생성하기</p>
          <ICDelete onClick={handleOpenDelete} style={{ cursor: "pointer" }} />
        </div>
        <div className={styles.bodySection}>
          <div className={styles.leftSection}>
            <Titlebox
              title={title}
              setTitle={setTitle}
              markdown={markdown}
              onSubmit={handleSubmit}
            />
            <ToastEditor setMarkdown={setMarkdown} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddArticleModal;
