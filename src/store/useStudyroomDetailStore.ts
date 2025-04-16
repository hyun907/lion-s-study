import { create } from "zustand";

interface StudyroomDetailStore {
  studyroomId: string | null;
  setStudyroomId: (id: string) => void;
  clearStudyroomId: () => void;
}

export const useStudyroomDetailStore = create<StudyroomDetailStore>(set => ({
  studyroomId: null,
  setStudyroomId: (id: string) => set({ studyroomId: id }),
  clearStudyroomId: () => set({ studyroomId: null })
}));
