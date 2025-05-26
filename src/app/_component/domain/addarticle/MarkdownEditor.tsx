"use client";
import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useContentExtract } from "@/hooks/microLink";

import storage from "@/firebase/firebaseStorage";
import Toast from "@/app/_component/common/Toast";

import styles from "./MarkdownEditor.module.css";

interface Props {
  setMarkdown: (val: string) => void;
  markdown: string;
  setLink?: (val: string) => void;
  link?: string;
}

// 수정하기 원문 적용, 로컬스토리지에 저장
const MarkdownEditor = ({ setMarkdown, markdown, setLink }: Props) => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [toastType, setToastType] = useState<string | null>(null);

  const { extractLinks } = useContentExtract();

  const handleChange = (value?: string) => {
    const updatedMarkdown = value || "";
    setMarkdown(updatedMarkdown);
    localStorage.setItem("draft-markdown", updatedMarkdown);

    const links = extractLinks(markdown);
    localStorage.setItem("draft-link", JSON.stringify(links));
    console.log("추출된 링크:", links);

    if (setLink) {
      setLink(JSON.stringify(links));
    }
  };

  // 이미지 드롭다운
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    setIsImageLoading(true);

    // 스토리지에 이미지 업로드
    try {
      const storageRef = ref(storage, `articles/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);

      const imageMarkdown = `![${file.name}](${imageUrl})\n`;
      const updatedMarkdown = `${markdown}\n${imageMarkdown}`;
      setMarkdown(updatedMarkdown);
      localStorage.setItem("draft-markdown", updatedMarkdown);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      setToastType("fail_add_image");
    } finally {
      setIsImageLoading(false);
    }
  };

  return (
    <div
      className={styles.editorWrapper}
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
      onDragLeave={e => e.preventDefault()}
    >
      <MDEditor
        height="50rem"
        value={markdown}
        onChange={handleChange}
        preview="live"
        previewOptions={{
          components: {
            a: ({ children, href }) => (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
            ul: ({ children }) => <ul style={{ listStyleType: "disc" }}>{children}</ul>,
            ol: ({ children }) => <ol style={{ listStyleType: "decimal" }}>{children}</ol>
          }
        }}
      />
      {toastType && <Toast toastType={toastType} />}
    </div>
  );
};

export default MarkdownEditor;
