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
import { useRef, useCallback, useState } from "react";

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
  const { articles } = useArticles(id ?? "");
  const open = useModalStore(state => state.open);

  const [visibleCount, setVisibleCount] = useState(5);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastArticleRef = useCallback((node: HTMLDivElement | null) => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        // 가짜 로딩 텀
        setTimeout(() => {
          setVisibleCount(prev => prev + 5);
        }, 300);
      }
    });

    if (node) observer.current.observe(node);
  }, []);

  if (!articles) return <div>로딩 중...</div>;

  const handleDelete: StudyroomItemButtonHandler = (e, contentId) => {
    e.preventDefault();
    e.stopPropagation();
    open(<DeleteContentModal type={SUB_CONTENT_TYPE.ARTICLE} contentId={contentId} />);
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
        {articles.length !== 0 ? (
          articles.slice(0, visibleCount).map((item, index) => {
            const isLastItem = index === visibleCount - 1;

            if (isLastItem) {
              return (
                <div ref={lastArticleRef} key={item.id} id={style.lastArticleContainer}>
                  <ArticleItem
                    articleProps={item}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                    handleRead={handleRead}
                    isMyArticle={item.creatorId === user.uid}
                  />
                </div>
              );
            } else {
              return (
                <ArticleItem
                  key={item.id}
                  articleProps={item}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                  handleRead={handleRead}
                  isMyArticle={item.creatorId === user.uid}
                />
              );
            }
          })
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
