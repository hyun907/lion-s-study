import { collection, doc, getDocs, writeBatch } from "firebase/firestore";
import fireStore from "@/firebase/firestore";
import { TagColors } from "@/constants/TagColors";

const getRandomColor = () => {
  return TagColors[Math.floor(Math.random() * TagColors.length)];
};

export const useTagHandler = () => {
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
        const color = getRandomColor();
        batch.set(newTagRef, { name: tagName, color });
        finalTagIds.push(newTagRef.id);
      }
    }

    return finalTagIds;
  };

  return { fetchAndPrepareTags };
};
