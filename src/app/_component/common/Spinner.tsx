"use client";
import styles from "./Spinner.module.css";

export default function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.dot}>
            <div
              className={styles.dotCircle}
              style={{ transform: `rotate(${i * 45}deg) translateY(-13px)` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
