"use client";

import { useEffect } from "react";
import { useStudyroomIdStore } from "@/store/useStudyroomIdStore";

interface Props {
  id: string;
  children: React.ReactNode;
}

// 스터디룸의 유효성이 확인되면 store해주는 클라이언트 컴포넌트
export default function ClientStudyroomIdSetter({ id, children }: Props) {
  const setId = useStudyroomIdStore(state => state.setStudyroomId);

  useEffect(() => {
    setId(id);
  }, [id]);

  return <>{children}</>;
}
