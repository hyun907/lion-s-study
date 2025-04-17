import style from "./Link.module.css";
import commonStyles from "./CommonStyles.module.css";
import Ic_Link from "../../../assets/icon/link.svg";
import Ic_Delete from "../../../assets/icon/delete.svg";
import AddSubContentBtn from "./AddSubContentBtn";
import { SUB_CONTENT_TYPE } from "@/constants/StudyroomContentType";
import { useLinks } from "@/hooks/useLinks";
import { useStudyroomIdStore } from "@/store/useStudyroomIdStore";

const LinkItem = () => {
  return (
    <span className={commonStyles.contentSingleItem} id={style.linkSingleContainer}>
      <a href="https://www.likelionssu.kr/" className={style.linkClickContainer}>
        <Ic_Link />
        <div>팀 노션 공간</div>
      </a>
      <div className={style.deleteBtn}>
        <Ic_Delete className={style.deleteIcn} viewBox="0 0 12 12" width="8" height="8" />
      </div>
    </span>
  );
};

const Link = () => {
  const id = useStudyroomIdStore(state => state.studyroomId);
  const { links, createLink, updateLink, deleteLink } = useLinks(id ?? "");

  if (!links) return <div>로딩 중..</div>;
  return (
    <div className={commonStyles.contentContainer}>
      <div className={commonStyles.contentTitle}>
        <div>Link</div>
        <AddSubContentBtn type={SUB_CONTENT_TYPE.LINK} />
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
