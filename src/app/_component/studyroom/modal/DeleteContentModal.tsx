import { SubContentType } from "@/types/studyRoomDetails/content";

import modalStyles from "@/app/_component/common/Modal.module.css";
import styles from "./DeleteContentModal.module.css";
import ICDelete from "@/assets/icon/delete.svg";
import { useRouter } from "next/navigation";

import { useNotices } from "@/hooks/useNotices";
import { useModalStore } from "@/store/useModalStore";
import { useStudyroomIdStore } from "@/store/useStudyroomIdStore";
import { useToastStore } from "@/store/useToastStore";
import { useArticlesStore } from "@/store/useArticlesStore";

type DeleteContentModalProps = {
  type: SubContentType;
  contentId: string;
  studyroomId?: string;
};

export default function DeleteContentModal({
  type,
  contentId,
  studyroomId: propStudyroomId
}: DeleteContentModalProps) {
  const storeStudyroomId = useStudyroomIdStore(state => state.studyroomId);
  const studyroomId = propStudyroomId ?? storeStudyroomId;

  const { deleteArticle } = useArticlesStore();
  const { deleteNotice } = useNotices(studyroomId ?? "");

  const { close } = useModalStore();
  const { showToast } = useToastStore();

  const router = useRouter();

  // 정의해둔 SubContentType을 통해 알맞은 delete 함수로 매핑해줌.
  const deleteMap: Record<SubContentType, (id: string) => void> = {
    Article: deleteArticle,
    Notice: deleteNotice
  };

  // 한번에 받아서 삭제 처리하는 공통 핸들러 함수
  const handleDelete = () => {
    deleteMap[type](contentId);
    showToast(`delete${type}`);
    close(); // 모달 닫기

    // Article일 때만 이동
    if (type === "Article" && studyroomId) {
      router.push(`/studyroom/${studyroomId}`);
    }
  };

  return (
    <div className={modalStyles.modal}>
      <div className={styles.modalHeader}>
        <p className={modalStyles.modalTitle}>
          {type === "Article" ? "해당 아티클을 삭제하시겠습니까?" : `${type} 삭제하기`}
        </p>
        <ICDelete onClick={close} style={{ cursor: "pointer" }} />
      </div>
      <div className={styles.modalBody}>
        <p>
          {type === "Article"
            ? "해당 아티클과 그에 달린 댓글도 함께 삭제됩니다."
            : `해당 ${type}을 삭제하시겠습니까?`}
        </p>
      </div>
      <div className={styles.modalFooter}>
        <button onClick={handleDelete} className={styles.deleteBtn}>
          삭제하기
        </button>
      </div>
    </div>
  );
}
