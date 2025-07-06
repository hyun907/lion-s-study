import { collection, doc, getDocs, writeBatch } from "firebase/firestore";
import fireStore from "@/firebase/firestore";
import { useRandomColor } from "@/hooks/ui";

import { Tag } from "@/types/studyRoomDetails/article";
import { useCommonTagStore } from "@/store/useCommontagStore";

export const useTagHandler = () => {
  const { fetchCommonTags } = useCommonTagStore();

  const fetchAndPrepareTags = async (
    parsedTags: string[],
    batch: ReturnType<typeof writeBatch>
  ) => {
    const commonTagRef = collection(fireStore, "commonTags");
    const existingTagsSnap = await getDocs(commonTagRef);
    const existingTagMap: Record<string, { id: string; color: string }> = {};

    existingTagsSnap.forEach(doc => {
      const data = doc.data();
      existingTagMap[data.name] = { id: doc.id, color: data.color };
    });

    const finalTagIds: string[] = [];

    for (const tagName of parsedTags) {
      if (existingTagMap[tagName]) {
        finalTagIds.push(existingTagMap[tagName].id);
      } else {
        const newTagRef = doc(collection(fireStore, "commonTags"));
        const color = useRandomColor();
        batch.set(newTagRef, { name: tagName, color });
        finalTagIds.push(newTagRef.id);
      }
    }

    fetchCommonTags(); // tag가 업데이트됐으므로 다시 store 해줌
    return finalTagIds;
  };

  // commonTag를 fetch만 하는 함수
  const fetchAllCommonTags = async () => {
    const commonTagRef = collection(fireStore, "commonTags");
    const snapshot = await getDocs(commonTagRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Tag[];
  };

  return {
    fetchAndPrepareTags,
    fetchAllCommonTags
  };
};
