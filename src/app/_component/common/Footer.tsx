import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerContainer}>
        <div className={styles.contentsContainer}>
          <div>COPYRIGHT LIKELION SSU</div>
          <div>TECHIT</div>
        </div>
        <div className={`${styles.contentsContainer} ${styles.rightContentsContainer}`}>
          <p className={styles.contactMent}>CONTACT</p>
          <div className={styles.contactContainer}>
            <div>ssu@likelion.org</div>
            <a href="https://www.instagram.com/likelion_ssu/">
              <div>INSTA</div>
            </a>
            <a href="https://github.com/likelion-ssu">
              <div>GIT</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
