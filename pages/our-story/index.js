import Head from "next/head";
import Image from "next/image";
import styles from "./our-story.module.css";
import AnimatedPage from "../../components/AnimatedPage/AnimatedPage";
import ship from "../../public/assets/logo-kapal.png";
import anchor from "../../public/assets/logo-anchor.png";
import { myLoader } from "../../configs/loader";
import { server } from "../../configs/domain";

const OurStory = ({ ourStory }) => {
  return (
    <>
      <Head>
        <title>Our Story - PT Ratu Oceania Raya</title>
        <meta
          name="description"
          content="We are the preeminent provider in Indonesia of hotel and marine personnel to international cruise lines, commercial shipping and hotels worldwide."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <AnimatedPage>
          <div className={styles.title}>
            <span>{ourStory.data.title_section}</span>
          </div>
          <div className={styles.title2}>
            <span>Vision</span>
            <span className={styles.desc}>
              {ourStory.vision_mission?.vision}
            </span>
          </div>
          <div className={styles.title2}>
            <span>Mission</span>
            <span className={styles.desc2}>
              {ourStory.vision_mission?.mission}
            </span>
          </div>
          <div className={styles.shipContainer}>
            <Image
              src={ship}
              width={0}
              height={0}
              className={styles.ship}
              loader={myLoader}
              alt="ship"
              priority
            />
          </div>
          <div class={styles.timelineSection}>
            <div class={styles.timelineItems}>
              {ourStory.data.story.map((item, i) => (
                <div key={i} class={styles.timelineItem}>
                  <div class={styles.timelineDot}></div>
                  <div class={styles.timelineDate}>
                    {item.month_story_company} - {item.year_story_company}
                  </div>
                  <div
                    class={styles.timelineContent}
                    dangerouslySetInnerHTML={{ __html: item.story_company }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.anchorContainer}>
            <Image
              src={anchor}
              width={0}
              height={0}
              className={styles.anchor}
              loader={myLoader}
              alt="ship"
              priority
            />
          </div>
        </AnimatedPage>
      </div>
    </>
  );
};

export default OurStory;

export const getStaticProps = async () => {
  const res = await fetch(server + "/api/v1/our-story/section");
  const ourStory = await res.json();
  if (!res.ok) {
    throw new Error(`Failed to fetch posts, received status ${res.status}`);
  }
  return {
    props: {
      ourStory,
    },
    revalidate: 10,
  };
};
