import style from "./Notice.module.css";
import commonStyles from "./CommonStyles.module.css";

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
  return (
    <div className={commonStyles.contentContainer}>
      <div className={commonStyles.contentTitle}>
        <div>Notice</div>
        <button className={commonStyles.contentAddBtn}>생성하기</button>
      </div>
      <div className={commonStyles.contentItem} id={style.noticeContainer}>
        <NoticeItem></NoticeItem>
        <NoticeItem></NoticeItem>
        <NoticeItem></NoticeItem>
        <NoticeItem></NoticeItem>
        <NoticeItem></NoticeItem>
      </div>
    </div>
  );
};

export default Notice;
