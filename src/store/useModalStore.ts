"use client";

import { create } from "zustand";

export type ModalType = "login" | "logout" | "signup" | null;

interface ModalData {
  type: Exclude<ModalType, null>;
  props?: Record<string, any>;
}

interface ModalState {
  modal: ModalData | null;
  openModal: (type: Exclude<ModalType, null>, props?: Record<string, any>) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>(set => ({
  modal: null,
  openModal: (type, props) => set({ modal: { type, props } }),
  closeModal: () => set({ modal: null })
}));
