import style from "./Notice.module.css";
import commonStyles from "./CommonStyles.module.css";
import AddSubContentBtn from "./AddSubContentBtn";
import { SUB_CONTENT_TYPE } from "@/constants/StudyroomContentType";

import { useStudyroomIdStore } from "@/store/useStudyroomIdStore";
import { useNotices } from "@/hooks/useNotices";
import { useUserStore } from "@/store/useUserStore";

import { NoticeItem as NoticeItemProp } from "@/types/studyRoomDetails/notice";
import { formatDate } from "@/utils/formatDate";
import { StudyroomItemButtonHandler } from "@/types/studyRoomDetails/itemClickHandler";
import { useState } from "react";
import AddNoticeModalContent from "./modal/AddNoticeContentModal";
import { useModalStore } from "@/store/useModalStore";
import DeleteContentModal from "./modal/DeleteContentModal";

interface NoticeItemInterface {
  noticeProps: NoticeItemProp;
  handleDelete: StudyroomItemButtonHandler;
  handleUpdate: StudyroomItemButtonHandler;
  isMyNotice: boolean;
}

const NoticeItem = ({
  noticeProps,
  handleDelete,
  handleUpdate,
  isMyNotice
}: NoticeItemInterface) => {
  return (
    <div className={commonStyles.contentSingleItem} id={style.noticeSingleContainer}>
      <div className={style.noticeTitle}>{noticeProps.content}</div>
      <div className={commonStyles.flexSpaceBetContainer}>
        {isMyNotice && (
          <div className={commonStyles.btnContainer}>
            <button
              className={commonStyles.noticeBtn}
              onClick={e => handleUpdate(e, noticeProps.id)}
            >
              수정
            </button>
            <button
              className={commonStyles.noticeBtn}
              onClick={e => handleDelete(e, noticeProps.id)}
            >
              삭제
            </button>
          </div>
        )}
        <div className={commonStyles.contentInfo} id={commonStyles.infoContent}>
          {noticeProps.creatorYear}기 {noticeProps.creatorName} |{" "}
          {formatDate(noticeProps.createdAt)}
        </div>
      </div>
    </div>
  );
};

const Notice = () => {
  const open = useModalStore(state => state.open);
  const user = useUserStore();
  const id = useStudyroomIdStore(state => state.studyroomId);

  const { notices, createNotice, updateNotice, deleteNotice } = useNotices(id ?? "");

  if (!notices) return <div>로딩 중..</div>;

  const handleUpdate: StudyroomItemButtonHandler = (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    const target = notices.find(n => n.id === id);
    if (!target) return;

    open(<AddNoticeModalContent noticeId={target.id} initialContent={target.content} />);
  };

  const handleDelete: StudyroomItemButtonHandler = (e, contentId) => {
    e.preventDefault();
    e.stopPropagation();

    open(<DeleteContentModal type={SUB_CONTENT_TYPE.NOTICE} contentId={contentId} />);
  };

  return (
    <div className={commonStyles.contentContainer}>
      <div className={commonStyles.contentTitle}>
        <div>Notice</div>
        <AddSubContentBtn type={SUB_CONTENT_TYPE.NOTICE} />
      </div>
      <div className={commonStyles.contentItem} id={style.noticeContainer}>
        {notices.length != 0 ? (
          notices.map((item, key) => (
            <NoticeItem
              key={key}
              noticeProps={item}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              isMyNotice={item.creatorId == user.uid}
            />
          ))
        ) : (
          <div className={commonStyles.noItemContainer}>
            <div className={commonStyles.noItemText}>Notice를 생성해주세요.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notice;
