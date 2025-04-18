import { SUB_CONTENT_TYPE } from "@/constants/StudyroomContentType";
import AddSubContentBtn from "./AddSubContentBtn";
import style from "./Article.module.css";
import commonStyles from "./CommonStyles.module.css";

import { useStudyroomIdStore } from "@/store/useStudyroomIdStore";
import { useArticles } from "@/hooks/useArticles";
import { useUserStore } from "@/store/useUserStore";

import { ArticleItem as ArticleItemProp } from "@/types/studyRoomDetails/article";
import { formatDate } from "@/utils/formatDate";
import { StudyroomItemButtonHandler } from "@/types/studyRoomDetails/itemClickHandler";
import { StudyroomItemGenericHandler } from "@/types/studyRoomDetails/itemClickHandler";
import ReadArticleModal from "../domain/readArticle/ReadArticleModal";
import AddArticleModal from "../domain/addarticle/AddArticleModal";
import { useModalStore } from "@/store/useModalStore";
import DeleteContentModal from "./modal/DeleteContentModal";
import { useToastStore } from "@/store/useToastStore";

interface ArticeItemInterface {
  articleProps: ArticleItemProp;
  handleDelete: StudyroomItemButtonHandler;
  handleUpdate: StudyroomItemButtonHandler;
  handleRead: StudyroomItemGenericHandler;
  isMyArticle: boolean;
}

const ArticleItem = ({
  articleProps,
  handleDelete,
  handleUpdate,
  handleRead,
  isMyArticle
}: ArticeItemInterface) => {
  return (
    <div
      className={commonStyles.contentSingleItem}
      id={style.articleSingleContainer}
      onClick={e => handleRead(e, articleProps.id)}
    >
      <div className={style.articleTitle}>{articleProps.title}</div>
      <div className={style.contentContainer}>
        <div className={style.content}>{articleProps.content}</div>
      </div>
      <div className={commonStyles.flexSpaceBetContainer}>
        {isMyArticle && (
          <div className={commonStyles.btnContainer}>
            <button
              className={commonStyles.noticeBtn}
              onClick={e => handleUpdate(e, articleProps.id)}
            >
              수정
            </button>
            <button
              className={commonStyles.noticeBtn}
              onClick={e => handleDelete(e, articleProps.id)}
            >
              삭제
            </button>
          </div>
        )}

        <div className={commonStyles.contentInfo} id={commonStyles.infoContent}>
          {articleProps.creatorYear}기 {articleProps.creatorName} |{" "}
          {formatDate(articleProps.createdAt)}
        </div>
      </div>
    </div>
  );
};

const Article = () => {
  const user = useUserStore();
  const id = useStudyroomIdStore(state => state.studyroomId);
  const { articles, deleteArticle } = useArticles(id ?? "");
  const open = useModalStore(state => state.open);

  if (!articles) return <div>로딩 중..</div>;

  const { showToast } = useToastStore();

  const handleDelete: StudyroomItemButtonHandler = (e, contentId) => {
    e.preventDefault();
    e.stopPropagation();

    open(<DeleteContentModal type={SUB_CONTENT_TYPE.ARTICLE} contentId={contentId} />);
    showToast("deleteArticle");
  };

  const handleUpdate: StudyroomItemButtonHandler = (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    open(<AddArticleModal articleId={id} />);
  };

  const handleRead: StudyroomItemGenericHandler = (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    open(<ReadArticleModal articleId={id} />);
  };

  return (
    <div className={commonStyles.contentContainer}>
      <div className={commonStyles.contentTitle}>
        <div>Article</div>
        <AddSubContentBtn type={SUB_CONTENT_TYPE.ARTICLE} />
      </div>
      <div className={commonStyles.contentItem} id={style.articleContainer}>
        {articles.length != 0 ? (
          articles.map((item, key) => (
            <ArticleItem
              key={key}
              articleProps={item}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              handleRead={handleRead}
              isMyArticle={item.creatorId == user.uid}
            ></ArticleItem>
          ))
        ) : (
          <div className={commonStyles.noItemContainer}>
            <div className={commonStyles.noItemText}>Article을 생성해주세요.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
