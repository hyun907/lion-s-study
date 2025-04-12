import React from "react";
import styles from "@/app/_component/common/PlusBtn.module.css";

interface BtnProps {
  text: string;
  state?: "default" | "active";
  onClick: () => void;
}

export default function PlusBtn({ text, state = "default", onClick }: BtnProps) {
  const btnClassName = `${styles.btn} ${state === "default" ? styles.default : styles.active}`;

  return (
    <button onClick={onClick} type="button" className={btnClassName}>
      {text}
    </button>
  );
}
