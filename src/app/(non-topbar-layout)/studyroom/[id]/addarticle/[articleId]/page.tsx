import React from "react";

import AddArticleMain from "@/app/_component/domain/addarticle/AddArticleMain";

type Params = {
  params: {
    id: string;
    articleId: string;
  };
};

export default function AddArticle({ params }: Params) {
  const { articleId } = params;
  const { id } = params;

  return <AddArticleMain articleId={articleId} studyroomId={id} />;
}
