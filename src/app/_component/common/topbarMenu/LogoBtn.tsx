"use client";

import Image from "next/image";
import React from "react";
import logoImg from "@/assets/image/lion_logo.png";
import styles from "./LogoBtn.module.css";
import { useRouter } from "next/navigation";

export default function LogoBtn() {
  const router = useRouter();
  const handleGoToMain = () => {
    router.push("/");
  };

  return (
    <button className={styles.btn} onClick={handleGoToMain}>
      <Image src={logoImg} alt="멋사 로고" unoptimized={true} width={22} height={21} />
      <p className={styles.text}>사자의 서재</p>
    </button>
  );
}
