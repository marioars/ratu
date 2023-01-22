import Head from "next/head";
import Image from "next/image";
import AnimatedPage from "../../components/AnimatedPage/AnimatedPage";
import styles from "./career.module.css";
import { myLoader } from "../../configs/loader";
import { server } from "../../configs/domain";

const Career = ({ principals }) => {
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
            >
              <option defaultValue="Principals">Principals</option>
              {principals.data.map((item) => (
                <option
                  className={styles.listOption}
                  key={item.id_principal}
                  value={item.name_principal}
                >
                  {item.name_principal}
                </option>
              ))}
            </select>
            <div className={styles.lineVertical}></div>
            <div className={styles.iconSearch}>
              <Image
                src="/assets/icon-search.png"
                alt="search_icon"
                width={20}
                height={20}
              />
            </div>
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

export const getStaticProps = async () => {
  const res = await fetch(server + "/api/v1/career/all-principal");
  const principals = await res.json();
  if (!res.ok) {
    throw new Error(`Failed to fetch, received status ${res.status}`);
  }
  return {
    props: {
      principals,
    },
    revalidate: 10,
  };
};
