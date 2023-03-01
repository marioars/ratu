import Head from "next/head";
import { useState } from "react";
import AnimatedPage from "../components/AnimatedPage/AnimatedPage";
import BannerSlider from "../components/BannerSlider/BannerSlider";
import CompetitiveEdge from "../components/CompetitiveEdge/CompetitiveEdge";
import OurPrincipals from "../components/OurPrincipals/OurPrincipals";
import OurStory from "../components/OurStory/OurStory";
import Preview from "../components/Preview/Preview";
import styles from "../styles/Home.module.css";
import { server } from "../configs/domain.js";
import { address } from "../data/address";

export default function Home({ banners, section, principals }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Head>
        <title>Home - PT Ratu Oceania Raya</title>
        <meta
          name="description"
          content="We are the preeminent provider in Indonesia of hotel and marine personnel to international cruise lines, commercial shipping and hotels worldwide."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!isOpen && <Preview setIsOpen={setIsOpen} />}
      <BannerSlider banners={banners.data} />
      <CompetitiveEdge section={section?.section_competitive} />
      <OurStory section={section?.section_company} />
      <OurPrincipals principals={principals} />
      <div className={styles.addressContainer}>
        <div className={styles.titleAddressContainer}>
          <span>Our Office</span>
        </div>
        <div className={styles.addressLocationContainer}>
          {address.map((item) => (
            <div className={styles.listAddress} key={item.id}>
              <h1>{item.city}</h1>
              <span>{item.address}</span>
            </div>
          ))}
        </div>
      </div>
    </>
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
