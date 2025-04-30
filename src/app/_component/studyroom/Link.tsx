import style from "./Link.module.css";
import commonStyles from "./CommonStyles.module.css";
import Ic_Link from "../../../assets/icon/link.svg";
import Ic_Delete from "../../../assets/icon/delete.svg";
import AddSubContentBtn from "./AddSubContentBtn";
import { SUB_CONTENT_TYPE } from "@/constants/StudyroomContentType";
import { useLinks } from "@/hooks/useLinks";
import { useStudyroomIdStore } from "@/store/useStudyroomIdStore";
import {
  StudyroomItemButtonHandler,
  StudyroomItemGenericHandler
} from "@/types/studyRoomDetails/itemClickHandler";
import { useModalStore } from "@/store/useModalStore";
import DeleteContentModal from "./modal/DeleteContentModal";

interface LinkItemInterface {
  id: string;
  title: string;
  url: string;
  handleDelete: StudyroomItemButtonHandler;
  handleClickLink: StudyroomItemGenericHandler;
}

const LinkItem = ({ id, title, url, handleDelete, handleClickLink }: LinkItemInterface) => {
  return (
    <span
      onClick={e => handleClickLink(e, url)}
      className={commonStyles.contentSingleItem}
      id={style.linkSingleContainer}
    >
      <a href={url} className={style.linkClickContainer}>
        <Ic_Link />
        <div>{title}</div>
      </a>
      <button className={style.deleteBtn} onClick={e => handleDelete(e, id)}>
        <Ic_Delete className={style.deleteIcn} viewBox="0 0 12 12" width="8" height="8" />
      </button>
    </span>
  );
};

const Link = () => {
  const id = useStudyroomIdStore(state => state.studyroomId);

  const { open } = useModalStore();
  const { links } = useLinks(id ?? "");

  const handleDelete: StudyroomItemButtonHandler = (e, contentId) => {
    e.preventDefault();
    e.stopPropagation();

    open(<DeleteContentModal type={SUB_CONTENT_TYPE.LINK} contentId={contentId} />);
  };

  const handleClickLink: StudyroomItemGenericHandler = (e, url) => {
    e.preventDefault();
    e.stopPropagation();

    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!links) return <div>로딩 중..</div>;
  return (
    <div className={commonStyles.contentContainer} id={commonStyles.topContentContainer}>
      <div className={commonStyles.contentTitle}>
        <div>Link</div>
        <AddSubContentBtn type={SUB_CONTENT_TYPE.LINK} />
      </div>
      <div id={style.linkContainer}>
        {links.length != 0 ? (
          links.map((item, key) => (
            <LinkItem
              key={key}
              handleDelete={handleDelete}
              handleClickLink={handleClickLink}
              id={item.id}
              title={item.title}
              url={item.url}
            />
          ))
        ) : (
          <div className={commonStyles.noItemContainer}>
            <div className={commonStyles.noItemText}>Link를 생성해주세요.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Link;
