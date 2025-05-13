// commonTag와 매치됐을 때의 완전한 형태의 Tag
export type Tag = {
  id: string;
  name: string;
  color: string;
};

export type ArticleItemInput = {
  title: string;
  content: string;
  creatorId: string;
  creatorName: string;
  creatorYear: number;
};

export type ArticleItem = {
  id: string;
  title: string;
  content: string;
  preview: string;
  creatorId: string;
  createdAt: any;
  creatorName: string;
  creatorYear: number;
  tagIds: string[];
  imgUrls: string[];
};
