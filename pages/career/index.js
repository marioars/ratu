import Head from "next/head";
import Image from "next/image";
import AnimatedPage from "../../components/AnimatedPage/AnimatedPage";
import styles from "./career.module.css";
import { myLoader } from "../../configs/loader";

const Career = () => {
  return (
    <AnimatedPage>
      <Head>
        <title>Career - PT Ratu Oceania Raya</title>
        <meta
          name="description"
          content="We are the preeminent provider in Indonesia of hotel and marine personnel to international cruise lines, commercial shipping and hotels worldwide."
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <div className={styles.borderContainer}>
            <select
              className={styles.selOpt}
              name="principals"
              id="principals"
              placeholder="Principals"
              defaultValue="Principals"
            >
              <option value="" disabled>
                Principals
              </option>
              <option value="viking">viking</option>
              <option value="disney-cruise">disney cruise</option>
              <option value="london-wellness">london wellness</option>
              <option value="marella-cruises">marella cruises</option>
              <option value="pro-cruises">pro cruises</option>
              <option value="sea-chefs">sea chefs</option>
              <option value="voyages">voyages</option>
              <option value="world-residence">world residence</option>
            </select>
            <div className={styles.lineVertical}></div>
            <input
              className={styles.inputText}
              type="text"
              placeholder="Job Positions"
            />
            <button>search</button>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/assets/images/career1.png"
            height={232}
            width={232}
            alt="career"
            priority
            loader={myLoader}
          />
          <Image
            src="/assets/images/career2.png"
            height={232}
            width={232}
            alt="career"
            priority
            loader={myLoader}
          />
          <Image
            src="/assets/images/career3.png"
            height={232}
            width={232}
            alt="career"
            priority
            loader={myLoader}
          />
          <Image
            src="/assets/images/career4.png"
            height={232}
            width={232}
            alt="career"
            priority
            loader={myLoader}
          />
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Career;
