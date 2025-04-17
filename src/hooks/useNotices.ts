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
import { NoticeItem } from "@/types/studyRoomDetails/notice";

export function useNotices(studyroomId: string) {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const NoticesRef = collection(fireStore, `studyRooms/${studyroomId}/notices`);

  useEffect(() => {
    const unsub = onSnapshot(NoticesRef, snap => {
      const result: NoticeItem[] = snap.docs.map(docSnap => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          title: data.title,
          content: data.content,
          creatorId: data.creatorId,
          createdAt: data.createdAt
        };
      });
      setNotices(result);
    });

    return () => unsub();
  }, [studyroomId]);

  const createNotice = async (title: string, content: string, creatorId: string) => {
    const ref = doc(NoticesRef);
    const Notice: NoticeItem = {
      id: ref.id,
      title,
      content,
      creatorId,
      createdAt: Timestamp.now()
    };
    await setDoc(ref, Notice);
  };

  const updateNotice = async (id: string, title: string, content: string) => {
    await updateDoc(doc(fireStore, `studyRooms/${studyroomId}/notices/${id}`), {
      title,
      content
    });
  };

  const deleteNotice = async (id: string) => {
    await deleteDoc(doc(fireStore, `studyRooms/${studyroomId}/notices/${id}`));
  };

  return {
    notices,
    createNotice,
    updateNotice,
    deleteNotice
  };
}
