import ClientStudyroomIdSetter from "@/app/_component/studyroom/ClientStudyroomIdSetter";
import StudyroomMain from "@/app/_component/studyroom/StudyroomMain";
import { isValidStudyroomId } from "@/lib/studyroom";
import React from "react";
import NotFound from "@/app/not-found";

type Params = {
  params: {
    id: string;
  };
};

export default function Studyroom({ params }: Params) {
  const { id } = params;

  // studyroom main에서 스터디룸 id의 유효성만 확인
  const checkValid = () => {
    const exists = isValidStudyroomId(id);
    if (!exists) NotFound();
  };

  checkValid();

  return (
    <ClientStudyroomIdSetter id={id}>
      <StudyroomMain />
    </ClientStudyroomIdSetter>
  );
}
