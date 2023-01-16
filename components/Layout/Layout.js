import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.content}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
