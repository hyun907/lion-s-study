import React, { useRef, useState, useEffect } from "react";

import IcDelete from "@/assets/icon/delete.svg";
import IcPlus from "@/assets/icon/plus_tag_add.svg";
import AddTagModal from "./Modal/AddTagModal";
import Toast from "../../common/Toast";
import { useToastStore } from "@/store/useToastStore";

import styles from "./AddTag.module.css";

const AddTag = ({ isReady }: { isReady: boolean }) => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [draftTags, setDraftTags] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const { showToast } = useToastStore();

  const handleOpenInfoModal = () => setShowInfoModal(true);
  const handleCloseInfoModal = () => setShowInfoModal(false);

  // 외부 클릭 시 모달 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowInfoModal(false);
      }
    };

    if (showInfoModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showInfoModal]);

  // 로컬스토리지 태그목록 가져오기
  useEffect(() => {
    const syncDraftTags = () => {
      const savedTags = localStorage.getItem("draft-tags");
      setDraftTags(savedTags ? JSON.parse(savedTags) : []);
    };

    syncDraftTags();
    window.addEventListener("storage", syncDraftTags);
    window.addEventListener("focus", syncDraftTags);

    return () => {
      window.removeEventListener("storage", syncDraftTags);
      window.removeEventListener("focus", syncDraftTags);
    };
  }, [isReady]);

  // shouldRefresh가 true일 때 태그 목록 다시 불러오기
  useEffect(() => {
    if (shouldRefresh) {
      const syncDraftTags = () => {
        const savedTags = localStorage.getItem("draft-tags");
        setDraftTags(savedTags ? JSON.parse(savedTags) : []);
      };
      syncDraftTags();
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);

  // 태그 삭제
  const handleDeleteTag = (tagToDelete: string) => {
    const updatedTags = draftTags.filter(tag => tag !== tagToDelete);
    localStorage.setItem("draft-tags", JSON.stringify(updatedTags));
    setDraftTags(updatedTags);
  };

  return (
    <>
      <div className={styles.container}>
        <p className={styles.title}>태그</p>

        <div className={styles.tagContainer}>
          <div className={styles.addTagBtn} onClick={handleOpenInfoModal}>
            <IcPlus viewBox="0 0 12 12" width="12" height="12" cursor="pointer" />
            <p>태그 추가</p>
          </div>
          {/* isReady일 때 렌더링 되도록 */}
          {isReady &&
            draftTags.map((tag, index) => (
              <div key={index} className={styles.tagBtn}>
                <div className={styles.tagColor}></div>
                <p>{tag}</p>
                <IcDelete
                  className={styles.deleteIcn}
                  viewBox="0 0 12 12"
                  width="8"
                  height="8"
                  cursor="pointer"
                  onClick={() => handleDeleteTag(tag)}
                />
              </div>
            ))}
        </div>

        {showInfoModal && (
          <div ref={modalRef} style={{ position: "absolute", zIndex: 1000 }}>
            <AddTagModal onClose={handleCloseInfoModal} setShouldRefresh={setShouldRefresh} />
          </div>
        )}
      </div>
    </>
  );
};

export default AddTag;
