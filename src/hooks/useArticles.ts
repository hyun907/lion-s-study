import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import fireStore from "@/firebase/firestore";
import { ArticleItem } from "@/types/studyRoomDetails/article";

export function useArticles(studyroomId: string) {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const articlesRef = collection(fireStore, `studyRooms/${studyroomId}/articles`);

  useEffect(() => {
    const unsub = onSnapshot(articlesRef, snap => {
      const result: ArticleItem[] = snap.docs.map(docSnap => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          title: data.title,
          content: data.content,
          creatorId: data.creatorId,
          createdAt: data.createdAt,
          creatorName: data.creatorName,
          creatorYear: data.creatorYear
        };
      });
      setArticles(result);
    });

    return () => unsub();
  }, [studyroomId]);

  const deleteArticle = async (id: string) => {
    await deleteDoc(doc(fireStore, `studyRooms/${studyroomId}/articles/${id}`));
  };

  return {
    articles,
    deleteArticle
  };
}
