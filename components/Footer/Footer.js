import Image from "next/image";
import styles from "./Footer.module.css";
// import logoWhite from "/assets/logo-ratu-white.png";
// import facebook from "/assets/facebook.png";
// import youtube from "/assets/youtube.png";
// import twitter from "/assets/twitter.png";
// import instagram from "/assets/instagram.png";
// import facebook from "https://storage.cloud.google.com/exqueen/upload-gambar/frontstatis/facebook.png";
// import youtube from "https://storage.cloud.google.com/exqueen/upload-gambar/frontstatis/youtube.png";
// import twitter from "https://storage.cloud.google.com/exqueen/upload-gambar/frontstatis/twitter.png";
// import instagram from "https://storage.cloud.google.com/exqueen/upload-gambar/frontstatis/instagram.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <Image
          src="/assets/logo-ratu-white.png"
          height={135}
          width={132}
          alt="ratu_oceania_raya"
        />
      </div>
      <div className={styles.footerDesc}>
        <div className={styles.footerDescHeader}>
          <span>about ratu oceania raya</span>
          <span>contact</span>
          <span>call us</span>
        </div>
        <div className={styles.footerDescHeader}>
          <div className={styles.medsos}>
            <Image
              src="/assets/facebook.png"
              height={19}
              width={10}
              alt="facebook"
            />
          </div>
          <div className={styles.medsos}>
            <Image
              src="/assets/youtube.png"
              height={15}
              width={22}
              alt="youtube"
            />
          </div>
          <div className={styles.medsos}>
            <Image
              src="/assets/twitter.png"
              height={16}
              width={20}
              alt="twitter"
            />
          </div>
          <div className={styles.medsos}>
            <Image
              src="/assets/instagram.png"
              height={18}
              width={19}
              alt="instagram"
            />
          </div>
        </div>
        <div className={styles.footerDescBot}>
          <span>
            Copyright 2023 PT. Ratu Oceania Raya | All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
