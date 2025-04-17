import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  Timestamp
} from "firebase/firestore";
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
          createdAt: data.createdAt
        };
      });
      setArticles(result);
    });

    return () => unsub();
  }, [studyroomId]);

  const createArticle = async (title: string, content: string, creatorId: string) => {
    const ref = doc(articlesRef);
    const article: ArticleItem = {
      id: ref.id,
      title,
      content,
      creatorId,
      createdAt: Timestamp.now()
    };
    await setDoc(ref, article);
  };

  const updateArticle = async (id: string, title: string, content: string) => {
    await updateDoc(doc(fireStore, `studyRooms/${studyroomId}/articles/${id}`), {
      title,
      content
    });
  };

  const deleteArticle = async (id: string) => {
    await deleteDoc(doc(fireStore, `studyRooms/${studyroomId}/articles/${id}`));
  };

  return {
    articles,
    createArticle,
    updateArticle,
    deleteArticle
  };
}
