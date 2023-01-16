import Head from "next/head";
import Image from "next/image";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import styles from "./our-story.module.css";
import AnimatedPage from "../../components/AnimatedPage/AnimatedPage";
import ship from "../../public/assets/logo-kapal.png";
import anchor from "../../public/assets/logo-anchor.png";
import { myLoader } from "../../configs/loader";

const dataLeadership = [
  {
    src: "/assets/images/deddy-herfiandi.png",
    name: "Deddy Herfiandi",
    position: "Chairman",
  },
];

const OurStory = () => {
  return (
    <AnimatedPage>
      <Head>
        <title>Our Story - PT Ratu Oceania Raya</title>
        <meta
          name="description"
          content="We are the preeminent provider in Indonesia of hotel and marine personnel to international cruise lines, commercial shipping and hotels worldwide."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div className={styles.title}>
          <span>our story</span>
          <span>company</span>
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
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{
              background: "rgb(33, 150, 243)",
              color: "#fff",
              display: "flex",
            }}
          >
            <h1 className="vertical-timeline-element-title">Oct - 2007</h1>
            <p className="vertical-timeline-element-title">
              Ratu Oceania Raya opens for business in Jakarta
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <h1 className="vertical-timeline-element-title">Nov - 2007</h1>
            <p>
              Started sending crew on board many of the world’s leading cruise
              lines
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <h1 className="vertical-timeline-element-title">Sep - 2010</h1>
            <p>
              Became Royal Caribbean’s “Highest Success Rate Hiring Partner” for
              sending crew on board
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <h1
              className="vertical-timeline-element-title"
              style={{ marginBottom: "1.5rem" }}
            >
              SINCE 2010
            </h1>
            <div>
              <span>ISO 9001:2008/MLC 2006 Certified License from</span>
              <ul>
                <li>The Ministry for Transportation</li>
                <li>Director General for Sea Transportation</li>
              </ul>
            </div>
          </VerticalTimelineElement>
        </VerticalTimeline>
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
        <div className={styles.LeadershipContainer}>
          <div className={styles.leadershipTitle}>
            <span>leadership team</span>
          </div>
          {dataLeadership.map((item, i) => (
            <div key={i} className={styles.teamListContainer}>
              <Image
                src={item.src}
                width={0}
                height={0}
                className={styles.teamImage}
                loader={myLoader}
                alt="ship"
                priority
              />
              <span className={styles.teamName}>{item.name}</span>
              <span>{item.position}</span>
            </div>
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default OurStory;
