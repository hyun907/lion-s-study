"use client";

import { useEffect, useRef, MouseEvent, useState } from "react";
import modalStyles from "@/app/_component/common/Modal.module.css";
import { useModalStore } from "@/store/useModalStore";
import { createPortal } from "react-dom";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useToastStore } from "@/store/useToastStore";
import { useConfirmBeforeRefresh } from "@/hooks/useConfirmBeforeRefresh";

export default function Modal() {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useConfirmBeforeRefresh(); // 새로고침 방지

  const { showToast } = useToastStore();
  const isMounted = useIsMounted();

  // 전역 모달 상태를 가져옴
  const { content, isOpen, close, onBackdropClick } = useModalStore();
  // 모달의 backdrop을 가리키는 ref
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달 열리면 스크롤 비활성화
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const target = document.getElementById("modal-root") || document.body;
      setPortalTarget(target);
    }
  }, []);

  // 모달 열릴 때 뒤로가기 방지
  useEffect(() => {
    if (!isOpen) return;

    const pushState = () => {
      window.history.pushState(null, "", window.location.href);
    };

    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      pushState();
      showToast("goBack");
    };

    pushState(); // 모달 열릴 때 한 번 push
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen]);

  // 모달 backdrop 클릭 시 모달 닫음
  const handleClickOutside = (e: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) {
      // 사용자 정의 backdrop 클릭 동작 실행
      if (onBackdropClick) {
        onBackdropClick();
      }
      // 기본 닫기 동작 실행
      close();
    }
  };

  // 모달이 열려있지 않거나 서버에서 실행되는 경우를 차단
  if (!isMounted || !isOpen || !portalTarget) return null;

  // Portal을 생성하고 내부에서 모달 content를 렌더링

  return createPortal(
    <div ref={modalRef} onClick={handleClickOutside} className={modalStyles.modalOverlay}>
      <div onClick={e => e.stopPropagation()}>{content}</div>
    </div>,
    portalTarget
  );
}
