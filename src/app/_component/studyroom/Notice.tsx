import style from "./Notice.module.css";
import commonStyles from "./CommonStyles.module.css";
import AddSubContentBtn from "./AddSubContentBtn";
import { SUB_CONTENT_TYPE } from "@/constants/StudyroomContentType";
import { useStudyRoomStore } from "@/store/studyRoomStore";
import { useStudyroomDetail } from "@/hooks/useStudyroomDetail";
import { useStudyroomIdStore } from "@/store/useStudyroomIdStore";
import { useNotices } from "@/hooks/useNotices";

const NoticeItem = () => {
  return (
    <div className={commonStyles.contentSingleItem} id={style.noticeSingleContainer}>
      <div className={style.noticeTitle}>2.18까지 디자인 과제 제출하기</div>
      <div className={style.flexContainer}>
        <div className={style.btnContainer}>
          <button className={style.noticeBtn}>수정</button>
          <button className={style.noticeBtn}>삭제</button>
        </div>
        <div className={commonStyles.contentInfo}>12기 박지효 | 25.02.11</div>
      </div>
    </div>
  );
};

const Notice = () => {
  const id = useStudyroomIdStore(state => state.studyroomId);
  const { notices, createNotice, updateNotice, deleteNotice } = useNotices(id ?? "");

  if (!notices) return <div>로딩 중..</div>;
  return (
    <div className={commonStyles.contentContainer}>
      <div className={commonStyles.contentTitle}>
        <div>Notice</div>
        <AddSubContentBtn type={SUB_CONTENT_TYPE.NOTICE} />
      </div>
      <div className={commonStyles.contentItem} id={style.noticeContainer}>
        <NoticeItem></NoticeItem>
        <NoticeItem></NoticeItem>
      </div>
    </div>
  );
};

export default Notice;
