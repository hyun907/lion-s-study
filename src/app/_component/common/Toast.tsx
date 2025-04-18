"use client";

import { ToastTypeList, ToastItem } from "@/constants/ToastTypeList";
import { useUserStore } from "@/store/useUserStore";

import styles from "@/app/_component/common/Toast.module.css";
import ToastIcGreen from "@/assets/icon/toast_green.svg";
import ToastIcYellow from "@/assets/icon/toast_yellow.svg";

interface Props {
  toastType: string;
}

const Toast = ({ toastType }: Props) => {
  const { name } = useUserStore();

  const toastInfo = ToastTypeList.find(item => item.type === toastType) as ToastItem | undefined;

  if (!toastInfo || !name) return null;

  const { subtitle, color } = toastInfo;
  const title = toastInfo.title(name);
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
