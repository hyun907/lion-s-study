export interface ToastItem {
  type: string;
  title: (name?: string) => string;
  subtitle?: string;
  color: "green" | "yellow";
}

export const ToastTypeList: ToastItem[] = [
  // login
  {
    type: "welcome",
    title: name => `${name ?? "숭멋사"}님, 환영합니다!`,
    subtitle: "로그인이 완료되었습니다.",
    color: "green"
  },
  {
    type: "login",
    title: () => "서재는 사자만 이용할 수 있습니다.",
    subtitle: "로그인 후 입장해주세요.",
    color: "yellow"
  },
  {
    type: "logout",
    title: () => "로그아웃이 완료되었습니다.",
    subtitle: "",
    color: "green"
  },

  // studyroom
  {
    type: "addStudyroom",
    title: () => "서재 생성이 완료되었습니다.",
    subtitle: "",
    color: "green"
  },
  {
    type: "copyLink",
    title: () => "링크가 클립보드에 복사되었습니다.",
    subtitle: "",
    color: "green"
  },

  // notice
  {
    type: "addNotice",
    title: () => "Notice 생성이 완료되었습니다.",
    subtitle: "",
    color: "green"
  },
  {
    type: "editNotice",
    title: () => "Notice 수정이 완료되었습니다.",
    subtitle: "",
    color: "green"
  },
  {
    type: "deleteNotice",
    title: () => "Notice 삭제가 완료되었습니다.",
    subtitle: "",
    color: "green"
  },

  // link
  {
    type: "addLink",
    title: () => "Link 생성이 완료되었습니다.",
    subtitle: "",
    color: "green"
  },
  {
    type: "deleteLink",
    title: () => "Link 삭제가 완료되었습니다.",
    subtitle: "",
    color: "green"
  },

  // article
  {
    type: "addArticle",
    title: () => "Article 생성이 완료되었습니다.",
    subtitle: "",
    color: "green"
  },
  {
    type: "editArticle",
    title: () => "Article 수정이 완료되었습니다.",
    subtitle: "",
    color: "green"
  },
  {
    type: "deleteArticle",
    title: () => "Article 삭제가 완료되었습니다.",
    subtitle: "",
    color: "green"
  },

  // empty
  {
    type: "emptyTitle",
    title: () => "앗, 제목이 비어있어요!",
    subtitle: "생성하기 전에 제목을 입력해주세요.",
    color: "yellow"
  },
  {
    type: "emptyContent",
    title: () => "어흥! 내용이 비어있어요!",
    subtitle: "생성하기 전에 내용을 입력해주세요.",
    color: "yellow"
  }
];
