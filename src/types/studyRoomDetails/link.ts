import { Timestamp } from "firebase/firestore";

export type LinkItemInput = {
  title: string;
  url: string;
};

export type LinkItem = {
  id: string;
  title: string;
  url: string;
  createdAt: Timestamp;
};
