import Head from "next/head";
import AnimatedPage from "../../components/AnimatedPage/AnimatedPage";
import CardPrincipals from "../../components/CardPrincipals/CardPrincipals";
import { server } from "../../configs/domain";
import styles from "./our-principals.module.css";

const OurPrincipals = ({ principals }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Our Principals - PT Ratu Oceania Raya</title>
        <meta
          name="description"
          content="We are the preeminent provider in Indonesia of hotel and marine personnel to international cruise lines, commercial shipping and hotels worldwide."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AnimatedPage>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <span>{principals.title}</span>
          </div>
          <div
            className={styles.subtitle}
            dangerouslySetInnerHTML={{ __html: principals.text_content }}
          ></div>
        </div>
        <div className={styles.principalsContainer}>
          {principals.data?.map((item, i) => (
            <CardPrincipals key={i} item={item} />
          ))}
        </div>
      </AnimatedPage>
    </div>
  );
};

export default OurPrincipals;

export const getStaticProps = async () => {
  const res = await fetch(server + "/api/v1/principal/section");
  const principals = await res.json();
  if (!res.ok) {
    throw new Error(`Failed to fetch posts, received status ${res.status}`);
  }
  return {
    props: {
      principals,
    },
    revalidate: 10,
  };
};
