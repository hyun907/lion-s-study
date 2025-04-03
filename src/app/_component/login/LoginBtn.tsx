"use client";

import { signInWithGoogle, signOutWithGoogle } from "@/firebase/firebaseAuth";
import { useUserStore } from "@/store/useUserStore";
import React, { useEffect } from "react";

export default function LoginBtn() {
  const { uid, setUser } = useUserStore();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const { uid, email } = JSON.parse(userData);
      setUser(uid, email);
    }
  }, [setUser]);

  return (
    <div>
      {uid ? (
        <button type="button" onClick={signOutWithGoogle}>
          로그아웃
        </button>
      ) : (
        <button type="button" onClick={signInWithGoogle}>
          로그인
        </button>
      )}
    </div>
  );
}
