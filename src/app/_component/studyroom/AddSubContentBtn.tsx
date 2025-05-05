"use client";

import React from "react";
import { useModalStore } from "@/store/useModalStore";
import commonStyles from "./CommonStyles.module.css";

import AddNoticeModalContent from "./modal/AddNoticeContentModal";
import AddLinkModalContent from "./modal/AddLinkContentModal";
import AddArticleModal from "@/app/_component/domain/addarticle/AddArticleModal";

import { SubContentType } from "@/types/studyRoomDetails/content";
import { SUB_CONTENT_TYPE } from "@/constants/StudyroomContentType";

interface SubContentProps {
  type: SubContentType;
}

export default function AddSubContentBtn({ type }: SubContentProps) {
  const open = useModalStore(state => state.open);

  const handleOpenModal = () => {
    switch (type) {
      case SUB_CONTENT_TYPE.NOTICE:
        open(<AddNoticeModalContent />);
        break;
      case SUB_CONTENT_TYPE.LINK:
        open(<AddLinkModalContent />);
        break;
      case SUB_CONTENT_TYPE.ARTICLE:
        open(<AddArticleModal />);
        break;
      default:
        console.warn(`Unknown content type: ${type}`);
    }
  };

  return (
    <button type="button" className={commonStyles.contentAddBtn} onClick={handleOpenModal}>
      작성하기
    </button>
  );
}
