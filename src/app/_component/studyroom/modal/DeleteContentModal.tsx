import { SubContentType } from "@/types/studyRoomDetails/content";

import modalStyles from "@/app/_component/common/Modal.module.css";
import styles from "./DeleteContentModal.module.css";
import ICDelete from "@/assets/icon/delete.svg";

import { useArticles } from "@/hooks/useArticles";
import { useLinks } from "@/hooks/useLinks";
import { useNotices } from "@/hooks/useNotices";
import { useModalStore } from "@/store/useModalStore";
import { useStudyroomIdStore } from "@/store/useStudyroomIdStore";

type DeleteContentModalProps = {
  type: SubContentType;
  contentId: string;
};

export default function DeleteContentModal({ type, contentId }: DeleteContentModalProps) {
  const studyroomId = useStudyroomIdStore(state => state.studyroomId);

  console.log(type);
  const { deleteArticle } = useArticles(studyroomId ?? "");
  const { deleteNotice } = useNotices(studyroomId ?? "");
  const { deleteLink } = useLinks(studyroomId ?? "");

  const { close } = useModalStore();

  // 정의해둔 SubContentType을 통해 알맞은 delete 함수로 매핑해줌.
  const deleteMap: Record<SubContentType, (id: string) => void> = {
    Article: deleteArticle,
    Notice: deleteNotice,
    Link: deleteLink
  };

  // 한번에 받아서 삭제 처리하는 공통 핸들러 함수
  const handleDelete = () => {
    deleteMap[type](contentId);
    alert("성공적으로 삭제되었습니다!");
    close(); // 모달 닫기
  };

  return (
    <div className={modalStyles.modal}>
      <div className={styles.modalHeader}>
        <p className={modalStyles.modalTitle}>{type} 삭제하기</p>
        <ICDelete onClick={close} style={{ cursor: "pointer" }} />
      </div>
      <div className={styles.modalBody}>
        <p>해당 {type}을 삭제하시겠습니까?</p>
      </div>
      <div className={styles.modalFooter}>
        <button onClick={handleDelete} className={styles.deleteBtn}>
          삭제하기
        </button>
      </div>
    </div>
  );
}
