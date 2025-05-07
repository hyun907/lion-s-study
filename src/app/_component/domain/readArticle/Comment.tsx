"use client";

import { formatDate } from "@/utils/formatDate";
import { useState } from "react";

import Image from "next/image";
import styles from "./Comment.module.css";

import BabyLionImg from "@/assets/image/babyLion.png";
import BigLionImg from "@/assets/image/bigLion.png";
import ICUpload from "@/assets/icon/upload_arrow.svg";

// 목업 데이터 타입 정의
interface CommentData {
  commentId: string;
  content: string;
  author: string;
  creatorYear: string;
  createdAt: {};
}

// 목업 데이터
const mockComments: CommentData[] = [
  // {
  //   commentId: "1",
  //   content: "댓글 목업 데이터",
  //   author: "사용자1",
  //   creatorYear: "12",
  //   createdAt: {
  //     nanoseconds: 386000000,
  //     seconds: 1745086007
  //   }
  // },
  // {
  //   commentId: "2",
  //   content: "도움이 많이 되었습니다.",
  //   author: "사용자2",
  //   creatorYear: "13",
  //   createdAt: {
  //     nanoseconds: 386000000,
  //     seconds: 1745086007
  //   }
  // }
];

const Comment = () => {
  const [commentText, setCommentText] = useState("");

  return (
    <div className={styles.wrapper}>
      <div className={styles.commentBoxWrapper}>
        {mockComments.length > 0 ? (
          <div className={styles.commentsArea}>
            {mockComments.map(comment => (
              <div className={styles.commentWrapper} key={comment.commentId}>
                <Image
                  className={styles.profileImgContainer}
                  src={comment.creatorYear == "13" ? BabyLionImg : BigLionImg}
                  alt="프로필 사진"
                  unoptimized={true}
                />
                <div className={styles.comment}>
                  <div className={styles.commentHeader}>
                    <div className={styles.authorGroup}>
                      <span className={styles.author}>{comment.author}</span>
                      <span className={styles.creatorYear}>{comment.creatorYear}기</span>
                    </div>
                    <span className={styles.date}>{formatDate(comment.createdAt)}</span>
                  </div>
                  <div className={styles.commentContent}>{comment.content}</div>
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
          <button className={`${styles.submitBtn} ${commentText ? styles.active : ""}`}>
            <ICUpload />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
