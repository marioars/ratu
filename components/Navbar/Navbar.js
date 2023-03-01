import Link from "next/link";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import styles from "./Navbar.module.css";
import logoRatu from "../../public/assets/logo-ratu.png";
import Image from "next/image";

const Navbar = () => {
  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle(styles.responsive_nav);
  };
  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src={logoRatu}
            height={60}
            width={60}
            alt="ratu_oceania_raya"
            priority
          />
        </Link>
      </div>
      <nav className={styles.nav} ref={navRef}>
        <Link href="/">
          <span>home</span>
        </Link>
        <Link href="/our-story">
          <span>our story</span>
        </Link>
        <Link href="/our-principals">
          <span>our principals</span>
        </Link>
        <Link href="/career">
          <span>careers at sea</span>
        </Link>
        <button
          className={`${styles.navBtn} ${styles.navCloseBtn}`}
          onClick={showNavbar}
        >
          <FaTimes />
        </button>
      </nav>
      <button className={styles.navBtn} onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
    // <nav className={styles.nav}>
    //   <div className={styles.logo}>
    //     <Link href="/">
    //       <Image
    //         src={logoRatu}
    //         height={60}
    //         width={60}
    //         alt="ratu_oceania_raya"
    //         priority
    //       />
    //     </Link>
    //   </div>
    //   <ul className={styles.navitem}>
    //     <li>
    //       <Link href="/">
    //         <span>home</span>
    //       </Link>
    //     </li>
    //     <li>
    //       <Link href="/our-story">
    //         <span>our story</span>
    //       </Link>
    //     </li>
    //     <li>
    //       <Link href="/our-principals">
    //         <span>our principals</span>
    //       </Link>
    //     </li>
    //     <li>
    //       <Link href="/career">
    //         <span>careers at sea</span>
    //       </Link>
    //     </li>
    //   </ul>
    // </nav>
  );
};

export default Navbar;
