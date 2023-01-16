import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./CompetitiveEdge.module.css";
import { myLoader } from "../../configs/loader";

const CompetitiveEdge = () => {
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
          src="/assets/images/competitive-edge.png"
          width={400}
          height={583}
          alt="banner1"
          priority
          loader={myLoader}
        />
      </div>
      <div className={styles.descContainer}>
        <div className={styles.descTitle}>
          <span>our</span>
          <span>competitive</span>
          <span>edge</span>
        </div>
        <div className={styles.description}>
          <ul>
            <li>MLC Complient</li>
            <li>ISO 9001:2015 Certified</li>
            <li>
              Our management team search consultants are all experienced
              seafarers and with significant experience in the cruise line and
              commercial shipping sectors.
            </li>
            <li>
              We are committed to a high level of ethics and do not charge
              applicants any application or processing fee other than those
              required by the shipping client. This enabled us to grow a strong
              reputation in Indonesia with governmental agencies and potential
              candidates.
            </li>
            <li>
              We provide each cruise line client with a dedicated “crew
              coordinator” and processing/scheduling team. This ensures
              dedicated service to each client and immediate response to
              scheduler requests.
            </li>
            <li>
              We have forged close relationships with leading hospitality
              colleges in Indonesia and Thailand in order to leverage ‘first
              pick’ for outstanding graduates.
            </li>
            <li>
              We continue to support and engage with hired candidates long after
              they secure employment. We provide support services and help to
              families of seafarers while they are on assignment at no charge.
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default CompetitiveEdge;
