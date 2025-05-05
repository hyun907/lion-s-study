import React from "react";

import ArticleMain from "@/app/_component/domain/readArticle/ArticleMain";

type Params = {
  params: {
    id: string;
  };
};

export default function Article({ params }: Params) {
  const { id } = params;

  return (
    <>
      <ArticleMain articleId={id} />
    </>
  );
}
