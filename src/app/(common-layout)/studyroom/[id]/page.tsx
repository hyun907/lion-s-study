"use client";

import StudyroomMain from "@/app/_component/studyroom/StudyroomMain";
import { useStudyroomDetailStore } from "@/store/useStudyroomDetailStore";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

type Params = {
  params: {
    id: string;
  };
};

export default function Studyroom({ params }: Params) {
  const { id } = params;
  const pathname = usePathname();

  // 클릭한 스터디룸 id값 관리
  const setId = useStudyroomDetailStore(state => state.setStudyroomId);
  const clearId = useStudyroomDetailStore(state => state.clearStudyroomId);

  useEffect(() => {
    // 페이지 진입 시 ID 저장
    setId(id);

    return () => {
      // 언마운트 시 초기화도 안전망으로
      clearId();
    };
  }, [id]);

  useEffect(() => {
    const isInStudyroom = pathname?.startsWith(`/studyroom/${id}`);

    if (!isInStudyroom) {
      clearId();
    }
  }, [pathname, id]);

  return (
    <>
      <StudyroomMain />
    </>
  );
}
