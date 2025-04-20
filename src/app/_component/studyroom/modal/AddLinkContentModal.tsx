"use client";

import { useModalStore } from "@/store/useModalStore";
import ICDelete from "@/assets/icon/delete.svg";
import modalStyles from "@/app/_component/common/Modal.module.css";
import styles from "./AddContent.module.css";
import { useState } from "react";
import { useLinks } from "@/hooks/useLinks";
import { useStudyroomIdStore } from "@/store/useStudyroomIdStore";
import { useAuth } from "@/hooks/useAuth";
import { useToastStore } from "@/store/useToastStore";

export default function AddLinkModalContent() {
  const close = useModalStore(state => state.close);
  const studyroomId = useStudyroomIdStore(state => state.studyroomId);
  const { isLoggedIn } = useAuth();

  const { createLink } = useLinks(studyroomId || "");
  const { showToast } = useToastStore();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const isValid = title.trim() !== "" && url.trim() !== "";

  const handleCreate = async () => {
    try {
      if (!isValid) return;

      if (!isLoggedIn) {
        alert("로그인이 필요합니다.");
        return;
      }

      await createLink(title, url);
      showToast("addLink");
      close();
    } catch (error) {
      alert("링크 생성에 실패하였습니다.");
    }
  };

  return (
    <div className={modalStyles.modal}>
      <div className={modalStyles.modalHeader}>
        <h2 className={modalStyles.modalTitle}>Link 생성하기</h2>
        <ICDelete onClick={close} style={{ cursor: "pointer" }} />
      </div>
      <div className={styles.inputContainer}>
        <div>링크명</div>
        <input className={styles.input} value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div className={styles.inputContainer}>
        <div>URL</div>
        <input className={styles.input} value={url} onChange={e => setUrl(e.target.value)} />
      </div>
      <div className={styles.btnWrapper}>
        <button
          className={modalStyles.contentAddBtn}
          id={isValid ? modalStyles.active : modalStyles.deactive}
          disabled={!isValid}
          onClick={handleCreate}
        >
          생성하기
        </button>
      </div>
    </div>
  );
}
