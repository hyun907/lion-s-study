"use client";

import { signInWithGoogle } from "@/firebase/firebaseAuth";
import React from "react";

export default function LoginBtn() {
  return (
    <button type="button" onClick={signInWithGoogle}>
      로그인
    </button>
  );
}
