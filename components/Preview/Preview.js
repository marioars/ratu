import { useRouter } from "next/router";
import { useRef, useEffect } from "react";
import styles from "./Preview.module.css";

const Preview = ({ setIsOpen }) => {
  const previewRef = useRef();
  const router = useRouter();
  const handleClick = () => {
    setTimeout(() => {
      setIsOpen(true);
    }, 1000);
  };
  let timer;
  const handleClickOffer = () => {
    router.push("/career");
    timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
  };
  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  return (
    <div className={styles.preview} ref={previewRef}>
      <video autoPlay loop muted className={styles.videoPreview}>
        <source src="/assets/video-opening-web.mp4" type="video/mp4" />
        Browser tidak support
      </video>
      <div className={styles.contents}>
        <div className={styles.titlePreview}>
          <span>welcome to</span>
          <span>ratu oceania raya</span>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.explore} onClick={handleClick}>
            company profile
          </button>
          <button className={styles.explore} onClick={handleClickOffer}>
            careers at sea
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
