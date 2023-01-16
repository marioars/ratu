import { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./OurPrincipals.module.css";
import { myLoader } from "../../configs/loader";
import principals from "../../public/assets/images/principals.png";
import Link from "next/link";

const data = [
  {
    src: "/assets/images/viking.png",
    alt: "viking",
  },
  {
    src: "/assets/images/disney-cruise.png",
    alt: "disney_cruise",
  },
  {
    src: "/assets/images/london-wellness.png",
    alt: "london_wellness",
  },
  {
    src: "/assets/images/marella-cruises.png",
    alt: "marella_cruises",
  },
  {
    src: "/assets/images/pro-cruises.png",
    alt: "pro-cruises",
  },
  {
    src: "/assets/images/sea-chefs.png",
    alt: "sea-chefs",
  },
  {
    src: "/assets/images/voyages.png",
    alt: "voyages",
  },
  {
    src: "/assets/images/world-residence.png",
    alt: "world_residence",
  },
];

const OurPrincipals = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    initialSlide: 0,
    arrows: false,
    adaptiveHeight: true,
    beforeChange: (current, next) => setSlideIndex(next),
    centerMode: true,
    customPaging: (i) => (
      <div className="ft-slick__dots--custom-principals">
        <div className="loading" />
      </div>
    ),
  };
  return (
    <>
      <div className={styles.imgContainer}>
        <motion.div
          initial={{ y: 200 }}
          whileInView={{ y: 0 }}
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 1,
          }}
          viewport={{ once: true }}
        >
          <Slider {...settings}>
            {data.map((item, index) => (
              <div
                key={index}
                className={
                  index === slideIndex ? styles.slide_active : styles.slide
                }
              >
                <Image
                  className={styles.image}
                  src={item.src}
                  width="0"
                  height="0"
                  alt={item.alt}
                  priority
                  loader={myLoader}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            ))}
          </Slider>
        </motion.div>
      </div>
      <div className={styles.container}>
        <motion.div
          className={styles.descContainer}
          initial={{ y: 200 }}
          whileInView={{ y: 0 }}
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 1,
          }}
          viewport={{ once: true }}
        >
          <Image
            className={styles.imagePrincipals}
            src={principals}
            width="0"
            height="0"
            alt="principals_image"
            priority
            loader={myLoader}
            style={{ width: "384px", height: "100%" }}
          />
          <div className={styles.contentContainer}>
            <div className={styles.contentTitle}>
              <span>our</span>
              <span>principals</span>
            </div>
            <div className={styles.buttonMore}>
              <Link href="/our-principals">
                <button>about principals</button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default OurPrincipals;
