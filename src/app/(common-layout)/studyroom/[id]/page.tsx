import StudyroomMain from "@/app/_component/studyroom/StudyroomMain";
import { useStudyroomDetailStore } from "@/store/useStudyroomIdStore";
import { usePathname } from "next/navigation";
import React from "react";

type Params = {
  params: {
    id: string;
  };
};

export default function Studyroom({ params }: Params) {
  const { id } = params;

  return (
    <>
      <StudyroomMain id={id} />
    </>
  );
}
