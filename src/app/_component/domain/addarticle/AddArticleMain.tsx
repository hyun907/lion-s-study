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
  getDocs,
  serverTimestamp,
  onSnapshot,
  arrayUnion,
  writeBatch
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
  const [tag, setTag] = useState("");

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
    const savedTag = localStorage.getItem("draft-tags");

    if (savedTitle || savedMarkdown) {
      open(
        <TempSubmitModal
          onContinue={() => {
            setTitle(savedTitle || "");
            setMarkdown(savedMarkdown || "");
            setLink(savedLink || "");
            setTag(savedTag || "");

            setIsReady(true);
          }}
          onDiscard={() => {
            localStorage.removeItem("draft-title");
            localStorage.removeItem("draft-markdown");
            localStorage.removeItem("draft-link");
            localStorage.removeItem("draft-tags");
            localStorage.removeItem("draft-modal-tags");

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

  const getRandomColor = () => {
    const colors = ["#FFB6C1", "#ADD8E6", "#90EE90", "#FFD700", "#FFA07A"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleSubmit = async () => {
    try {
      if (!isLoggedIn) {
        setToastType("login");
        return;
      }

      const parsedLink = link ? JSON.parse(link) : [];
      const rawTags = localStorage.getItem("draft-tags");
      const parsedTags = rawTags ? JSON.parse(rawTags) : [];

      const batch = writeBatch(fireStore);
      const finalTagIds: string[] = [];

      // 1. 기존 태그 조회
      const commonTagRef = collection(fireStore, "commonTags");
      const existingTagsSnap = await getDocs(commonTagRef);
      const existingTagMap: Record<string, { id: string; color: string }> = {};
      existingTagsSnap.forEach(doc => {
        const data = doc.data();
        existingTagMap[data.name] = { id: doc.id, color: data.color };
      });

      // 2. 태그 처리
      for (const tagName of parsedTags) {
        if (existingTagMap[tagName]) {
          finalTagIds.push(existingTagMap[tagName].id);
        } else {
          const newTagRef = doc(collection(fireStore, "commonTags"));
          const color = getRandomColor();
          batch.set(newTagRef, {
            name: tagName,
            color
          });
          finalTagIds.push(newTagRef.id);
        }
      }

      // 3. 아티클 생성 or 수정
      let articleRef;
      if (articleId) {
        articleRef = doc(fireStore, "studyRooms", studyRoomId, "articles", articleId);
        batch.update(articleRef, {
          title,
          content: markdown,
          updatedAt: serverTimestamp(),
          link: parsedLink,
          tags: finalTagIds
        });
      } else {
        articleRef = doc(collection(fireStore, "studyRooms", studyRoomId, "articles"));
        batch.set(articleRef, {
          title,
          content: markdown,
          creatorName: name,
          creatorYear: year,
          creatorId: uid,
          createdAt: serverTimestamp(),
          link: parsedLink,
          tags: finalTagIds
        });
      }

      // 4. 유저 태그 업데이트
      if (!uid) {
        setToastType("login");
        return;
      }
      const userRef = doc(fireStore, "users", uid);
      finalTagIds.forEach(tagId => {
        batch.update(userRef, {
          tags: arrayUnion(tagId)
        });
      });

      // 5. 커밋
      await batch.commit();
      showToast(articleId ? "editArticle" : "addArticle");

      localStorage.removeItem("draft-title");
      localStorage.removeItem("draft-markdown");
      localStorage.removeItem("draft-link");
      localStorage.removeItem("draft-tags");
      localStorage.removeItem("draft-modal-tags");

      useModalStore.getState().close();
    } catch (err) {
      console.error("아티클 생성 실패:", err);
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
