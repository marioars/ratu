import Image from "next/image";
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
          src={item.src}
          width={120}
          height={120}
          alt="logo"
          priority
          loader={myLoader}
        />
      </div>
      <hr />
      <span className={styles.descBold}>{item.descBold}</span>
      <span>{item.desc}</span>
      <button>visit website</button>
    </motion.div>
  );
};

export default CardPrincipals;
