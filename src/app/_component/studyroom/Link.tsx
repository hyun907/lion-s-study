import style from "./Link.module.css";
import commonStyles from "./CommonStyles.module.css";
import Ic_Link from "../../../assets/icon/link.svg";
import Ic_Delete from "../../../assets/icon/delete_gray.svg";

const LinkItem = () => {
  return (
    <span className={commonStyles.contentSingleItem} id={style.linkSingleContainer}>
      <a href="https://www.likelionssu.kr/" className={style.linkClickContainer}>
        <Ic_Link />
        <div>팀 노션 공간</div>
      </a>
      <div className={style.deleteBtn}>
        <Ic_Delete />
      </div>
    </span>
  );
};

const Link = () => {
  return (
    <div className={commonStyles.contentContainer}>
      <div className={commonStyles.contentTitle}>
        <div>Link</div>
        <button className={commonStyles.contentAddBtn}>생성하기</button>
      </div>
      <div id={style.linkContainer}>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
        <LinkItem></LinkItem>
      </div>
    </div>
  );
};

export default Link;
