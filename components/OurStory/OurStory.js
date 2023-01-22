import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./OurStory.module.css";
import { myLoader } from "../../configs/loader";

const OurStory = (props) => {
  const { section } = props;
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.title}
        initial={{ y: 200 }}
        whileInView={{ y: 0 }}
        transition={{
          type: "spring",
          bounce: 0.2,
          duration: 1,
        }}
        viewport={{ once: true }}
      >
        {section.title_section}
      </motion.div>
      <motion.div
        className={styles.desc}
        initial={{ y: 200 }}
        whileInView={{ y: 0 }}
        transition={{
          type: "spring",
          bounce: 0.2,
          duration: 1,
        }}
        viewport={{ once: true }}
        dangerouslySetInnerHTML={{ __html: section.text_content }}
      ></motion.div>
      <motion.div
        className={styles.buttonMore}
        initial={{ y: 200 }}
        whileInView={{ y: 0 }}
        transition={{
          type: "spring",
          bounce: 0.2,
          duration: 1,
        }}
        viewport={{ once: true }}
      >
        <Link href="/our-story">
          <button>our story in full</button>
        </Link>
      </motion.div>
      <motion.div
        className={styles.imageContainer}
        initial={{ y: 200 }}
        whileInView={{ y: 0 }}
        transition={{
          type: "spring",
          bounce: 0.2,
          duration: 1,
        }}
        viewport={{ once: true }}
      >
        <Image
          src={section.image_section}
          width={0}
          height={0}
          alt="our_story_company"
          priority
          loader={myLoader}
          className={styles.image}
        />
      </motion.div>
    </div>
  );
};

export default OurStory;
