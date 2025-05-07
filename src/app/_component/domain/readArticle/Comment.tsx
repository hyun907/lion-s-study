"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc
} from "firebase/firestore";
import fireStore from "@/firebase/firestore";

import { formatDate } from "@/utils/formatDate";
import { useUserStore } from "@/store/useUserStore";
import { useToastStore } from "@/store/useToastStore";

import Image from "next/image";
import styles from "./Comment.module.css";

import BabyLionImg from "@/assets/image/babyLion.png";
import BigLionImg from "@/assets/image/bigLion.png";
import ICUpload from "@/assets/icon/upload_arrow.svg";
import ICTrash from "@/assets/icon/trash.svg";

interface CommentData {
  commentId: string;
  content: string;
  author: string;
  creatorYear: string;
  createdAt: {};
  uid: string;
}

interface Props {
  articleId: string;
  studyroomId: string;
}

const Comment = ({ articleId, studyroomId }: Props) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<CommentData[]>([]);
  const { name, year, uid } = useUserStore();
  const showToast = useToastStore(state => state.showToast);

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
        uid: doc.data().uid
      }));
      setComments(result);
    });

    return () => unsub();
  }, [articleId, studyroomId]);

  const handleSubmit = async () => {
    if (!commentText.trim()) {
      return;
    }

    if (!name || !year || !uid) {
      showToast("login_common");
      return;
    }

    try {
      const commentsRef = collection(
        fireStore,
        `studyRooms/${studyroomId}/articles/${articleId}/comments`
      );
      await addDoc(commentsRef, {
        content: commentText,
        author: name,
        creatorYear: year.toString(),
        createdAt: serverTimestamp(),
        uid: uid
      });
      setCommentText("");
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.commentBoxWrapper}>
        {comments.length > 0 ? (
          <div className={styles.commentsArea}>
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
                  <div className={styles.commentWrapper}>
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
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noComment}>댓글로 의견을 나눠주세요!</div>
        )}
        <div className={styles.inputArea}>
          <input
            className={styles.input}
            placeholder="댓글을 입력해주세요."
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
          />
          <button
            className={`${styles.submitBtn} ${commentText ? styles.active : ""}`}
            onClick={handleSubmit}
          >
            <ICUpload />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
