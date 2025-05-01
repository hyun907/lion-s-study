"use client";

import { useRouter } from "next/navigation";
import TopBar from "@/app/_component/common/TopBar";
import Footer from "@/app/_component/common/Footer";
import IcArrow from "@/assets/icon/arrow_right.svg";
import styles from "./styles/not-found.module.css";

export default function NotFound() {
  const router = useRouter();

  const handleGoToMain = () => {
    router.push("/");
  };

  return (
    <>
      <div className={styles.container}>
        <TopBar />

        <div className={styles.wrapper}>
          <div className={styles.absoluteBackBtnContainer} onClick={handleGoToMain}>
            <IcArrow viewBox="0 0 28 28" height="26" width="26" />
          </div>
          <h1>존재하지 않는 페이지입니다</h1>
          <p>
            존재하지 않는 주소를 입력하셨거나,
            <br />
            요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
          </p>
          <div className={styles.link} onClick={handleGoToMain}>
            <p>메인으로 가기</p>
            <IcArrow style={{ transform: "rotate(180deg)", width: "0.7rem" }} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
