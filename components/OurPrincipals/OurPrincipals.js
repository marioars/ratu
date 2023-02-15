import { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./OurPrincipals.module.css";
import { myLoader } from "../../configs/loader";
import Link from "next/link";

const OurPrincipals = (props) => {
  const { principals } = props;
  const [slideIndex, setSlideIndex] = useState(0);
  const settings = {
    dots: false,
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
    customPaging: (i) => (
      <div className="ft-slick__dots--custom-principals">
        <div className="loading" />
      </div>
    ),
  };
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.imgContainer}
        initial={{ y: 200 }}
        whileInView={{ y: 0 }}
        transition={{
          type: "spring",
          bounce: 0.2,
          duration: 1,
        }}
        viewport={{ once: true }}
      >
        <div className={styles.vectorContainer}>
          <Image
            className={styles.vector}
            src={principals.image}
            width="0"
            height="0"
            alt="principals_image"
            priority
            loader={myLoader}
          />
        </div>
        <div className={styles.descriptionContainer}>
          <div className={styles.contentTitle}>
            <span>our</span>
            <span>principals</span>
          </div>
          <div className={styles.sliderContainer}>
            <Slider {...settings}>
              {principals.data.map((item, index) => (
                <div
                  key={index}
                  className={
                    index === slideIndex ? styles.slide_active : styles.slide
                  }
                >
                  <Image
                    className={styles.imagePrincipal}
                    src={item.logo_principal}
                    width="0"
                    height="0"
                    alt={item.slug_principal}
                    priority
                    loader={myLoader}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className={styles.buttonMore}>
            <Link href="/our-principals">
              <button>about principals</button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OurPrincipals;
