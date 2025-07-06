"use client"; // 이 파일은 클라이언트 컴포넌트임

import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import fireStore from "@/firebase/firestore";

import { useStudyroomIdStore } from "@/store/useStudyroomIdStore";
import { useArticlesStore } from "@/store/useArticlesStore";

import { ArticleItem } from "@/types/studyRoomDetails/article";
import { sortArrByTime } from "@/utils/sortArrByTime";
import Loading from "@/app/loading";
import { useCommonTagStore } from "@/store/useCommontagStore";

interface Props {
  id: string;
  children: React.ReactNode;
}

// studyroom/[id] 주소의 Setter (클라이언트 컴포넌트)

// 1. 스터디룸의 유효성이 확인되면 studyroomId store
// 2. 스터디룸의 유효성이 확인됐으므로 articles를 불러와 전역상태로 저장
// 3. tag가 없다면 tag를 fetch함

export default function ClientStudyroomIdSetter({ id, children }: Props) {
  const setStudyroomId = useStudyroomIdStore(state => state.setStudyroomId);
  const { setArticles, clearArticles, setLoading, isLoading, getMarkdownPreview } =
    useArticlesStore();
  const { tags, fetchCommonTags, isTagLoading } = useCommonTagStore();

  useEffect(() => {
    setStudyroomId(id);
    setLoading(true);

    // tag load
    if (tags.length == 0) fetchCommonTags();
    const articlesRef = collection(fireStore, `studyRooms/${id}/articles`);
    const unsub = onSnapshot(articlesRef, snap => {
      const result: ArticleItem[] = snap.docs.map(docSnap => {
        const data = docSnap.data();
        const preview = getMarkdownPreview(data.content ?? "");

        return {
          id: docSnap.id,
          title: data.title,
          preview: preview,
          content: data.content,
          creatorId: data.creatorId,
          createdAt: data.createdAt,
          creatorName: data.creatorName,
          creatorYear: data.creatorYear,
          tagIds: data.tags,
          imgUrls: data.imgUrls
        };
      });

      sortArrByTime(result, false);
      setArticles(result, id);
      setLoading(false);
    });

    return () => {
      clearArticles();
      setLoading(false);
      unsub();
    };
  }, [id]);

  if (isLoading || isTagLoading) return <Loading />;
  return <>{children}</>;
}
