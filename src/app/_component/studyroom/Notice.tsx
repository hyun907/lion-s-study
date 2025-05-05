import style from "./Notice.module.css";
import commonStyles from "./CommonStyles.module.css";
import AddSubContentBtn from "./AddSubContentBtn";
import { SUB_CONTENT_TYPE } from "@/constants/StudyroomContentType";

import { useStudyroomIdStore } from "@/store/useStudyroomIdStore";
import { useNotices } from "@/hooks/useNotices";
import { useUserStore } from "@/store/useUserStore";

import { NoticeItem as NoticeItemProp } from "@/types/studyRoomDetails/notice";
import { StudyroomItemGenericHandler } from "@/types/studyRoomDetails/itemClickHandler";
import { useRef, useState, useCallback } from "react";
import { useModalStore } from "@/store/useModalStore";
import DeleteContentModal from "./modal/DeleteContentModal";

import Ic_alarm from "../../../assets/icon/alarm.svg";
import Ic_trash from "../../../assets/icon/trash.svg";

interface NoticeItemInterface {
  noticeProps: NoticeItemProp;
  handleDelete: StudyroomItemGenericHandler;
  isMyNotice: boolean;
}

const NoticeItem = ({ noticeProps, handleDelete, isMyNotice }: NoticeItemInterface) => {
  return (
    <div className={style.noticeSingleContainer}>
      <div className={style.svgContainer}>
        <Ic_alarm />
      </div>
      <div className={style.textContainer} id={style.overflowEllipsis}>
        <div className={style.noticeTitle} id={style.overflowEllipsis}>
          {noticeProps.title}
        </div>
        <div className={style.noticeContent} id={style.overflowEllipsis}>
          {noticeProps.content}
        </div>
      </div>

      {isMyNotice && (
        <div
          className={style.svgContainer}
          id={style.clickable}
          onClick={e => handleDelete(e, noticeProps.id)}
        >
          <Ic_trash />
        </div>
      )}
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

  const handleDelete: StudyroomItemGenericHandler = (e, contentId) => {
    e.preventDefault();
    e.stopPropagation();

    open(<DeleteContentModal type={SUB_CONTENT_TYPE.NOTICE} contentId={contentId} />);
  };

  return (
    <div className={style.noticeContainer}>
      <div className={commonStyles.titleContainer}>
        <div className={commonStyles.titleBtnContainer}>
          <div className={commonStyles.contentTitle}>공지</div>
          <AddSubContentBtn type={SUB_CONTENT_TYPE.NOTICE} />
        </div>

        <div className={commonStyles.contentDescript}>공지나 알림을 등록해주세요</div>
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
