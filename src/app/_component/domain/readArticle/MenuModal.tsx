"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/store/useModalStore";
import { SUB_CONTENT_TYPE } from "@/constants/StudyroomContentType";

import IcPencil from "@/assets/icon/pencil.svg";
import IcTrash from "@/assets/icon/trash_black.svg";
import DeleteContentModal from "../../studyroom/modal/DeleteContentModal";

import styles from "./MenuModal.module.css";

interface Props {
  studyroomId: string;
  articleId: string;
}

export default function MenuModal({ articleId, studyroomId }: Props) {
  const open = useModalStore(state => state.open);
  const router = useRouter();

  const handleDelete = () => {
    open(
      <DeleteContentModal
        type={SUB_CONTENT_TYPE.ARTICLE}
        contentId={articleId}
        studyroomId={studyroomId}
      />
    );
  };

  const handleEdit = () => {
    const id = studyroomId;
    router.push(`/studyroom/${id}/addarticle/${articleId}`);
  };
  return (
    <div className={styles.modal}>
      <p className={styles.modalHeader}>아티클 수정 및 삭제</p>
      <div>
        <div className={styles.menuOption} onClick={handleEdit}>
          <IcPencil />
          <p>수정하기</p>
        </div>

        <div className={styles.menuOption} onClick={handleDelete}>
          <IcTrash />
          <p>삭제하기</p>
        </div>
      </div>
    </div>
  );
}
