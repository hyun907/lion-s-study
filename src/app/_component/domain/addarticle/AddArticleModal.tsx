"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";

import { useModalStore } from "@/store/useModalStore";
import { useUserStore } from "@/store/useUserStore";
import { useStudyroomIdStore } from "@/store/useStudyroomIdStore";
import { useToastStore } from "@/store/useToastStore";

import { useAuth } from "@/hooks/useAuth";
import DeleteModal from "./DeleteModal";
import Toast from "../../common/Toast";

import { lottieLion } from "@/lib/lottieLion";

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

const Lottie = dynamic(() => import("react-lottie"), {
  ssr: false
});

const ToastEditor = dynamic(() => import("./ToastEditor"), {
  ssr: false,
  loading: () => <Lottie options={lottieLion} height={200} width={200} />
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

  const [toastType, setToastType] = useState<string | null>(null);

  const { showToast } = useToastStore();

  const handleSubmit = async () => {
    try {
      if (!isLoggedIn) {
        setToastType("login");
        return;
      }
      if (!studyRoomId) {
        setToastType("wrongStudyroomId");
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
        showToast("editArticle");
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
        showToast("addArticle");
      }

      localStorage.removeItem("draft-title");
      localStorage.removeItem("draft-markdown");

      useModalStore.getState().close();
    } catch (error) {
      console.error("처리 중 오류:", error);
      setToastType("fail");
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOpenDelete}>
      <div className={styles.modalBox} onClick={e => e.stopPropagation()}>
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
      {toastType && <Toast toastType={toastType} />}
    </div>
  );
};

export default AddArticleModal;
