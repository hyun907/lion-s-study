"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";

import { useModalStore } from "@/store/useModalStore";
import { useUserStore } from "@/store/useUserStore";
import { useStudyroomIdStore } from "@/store/useStudyroomIdStore";
import { useAuth } from "@/hooks/useAuth";
import DeleteModal from "./DeleteModal";

import {
  collection,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  serverTimestamp,
  onSnapshot
} from "firebase/firestore";
import fireStore from "@/firebase/firestore";

import Titlebox from "./Titlebox";
import ICDelete from "@/assets/icon/delete.svg";

import styles from "./AddArticleModal.module.css";

const ToastEditor = dynamic(() => import("./ToastEditor"), {
  ssr: false,
  loading: () => <p>잠시만 기다려주세요...</p>
});

interface Props {
  articleId?: string;
}

const AddArticleModal = ({ articleId }: Props) => {
  const { name, year, uid } = useUserStore();
  const { studyroomId } = useStudyroomIdStore();
  const studyRoomId = studyroomId;
  console.log("studyRoomId", studyRoomId);

  useEffect(() => {
    if (!articleId || !studyRoomId) return;

    const docRef = doc(fireStore, "studyRooms", studyRoomId, "articles", articleId);
    const unsub = onSnapshot(docRef, snapshot => {
      const data = snapshot.data();
      if (data) {
        setTitle(data.title);
        setMarkdown(data.content);
      }
    });

    return () => unsub();
  }, [articleId, studyRoomId]);

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
      if (!studyRoomId) {
        alert("스터디룸 ID가 유효하지 않습니다.");
        return;
      }

      if (articleId) {
        // 수정
        const docRef = doc(fireStore, "studyRooms", studyRoomId, "articles", articleId);
        await updateDoc(docRef, {
          title,
          content: markdown,
          updatedAt: serverTimestamp()
        });
        alert("성공적으로 수정되었습니다!");
      } else {
        // 생성
        const articleRef = collection(fireStore, "studyRooms", studyRoomId, "articles");
        await addDoc(articleRef, {
          title,
          content: markdown,
          creatorName: name,
          creatorYear: year,
          creatorId: uid,
          createdAt: serverTimestamp()
        });
        alert("성공적으로 생성되었습니다!");
      }

      localStorage.removeItem("draft-title");
      localStorage.removeItem("draft-markdown");
      useModalStore.getState().close();
    } catch (error) {
      console.error("처리 중 오류:", error);
      alert("작업에 실패했습니다.");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalBox}>
        <div className={styles.topSection}>
          <p>{articleId ? "Article 수정하기" : "Article 생성하기"}</p>
          <ICDelete onClick={handleOpenDelete} style={{ cursor: "pointer" }} />
        </div>
        <div className={styles.bodySection}>
          <div className={styles.leftSection}>
            <Titlebox
              title={title}
              setTitle={setTitle}
              markdown={markdown}
              onSubmit={handleSubmit}
              articleId={articleId}
            />
            <ToastEditor setMarkdown={setMarkdown} markdown={markdown} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddArticleModal;
