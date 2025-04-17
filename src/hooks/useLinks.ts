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
import { LinkItem } from "@/types/studyRoomDetails/link";

export function useLinks(studyroomId: string) {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const linksRef = collection(fireStore, `studyRooms/${studyroomId}/links`);

  useEffect(() => {
    const unsub = onSnapshot(linksRef, snap => {
      const result: LinkItem[] = snap.docs.map(docSnap => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          title: data.title,
          url: data.url,
          createdAt: data.createdAt
        };
      });
      setLinks(result);
    });

    return () => unsub();
  }, [studyroomId]);

  const createLink = async (title: string, url: string) => {
    const ref = doc(linksRef);
    const link: LinkItem = {
      id: ref.id,
      title,
      url,
      createdAt: serverTimestamp()
    };
    await setDoc(ref, link);
  };

  const deleteLink = async (id: string) => {
    await deleteDoc(doc(fireStore, `studyRooms/${studyroomId}/links/${id}`));
  };

  return {
    links,
    createLink,
    deleteLink
  };
}
