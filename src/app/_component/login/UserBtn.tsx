"use client";

import React from "react";
import LoginBtn from "./LoginBtn";
import NameBtn from "./NameBtn";
import { useAuth } from "@/hooks/useAuth";

export default function UserBtn() {
  const { isLoggedIn } = useAuth();

  return <>{isLoggedIn ? <NameBtn /> : <LoginBtn />}</>;
}
