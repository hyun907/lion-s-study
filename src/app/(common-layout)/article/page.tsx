"use client";

import AddArticleModal from "@/app/_component/domain/addarticle/AddArticleModal";
import ReadArticleModal from "@/app/_component/domain/readArticle/ReadArticleModal";
import { useModalStore } from "@/store/useModalStore";

import React from "react";

export default function Article() {
  const open = useModalStore(state => state.open);
  const handleOpenAdd = () => {
    open(<AddArticleModal />);
  };
  const handleOpenRead = () => {
    open(<ReadArticleModal />);
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
