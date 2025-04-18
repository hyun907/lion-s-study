"use client";
import React, { useRef, useEffect } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import styles from "./ToastEditor.module.css";

interface Props {
  setMarkdown: (val: string) => void;
  markdown: string;
}
const ToastEditor = ({ setMarkdown, markdown }: Props) => {
  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    const instance = editorRef.current?.getInstance();
    if (!instance) return;

    instance.setMarkdown(markdown || "");
    setMarkdown(markdown || "");

    const handleChange = () => {
      const md = instance.getMarkdown() || "";
      localStorage.setItem("draft-markdown", md);
      setMarkdown(md);
    };

    instance.on("change", handleChange);

    return () => {
      instance.off("change", handleChange);
    };
  }, [markdown, setMarkdown]);

  return (
    <div className={styles.editorWrapper}>
      <Editor
        ref={editorRef}
        placeholder="내용을 작성해주세요."
        previewStyle="vertical"
        height="40rem"
        initialEditType="markdown"
        useCommandShortcut={true}
        className={styles.editorWrapper}
      />
    </div>
  );
};

export default ToastEditor;
