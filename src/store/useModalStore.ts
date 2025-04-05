"use client";

import { create } from "zustand";

interface ModalState {
  isLoginModalOpen: boolean;
  isLogoutModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  openLogoutModal: () => void;
  closeLogoutModal: () => void;
}

export const useModalStore = create<ModalState>(set => ({
  isLoginModalOpen: false,
  isLogoutModalOpen: false,
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
  openLogoutModal: () => set({ isLogoutModalOpen: true }),
  closeLogoutModal: () => set({ isLogoutModalOpen: false })
}));
