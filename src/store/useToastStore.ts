import { create } from "zustand";

interface ToastStore {
  toastType: string | null;
  toastTrigger: number;
  showToast: (type: string) => void;
  clearToast: () => void;
}

export const useToastStore = create<ToastStore>(set => ({
  toastType: null,
  toastTrigger: 0,
  showToast: (type: string) =>
    set(state => ({
      toastType: type,
      toastTrigger: state.toastTrigger + 1
    })),
  clearToast: () => set({ toastType: null })
}));
