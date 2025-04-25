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

  const [content, setContent] = useState(initialContent);
  const isValid = content.trim() !== "";

  const handleSubmit = async () => {
    if (!isValid) {
      showToast("emptyContent");
      return;
    }
    if (!isLoggedIn || !user.uid || !user.name || !user.year) {
      showToast("login_common");
      return;
    }

    try {
      if (noticeId) {
        console.log("content", JSON.stringify(content));
        await updateNotice(noticeId, content);
        showToast("editNotice");
      } else {
        console.log("content", JSON.stringify(content));
        await createNotice(content, user.uid, user.name, user.year);
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
        <h2 className={modalStyles.modalTitle}>
          {noticeId ? "Notice 수정하기" : "Notice 생성하기"}
        </h2>
        <ICDelete onClick={close} style={{ cursor: "pointer" }} />
      </div>

      <div className={styles.inputContainer}>
        <div>내용</div>
        <input
          className={styles.input}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>

      <div className={styles.btnWrapper}>
        <button
          className={modalStyles.contentAddBtn}
          id={isValid ? modalStyles.active : modalStyles.deactive}
          onClick={handleSubmit}
        >
          {noticeId ? "수정하기" : "생성하기"}
        </button>
      </div>
    </div>
  );
}
