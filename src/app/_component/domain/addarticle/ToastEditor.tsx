"use client";
import React, { useRef, useEffect } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import styles from "./ToastEditor.module.css";

const ToastEditor = () => {
  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    const instance = editorRef.current?.getInstance();
    instance?.setMarkdown(""); // 본문 비우기
  }, []);

  return (
    <div className={styles.editorWrapper}>
      <Editor
        ref={editorRef}
        placeholder="내용을 작성하세요"
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
