import Link from "next/link";
import styles from "./Navbar.module.css";
import logoRatu from "../../public/assets/logo-ratu.png";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src={logoRatu}
            height={60}
            width={60}
            alt="ratu_oceania_raya"
          />
        </Link>
      </div>
      <input id={styles["menu_toggle"]} type="checkbox" />
      <label className={styles.menu_button_container} htmlFor="menu-toggle">
        <div className={styles.menu_button}></div>
      </label>
      <ul className={styles.navitem}>
        <li>
          <Link href="/">
            <span>home</span>
          </Link>
        </li>
        <li>
          <Link href="/our-story">
            <span>our story</span>
          </Link>
        </li>
        <li>
          <Link href="/our-principals">
            <span>our principals</span>
          </Link>
        </li>
        <li>
          <Link href="/career">
            <span>careers at sea</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
