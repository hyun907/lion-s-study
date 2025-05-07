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
import Ic_bottom from "../../../assets/icon/arrow_bottom.svg";
import Ic_top from "../../../assets/icon/arrow_top.svg";
import Loading from "@/app/loading";

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
      <div className={style.textContainer}>
        <div className={style.noticeTitle} id={commonStyles.overflowEllipsisLine2}>
          {noticeProps.title}
        </div>
        <div className={style.noticeContent} id={commonStyles.overflowEllipsisLine2}>
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

  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!notices) return <Loading />;

  const totalPages = Math.ceil(notices.length / ITEMS_PER_PAGE);
  const paginatedNotices = notices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete: StudyroomItemGenericHandler = (e, contentId) => {
    e.preventDefault();
    e.stopPropagation();

    open(<DeleteContentModal type={SUB_CONTENT_TYPE.NOTICE} contentId={contentId} />);
  };

  const toggleExpanded = () => {
    setIsExpanded(prev => !prev);
    setCurrentPage(1); // 페이지네이션 리셋
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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

      <div className={notices.length === 0 ? commonStyles.noItemWrapper : style.noticesContainer}>
        {(isExpanded ? paginatedNotices : notices.slice(0, 1)).map(item => (
          <NoticeItem
            key={item.id}
            noticeProps={item}
            handleDelete={handleDelete}
            isMyNotice={item.creatorId === user.uid}
          />
        ))}

        {notices.length === 0 && (
          <div className={commonStyles.noItemContainer}>
            <div className={commonStyles.noItemText}>Notice를 생성해주세요.</div>
          </div>
        )}
      </div>

      {notices.length > 1 && (
        <div className={commonStyles.footerContainer}>
          {!isExpanded ? (
            <div className={style.toggleButton} id={style.clickable} onClick={toggleExpanded}>
              <Ic_bottom />
            </div>
          ) : (
            <>
              <div className={commonStyles.paginationContainer}>
                {[...Array(totalPages)].map((_, index) => {
                  const pageNum = index + 1;
                  return (
                    <button
                      key={pageNum}
                      className={`${commonStyles.pageButton} ${
                        pageNum === currentPage ? commonStyles.activePage : ""
                      }`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <div className={style.toggleButton} id={style.clickable} onClick={toggleExpanded}>
                <Ic_top />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Notice;
