import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./OurStory.module.css";
import { myLoader } from "../../configs/loader";
const OurStory = () => {
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
        <span>our story</span>
        <span>company</span>
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
      >
        <span>
          Our strict attention to detail and commitment to fair andequitable
          practices, enables Ratu to maintain the prestgious ISO:9001 quality
          rating. Our close relationships with government agencies, our
          expertise in providing visa and travel services, andour commitment to
          honesty and ethics has resulted in Ratu Oceania Raya being recognized
          as the premier crew placement agent in Indonesia.
        </span>
      </motion.div>
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
          <button>more story</button>
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
          src="/assets/images/our-story-company.png"
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
