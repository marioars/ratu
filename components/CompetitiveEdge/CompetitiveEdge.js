import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./CompetitiveEdge.module.css";
import { myLoader } from "../../configs/loader";

const CompetitiveEdge = (props) => {
  const { section } = props;
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
          src={section.image_section}
          width={0}
          height={0}
          alt="banner1"
          priority
          loader={myLoader}
        />
      </div>
      <div className={styles.descContainer}>
        <div className={styles.descTitle}>{section.title_section}</div>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: section.text_content }}
        ></div>
      </div>
    </motion.div>
  );
};

export default CompetitiveEdge;
