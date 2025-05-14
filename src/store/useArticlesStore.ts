import { create } from "zustand";
import { ArticleItem } from "@/types/studyRoomDetails/article";
import { deleteDoc, doc } from "firebase/firestore";
import fireStore from "@/firebase/firestore";
import removeMarkdown from "remove-markdown";

interface ArticleStore {
  articles: ArticleItem[];
  currentStudyroomId: string | null;
  isLoading: boolean;

  setArticles: (articles: ArticleItem[], studyroomId: string) => void;
  clearArticles: () => void;
  setLoading: (loading: boolean) => void;

  deleteArticle: (id: string) => Promise<void>;
  getMarkdownPreview: (markdown: string, maxLines?: number) => string;
}

export const useArticlesStore = create<ArticleStore>((set, get) => ({
  articles: [],
  currentStudyroomId: null,
  isLoading: false,

  setArticles: (articles, studyroomId) =>
    set({
      articles,
      currentStudyroomId: studyroomId
    }),

  clearArticles: () =>
    set({
      articles: [],
      currentStudyroomId: null
    }),

  setLoading: loading => set({ isLoading: loading }),

  deleteArticle: async id => {
    const { currentStudyroomId } = get();
    if (!currentStudyroomId) {
      throw new Error("Cannot delete article: no current studyroomId");
    }
    await deleteDoc(doc(fireStore, `studyRooms/${currentStudyroomId}/articles/${id}`));
  },

  getMarkdownPreview: (markdown, maxLines = 10) => {
    const withoutImage = markdown.replace(/!\[.*?\]\(.*?\)/g, "");
    // ![alt](url) 패턴을 찾아 없앰.

    const plainText = removeMarkdown(withoutImage);
    const lines = plainText
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean);
    return lines.slice(0, maxLines).join("\n");
  }
}));
