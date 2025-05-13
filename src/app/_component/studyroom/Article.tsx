import { SUB_CONTENT_TYPE } from "@/constants/StudyroomContentType";
import AddSubContentBtn from "./AddSubContentBtn";
import style from "./Article.module.css";
import commonStyles from "./CommonStyles.module.css";
import Image from "next/image";

import { useArticlesStore } from "@/store/useArticlesStore";
import { useStudyroomIdStore } from "@/store/useStudyroomIdStore";
import { useUserStore } from "@/store/useUserStore";
import { useModalStore } from "@/store/useModalStore";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/formatDate";

import { ArticleItem as ArticleItemProp, Tag } from "@/types/studyRoomDetails/article";
import { StudyroomItemButtonHandler } from "@/types/studyRoomDetails/itemClickHandler";
import { StudyroomItemGenericHandler } from "@/types/studyRoomDetails/itemClickHandler";

import DeleteContentModal from "./modal/DeleteContentModal";
import TagItem from "../common/TagItem";
import { useEffect, useState } from "react";

// 예시 이미지 임시 사용
import ExImg from "../../../assets/image/default_thumbnail.png";

import BabyLionImg from "../../../assets/image/babyLion.png";
import BigLionImg from "../../../assets/image/bigLion.png";
import Loading from "@/app/loading";
import { useTagHandler } from "@/hooks/useTagHandler";

interface ArticeItemInterface {
  articleProps: ArticleItemProp;
  handleDelete: StudyroomItemButtonHandler;
  handleUpdate: StudyroomItemButtonHandler;
  handleRead: StudyroomItemGenericHandler;
  isMyArticle: boolean;
  commonTags: Tag[];
}

const ArticleItem = ({ articleProps, handleRead, commonTags }: ArticeItemInterface) => {
  const tagMap = new Map(commonTags.map(tag => [tag.id, tag]));
  const imageUrl =
    articleProps.imgUrls && articleProps.imgUrls.length > 0 ? articleProps.imgUrls[0] : ExImg;

  return (
    <div className={style.articleSingleContainer} onClick={e => handleRead(e, articleProps.id)}>
      <div className={style.imgWrapper}>
        <Image
          src={imageUrl}
          alt="썸네일 이미지"
          style={{ objectFit: "cover", borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
          fill
        />
      </div>
      <div className={style.mainContentWrapper}>
        <div className={style.topContainer}>
          {/* 날짜 & 프로필 */}
          <div className={style.titleDateWrapper}>
            {/* space-between */}
            <div className={style.articleTitle} id={commonStyles.overflowEllipsisLine1}>
              {articleProps.title}
            </div>
            <div className={commonStyles.contentInfo} id={commonStyles.infoContent}>
              {formatDate(articleProps.createdAt)}
            </div>
          </div>
          {/* 프로필 정보 */}
          <div className={commonStyles.subContainer} id={style.profileContainer}>
            <Image
              className={commonStyles.profileImgContainer}
              src={articleProps.creatorYear == 13 ? BabyLionImg : BigLionImg}
              alt="프로필 사진"
              unoptimized={true}
              style={{ width: 28, height: 28 }}
            ></Image>
            <div className={commonStyles.subTextContainer} id={style.creatorInfoContainer}>
              <div className={commonStyles.nameContainer} id={style.fontSize12}>
                {articleProps.creatorName}
              </div>
              <span id={style.fontSize08}>{articleProps.creatorYear}기</span>
            </div>
          </div>
        </div>

        <div className={style.bottomContainer}>
          <div className={style.tagContainer}>
            {articleProps.tagIds &&
              articleProps.tagIds.map(tagId => {
                const matchedTag = tagMap.get(tagId);

                return (
                  matchedTag && (
                    <TagItem key={matchedTag.id} name={matchedTag.name} color={matchedTag.color} />
                  )
                );
              })}
          </div>
          <div className={style.contentContainer}>
            <div className={style.content} id={commonStyles.overflowEllipsisLine3}>
              {articleProps.preview}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Article = () => {
  const router = useRouter();

  const user = useUserStore();
  const id = useStudyroomIdStore(state => state.studyroomId);
  const { articles } = useArticlesStore();
  const open = useModalStore(state => state.open);
  const { fetchAllCommonTags } = useTagHandler();

  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [commonTags, setCommonTags] = useState<Tag[]>([]);

  if (!articles) return <Loading />;

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const paginatedArticles = articles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDelete: StudyroomItemButtonHandler = (e, contentId) => {
    e.preventDefault();
    e.stopPropagation();
    open(<DeleteContentModal type={SUB_CONTENT_TYPE.ARTICLE} contentId={contentId} />);
  };

  const handleUpdate: StudyroomItemButtonHandler = (e, articleId) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/studyroom/${id}/addarticle/${articleId}`);
  };

  const handleRead: StudyroomItemGenericHandler = (e, articleId) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/studyroom/${id}/article/${articleId}`);
  };

  useEffect(() => {
    const loadTags = async () => {
      const fetchedTags = await fetchAllCommonTags();
      setCommonTags(fetchedTags);
    };

    loadTags();
  }, []);

  return (
    <div className={style.articleContainer}>
      <div className={commonStyles.titleContainer}>
        <div className={commonStyles.titleBtnContainer}>
          <div className={commonStyles.contentTitle}>아티클</div>
          <AddSubContentBtn type={SUB_CONTENT_TYPE.ARTICLE} />
        </div>
        <div className={commonStyles.contentDescript}>
          스터디 자료, 회의 기록, 인사이트 공유 등 성장의 발자취를 남기세요
        </div>
      </div>

      <div className={articles.length != 0 ? style.articlesContainer : commonStyles.noItemWrapper}>
        {articles.length !== 0 ? (
          paginatedArticles.map(item => (
            <ArticleItem
              key={item.id}
              articleProps={item}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              handleRead={handleRead}
              isMyArticle={item.creatorId === user.uid}
              commonTags={commonTags}
            />
          ))
        ) : (
          <div className={commonStyles.noItemContainer}>
            <div className={commonStyles.noItemText}>Article을 생성해주세요.</div>
          </div>
        )}
      </div>

      {articles.length > ITEMS_PER_PAGE && (
        <div className={commonStyles.footerContainer}>
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
        </div>
      )}
    </div>
  );
};

export default Article;
