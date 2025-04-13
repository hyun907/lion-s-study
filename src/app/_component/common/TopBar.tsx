import UserBtn from "@/app/_component/domain/login/UserBtn";
import MembersBtn from "./topbarMenu/MembersBtn";
import LogoBtn from "./topbarMenu/LogoBtn";

import styles from "./TopBar.module.css";

export default function TopBar() {
  return (
    <div>
      <nav className={styles.nav}>
        <div>
          <LogoBtn />
        </div>
        <div className={styles.menu}>
          <MembersBtn />
          <UserBtn />
        </div>
      </nav>
    </div>
  );
}
