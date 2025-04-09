"use client";

import { useModalStore } from "@/store/useModalStore";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function ModalPortal() {
  const [mounted, setMounted] = useState(false);
  const { modals, closeModal } = useModalStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <>
      {Object.entries(modals).map(([modalType, modal]) => {
        const ModalComponent = modal.Component;
        return (
          <ModalComponent
            key={modalType}
            onClose={() => closeModal(modalType as any)}
            {...modal.props}
          />
        );
      })}
    </>,
    document.getElementById("modal-root") || document.body
  );
}
