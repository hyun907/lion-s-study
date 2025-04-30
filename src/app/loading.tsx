"use client";

import { lottieLion } from "@/lib/lottieLion";
import Lottie from "react-lottie";

export default function Loading() {
  return (
    <div
      style={{ height: "500px", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Lottie options={lottieLion} height={200} width={200} />
    </div>
  );
}
