export interface StudyRoom {
  id: string;
  createdAt: any;
  creatorName: string;
  creatorYear: number;
  title: string;
  updatedAt: any;
}

export interface StudyBtnProps {
  title: string;
  creatorName: string;
  creatorYear: number;
  updatedAt: string;
}
