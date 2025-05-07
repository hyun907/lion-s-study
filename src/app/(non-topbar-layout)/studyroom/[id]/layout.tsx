// app/studyroom/[id]/layout.tsx
import { isValidStudyroomId } from "@/lib/studyroom";
import { notFound } from "next/navigation";
import ClientStudyroomIdSetter from "@/app/_component/studyroom/ClientStudyroomIdSetter";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: {
    id: string;
  };
};

export default async function StudyroomLayout({ children, params }: Props) {
  const { id } = params;

  const isValid = await isValidStudyroomId(id);
  if (!isValid) notFound(); // ✅ 서버에서 404 처리

  return <ClientStudyroomIdSetter id={id}>{children}</ClientStudyroomIdSetter>;
}
