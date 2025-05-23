"use client";

import React, { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";

import fireStore from "@/firebase/firestore";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";

import IcPlus from "@/assets/icon/plus_tag.svg";
import Ictrash from "@/assets/icon/trash.svg";
import Toast from "@/app/_component/common/Toast";

import styles from "./AddTagModal.module.css";

interface Props {
  onClose: () => void;
  setShouldRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TagData {
  id: string;
  name: string;
  color: string;
}

export default function AddTagModal({ onClose, setShouldRefresh }: Props) {
  const { tags, uid } = useUserStore();
  const [tagDataList, setTagDataList] = useState<TagData[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [toastType, setToastType] = useState<string | null>(null);

  const [draftTags, setDraftTags] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("draft-tags");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // commonTags 페치
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagPromises = tags.map(async tagId => {
          const tagRef = doc(fireStore, "commonTags", tagId);
          const tagSnap = await getDoc(tagRef);
          if (tagSnap.exists()) {
            const data = tagSnap.data();
            return {
              id: tagId,
              name: data.name,
              color: data.color
            } as TagData;
          } else {
            console.warn(`Tag ${tagId} not found.`);
            return null;
          }
        });

        const tagResults = await Promise.all(tagPromises);
        const filteredTags = tagResults.filter((tag): tag is TagData => tag !== null);
        setTagDataList(filteredTags);
      } catch (error) {
        console.error("태그 가져오기 실패:", error);
      }
    };

    fetchTags();
  }, [tags]);

  // 에디터 태그 생성하기
  const handleTagClick = (tagName: string) => {
    if (draftTags.includes(tagName)) return;

    // 최대 6개
    if (draftTags.length >= 6) {
      setToastType("selectTag");
      return;
    }

    setDraftTags(prev => {
      const updated = [...prev, tagName];
      localStorage.setItem("draft-tags", JSON.stringify(updated));
      return updated;
    });
  };

  const [draftModalTags, setDraftModalTags] = useState<TagData[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("draft-modal-tags");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const combinedTagList = [...tagDataList, ...draftModalTags];

  // 모달 태그 생성하기
  const handleAddNewTag = () => {
    const trimmed = inputValue.trim();
    // 태그명 비어있을 경우
    if (!trimmed) {
      setToastType("noTagName");
      return;
    }

    // 중복 처리
    const isDuplicate = [...tagDataList, ...draftModalTags].some(tag => tag.name === trimmed);
    if (isDuplicate) {
      setInputValue("");
      return;
    }
    // 최대 12개
    if (combinedTagList.length >= 12) {
      setToastType("addTag");
      return;
    }
    const newTag: TagData = {
      id: `new-${Date.now()}`,
      name: trimmed,
      color: "#BDBDBD"
    };

    // 모달 생성태그
    const updatedModalTags = [...draftModalTags, newTag];
    setDraftModalTags(updatedModalTags);
    localStorage.setItem("draft-modal-tags", JSON.stringify(updatedModalTags));

    setInputValue("");
  };

  useEffect(() => {
    setShouldRefresh(prev => !prev);
  }, [draftTags]);

  // 태그 삭제
  const handleDeleteClick = async (tag: TagData) => {
    const isDraft = draftModalTags.some(t => t.id === tag.id);
    // localStorage 모달태그에 저장
    if (isDraft) {
      const updated = draftModalTags.filter(t => t.id !== tag.id);
      setDraftModalTags(updated);
      localStorage.setItem("draft-modal-tags", JSON.stringify(updated));
    } else {
      try {
        if (!uid) return;
        // 모달 생성태그가 아니라면 firebase에서 삭제
        await updateDoc(doc(fireStore, "users", uid), {
          tags: arrayRemove(tag.id)
        });
        setTagDataList(prev => prev.filter(t => t.id !== tag.id));
      } catch (err) {
        console.error("Firestore 태그 삭제 실패:", err);
      }
    }

    setDraftTags(prev => {
      const updated = prev.filter(name => name !== tag.name);
      localStorage.setItem("draft-tags", JSON.stringify(updated));
      setShouldRefresh(true);
      return updated;
    });
  };

  // toastType초기화
  useEffect(() => {
    if (toastType) {
      const timer = setTimeout(() => {
        setToastType(null);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [toastType]);

  return (
    <div className={styles.modal}>
      {combinedTagList.length > 0 && (
        <div className={styles.contentsContainer}>
          <p>태그 선택</p>
          <div className={styles.tagsContainer}>
            {combinedTagList.map(tag => (
              <div
                key={tag.id}
                className={styles.tagContainer}
                onClick={() => handleTagClick(tag.name)}
              >
                <div className={styles.tagBtn}>
                  <div className={styles.tagColor} style={{ backgroundColor: tag.color }}></div>
                  <p>{tag.name}</p>
                </div>
                <Ictrash
                  className={styles.icTrash}
                  viewBox="0 0 20 20"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleDeleteClick(tag);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.contentsContainer}>
        <p>태그 생성</p>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="태그명을 입력해주세요."
            className={styles.inputTag}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <div className={styles.plusBtn} onClick={handleAddNewTag}>
            <IcPlus className={styles.icPlus} viewBox="0 0 8 8" />
          </div>
        </div>
      </div>
      {toastType && <Toast toastType={toastType} />}
    </div>
  );
}
