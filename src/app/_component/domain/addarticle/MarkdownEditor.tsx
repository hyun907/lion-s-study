"use client";
import React from "react";
import MDEditor from "@uiw/react-md-editor";

import styles from "./MarkdownEditor.module.css";

interface Props {
  setMarkdown: (val: string) => void;
  markdown: string;
  setLink?: (val: string) => void;
  link?: string;
}

// 링크 추출
const extractLinks = (markdown: string): string[] => {
  const regex = /\[.*?\]\((https?:\/\/[^\s)]+)\)/g;
  const links: string[] = [];
  let match;

  while ((match = regex.exec(markdown)) !== null) {
    links.push(match[1]);
  }

  return links;
};

// 수정하기 원문 적용, 로컬스토리지에 저장
const MarkdownEditor = ({ setMarkdown, markdown }: Props) => {
  const handleChange = (value?: string) => {
    const updatedMarkdown = value || "";
    setMarkdown(updatedMarkdown);
    localStorage.setItem("draft-markdown", updatedMarkdown);

    const links = extractLinks(updatedMarkdown);
    localStorage.setItem("draft-link", JSON.stringify(links));
    console.log("추출된 링크:", links);
  };

  return (
    <div className={styles.editorWrapper}>
      <MDEditor height={"50rem"} value={markdown} onChange={handleChange} preview="live" />
    </div>
  );
};

export default MarkdownEditor;
