"use client";

import React, { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import fireStore from "@/firebase/firestore";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import IcPlus from "@/assets/icon/plus_tag.svg";
import Ictrash from "@/assets/icon/trash.svg";
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

  const [draftTags, setDraftTags] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("draft-tags");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

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

  const handleTagClick = (tagName: string) => {
    // 에디터 태그
    setDraftTags(prev => {
      if (prev.includes(tagName)) return prev;
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

  const handleAddNewTag = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const isDuplicate = [...tagDataList, ...draftModalTags].some(tag => tag.name === trimmed);
    if (isDuplicate) {
      setInputValue("");
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

  const handleDeleteClick = async (tag: TagData) => {
    const isDraft = draftModalTags.some(t => t.id === tag.id);

    if (isDraft) {
      const updated = draftModalTags.filter(t => t.id !== tag.id);
      setDraftModalTags(updated);
      localStorage.setItem("draft-modal-tags", JSON.stringify(updated));
    } else {
      try {
        if (!uid) return;
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
    </div>
  );
}
