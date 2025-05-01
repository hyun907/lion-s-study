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
import { useEffect, useRef, useState, useCallback } from "react";
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

  const { notices } = useNotices(id ?? "");

  const [visibleCount, setVisibleCount] = useState(5); // 처음 10개만 보여줌
  const observer = useRef<IntersectionObserver | null>(null);

  const lastNoticeRef = useCallback((node: HTMLDivElement | null) => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          setVisibleCount(prev => prev + 5); // 300ms 딜레이 후 5개 추가
        }, 300);
      }
    });

    if (node) observer.current.observe(node);
  }, []);

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
    <div className={commonStyles.contentContainer} id={commonStyles.bottomContentContainer}>
      <div className={commonStyles.contentTitle}>
        <div>Notice</div>
        <AddSubContentBtn type={SUB_CONTENT_TYPE.NOTICE} />
      </div>
      <div
        className={notices.length == 0 ? commonStyles.noItemWrapper : commonStyles.scrollContainer}
        id={style.noticeContainer}
      >
        {notices.length !== 0 ? (
          notices.slice(0, visibleCount).map((item, index) => {
            const isLastItem = index === visibleCount - 1;

            if (isLastItem) {
              return (
                <div ref={lastNoticeRef} key={item.id} id={style.lastNoticeContainer}>
                  <NoticeItem
                    noticeProps={item}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                    isMyNotice={item.creatorId == user.uid}
                  />
                </div>
              );
            } else {
              return (
                <NoticeItem
                  key={item.id}
                  noticeProps={item}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                  isMyNotice={item.creatorId == user.uid}
                />
              );
            }
          })
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
