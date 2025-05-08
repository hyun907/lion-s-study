"use client";

import { useEffect, useState } from "react";
import { ToastTypeList, ToastItem } from "@/constants/ToastTypeList";
import { useUserStore } from "@/store/useUserStore";
import { useToastStore } from "@/store/useToastStore";

import styles from "@/app/_component/common/Toast.module.css";
import ToastIcGreen from "@/assets/icon/toast_green.svg";
import ToastIcYellow from "@/assets/icon/toast_yellow.svg";

interface Props {
  toastType: string;
}

const Toast = ({ toastType }: Props) => {
  const { name } = useUserStore();
  const { clearToast } = useToastStore();

  const toastInfo = ToastTypeList.find(item => item.type === toastType) as ToastItem | undefined;

  useEffect(() => {
    const timer = setTimeout(() => {
      clearToast();
    }, 1500);

    return () => clearTimeout(timer);
  }, [toastType]);

  if (!toastInfo) return null;
  if (typeof toastInfo.title === "function" && !name) return null;

  const { subtitle, color } = toastInfo;
  const title = typeof toastInfo.title === "function" ? toastInfo.title(name) : toastInfo.title;
  const IconComponent = color === "green" ? ToastIcGreen : ToastIcYellow;

  return (
    <div className={styles.toastWrap}>
      <div className={styles.toastContainer}>
        <IconComponent />
        <div className={styles.textContainer}>
          <h1>{title}</h1>
          {subtitle && <h2>{subtitle}</h2>}
        </div>
      </div>
    </div>
  );
};

export default Toast;
