"use client";

import { signInWithGoogle, signOutWithGoogle } from "@/firebase/firebaseAuth";
import { useUserStore } from "@/store/useUserStore";
import React, { useEffect, useState } from "react";
import SignUpModal from "./SignUpModal";
export default function LoginBtn() {
  const { uid, setUser } = useUserStore();
  const [showSignup, setShowSignup] = useState(false);
  const [pendingUser, setPendingUser] = useState<{ uid: string; email: string } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const { uid, email } = JSON.parse(userData);
      setUser(uid, email);
    }
  }, [setUser]);

  const handleLogin = async () => {
    const result = await signInWithGoogle();
    if (typeof result === "object") {
      setPendingUser(result);
      setShowSignup(true);
    }
  };

  return (
    <div>
      {uid ? (
        <button onClick={signOutWithGoogle}>로그아웃</button>
      ) : (
        <>
          <button onClick={handleLogin}>로그인</button>
          {showSignup && pendingUser && (
            <SignUpModal
              uid={pendingUser.uid}
              googleId={pendingUser.email}
              onSuccess={() => {
                setShowSignup(false);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
