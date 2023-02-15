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
      {/* <Quote slogan={banners.slogan} /> */}
      <CompetitiveEdge section={section?.section_competitive} />
      <OurStory section={section?.section_company} />
      <div style={{ width: "100vw" }}>
        <OurPrincipals principals={principals} />
      </div>
      <div className={styles.addressContainer}>
        <div className={styles.titleAddressContainer}>
          <span>Our Office</span>
        </div>
        <div className={styles.addressLocationContainer}>
          <div className={styles.listAddress}>
            <h1>Jakarta</h1>
            <span>
              Bintaro Trade Center Blok A2 No.9-10 Sektor 7, Bintaro Jaya,
              Tangerang 15224, Indonesia. Phone: +6221-745 0325 Email:
              recruitment@ratuoceaniaraya.com
            </span>
          </div>
          <div className={styles.listAddress}>
            <h1>Yogyakarta</h1>
            <span>
              Jl. R.E. Martadinata No.57 RT01/RW02 Wirobrajan, Yogyakarta 55252,
              Indonesia. Phone: +62274-429 7490 Email: yogya@ratuoceaniaraya.com
            </span>
          </div>
          <div className={styles.listAddress}>
            <h1>Bali</h1>
            <span>
              Jl. Pondok Indah No.18X Denpasar Barat Indonesia. Phone:
              +62361-939 9851 Email: bali@ratuoceaniaraya.com
            </span>
          </div>
          <div className={styles.listAddress}>
            <h1>Kuala Lumpur</h1>
            <span>
              75, Kompleks Damai, Jalan Datuk Haji Eusoff, Titiwangsa Sentral,
              50400 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia.
            </span>
          </div>
        </div>
      </div>
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
