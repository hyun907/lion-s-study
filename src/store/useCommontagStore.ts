import { create } from "zustand";
import { collection, getDocs } from "firebase/firestore";
import fireStore from "@/firebase/firestore";
import { Tag } from "@/types/studyRoomDetails/article";

interface CommonTagStore {
  tags: Tag[];
  isTagLoading: boolean;
  error: Error | null;
  fetchCommonTags: () => Promise<void>;
}

export const useCommonTagStore = create<CommonTagStore>(set => ({
  tags: [],
  isTagLoading: true,
  error: null,
  fetchCommonTags: async () => {
    set({ isTagLoading: true, error: null });
    try {
      const querySnapshot = await getDocs(collection(fireStore, "commonTags"));
      const snapshotTags = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Tag[];
      set({ tags: snapshotTags, isTagLoading: false });
    } catch (error) {
      set({ error: error as Error, isTagLoading: false });
    }
  }
}));
