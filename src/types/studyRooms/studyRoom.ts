export interface StudyRoom {
  id: string;
  createdAt: any;
  creatorName: string;
  creatorYear: number;
  title: string;
  updatedAt: any;
  imageUrl: string | null;
}

export interface StudyBtnProps {
  id: string;
  title: string;
  creatorName: string;
  creatorYear: number;
  updatedAt: string;
  imageUrl: string | null;
}
