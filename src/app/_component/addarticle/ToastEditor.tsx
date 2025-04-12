"use client";

import React, { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import styles from "./ToastEditor.module.css";

const ToastEditor = () => {
  const editorRef = useRef<Editor>(null);

  const handleGetContent = () => {
    const instance = editorRef.current;
    const markdown = instance?.getInstance().getMarkdown();
    console.log("작성한 내용:", markdown);
  };

  return (
    <div className={styles.editorWrapper}>
      <Editor
        ref={editorRef}
        initialValue="내용을 작성하세요"
        previewStyle="vertical"
        height="40rem"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        className={styles.editorWrapper}
      />
      {/* <button onClick={handleGetContent}>내용 확인</button> */}
    </div>
  );
};

export default ToastEditor;
