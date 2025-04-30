export interface ToastItem {
  type: string;
  title: string | ((name?: string) => string);
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
    title: "서재는 사자만 이용할 수 있습니다.",
    subtitle: "로그인 후 입장해주세요.",
    color: "yellow"
  },
  {
    type: "login_common",
    title: "로그인이 필요한 서비스입니다.",
    subtitle: "",
    color: "yellow"
  },
  {
    type: "logout",
    title: "로그아웃이 완료되었습니다.",
    subtitle: "",
    color: "green"
  },
  {
    type: "login_error",
    title: "로그인에 실패했습니다.",
    subtitle: "다시 로그인해주세요.",
    color: "yellow"
  },
  {
    type: "network_error",
    title: "네트워크 오류",
    subtitle: "인터넷 연결 상태를 확인해주세요.",
    color: "yellow"
  },

  // signup
  {
    type: "signup_error",
    title: "로그인을 다시 해주세요.",
    subtitle: "",
    color: "yellow"
  },
  {
    type: "signup_empty",
    title: "모든 값을 입력하세요.",
    subtitle: "",
    color: "yellow"
  },

  // studyroom
  {
    type: "addStudyroom",
    title: "서재 생성이 완료되었습니다.",
    subtitle: "",
    color: "green"
  },
  {
    type: "copyLink",
    title: "링크가 클립보드에 복사되었습니다.",
    subtitle: "",
    color: "green"
  },
  {
    type: "fail",
    title: "작업에 실패했습니다.",
    subtitle: "",
    color: "yellow"
  },
  {
    type: "wrongStudyroomId",
    title: "스터디룸 ID가 유효하지 않습니다.",
    subtitle: "",
    color: "yellow"
  },
  {
    type: "fail_add_image",
    title: "이미지 업로드에 실패했습니다.",
    subtitle: "다시 시도해주세요.",
    color: "yellow"
  },
  {
    type: "fail_add_studyroom",
    title: "서재 생성에 실패했습니다.",
    subtitle: "다시 시도해주세요.",
    color: "yellow"
  },

  // notice
  {
    type: "addNotice",
    title: "Notice 생성이 완료되었습니다.",
    subtitle: "",
    color: "green"
  },
  {
    type: "editNotice",
    title: "Notice 수정이 완료되었습니다.",
    subtitle: "",
    color: "green"
  },
  {
    type: "deleteNotice",
    title: "Notice 삭제가 완료되었습니다.",
    subtitle: "",
    color: "green"
  },

  // link
  {
    type: "addLink",
    title: "Link 생성이 완료되었습니다.",
    subtitle: "",
    color: "green"
  },
  {
    type: "deleteLink",
    title: "Link 삭제가 완료되었습니다.",
    subtitle: "",
    color: "green"
  },

  // article
  {
    type: "addArticle",
    title: "Article 생성이 완료되었습니다.",
    subtitle: "",
    color: "green"
  },
  {
    type: "editArticle",
    title: "Article 수정이 완료되었습니다.",
    subtitle: "",
    color: "green"
  },
  {
    type: "deleteArticle",
    title: "Article 삭제가 완료되었습니다.",
    subtitle: "",
    color: "green"
  },

  // empty
  {
    type: "emptyTitle",
    title: "앗, 제목이 비어있어요!",
    subtitle: "생성하기 전에 제목을 입력해주세요.",
    color: "yellow"
  },
  {
    type: "emptyContent",
    title: "어흥! 내용이 비어있어요!",
    subtitle: "생성하기 전에 내용을 입력해주세요.",
    color: "yellow"
  }
];
