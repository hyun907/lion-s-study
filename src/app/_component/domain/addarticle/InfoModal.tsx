"use client";

import React from "react";
import { MARKDOWN_GUIDE_PART_1, MARKDOWN_GUIDE_PART_2 } from "@/constants/markdownGuide";

import styles from "./InfoModal.module.css";

interface Props {
  onClose: () => void;
}

export default function InfoModal({ onClose }: Props) {
  return (
    <div className={styles.modal}>
      <div className={styles.body} dangerouslySetInnerHTML={{ __html: MARKDOWN_GUIDE_PART_1 }} />
      <div className={styles.body} dangerouslySetInnerHTML={{ __html: MARKDOWN_GUIDE_PART_2 }} />
    </div>
  );
}
