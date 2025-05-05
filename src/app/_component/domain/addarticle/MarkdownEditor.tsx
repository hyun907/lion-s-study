"use client";
import React from "react";
import MDEditor from "@uiw/react-md-editor";

import styles from "./MarkdownEditor.module.css";

interface Props {
  setMarkdown: (val: string) => void;
  markdown: string;
}

const MarkdownEditor = ({ setMarkdown, markdown }: Props) => {
  const handleChange = (value?: string) => {
    const updatedMarkdown = value || "";
    setMarkdown(updatedMarkdown);
    localStorage.setItem("draft-markdown", updatedMarkdown);
  };
  return (
    <div className={styles.editorWrapper}>
      <MDEditor height={"50rem"} value={markdown} onChange={handleChange} preview="live" />
    </div>
  );
};

export default MarkdownEditor;
