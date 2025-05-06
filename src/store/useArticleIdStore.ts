// articleStore.ts
import { create } from "zustand";

interface ArticleStore {
  selectedArticleId: string | null;
  setSelectedArticleId: (id: string | null) => void;
  clearSelectedArticleId: () => void;
}

export const useArticleIdStore = create<ArticleStore>(set => ({
  selectedArticleId: null,
  setSelectedArticleId: id => set({ selectedArticleId: id }),
  clearSelectedArticleId: () => set({ selectedArticleId: null })
}));
