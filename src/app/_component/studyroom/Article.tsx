import { SUB_CONTENT_TYPE } from "@/constants/StudyroomContentType";
import AddSubContentBtn from "./AddSubContentBtn";
import style from "./Article.module.css";
import commonStyles from "./CommonStyles.module.css";

const ArticleItem = () => {
  return (
    <div className={commonStyles.contentSingleItem} id={style.articleSingleContainer}>
      <div className={style.articleTitle}>디자인 시스템, 왜 필요할까?</div>
      <div className={style.contentContainer}>
        <div className={style.content}>
          'Design System'이라는 책에 따르면 디자인 시스템은 '서비스의 목적에 맞도록 일관되게 구성한
          일련의 패턴과 공유된 규칙 언어'라고 합니다. 사람들이 디자인을 시작할 때 공통으로 사용하는
          컬러, 폰트, 레이아웃, UI 구성 요소 등 일관된 집합을 두고 이를 어떻게 구성하는지 체계가
          이루어져야 디자인 시스템이라고 할 수 있습니다. 왜 회사들은 디자인 시스템을 만들까요?
        </div>
        <div className={commonStyles.contentInfo} id={style.articleContent}>
          12기 박지효 | 25.02.11
        </div>
      </div>
    </div>
  );
};

const Article = () => {
  return (
    <div className={commonStyles.contentContainer}>
      <div className={commonStyles.contentTitle}>
        <div>Article</div>
        <AddSubContentBtn type={SUB_CONTENT_TYPE.ARTICLE} />
      </div>
      <div className={commonStyles.contentItem} id={style.articleContainer}>
        <ArticleItem></ArticleItem>
      </div>
    </div>
  );
};

export default Article;
