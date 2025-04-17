import { Timestamp } from "firebase/firestore";

export type NoticeInputItem = {
  title: string;
  content: string;
  creatorId: string;
};

export type NoticeItem = {
  id: string;
  title: string;
  content: string;
  creatorId: string;
  createdAt: Timestamp;
};
