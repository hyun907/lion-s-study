import { ReactNode } from "react";
import styles from "@/app/_component/domain/readArticle/Comment.module.css";

// http:// 또는 https:// 로 시작하는 문자열을 잘라 a 태그로 바꿔주는 함수
export const convertUrlsToLinks = (text: string): ReactNode[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          onClick={e => e.stopPropagation()}
        >
          {part}
        </a>
      );
    }
    return part;
  });
};
