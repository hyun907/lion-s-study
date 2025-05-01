"use client";

import { lottieLion } from "@/lib/lottieLion";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("react-lottie"), {
  ssr: false
});

export default function Loading() {
  return (
    <div
      style={{ height: "500px", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Lottie options={lottieLion} height={200} width={200} />
    </div>
  );
}
