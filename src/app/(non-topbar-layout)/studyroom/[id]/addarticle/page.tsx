import React from "react";

import AddArticleMain from "@/app/_component/domain/addarticle/AddArticleMain";

type Params = {
  params: {
    id: string;
  };
};

export default function AddArticle({ params }: Params) {
  const { id } = params;

  return <AddArticleMain studyroomId={id} />;
}
