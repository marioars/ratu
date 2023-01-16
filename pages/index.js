import Head from "next/head";
import { useState } from "react";
import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import BannerSlider from "../components/BannerSlider/BannerSlider";
import CompetitiveEdge from "../components/CompetitiveEdge/CompetitiveEdge";
import OurPrincipals from "../components/OurPrincipals/OurPrincipals";
import OurStory from "../components/OurStory/OurStory";
import Preview from "../components/Preview/Preview";
import Quote from "../components/Quote/Quote";
import styles from "../styles/Home.module.css";
// import { server } from "../configs/domain.js";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <AnimatedPage>
      <Head>
        <title>Home - PT Ratu Oceania Raya</title>
        <meta
          name="description"
          content="We are the preeminent provider in Indonesia of hotel and marine personnel to international cruise lines, commercial shipping and hotels worldwide."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!isOpen && <Preview setIsOpen={setIsOpen} />}
      <div style={{ width: "100vw", textAlign: "center" }}>
        <BannerSlider />
      </div>
      <div>
        <Quote />
      </div>
      <CompetitiveEdge />
      <OurStory />
      <div style={{ width: "100vw" }}>
        <OurPrincipals />
      </div>
      <div className={styles.bottomInfo}></div>
    </AnimatedPage>
  );
}

// export const getStaticProps = async () => {
//   const res = await fetch(server + "/api/v1/home/banner");
//   const banners = await res.json();
//   return {
//     props: {
//       banners,
//     },
//   };
// };
