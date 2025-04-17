import { create } from "zustand";

interface StudyroomIdStore {
  studyroomId: string | null;
  setStudyroomId: (id: string) => void;
  clearStudyroomId: () => void;
}

export const useStudyroomIdStore = create<StudyroomIdStore>(set => ({
  studyroomId: null,
  setStudyroomId: (id: string) => set({ studyroomId: id }),
  clearStudyroomId: () => set({ studyroomId: null })
}));
