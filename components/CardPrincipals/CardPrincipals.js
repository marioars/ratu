import Image from "next/image";
import Link from "next/link";
import styles from "./CardPrincipals.module.css";
import { myLoader } from "../../configs/loader";
import { motion } from "framer-motion";

const CardPrincipals = ({ item }) => {
  return (
    <motion.div
      className={styles.container}
      initial={{ y: 200 }}
      whileInView={{ y: 0 }}
      transition={{
        type: "spring",
        bounce: 0.2,
        duration: 1,
      }}
      viewport={{ once: true }}
    >
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={item.logo_principal}
          width={160}
          height={160}
          alt="logo"
          priority
          loader={myLoader}
        />
      </div>
      <hr />
      <span className={styles.descBold}>{item.slogan_principal}</span>
      <span>{item.desc_principal}</span>
      <Link
        href={item.website_principal}
        passHref={true}
        rel="noreferrer"
        target="_blank"
      >
        <button>visit website</button>
      </Link>
    </motion.div>
  );
};

export default CardPrincipals;
