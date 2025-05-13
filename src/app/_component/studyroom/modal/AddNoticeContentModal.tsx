"use client";

import { useState, useEffect } from "react";
import { useModalStore } from "@/store/useModalStore";
import ICDelete from "@/assets/icon/delete.svg";
import modalStyles from "@/app/_component/common/Modal.module.css";
import styles from "./AddContent.module.css";
import { useStudyroomIdStore } from "@/store/useStudyroomIdStore";
import { useAuth } from "@/hooks/useAuth";
import { useNotices } from "@/hooks/useNotices";
import { useUserStore } from "@/store/useUserStore";
import { useToastStore } from "@/store/useToastStore";

interface AddNoticeModalContentProps {
  initialContent?: string;
  noticeId?: string;
}

const TITLE_MAX = 50;
const CONTENT_MAX = 60;

export default function AddNoticeModalContent({
  initialContent = "",
  noticeId
}: AddNoticeModalContentProps) {
  const close = useModalStore(state => state.close);
  const user = useUserStore();
  const studyroomId = useStudyroomIdStore(state => state.studyroomId);
  const { isLoggedIn } = useAuth();

  const { createNotice, updateNotice } = useNotices(studyroomId ?? "");
  const { showToast } = useToastStore();

  const [title, setTitle] = useState(initialContent);
  const [content, setContent] = useState(initialContent);

  const isTitleValid = title.trim() !== "";
  const isContentValid = content.trim() != "";

  const handleSubmit = async () => {
    if (!isTitleValid) {
      showToast("emptyTitle");
      return;
    }
    if (!isContentValid) {
      showToast("emptyContent");
      return;
    }
    if (!isLoggedIn || !user.uid || !user.name || !user.year) {
      showToast("login_common");
      return;
    }

    try {
      if (noticeId) {
        await updateNotice(noticeId, content);
        showToast("editNotice");
      } else {
        await createNotice(title, content, user.uid, user.name, user.year);
        showToast("addNotice");
      }

      close();
    } catch (err) {
      showToast("fail");
    }
  };

  return (
    <div className={modalStyles.modal}>
      <div className={modalStyles.modalHeader}>
        <h2 className={modalStyles.modalTitle}>{noticeId ? "Notice 수정하기" : "공지 생성하기"}</h2>
        <ICDelete onClick={close} style={{ cursor: "pointer" }} />
      </div>

      <div className={styles.inputContainer}>
        <div className={styles.label}>제목</div>
        <div>
          <input
            className={styles.input}
            value={title}
            onChange={e => setTitle(e.target.value)}
            maxLength={TITLE_MAX}
            placeholder="공지 제목을 입력해주세요"
          />
          <div className={styles.charCount}>
            {title.length} / {TITLE_MAX}
          </div>
        </div>
      </div>

      <div className={styles.inputContainer}>
        <div className={styles.label}>내용</div>
        <div>
          <input
            className={styles.input}
            value={content}
            onChange={e => setContent(e.target.value)}
            maxLength={CONTENT_MAX}
            placeholder="공지 내용을 입력해주세요"
          />
          <div className={styles.charCount}>
            {content.length} / {CONTENT_MAX}
          </div>
        </div>
      </div>

      <div className={styles.btnWrapper}>
        <button
          className={modalStyles.contentAddBtn}
          id={isTitleValid && isContentValid ? modalStyles.active : modalStyles.deactive}
          onClick={handleSubmit}
        >
          {noticeId ? "수정하기" : "등록하기"}
        </button>
      </div>
    </div>
  );
}
