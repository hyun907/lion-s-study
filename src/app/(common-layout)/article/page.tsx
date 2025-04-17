"use client";

import React from "react";

import { useModalStore } from "@/store/useModalStore";

import AddArticleModal from "@/app/_component/domain/addarticle/AddArticleModal";
import ReadArticleModal from "@/app/_component/domain/readArticle/ReadArticleModal";

export default function Article() {
  const open = useModalStore(state => state.open);

  const handleOpenAdd = () => {
    open(<AddArticleModal studyRoomId="2Gyk5YwplLm61vnxHsyE" />);
  };

  const handleOpenRead = () => {
    open(<ReadArticleModal studyRoomId="2Gyk5YwplLm61vnxHsyE" articleId="Dwm85DUpikiivhhwpnMB" />);
  };

  console.log("Article 렌더링됨");

  return (
    <div style={{ paddingTop: "150px" }}>
      <button onClick={handleOpenAdd} style={{ cursor: "pointer" }}>
        추가하기
      </button>

      <button onClick={handleOpenRead} style={{ cursor: "pointer" }}>
        읽기
      </button>
    </div>
  );
}
