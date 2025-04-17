import { Timestamp } from "firebase/firestore";

export type ArticleItemInput = {
  title: string;
  content: string;
  creatorId: string;
};

export type ArticleItem = {
  id: string;
  title: string;
  content: string;
  creatorId: string;
  createdAt: Timestamp;
};
