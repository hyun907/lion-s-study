"use client";

import { useEffect, useRef, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc
} from "firebase/firestore";
import fireStore from "@/firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "@/firebase/firebaseStorage";

import { formatDate } from "@/utils/formatDate";
import { useUserStore } from "@/store/useUserStore";
import { useToastStore } from "@/store/useToastStore";
import { sortArrByTime } from "@/utils/sortArrByTime";
import Spinner from "@/app/_component/common/Spinner";

import Image from "next/image";
import styles from "./Comment.module.css";

import BabyLionImg from "@/assets/image/babyLion.png";
import BigLionImg from "@/assets/image/bigLion.png";
import ICUpload from "@/assets/icon/upload_arrow.svg";
import ICTrash from "@/assets/icon/trash.svg";
import ICFile from "@/assets/icon/file.svg";
import ICDownload from "@/assets/icon/download.svg";
import ICDelete from "@/assets/icon/gray_delete.svg";

interface CommentData {
  commentId: string;
  content: string;
  author: string;
  creatorYear: string;
  createdAt: { toMillis: () => number };
  uid: string;
  fileName?: string;
  imageUrl?: string;
}

interface Props {
  articleId: string;
  studyroomId: string;
}

const Comment = ({ articleId, studyroomId }: Props) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<CommentData[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { name, year, uid } = useUserStore();
  const showToast = useToastStore(state => state.showToast);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const commentsAreaRef = useRef<HTMLDivElement>(null);
  const prevCommentsLengthRef = useRef(0);

  useEffect(() => {
    const commentsRef = collection(
      fireStore,
      `studyRooms/${studyroomId}/articles/${articleId}/comments`
    );
    const unsub = onSnapshot(commentsRef, snap => {
      const result: CommentData[] = snap.docs.map(doc => ({
        commentId: doc.id,
        content: doc.data().content,
        author: doc.data().author,
        creatorYear: doc.data().creatorYear,
        createdAt: doc.data().createdAt,
        uid: doc.data().uid,
        fileName: doc.data().fileName,
        imageUrl: doc.data().imageUrl
      }));
      const sortedComments = sortArrByTime(result, true);
      setComments(sortedComments);
      setIsLoading(false);
    });

    return () => unsub();
  }, [articleId, studyroomId]);

  // 댓글 추가하면 해당 댓글로 스크롤
  useEffect(() => {
    if (comments.length > prevCommentsLengthRef.current && commentsAreaRef.current) {
      const scrollOptions = {
        top: commentsAreaRef.current.scrollHeight,
        behavior: "smooth" as const
      };
      commentsAreaRef.current.scrollTo(scrollOptions);
    }
    prevCommentsLengthRef.current = comments.length;
  }, [comments]);

  const handleSubmit = async () => {
    if (!commentText.trim() && !selectedFile) {
      return;
    }

    try {
      let imageUrl = null;

      if (selectedFile) {
        try {
          const storageRef = ref(storage, `studyRooms/${Date.now()}_${selectedFile.name}`);
          await uploadBytes(storageRef, selectedFile);
          imageUrl = await getDownloadURL(storageRef);
        } catch (uploadError) {
          console.error("파일 업로드 중 오류 발생:", uploadError);
          showToast("fail");
          return;
        }
      }

      const commentsRef = collection(
        fireStore,
        `studyRooms/${studyroomId}/articles/${articleId}/comments`
      );

      const commentData = {
        content: commentText,
        author: name,
        creatorYear: year?.toString() || "",
        createdAt: serverTimestamp(),
        uid: uid,
        fileName: selectedFile?.name || "",
        imageUrl: imageUrl
      };

      await addDoc(commentsRef, commentData);
      setCommentText("");
      setSelectedFile(null);

      if (commentsAreaRef.current) {
        commentsAreaRef.current.scrollTop = commentsAreaRef.current.scrollHeight;
      }
    } catch (error) {
      console.error("댓글 작성 중 오류 발생:", error);
      showToast("fail");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const commentRef = doc(
        fireStore,
        `studyRooms/${studyroomId}/articles/${articleId}/comments/${commentId}`
      );
      await deleteDoc(commentRef);
    } catch (error) {
      console.error("댓글 삭제 중 오류 발생:", error);
      showToast("fail");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileDownload = async (fileUrl: string, fileName: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("파일 다운로드 중 오류 발생:", error);
      showToast("fail");
    }
  };

  const handleResetFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isSubmitEnabled = Boolean(commentText.trim()) || Boolean(selectedFile);

  return (
    <div className={styles.wrapper}>
      <div className={styles.commentBoxWrapper}>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <Spinner />
          </div>
        ) : comments.length > 0 ? (
          <div className={styles.commentsArea} ref={commentsAreaRef}>
            {comments.map(comment => (
              <div className={styles.commentWrapper} key={comment.commentId}>
                <Image
                  className={styles.profileImgContainer}
                  src={comment.creatorYear === "13" ? BabyLionImg : BigLionImg}
                  alt="프로필 사진"
                  unoptimized={true}
                />
                <div className={styles.comment}>
                  <div className={styles.commentHeader}>
                    <div className={styles.authorGroup}>
                      <span className={styles.author}>{comment.author}</span>
                      <span className={styles.creatorYear}>{comment.creatorYear}기</span>
                    </div>
                    <div className={styles.commentActions}>
                      <span className={styles.date}>{formatDate(comment.createdAt)}</span>
                    </div>
                  </div>
                  <div className={styles.commentInner}>
                    <div className={styles.commentContent}>{comment.content}</div>

                    {uid && comment.uid === uid && (
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDeleteComment(comment.commentId)}
                      >
                        <ICTrash viewBox="0 0 13 15" width="8" height="10" />
                      </button>
                    )}
                  </div>
                  {comment.fileName && (
                    <div className={styles.fileAttachmentWrapper}>
                      <div className={styles.fileAttachment}>
                        <span>{comment.fileName}</span>
                        <button
                          className={styles.downloadBtn}
                          onClick={() =>
                            comment.imageUrl &&
                            handleFileDownload(comment.imageUrl, comment.fileName!)
                          }
                        >
                          <ICDownload />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noComment}>댓글로 의견을 나눠주세요!</div>
        )}
        {selectedFile && (
          <div className={styles.fileNameWrapper}>
            <div className={styles.fileName}>
              {selectedFile.name}
              <button className={styles.deleteFileBtn} onClick={handleResetFile}>
                <ICDelete />
              </button>
            </div>
          </div>
        )}
        <div className={styles.inputArea}>
          <div className={styles.input}>
            <input
              placeholder="댓글을 입력해주세요."
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              style={{ border: "none", width: "100%", paddingRight: "4rem", outline: "none" }}
            />
            <div className={styles.buttonGroup}>
              <label className={styles.fileButton}>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <ICFile />
              </label>
            </div>
          </div>
          <button
            className={`${styles.submitBtn} ${isSubmitEnabled ? styles.active : ""}`}
            onClick={handleSubmit}
            disabled={!isSubmitEnabled}
            type="button"
          >
            <ICUpload />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
