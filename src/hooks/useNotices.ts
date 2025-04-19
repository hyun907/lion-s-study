import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  serverTimestamp
} from "firebase/firestore";
import fireStore from "@/firebase/firestore";
import { NoticeItem } from "@/types/studyRoomDetails/notice";
import { sortByCreatedAt } from "@/utils/sortByCreatedAt";

export function useNotices(studyroomId: string) {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const NoticesRef = collection(fireStore, `studyRooms/${studyroomId}/notices`);

  useEffect(() => {
    const unsub = onSnapshot(NoticesRef, snap => {
      const result: NoticeItem[] = snap.docs.map(docSnap => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          content: data.content,
          creatorId: data.creatorId,
          creatorName: data.creatorName,
          creatorYear: data.creatorYear,
          createdAt: data.createdAt
        };
      });

      sortByCreatedAt(result, false);

      setNotices(result);
    });

    return () => unsub();
  }, [studyroomId]);

  const createNotice = async (
    content: string,
    creatorId: string,
    creatorName: string,
    creatorYear: number
  ) => {
    const ref = doc(NoticesRef);
    const Notice: NoticeItem = {
      id: ref.id,
      content,
      creatorId,
      creatorName,
      creatorYear,
      createdAt: serverTimestamp()
    };
    await setDoc(ref, Notice);
  };

  const updateNotice = async (id: string, content: string) => {
    await updateDoc(doc(fireStore, `studyRooms/${studyroomId}/notices/${id}`), {
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
