"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";

import { useModalStore } from "@/store/useModalStore";
import { useUserStore } from "@/store/useUserStore";
import { useToastStore } from "@/store/useToastStore";

import { useAuth } from "@/hooks/useAuth";
import DeleteModal from "./DeleteModal";
import Toast from "../../common/Toast";

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
import IcArrow from "@/assets/icon/arrow_right.svg";
import Spinner from "@/app/_component/common/Spinner";
import AddTag from "./AddTag";
import TopBtnContainer from "./TopBtnContainer";
import TempSubmitModal from "./TempSubmitModal";

import styles from "./AddArticleMain.module.css";

const MarkdownEditor = dynamic(() => import("./MarkdownEditor"), {
  ssr: false,
  loading: () => <Spinner />
});

interface Props {
  articleId?: string;
  studyroomId: string;
}

const AddArticleMain = ({ articleId, studyroomId }: Props) => {
  const { name, year, uid } = useUserStore();
  const studyRoomId = studyroomId;
  console.log("studyRoomId", studyRoomId);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!articleId || !studyRoomId) return;

    const docRef = doc(fireStore, "studyRooms", studyRoomId, "articles", articleId);
    const unsub = onSnapshot(docRef, snapshot => {
      const data = snapshot.data();
      if (data) {
        setTitle(data.title);
        setMarkdown(data.content);
        setIsReady(true);
      }
    });

    return () => unsub();
  }, [articleId, studyRoomId]);

  const { isLoggedIn } = useAuth();
  const open = useModalStore(state => state.open);
  const handleOpenDelete = () => open(<DeleteModal studyroomId={studyRoomId} />);

  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [link, setLink] = useState("");

  const [toastType, setToastType] = useState<string | null>(null);

  const { showToast } = useToastStore();

  // 임시 저장
  useEffect(() => {
    if (articleId) {
      setIsReady(true); // 수정 모드는 바로 렌더링
      return;
    }

    const savedTitle = localStorage.getItem("draft-title");
    const savedMarkdown = localStorage.getItem("draft-markdown");
    const savedLink = localStorage.getItem("draft-link");

    if (savedTitle || savedMarkdown) {
      open(
        <TempSubmitModal
          onContinue={() => {
            setTitle(savedTitle || "");
            setMarkdown(savedMarkdown || "");
            setLink(savedLink || "");
            setIsReady(true);
          }}
          onDiscard={() => {
            localStorage.removeItem("draft-title");
            localStorage.removeItem("draft-markdown");
            localStorage.removeItem("draft-link");

            setTitle("");
            setMarkdown("");
            setLink("");
            setIsReady(true);
          }}
        />
      );
    } else {
      setIsReady(true);
    }
  }, []);

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
      const parsedLink = link ? JSON.parse(link) : [];

      if (articleId) {
        // 수정
        const docRef = doc(fireStore, "studyRooms", studyRoomId, "articles", articleId);
        await updateDoc(docRef, {
          title,
          content: markdown,
          updatedAt: serverTimestamp(),
          link: parsedLink
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
          createdAt: serverTimestamp(),
          link: parsedLink
        });
        showToast("addArticle");
      }

      localStorage.removeItem("draft-title");
      localStorage.removeItem("draft-markdown");
      localStorage.removeItem("draft-link");

      useModalStore.getState().close();
    } catch (error) {
      console.error("처리 중 오류:", error);
      setToastType("fail");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.titleContainer}>
        <IcArrow onClick={handleOpenDelete} cursor="pointer" />
        <p>{articleId ? "아티클 수정하기" : "아티클 작성하기"}</p>
      </div>

      <div className={styles.modalBox}>
        <TopBtnContainer
          title={title}
          markdown={markdown}
          onSubmit={handleSubmit}
          articleId={articleId}
          studyRoomId={studyRoomId}
        />
        <div className={styles.topSection}>
          <Titlebox title={title} setTitle={setTitle} />
          <AddTag />
        </div>
        <div className={styles.bodySection}>
          <MarkdownEditor
            setMarkdown={setMarkdown}
            markdown={markdown}
            setLink={setLink}
            link={link}
          />
        </div>
      </div>
      {toastType && <Toast toastType={toastType} />}
    </div>
  );
};

export default AddArticleMain;
