import Link from "next/link";
import styles from "./Navbar.module.css";
import logoRatu from "../../public/assets/logo-ratu.png";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.navitem}>
        <Link href="/">
          <Image
            src={logoRatu}
            height={60}
            width={60}
            alt="ratu_oceania_raya"
          />
        </Link>
      </div>
      <div className={styles.navitem}>
        <Link href="/">
          <span>home</span>
        </Link>
        <Link href="/our-story">
          <span>our story company</span>
        </Link>
        <Link href="/our-principals">
          <span>our principals</span>
        </Link>
        <Link href="/career">
          <span>career</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
