# 사자의 서재

동아리 자료와 일정을 효율적으로 관리하고, 사자들의 인사이트를 공유하는 공간입니다.

## 📝 프로젝트 소개

사자의 서재는 동아리 활동을 더욱 효율적으로 만들기 위한 웹 애플리케이션입니다. 
기존의 불편하고 파트 별로 일관되지 않은 자료 전달과 관리 방식을 개선하고, 동아리원들의 지식 공유를 돕는 것을 목표로 합니다.

### 주요 목표
- 동아리 자료와 일정의 효율적인 관리
- 어른사자들의 인사이트 공유 공간 제공
- 확장 가능한 개발 경험 축적
- 실제 사용자 경험 기반의 유지보수 경험
- 동아리 활동 자료의 체계적인 보관과 전달

### 핵심 기능
- 구글 소셜 로그인
- 스터디방 관리
  - 생성 및 입장
  - 관심 설정
  - 목록 조회
- 아티클 관리
  - 작성 및 조회
  - 태그 기반 분류
- 댓글 시스템
  - 댓글 작성 및 조회
  - 파일 첨부
  - 링크 공유
  - 댓글 삭제
 
  
## 🛠 기술 스택

### 프레임워크 & 라이브러리
- **Next.js 14.2.14**: React 기반의 풀스택 프레임워크
- **React 18**: UI 라이브러리
- **TypeScript**: 정적 타입 지원
- **Zustand**: 상태 관리 라이브러리
- **Firebase**: 백엔드 서비스 (인증, 데이터베이스 등)

### 에디터 관련
- **@uiw/react-md-editor**: 마크다운 에디터 컴포넌트

### 개발 도구
- **ESLint**: 코드 품질 관리
- **Prettier**: 코드 포맷팅
- **SVGR**: SVG 파일 처리

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js 14+ App Router 페이지
│   ├── (common-layout)/    # 공통 레이아웃이 적용된 페이지
│   │   ├── (private)/      # 인증이 필요한 페이지
│   │   │   └── members/    # 멤버 관련 페이지
│   │   └── (public)/       # 공개 페이지
│   │       └── page.tsx    # 메인 페이지
│   ├── (non-topbar-layout)/# 탑바가 없는 레이아웃
│   │   └── studyroom/      # 스터디룸 관련 페이지
│   │       └── [id]/       # 동적 라우팅 (스터디룸 ID)
│   │           ├── addarticle/ # 아티클 작성 페이지
│   │           ├── article/    # 아티클 상세 페이지
│   │           ├── layout.tsx  # 스터디룸 레이아웃
│   │           └── page.tsx    # 스터디룸 메인 페이지
│   ├── _component/         # 공통 컴포넌트
│   ├── styles/            # 전역 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   └── loading.tsx        # 로딩 컴포넌트
├── assets/                # 정적 자원
│   ├── images/           # 이미지 파일
│   └── icons/            # 아이콘 파일
├── constants/            # 상수 정의
│   ├── api.ts           # API 관련 상수
│   └── routes.ts        # 라우트 관련 상수
├── firebase/            # Firebase 설정
│   ├── config.ts        # Firebase 설정
│   └── auth.ts          # 인증 관련 유틸리티
├── hooks/               # 커스텀 React 훅
│   ├── useAuth.ts      # 인증 관련 훅
│   └── useStudyRoom.ts # 스터디룸 관련 훅
├── lib/                 # 유틸리티 함수
│   ├── api.ts          # API 통신
│   └── storage.ts      # 로컬 스토리지
├── store/              # Zustand 상태 관리
│   ├── authStore.ts    # 인증 상태
│   └── studyStore.ts   # 스터디룸 상태
├── types/              # TypeScript 타입 정의
│   ├── auth.ts         # 인증 관련 타입
│   └── study.ts        # 스터디룸 관련 타입
└── utils/              # 유틸리티 함수
    ├── date.ts         # 날짜 관련 유틸리티
    └── validation.ts   # 유효성 검사
```

## 🚀 주요 기능
- 사용자 인증 (Firebase Authentication)
- 마크다운 에디터를 통한 콘텐츠 작성
- 상태 관리를 통한 효율적인 데이터 흐름
- 반응형 디자인

## 🛠 개발 환경 설정

1. 저장소 클론
```bash
git clone https://github.com/likelion-ssu/lion-s-study
```

2. 의존성 설치
```bash
pnpm install
```

3. 개발 서버 실행
```bash
pnpm dev
```

## 🔧 스크립트

- `pnpm dev`: 개발 서버 실행
- `pnpm build`: 프로덕션 빌드
- `pnpm start`: 프로덕션 서버 실행
