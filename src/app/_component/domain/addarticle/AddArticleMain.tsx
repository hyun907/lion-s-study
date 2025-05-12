"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { useModalStore } from "@/store/useModalStore";
import { useUserStore } from "@/store/useUserStore";
import { useToastStore } from "@/store/useToastStore";
import { doc, getDoc } from "firebase/firestore";
import fireStore from "@/firebase/firestore";

import { useAuth } from "@/hooks/useAuth";
import DeleteModal from "./modal/DeleteModal";
import Toast from "../../common/Toast";
import IcArrow from "@/assets/icon/arrow_right.svg";
import Spinner from "@/app/_component/common/Spinner";
import AddTag from "./AddTag";
import TopBtnContainer from "./TopBtnContainer";
import TempSubmitModal from "./modal/TempSubmitModal";
import Titlebox from "./Titlebox";
import styles from "./AddArticleMain.module.css";
import { useDraftLoader } from "@/hooks/useDraftLoader";
import { useArticleSubmit } from "@/hooks/useArticleSubmit";
import { useTagHandler } from "@/hooks/useTagHandler";

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
  const { isLoggedIn } = useAuth();
  const open = useModalStore(state => state.open);
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [link, setLink] = useState("");
  const [tag, setTag] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [toastType, setToastType] = useState<string | null>(null);
  const { showToast } = useToastStore();
  const { loadDraft, clearDraft } = useDraftLoader();
  const isUserValid = uid && name && year;

  const { submitArticle } = useArticleSubmit({
    uid: uid ?? "",
    name: name ?? "",
    year: Number(year),
    studyRoomId: studyroomId,
    closeModal: useModalStore.getState().close,
    showToast,
    setToastType
  });

  // 수정 페이지 데이터 불러오기
  const { fetchAllCommonTags } = useTagHandler();

  useEffect(() => {
    const loadArticleData = async () => {
      const docRef = doc(fireStore, "studyRooms", studyroomId, "articles", articleId!);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        const data = snap.data();
        const tagIdsFromDb: string[] = data.tags || [];

        const allTags = await fetchAllCommonTags();

        const matchedTagNames = allTags
          .filter(tag => tagIdsFromDb.includes(tag.id))
          .map(tag => tag.name);

        setTitle(data.title || "");
        setMarkdown(data.content || "");
        setLink(JSON.stringify(data.link || []));
        setTag(matchedTagNames);
        localStorage.setItem("draft-tags", JSON.stringify(matchedTagNames));
        setIsReady(true);
      }
    };

    const loadDraftIfNeeded = () => {
      const { title, markdown, link, tags } = loadDraft();
      if (title || markdown) {
        open(
          <TempSubmitModal
            onContinue={() => {
              setTitle(title);
              setMarkdown(markdown);
              setLink(link);
              setTag(Array.isArray(tags) ? tags : []);
              setIsReady(true);
            }}
            onDiscard={() => {
              clearDraft();
              setTitle("");
              setMarkdown("");
              setLink("");
              setTag([]);
              setIsReady(true);
            }}
          />
        );
      } else {
        setIsReady(true);
      }
    };

    if (articleId) {
      loadArticleData();
    } else {
      loadDraftIfNeeded();
    }
  }, []);

  // 작성 중단 모달
  const handleOpenDelete = () =>
    open(<DeleteModal studyroomId={studyroomId} articleId={articleId} />);

  // 작성하기
  const handleSubmit = async () => {
    if (!isLoggedIn || !isUserValid) {
      setToastType("login");
      return;
    }

    const parsedTags = JSON.parse(localStorage.getItem("draft-tags") || "[]");
    await submitArticle({
      articleId,
      title,
      markdown,
      link,
      tags: parsedTags
    });
    clearDraft();
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
          studyRoomId={studyroomId}
        />
        <div className={styles.topSection}>
          <Titlebox title={title} setTitle={setTitle} />
          <AddTag isReady={isReady} />
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
