import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <Image
          src="/assets/logo-ratu-white.png"
          height={135}
          width={132}
          alt="ratu_oceania_raya"
          priority
        />
      </div>
      <div className={styles.footerDesc}>
        <div className={styles.footerDescHeader}>
          {/* <span>about ratu oceania raya</span>
          <span>contact</span>
          <span>call us</span> */}
        </div>
        <div className={styles.footerDescHeader}>
          <div className={styles.medsos}>
            <Link href="#" rel="noreferrer" target="_blank">
              <Image
                src="/assets/facebook.png"
                height={19}
                width={10}
                alt="facebook"
              />
            </Link>
          </div>
          <div className={styles.medsos}>
            <Link
              href="https://www.youtube.com/@ratuoceaniaraya3406"
              rel="noreferrer"
              target="_blank"
            >
              <Image
                src="/assets/youtube.png"
                height={15}
                width={22}
                alt="youtube"
              />
            </Link>
          </div>
          <div className={styles.medsos}>
            <Link href="#" rel="noreferrer" target="_blank">
              <Image
                src="/assets/twitter.png"
                height={16}
                width={20}
                alt="twitter"
              />
            </Link>
          </div>
          <div className={styles.medsos}>
            <Link
              href="https://www.instagram.com/officialratuoceaniaraya/"
              rel="noreferrer"
              target="_blank"
            >
              <Image
                src="/assets/instagram.png"
                height={18}
                width={19}
                alt="instagram"
              />
            </Link>
          </div>
        </div>
        <div className={styles.footerDescBot}>
          <span>
            Copyright {year} PT. Ratu Oceania Raya | All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
