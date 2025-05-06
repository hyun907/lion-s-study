import React from "react";

import ArticleMain from "@/app/_component/domain/readArticle/ArticleMain";

type Params = {
  params: {
    id: string;
    articleId: string;
  };
};

export default function Article({ params }: Params) {
  const { articleId } = params;
  const { id } = params;

  return <ArticleMain articleId={articleId} studyroomId={id} />;
}
