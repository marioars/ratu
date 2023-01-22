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
import { server } from "../configs/domain.js";

export default function Home({ banners, slogan, section, principals }) {
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
        <BannerSlider banners={banners.data} />
      </div>
      <Quote slogan={banners.slogan} />
      <CompetitiveEdge section={section?.section_competitive} />
      <OurStory section={section?.section_company} />
      <div style={{ width: "100vw" }}>
        <OurPrincipals principals={principals} />
      </div>
      <div className={styles.bottomInfo}></div>
    </AnimatedPage>
  );
}

export const getStaticProps = async () => {
  const bannerRes = await fetch(server + "/api/v1/home/banner");
  const sectionRes = await fetch(server + "/api/v1/home/section");
  const principalsRes = await fetch(server + "/api/v1/home/principal");
  const banners = await bannerRes.json();
  const section = await sectionRes.json();
  const principals = await principalsRes.json();
  if (!bannerRes.ok || !sectionRes.ok || !principalsRes.ok) {
    throw new Error(
      `Failed to fetch, received status ${bannerRes.status} ${sectionRes.status} ${principalsRes.status}`
    );
  }
  return {
    props: {
      banners,
      section,
      principals,
    },
    revalidate: 10,
  };
};
